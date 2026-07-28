import Auth from "../Auth"
import BotanicalAccent from "./scrapbook/BotanicalAccent/BotanicalAccent"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./scrapbook/PolaroidFrame/PolaroidFrame"
import StatCard from "./scrapbook/StatCard/StatCard"
import BookCard from "./scrapbook/BookCard/BookCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import { useResolvedComposition } from "../scrapbook/hooks"
import {
  ScrapbookAsset,
} from "../scrapbook/components/ScrapbookAsset"
import {
  resolveScrapbookMaterialRole,
} from "../scrapbook/materials/assetRegistry"

const homeCurrentReadTape =
  resolveScrapbookMaterialRole(
    "tape",
    "subtle",
    "tape-masking-cream-01"
  )

const homeRecentHiddenAnchorTypes = [
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
  "pressedFlower",
  "softFlower",
  "pressedDaisy",
  "pressedFern",
  "signatureFlower",
]

function HomePage({
  user,
  loadUser,
  migrateLocalReviewsToCloud,
  migrateEmbeddedReadingLogsToCloud,
  embeddedReadingLogCount,
  openAddBookMenu,
  setStep,
  savedReviews,
  readingStreakStats,
  currentlyReadingReviews,
  setLibraryFilter,
  startReading,
  moveNextFive,
}) {
  const currentRead = currentlyReadingReviews?.[0]
  const currentBook = currentRead?.bookInfo || {}
  const recentReviews = savedReviews.slice(0, 4)
  const nextFiveReviews = savedReviews
    .filter(
      (item) =>
        item?.bookInfo?.status === "TBR" &&
        Number(item?.bookInfo?.nextFiveRank) > 0
    )
    .sort(
      (first, second) =>
        Number(first.bookInfo.nextFiveRank) -
        Number(second.bookInfo.nextFiveRank)
    )
    .slice(0, 5)
  const upNextReview = nextFiveReviews[0]
  const upNextBook = upNextReview?.bookInfo || {}

  function openTbrShelf() {
    setLibraryFilter("tbr")
    setStep("library")
  }

  async function startUpNext() {
    if (!upNextReview) return

    const movedToReading = await startReading(upNextReview)

    if (movedToReading) {
      setStep("currentlyReading")
    }
  }

  const homeComposition = useResolvedComposition({
  scrapbookId: "home-dashboard",
  objectType: "dashboard",
  occasion: "home",
})
const currentlyReadingComposition = useResolvedComposition({
  scrapbookId: "currently-reading-section",
  objectType: "section",
  readingState: "currentlyReading",
})

const recentlyFinishedComposition = useResolvedComposition({
  scrapbookId: "recently-finished-section",
  objectType: "section",
  readingState: "finished",
})

const recentBooksPaper =
  recentlyFinishedComposition?.composition?.paper?.variant ?? "aged"


  const navItems = [
    { label: "Add Book", detail: "Start a new entry", icon: "✦", action: openAddBookMenu },
    { label: "My Library", detail: "Browse your shelves", icon: "📚", action: () => setStep("library") },
    { label: "Currently Reading", detail: "Open your active reads", icon: "📖", action: () => setStep("currentlyReading") },
    { label: "Reading Almanac", detail: "Stats, seasons, & milestones", icon: "✍️", action: () => setStep("analytics") },
    { label: "Activity Feed", detail: "See friend updates", icon: "🌿", action: () => setStep("activityFeed") },
    { label: "Community Challenges", detail: "Join seasonal prompts", icon: "🏆", action: () => setStep("communityChallenges") },
    { label: "Reader Profile", detail: "Your public scrapbook", icon: "🌸", action: () => setStep("profile") },
    { label: "Find Readers", detail: "Discover bookish friends", icon: "💌", action: () => setStep("findReaders") },
    { label: "Notifications", detail: "Catch up on updates", icon: "🔔", action: () => setStep("notifications") },
  ]

  return (
    <section
  className={[
    "home-scrapbook-page",
    "scrapbook-page",
    "scrapbook-section",
    homeComposition?.composition?.feeling &&
      `pp-home--feeling-${homeComposition.composition.feeling}`,
  ]
    .filter(Boolean)
    .join(" ")}
  data-home-feeling={homeComposition?.composition?.feeling}
>
      <div className="home-auth-card">
        <Auth user={user} onAuthChange={loadUser} />
      </div>

      {user && localStorage.getItem("brainChemistryBooksReviews") && (
        <div className="home-alert-card paper-card sticky-note">
          <p>Found reviews saved on this browser.</p>
          <button className="paper-button" onClick={migrateLocalReviewsToCloud}>
            Move Local Reviews to My Account
          </button>
        </div>
      )}

      {user && embeddedReadingLogCount > 0 && (
        <div className="home-alert-card paper-card sticky-note">
          <p>
            Found {embeddedReadingLogCount} reading log
            {embeddedReadingLogCount === 1 ? "" : "s"} saved inside book records.
          </p>
          <button className="paper-button" onClick={migrateEmbeddedReadingLogsToCloud}>
            Move Reading Logs to Supabase Table
          </button>
        </div>
      )}

      <PaperCard
        as="header"
        variant="deckled"
        objectType="section"
        scrapbookId="home-hero"
        className="home-hero paper-card paper-card--deckled"
      >
        <div>
          <p className="scrapbook-kicker">Read • Rate • Romanticize</p>
          <h1>Welcome back{user ? ", reader" : ""}.</h1>
          <p>
            A cozy reading scrapbook for reviews, ratings, spice, tropes,
            reading goals, and the books worth pressing between the pages.
          </p>
        </div>
        <BotanicalAccent className="pressed-flower-accent" />
      </PaperCard>

      <div className="home-scrapbook-grid">
        <PaperCard
          as="aside"
          variant="notebook"
          objectType="section"
          scrapbookId="home-sidebar"
          tape="Pressed Pages"
          tapeVariant="sage"
          className="home-menu-card paper-card paper-card--notebook"
        >
          <div className="home-menu-list">
            {navItems.map((item) => (
              <button key={item.label} className="home-menu-button bookmark-tab" onClick={item.action}>
                <span aria-hidden="true">{item.icon}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              </button>
            ))}
          </div>
        </PaperCard>

        <div className="home-main-stack">
          <SectionDivider label="Continue Your Story" icon="📖" className="home-section-divider" />

          <div className="home-feature-row">
            <PaperCard
              as="article"
              variant="journal"
              objectType="book"
              scrapbookId={
                currentBook.id ??
                currentBook.googleBooksId ??
                currentBook.isbn ??
                currentBook.title ??
                "current-read"
              }
              tape="Currently Reading"
              tapeVariant="sage"
              flower="sprig"
              scrapbookComposition={currentlyReadingComposition}
              renderMaterialAccents={false}
              className="home-current-read paper-card paper-card--journal"
            >
              <ScrapbookAsset
                asset={homeCurrentReadTape}
                className="home-current-read__tape"
                placement={{
                  width:
                    "clamp(104px, 14vw, 136px)",
                }}
              />

              {currentRead ? (
                <div className="home-current-read-content">
                  {currentBook.coverUrl || currentBook.cover ? (
                    <PolaroidFrame
                      scrapbookId={
                        currentBook.id ??
                        currentBook.googleBooksId ??
                        currentBook.isbn ??
                        currentBook.title
                      }
                      src={currentBook.coverUrl || currentBook.cover}
                      alt={`${currentBook.title || "Current read"} cover`}
                      rotate="left"
                    />
                  ) : (
                    <div className="home-current-cover home-current-cover-placeholder polaroid-frame" aria-hidden="true">
                      📖
                    </div>
                  )}
                  <div>
                    <p className="home-card-kicker">currently tucked into...</p>
                    <h2>{currentBook.title || "Untitled Book"}</h2>
                    <p>{currentBook.author || "Unknown Author"}</p>
                    <button className="paper-button" onClick={() => setStep("currentlyReading")}>
                      Continue Reading
                    </button>
                  </div>
                </div>
              ) : (
                <div className="home-empty-note sticky-note">
                  <p>No current read yet. Add one when you are ready to start your next chapter.</p>
                  <button className="paper-button" onClick={openAddBookMenu}>Add a Current Read</button>
                </div>
              )}
            </PaperCard>

            {user && (
              <PaperCard
                as="article"
                variant="ledger"
                objectType="statistic"
                scrapbookId="home-stats"
                tape="At a Glance"
                tapeVariant="linen"
                className="home-glance-card paper-card paper-card--ledger"
              >
                <div className="home-stat-grid home-stat-grid--componentized">
                  <StatCard
                    icon="🔥"
                    value={readingStreakStats.currentStreak}
                    label="Day streak"
                  />
                  <StatCard
                    icon="📖"
                    value={currentlyReadingReviews.length}
                    label="Reading now"
                  />
                  <StatCard
                    icon="🏆"
                    value={readingStreakStats.longestStreak}
                    label="Longest streak"
                  />
                </div>
              </PaperCard>
            )}
          </div>

          <SectionDivider
            label="Choose Your Next Chapter"
            icon="🔖"
            className="home-section-divider"
          />

          <PaperCard
            as="article"
            variant="wide"
            objectType="section"
            scrapbookId="home-next-five"
            tape="Your Next 5"
            tapeVariant="sage"
            className="home-next-five-card paper-card paper-card--wide"
          >
            <header className="home-next-five__heading">
              <div>
                <p className="scrapbook-kicker">Curated TBR</p>
                <h2>Your Next 5</h2>
                <p>
                  The books closest to becoming your next read.
                </p>
              </div>

              <span>{nextFiveReviews.length} / 5 chosen</span>
            </header>

            {upNextReview ? (
              <>
                <div className="home-next-five__feature">
                  <div className="home-next-five__cover-wrap">
                    {upNextBook.coverUrl || upNextBook.cover ? (
                      <PolaroidFrame
                        scrapbookId={
                          upNextBook.id ??
                          upNextBook.googleBooksId ??
                          upNextBook.isbn ??
                          upNextReview.id
                        }
                        src={upNextBook.coverUrl || upNextBook.cover}
                        alt={`${upNextBook.title || "Up Next"} cover`}
                        rotate="left"
                      />
                    ) : (
                      <div
                        className="home-next-five__cover-placeholder"
                        aria-hidden="true"
                      >
                        📚
                      </div>
                    )}
                  </div>

                  <div className="home-next-five__feature-copy">
                    <p className="home-next-five__up-next-label">
                      Up Next
                    </p>
                    <h3>{upNextBook.title || "Untitled Book"}</h3>
                    <p>
                      by {upNextBook.author || "Unknown Author"}
                    </p>

                    <div className="home-next-five__feature-actions">
                      <button
                        type="button"
                        className="paper-button home-next-five__start"
                        onClick={startUpNext}
                      >
                        📖 Start Reading
                      </button>

                      <button
                        type="button"
                        className="paper-button paper-button--quiet"
                        onClick={openTbrShelf}
                      >
                        Manage Next 5
                      </button>
                    </div>
                  </div>
                </div>

                <ol className="home-next-five__queue">
                  {Array.from({ length: 5 }, (_, index) => {
                    const reviewItem = nextFiveReviews[index]
                    const book = reviewItem?.bookInfo || {}

                    return (
                      <li
                        key={reviewItem?.id || `home-next-five-${index + 1}`}
                        className={reviewItem ? "is-filled" : ""}
                      >
                        <span className="home-next-five__queue-number">
                          {index + 1}
                        </span>

                        {reviewItem ? (
                          <>
                            <div>
                              <strong>{book.title || "Untitled Book"}</strong>
                              <small>{book.author || "Unknown Author"}</small>
                            </div>

                            <div className="home-next-five__queue-actions">
                              <button
                                type="button"
                                disabled={index === 0}
                                aria-label={`Move ${
                                  book.title || "book"
                                } up`}
                                onClick={() =>
                                  moveNextFive(reviewItem, "up")
                                }
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                disabled={
                                  index === nextFiveReviews.length - 1
                                }
                                aria-label={`Move ${
                                  book.title || "book"
                                } down`}
                                onClick={() =>
                                  moveNextFive(reviewItem, "down")
                                }
                              >
                                ↓
                              </button>
                            </div>
                          </>
                        ) : (
                          <span className="home-next-five__open-slot">
                            Open slot
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ol>
              </>
            ) : (
              <div className="home-next-five__empty">
                <span aria-hidden="true">🔖</span>
                <h3>Choose the stories waiting closest.</h3>
                <p>
                  Curate up to five books from your TBR, then keep the
                  first one ready whenever your reading mood changes.
                </p>
                <button
                  type="button"
                  className="paper-button"
                  onClick={openTbrShelf}
                >
                  Choose Your Next 5
                </button>
              </div>
            )}
          </PaperCard>

          {recentReviews.length > 0 && (
            <PaperCard
              as="article"
              variant="wide"
              objectType="section"
              scrapbookId="recent-books"
              tape="Recently Saved"
              data-paper={recentBooksPaper}
              scrapbookComposition={recentlyFinishedComposition}
              renderMaterialAccents={false}
              tapeVariant="rose"
className="home-recent-card paper-card paper-card--wide"
             >
              <SectionDivider label="Latest Pressed Pages" icon="🌸" className="home-section-divider home-section-divider--inside" />

              <div className="home-recent-grid home-recent-grid--bookcards">
                {recentReviews.map((item) => {
                  const book = item.bookInfo || {}
                  return (
                    <BookCard
                      key={item.id}
                      scrapbookId={
                        book.id ??
                        book.googleBooksId ??
                        book.isbn ??
                        item.id
                      }
                      book={book}
                      status={book.status || "Saved"}
                      rating={item.bookScore}
                      obsession={item.obsessionScore}
                      variant="compact"
                      paperVariant="deckled"
                      hiddenAnchorTypes={
                        homeRecentHiddenAnchorTypes
                      }
                      className="home-recent-book-card"
                    />
                  )
                })}
              </div>

              <button className="paper-button paper-button--quiet" onClick={() => setStep("library")}>
                View Library →
              </button>
            </PaperCard>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage
