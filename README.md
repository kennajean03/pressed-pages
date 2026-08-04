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
