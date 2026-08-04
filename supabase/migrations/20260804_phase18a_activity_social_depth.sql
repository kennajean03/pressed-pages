-- Phase 18A: data-backed activity comments, saves, reactions, reports, and blocks.
-- Additive only: existing activity_feed and activity_likes rows are untouched.

create extension if not exists pgcrypto;

create table if not exists public.reader_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint reader_blocks_not_self check (blocker_id <> blocked_id)
);

create table if not exists public.activity_comments (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activity_feed(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint activity_comments_body_length check (
    char_length(btrim(body)) between 1 and 500
  )
);

create table if not exists public.activity_saves (
  activity_id uuid not null references public.activity_feed(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (activity_id, user_id)
);

create table if not exists public.activity_reactions (
  activity_id uuid not null references public.activity_feed(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  reaction_type text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (activity_id, user_id),
  constraint activity_reactions_allowed_type check (
    reaction_type in ('heart', 'spark', 'laugh', 'cry', 'spicy')
  )
);

create table if not exists public.activity_reports (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activity_feed(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (activity_id, reporter_id),
  constraint activity_reports_allowed_reason check (
    reason in ('spam', 'harassment', 'hate', 'privacy', 'other')
  ),
  constraint activity_reports_allowed_status check (
    status in ('open', 'reviewing', 'resolved', 'dismissed')
  )
);

create index if not exists activity_comments_activity_created_idx
  on public.activity_comments (activity_id, created_at);
create index if not exists activity_comments_user_idx
  on public.activity_comments (user_id);
create index if not exists activity_saves_user_created_idx
  on public.activity_saves (user_id, created_at desc);
create index if not exists activity_reactions_activity_idx
  on public.activity_reactions (activity_id);
create index if not exists activity_reports_status_created_idx
  on public.activity_reports (status, created_at);
create index if not exists reader_blocks_blocked_idx
  on public.reader_blocks (blocked_id);

create or replace function public.can_view_activity_social(target_activity_id uuid, viewer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.activity_feed activity
    left join public.profiles profile on profile.user_id = activity.user_id
    where activity.id = target_activity_id
      and (
        activity.user_id = viewer_id
        or profile.is_public = true
        or exists (
          select 1
          from public.follows follow_row
          where follow_row.follower_id = viewer_id
            and follow_row.following_id = activity.user_id
        )
      )
      and not exists (
        select 1
        from public.reader_blocks block_row
        where (block_row.blocker_id = viewer_id and block_row.blocked_id = activity.user_id)
           or (block_row.blocker_id = activity.user_id and block_row.blocked_id = viewer_id)
      )
  );
$$;

revoke all on function public.can_view_activity_social(uuid, uuid) from public;
grant execute on function public.can_view_activity_social(uuid, uuid) to authenticated;

alter table public.reader_blocks enable row level security;
alter table public.activity_comments enable row level security;
alter table public.activity_saves enable row level security;
alter table public.activity_reactions enable row level security;
alter table public.activity_reports enable row level security;

drop policy if exists "exclude blocked activity" on public.activity_feed;
create policy "exclude blocked activity" on public.activity_feed
  as restrictive for select to authenticated
  using (
    not exists (
      select 1 from public.reader_blocks block_row
      where (block_row.blocker_id = auth.uid() and block_row.blocked_id = activity_feed.user_id)
         or (block_row.blocker_id = activity_feed.user_id and block_row.blocked_id = auth.uid())
    )
  );

drop policy if exists "read own blocks" on public.reader_blocks;
create policy "read own blocks" on public.reader_blocks
  for select to authenticated
  using (auth.uid() = blocker_id);

drop policy if exists "create own blocks" on public.reader_blocks;
create policy "create own blocks" on public.reader_blocks
  for insert to authenticated
  with check (auth.uid() = blocker_id and blocker_id <> blocked_id);

drop policy if exists "remove own blocks" on public.reader_blocks;
create policy "remove own blocks" on public.reader_blocks
  for delete to authenticated
  using (auth.uid() = blocker_id);

drop policy if exists "read visible activity comments" on public.activity_comments;
create policy "read visible activity comments" on public.activity_comments
  for select to authenticated
  using (
    public.can_view_activity_social(activity_id, auth.uid())
    and not exists (
      select 1 from public.reader_blocks block_row
      where (block_row.blocker_id = auth.uid() and block_row.blocked_id = user_id)
         or (block_row.blocker_id = user_id and block_row.blocked_id = auth.uid())
    )
  );

drop policy if exists "create own visible activity comments" on public.activity_comments;
create policy "create own visible activity comments" on public.activity_comments
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and public.can_view_activity_social(activity_id, auth.uid())
  );

drop policy if exists "update own activity comments" on public.activity_comments;
create policy "update own activity comments" on public.activity_comments
  for update to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and public.can_view_activity_social(activity_id, auth.uid())
  );

drop policy if exists "delete own activity comments" on public.activity_comments;
create policy "delete own activity comments" on public.activity_comments
  for delete to authenticated
  using (auth.uid() = user_id);

drop policy if exists "read visible activity saves" on public.activity_saves;
create policy "read visible activity saves" on public.activity_saves
  for select to authenticated
  using (public.can_view_activity_social(activity_id, auth.uid()));

drop policy if exists "create own visible activity saves" on public.activity_saves;
create policy "create own visible activity saves" on public.activity_saves
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and public.can_view_activity_social(activity_id, auth.uid())
  );

drop policy if exists "delete own activity saves" on public.activity_saves;
create policy "delete own activity saves" on public.activity_saves
  for delete to authenticated
  using (auth.uid() = user_id);

drop policy if exists "read visible activity reactions" on public.activity_reactions;
create policy "read visible activity reactions" on public.activity_reactions
  for select to authenticated
  using (public.can_view_activity_social(activity_id, auth.uid()));

drop policy if exists "create own visible activity reactions" on public.activity_reactions;
create policy "create own visible activity reactions" on public.activity_reactions
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and public.can_view_activity_social(activity_id, auth.uid())
  );

