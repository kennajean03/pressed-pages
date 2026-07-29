# Pressed Pages project guidance

Before changing Pressed Pages, read:

- `docs/PRESSED_PAGES_PROJECT_MEMORY.md`

That document is the durable source for:

- the Phase 14 completion roadmap;
- the approved scrapbook visual and theming direction;
- current architecture that must be preserved;
- account-data and storage-cleanup safety rules;
- visual and functional acceptance criteria.

## Non-negotiable implementation rules

- Preserve existing saved data, Supabase ownership, upload cleanup, navigation,
  review calculations, and responsive behavior while recreating the UI.
- Never alter or delete the user's existing library records during visual QA.
- Test data created for QA must be removed before handoff.
- Reuse the scrapbook asset registry, semantic material roles, composition
  recipes, and existing scrapbook components before introducing replacements.
- Do not reintroduce generic global faux tape or duplicate fasteners.
- Verify meaningful visual changes in the local app at desktop and mobile widths.
- Run the build, lint, and diff checks before declaring a pass complete.
