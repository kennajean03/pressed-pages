# Pressed Pages release checklist

## Automated gate

- [x] `npm run test:release` passes.
- [x] `git diff --check` passes.
- [x] Production build contains page-specific chunks.
- [x] No new browser console warnings or errors.

## Core library flows

- [x] Add Book opens Full Review, Currently Reading, TBR, Already Read, and
      Import Multiple.
- [x] TBR saves without a start date or progress.
- [x] TBR → Reading removes the book from Next 5 and compacts remaining ranks.
- [ ] Reading → Finished opens the review wizard and preserves reading logs.
- [ ] Edit and Delete operate only on owned books.
- [x] Empty local or corrupted browser storage fails safely.

## Next 5

- [x] No more than five books can be selected.
- [ ] Arrow, position selector, and drag reordering all persist.
- [x] Mobile retains non-drag ordering controls.
- [x] “Maybe Next” adds waiting TBR books into open slots.
- [x] Starting the first book moves it to Currently Reading.

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

- [x] Local reviews migrate once and the browser copy is cleared.
- [x] TBR and Next 5 ranks reload after a fresh session.
- [x] Reading logs and keepsakes reload from cloud tables.
- [x] A cloud failure leaves confirmed data intact and recovers after reconnect.
- [ ] Authorization or validation failures show their original message.
- [x] Sign-out returns to the local library without leaking account data.

## Release record

- Build date: 2026-07-27
- Commit: `d306606`
- Tested by: Codex automated gate and in-app browser QA; signed-in flows manually
  verified by the project owner with isolated main and test-account sessions.
- Environment: local Vite development, production build, normal Chrome, and
  Incognito Chrome.
- Known limitations: authorization and validation-error wording still needs a
  deliberate Supabase policy-failure test before public production release.
