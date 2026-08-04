# Pressed Pages Project Memory

Last updated: August 4, 2026

## Phase 17 art-direction expansion

- The owner approved extending beyond the Phase 16 technical release candidate
  to bring more of the mockups' individually composed collage richness into the
  real product.
- Phase 17 is documented in `docs/PHASE_17_ART_DIRECTION_ROADMAP.md` and begins
  with a coordinated family of true torn-corner assets, followed by flagship
  page composition, supporting-route variety, and archival micro-details.
- The supplied mockups and torn-corner reference collages are the visual
  guidance. New assets must have true 90-degree outer corners, irregular torn
  inner contours, transparent backgrounds, and registry-backed usage.
- Phase 17A is complete with five physically plausible transparent corners:
  midnight celestial, vintage botanical/typeset, rose tissue love-letter,
  handwritten manuscript, and dark damask. Semantic registry roles reserve
  their selective route placement for Phase 17B rather than repeating them
  globally.
- Phase 17B is complete. Home, Currently Reading, Profile, Monthly Wrap-Up,
  Year in Books, and Book Journey now use distinct registry-backed collage
  accents through the shared `FlagshipCorner` renderer. Each accent is
  decorative and pointer-inert, stays outside normal document flow, and tucks
  farther beyond the edge on phone widths. The visual pass found and corrected
  three initial content collisions before handoff.
- Phase 17C is complete. Library/TBR, Reading Log, Calendar, Goals,
  Achievements, Community Activity, Settings, and Review Graphics now receive
  smaller route-specific registry accents through the same `FlagshipCorner`
  renderer. Supporting accents are deliberately softer and less saturated than
  flagship pieces. Desktop and phone-width QA confirmed no heading/control
  collisions and no horizontal document overflow.
- Phase 17D is complete. The shared `ArchivalDetail` component adds restrained
  route-specific folios, specimen labels, line marks, and handwritten marginal
  notes to Library/TBR, Reading Log, Calendar, Goals, Achievements, Community
  Activity, Settings, and Review Graphics. High-visibility static UI emoji in
  goals, add-book choices, Year in Books, and monthly wrap-ups now use the same
  bookish archival glyph language, while reaction and reader-selected mood
  emoji remain semantic. Desktop and phone-width QA confirmed the labels stay
  printed inside their paper, create no horizontal overflow, and produce no
  browser console errors.
- Phase 17E is complete as an honest product-depth audit and roadmap. Activity
  likes, notification filters/counts, public reader search, motion/density
  preferences, and the configurable graphic generator are recognized as
  existing real behavior. Remaining work is split into independent future
  phases for community comments/saves/reactions, safe messaging, advanced
  discovery, alternate Library views, complete themes, third-party
  connections, saved/draggable graphic designs, and structured rich-text
  notes. Each phase requires schema, RLS, privacy, migration, accessibility,
  responsive, and release-gate coverage before its controls appear. See
  `docs/PHASE_17E_PRODUCT_DEPTH_ROADMAP.md`.
- Phase 16E–16F remains the safety, accessibility, responsive, and release
  baseline. Visual expansion must not reintroduce overflow, fake features, or
  data mutation.

## Phase 18 product-depth implementation

- Phase 18A application work is complete with comments, saved activities,
  richer one-per-reader reactions, owned comment editing/deletion, reporting,
  blocking, notifications, optimistic rollback, and a fail-closed migration
  state. The additive RLS migration is
  `supabase/migrations/20260804_phase18a_activity_social_depth.sql`.
- The owner applied the Phase 18A migration in Supabase on August 4, 2026 and
  the signed-in app exposed the enabled social controls. The disposable
  two-account RLS matrix in `docs/PHASE_18A.md` remains pending.
- Phase 18B application work is complete with request-gated private messages,
  per-profile request permissions, accepted/declined/closed states, unread
  state, notifications, reporting, blocking, retention, responsive UI, and a
  fail-closed migration boundary. The owner applied
  `supabase/migrations/20260804_phase18b_direct_messages.sql` on August 4, 2026;
  the signed-in inbox then loaded a real pending request with no pre-acceptance
  reply path. Complete the disposable two-account RLS matrix in
  `docs/PHASE_18B.md` before enabling any recipient-scoped realtime subscription.

## Latest Phase 16F release-closure pass

- Completed the final ownership, storage-cleanup, local-fallback, navigation,
  review-calculation, and destructive-action audit without mutating live data.
- Confirmed owner filters on review and reading-log changes, recipient filters
  on notifications, participant filters on social/Buddy Read actions, and
  current-reader path validation on uploaded-asset cleanup.
- Reconfirmed the 33-test suite, lint, production build, release audit, and diff
  checks after Phase 16E's accessible form-label fix.
- Refreshed the release checklist, architecture record, final roadmap, and
  `docs/PHASE_16F_FINAL_HANDOFF.md`.
- The implementation roadmap is technically complete. Only the owner's final
  visual approval, any explicit short punch list, and the Phase 16E–16F
  checkpoint commit/push remain.

## Latest Phase 16E pass

- Audited all primary routes at 1440 × 1000, 1280 × 800, 820 × 1000, and
  390 × 844, plus the Almanac, Community, and profile-management secondary
  routes at desktop and phone widths.
- Found zero horizontal document overflow across the route matrix; the phone
  header remains an intentional horizontally scrollable navigation strip.
- Connected every shared review text, date, file, and notes label to its native
  control, eliminating the unnamed fields discovered on Add Book.
- Verified visible focus treatment, reduced-motion coverage, named controls,
  paper fit, and a clean browser console without changing saved data.
- Phase 16E is documented in `docs/PHASE_16E.md`. Phase 16F is next.

## Latest Phase 16D pass

- Replaced the signed-out arrival's fabricated sample book and reading data
  with a truthful, generic Pressed Pages preview.
- Tightened the welcome composition so authentication actions remain in the
  opening desktop view and reflow cleanly at 390 × 844.
- Standardized structured loading, empty, no-result, unavailable, and
  missing-cover states across the Library, reader shelves, community,
  notifications, reader discovery, connections, and public-profile surfaces.
- Removed the disabled public-profile Message control because messaging is not
  a complete product feature.
- Verified signed-out and signed-in no-result paths without creating or
  changing persistent QA data. Phase 16D is documented in
  `docs/PHASE_16D.md`. Phase 16E is next.

## Latest Phase 16C pass

- Turned Notifications' existing all, unread, and social totals into real
  accessible filters over saved notification rows, including truthful empty
  states for each category.
- Wired the profile's saved Motion preference into an application-wide
  reduced-motion mode and its Cozy/Compact preference into both global spacing
  tokens and the shared scrapbook density provider.
- Kept comments, saves, direct messages, recommendation algorithms,
  third-party connections, saved graphic designs, advanced generator tooling,
  Library view switching, and rich-text notes absent because the product does
  not yet have the data model or complete behavior to support them honestly.
- Signed-in read-only checks passed at desktop and 390 × 844 without overflow
  or console errors. No account or library record was changed.
- Phase 16C is documented in `docs/PHASE_16C.md`. Phase 16D is next.

## Latest Phase 16B pass

- Shortened the Book Information opening so the integrated entry desk begins
  in the first viewport instead of below a large empty title paper.
- Rebuilt the oversized inherited Currently Reading object arrangement into a
  compact two-row editorial spread with the cover/label beside progress and the
  last-session paper beside its action folio.
- Replaced remaining prominent emoji markers on the active-reading, wrap-up,
  year-in-books, analytics-index, profile, and settings surfaces with the shared
  archival line-symbol language.
- Compared the remaining Phase 16B routes and retained their existing Phase 15
  compositions where their hierarchy was already sound rather than introducing
  decorative churn.
- Phase 16B is documented in `docs/PHASE_16B.md`. Phase 16C is next.

## Latest Phase 16A pass

- Rebuilt the shared Library/TBR book card as a purpose-built compact shelf
  artifact rather than squeezing the legacy layout.
- Wide desktop now supports five Library cards when real cover and text content
  fit; laptops keep four and phones keep one.
- Reading, TBR, Finished, and DNF summaries deliberately reflow inside the card.
- Finished metrics use a three-cell ledger, tags cap at three with a `+N`
  overflow count, and missing covers use a quiet archive glyph.
- The primary Open action stays visible. Status changes, Next 5, Edit, and
  Delete remain available in a native accessible Actions pocket.
- Verified real records read-only at 1440 × 1000 and 390 × 844 with an 11–14px
  cover/copy gap and no document overflow.

## Latest Phase 15I pass

- Re-audited all 24 July 28 inspiration mockups against the current signed-in
  application after Phase 15H.
- Tightened the ordinary laptop header so all primary destinations remain
  available without clipping.
- Rebalanced Home into a denser opening scrapbook spread and added one inset
  handwritten note plus one registered torn celestial focal corner.
- Shortened the Library opening, condensed the complete shelf-tool desk, and
  retained every real filter and action.
- Rejected a five-column CSS-only shelf experiment when real covers and titles
  failed the paper-fit rule; the safe four-column cards remain until a true
  compact shelf component is built.
- Replaced the remaining obvious core-shelf emoji markers with restrained
  typographic archive marks.
- Phase 16 is now the final roadmap. It covers the purpose-built shelf card,
  residual route-specific composition details, explicit product-feature
  decisions, signed-out/empty states, complete responsive/accessibility QA,
  and release closure. See `docs/PHASE_16_FINAL_ROADMAP.md`.

## Product goal

Pressed Pages is a personal and social reading journal that should feel like a
physical, carefully assembled reading scrapbook. The final experience should
follow the supplied mockups as closely as practical while preserving the
existing application data model and working behavior.

The work is not a conventional restyle. Components and page compositions may be
added, removed, consolidated, or rebuilt when needed to make the mockups come
to life.

## Approved visual direction

### Core feeling

- Warm, intimate, literary, archival, handmade, and calm.
- A real collection of paper, photos, notes, botanical keepsakes, stamps, and
  book ephemera.
- Editorially dense on desktop without resembling a dashboard made of React
  cards.
- Clear and readable despite the physical layering.

### Materials and palette

- Warm cream, ivory, parchment, kraft, faded ledger, and notebook papers.
- Deep cocoa text rather than pure black.
- Dusty rose, prairie sage, antique brass, muted gold, and restrained rust
  accents.
- Real paper grain, staining, torn/deckled edges, imperfect cuts, subtle
  rotation, and believable shadows.
- Pressed botanicals and bookish fasteners should feel physically attached,
  not floated decoratively over the interface.

### Typography

- Editorial serif for page titles and important book information.
- Readable serif or restrained sans-serif for controls and dense metadata.
- Handwritten type only for personal notes, captions, quotes, and small
  scrapbook annotations.
- Avoid novelty type on essential controls or long passages.

### Layout language

- Use a persistent signed-in application header on desktop.
- Use an intentional compact navigation treatment on mobile.
- Compose pages from distinct physical artifacts, not repeated identical cards.
- Use asymmetry and overlap sparingly to create depth without obscuring content.
- Important book covers should behave as focal artifacts.
- Controls should remain clearly interactive even when styled as paper objects.
- Every item placed on a paper slip must remain visibly inside that paper with
  believable inset margins. Enlarge the paper or reduce/reflow its contents so
  text, page numbers, covers, controls, stamps, and metadata look printed,
  typed, or written directly onto the physical substrate—never floating beyond
  an edge.
- Break up repeated cream surfaces with selective brighter patterned-paper
  corners, small collage scraps, or colorful archival accents. Use these as
  intentional focal moments rather than applying a different pattern to every
  card.
