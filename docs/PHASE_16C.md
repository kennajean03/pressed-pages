# Phase 16C completion handoff

Date: August 2, 2026

## Status

Phase 16C — honest mockup feature depth — is implementation-complete and ready
for owner review.

## Product decisions

This pass keeps the first release honest: a mockup idea appears in the product
only when Pressed Pages has real data and working behavior to support it.

- Notification categories are included because the existing notification rows
  provide real read state and event types. All, Unread, and Social now filter
  the real inbox and show matching counts.
- Appearance preferences are included because they are already stored in the
  reader profile. Reduced movement now applies throughout the app, and Cozy or
  Compact density now changes the global composition and scrapbook density.
- Existing follows, likes, public-profile search, challenge participation,
  buddy reads, review-graphic exports, and Library actions remain available
  because they already have real application behavior.
- Comments, saved posts, direct messages, calculated reader recommendations,
  third-party account connections, saved graphic designs, richer template
  placement tools, a shelf-view switch, and rich-text book notes remain
  deferred. No inactive controls were added for them.

## What changed

- Added accessible All, Unread, and Social notification filters with pressed
  states, real totals, and filter-specific empty copy.
- Connected the saved Motion setting to a root reduced-motion mode independent
  of the operating-system preference.
- Connected the saved Layout density setting to global spacing tokens and the
  shared scrapbook provider.
- Replaced the stale Appearance helper text with a truthful description of the
  behavior that now exists.

## Safety and verification

- No library records, reading logs, uploads, profile fields, social records, or
  notification rows were created, edited, or deleted during QA.
- Appearance selections were exercised without saving, then restored to the
  account's original in-memory values.
- Signed-in desktop and 390 × 844 phone checks passed without document-level
  overflow or browser console errors.
- Lint, 33 automated tests, production build, release audit, and whitespace
  checks pass.

## Next phase

Phase 16D: signed-out and empty-state parity. Compare the arrival experience
and verify genuine empty, loading, sparse, and missing-image states without
leaving sample content or persistent QA records behind.
