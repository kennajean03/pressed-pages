import ProgressBar from "./ProgressBar"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function GoalKeepsake({ icon, title, current, target, percent, helper, children }) {
  return (
    <PaperCard
      as="article"
      variant="journal"
      tape={title}
      tapeVariant="sage"
      className="analytics-goal-card paper-card paper-card--journal"
    >
      <div className="analytics-goal-card__header">
        <span aria-hidden="true">{icon}</span>
        <div>
          <strong>{current} / {target || 0}</strong>
          <p>{helper}</p>
        </div>
      </div>

      <ProgressBar percent={percent} />

      {children}
    </PaperCard>
  )
}

function ReadingGoalsPanel({
  analyticsTab,
  readingGoals,
  readingGoalStats,
  updateReadingGoal,
}) {
  return (
<ScrapbookPanel
  scrapbookId="analytics-reading-goals"
  className={`analytics-almanac-panel ${
    analyticsTab === "goals" ? "" : "analytics-panel-hidden"
  }`}
>
        <SectionDivider label={`Reading Goals ${readingGoalStats.currentYearKey}`} icon="🎯" />

      <PaperCard
        variant="deckled"
        tape="Goal Garden"
        tapeVariant="sage"
        flower="sprig"
        className="analytics-goals-intro paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">Intentions for the year</p>
        <h2>Your reading goals.</h2>
        <p>
          Track the milestones you want to grow this year — books, pages,
          reading days, and minutes spent inside stories.
        </p>
        <div className="analytics-goal-sticker-row">
          <Sticker icon="📚" tone="linen">{readingGoalStats.booksFinishedThisYear} books</Sticker>
          <Sticker icon="📄" tone="sage">{readingGoalStats.pagesThisYear} pages</Sticker>
          <Sticker icon="🌸" tone="rose">{readingGoalStats.readingDaysThisYear} reading days</Sticker>
          <Sticker icon="☕" tone="gold">{readingGoalStats.hoursThisYear} hours</Sticker>
        </div>
      </PaperCard>

      <div className="analytics-goals-summary-grid">
        <StatCard icon="📚" value={`${readingGoalStats.booksPercent}%`} label="Books goal" />
        <StatCard icon="📄" value={`${readingGoalStats.pagesPercent}%`} label="Pages goal" />
        <StatCard icon="🌸" value={`${readingGoalStats.readingDaysPercent}%`} label="Reading days" />
        <StatCard icon="☕" value={`${readingGoalStats.minutesPercent}%`} label="Minutes goal" />
      </div>

      <div className="analytics-goal-grid">
        <GoalKeepsake
          icon="📚"
          title="Books Goal"
          current={readingGoalStats.booksFinishedThisYear}
          target={readingGoals.books}
          percent={readingGoalStats.booksPercent}
          helper="books finished"
        >
          <label className="analytics-goal-input-label">
            Set books goal
            <input
              type="number"
              min="0"
              value={readingGoals.books}
              onChange={(e) => updateReadingGoal("books", e.target.value)}
              placeholder="Example: 75"
            />
          </label>
        </GoalKeepsake>

        <GoalKeepsake
          icon="📄"
          title="Pages Goal"
          current={readingGoalStats.pagesThisYear}
          target={readingGoals.pages}
          percent={readingGoalStats.pagesPercent}
          helper="pages read"
        >
          <label className="analytics-goal-input-label">
            Set pages goal
            <input
              type="number"
              min="0"
              value={readingGoals.pages}
              onChange={(e) => updateReadingGoal("pages", e.target.value)}
              placeholder="Example: 20000"
            />
          </label>
        </GoalKeepsake>

        <GoalKeepsake
          icon="🌸"
          title="Reading Days Goal"
          current={readingGoalStats.readingDaysThisYear}
          target={readingGoals.readingDays}
          percent={readingGoalStats.readingDaysPercent}
          helper="days with reading logged"
        >
          <label className="analytics-goal-input-label">
            Set reading days goal
            <input
              type="number"
              min="0"
              value={readingGoals.readingDays}
              onChange={(e) => updateReadingGoal("readingDays", e.target.value)}
              placeholder="Example: 200"
            />
          </label>
        </GoalKeepsake>

        <GoalKeepsake
          icon="☕"
          title="Minutes Goal"
          current={readingGoalStats.minutesThisYear}
          target={readingGoals.minutes}
          percent={readingGoalStats.minutesPercent}
          helper={`minutes read (${readingGoalStats.hoursThisYear} hours)`}
        >
          <label className="analytics-goal-input-label">
            Set minutes goal
            <input
              type="number"
              min="0"
              value={readingGoals.minutes}
              onChange={(e) => updateReadingGoal("minutes", e.target.value)}
              placeholder="Example: 6000"
            />
          </label>
        </GoalKeepsake>
      </div>
</ScrapbookPanel>  )
}

export default ReadingGoalsPanel