- “Patterned-paper corners” means irregular torn collage fragments with visible
  ripped contours—such as vintage celestial, floral, typeset, handwritten,
  illustrated, or occasional soft-pink papers. Do not interpret this as tidy
  striped squares, rainbow blocks, geometric corner wedges, or generic CSS
  gradients. Dark patterned fragments against cream are welcome when used
  selectively.
- Text and small labels may overlap those torn patterned fragments when the result
  still reads like a deliberate printed or pasted collage and remains fully
  legible.

### Avoid

- Generic white cards with large rounded corners.
- Visible CSS grid or notebook-grid overlays across book cards unless a mockup
  explicitly calls for ledger paper.
- Perfectly clean digital edges on session notes and scrapbook papers.
- A tape strip on every object.
- Duplicate paperclips, flowers, stamps, labels, or other attachments.
- Decoration behind or through button text.
- Covers overlapping titles or metadata.
- Tape floating away from the paper it is meant to attach.
- Unrelated asset variants added merely because they are available.
- Emoji as the primary visual system when an existing icon or asset is more
  appropriate.
- Loading transitions that briefly render the wrong signed-in or signed-out
  page.

## Mockup interpretation decisions

- The persistent top navigation is the primary signed-in shell.
- The two Add Book mockups are complementary references. Use the persistent
  header from the main app and combine it with the richer search, manual-entry,
  preview, and initial-note composition.
- The two profile designs represent different contexts:
  - owner/personal profile;
  - public follower-facing profile.
- Duplicate Finish Book mockups represent one final target.
- Mobile layouts should preserve the material hierarchy rather than shrinking
  the desktop collage.
- When a mockup contains sample-only data, use real application data and
  intentional empty states instead of hard-coded demonstrations.

## Architecture to preserve

- `src/assets/scrapbook/`
- `src/scrapbook/materials/assetRegistry.js`
- `ScrapbookAsset.jsx`
- `ScrapbookAssetLayer.jsx`
- `renderAnchors.jsx`
- `useResolvedComposition()`
- composition recipes and assembly registry
- existing scrapbook objects and keepsake assemblies
- review scoring and review-wizard state
- Supabase user ownership and row isolation
- local-storage fallback behavior
- cover and keepsake upload cleanup
- reading logs, memory artifacts, and serialization
- safe editor-exit behavior
- Back, Home, and route navigation behavior

The asset and composition architecture may be extended, but it should not be
replaced with page-specific hard-coded image paths.

## Account and data safety

- The user's main account contains real reading records.
- Visual inspections are read-only unless a test record is specifically needed.
- Do not edit or delete existing main-account records.
- If a test record or upload is created, record what was created and remove all
  evidence before handoff.
- Always verify that test-account changes do not appear in the main account.
- Destructive actions require exact targets and confirmation.
- Preserve temporary-upload cleanup when abandoning editors or forms.

## Current implementation state

### Latest Phase 14A pass

- Corrected `ScrapbookPanel` so resolved composition metadata reaches
  `PaperCard` without rendering a second set of material accents.
- Repaired the shared tape-highlight gradient and replaced generic card-grid
  surfaces with registered handmade paper treatments.
- Removed detached top-level CSS decoration and preserved intentional notebook
  and journal ruling.
- Increased the Home welcome row height and separated the Next 5 cover from its
  title and copy.
- Rebalanced the Library opening composition: the title is now “Your Library,”
  the hero occupies a narrower paper object, and the five summary cards form a
  compact strip instead of stretching to the hero height.
- Replaced the session-hydration CSS tape drawing with the registered cream
  masking-tape asset.
- Disabled the remaining Phase 13 global title stroke, faux-tape generators,
  detached auth ring, and review-wizard CSS fasteners. Review compositions now
  rely on their policy-controlled registered attachment instead of taping every
  field.
- Made direct top-level page sections transparent canvases so nested physical
  objects own their paper texture and shadow.
- Replaced the busy antique-letter surface behind Home’s Current Reading copy
  with a quieter registered warm parchment.
- Phase 14A implementation is complete and ready for visual approval. Build,
  lint, all 22 tests, and whitespace/diff checks pass. The existing production
  chunk-size warning remains.
- Desktop and mobile signed-out rendering pass at 1440×900 and 390×844 with no
  horizontal overflow or browser console warnings. Signed-in Library and
  converted-screen visual approval remains the user review gate because the
  available local browser session was signed out; no account data was changed.

### Latest Phase 14B pass

- Kept the hydration gate ahead of the application shell so session restoration
  cannot briefly render the signed-out welcome page.
- Added contextual document and navigation titles for Home, TBR, Wrap-Ups,
  review summaries, and the remaining application routes.
- Limited the compact Back/Home context bar to editor and secondary-detail
  routes; primary destinations now rely on the persistent application header.
- Added an active notification state and a functional accessible reader menu
  with Profile, Edit Profile, Public Preview, and Sign Out actions.
- Made sign-out close the review editor and complete abandoned-upload cleanup
  before ending the Supabase session.
- Improved signed-in mobile navigation so horizontally scrollable destinations
  retain short visible labels instead of becoming an unlabeled icon strip.
- Signed-out desktop and mobile shell/auth rendering passes at 1440×900 and
  390×844 with correct account-tab state, no horizontal overflow, and no browser
  console warnings.
- Signed-in desktop and mobile verification now also passes. The reader menu is
  accessible and correctly positioned, Home is the active route, mobile
  destinations retain labels, and session restoration shows the hydration
  paper before the signed-in dashboard. Phase 14B is complete.

### Latest Phase 14C pass

- Added real progress and format-aware progress copy to the Currently Reading
  focal artifact.
- Added a monthly reading spread driven by existing goal, calendar, wrap-up, and
  reading-log data: annual goal progress, reading days, monthly books/pages, and
  the latest reading session.
- Added Today’s Keepsakes with real recent photo/quote/flower detection, a safe
  empty pocket, latest finished-book context, and a note-to-self artifact.
- Added compact Add Book, Log Reading, Goals, Calendar, and Almanac routes
  without duplicating application behavior.
