# Pressed Pages

Pressed Pages is a responsive reading journal and social scrapbook built with
React, Vite, and Supabase. It tracks a reader’s library, TBR, reading sessions,
reviews, keepsakes, goals, wrap-ups, community activity, and shareable review
graphics.

## Local development

Requirements:

- Node.js 20 or newer
- npm
- a Supabase project with the Pressed Pages schema and storage buckets

Create an untracked `.env` file from `.env.example`, then provide:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Run:

```text
npm install
npm run dev
```

## Release verification

```text
npm run test:release
git diff --check
```

The release command runs ESLint, the domain/data-safety tests, and a production
Vite build. Visual changes must also be checked in the signed-in local app at
desktop, tablet, and phone widths without modifying the owner’s real library.

## Data-safety contract

- Supabase rows remain scoped to the signed-in user.
- Local-library fallback data is migrated once and cleared only after a
  confirmed cloud save.
- Uploaded covers, graphics, and reading-memory photos are deleted only when
  their paths belong to the current user.
- Visual QA is read-only. Any intentionally created test records must be
  removed before handoff.

See [Pressed Pages project memory](docs/PRESSED_PAGES_PROJECT_MEMORY.md) for the
current roadmap, visual rules, architecture, and acceptance criteria.

The current release-candidate record is in
[Phase 16F final handoff](docs/PHASE_16F_FINAL_HANDOFF.md).

Optional post-release product expansion is scoped in the
[Phase 17E product-depth roadmap](docs/PHASE_17E_PRODUCT_DEPTH_ROADMAP.md).

Phase 18A community interaction implementation and its required additive
Supabase migration are documented in [Phase 18A](docs/PHASE_18A.md).

Phase 18B request-gated direct messages and reader-safety boundaries are
documented in [Phase 18B](docs/PHASE_18B.md).

Phase 18C opt-in, explainable reader discovery and its additive database
migration are documented in [Phase 18C](docs/PHASE_18C.md).

Phase 18D alternate compact-grid and shelf-list Library views are documented in
[Phase 18D](docs/PHASE_18D.md).

Phase 18E versioned, token-backed appearance themes are documented in
[Phase 18E](docs/PHASE_18E.md).

Phase 18F's provider feasibility decision is documented in
[Phase 18F](docs/PHASE_18F.md).
