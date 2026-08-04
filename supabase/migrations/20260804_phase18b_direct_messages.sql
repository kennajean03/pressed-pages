-- Phase 18B: request-gated direct messages with blocking, reporting, and retention.
-- Additive only. Existing reader, activity, library, and notification data is untouched.

create extension if not exists pgcrypto;

create table if not exists public.direct_conversations (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  participant_low uuid generated always as (least(requester_id, recipient_id)) stored,
  participant_high uuid generated always as (greatest(requester_id, recipient_id)) stored,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_message_at timestamptz,
  unique (participant_low, participant_high),
  constraint direct_conversations_not_self check (requester_id <> recipient_id),
  constraint direct_conversations_status check (
    status in ('pending', 'accepted', 'declined', 'closed')
  )
);

create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.direct_conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  constraint direct_messages_body_length check (
    char_length(btrim(body)) between 1 and 2000
  )
);

create table if not exists public.direct_message_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.direct_messages(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (message_id, reporter_id),
  constraint direct_message_reports_reason check (
    reason in ('spam', 'harassment', 'hate', 'privacy', 'other')
  ),
  constraint direct_message_reports_status check (
    status in ('open', 'reviewing', 'resolved', 'dismissed')
  )
);

create index if not exists direct_conversations_requester_updated_idx
  on public.direct_conversations (requester_id, updated_at desc);
create index if not exists direct_conversations_recipient_updated_idx
  on public.direct_conversations (recipient_id, updated_at desc);
create index if not exists direct_messages_conversation_created_idx
  on public.direct_messages (conversation_id, created_at);
create index if not exists direct_messages_unread_idx
  on public.direct_messages (conversation_id, read_at) where read_at is null;
create index if not exists direct_message_reports_status_created_idx
  on public.direct_message_reports (status, created_at);

