# Phase 14P — mockup comparison and visual convergence roadmap

Date: July 30, 2026

## What was compared

This audit compares the complete July 28 reference set in
`/Users/kennaarmstrong/Downloads/` with the current signed-in Pressed Pages
application.

The reference set contains 24 images. Two pairs are alternate or duplicate
views:

- two complementary Add Book compositions;
- two identical Finish Book compositions.

The live application was inspected read-only at 1440 × 900 and 390 × 844.
No book, profile, upload, social, or settings record was changed.

## Executive finding

Pressed Pages has the correct visual vocabulary, working routes, real data, and
most of the content promised by the mockups. The largest remaining difference
is **composition scale and density**.

The mockups behave like full scrapbook spreads: smaller type, compact controls,
cover-forward groupings, several related artifacts visible at once, and
intentional decoration filling the negative spaces.

The current application often behaves like a sequence of large web sections:
oversized headings, very tall hero papers, stretched statistic cards, generous
empty gaps, and one module per screenful. This makes a page feel like a website
wearing paper textures instead of a scrapbook spread assembled from many
physical pieces.

The next roadmap should therefore focus on **shrinking, regrouping, and
recomposing existing material before adding more decoration or features**.

## What already matches

- The warm cream, cocoa, dusty rose, sage, brass, and rust palette is correct.
- The signed-in header, active states, Add Book action, notifications, and
  reader menu are coherent.
- The current paper library, deckled edges, registered tape, clips, flowers,
  stamps, and celestial corner are appropriate.
- Real account data drives books, goals, logs, reviews, wrap-ups, profiles, and
  community states.
- Home, Library, TBR, Add Book, Currently Reading, Reading Log, Calendar,
  Review, Book Journey, Analytics, Goals, Achievements, Wrap-Ups, Year in Books,
  Profile, Community, Notifications, Settings, and Review Graphics all exist.
- Mobile is functionally intentional and does not horizontally overflow.
- The permanent rule that content must remain visibly printed or written on its
  paper is correct and should remain the visual acceptance test.

## System-wide gaps

### P0 — must be fixed before visual sign-off

1. **Desktop scale is too large.**
   Major headings, hero papers, cards, controls, and gaps are commonly
   1.3–2× the visual scale of the reference spreads.

2. **The first desktop viewport shows too little.**
   The references usually reveal a hero, statistics, a focal book or chart,
   and at least one secondary cluster at once. Current pages commonly show only
   a hero plus the top of the next section.

3. **Many compositions have large dead zones.**
   Confirmed examples include the Home hero/current-book row and the Library
   hero/statistics row. The Library opening leaves most of the right side empty
   before the filters begin.

4. **Pages still read as stacked sections.**
   The paper is attractive, but repeated full-width bands and evenly sized
   cards reduce the handmade collage effect.

5. **Information hierarchy is too headline-heavy.**
   Book covers, progress, charts, quotes, and keepsakes should compete with
   titles as focal points. Several current screens let the heading consume the
   composition.

### P1 — high-value visual convergence

6. **Too many statistic modules are generic white/cream cards.**
   Use compact ruled slips, labels, seals, stamps, narrow columns, and grouped
   ledger rows rather than repeating equal rectangles.

7. **Paper families need clearer roles.**
   Keep calm paper behind dense text, notebook or ledger paper behind tabular
   data, and decorative patterned fragments only at focal edges. Avoid one
   low-contrast cream texture across every major surface.

8. **Decoration is too sparse in some large gaps and too repetitive in other
   areas.**
   Add selective botanicals, torn patterned corners, clips, stamps, and photo
   artifacts where they complete a composition. Do not add generic tape to
   every panel.

9. **Emoji still substitute for the mockup icon language in several data
   modules.**
   Replace primary emoji markers with the established line icons, badges, or
   registered scrapbook assets. Emoji may remain inside personal copy.