- Preserved the existing Next 5 ordering/actions and Latest Pressed Pages real
  library data.
- Desktop and mobile signed-in Home layouts pass at 1440×900 and 390×844 with
  no overlaps or horizontal overflow. Empty-state behavior is implemented
  without creating or changing account records.

### Latest Phase 14D pass

- Reframed the TBR route as a dedicated waiting-shelf composition while keeping
  it inside the shared Library architecture and persistent navigation.
- Preserved all six shelf views, the existing search and review filters, TBR
  shelf views, sorting, status actions, and ownership-safe mutations.
- Added cover-forward Next 5 slots with accessible rank controls, drag
  reordering, start-reading actions, open slots, and Maybe Next suggestions.
- Added twelve-book pagination that resets safely when shelf, search, sort, or
  filter criteria change.
- Kept missing-cover, sparse-metadata, long-title, loading, empty-shelf, and
  no-filter-match states intentional.

### Latest Phase 14E pass

- Kept the existing Full Review, Currently Reading, TBR, Already Read, and
  backlog-import destinations while consolidating their entry point into the
  signed-in Add Book composition.
- Added an Open Library catalog search for title, author, or ISBN with a
  manual-entry fallback. Selecting a match prefills title, author, cover, page
  count when available, and a source key without bypassing the existing form.
- Added a live library preview plus optional reason-to-read and initial-note
  fields that persist with the book information.
- Preserved cover upload, review-graphic upload, format, status, reading dates,
  progress, and the existing explicit Save to TBR / Reading Summary / Full
  Review paths.
- Extended abandoned-upload cleanup to the Already Read quick-add form when
  leaving through Back, Home, shell navigation, or sign-out.
- Desktop and mobile signed-in search/manual layouts pass without horizontal
  overflow. Catalog search was exercised read-only; no book was selected or
  saved and no upload was created.

### Latest Phase 14F pass

- Phase 14F implementation is complete.
- Rebuilt the Reading Calendar from a single inline-styled month grid into
  Month, Week, and List modes backed by the existing reading-session data.
- Added a persistent selected-day detail slip with session totals and notes,
  accessible selected states, month navigation, empty states, and a compact
  mobile layout.
- Kept the first active book as the focal journal and converted additional
  active books into responsive secondary cards without removing their progress
  or actions.
- Added an across-books recent-session timeline and an explicit Reading Log
  mood control alongside the existing note, quote, photo, and flower controls.
  Mood selections use the existing notes payload and require no schema change.
- Added calendar boundary coverage for partial weeks at the beginning and end
  of a month.
- Signed-in mobile-width QA passes for the active-book feature, recent-session
  timeline, Reading Log controls, all three calendar modes, selected-day
  details, and month navigation without changing a saved reading record.
- Removed the obsolete disabled Reading Mood keepsake tile after the working
  session-mood picker made it redundant.
- Preserved the existing analytics calculations and reading records; the
  calendar pass is read-only apart from the existing selected-date UI state.

### Latest Phase 14G pass

- Phase 14G implementation is complete.
- Preserved the five-step dense finish-book worksheet, weighted score,
  romance metrics, story markers, spoiler controls, recommendation, obsession
  score, and summary.
- Added clear Finish Book context and a completion slip when an active read
  enters the final worksheet.
- Preserved the canonical Book Journey story composer and its hero, summary,
  chapters, journal pages, keepsakes, reflection, review, ending, and owner
  actions.
- Added a responsive journey contents index that only links to sections present
  in the resolved sparse or artifact-rich journey.
- Signed-in mobile-width QA passes for Finish Book entry and an existing
  multi-session Book Journey; leaving the worksheet without saving preserved
  the active book and its progress.
- Lint, all 27 tests, production build, and whitespace checks pass. The existing
  production chunk-size warning remains.

### Latest Phase 14H pass

- Phase 14H implementation is complete.
- Extended the analytics model with previous-month comparisons, a six-month
  books/pages/reading-days series, year progress, and projected annual books.
- Added an editorial trend spread, monthly comparison sheet, highest-rated
  favorite, most-read author/trope/format, and real format distribution.
- Expanded Goals with annual pace, projected finish, books remaining, a
  100-day streak milestone, and real-data mini goals while preserving the
  editable books, pages, reading-days, and minutes targets.
- Added All, Unlocked, and In Progress achievement views, explicit remaining
  counts, next-milestone progress, locked states, and existing badge export.
- Signed-in mobile-width QA passes for analytics, goals, and achievement
  filters without changing goal values or account records.

### Completed through Phase 14L

- shared scrapbook assets and semantic registry;
- persistent shell, authentication, hydration, and navigation;
- Home dashboard;
- Library, TBR, and Next 5;
- Add Book and import workflows;
- Currently Reading, Reading Log, and Calendar;
- Finish Book, reviews, and Book Journey;
- Analytics, Goals, and Achievements.
- Monthly Wrap-Up and Year in Books;
- Personal Profile, Public Profile, and Settings;
- Community and social experience;
- Review Graphic Generator and sharing.

### Full dedicated recreation still required

- Phase 14P comparison is complete. The detailed audit and post-14P convergence
  roadmap are in `docs/PHASE_14P_VISUAL_AUDIT.md`.
- Phases 15A through 15C are complete and owner-approved.
- The recommended next implementation phase is Phase 15D: Reviews and Book
  Journeys.

### Closing checkpoint — 2026-07-29

- Phases 14A through 14L are complete, approved, committed, and pushed.
- The latest implementation checkpoint is `14f92e4` (`Complete Phase 14L
  review graphic generator`).
- The Phase 14I, 14J, 14K, and 14L checkpoints are `1244ce0`, `256f457`,
  `ca149e1`, and `14f92e4`.
- The next implementation phase is Phase 14M. Begin with a route-by-route
  desktop, tablet, mobile, keyboard, reduced-motion, large-text, and long-copy
  audit; fix discovered interactions and collisions without changing records.
