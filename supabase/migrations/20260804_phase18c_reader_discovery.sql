-- Phase 18C: opt-in, explainable, privacy-aware reader discovery.
-- Additive only. Existing profiles, books, activity, messages, and uploads are untouched.

create extension if not exists pg_trgm;

create table if not exists public.reader_discovery_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_discoverable boolean not null default false,
  genres text[] not null default '{}',
  formats text[] not null default '{}',
  vibes text[] not null default '{}',
  reading_styles text[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint reader_discovery_genres_limit check (cardinality(genres) <= 8),
  constraint reader_discovery_formats_limit check (cardinality(formats) <= 8),
  constraint reader_discovery_vibes_limit check (cardinality(vibes) <= 8),
  constraint reader_discovery_styles_limit check (cardinality(reading_styles) <= 8)
);

create index if not exists reader_discovery_genres_idx on public.reader_discovery_profiles using gin (genres);
create index if not exists reader_discovery_formats_idx on public.reader_discovery_profiles using gin (formats);
create index if not exists reader_discovery_vibes_idx on public.reader_discovery_profiles using gin (vibes);
create index if not exists reader_discovery_styles_idx on public.reader_discovery_profiles using gin (reading_styles);
create index if not exists profiles_username_trgm_idx on public.profiles using gin (username gin_trgm_ops);
create index if not exists profiles_display_name_trgm_idx on public.profiles using gin (display_name gin_trgm_ops);

alter table public.reader_discovery_profiles enable row level security;

drop policy if exists "owners read discovery preferences" on public.reader_discovery_profiles;
create policy "owners read discovery preferences" on public.reader_discovery_profiles
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "owners create discovery preferences" on public.reader_discovery_profiles;
create policy "owners create discovery preferences" on public.reader_discovery_profiles
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "owners update discovery preferences" on public.reader_discovery_profiles;
create policy "owners update discovery preferences" on public.reader_discovery_profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

revoke all on public.reader_discovery_profiles from authenticated;
grant select on public.reader_discovery_profiles to authenticated;
grant insert (user_id, is_discoverable, genres, formats, vibes, reading_styles) on public.reader_discovery_profiles to authenticated;
grant update (is_discoverable, genres, formats, vibes, reading_styles, updated_at) on public.reader_discovery_profiles to authenticated;

create or replace function public.search_reader_discovery(
  search_term text default '',
  genre_filter text default '',
  format_filter text default '',
  vibe_filter text default '',
  style_filter text default '',
  page_size integer default 12,
  page_offset integer default 0
)
returns table (
  user_id uuid,
  username text,
  display_name text,
  avatar_url text,
  profile_data jsonb,
  stats_data jsonb,
  genres text[],
  formats text[],
  vibes text[],
  reading_styles text[],
  total_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with matching as (
    select
      profile.user_id,
      profile.username,
      profile.display_name,
      profile.avatar_url,
      profile.profile_data,
      profile.stats_data,
      discovery.genres,
      discovery.formats,
      discovery.vibes,
      discovery.reading_styles,
      discovery.updated_at
    from public.reader_discovery_profiles discovery
    join public.profiles profile on profile.user_id = discovery.user_id
    where auth.uid() is not null
      and discovery.is_discoverable = true
      and profile.is_public = true
      and profile.user_id <> auth.uid()
      and not exists (
        select 1 from public.reader_blocks block_row
        where (block_row.blocker_id = auth.uid() and block_row.blocked_id = profile.user_id)
           or (block_row.blocker_id = profile.user_id and block_row.blocked_id = auth.uid())
      )
      and (btrim(search_term) = '' or profile.username ilike '%' || btrim(search_term) || '%' or profile.display_name ilike '%' || btrim(search_term) || '%')
      and (btrim(genre_filter) = '' or discovery.genres @> array[genre_filter])
      and (btrim(format_filter) = '' or discovery.formats @> array[format_filter])
      and (btrim(vibe_filter) = '' or discovery.vibes @> array[vibe_filter])
      and (btrim(style_filter) = '' or discovery.reading_styles @> array[style_filter])
  )
  select matching.user_id, matching.username, matching.display_name, matching.avatar_url,
    matching.profile_data, matching.stats_data, matching.genres, matching.formats,
    matching.vibes, matching.reading_styles, count(*) over() as total_count
  from matching
  order by matching.updated_at desc, matching.username
  limit least(greatest(page_size, 1), 24)
  offset greatest(page_offset, 0);
$$;

revoke all on function public.search_reader_discovery(text, text, text, text, text, integer, integer) from public;
grant execute on function public.search_reader_discovery(text, text, text, text, text, integer, integer) to authenticated;
