# Phase 18G — Saved review-graphic designs and accessible placement

Date: August 5, 2026

Status: application implementation complete; hosted database activation is pending.

## Outcome

Review Graphic now has a real **Clipping drawer** rather than a decorative
placeholder. A reader can name and save a graphic design, update it, duplicate
it, restore its visual choices, or remove it. Each design is a versioned
document containing the chosen template, export format, visible facts, safe
styling values, cover placement, vertical cover offset, timestamps, and the
source review identifier plus its last-known book title.

The graphic renderer continues to read normalized options, so SVG and PNG
exports remain deterministic. Unknown, malformed, or future values safely fall
back to the supported v1 choices instead of changing a saved design's output
unpredictably.

## Reader behavior

- The drawer saves up to 40 recent designs for the current reader on the
  current device. Device-only drawers are keyed per signed-in reader; anonymous
  work uses a separate guest drawer.
- **Save / update** keeps the currently selected design current; **Duplicate**
  makes an independent reusable copy.
- **Use style** restores the saved template, size, field choices, and style to
  the open review. It intentionally does not overwrite review data.
- The native cover-placement range works with pointer dragging and keyboard
  arrow keys. Adjacent Move up and Move down buttons provide an explicit
  non-drag path.
- If the source review is no longer present in the reader's saved library, the
  drawer says so while retaining the source title and allowing the reusable
  design style to be loaded. It never recreates, deletes, or changes a book.

## Cloud persistence and migration

The additive migration is
`supabase/migrations/20260805_phase18g_review_graphic_designs.sql`.

It creates `public.review_graphic_designs` with only these responsibilities:

| Field group | Purpose |
| --- | --- |
| Owner and timestamps | Identifies the authenticated owner and supports recent-design order. |
| Version and name | Makes the v1 format explicit and keeps reader-facing labels bounded. |
| Source review snapshot | Records the original app review identifier and last-known title without creating or altering a review. |
| `design_data` JSON | Holds only normalized presentation choices: template, size, fields, and style. |

The table has owner-only RLS for select, insert, update, and delete. It does
not reference book, review, image, upload, or provider tables, and no existing
record is changed by this migration. When the table is unavailable, the app
fails closed to the per-reader device drawer and explains that cloud saving is
not active. When it becomes available, cloud and device designs are merged by
design ID so a successful load cannot discard a device-only draft. Re-save a
device-only draft to publish it to the cloud intentionally.

### Activation steps

1. In the intended Supabase project's SQL Editor, open and run the full
   contents of `supabase/migrations/20260805_phase18g_review_graphic_designs.sql`.
2. Reload the signed-in local app and open a saved review's Review Graphic
   page. The drawer should no longer say cloud setup is pending.
3. Create a disposable design, reload the app, restore it, and confirm its
   chosen template/format/fields/style remain the same.
4. Before production approval, run the two-account RLS matrix below and remove
   every disposable design and test account.

## Required two-account RLS matrix

Use two disposable readers, A and B. Do not use an existing library record for
the test source.

| Check | Expected result |
| --- | --- |
| A creates, lists, updates, and deletes A's design | Each action succeeds; A sees only A's drawer rows. |
| B lists the table/drawer after A creates a design | B receives no A rows. |
| B tries to read, update, or delete A's design ID | No row is returned or changed; A's design remains intact. |
| B tries to insert a row with A's `user_id` | RLS rejects it. |
| A deletes the source review after saving a design | The design remains; its stale-source wording appears and its style can still be loaded. |
| A signs out then B signs in on the same browser | B cannot see A's device-only drawer. |

## Verification

- `npm run test:release` passes with 50 tests, including the saved-design
  normalization, versioned cloud-row, and per-reader local-drawer tests.
- Desktop and 390px Review Graphic QA confirm the drawer and keyboard/pointer
  placement controls fit without document-level horizontal overflow or console
  errors.
- QA does not save, delete, upload, or edit a live review, book, or cloud row.

## Out of scope

This is a saved v1 presentation document, not a freeform editor. It does not
promise arbitrary element dragging, z-order, collaboration, design sharing,
external image imports, or a third-party account connection. Those require
their own explicit data, ownership, and accessibility decisions.
