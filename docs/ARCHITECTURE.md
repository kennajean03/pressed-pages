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
are loaded with `React.lazy`, while Home, Add Book, and the review wizard stay
eager because they are primary entry flows.

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

## Scrapbook architecture

The existing asset registry, recipes, assemblies, anchors, composition hooks,
and scrapbook objects remain authoritative. Feature work should compose those
objects rather than introducing parallel asset systems.

## Verification

Run:

```text
npm run test:release
```

This performs the lint gate, domain/persistence tests, and production build.