drop policy if exists "update own activity reactions" on public.activity_reactions;
create policy "update own activity reactions" on public.activity_reactions
  for update to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and public.can_view_activity_social(activity_id, auth.uid())
  );

drop policy if exists "delete own activity reactions" on public.activity_reactions;
create policy "delete own activity reactions" on public.activity_reactions
  for delete to authenticated
  using (auth.uid() = user_id);

drop policy if exists "read own activity reports" on public.activity_reports;
create policy "read own activity reports" on public.activity_reports
  for select to authenticated
  using (auth.uid() = reporter_id);

drop policy if exists "create own activity reports" on public.activity_reports;
create policy "create own activity reports" on public.activity_reports
  for insert to authenticated
  with check (
    auth.uid() = reporter_id
    and status = 'open'
    and public.can_view_activity_social(activity_id, auth.uid())
    and not exists (
      select 1 from public.activity_feed activity
      where activity.id = activity_reports.activity_id
        and activity.user_id = auth.uid()
    )
  );

drop policy if exists "update own activity reports" on public.activity_reports;
create policy "update own activity reports" on public.activity_reports
  for update to authenticated
  using (auth.uid() = reporter_id)
  with check (auth.uid() = reporter_id);

revoke all on public.activity_comments from authenticated;
grant select, delete on public.activity_comments to authenticated;
grant insert (activity_id, user_id, body) on public.activity_comments to authenticated;
grant update (body, updated_at) on public.activity_comments to authenticated;

revoke all on public.activity_saves from authenticated;
grant select, delete on public.activity_saves to authenticated;
grant insert (activity_id, user_id) on public.activity_saves to authenticated;

revoke all on public.activity_reactions from authenticated;
grant select, delete on public.activity_reactions to authenticated;
grant insert (activity_id, user_id, reaction_type, updated_at) on public.activity_reactions to authenticated;
grant update (reaction_type, updated_at) on public.activity_reactions to authenticated;

revoke all on public.activity_reports from authenticated;
grant select on public.activity_reports to authenticated;
grant insert (activity_id, reporter_id, reason) on public.activity_reports to authenticated;
grant update (reason, updated_at) on public.activity_reports to authenticated;

revoke all on public.reader_blocks from authenticated;
grant select, delete on public.reader_blocks to authenticated;
grant insert (blocker_id, blocked_id) on public.reader_blocks to authenticated;
