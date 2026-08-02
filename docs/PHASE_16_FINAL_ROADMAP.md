# Phase 16 — final changes roadmap

Date: August 2, 2026

## Goal

Phase 16 is the final product-and-polish phase. Its job is not to restyle the
application again. It closes the remaining observable gaps between the July 28
mockups and the real Pressed Pages product, then performs the release-level
visual, accessibility, data-safety, and responsive sign-off.

## 16A — purpose-built compact shelf cards

Create one reusable compact, cover-forward shelf card for Library and TBR.
Unlike the rejected Phase 15I CSS squeeze, the component must deliberately
reflow status, title, author, format, progress/review summary, and actions.

Acceptance:

- five cards may fit on a wide desktop only when all real content stays on its
  paper;
- four cards remain acceptable at laptop widths;
- status-changing and destructive actions stay available but move behind a
  clear details/actions area instead of dominating every card;
- long titles, missing covers, many tropes, and sparse metadata remain safe;
- mobile remains a readable one-column journal.

## 16B — route-specific final composition details

Perform one last targeted comparison on the routes whose mockups contain the
most distinctive arrangements: Add Book, Currently Reading, Reading Log,
Calendar, Finish Book/Book Journey, Monthly Wrap-Up, Year in Books, Profile,
Notifications, Settings, and Review Graphics.

This is limited to true residual differences such as:

- shortening a paper that still contains avoidable empty space;
- regrouping statistics into a ledger or strip;
- improving cover/photo/quote prominence;
- replacing a remaining primary emoji with the shared line-icon language;
- adding a registered botanical, stamp, or torn patterned corner where it
  completes an otherwise empty composition;
- removing a repeated attachment or decorative object that does not serve the
  layout.

No route receives another blanket overlay stylesheet unless a shared component
cannot express the required change.

## 16C — honest mockup feature depth

Status: complete August 2, 2026. The release includes real notification
category filters and a working application-wide motion/density preference.
Mockup-only features without supporting data or behavior remain deliberately
absent. See `docs/PHASE_16C.md`.

The following reference ideas are still product features rather than visual
polish. Implement only real, data-backed behavior; do not add dead controls.

Priority product decisions:

1. Community reactions/comments/saves and direct messages.
2. Reader-discovery filters and recommendation criteria.
3. Notification categories and counts.
4. Connected-account integrations.
5. A true appearance/theme system.
6. Richer review-graphic templates, embellishment placement, saved designs,
   and backgrounds.
7. Optional Library grid/shelf view switch and rich-text initial notes.

If these are intentionally deferred from the first release, the final app is
still visually complete; the controls must remain absent rather than simulated.

## 16D — signed-out and empty-state parity

- Compare the signed-out welcome/auth collage with the arrival mockup.
- Verify loading, no-current-book, empty library, empty TBR, no logs, no social
  activity, no notifications, missing covers, and sparse reviews.
- Keep sample-only mockup content out of the real app.
- Do not create persistent QA records unless unavoidable; remove any test data
  and uploads before handoff.

## 16E — final responsive and accessibility sign-off

Audit every primary and secondary route at:

- 1440 × 1000 desktop;
- 1280 × 800 laptop;
- 820 × 1000 tablet;
- 390 × 844 phone.

Required checks:

- no horizontal document overflow;
- all content visibly inside its paper;
- no cover/title, tape/paper, or control/decoration collisions;
- correct focus order, names, selected states, and keyboard operation;
- reduced-motion behavior;
- sufficient contrast for muted handwriting and metadata;
- no browser console warnings or errors.

## 16F — release closure

- Run lint, automated tests, production build, release audit, and diff checks.
- Review Supabase ownership, upload cleanup, local-storage fallback, navigation,
  review calculations, and destructive-action guards.
- Refresh the durable project memory and final handoff.
- Complete the owner's last visual review, resolve only the resulting punch
  list, then commit and push the release checkpoint.

## Definition of done

Pressed Pages is done when the live application feels like the same product as
the mockups—not when every sample number or invented mockup feature is copied.
Real data, safe behavior, readable physical papers, and responsive composition
take precedence over pixel-for-pixel imitation.
