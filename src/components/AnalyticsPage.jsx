import ReadingHeatMap from "./ReadingHeatMap"
import ReadingGoalsPanel from "./ReadingGoalsPanel"
import AchievementsPanel from "./AchievementsPanel"
import ReadingCalendarPanel from "./ReadingCalendarPanel"
import MonthlyWrapUpPanel from "./MonthlyWrapUpPanel"
import YearInBooksPanel from "./YearInBooksPanel"
import LibraryOverviewPanel from "./LibraryOverviewPanel"
import ReviewAveragesPanel from "./ReviewAveragesPanel"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import NotebookTab from "./Scrapbook/NotebookTab/NotebookTab"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"
import Sticker from "./Scrapbook/Sticker/Sticker"

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
  const analyticsTabs = [
    { value: "overview", label: "Overview", icon: "📖", tone: "linen" },
    { value: "goals", label: "Goals", icon: "🎯", tone: "sage" },
    { value: "achievements", label: "Achievements", icon: "🏆", tone: "gold" },
    { value: "calendar", label: "Calendar", icon: "🌸", tone: "rose" },
    { value: "wrapUps", label: "Wrap-Ups", icon: "🗓️", tone: "linen" },
    { value: "yearInBooks", label: "Year In Books", icon: "📚", tone: "sage" },
  ]

  return (
    <section className="analytics-almanac-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Almanac"
        tapeVariant="sage"
        flower="sprig"
        className="analytics-almanac-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">Stats • Seasons • Milestones</p>
        <h1>Your reading almanac.</h1>
        <p>
          A keepsake of your reading life, built from finished dates, reading sessions,
          pages, minutes, goals, achievements, and the little patterns that make your year bookish.
        </p>
        <div className="analytics-almanac-stickers">
          <Sticker icon="📚" tone="linen">{totalBooks} books saved</Sticker>
          <Sticker icon="✅" tone="sage">{yearToDateCount} finished this year</Sticker>
          <Sticker icon="🔥" tone="rose">{readingStreakStats.currentStreak} day streak</Sticker>
        </div>
      </PaperCard>

      {saveMessage && (
        <PaperCard className="analytics-message-card paper-card sticky-note">
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
          <SectionDivider label="Almanac Snapshot" icon="🌿" />

          <div className="analytics-snapshot-grid">
            <StatCard icon="📚" value={totalBooks} label="Total books" />
            <StatCard icon="✅" value={readingAnalyticsStats.finishedThisYear} label="Finished this year" />
            <StatCard icon="📖" value={currentlyReadingReviews.length} label="Reading now" />
            <StatCard icon="🧠" value={brainChemistryCount} label="Brain Chemistry" />
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

          <SectionDivider label="Pressed Petals" icon="🌸" />

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
