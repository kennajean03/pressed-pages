# Phase 18A — Community comments, saves, and reactions

Date: August 4, 2026

Status: application implementation and database activation complete; two-account acceptance pending.

## Delivered

- Preserved the existing `activity_likes` behavior and data.
- Added one saved-post row per reader and activity.
- Added one richer reaction per reader and activity with five restrained
  reaction types; changing a reaction moves the reader between counts rather
  than creating duplicates.
- Added 1–500 character comments with recent-first display, incremental older
  comment paging, owned edit, and confirm-before-delete behavior.
- Added activity reporting with constrained reasons and one report per reader.
- Added explicit confirm-before-block behavior and reload-safe filtering for
  blocks in either direction.
- Added notifications for new saves, reactions, and comments when the activity
  belongs to another reader.
- Added optimistic save/reaction updates with a full feed reload on persistence
  failure. Comment mutations wait for confirmed database writes.
- Added truthful migration-unavailable behavior: existing likes remain active,
  new controls fail closed, and the feed shows one migration notice rather than
  pretending the features saved.

## Database migration

Apply:

`supabase/migrations/20260804_phase18a_activity_social_depth.sql`

The migration is additive and creates:

- `activity_comments`
- `activity_saves`
- `activity_reactions`
- `activity_reports`
- `reader_blocks`

It does not rewrite or delete `activity_feed`, `activity_likes`, profiles,
reviews, reading logs, uploads, or any reader-owned library data.

The owner applied the migration through the Supabase SQL editor on August 4,
2026. The signed-in app then exposed enabled comments, saves, and reactions.
Live multi-reader acceptance testing remains pending.

## RLS and safety boundaries

- Social rows are readable only when the underlying activity is visible to the
  authenticated reader and neither reader has blocked the other.
- Comments can be created, edited, and deleted only by their authenticated
  author.
- Saves and reactions can be created or removed only for the authenticated
  actor.
- Reports are private to their reporter; inserts must remain `open`, cannot
  target the reporter's own activity, and expose no public report queue.
- Blocks can be created, read, and removed only by the blocker and cannot
  target the same account.
- Column-level grants prevent client code from setting server-owned IDs,
  timestamps, report status, or other readers' ownership fields.

## Rollback

The application already fails closed when these relations are unavailable, so
the safe runtime rollback is to deploy the previous application commit first.
Database tables should normally be retained to preserve social data. If a full
schema rollback is explicitly required, export the five Phase 18A tables, then
drop their policies, helper function, and tables in reverse dependency order.
Never drop `activity_feed` or `activity_likes` as part of Phase 18A rollback.

## Verification completed

- Domain tests cover trimmed/limited comments and single-reader reaction count
  transitions.
- Signed-in migration-unavailable feed checked read-only at desktop and
  390 × 844.
- The feed shows exactly one activation note, preserves existing Like buttons,
  and produces no document-level horizontal overflow or browser console errors.
- No comments, saves, reactions, reports, blocks, notifications, library rows,
  or uploads were created during QA.

## Activation acceptance still required

After the migration is applied, use two test accounts—not the owner's reading
records—to verify comment create/edit/delete, save/unsave, reaction switching,
notification recipients, duplicate prevention, report privacy, block filtering,
reload persistence, and RLS denial for another reader's mutations. Remove all
test social rows and accounts before declaring the hosted feature complete.
