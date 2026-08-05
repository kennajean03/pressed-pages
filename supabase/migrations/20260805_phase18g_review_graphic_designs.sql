-- Phase 18G: owned, versioned review-graphic design documents.
-- Additive only. Existing reviews, images, profiles, and exports are untouched.

create extension if not exists pgcrypto;

create table if not exists public.review_graphic_designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  design_version integer not null default 1 check (design_version = 1),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  source_review_id text,
  source_book_title text,
  design_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint review_graphic_designs_data_object check (jsonb_typeof(design_data) = 'object')
);

create index if not exists review_graphic_designs_owner_updated_idx
  on public.review_graphic_designs (user_id, updated_at desc);

alter table public.review_graphic_designs enable row level security;

drop policy if exists "owners read review graphic designs" on public.review_graphic_designs;
create policy "owners read review graphic designs" on public.review_graphic_designs
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "owners create review graphic designs" on public.review_graphic_designs;
create policy "owners create review graphic designs" on public.review_graphic_designs
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "owners update review graphic designs" on public.review_graphic_designs;
create policy "owners update review graphic designs" on public.review_graphic_designs
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "owners delete review graphic designs" on public.review_graphic_designs;
create policy "owners delete review graphic designs" on public.review_graphic_designs
  for delete to authenticated using (auth.uid() = user_id);

revoke all on public.review_graphic_designs from authenticated;
grant select on public.review_graphic_designs to authenticated;
grant insert (id, user_id, design_version, name, source_review_id, source_book_title, design_data, created_at, updated_at)
  on public.review_graphic_designs to authenticated;
grant update (name, source_review_id, source_book_title, design_data, updated_at)
  on public.review_graphic_designs to authenticated;
grant delete on public.review_graphic_designs to authenticated;