10. **Desktop and mobile need separate density decisions.**
    Mobile should remain a readable vertical journal. It should not inherit
    desktop’s oversized type or excessive vertical padding.

### P2 — product additions shown in the references

These are not required to correct the visual mismatch, but they are genuine
mockup features that are absent, partial, or intentionally simplified:

- Library grid/shelf view switch and deeper mood/format/sort filtering.
- Rich text tools for initial notes.
- Reading-log overview entry that can choose a book, plus stronger
  month-at-a-glance summary.
- Community reactions, comments, saves, direct messaging, and richer activity
  visibility controls.
- Trending genres, reader matchmaking filters, community highlights, and
  recently loved books.
- Notification category counts and a “what’s new” panel.
- Connected-account integrations and a true appearance/theme system.
- More advanced review-graphic template, placement, embellishment, and
  background controls.

These features require their own product and data decisions. They should not be
quietly simulated with nonfunctional controls.

## Route-by-route comparison

### Signed-out welcome and authentication

Reference: `01_22_48 PM`

The mockup is a rich two-column arrival page: authentication on the left and a
layered product preview collage on the right. The current signed-out experience
uses the correct material language but does not yet deliver the same
high-density preview of what the app becomes after sign-in.

Recommended change:

- keep the safe authentication flow;
- compress the welcome copy;
- create one strong preview collage using real product imagery or intentional
  sample artifacts;
- avoid marketing navigation or pricing links unless those destinations
  actually exist.

### Home

Reference: `01_27_44 PM`

Current strengths:

- welcome, current book, streaks, monthly pulse, keepsakes, Next 5, and recent
  books all exist;
- real user data replaces the sample content correctly.

Confirmed gaps:

- the welcome paper and current-book paper are dramatically taller and more
  headline-led than the mockup;
- the current book is partly pushed out of the opening composition at desktop;
- the monthly panel becomes a broad full-width section instead of a compact
  cluster;
- recent sessions, recently finished books, progress chart, and note-to-self do
  not create the same dense first-page rhythm;
- the opening spread needs more asymmetry and less blank paper.

Recommended change:

- make Home the master density pass;
- fit the welcome, current book, stats, monthly pulse, and one keepsake cluster
  into the first desktop viewport;
- reduce the welcome headline and body width;
- make the book cover the focal point of the current-reading artifact;
- use two or three asymmetric columns for the lower modules;
- move less important actions into compact labels or a footer strip.

### Library

Reference: `01_32_41 PM`

Current strengths:

- all six shelf views, filters, counts, pagination, status actions, and real
  cover data exist.

Confirmed gaps:

- the opening hero/statistics row leaves a very large empty area;
- the title paper is too tall and the five statistics are too large;
- filters occupy a large journal sheet instead of a compact utility bar;
- book results are much larger and more action-heavy than the compact,
  cover-forward reference grid;
- sort, format, view-mode, and richer filter affordances are absent or
  consolidated differently;
- the reference’s pagination, quote strip, floral framing, and shelf rhythm
  are not yet present.

Recommended change:

- collapse the opening into a compact hero plus one horizontal stats strip;
- move search, sort, view, and primary filters into one dense toolbar;
- introduce a compact visual-library card variant with the cover dominant and
  secondary actions behind one details action;
- keep destructive and status-changing actions available, but not all equally
  loud on every card;
- optionally add grid/shelf modes after the compact grid is correct.

### TBR and Next 5

Reference: `01_36_33 PM`

Current strengths:

- a dedicated TBR composition, Next 5 ranking, suggestions, filters, shelf
  views, and real mutations exist.

Remaining gaps:

- the mockup opens with a cover strip of five priority books and hand-written
  reasons, followed by compact category shelves and a dense lower grid;
- current controls and cards remain larger and more web-form-like;
- TBR overview by mood/format and the decorative note/sidebar need a closer
  compositional equivalent.

Recommended change:

- make Next 5 a horizontal cover-first strip on desktop;
- retain accessible rank buttons while visually demoting them;
- add compact category summaries derived from real data;
- bring the search/filter/results area closer to the Library compact system.