create or replace function public.direct_message_request_allowed(
  sender_id uuid,
  target_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    sender_id = auth.uid()
    and sender_id <> target_id
    and not exists (
      select 1 from public.reader_blocks block_row
      where (block_row.blocker_id = sender_id and block_row.blocked_id = target_id)
         or (block_row.blocker_id = target_id and block_row.blocked_id = sender_id)
    )
    and exists (
      select 1 from public.profiles target_profile
      where target_profile.user_id = target_id
        and target_profile.is_public = true
        and coalesce(target_profile.profile_data->>'messagePermission', 'followers') <> 'none'
        and (
          coalesce(target_profile.profile_data->>'messagePermission', 'followers') = 'everyone'
          or exists (
            select 1 from public.follows follow_row
            where follow_row.follower_id = sender_id
              and follow_row.following_id = target_id
          )
        )
    );
$$;

create or replace function public.direct_conversation_member(target_conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.direct_conversations conversation
    where conversation.id = target_conversation_id
      and auth.uid() in (conversation.requester_id, conversation.recipient_id)
      and not exists (
        select 1 from public.reader_blocks block_row
        where (block_row.blocker_id = conversation.requester_id and block_row.blocked_id = conversation.recipient_id)
           or (block_row.blocker_id = conversation.recipient_id and block_row.blocked_id = conversation.requester_id)
      )
  );
$$;

create or replace function public.create_direct_message_request(
  target_id uuid,
  message_body text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_conversation_id uuid;
begin
  if auth.uid() is null or not public.direct_message_request_allowed(auth.uid(), target_id) then
    raise exception 'This reader is not accepting a message request from you.';
  end if;

  if char_length(btrim(message_body)) not between 1 and 2000 then
    raise exception 'Messages must contain between 1 and 2000 characters.';
  end if;

  insert into public.direct_conversations (requester_id, recipient_id, status, last_message_at)
  values (auth.uid(), target_id, 'pending', now())
  returning id into new_conversation_id;

  insert into public.direct_messages (conversation_id, sender_id, body)
  values (new_conversation_id, auth.uid(), btrim(message_body));

  return new_conversation_id;
exception
  when unique_violation then
    raise exception 'A conversation with this reader already exists.';
end;
$$;

create or replace function public.send_direct_message(
  target_conversation_id uuid,
  message_body text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_message_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Log in to send a message.';
  end if;

  if char_length(btrim(message_body)) not between 1 and 2000 then
    raise exception 'Messages must contain between 1 and 2000 characters.';
  end if;

  if not exists (
    select 1 from public.direct_conversations conversation
    where conversation.id = target_conversation_id
      and conversation.status = 'accepted'
      and auth.uid() in (conversation.requester_id, conversation.recipient_id)
      and public.direct_conversation_member(conversation.id)
  ) then
    raise exception 'This conversation is not open for replies.';
  end if;

  insert into public.direct_messages (conversation_id, sender_id, body)
  values (target_conversation_id, auth.uid(), btrim(message_body))
  returning id into new_message_id;

  update public.direct_conversations
  set last_message_at = now(), updated_at = now()
  where id = target_conversation_id;

  return new_message_id;
end;
$$;

revoke all on function public.direct_message_request_allowed(uuid, uuid) from public;
revoke all on function public.direct_conversation_member(uuid) from public;
grant execute on function public.direct_message_request_allowed(uuid, uuid) to authenticated;
grant execute on function public.direct_conversation_member(uuid) to authenticated;
revoke all on function public.create_direct_message_request(uuid, text) from public;
revoke all on function public.send_direct_message(uuid, text) from public;
grant execute on function public.create_direct_message_request(uuid, text) to authenticated;
grant execute on function public.send_direct_message(uuid, text) to authenticated;

alter table public.direct_conversations enable row level security;
alter table public.direct_messages enable row level security;
alter table public.direct_message_reports enable row level security;

drop policy if exists "members read direct conversations" on public.direct_conversations;
create policy "members read direct conversations" on public.direct_conversations
  for select to authenticated
  using (
    auth.uid() in (requester_id, recipient_id)
    and not exists (
      select 1 from public.reader_blocks block_row
      where (block_row.blocker_id = requester_id and block_row.blocked_id = recipient_id)
         or (block_row.blocker_id = recipient_id and block_row.blocked_id = requester_id)
    )
  );

drop policy if exists "readers create message requests" on public.direct_conversations;
create policy "readers create message requests" on public.direct_conversations
  for insert to authenticated
  with check (
    requester_id = auth.uid()
    and status = 'pending'
    and public.direct_message_request_allowed(requester_id, recipient_id)
  );

drop policy if exists "members update direct conversations" on public.direct_conversations;
drop policy if exists "recipients respond to message requests" on public.direct_conversations;
create policy "recipients respond to message requests" on public.direct_conversations
  for update to authenticated
  using (auth.uid() = recipient_id and status = 'pending')
  with check (
    auth.uid() = recipient_id
    and status in ('accepted', 'declined')
  );

drop policy if exists "members close direct conversations" on public.direct_conversations;
create policy "members close direct conversations" on public.direct_conversations
  for update to authenticated
  using (
    auth.uid() in (requester_id, recipient_id)
    and status in ('pending', 'accepted')
  )
  with check (
    auth.uid() in (requester_id, recipient_id)
    and status = 'closed'
  );

drop policy if exists "members touch accepted conversations" on public.direct_conversations;
create policy "members touch accepted conversations" on public.direct_conversations
  for update to authenticated
  using (
    auth.uid() in (requester_id, recipient_id)
    and status = 'accepted'
  )
  with check (
    auth.uid() in (requester_id, recipient_id)
    and status = 'accepted'
  );

drop policy if exists "members read direct messages" on public.direct_messages;
create policy "members read direct messages" on public.direct_messages
  for select to authenticated
  using (public.direct_conversation_member(conversation_id));

drop policy if exists "members send direct messages" on public.direct_messages;
create policy "members send direct messages" on public.direct_messages
  for insert to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.direct_conversations conversation
      where conversation.id = direct_messages.conversation_id
        and public.direct_conversation_member(conversation.id)
        and (
          conversation.status = 'accepted'
          or (
            conversation.status = 'pending'
            and conversation.requester_id = auth.uid()
            and not exists (
              select 1 from public.direct_messages existing_message
              where existing_message.conversation_id = conversation.id
            )
          )
        )
    )
  );

drop policy if exists "recipients mark direct messages read" on public.direct_messages;
create policy "recipients mark direct messages read" on public.direct_messages
  for update to authenticated
  using (
    sender_id <> auth.uid()
    and public.direct_conversation_member(conversation_id)
  )
  with check (
    sender_id <> auth.uid()
    and read_at is not null
    and public.direct_conversation_member(conversation_id)
  );

drop policy if exists "reporters read direct message reports" on public.direct_message_reports;
create policy "reporters read direct message reports" on public.direct_message_reports
  for select to authenticated
  using (reporter_id = auth.uid());

drop policy if exists "members create direct message reports" on public.direct_message_reports;
create policy "members create direct message reports" on public.direct_message_reports
  for insert to authenticated
  with check (
    reporter_id = auth.uid()
    and status = 'open'
    and exists (
      select 1 from public.direct_messages reported_message
      where reported_message.id = direct_message_reports.message_id
        and reported_message.sender_id <> auth.uid()
        and public.direct_conversation_member(reported_message.conversation_id)
    )
  );

revoke all on public.direct_conversations from authenticated;
grant select on public.direct_conversations to authenticated;
grant update (status, updated_at, last_message_at) on public.direct_conversations to authenticated;

revoke all on public.direct_messages from authenticated;
grant select on public.direct_messages to authenticated;
grant update (read_at) on public.direct_messages to authenticated;

revoke all on public.direct_message_reports from authenticated;
grant select on public.direct_message_reports to authenticated;
grant insert (message_id, reporter_id, reason) on public.direct_message_reports to authenticated;

-- Message rows are retained when a reader closes a conversation. Reports remain
-- private to the reporter. Account deletion still cascades through auth ownership.
