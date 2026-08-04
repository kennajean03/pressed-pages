import ProgressBar from "./ProgressBar"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import FlagshipCorner from "./scrapbook/FlagshipCorner/FlagshipCorner"
import ArchivalDetail from "./scrapbook/ArchivalDetail/ArchivalDetail"

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
  readingStreakStats,
  achievementStats,
  readingAnalyticsStats,
}) {
  const booksGoal = Number(readingGoals.books || 0)
  const booksRemaining = Math.max(
    0,
    booksGoal - Number(readingGoalStats.booksFinishedThisYear || 0)
  )
  const paceDifference =
    Number(readingGoalStats.booksPercent || 0) -
    Number(readingAnalyticsStats.yearProgressPercent || 0)
  const nextAchievement = achievementStats.nextAchievement
  const miniGoals = [
    {
      label: "Read this month",
      current: readingAnalyticsStats.finishedThisMonth || 0,
      target: Math.max(1, Math.ceil(booksGoal / 12) || 1),
      icon: "▣",
    },
    {
      label: "Keep the streak",
      current: readingStreakStats.currentStreak || 0,
      target: Math.max(7, Math.ceil((readingStreakStats.currentStreak || 0) / 7) * 7),
      icon: "♨",
    },
    {
      label: "Next milestone",
      current: nextAchievement?.current || 0,
      target: nextAchievement?.target || 1,
      icon: nextAchievement?.icon || "☆",
    },
  ]
  return (
<ScrapbookPanel
  scrapbookId="analytics-reading-goals"
  className={`analytics-almanac-panel ${
    analyticsTab === "goals" ? "" : "analytics-panel-hidden"
  }`}
>
      <FlagshipCorner
        assetId="paper-scrap-torn-vintage-botanical-corner-01"
        className="phase17c-route-accent phase17c-route-accent--goals"
        width="88px"
      />
        <SectionDivider label={`Reading Goals ${readingGoalStats.currentYearKey}`} icon="◎" />

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
        <ArchivalDetail folio="GOAL · 04" label="annual intentions" note="A plan made gently, one page at a time." mark="◎" tone="sage" />
        <div className="analytics-goal-sticker-row">
          <Sticker icon="▥" tone="linen">{readingGoalStats.booksFinishedThisYear} books</Sticker>
          <Sticker icon="▤" tone="sage">{readingGoalStats.pagesThisYear} pages</Sticker>
          <Sticker icon="✿" tone="rose">{readingGoalStats.readingDaysThisYear} reading days</Sticker>
          <Sticker icon="◷" tone="gold">{readingGoalStats.hoursThisYear} hours</Sticker>
        </div>
      </PaperCard>

      <div className="analytics-goals-summary-grid">
        <StatCard icon="▥" value={`${readingGoalStats.booksPercent}%`} label="Books goal" />
        <StatCard icon="▤" value={`${readingGoalStats.pagesPercent}%`} label="Pages goal" />
        <StatCard icon="✿" value={`${readingGoalStats.readingDaysPercent}%`} label="Reading days" />
        <StatCard icon="◷" value={`${readingGoalStats.minutesPercent}%`} label="Minutes goal" />
      </div>

      <div className="analytics-goal-pace-grid">
        <PaperCard variant="notebook" className="analytics-goal-pace-card">
          <p className="scrapbook-kicker">Annual pace</p>
          <h3>
            {paceDifference >= 0 ? "You are ahead of pace" : "A gentle catch-up"}
          </h3>
          <p>
            The year is {readingAnalyticsStats.yearProgressPercent || 0}% complete
            and your books goal is {readingGoalStats.booksPercent || 0}% complete.
          </p>
          <ProgressBar percent={readingGoalStats.booksPercent || 0} />
          <div>
            <strong>{booksRemaining}</strong>
            <span>books remaining</span>
            <strong>{readingAnalyticsStats.projectedBooks || 0}</strong>
            <span>projected finish</span>
          </div>
        </PaperCard>

        <PaperCard variant="journal" className="analytics-streak-goal-card">
          <p className="scrapbook-kicker">Reading streak</p>
          <h3>{readingStreakStats.currentStreak || 0} days and growing</h3>
          <p>
            Your longest preserved streak is{" "}
            <strong>{readingStreakStats.longestStreak || 0} days</strong>.
          </p>
          <ProgressBar
            percent={Math.min(
              100,
              Math.round(((readingStreakStats.currentStreak || 0) / 100) * 100)
            )}
          />
          <small>100-day milestone</small>
        </PaperCard>
      </div>

      <SectionDivider label="Mini Goals" icon="✦" />
      <div className="analytics-mini-goals">
        {miniGoals.map((goal) => {
          const percent = goal.target
            ? Math.min(100, Math.round((goal.current / goal.target) * 100))
            : 0

          return (
            <article key={goal.label}>
              <span aria-hidden="true">{goal.icon}</span>
              <div>
                <strong>{goal.label}</strong>
                <p>
                  {Number(goal.current || 0)} / {goal.target}
                </p>
              </div>
              <ProgressBar percent={percent} />
            </article>
          )
        })}
      </div>

      <div className="analytics-goal-grid">
        <GoalKeepsake
          icon="▥"
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
          icon="▤"
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
          icon="✿"
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
          icon="◷"
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
