import ReadingHeatMap from "./ReadingHeatMap"
import ReadingGoalsPanel from "./ReadingGoalsPanel"
import AchievementsPanel from "./AchievementsPanel"
import ReadingCalendarPanel from "./ReadingCalendarPanel"
import MonthlyWrapUpPanel from "./MonthlyWrapUpPanel"
import YearInBooksPanel from "./YearInBooksPanel"
import LibraryOverviewPanel from "./LibraryOverviewPanel"
import ReviewAveragesPanel from "./ReviewAveragesPanel"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import NotebookTab from "./scrapbook/NotebookTab/NotebookTab"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import Sticker from "./scrapbook/Sticker/Sticker"
import { useResolvedComposition } from "../scrapbook/hooks"
import { renderAnchors } from "../scrapbook/renderers/renderAnchors"
import "./AnalyticsPhase14H.css"
import "../styles/phase15e-almanac.css"

function AnalyticsPage({
  saveMessage,
  analyticsTab,
  setAnalyticsTab,
  readingGoals,
  readingGoalStats,
  updateReadingGoal,
  achievementStats,
  downloadAchievementGraphicPng,
  readingCalendarStats,
  selectedCalendarDate,
  setSelectedCalendarDate,
  shiftCalendarMonth,
  formatDateKey,
  monthlyWrapUpStats,
  wrapUpMonthKey,
  setWrapUpMonthKey,
  wrapUpMonthOptions,
  getMonthlyWrapUpGraphicDataUrl,
  downloadMonthlyWrapUpGraphicPng,
  downloadMonthlyWrapUpGraphicSvg,
  yearInBooksStats,
  yearInBooksKey,
  setYearInBooksKey,
  yearInBooksOptions,
  getYearInBooksGraphicDataUrl,
  downloadYearInBooksGraphicPng,
  downloadYearInBooksGraphicSvg,
  savedReviews,
  totalBooks,
  finishedReviews,
  yearToDateCount,
  currentlyReadingReviews,
  dnfReviews,
  brainChemistryCount,
  averageRating,
  averageSpice,
  averageObsession,
  mostReadTrope,
  mostReadAuthor,
  readingStreakStats,
  readingAnalyticsStats,
  getReadingHeatMapStats,
  setStep,
}) {
  const highestRatedBook = [...finishedReviews].sort(
    (a, b) => Number(b.bookScore || 0) - Number(a.bookScore || 0)
  )[0]
  const formatTotals = finishedReviews.reduce((totals, item) => {
    const format = item.bookInfo?.format || "Unknown"
    totals[format] = (totals[format] || 0) + 1
    return totals
  }, {})
  const formatHighlights = Object.entries(formatTotals).sort(
    (a, b) => b[1] - a[1]
  )
  const maxMonthBooks = Math.max(
    ...(readingAnalyticsStats.monthSeries || []).map((month) => month.books),
    1
  )
  const compareValue = (current, previous) => {
    const difference = Number(current || 0) - Number(previous || 0)
    if (!difference) return "Same as last month"
    return `${difference > 0 ? "+" : ""}${difference} from last month`
  }
  const analyticsTabs = [
    { value: "overview", label: "Overview", icon: "◫", tone: "linen" },
    { value: "goals", label: "Goals", icon: "🎯", tone: "sage" },
    { value: "achievements", label: "Achievements", icon: "☆", tone: "gold" },
    { value: "calendar", label: "Calendar", icon: "□", tone: "rose" },
    { value: "wrapUps", label: "Wrap-Ups", icon: "▣", tone: "linen" },
    { value: "yearInBooks", label: "Year In Books", icon: "▥", tone: "sage" },
  ]

    const {
    recipe: analyticsRecipe,
    composition: analyticsComposition,
  } = useResolvedComposition({
    scrapbookId: "analytics-almanac-page",
    objectType: "page",
    variant: "analytics",
    occasion: "annualScrapbook",
  })

  const pageClasses = [
    "analytics-almanac-page",
    "scrapbook-page",
    "scrapbook-section",
    analyticsComposition?.layout?.density &&
      `analytics-almanac-page--density-${analyticsComposition.layout.density}`,
    analyticsComposition?.feeling &&
      `analytics-almanac-page--feeling-${analyticsComposition.feeling}`,
    analyticsRecipe?.compositionMood &&
      `analytics-almanac-page--mood-${analyticsRecipe.compositionMood}`,
  ]
    .filter(Boolean)
    .join(" ")

  return (
<section
  className={pageClasses}
  data-composition-mood={analyticsRecipe?.compositionMood}
  data-scrapbook-feeling={analyticsComposition?.feeling}
>
        <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Almanac"
        tapeVariant="sage"
        flower="sprig"
        className="analytics-almanac-hero paper-card paper-card--deckled"
      >
                {renderAnchors(analyticsComposition)}
        <p className="scrapbook-kicker">Stats • Seasons • Milestones</p>
        <h1>Your reading almanac.</h1>
        <p>
          A keepsake of your reading life, built from finished dates, reading sessions,
          pages, minutes, goals, achievements, and the little patterns that make your year bookish.
        </p>
        <div className="analytics-almanac-stickers">
          <Sticker icon="▥" tone="linen">{totalBooks} books saved</Sticker>
          <Sticker icon="✓" tone="sage">{yearToDateCount} finished this year</Sticker>
          <Sticker icon="✦" tone="rose">{readingStreakStats.currentStreak} day streak</Sticker>
        </div>
      </PaperCard>

      {saveMessage && (
        <PaperCard
          className="analytics-message-card paper-card sticky-note"
          role="status"
          aria-live="polite"
        >
          <p>{saveMessage}</p>
        </PaperCard>
      )}

      <div className="analytics-notebook-tabs" aria-label="Reading analytics sections">
        {analyticsTabs.map((tab) => (
          <NotebookTab
            key={tab.value}
            icon={tab.icon}
            tone={tab.tone}
            active={analyticsTab === tab.value}
            onClick={() => setAnalyticsTab(tab.value)}
          >
            {tab.label}
          </NotebookTab>
        ))}
      </div>

      {analyticsTab === "overview" && (
        <>
          <SectionDivider label="Almanac Snapshot" icon="♧" />

          <div className="analytics-snapshot-grid">
            <StatCard icon="▥" value={totalBooks} label="Total books" />
            <StatCard icon="✓" value={readingAnalyticsStats.finishedThisYear} label="Finished this year" />
            <StatCard icon="◫" value={currentlyReadingReviews.length} label="Reading now" />
            <StatCard icon="◇" value={brainChemistryCount} label="Brain Chemistry" />
          </div>

          <div className="analytics-overview-grid">
            <PaperCard
              variant="journal"
              tape="Reading Activity"
              tapeVariant="sage"
              flower="sprig"
              className="analytics-keepsake-card paper-card paper-card--journal"
            >
              <div className="analytics-keepsake-list">
                <p><strong>Current Streak:</strong> {readingStreakStats.currentStreak} days</p>
                <p><strong>Longest Streak:</strong> {readingStreakStats.longestStreak} days</p>
                <p><strong>Reading Days This Month:</strong> {readingAnalyticsStats.readingDaysThisMonth}</p>
                <p><strong>Reading Days This Year:</strong> {readingAnalyticsStats.readingDaysThisYear}</p>
                <p><strong>Total Reading Sessions:</strong> {readingAnalyticsStats.totalSessions}</p>
                {readingStreakStats.lastLoggedDate && (
                  <p><strong>Last Reading Day:</strong> {formatDateKey(readingStreakStats.lastLoggedDate)}</p>
                )}
              </div>
            </PaperCard>

            <PaperCard
              variant="journal"
              tape="Pages"
              tapeVariant="linen"
              className="analytics-keepsake-card paper-card paper-card--journal"
            >
              <div className="analytics-keepsake-list">
                <p><strong>This Month:</strong> {readingAnalyticsStats.pagesThisMonth} pages</p>
                <p><strong>This Year:</strong> {readingAnalyticsStats.pagesThisYear} pages</p>
                <p><strong>Total Logged:</strong> {readingAnalyticsStats.totalPages} pages</p>
                <p><strong>Average Reading Day:</strong> {readingAnalyticsStats.averagePagesPerReadingDay} pages</p>
                {readingAnalyticsStats.biggestReadingDay && (
                  <p>
                    <strong>Biggest Reading Day:</strong> {readingAnalyticsStats.biggestReadingDay.pages} pages on{" "}
                    {formatDateKey(readingAnalyticsStats.biggestReadingDay.date)}
                  </p>
                )}
              </div>
            </PaperCard>

            <PaperCard
              variant="journal"
              tape="Time"
              tapeVariant="rose"
              className="analytics-keepsake-card paper-card paper-card--journal"
            >
              <div className="analytics-keepsake-list">
                <p><strong>This Month:</strong> {readingAnalyticsStats.minutesThisMonth} minutes</p>
                <p><strong>This Year:</strong> {readingAnalyticsStats.minutesThisYear} minutes</p>
                <p><strong>Total Hours:</strong> {readingAnalyticsStats.totalHours}</p>
                <p><strong>Average Session:</strong> {readingAnalyticsStats.averageSessionLength} minutes</p>
                <p><strong>Estimated Pace:</strong> {readingAnalyticsStats.pagesPerHour} pages/hour</p>
              </div>
            </PaperCard>

            <PaperCard
              variant="journal"
              tape="Finished Books"
              tapeVariant="gold"
              className="analytics-keepsake-card paper-card paper-card--journal"
            >
              <div className="analytics-keepsake-list">
                <p><strong>This Month:</strong> {readingAnalyticsStats.finishedThisMonth}</p>
                <p><strong>This Year:</strong> {readingAnalyticsStats.finishedThisYear}</p>
                <p><strong>Average Days to Finish:</strong> {readingAnalyticsStats.averageDaysToFinish}</p>
                {readingAnalyticsStats.fastestRead && (
                  <p>
                    <strong>Fastest Read:</strong> {readingAnalyticsStats.fastestRead.item.bookInfo.title || "Untitled Book"} •{" "}
                    {readingAnalyticsStats.fastestRead.days} day
                    {readingAnalyticsStats.fastestRead.days === 1 ? "" : "s"}
                  </p>
                )}
                {readingAnalyticsStats.slowestRead && (
                  <p>
                    <strong>Slowest Read:</strong> {readingAnalyticsStats.slowestRead.item.bookInfo.title || "Untitled Book"} •{" "}
                    {readingAnalyticsStats.slowestRead.days} day
                    {readingAnalyticsStats.slowestRead.days === 1 ? "" : "s"}
                  </p>
                )}
              </div>
            </PaperCard>
          </div>

          <SectionDivider label="Six-Month Reading Story" icon="↟" />

          <div className="analytics-trend-spread">
            <PaperCard
              variant="notebook"
              className="analytics-trend-card paper-card paper-card--notebook"
            >
              <div className="analytics-trend-card__heading">
                <div>
                  <p className="scrapbook-kicker">Books finished by month</p>
                  <h2>Your recent reading rhythm</h2>
                </div>
                <Sticker icon="↟" tone="sage">
                  Projected {readingAnalyticsStats.projectedBooks || 0} this year
                </Sticker>
              </div>

              <div
                className="analytics-month-bars"
                aria-label="Books finished over the last six months"
              >
                {(readingAnalyticsStats.monthSeries || []).map((month) => (
                  <div key={month.key}>
                    <span
                      style={{
                        "--analytics-bar-height": `${Math.max(
                          8,
                          Math.round((month.books / maxMonthBooks) * 100)
                        )}%`,
                      }}
                    >
                      <i>{month.books}</i>
                    </span>
                    <strong>{month.label}</strong>
                    <small>{month.readingDays} days</small>
                  </div>
                ))}
              </div>
            </PaperCard>

            <PaperCard
              variant="journal"
              className="analytics-comparison-card paper-card paper-card--journal"
            >
              <p className="scrapbook-kicker">Compared with last month</p>
              <h2>{readingAnalyticsStats.currentMonthLabel}</h2>
              <dl>
                <div>
                  <dt>Finished books</dt>
                  <dd>{readingAnalyticsStats.finishedThisMonth}</dd>
                  <small>
                    {compareValue(
                      readingAnalyticsStats.finishedThisMonth,
                      readingAnalyticsStats.previousMonth?.books
                    )}
                  </small>
                </div>
                <div>
                  <dt>Pages</dt>
                  <dd>{readingAnalyticsStats.pagesThisMonth}</dd>
                  <small>
                    {compareValue(
                      readingAnalyticsStats.pagesThisMonth,
                      readingAnalyticsStats.previousMonth?.pages
                    )}
                  </small>
                </div>
                <div>
                  <dt>Reading days</dt>
                  <dd>{readingAnalyticsStats.readingDaysThisMonth}</dd>
                  <small>
                    {compareValue(
                      readingAnalyticsStats.readingDaysThisMonth,
                      readingAnalyticsStats.previousMonth?.readingDays
                    )}
                  </small>
                </div>
              </dl>
            </PaperCard>
          </div>

          <SectionDivider label="Favorites & Highlights" icon="♡" />

          <div className="analytics-highlight-grid">
            <PaperCard variant="journal" className="analytics-favorite-card">
              <p className="scrapbook-kicker">Highest rated</p>
              <div>
                {highestRatedBook?.bookInfo?.coverUrl && (
                  <img
                    src={highestRatedBook.bookInfo.coverUrl}
                    alt={`${highestRatedBook.bookInfo.title} cover`}
                  />
                )}
                <div>
                  <h3>
                    {highestRatedBook?.bookInfo?.title || "No finished favorite yet"}
                  </h3>
                  <p>{highestRatedBook?.bookInfo?.author || ""}</p>
                  {highestRatedBook && (
                    <Sticker icon="★" tone="gold">
                      {Number(highestRatedBook.bookScore || 0).toFixed(1)} / 5
                    </Sticker>
                  )}
                </div>
              </div>
            </PaperCard>

            <PaperCard variant="journal" className="analytics-reached-card">
              <p className="scrapbook-kicker">Most reached for</p>
              <dl>
                <div>
                  <dt>Author</dt>
                  <dd>{mostReadAuthor || "Not enough data"}</dd>
                </div>
                <div>
                  <dt>Trope</dt>
                  <dd>{mostReadTrope || "Not enough data"}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>{formatHighlights[0]?.[0] || "Not enough data"}</dd>
                </div>
              </dl>
              <div className="analytics-format-list">
                {formatHighlights.slice(0, 4).map(([format, count]) => (
                  <span key={format}>
                    {format} <strong>{count}</strong>
                  </span>
                ))}
              </div>
            </PaperCard>
          </div>

          <SectionDivider label="Pressed Petals" icon="✦" />

          <PaperCard
            variant="notebook"
            tape="A bloom for every reading day"
            tapeVariant="rose"
            className="analytics-petals-card paper-card paper-card--notebook"
          >
            <ReadingHeatMap
              heatMapStats={getReadingHeatMapStats(180)}
              formatDateKey={formatDateKey}
            />
          </PaperCard>
        </>
      )}

      <ReadingGoalsPanel
        analyticsTab={analyticsTab}
        readingGoals={readingGoals}
        readingGoalStats={readingGoalStats}
        updateReadingGoal={updateReadingGoal}
        readingStreakStats={readingStreakStats}
        achievementStats={achievementStats}
        readingAnalyticsStats={readingAnalyticsStats}
      />

      <AchievementsPanel
        analyticsTab={analyticsTab}
        achievementStats={achievementStats}
        downloadAchievementGraphicPng={downloadAchievementGraphicPng}
      />

      <ReadingCalendarPanel
        analyticsTab={analyticsTab}
        readingCalendarStats={readingCalendarStats}
        selectedCalendarDate={selectedCalendarDate}
        setSelectedCalendarDate={setSelectedCalendarDate}
        shiftCalendarMonth={shiftCalendarMonth}
        formatDateKey={formatDateKey}
      />

      <MonthlyWrapUpPanel
        analyticsTab={analyticsTab}
        monthlyWrapUpStats={monthlyWrapUpStats}
        wrapUpMonthKey={wrapUpMonthKey}
        setWrapUpMonthKey={setWrapUpMonthKey}
        wrapUpMonthOptions={wrapUpMonthOptions}
        getMonthlyWrapUpGraphicDataUrl={getMonthlyWrapUpGraphicDataUrl}
        downloadMonthlyWrapUpGraphicPng={downloadMonthlyWrapUpGraphicPng}
        downloadMonthlyWrapUpGraphicSvg={downloadMonthlyWrapUpGraphicSvg}
      />

      <YearInBooksPanel
        analyticsTab={analyticsTab}
        yearInBooksStats={yearInBooksStats}
        yearInBooksKey={yearInBooksKey}
        setYearInBooksKey={setYearInBooksKey}
        yearInBooksOptions={yearInBooksOptions}
        getYearInBooksGraphicDataUrl={getYearInBooksGraphicDataUrl}
        downloadYearInBooksGraphicPng={downloadYearInBooksGraphicPng}
        downloadYearInBooksGraphicSvg={downloadYearInBooksGraphicSvg}
      />

      <LibraryOverviewPanel
        analyticsTab={analyticsTab}
        savedReviews={savedReviews}
        totalBooks={totalBooks}
        finishedReviews={finishedReviews}
        yearToDateCount={yearToDateCount}
        currentlyReadingReviews={currentlyReadingReviews}
        dnfReviews={dnfReviews}
        brainChemistryCount={brainChemistryCount}
      />

      <ReviewAveragesPanel
        analyticsTab={analyticsTab}
        finishedReviews={finishedReviews}
        averageRating={averageRating}
        averageSpice={averageSpice}
        averageObsession={averageObsession}
        mostReadTrope={mostReadTrope}
        mostReadAuthor={mostReadAuthor}
      />

      <div className="analytics-footer-actions">
        <button type="button" onClick={() => setStep("home")}>Back Home</button>
        <button type="button" onClick={() => setStep("currentlyReading")}>Currently Reading</button>
      </div>
    </section>
  )
}

export default AnalyticsPage