### Add Book

References: `01_40_44 PM` and `01_43_26 PM`

Current strengths:

- search/import, manual entry, preview, cover upload, notes, reason-to-read,
  status, formats, dates, and explicit save paths exist.

Remaining gaps:

- the current entry-choice page adds a layer before the rich form;
- the mockups feel like one integrated desk with search, fields, preview,
  notes, and save actions visible together;
- current form sections remain vertically large and generic.

Recommended change:

- keep route safety but open directly into the integrated Add Book desk;
- use tabs inside the desk for Search and Manual Entry;
- place a compact live preview beside the primary fields on desktop;
- keep advanced and review-specific fields progressively disclosed;
- make the bottom save strip persistent within the composition.

### Currently Reading

Reference: `01_48_07 PM`

Current strengths:

- focal active book, real progress, actions, stats, recent sessions, keepsakes,
  and secondary active books exist.

Remaining gaps:

- the mockup fits the hero, statistics, timeline, keepsakes, and secondary
  shelf into one desktop spread;
- current content is taller and less visually interconnected;
- the featured cover and progress area need more visual authority.

Recommended change:

- use a compact three-zone desktop spread: intro/stats, focal book, keepsakes;
- place recent sessions and secondary books directly beneath without large
  section gaps;
- keep the existing no-active-book state and safe actions.

### Reading Log

Reference: `01_52_34 PM`

Current strengths:

- the working book-specific form supports pages, minutes, mood, notes, quote,
  photo, flower, editing, and a recent-memory timeline.

Remaining gaps:

- there is no mockup-like log overview that lets the reader select a book from
  the page;
- a direct route without a selected book can still become a dead-end message;
- the monthly summary and all-book timeline are less prominent than the
  reference.

Recommended change:

- turn “No book selected” into the Reading Log overview;
- allow selecting an active book before entering a session;
- keep contextual launches from Currently Reading preselected;
- add the compact monthly summary and all-book editorial timeline.

### Finish Book and review

References: `01_59_10 PM` and duplicate `01_59_33 PM`

Current strengths:

- the complete scoring model, weighted ratings, spice, metrics, tropes,
  spoilers, recommendation, obsession, notes, and artifacts are preserved.

Remaining gaps:

- the mockup is a single dense worksheet while the current experience remains a
  multi-step wizard;
- the current wizard protects usability, but it does not produce the same
  “finished review spread” feeling during entry;
- field papers and labels can still feel like separate form cards.

Recommended change:

- do not remove the wizard or risk review-state regressions;
- create a denser desktop worksheet mode across the existing steps, with a
  visible progress rail and a persistent book summary;
- keep mobile step-by-step;
- make the final review screen visually match the worksheet composition.

### Book Journey

Reference: `02_04_31 PM`

Current strengths:

- hero, label, summary, chapters, journal pages, quote, memory, reflection,
  review, ending, and actions exist.

Remaining gaps:

- current modules are larger and the finished-book strip can dominate;
- sparse states need to retain the same balanced collage silhouette as rich
  states;
- chapter/page labels and long quotes require the permanent paper-fit check.

Recommended change:

- compact the chapter and journal cards;
- cap the finished-book strip card width;
- maintain the approved quote-slip inset;
- use empty paper artifacts, not blank expanses, for sparse journeys.

### Reading Calendar

Reference: `02_08_38 PM`

Current strengths:

- Month, Week, and List views, selected-day details, sessions, notes, boundary
  handling, and mobile layouts exist.

Remaining gaps:

- the reference makes the month grid the central visual anchor with a compact
  left legend and right detail column;
- current calendar lives inside the broader almanac and is more vertically
  stacked.

Recommended change:

- preserve the Analytics tab consolidation;
- on desktop, use the reference’s three-column calendar composition;
- keep Week/List as alternate views without adding top-nav clutter.

### Analytics, Goals, and Achievements

