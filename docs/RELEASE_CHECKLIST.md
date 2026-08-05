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

## Phase 18A activation

- [x] Existing activity likes remain available when Phase 18A tables are absent.
- [x] Comments, saves, reactions, reports, and blocks fail closed before migration.
- [x] Desktop and 390px migration-unavailable feed have no horizontal overflow.
- [x] Apply `20260804_phase18a_activity_social_depth.sql` to the hosted project.
- [ ] Run the two-test-account ownership, recipient, blocking, and RLS matrix.
- [ ] Remove all Phase 18A test social rows before hosted approval.

## Phase 18B activation

- [x] Messages, requests, reports, and read state fail closed before migration.
- [x] The public-profile action respects no-one, followers, and everyone copy.
- [x] Desktop and 390px migration-unavailable messaging have no horizontal overflow.
- [x] Apply `20260804_phase18b_direct_messages.sql` to the hosted project.
- [ ] Run the two-test-account membership, request, retention, blocking, and RLS matrix.
- [ ] Remove all Phase 18B test conversations, reports, notifications, and accounts.

## Phase 18C activation

- [x] Discovery is off by default and fails closed before migration.
- [x] Existing profile tastes are not silently enrolled as searchable fields.
- [x] Results explain public signals without a compatibility percentage.
- [x] Desktop and 390px migration-unavailable discovery/settings have no horizontal overflow.
- [x] Apply `20260804_phase18c_reader_discovery.sql` to the hosted project.
- [x] Confirm hosted controls activate and an all-reader search returns a privacy-aware empty state before anyone opts in.
- [ ] Run the two-test-account opt-in, filtering, pagination, privacy, and blocking matrix.
- [ ] Remove all Phase 18C test discovery rows and accounts.

## Phase 18D Library views

- [x] Compact grid remains the first-time and invalid-preference fallback.
- [x] Shelf list is a separate artifact fed by the same filtered, sorted, and
  paginated review collection.
- [x] Grid and shelf preserve the same status-specific actions.
- [x] View preference persists locally and restores when Library is reopened.
- [x] Long titles, missing covers, sparse metadata, and all book statuses fit
  inside their paper treatment.
- [x] Signed-in narrow-view QA has no document-level horizontal overflow or
  browser console errors.
- [x] Phase 18D QA made no book, review, reading-log, upload, or cloud mutation.

## Phase 18E Appearance themes

- [x] Paper Light remains the fallback for missing, malformed, and retired
  theme identifiers.
- [x] Rose Letter and Sage Study use semantic shared tokens and material
  collections instead of page-specific color overrides.
- [x] Theme, reduced-motion, and layout-density preferences remain independent.
- [x] Theme focus and print treatments retain readable light-paper contrast.
- [x] Signed-in theme-preview QA produced no console errors or data mutation.

## Phase 18F Connected-account feasibility

- [x] Provider research rules out a live Goodreads, StoryGraph, or Hardcover
  connection without a safe scoped OAuth grant and clear data-rights path.
- [x] No client secret, bearer token, external connection control, or provider
  record was added during the feasibility spike.
- [x] Future import, sync, match, disconnect, deletion, encryption, and RLS
  requirements are documented before any connection implementation begins.

## Phase 18G Saved review-graphic designs

- [x] Saved designs normalize to a deterministic, versioned v1 document.
- [x] The clipping drawer supports save/update, duplicate, restore, delete,
  stale-source wording, and per-reader device-only backup.
- [x] Cover placement has pointer and keyboard-accessible controls; dragging is
  not the only movement path.
- [x] Cloud failure or a missing migration preserves the device drawer without
  touching a book, review, upload, or profile record.
- [ ] Apply `20260805_phase18g_review_graphic_designs.sql` to the hosted project.
- [ ] Run the Phase 18G two-account owner, attacker, stale-source, and
  shared-browser isolation matrix.
- [ ] Remove all disposable Phase 18G designs and test accounts before hosted approval.

## Release record

- Build date: 2026-08-05
- Last pushed implementation commit: `1ec5dae`
- Release-candidate working scope: Phase 14A through Phase 18G application work.
- Tests: 50 passing.
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