- The release gate passes with 27 tests, lint, production build, and whitespace
  checks. The existing Vite large-chunk advisory remains.
- Signed-in visual QA through Phase 14L was read-only at desktop and 390 × 844.
  No library, profile, or social records were changed for the visual checks.
- Permanent visual rule: content placed on a paper slip must remain fully
  inside that slip and look printed or written onto it.
- Decorative corner assets must read as real torn 90-degree corners from a
  larger patterned sheet. Reuse the registered celestial corner and request
  references before generating a materially different decorative family.

## Phase 14 completion roadmap

### Phase 14A — Visual foundation and asset system

Status: complete and committed.

- Finalize shared papers, edges, type, shadows, spacing, and layering.
- Audit every real asset for scale, anchoring, clipping, and z-index.
- Remove generic React-card treatments, residual grid overlays, repeated faux
  tape, duplicate fasteners, and detached decorations.
- Create new transparent assets or textures only where existing registered
  materials cannot reproduce the mockups.
- Establish shared desktop, tablet, and mobile composition rules.

Definition of done:

- Shared materials look physically believable.
- Converted screens no longer resemble a themed component library.
- No global rule introduces an attachment on unrelated objects.

### Phase 14B — Application shell, authentication, and navigation

Status: complete.

- Finish the persistent desktop shell and compact mobile navigation.
- Finish signed-out sign-in/create-account layouts.
- Keep session restoration free of incorrect-page flashes.
- Finalize active states, notifications, profile menu, page titles, Back, and
  Home behavior.
- Remove obsolete page-navigation wrappers.

### Phase 14C — Home dashboard

Status: complete and committed.

- Match the Welcome composition.
- Finish the Currently Reading focal panel.
- Finish goal, calendar, quick-action, streak, and statistics modules.
- Finish Today's Keepsakes.
- Correct Next 5 cover/text hierarchy.
- Rebuild Latest Pressed Pages without overlaps or gridlines.
- Add supported recent-session, recently-finished, monthly-progress, and
  note-to-self compositions.
- Verify empty, one-book, and full states.

### Phase 14D — Library, TBR, and Next 5

- Rebuild the Library hero, statistics, filters, results, and pagination.
- Support All, Finished, Reading, TBR, DNF, and Brain Chemistry views.
- Use one intentional fastener per appropriate group.
- Build the dedicated TBR page with overview, search, filters, shelf views, and
  Next 5 management.
- Preserve ranking while moving books between TBR, Next 5, and Reading.
- Test long titles, missing covers, sparse metadata, and every status.

### Phase 14E — Add Book and import workflows

- Consolidate the Add Book mockups into one signed-in composition.
- Add search/import, manual entry, status choice, live preview, cover upload,
  initial notes, and reason-to-read.
- Preserve Already Read and backlog import paths.
- Keep Save to TBR, Save to Library, and Continue to Review behavior explicit.
- Verify abandoned-upload cleanup.

### Phase 14F — Currently Reading, Reading Log, and Calendar

- Finish the active-book feature layout, progress, actions, recent sessions,
  keepsakes, and secondary-book cards.
- Build the session-entry reading log with mood, notes, quote, photo, and flower
  controls.
- Rebuild recent sessions as an editorial timeline.
- Build Calendar Month, Week, and List modes with selected-day details.
- Verify date boundaries and mobile behavior.

### Phase 14G — Finish Book, Reviews, and Book Journey

- Converge the Review Wizard toward the dense Finish Book worksheet.
- Preserve weighted scores, metrics, spoilers, tropes, recommendation, and
  obsession score.
- Recompose Book Journey into a dense overview with hero, label, summary,
  chapters, journal pages, keepsakes, reflection, review, ending, and actions.
- Test sparse and artifact-rich journeys.

### Phase 14H — Analytics, Goals, and Achievements

- Complete analytics totals, comparisons, charts, favorites, and highlights.
- Build annual book, page, time, streak, milestone, monthly-pace, and mini-goal
  experiences.
- Build achievement overview, groups, progress, locked states, and unlocks.
- Connect all visible values to real data.

### Phase 14I — Wrap-Ups and Year in Books

Status: complete, approved, committed, and pushed (`1244ce0`).

- Build monthly statistics, favorite book, genres, moods, quote, memory,
  reflection, keepsakes, book strip, and share/download actions.
- Build annual totals, records, authors, themes, charts, favorite book, quote,
  memory, reflection, share, and download.
- Support sparse months and switching between years.

### Phase 14J — Personal Profile, Public Profile, and Settings

Status: complete, approved, committed, and pushed (`256f457`).

- Finish the owner profile with biography, tastes, mood, statistics, goal,
  current book, highlights, shelves, and recent activity.
- Build the privacy-aware public profile with Follow, Message, and Share states.
- Build Account, Profile, Privacy, Notifications, Goals, Connections,
  Appearance, and Data settings.
- Add safe export and account-deletion flows.

Implementation handoff:

- The owner scrapbook now includes current reading, annual goal progress,
  pressed-petal highlights, finished reads, filterable shelves, recent activity,
  achievements, and direct Edit/Profile Settings actions.
- Public profile views retain privacy-aware data loading and now expose honest
  owner/follow, disabled-message, and copy-share states without implying that
  direct messaging already exists.
- Settings & Privacy is available from both the owner profile and reader menu,
  with Account, Profile, Privacy, Notifications, Goals, Connections,
  Appearance, and Data sections.
- Notification and appearance preferences are stored inside the existing
  profile payload, avoiding a schema migration or changes to saved books.
- Data export downloads a local JSON copy. Account deletion uses a typed
  confirmation and records a request in auth metadata; it does not immediately
  erase account or library data.
- Verified read-only in the signed-in local app at 1440 × 900 and 390 × 844:
  no horizontal overflow, no console errors, and no library/profile mutations.
- `npm run lint`, `npm test` (27 tests), `npm run build`, and
  `git diff --check` pass. The existing Vite large-chunk advisory remains.

### Phase 14K — Community and social experience

Status: complete, approved, committed, and pushed (`ca149e1`).

- Rebuild Activity Feed, Find Readers, Notifications, Community Challenges,
  Buddy Reads, and reader cards.
- Add loading, empty, error, owner, and non-owner states.
- Remove decorative collisions from interactive controls.
- Verify two-account isolation and privacy.

Implementation handoff:

- Activity Feed, Find Readers, Community Challenges, Buddy Reads, and
  Notifications now share a permanent community navigation strip with clear
  active states and paper-fit loading, empty, and error messages.
- The redundant global Reading Log item was replaced with Community. Reading
  Log remains available from Currently Reading and its active-book workflows,
  where a selected book provides the context the journal requires.
- A generated charcoal celestial corner with a true 90-degree paper corner and
  one inward torn edge is registered as
  `paper-scrap-torn-celestial-corner-01`; community pages use the asset instead
  of CSS-drawn geometric corner wedges.
- Owner/non-owner presentation remains derived from real user IDs. Public
  reader search and public profile loading retain `is_public` gates;
  notifications remain scoped to `recipient_id`; activity remains limited to
  the signed-in reader plus followed IDs; Buddy Reads load only memberships
  belonging to the signed-in reader.
- Verified read-only in the signed-in local app at 1440 × 900 and 390 × 844:
  Activity Feed, Find Readers, Challenges, Buddy Reads, and Notifications have
  no horizontal overflow. No library or social records were changed.
- `npm run lint`, `npm test` (27 tests), `npm run build`, and
  `git diff --check` pass. The existing Vite large-chunk advisory remains.

### Phase 14L — Review Graphic Generator and sharing

Status: complete, approved, committed, and pushed (`14f92e4`).

- Build the full generator workspace.
- Add layout, theme, embellishment, content, placement, typography, background,
  and format controls.
- Support square, story, and Pinterest previews.
- Add reliable PNG export, copy-link, and supported sharing paths.
- Test long content and missing assets.

Implementation handoff:

- The Review Graphic page is now a full clipping-desk workspace with template,
  exact export format, included-content, accent, typography, paper-pattern,
  cover-placement, and embellishment controls.
- Square (1080 × 1080), Story (1080 × 1920), and Pinterest
  (1000 × 1500) previews render at their true SVG dimensions while the desk
  scales them safely for inspection.
- Cover-left and cover-right arrangements both update the exported composition.
  Missing covers retain the intentional `No Cover` paper placeholder, and long
  titles, reviews, vibes, and trope lists continue through bounded SVG wrapping
  and truncation instead of leaving their paper.
- PNG and SVG downloads still use fresh current settings. Captions support
  Instagram, Story, Facebook, and Pinterest variants, clipboard copy, and the
  native device share sheet when available; unsupported sharing falls back to
  copying the caption instead of presenting a broken action.
- The permanent celestial corner asset is reused for the generator hero. No new
  faux tape or duplicate fastener system was introduced.
- Verified read-only in the signed-in local app at desktop and 390 × 844:
  no horizontal overflow and no library changes. Square, Story, and Pinterest
  preview images loaded successfully at 1080 × 1080, 1080 × 1920, and
  1000 × 1500 natural dimensions.
- `npm run lint`, `npm test` (27 tests), `npm run build`, and
  `git diff --check` pass. The existing Vite large-chunk advisory remains.

### Phase 14M — Responsive, accessibility, and interaction polish

Status: implementation complete and release gate verified; awaiting owner
visual review in Phase 14P.

- Audit every page at desktop, tablet, and phone widths.
- Prevent cover, text, tape, flower, and control collisions.
- Verify keyboard access, focus, labels, landmarks, image descriptions,
  reduced motion, readable type, and tap targets.
- Test long names, long titles, large text, and spoiler controls.

### Phase 14N — Data integrity and full regression

Status: automated regression and ownership audit complete; awaiting the final
owner visual review in Phase 14P.

- Test main and test accounts without altering real records.
- Verify all add, edit, delete, filter, save, upload, and navigation paths.
- Verify temporary asset cleanup and cross-account isolation.
- Test refresh, restored sessions, empty, loading, error, offline, and
  reconnection states.
- Remove all test data.

### Phase 14O — Performance and production readiness

Status: implementation complete and production gate verified; deployment
remains approval-only.

- Optimize images, textures, page assets, and application chunks.
- Reduce layout shifts and visual flashes.
- Complete build, lint, console, storage, and production smoke tests.
- Create the final recovery commit and deploy only after approval.

Implementation handoff:

- Added guarded JSON preference loading and saving so corrupted storage or
  quota failures do not crash the app. Reading goals and community preferences
  now fail safely.
- Restored notification and appearance preference hydration from the cloud
  profile payload.
- Reading-memory and book-asset cleanup now resolve only paths owned by the
  current reader, with regression coverage for cross-account and traversal
  paths. Buddy Read rollback deletion is also creator-scoped.
- Route changes move keyboard focus to the main landmark after initial
  hydration. Mobile/coarse-pointer controls receive 44 px targets, long copy
  can remain inside its paper, and high-contrast/forced-color treatments are
  supported without removing the scrapbook hierarchy.
- Already Read, backlog import, and all review-wizard steps are page-split.
  React and Supabase are isolated into vendor chunks; the main JavaScript chunk
  fell from roughly 712 kB to 285 kB and the build no longer emits the
  large-chunk advisory.
- Fourteen oversized transparent scrapbook assets were resized to a maximum
  1600 px dimension. The source asset directory fell from approximately 52 MB
  to 45 MB while keeping the registered asset identities and transparent
  edges.
- The tracked `.env` file was removed from version control while remaining on
  the local machine. `.env.example`, immutable production asset caching,
  security headers, a production release audit, and project-specific setup
  documentation were added.
- `npm run test:release` now runs lint, 33 tests, the production build, and the
  credential/chunk/production-file audit. `git diff --check` passes.