References: `02_15_05 PM`, `02_18_24 PM`, and `02_22_49 PM`

Current strengths:

- all three areas exist in one coherent almanac;
- values are real and tabs prevent an overloaded global navigation.

Confirmed gaps:

- the current Overview opens with repeated large stat cards and text-heavy
  ledger boxes;
- mockups use actual charts, compact records, badges, illustrated achievements,
  and many simultaneous comparisons;
- Goals and Achievements need richer visual progress language;
- emoji markers weaken the archival icon system.

Recommended change:

- keep the single Almanac destination;
- rebuild each tab as its own dense spread;
- introduce restrained bar, line, donut, distribution, and pace charts;
- use compact record tables and real badge art;
- reduce card repetition and replace primary emoji.

### Monthly Wrap-Up and Year in Books

References: `02_27_58 PM` and `02_35_19 PM`

Current strengths:

- both experiences contain the expected real data, memories, quotes,
  reflections, books, and export actions;
- the background was already lightened and the quote-slip treatment was
  corrected during Phase 14I.

Remaining gaps:

- the reference spreads are substantially denser;
- charts, book rows, records, favorite content, and keepsakes should fit into a
  more connected editorial grid;
- finished-book cards can become too large and narrow;
- visual repetition of similar cream surfaces still softens the hierarchy.

Recommended change:

- reduce section padding and heading scale;
- use compact cover strips and small record slips;
- strengthen chart and photo/quote focal points;
- add selective patterned torn corners at two or three intentional anchors.

### Personal and public profiles

References: `02_38_19 PM` and `02_42_43 PM`

Current strengths:

- owner/public separation, privacy, follow state, share state, stats, shelves,
  highlights, activity, current book, goals, and achievements exist.

Confirmed gaps:

- the current owner hero is a large horizontal banner; the mockup uses a
  compact reader card alongside a dense stats/current-book spread;
- current profile statistics still resemble generic dashboard cards and rely
  heavily on emoji;
- favorites, shelves, highlights, and recent books are arranged farther apart
  than in the references;
- the public profile remains less editorially dense than the follower-facing
  mockup.

Recommended change:

- rebuild owner and public profiles from a shared compact reader-card spine;
- use one narrow bio/taste column and one wider reading-life column;
- group stats into a ledger strip;
- make current book and preserved highlights the central focal artifacts;
- use compact horizontal book shelves at the bottom.

### Activity Feed, Find Readers, and Notifications

References: `02_47_23 PM`, `02_52_47 PM`, and `02_56_25 PM`

Current strengths:

- the community hub, activity, discovery, challenges, Buddy Reads,
  notifications, owner/non-owner states, privacy, and account isolation exist;
- Community correctly replaced the redundant top-level Reading Log item.

Remaining gaps:

- the reference feed has richer story cards, reactions, comments, saves,
  community highlights, followed readers, and loved books;
- Find Readers has stronger filtering, compatibility context, and denser reader
  cards;
- Notifications has categories, summary counts, milestones, and a “what’s new”
  module;
- current pages are visually simpler and functionally honest, which is better
  than pretending unavailable social actions work.

Recommended change:

- first match density, sidebars, and reader-card hierarchy using existing data;
- add decorative and statistical side modules that can be computed safely;
- treat reactions, comments, saves, messages, and expanded matching as a later
  social product phase with schema and privacy review.

### Settings

Reference: `03_04_37 PM`

Current strengths:

- Account, Profile, Privacy, Notifications, Goals, Connections, Appearance, and
  Data sections exist;
- export and deletion-request behavior are intentionally safe.

Remaining gaps:

- current settings use stacked sections rather than the mockup’s compact
  sidebar-plus-grid desk;
- connected services and true theme customization are not implemented;
- the layout is longer and more generic than the reference.

Recommended change:

- create a sticky settings index on desktop and compact jump navigation on
  mobile;
