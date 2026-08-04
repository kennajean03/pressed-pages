# Phase 17E — Optional product-depth roadmap

Date: August 4, 2026

Status: complete.

## Purpose

Phase 17E separates the remaining product depth visible in the July 28 mockups
from the completed visual-art-direction work. These items require real data,
privacy rules, persistence, error handling, empty states, and responsive UI.
They must not be represented by decorative controls before that behavior
exists.

This is a planning and scope-definition phase. It intentionally does not alter
the current schema, saved reader data, or production behavior.

## Honest current-state audit

| Area | What is real now | What remains |
| --- | --- | --- |
| Community | Following, public profiles, activity events, activity likes, challenges, Buddy Reads, and notifications | Comments, saved posts, richer reactions, moderation tools, and direct messages |
| Reader discovery | Search by public display name or username, public reader cards, profile opening, and following | Explicit genre/format/vibe filters and transparent recommendation criteria |
| Library | Six real status shelves, extensive filters, sorting, pagination, compact cards, and Next 5 ordering | A second, genuinely distinct shelf/list presentation with persisted preference |
| Appearance | Persisted cozy/compact density and full/reduced motion | A complete token-backed theme and accent system with contrast-safe variants |
| Connections | Reader followers/following are real | Third-party account connections such as Goodreads or StoryGraph |
| Review graphics | Four templates, three export sizes, configurable fields, colors, type, backgrounds, placement, embellishments, SVG/PNG export, and captions | Saved designs, design history, reusable presets, and accessible drag/reorder placement |
| Notes | Plain-text initial notes, reading logs, review fields, captions, and keepsakes | Sanitized structured formatting with a stable storage format and plain-text fallback |

Notification categories and counts already operate on saved notification rows;
future notification work belongs with whichever feature creates the new event,
not in a separate imitation layer.

## Recommended future sequence

### 18A — Community comments, saves, and reactions

Status: application implementation and hosted database activation complete on
August 4, 2026; two-account RLS acceptance remains pending. See
`docs/PHASE_18A.md`.

- Add separate comment, saved-activity, and reaction tables rather than packing
  mutable social state into `activity_feed.event_data`.
- Scope reads to visible activity and writes to the authenticated actor.
- Add edit/delete ownership, pagination, optimistic rollback, notification
  creation, reporting, and blocked-reader behavior.
- Preserve the existing `activity_likes` path through a migration or explicit
  compatibility layer.

This is the best first expansion because the feed and notification surfaces
already exist and can accept honest new behavior without a new navigation
system.

### 18B — Direct messages and reader safety

Status: application implementation and hosted database activation complete on
August 4, 2026; two-account RLS acceptance remains pending. See
`docs/PHASE_18B.md`.

- Define conversation membership, message rows, read state, request/inbox
  boundaries, blocking, reporting, and retention before adding a Message
  button.
- Prevent profile privacy or follow state from being treated as automatic
  permission to message.
- Add recipient-scoped realtime updates only after row-level security tests
  cover sender, recipient, removed-member, and blocked-reader cases.

Messaging must remain absent until this complete safety boundary exists.

### 18C — Advanced reader discovery

Status: application implementation and hosted database activation complete on
August 4, 2026; two-account acceptance remains pending. See
`docs/PHASE_18C.md`.

- Add opt-in searchable taste fields for genres, formats, vibes, and reading
  style.
- Keep recommendations explainable: show the public signals behind a result
  rather than a hidden compatibility percentage.
- Add query indexes, filterable search, pagination, privacy-aware empty states,
  and a way to exclude blocked readers and the current reader.

### 18D — Alternate Library views

- Keep the current compact grid as the default.
- Add a purpose-built shelf/list artifact rather than stretching the existing
  card with CSS.
- Persist the view preference, preserve every filter/action, and test long
  titles, missing covers, sparse metadata, pagination, and phone behavior.

### 18E — Complete appearance themes

- Build themes from semantic material and color tokens, not per-page overrides.
- Start with the approved Paper theme, then add only fully specified variants
  with contrast, focus, print/export, reduced-motion, and all-route coverage.
- Store a versioned theme identifier in profile preferences and fall back safely
  when an older or unknown value is encountered.

### 18F — Connected reading accounts

- Choose providers only after confirming supported OAuth, import/export rights,
  rate limits, deletion requirements, and duplicate-book reconciliation.
- Keep provider tokens server-side and encrypted; never place secrets in the
  Vite client or profile data.
- Separate one-time import, recurring sync, conflict resolution, disconnect,
  and provider-data deletion into explicit flows.

This phase should begin with a provider feasibility spike, not decorative
connection buttons.

### 18G — Saved graphic designs and placement tools

- Save a versioned design document containing template, format, field toggles,
  style choices, element positions, and the source review identifier.
- Add duplicate, rename, delete, recent-design, and stale-source handling.
- Provide keyboard-accessible move/order controls alongside pointer dragging;
  never make dragging the only placement mechanism.
- Keep exports deterministic and compatible with older saved design versions.

### 18H — Structured rich-text notes

- Define the smallest supported formatting set before choosing an editor.
- Store a sanitized, versioned document model plus derived plain text for
  search, export, accessibility, and migration fallback.
- Preserve current plain-text notes during migration and keep paste, undo,
  keyboard, mobile, character-limit, and abandoned-upload behavior safe.

## Cross-phase requirements

Every product-depth phase must include:

- a reviewed schema and row-level-security policy before UI controls ship;
- ownership, privacy, blocking, deletion, and notification rules where social
  data is involved;
- migration and rollback notes that preserve current records;
- loading, empty, error, offline/retry, and long-content states;
- keyboard, screen-reader, reduced-motion, desktop, tablet, and phone checks;
- domain or persistence tests plus the full `npm run test:release` gate;
- removal of every QA record and upload before handoff.

## Release decision

None of these features blocks the current Pressed Pages release. The present
application is honest and visually complete without them. Future work should
begin only when the owner chooses a product capability, provider, and privacy
boundary—not merely because a reference mockup contains a control.
