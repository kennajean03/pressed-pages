# Phase 17 — Art-direction expansion roadmap

Date: August 2, 2026

## Goal

Push Pressed Pages from a technically complete scrapbook application toward
the individually art-directed richness of the July 28 mockups without undoing
the release candidate's accessibility, data safety, responsive behavior, or
paper-fit rules.

Phase 17 is intentionally visual-first. It does not add mockup controls unless
their underlying product behavior and privacy model are also implemented.

## 17A — Coordinated collage asset family

Status: complete on August 2, 2026.

Create and register a small family of authentic ripped-corner and archival
fragments based on the owner's supplied references:

- midnight celestial corner;
- vintage botanical/typeset corner;
- soft rose tissue or love-letter corner;
- handwritten manuscript corner;
- one dark floral or damask fragment.

Every asset must have two true outer corner edges and one irregular torn inner
edge. No CSS wedges, detached page pieces, tidy triangles, or generic gradients.
Assets must use transparency, enter through the asset registry, and remain
selective focal accents.

Delivered registry family:

- `paper-scrap-torn-celestial-corner-midnight-02` — top-right midnight
  celestial paper;
- `paper-scrap-torn-vintage-botanical-corner-01` — top-left aged typeset,
  engraved rose, and butterfly;
- `paper-scrap-torn-rose-letter-corner-01` — bottom-left blush tissue and
  faded correspondence;
- `paper-scrap-torn-manuscript-corner-01` — top-right tea-stained handwritten
  manuscript;
- `paper-scrap-torn-dark-damask-corner-01` — bottom-right distressed charcoal
  damask.

All five are 1254px transparent PNGs with their physical orientation built
into the source. They are available through `papers.patternedCorner` plus
smaller semantic roles for botanical, romantic, manuscript, and dark uses.
Phase 17B owns selective route placement; 17A does not scatter them globally.

## 17B — Flagship page art direction

Status: complete on August 2, 2026.

Give Home, Currently Reading, Profile, Monthly Wrap-Up/Year in Books, and the
Book Journey/final review their own recognizable collage rhythm. Use the new
asset family, existing botanicals, photos, library cards, stamps, and brass
fasteners to vary silhouette and color without covering content.

Acceptance:

- each flagship page is recognizable from composition alone;
- no repeated corner asset appears in adjacent modules;
- real cover, title, metadata, and controls remain inside their papers;
- desktop gains density and asymmetry while phone preserves reading order.

Delivered composition map:

- Home keeps the midnight celestial corner on its reading-pulse spread;
- Currently Reading uses a restrained blush love-letter corner beside the
  opening stats rail;
- Profile uses a handwritten manuscript corner tucked into the hero's
  top-right edge;
- Monthly Wrap-Up uses the vintage botanical/typeset corner at the opening
  edge of the keepsake;
- Year in Books uses a smaller charcoal damask corner at the annual reflection
  edge;
- Book Journey uses the vintage botanical/typeset corner alongside the mounted
  cover, echoing a found archival clipping.

The shared `FlagshipCorner` renderer resolves every accent through the asset
registry. All pieces are decorative, pointer-inert, outside normal document
flow, and reduced/tucked further on narrow screens. Desktop and 390px checks
confirmed no horizontal document overflow and no text/control collisions.

## 17C — Supporting-route visual variety

Status: complete on August 2, 2026.

Apply lighter route-specific treatments to Library/TBR, Reading Log, Calendar,
Goals/Achievements, Community, Settings, and Review Graphics. Prefer small
registered accents, paper changes, and photographic/ledger moments over larger
new panels.

Delivered supporting-route map:

- Library uses the vintage botanical/typeset corner, while the TBR shelf shifts
  to the midnight celestial corner so the two shelf states read differently;
- Reading Log and Settings use the handwritten manuscript corner as quiet desk
  fragments;
- Reading Goals uses the vintage botanical/typeset corner, Achievements uses
  the dark damask corner, and Calendar uses the blush love-letter corner;
- Community Activity uses the blush love-letter corner, while Review Graphics
  uses the midnight celestial corner for a more editorial/shareable character.

These accents reuse the shared `FlagshipCorner` renderer and asset registry,
but are intentionally smaller, softer, and less saturated than the flagship
placements. Desktop and phone-width checks confirmed that they remain tucked
into paper edges, do not cover headings or controls, and create no horizontal
document overflow.

## 17D — Archival icon and micro-detail pass

Status: complete on August 3, 2026.

Normalize the remaining UI symbols into one restrained bookish line language.
Add route-specific captions, stamps, folio numbers, specimen labels, and small
handwritten notes only where they strengthen the physical metaphor.

The shared `ArchivalDetail` component now gives Library/TBR, Reading Log,
Goals, Achievements, Calendar, Settings, Review Graphics, and Community
Activity their own compact folio label, catalog caption, restrained line mark,
and route-specific marginal note. The details sit inside established hero
papers rather than floating globally, so each reads as part of the printed
page. Prominent static interface emoji in goals, add-book choices, Year in
Books, and monthly wrap-ups were normalized to the same archival glyph
language; reaction emoji and reader-selected mood symbols remain intact where
they carry product meaning. Desktop and phone-width checks confirmed paper fit,
zero horizontal document overflow, and no browser console errors.

## 17E — Optional product-depth roadmap

Status: complete on August 4, 2026.

Treat comments/saves/messages, advanced reader discovery, alternate shelf
views, complete themes, connected accounts, saved graphic designs, draggable
embellishments, and rich-text notes as separate data-backed product phases.
Do not simulate them to make a screenshot resemble the mockups.

The implementation audit and recommended Phase 18 sequence are documented in
`docs/PHASE_17E_PRODUCT_DEPTH_ROADMAP.md`. It records what is already real,
identifies the exact remaining product gaps, and defines the schema, privacy,
migration, accessibility, and verification boundaries required before any new
control ships. No schema, saved record, or runtime behavior changed in this
planning phase.

## Release discipline

Each visual pass must be verified at desktop and phone widths, preserve the
shared scrapbook architecture, run the full release gate, and avoid mutating
the owner's saved data. Phase 16E–16F remains the technical baseline.