- Browser-driven verification began read-only on the signed-in Home and Library
  at 1440 × 900 with no horizontal overflow, missing image descriptions, or
  unlabeled buttons. The local browser connection subsequently rejected the
  reload under its URL safety policy, so no alternate browser workaround was
  used. Phase 14P is the intentional final live visual comparison across all
  mockups and breakpoints.

### Phase 14P — Final mockup comparison and visual decisions

Status: comparison and roadmap complete; implementation has not started.

- Compare every supplied mockup with the finished signed-in site at desktop and
  mobile widths.
- Record anything that should be changed, added, consolidated, or removed.
- Recheck paper-fit, collage hierarchy, color balance, decorative corners, and
  dense-content states.
- Complete any owner-directed refinements, rerun the release gate, and create
  the approval checkpoint before deployment.

Audit outcome:

- All 24 July 28 reference images were mapped to current application surfaces.
- The signed-in application was inspected read-only at 1440 × 900 and
  390 × 844. No account data was changed.
- The dominant remaining mismatch is scale and density, not the absence of
  scrapbook materials. Current pages frequently stretch one reference-sized
  spread across multiple tall web sections.
- System-wide priorities are compact desktop typography and spacing, smaller
  hero papers, removal of dead grid space, cover/chart/keepsake-led hierarchy,
  fewer repeated statistic cards, and distinct desktop/mobile density rules.
- The approved next roadmap is Phase 15A through Phase 15H, beginning with the
  global density and scale reset. See `docs/PHASE_14P_VISUAL_AUDIT.md`.

### Latest Phase 15A pass

- Added `src/styles/phase15a-density.css` as the final shared sizing layer.
- Established compact display, title, body, spacing, gutter, and module tokens
  without replacing the existing scrapbook asset or material architecture.
- Reduced shared hero padding and repeated statistic-card scale across the
  application.
- Rebalanced the Home opening spread, removed the Library opening dead zone,
  and made filters and the first library cards visible in the opening desktop
  viewport.
- Applied the density system to representative Almanac, profile,
  active-reading, reading-log, community, discovery, notification, and settings
  surfaces.
- Preserved distinct mobile spacing and 44 px interaction targets. Read-only
  desktop and phone verification passed without horizontal overflow or account
  changes.
- `npm run test:release` passes with lint, 33 tests, production build, and the
  release audit. The next planned phase is Phase 15B.

### Latest Phase 15B pass

- Added `src/styles/phase15b-core-surfaces.css` after the Phase 15A density
  layer so page-level convergence remains isolated and auditable.
- Home remains the master scrapbook spread, with a cover-forward Next 5 queue
  replacing the previous text-only list.
- Library now uses one ledger-style statistics strip, a tighter shared shelf
  tool paper, and four-column cover-first desktop results. All existing actions
  and calculations remain available.
- TBR now centers the full-width five-cover priority shelf before the browsing
  archive while preserving drag, arrow, position, start, filter, sort, and
  record actions.
- Mobile TBR deliberately places its summary and Next 5 before filters and
  results. Read-only desktop and 390 px verification passed without horizontal
  overflow or account-data changes.
- The next planned phase after owner approval is Phase 15C: Book Entry,
  Currently Reading, and Reading Log.

### Latest Phase 15C pass

- Added `src/styles/phase15c-reading-desk.css` as the isolated convergence layer
  for book entry, active reading, Reading Log, and Calendar.
- Add Book now opens the integrated search/manual Book Information desk
  directly. Already Read and backlog import remain available from secondary
  desk actions, and abandoned-upload cleanup remains unchanged.
- Book Information places search beside the live preview on desktop, compacts
  field papers and uploads, and keeps the final action strip visible.
- Currently Reading now uses a denser left journal rail and focal
  cover/progress composition. Paper-fit corrections prevent the title label
  and Reading Log cover from colliding with adjacent copy.
- Reading Log without a selected book is now an overview with active-book
  selection and a cross-book recent-session list. Selecting a book opens the
  existing working session editor; no records are created by the overview.
- Calendar now uses a legend, central calendar anchor, and selected-day paper
  as one desktop spread while preserving Month, Week, List, and mobile
  horizontal calendar behavior.
- Read-only checks passed at 1440 × 900 and 390 × 844 with no horizontal
  overflow or account changes. The release gate passes with lint, 33 tests,
  production build, release audit, and whitespace checks.
- The next planned phase after owner approval is Phase 15D: review workbook and
  Book Journey convergence.

### Closing checkpoint — 2026-07-30

- Phases 15A through 15C are complete and owner-approved.
- The dedicated completion handoff is `docs/PHASE_15A_15C.md`.
- The release gate passes with lint, 33 tests, production build, release audit,
  and whitespace checks.
- Signed-in QA was read-only at 1440 × 900 and 390 × 844. No library records,
  reading logs, uploads, goals, profile fields, or social records were changed.
- Tomorrow begins with Phase 15D: preserve the safe review wizard while
  converging its desktop workbook and Book Journey compositions toward the
  reference mockups.

### Latest Phase 15D pass

- Added a shared five-step review workbook with a persistent desktop book and
  progress rail plus a compact horizontal mobile progress strip.
- Tightened the review form papers and final review summary into a denser
  finished worksheet without changing calculations, draft state, ownership,
  save behavior, or review actions.
- Removed the redundant legacy finished-cover preview above Book Journey; the
  existing journey hero is now the single cover-led opening composition.
- Reflowed journey chapters across the full spread and journal memories into
  three desktop columns, two tablet columns, and one mobile column.
- Added explicit paper-fit handling for chapter headings, session counts,
  quotes, journal notes, and final copy, with a missing-cover fallback in the
  workbook rail.
- Signed-in desktop, sparse-final-summary, mobile, and artifact-rich saved
  journey checks passed. The finish flow was exited without saving and no
  account record was changed.
- `npm run lint`, `npm run build`, and `git diff --check` pass. See
  `docs/PHASE_15D.md` for the checkpoint handoff.
