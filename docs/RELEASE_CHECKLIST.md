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
- [x] Reading → Finished opens the review wizard and preserves reading logs.
- [x] Edit and Delete operate only on owned books.
- [x] Empty local or corrupted browser storage fails safely.

## Next 5

- [x] No more than five books can be selected.
- [x] Arrow, position selector, and drag reordering all persist.
- [x] Mobile retains non-drag ordering controls.
- [x] “Maybe Next” adds waiting TBR books into open slots.
- [x] Starting the first book moves it to Currently Reading.

## Review and graphics

- [x] Finished Review renders sparse and complete review data.
- [x] Spoiler controls hide and reveal protected text.
- [x] Review Graphic changes template, size, and included fields.
- [x] Square, Story, Pinterest, PNG, and SVG export actions remain available.

## Responsive and accessible behavior

- [x] Desktop width (1280px) has no horizontal overflow.
- [x] Mobile width (390px) has no horizontal overflow.
- [x] Skip link reaches the main content.
- [x] Every interactive control has a visible keyboard focus indicator.
- [x] Progress bars expose accessible values.
- [x] Save and reorder messages use polite live regions.
- [x] Reduced-motion mode removes nonessential transitions.

## Signed-in verification

- [x] Local reviews migrate once and the browser copy is cleared.
- [x] TBR and Next 5 ranks reload after a fresh session.
- [x] Reading logs and keepsakes reload from cloud tables.
- [x] A cloud failure leaves confirmed data intact and recovers after reconnect.
- [x] Authorization or validation failures preserve their original message.
- [x] Sign-out returns to the local library without leaking account data.

## Release record

- Build date: 2026-08-02
- Last pushed implementation commit: `f0f6492`
- Release-candidate working scope: Phase 14A through Phase 16F.
- Tests: 33 passing.
- Tested by: Codex automated release gate, ownership/storage regression tests,
  production audit, and signed-in desktop/laptop/tablet/phone route audits.
- Environment: local Vite development and production build.
- Production state: main JavaScript, React, and Supabase chunks are all below
  500 kB; the prior Vite large-chunk advisory is resolved. Local credentials
  are ignored and checked by the production audit.
- Remaining approval gate: the owner completes the final visual look-through
  and approves the Phase 16E–16F release checkpoint.
- Known limitation: a deliberate live Supabase policy-failure exercise remains
  appropriate immediately before public deployment.