- use a two- or three-column paper grid for related controls;
- preserve honest disabled states for unavailable integrations;
- do not add theme choices until their tokens and persistence are complete.

### Review Graphic Generator

Reference: `03_09_20 PM`

Current strengths:

- exact square, story, and Pinterest output sizes, template, content, accent,
  typography, paper, cover placement, embellishment, export, caption, and share
  behavior exist.

Remaining gaps:

- current controls are less visually like a creative desk;
- the preview, option groups, recent designs, and backgrounds are not as dense
  or image-led as the reference;
- advanced asset placement is still limited.

Recommended change:

- keep the reliable SVG/PNG output pipeline;
- recompose controls into a compact right-side inspector;
- use visual thumbnails for layouts, papers, and embellishments;
- add placement freedom only after long-copy and exact-export safety remain
  guaranteed.

## What should be removed or consolidated

- Remove oversized hero height where it exists only to display one heading and
  short paragraph.
- Remove decorative tape from any paper already attached by a clip, flower, or
  stamp.
- Replace primary emoji statistics with the shared icon/badge language.
- Consolidate repeated full-width intro bands with nearby statistics or
  controls.
- Keep Reading Log out of the global navigation; Community is the better
  top-level destination.
- Keep Calendar, Goals, Achievements, Wrap-Ups, and Year in Books under the
  Almanac rather than reproducing every mockup nav item.
- Do not reproduce mockup-only pricing, messaging, integrations, or social
  actions until the underlying product exists.

## Proposed post-14P roadmap

### Phase 15A — Global density and scale reset

Goal: make the whole desktop application feel like one assembled scrapbook
spread rather than oversized stacked web sections.

Status: complete and owner-approved.

- establish compact desktop title, body, control, card, gap, and section tokens;
- cap hero heights and remove empty grid tracks;
- establish dense desktop, medium tablet, and readable mobile modes;
- replace repeated statistic cards with slips, ledgers, stamps, and grouped
  rows;
- replace primary emoji with the shared visual system;
- rerun paper-fit and long-copy checks globally.

Completion test: at 1440 × 900, every major page shows its identity, primary
data, and at least one meaningful secondary cluster without clipping.

Implementation checkpoint:

- Added a final shared density layer with compact display, page-title,
  section-title, body, spacing, gutter, and module-gap tokens.
- Reduced shared hero padding, statistic-card weight, and repeated dashboard
  spacing while preserving the registered paper and composition system.
- Rebuilt the Home opening proportions so the welcome, active book, statistics,
  monthly reading pulse, and keepsake column enter the opening desktop spread.
- Removed the Library opening dead zone by shrinking its title paper and making
  the five statistics fill the same compact first row. Search, filters, and the
  first book row now enter the first desktop viewport.
- Applied the compact system to Almanac, profiles, active-reading, reading-log,
  community, notification, discovery, and settings heroes and repeated data
  grids.
- Kept separate mobile density rules. Mobile Home became approximately 500 px
  shorter while remaining readable and preserving 44 px interaction targets.
- Verified read-only at 1440 × 900 and 390 × 844 without horizontal overflow or
  account-data changes.
- `npm run test:release` passes: lint, 33 tests, production build, and release
  audit. `git diff --check` also passes.

### Phase 15B — Home, Library, and TBR convergence

Status: complete and owner-approved.

- rebuild Home as the reference-quality master spread;
- make Library compact, cover-forward, and filter-efficient;
- make Next 5 a horizontal priority shelf;
- unify Library and TBR book-card density;
- add optional grid/shelf view after the compact card is approved.

Implementation checkpoint:

- Home keeps its dense opening collage and now renders the Next 5 queue as five
  cover-forward paper keepsakes instead of a text-only utility list.
- Library statistics read as one ledger strip. Tabs, filters, totals, and reset
  controls share one tighter utility paper, and desktop results use a
  four-column cover-first archive without removing any record actions.
- TBR gives the full desktop width to the five-book priority shelf, with every
  drag, arrow, position, and start control preserved. The waiting archive
  follows in a denser three-column grid.
