# Phase 16A — purpose-built compact shelf cards

Date: August 2, 2026

## Status

Phase 16A is complete and ready for owner review.

## What changed

- Rebuilt the shared `LibraryBookCard` information hierarchy for both Library
  and TBR instead of compressing the legacy card with CSS.
- The cover remains the focal artifact while status, title, author, format, and
  the appropriate status summary occupy one bounded printed column.
- Reading cards retain start date, page progress, and the existing progress bar.
- TBR cards show the saved reason/initial note when available and a quiet
  “Saved for later” fallback when not.
- Finished cards condense on-paper, obsession, and spice scores into a small
  three-column ledger.
- Cards show at most three trope/theme labels and report additional tags with a
  `+N` marker rather than expanding indefinitely.
- The primary Open action remains immediately available. Start Reading,
  Next 5, Finish, Edit, and Delete remain available inside a native accessible
  Actions pocket.
- Missing covers use a restrained archive glyph instead of emoji.
- Next 5 and Brain Chemistry status labels no longer use emoji as their primary
  icon language.

## Responsive result

- Wide desktop (1440px): five Library cards per row.
- Laptop widths: four Library cards per row.
- TBR retains four wide-desktop cards because its filter/sidebar composition is
  narrower.
- Phone (390px): one full-width journal card per row.
- Real cover/text bounding boxes retain an 11–14px gap at the verified widths.
- Action menus are floating paper pockets on desktop and expand inline on
  phones.

## Behavior preserved

- Open review/TBR entry.
- Reading progress and format-aware data.
- Start Reading and Finish Book.
- Add/remove Next 5 and full-shelf disabled state.
- Edit and guarded Delete.
- Review metrics, tags, dates, missing metadata, pagination, filtering, and
  Supabase ownership.

## Verification

- Real signed-in Library records checked read-only at 1440 × 1000 and 390 ×
  844.
- Actions pocket opened and closed without triggering a record mutation.
- No document-level horizontal overflow.
- No browser console warnings or errors.
- Full release checks are recorded in the final Phase 16A handoff.

## Files

- `src/components/LibraryBookCard.jsx`
- `src/styles/phase16a-compact-shelf.css`
- `src/main.jsx`
- `docs/PHASE_16A.md`
- `docs/PRESSED_PAGES_PROJECT_MEMORY.md`
