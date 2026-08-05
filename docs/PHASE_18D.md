# Phase 18D — Alternate Library views

Completed August 5, 2026.

## What shipped

- The existing compact card grid remains the safe first-time default.
- Readers can switch to a purpose-built **Shelf list** from the Library view.
- The selected view is stored locally and restored when the Library is opened
  again. Unknown or older stored values safely fall back to the compact grid.
- Both views consume the same filtered and paginated review collection, so
  search, shelf filters, sort order, page boundaries, and counts cannot drift.
- The shelf artifact preserves the existing status-specific actions: open,
  start reading, Next 5 management, finish, edit, and delete.
- Reading, TBR, finished, and DNF rows use their own concise ledger details.
  Long titles and notes wrap inside their paper; missing covers render a stable
  placeholder; sparse metadata does not collapse the row.
- Narrow screens recompose the artifact instead of shrinking a desktop card.

## Architecture

- `src/domain/library/libraryViews.js` owns the version-stable storage key and
  normalization boundary.
- `src/components/LibraryShelfRow.jsx` is a distinct Library presentation
  artifact. It does not stretch or override `LibraryBookCard`.
- `LibraryPage` remains the single owner of filters, sorting, pagination, and
  action callbacks, then selects only the presentation component.
- `src/styles/phase18d-library-views.css` contains the isolated responsive
  composition layer.

## Verification

- Full-size Library layout regression check: both the view switcher and the selected shelf artifact span their intended scrapbook columns instead of collapsing into a single narrow grid cell.

- `npm run lint`
- `npm test` — 43 tests passing, including view-preference normalization
- `npm run build`
- `npm run test:release`
- `git diff --check`
- Signed-in, read-only browser QA on the real Library:
  - compact grid default and 12-card page;
  - shelf list with the same 12 records and existing actions;
  - preference persisted across reload and reopening Library;
  - long title, Reading, TBR, Finished, and sparse-data treatments;
  - narrow viewport with no document-level horizontal overflow;
  - no browser console errors.

No book, review, reading-log, upload, account, or Supabase record was created,
edited, or deleted during Phase 18D QA.