- The next planned phase after owner approval is Phase 15E: Almanac, Goals,
  Achievements, Wrap-Ups, and Year in Books.

### Latest Phase 15E pass

- Added `src/styles/phase15e-almanac.css` as the isolated Almanac convergence
  layer loaded after the existing analytics component styles.
- Shortened the Almanac opening paper, consolidated the statistic ledger, and
  brought the existing real six-month bar chart into the opening desktop view.
- Removed inherited blank composition staging from Goals, Achievements,
  Wrap-Ups, and Year in Books while preserving their scrapbook recipes and
  underlying content.
- Goals now leads with progress, annual pace, and streak artifacts.
- Achievement progress and next milestone share the opening spread; earned and
  locked badges have distinct illustrated sticker treatments.
- Monthly Wrap-Up and Year in Books use full-width editorial openings, compact
  statistic ledgers, cover-led favorite spreads, and denser highlight, memory,
  chart, and finished-book grids.
- Signed-in desktop and phone checks passed without horizontal overflow or
  account changes. No goal, filter, download, or record action was used.
- The Phase 15E handoff is `docs/PHASE_15E.md`.
- The next planned phase after owner approval is Phase 15F: Profiles and
  Settings.

### Latest Phase 15F pass

- Added `src/styles/phase15f-profiles-settings.css` as the isolated convergence
  layer for owner profile, public preview, and Settings.
- Rebuilt the owner profile as a compact dossier with a shorter identity
  opening, six-cell statistics ledger, paired focus papers, and denser petals,
  recent reads, shelves, activity, and achievement sections.
- Kept the public reader card as the visual spine and moved its four reader-safe
  statistics into a compact companion ledger.
- Converted Settings into a sticky desktop folio index beside one working sheet
  with responsive two-column fields and an intentional phone tab grid.
- Preserved profile safety boundaries, edit/save behavior, follower navigation,
  calculations, data download, and guarded deletion-request behavior.
- Did not introduce fake messaging or unavailable integrations. Connections use
  only the existing followers, following, and reader-discovery routes.
- Signed-in desktop and phone checks passed without horizontal overflow or
  account changes. The Phase 15F handoff is `docs/PHASE_15F.md`.
- The next planned phase after owner approval is Phase 15G: Community visual
  depth.

### Latest Phase 15G pass

- Added `src/styles/phase15g-community-depth.css` as the isolated convergence
  layer for Activity Feed, Reader Discovery, Notifications, and connection
  lists.
- Rebuilt Activity Feed as a compact reading-circle workspace with one timeline,
  real feed totals, and a sticky feature-boundary note.
- Added public-profile compatibility clues to discovery cards without inventing
  a match score or using private account data.
- Added an explicit discovery guide explaining that Pressed Pages does not
  automatically match readers.
- Tightened Notifications into a mail stream plus real all/unread/social totals
  and corrected Community navigation wording to promise only follows and likes.
- Kept comments, saved posts, private messages, matchmaking, and calculated
  compatibility outside this visual phase rather than simulating unavailable
  behavior.
- Signed-in desktop and phone checks passed without horizontal overflow or
  account changes. The Phase 15G handoff is `docs/PHASE_15G.md`.
- The next planned phase after owner approval is Phase 15H: generator desk and
  final visual pass.

### Latest Phase 15H pass

- Added `src/styles/phase15h-final-pass.css` as the final isolated convergence
  and paper-fit layer.
- Rebuilt the review graphic generator as an image-led desktop desk with the
  preview first, a compact sticky inspector, and paired export/caption papers.
- Corrected Story and Pinterest preview sizing so tall generated artwork stays
  fully contained at desktop and phone widths.
- Added explicit spoken labels to the primary navigation buttons, fixing the
  tablet icon-only navigation accessibility gap.
- Added narrow final safeguards for long text and media containment inside
  scrapbook materials without altering the asset registry or composition
  architecture.
- Audited representative Home, Library, Currently Reading, TBR, Analytics,
  Profile, Community, and generator surfaces at desktop, tablet, and phone
  widths. No document-level horizontal overflow or browser console errors were
  found.
- Preserved existing reduced-motion behavior and added an explicit generator
  fallback.
- The Phase 15H handoff is `docs/PHASE_15H.md`.
- The Phase 15A–15H roadmap is complete. The next step is owner visual review
  and either approval or a short punch list; no further implementation phase is
  currently planned.

## Execution order

Use this order unless a blocking issue requires a small detour:

1. 14A Visual foundation
2. 14C Home
3. 14D Library/TBR/Next 5
4. 14E Add Book
5. 14F Currently Reading/Reading Log/Calendar
6. 14G Review and Book Journey
7. 14H Analytics/Goals/Achievements
8. 14I Wrap-Ups/Year in Books
9. 14J Profile/Settings
10. 14K Social/Notifications
11. 14L Graphics/Sharing
12. 14M Responsive/Accessibility
13. 14N Regression
14. 14O Production readiness
15. 14P Final mockup comparison

Phase 14B is already substantially underway and should be finished alongside
the next pages that expose remaining shell issues.

## Per-page definition of done

A page is not complete until:

- its desktop composition matches the appropriate mockup;
- its tablet and phone compositions are intentional;
- loading, empty, error, long-content, and missing-image states work;
- no tape, clip, flower, label, cover, or text collision remains;
- existing behavior and account ownership still work;
- the console is clear;
- build, lint, and diff checks pass;
- the user has reviewed a real screenshot or live state when visual judgment is
  material.

## Final site definition of done

- Every mockup has a finished screen or an intentionally consolidated
  equivalent.
- Pressed Pages feels like a physical reading scrapbook rather than a React
  dashboard with scrapbook styling.
- All existing reading data and social/privacy boundaries remain safe.
- All functional paths pass on the main and test accounts.
- Development and production builds are clear.
- A final full-site visual audit passes at desktop and mobile widths.
