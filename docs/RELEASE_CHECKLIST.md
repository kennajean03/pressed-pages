# Pressed Pages release checklist

## Automated gate

- [x] `npm run test:release` passes.
- [x] `git diff --check` passes.
- [x] Production build contains page-specific chunks.
- [x] No new browser console warnings or errors.

## Core library flows

- [x] Add Book opens Full Review, Currently Reading, TBR, Already Read, and
      Import Multiple.
- [ ] TBR saves without a start date or progress.
- [ ] TBR → Reading removes the book from Next 5 and compacts remaining ranks.
- [ ] Reading → Finished opens the review wizard and preserves reading logs.
- [ ] Edit and Delete operate only on owned books.
- [ ] Empty local or corrupted browser storage fails safely.

## Next 5

- [x] No more than five books can be selected.
- [ ] Arrow, position selector, and drag reordering all persist.
- [x] Mobile retains non-drag ordering controls.
- [x] “Maybe Next” adds waiting TBR books into open slots.
- [ ] Starting the first book moves it to Currently Reading.

## Review and graphics

- [ ] Finished Review renders sparse and complete review data.
- [ ] Spoiler controls hide and reveal protected text.
- [ ] Review Graphic changes template, size, and included fields.
- [ ] Square, Story, Pinterest, PNG, and SVG export actions remain available.

## Responsive and accessible behavior

- [x] Desktop width (1280px) has no horizontal overflow.
- [x] Mobile width (390px) has no horizontal overflow.
- [x] Skip link reaches the main content.
- [x] Every interactive control has a visible keyboard focus indicator.
- [ ] Progress bars expose accessible values.
- [x] Save and reorder messages use polite live regions.
- [x] Reduced-motion mode removes nonessential transitions.

## Signed-in verification

- [ ] Local reviews migrate once and the browser copy is cleared.
- [ ] TBR and Next 5 ranks reload after a fresh session.
- [ ] Reading logs and keepsakes reload from cloud tables.
- [ ] A transient cloud failure can be retried without changing visible data.
- [ ] Authorization or validation failures show their original message.
- [ ] Sign-out returns to the local library without leaking account data.

## Release record

- Build date: 2026-07-27
- Commit: pending final Phase 13Z–14E commit
- Tested by: Codex automated gate and in-app browser QA
- Environment: local Vite development and production build
- Known limitations: signed-in Supabase migration and multi-account checks still
  require manual verification with real test accounts.