- On phones, TBR deliberately reads hero, summary ledger, Next 5, shelf
  controls, filters, then results so the priority shelf is not buried below
  the filter form.
- Read-only desktop and mobile checks passed without horizontal overflow or
  saved-record changes.

### Phase 15C — Book entry and active-reading desk

Status: complete and owner-approved.

- open Add Book directly into the integrated search/manual desk;
- compact the live preview and save strip;
- recompose Currently Reading;
- make Reading Log useful without a preselected book;
- tighten Calendar desktop composition.

Implementation checkpoint:

- The global and Home Add Book actions now open directly into the existing
  ownership-safe search/manual Book Information desk. Already Read and batch
  import remain available as secondary actions inside that desk.
- Book Information now uses a wider desktop work surface with search and manual
  entry beside the live preview, denser field papers, smaller cover/graphic
  artifacts, and a persistent save/continue strip.
- Currently Reading uses a compact journal rail, grouped statistics, a
  cover-and-label focal artifact, progress sheet, keepsakes, and recent
  sessions without removing any progress, log, finish, edit, or delete actions.
- Reading Log now has a real overview when no book is selected. It lists active
  books, current progress, and recent sessions, then opens the existing
  book-specific session desk without creating or changing a record.
- Calendar now follows the mockup’s desktop hierarchy with a compact legend,
  central Month/Week/List surface, and selected-day note in one composition.
- Desktop and 390 px read-only checks passed without horizontal overflow,
  cover/text overlap, or account-data changes. `npm run test:release` and
  `git diff --check` pass.

### Phase 15D — Reviews and journeys

- create dense desktop review-workbook presentation without removing the safe
  wizard state;
- refine final review and Book Journey composition;
- verify sparse, long-copy, artifact-rich, and missing-cover states.

### Phase 15E — Almanac, goals, achievements, wrap-ups, and year

- turn text-heavy analytics into real compact charts;
- create richer goal and milestone artifacts;
- use illustrated achievement badges and clear locked states;
- tighten Wrap-Up and Year in Books into connected editorial spreads.

### Phase 15F — Profiles and settings

- rebuild owner and public profiles around the compact reader-card spine;
- compact stats, current book, highlights, and shelves;
- convert Settings into a sidebar-plus-grid desk;
- keep unavailable integrations and messaging honest.

### Phase 15G — Community visual depth

- add the mockup’s denser feed, discovery, and notification side modules using
  existing safe data;
- refine reader cards and compatibility cues;
- separately scope reactions, comments, saves, messages, and matchmaking if the
  owner wants those real features.

### Phase 15H — Generator desk and final visual pass

- make the generator inspector image-led and compact;
- perform a complete paper-fit, pattern-corner, fastener, cover, chart, and
  color-balance pass;
- verify desktop, tablet, mobile, large text, long copy, reduced motion, and
  empty/loading/error states;
- run the full release gate and create the approval checkpoint.

## Recommended order

Do not begin by adding more flowers, corners, or features. Start with Phase 15A.
The global scale reset will change how every later page fits, and it will avoid
redoing the same spacing work eight times.

Then complete 15B through 15H in order. The Home/Library/TBR pass will establish
the reusable density patterns for the rest of the application.

## Final visual acceptance criteria

- A desktop page reads as one composed scrapbook spread, even when it scrolls.
- The first viewport shows the page’s main story rather than one oversized
  heading.
- Covers, charts, quotes, photos, and keepsakes share focal priority with text.
- Every item stays visually inside its paper.
- No unexplained empty grid track or blank paper area remains.
- Repeated modules do not all use the same cream rectangle.
- Patterned corners look torn from a real sheet and are used selectively.
- Controls remain obviously interactive and accessible.
- Mobile is a deliberate journal layout, not a shrunken or over-padded desktop
  spread.
- Mockup-only functionality is either truly built or clearly omitted—never
  faked.
