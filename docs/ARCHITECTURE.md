# Pressed Pages architecture

## Application shell

`src/App.jsx` remains the stateful application shell while feature
responsibilities continue moving into focused modules.

- `src/domain/reviews/reviewModel.js` owns review and status normalization.
- `src/domain/reviews/nextFive.js` owns the curated TBR ordering rules.
- `src/domain/reading/progress.js` owns page/minute progress calculations.
- `src/domain/navigation/pageNavigation.js` owns page titles and back routes.
- `src/lib/reviewStorage.js` owns guarded browser persistence and cloud-review
  retry helpers.

Page components receive state and commands from the shell. Heavy destinations
are loaded with `React.lazy`. Home and Add Book stay eager because they are
primary entry flows; Already Read, backlog import, and the review-wizard steps
load only when their workflows are opened.

The global shell links to Community rather than Reading Log. Reading Log is an
active-book workflow and remains reachable from Currently Reading, where the
selected book provides the context required by the journal.

## Persistence contract

Every saved book uses the normalized review shape.

- TBR books never keep reading dates or current progress.
- Reading books keep a start date and never keep a Next 5 rank.
- Finished books receive completion progress and dates.
- DNF and shelf-only books do not retain finished-review metrics.
- Next 5 contains at most five ranked TBR books with contiguous ranks.

Local writes go through `saveReviewsToLocalStorage`. Cloud review upserts use
`upsertCloudReviewRows`, which retries transient network/server failures but
does not retry authorization or validation failures.

Non-library preferences use the guarded helpers in
`src/lib/preferencesStorage.js`. Uploaded asset cleanup resolves current-reader
paths through `assetOwnership.js` before calling Supabase Storage.

## Scrapbook architecture

The existing asset registry, recipes, assemblies, anchors, composition hooks,
and scrapbook objects remain authoritative. Feature work should compose those
objects rather than introducing parallel asset systems.

Content assigned to a paper slip must be sized and inset so every glyph,
caption, and page marker remains on the paper and reads as printed or written
onto it. Decorative paper corners must be true 90-degree corners with an inward
torn edge, not CSS wedges or detached page fragments. The registered
`paper-scrap-torn-celestial-corner-01` asset is the current shared dark-pattern
corner.

## Completed Phase 14 feature modules

- Reading journeys cover Currently Reading, Reading Log, Calendar, Finish Book,
  Finished Review, and Book Journey.
- Reading Almanac covers analytics, goals, achievements, monthly wrap-ups, and
  Year in Books.
- Reader identity covers owner profile, privacy-aware public profile, and the
  complete Settings & Privacy workspace.
- Community covers activity, reader discovery, challenges, buddy reads, and
  recipient-scoped notifications.
- Review Graphic produces exact-dimension SVG compositions for Square,
  Instagram Story, and Pinterest formats and exports current settings to PNG or
  SVG. Native sharing is used when available, with clipboard fallback.

These modules continue to use the shell-owned normalized review data and
existing Supabase ownership boundaries. Visual QA must remain read-only unless
a test explicitly requires mutation, and any test records must be removed.

## Verification

Run:

```text
npm run test:release
```

This performs the lint gate, domain/persistence tests, and production build.

As of the Phase 14M–14O working checkpoint, the suite contains 33 passing
tests. `npm run test:release` also builds the app and runs the production audit,
which rejects tracked credentials and JavaScript or CSS chunks over 500 kB.
Phase 14P is reserved for the final owner-led mockup comparison.
