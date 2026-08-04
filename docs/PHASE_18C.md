# Phase 18C — Advanced reader discovery

Status: application implementation and hosted database activation complete on August 4, 2026. Two-account acceptance remains pending.

## What changed

- Find Readers now supports name, genre, format, vibe, and reading-style filters.
- Results are paginated in groups of 12 and show the total opted-in result count.
- Every result explains why it appeared using only the reader's public selections. There is no compatibility percentage or inferred private taste.
- Settings & Privacy now includes a Discovery folio where a reader can explicitly opt in and select the taste fields they want to publish.
- Discovery remains off by default and cannot be enabled unless the main profile is public.
- Missing database support fails closed: controls are disabled and no legacy profile data is exposed as a substitute.

## Database activation

The owner successfully ran `supabase/migrations/20260804_phase18c_reader_discovery.sql` in the hosted Supabase SQL editor on August 4, 2026.

The migration is additive. It creates:

- `reader_discovery_profiles`, an owner-controlled table for explicit public discovery preferences;
- GIN indexes for the four taste arrays;
- trigram indexes for public username/display-name search;
- `search_reader_discovery`, a signed-in RPC that enforces opt-in, public-profile status, self-exclusion, blocked-reader exclusion, filtering, and bounded pagination.

It does not update, migrate, or delete existing profiles, books, logs, activity, messages, or uploads.

## Acceptance matrix

Use two disposable accounts and remove them afterward.

1. Confirm a public profile with no discovery row does not appear.
2. Confirm saving preferences with discovery off does not expose the reader.
3. Turn discovery on and confirm the reader appears for the chosen taste filters.
4. Confirm unselected tastes do not appear on the result card.
5. Confirm a private main profile never appears, even if its discovery row is on.
6. Confirm neither reader can discover the other after either direction creates a block.
7. Confirm the current reader never appears in their own results.
8. Confirm page boundaries at 12 results and empty states on desktop and 390px widths.
9. Delete all disposable discovery rows and accounts.

## Verification completed locally

- Lint, 41 tests, and production build pass.
- Find Readers and Discovery settings were checked while signed in at desktop and 390px widths.
- No horizontal overflow was present.
- The migration-unavailable state was verified without changing owner data.
- After activation, the signed-in Discovery settings became available and an all-reader hosted search returned the correct privacy-aware empty state. The owner's opt-in and taste selections were not changed.
