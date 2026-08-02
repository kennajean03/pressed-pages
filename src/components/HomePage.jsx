import Auth from "../Auth"
import BotanicalAccent from "./scrapbook/BotanicalAccent/BotanicalAccent"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./scrapbook/PolaroidFrame/PolaroidFrame"
import StatCard from "./scrapbook/StatCard/StatCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import ProgressBar from "./ProgressBar"
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

const welcomePaperclip =
  resolveScrapbookMaterialRole(
    "metal",
    "paperclip",
    "metal-paperclip-antique-gold-01"
  )

const welcomeTape =
  resolveScrapbookMaterialRole(
    "tape",
    "bookish",
    "tape-washi-bookish-neutral-01"
  )

const welcomeFlower =
  resolveScrapbookMaterialRole(
    "botanicals",
    "filler",
    "flower-babys-breath-01"
  )

const homePatternedCorner =
  resolveScrapbookMaterialRole(
    "paper",
    "patternedCorner",
    "paper-scrap-torn-celestial-corner-01"
  )

function HomePage({
  user,
  displayName,
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
  getProgressPercent = () => 0,
  getProgressUnitCopy = () => ({
    progressLine: () => "",
  }),
  readingGoalStats = {},
  readingCalendarStats = {},
  monthlyWrapUpStats = {},
  allReadingLogs = [],
  setAnalyticsTab = () => {},
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
  const safeReadingLogs = Array.isArray(allReadingLogs)
    ? allReadingLogs
    : []
  const latestReadingLog = [...safeReadingLogs]
    .sort((first, second) => {
      const firstDate = new Date(
        first?.date ||
          first?.createdAt ||
          first?.created_at ||
          0
      ).getTime()
      const secondDate = new Date(
        second?.date ||
          second?.createdAt ||
          second?.created_at ||
          0
      ).getTime()

      return secondDate - firstDate
    })[0]
  const latestFinishedReview = savedReviews
    .filter((item) => item?.bookInfo?.status === "Finished")
    .sort(
      (first, second) =>
        new Date(
          second?.bookInfo?.dateFinished ||
            second?.updatedAt ||
            0
        ).getTime() -
        new Date(
          first?.bookInfo?.dateFinished ||
            first?.updatedAt ||
            0
        ).getTime()
    )[0]
  const latestSessionNote =
    latestReadingLog?.notes ||
    latestReadingLog?.note ||
    latestReadingLog?.quote ||
    ""
  const keepsakeTypes = [
    latestReadingLog?.photoUrl ||
      latestReadingLog?.photoURL ||
      latestReadingLog?.photo,
    latestReadingLog?.quote,
    latestReadingLog?.flowerVariant,
  ].filter(Boolean)
  const currentProgress = currentRead
    ? getProgressPercent(currentBook)
    : 0
  const currentProgressCopy = currentRead
    ? getProgressUnitCopy(currentBook)
    : null
  const readerName =
    displayName ||
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    "reader"

  function openTbrShelf() {
    setLibraryFilter("tbr")
    setStep("library")
  }

  function openAnalyticsTab(tab) {
    setAnalyticsTab(tab)
    setStep("analytics")
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

  if (!user) {
    return (
      <section className="welcome-gate">
        <div
          id="welcome-account"
          className="welcome-gate__account"
        >
          <PaperCard
            as="header"
            variant="deckled"
            objectType="section"
            scrapbookId="welcome-account-heading"
            className="welcome-gate__heading"
            renderMaterialAccents={false}
          >
            <ScrapbookAsset
              asset={welcomePaperclip}
              className="welcome-gate__heading-clip"
              placement={{
                width: "48px",
                rotation: "8deg",
              }}
            />

            <p className="scrapbook-kicker">
              Read • remember • preserve
            </p>
            <h1>
              Welcome back to
              <br />
              your reading life
            </h1>
            <p>
              Make a home for the stories that move you.
            </p>
          </PaperCard>

          <div className="home-auth-card welcome-gate__auth">
            <Auth
              user={user}
              onAuthChange={loadUser}
            />
          </div>

          <aside className="welcome-gate__keepsake-note">
            <ScrapbookAsset
              asset={welcomeTape}
              className="welcome-gate__note-tape"
              placement={{
                width: "118px",
                rotation: "-3deg",
                opacity: 0.88,
              }}
            />
            <p>
              Every book you love becomes a part of you.
            </p>
            <span aria-hidden="true">♡</span>
          </aside>
        </div>

        <div
          id="welcome-preview"
          className="welcome-gate__collage"
          aria-label="A preview of a Pressed Pages book journey"
        >
          <aside className="welcome-gate__manifesto">
            <ScrapbookAsset
              asset={welcomeTape}
              className="welcome-gate__manifesto-tape"
              placement={{
                width: "136px",
                rotation: "2deg",
                opacity: 0.9,
              }}
            />
            <p>
              A place to keep
              <br />
              the stories that
              <br />
              stayed with you.
            </p>
            <span aria-hidden="true">♡</span>
          </aside>

          <article className="welcome-gate__journey">
            <ScrapbookAsset
              asset={welcomePaperclip}
              className="welcome-gate__journey-clip"
              placement={{
                width: "54px",
                rotation: "-7deg",
              }}
            />

            <div
              className="welcome-gate__book-cover"
              aria-hidden="true"
            >
              <small>Pressed Pages</small>
              <strong>
                Your
                <br />
                Story
                <br />
                Here
              </strong>
              <span>✦</span>
            </div>

            <div className="welcome-gate__journey-copy">
              <p className="scrapbook-kicker">
                A glimpse inside
              </p>
              <h2>Keep what stayed</h2>
              <p>Reviews, notes, and reading memories</p>
              <div
                className="welcome-gate__stars"
                aria-label="A place for every reading season"
              >
                ◇ ✦ ◇ ✦ ◇
              </div>
              <blockquote>
                <strong>Your own pages</strong>
                Press a favorite line, a reading mood, or the
                thought you want to remember after the final page.
              </blockquote>
              <div className="welcome-gate__tags">
                <span>read</span>
                <span>remember</span>
                <span>preserve</span>
              </div>
            </div>
          </article>

          <aside className="welcome-gate__quote">
            <span aria-hidden="true">“</span>
            <p>
              Every story leaves a mark.
              <br />
              Keep the pieces worth carrying.
            </p>
            <small>— A note for your next chapter</small>
          </aside>

          <aside className="welcome-gate__reading-stat">
            <p>Track as you read</p>
            <div>
              <strong>Pages</strong>
              <span>progress</span>
            </div>
            <div>
              <strong>Time</strong>
              <span>sessions</span>
            </div>
          </aside>

          <ScrapbookAsset
            asset={welcomeFlower}
            className="welcome-gate__flower"
            placement={{
              width: "clamp(130px, 17vw, 230px)",
              rotation: "-8deg",
              opacity: 0.86,
            }}
          />
        </div>
      </section>
    )
  }

  const navItems = [
    { label: "Add Book", detail: "Start a new entry", icon: "✦", action: openAddBookMenu },
    { label: "My Library", detail: "Browse your shelves", icon: "▥", action: () => setStep("library") },
    { label: "Currently Reading", detail: "Open your active reads", icon: "◫", action: () => setStep("currentlyReading") },
    { label: "Reading Almanac", detail: "Stats, seasons, & milestones", icon: "✎", action: () => setStep("analytics") },
    { label: "Activity Feed", detail: "See friend updates", icon: "♧", action: () => setStep("activityFeed") },
    { label: "Community Challenges", detail: "Join seasonal prompts", icon: "☆", action: () => setStep("communityChallenges") },
    { label: "Reader Profile", detail: "Your public scrapbook", icon: "○", action: () => setStep("profile") },
    { label: "Find Readers", detail: "Discover bookish friends", icon: "◇", action: () => setStep("findReaders") },
    { label: "Notifications", detail: "Catch up on updates", icon: "♢", action: () => setStep("notifications") },
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
      <div
        className={[
          "home-auth-card",
          user ? "home-auth-card--signed-in" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
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

      <header className="home-hero">
        <div>
          <p className="scrapbook-kicker">Read • Rate • Romanticize</p>
          <h1>Welcome back, {readerName}.</h1>
          <p>
            A cozy reading scrapbook for reviews, ratings, spice, tropes,
            reading goals, and the books worth pressing between the pages.
          </p>
          <p className="home-hero__margin-note">
            Make room for the stories that stay. ♡
          </p>
        </div>
        <BotanicalAccent className="pressed-flower-accent" />
      </header>

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
          <SectionDivider label="Continue Your Story" icon="✦" className="home-section-divider" />

          <div className="home-feature-row">
            <article className="home-current-read">
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
                      ◫
                    </div>
                  )}
                  <div>
                    <p className="home-card-kicker">currently tucked into...</p>
                    <h2>{currentBook.title || "Untitled Book"}</h2>
                    <p>{currentBook.author || "Unknown Author"}</p>
                    <div className="home-current-read__progress">
                      <ProgressBar
                        percent={currentProgress}
                        label={`${
                          currentBook.title || "Current read"
                        } progress`}
                      />
                      <small>
                        {currentProgressCopy?.progressLine(
                          currentBook.currentPage,
                          currentBook.totalPages
                        )}
                      </small>
                    </div>
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
            </article>

            {user && (
              <aside className="home-glance-card">
                <div className="home-stat-grid home-stat-grid--componentized">
                  <StatCard
                    icon="◇"
                    value={readingStreakStats.currentStreak}
                    label="Day streak"
                  />
                  <StatCard
                    icon="▥"
                    value={currentlyReadingReviews.length}
                    label="Reading now"
                  />
                  <StatCard
                    icon="✧"
                    value={readingStreakStats.longestStreak}
                    label="Longest streak"
                  />
                </div>
              </aside>
            )}
          </div>

          <article className="home-reading-pulse">
            <ScrapbookAsset
              asset={homePatternedCorner}
              className="home-reading-pulse__patterned-corner"
              placement={{ width: "clamp(108px, 11vw, 150px)" }}
            />
            <header className="home-reading-pulse__heading">
              <div>
                <p className="scrapbook-kicker">This Reading Month</p>
                <h2>Your reading life, at a glance</h2>
              </div>
              <button
                type="button"
                className="paper-button paper-button--quiet"
                onClick={() => openAnalyticsTab("overview")}
              >
                Open Almanac
              </button>
            </header>

            <div className="home-reading-pulse__grid">
              <section className="home-pulse-note home-pulse-note--goal">
                <span aria-hidden="true">◎</span>
                <p>Annual books goal</p>
                <strong>
                  {readingGoalStats.booksFinishedThisYear || 0}
                </strong>
                <small>
                  {readingGoalStats.booksPercent || 0}% complete
                </small>
                <ProgressBar
                  percent={readingGoalStats.booksPercent || 0}
                  label="Annual books goal"
                />
              </section>

              <section className="home-pulse-note home-pulse-note--calendar">
                <span aria-hidden="true">□</span>
                <p>
                  {readingCalendarStats.monthLabel ||
                    "Reading calendar"}
                </p>
                <strong>
                  {readingCalendarStats.totalDaysRead || 0}
                </strong>
                <small>days with reading logged</small>
                <small>
                  {monthlyWrapUpStats.booksFinished || 0} books finished ·{" "}
                  {monthlyWrapUpStats.pagesLogged || 0} pages
                </small>
                <button
                  type="button"
                  onClick={() => openAnalyticsTab("calendar")}
                >
                  View calendar
                </button>
              </section>

              <section className="home-pulse-note home-pulse-note--session">
                <span aria-hidden="true">↟</span>
                <p>Most recent session</p>
                <strong>
                  {latestReadingLog?.pagesRead || 0}
                </strong>
                <small>
                  {latestReadingLog
                    ? `${latestReadingLog.title || "Untitled Book"} · ${
                        latestReadingLog.minutesRead
                          ? `${latestReadingLog.minutesRead} min`
                          : "pages logged"
                      }`
                    : "No session logged yet"}
                </small>
                <button
                  type="button"
                  onClick={() => setStep("readingLog")}
                >
                  Open reading log
                </button>
              </section>
            </div>
          </article>

          <article className="home-keepsakes-card">
            <header>
              <p className="scrapbook-kicker">Today’s Keepsakes</p>
              <h2>Pressed from your pages</h2>
            </header>

            <div className="home-keepsakes-card__memory">
              <span aria-hidden="true">
                {keepsakeTypes.length ? "❀" : "◇"}
              </span>
              <div>
                <strong>
                  {keepsakeTypes.length
                    ? `${keepsakeTypes.length} recent keepsake${
                        keepsakeTypes.length === 1 ? "" : "s"
                      }`
                    : "A quiet keepsake pocket"}
                </strong>
                <p>
                  {latestSessionNote
                    ? latestSessionNote
                    : latestFinishedReview
                      ? `${
                          latestFinishedReview.bookInfo?.title ||
                          "Your latest finished story"
                        } is safely pressed in your library.`
                      : "Quotes, photos, flowers, and session notes will gather here as you read."}
                </p>
              </div>
            </div>

            <div className="home-keepsakes-card__actions">
              <button
                type="button"
                onClick={openAddBookMenu}
              >
                <span aria-hidden="true">＋</span>
                Add Book
              </button>
              <button
                type="button"
                onClick={() => setStep("readingLog")}
              >
                <span aria-hidden="true">✎</span>
                Log Reading
              </button>
              <button
                type="button"
                onClick={() => openAnalyticsTab("goals")}
              >
                <span aria-hidden="true">◎</span>
                Goals
              </button>
            </div>

            <aside className="home-note-to-self">
              <span>Note to self</span>
              <p>
                {latestSessionNote
                  ? latestSessionNote
                  : "Leave a thought in your next reading log; small impressions become the best memories."}
              </p>
            </aside>
          </article>

          <SectionDivider
            label="Choose Your Next Chapter"
            icon="✦"
            className="home-section-divider"
          />

          <article className="home-next-five-card">
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
                        ▥
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
                        Start Reading
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
                            {book.coverUrl ? (
                              <img
                                src={book.coverUrl}
                                alt=""
                                className="home-next-five__queue-cover"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <span
                                className="home-next-five__queue-cover-placeholder"
                                aria-hidden="true"
                              >
                                ▥
                              </span>
                            )}

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
                <span aria-hidden="true">✦</span>
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
          </article>

          {recentReviews.length > 0 && (
            <article className="home-recent-card">
              <SectionDivider label="Latest Pressed Pages" icon="✦" className="home-section-divider home-section-divider--inside" />

              <div className="home-recent-grid home-recent-grid--bookcards">
                {recentReviews.map((item) => {
                  const book = item.bookInfo || {}
                  const bookTitle = book.title || "Untitled Book"
                  const bookAuthor = book.author || "Unknown Author"
                  const bookCover = book.coverUrl || book.cover
                  const bookStatus = book.status || "Saved"

                  return (
                    <article
                      key={item.id}
                      className="home-recent-book-card"
                      data-status={bookStatus}
                    >
                      <div className="home-recent-book-card__cover">
                        {bookCover ? (
                          <img
                            src={bookCover}
                            alt={`${bookTitle} cover`}
                          />
                        ) : (
                          <span aria-hidden="true">▥</span>
                        )}
                      </div>

                      <div className="home-recent-book-card__copy">
                        <span className="home-recent-book-card__status">
                          {bookStatus}
                        </span>
                        <h3>{bookTitle}</h3>
                        <p>{bookAuthor}</p>
                      </div>
                    </article>
                  )
                })}
              </div>

              <button className="paper-button paper-button--quiet" onClick={() => setStep("library")}>
                View Library →
              </button>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage
