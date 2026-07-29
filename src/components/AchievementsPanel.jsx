import { useState } from "react"
import ProgressBar from "./ProgressBar"
import AchievementCard from "./AchievementCard"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function AchievementsPanel({
  analyticsTab,
  achievementStats,
  downloadAchievementGraphicPng,
}) {
  const [achievementView, setAchievementView] = useState("all")
  const overallPercent = achievementStats.total
    ? Math.round((achievementStats.unlocked / achievementStats.total) * 100)
    : 0
  const visibleGroups = achievementStats.groups
    .map((group) => ({
      ...group,
      achievements: group.achievements.filter((achievement) => {
        const unlocked =
          Number(achievement.current || 0) >= Number(achievement.target || 0)
        if (achievementView === "unlocked") return unlocked
        if (achievementView === "inProgress") return !unlocked
        return true
      }),
    }))
    .filter((group) => group.achievements.length)

  return (
    <ScrapbookPanel
      scrapbookId="analytics-achievements"
      className={`analytics-almanac-panel ${analyticsTab === "achievements" ? "" : "analytics-panel-hidden"}`}
    >
      <SectionDivider label="Achievement Sticker Book" icon="🏆" />

      <PaperCard
        variant="deckled"
        tape="Sticker Collection"
        tapeVariant="gold"
        flower="blossom"
        className="achievement-collection-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">Milestones worth keeping</p>
        <h2>{achievementStats.unlocked} / {achievementStats.total} unlocked</h2>
        <p>
          Every badge is a little proof of the reader you are becoming — pages,
          streaks, romance eras, favorite authors, and story milestones.
        </p>

        <div className="achievement-progress-wrap">
          <ProgressBar percent={overallPercent} />
          <Sticker icon="✨" tone="gold">{overallPercent}% complete</Sticker>
        </div>

        {achievementStats.nextAchievement && (
          <PaperCard
            variant="notebook"
            tape="Next Sticker"
            tapeVariant="sage"
            className="achievement-next-card paper-card paper-card--notebook"
          >
            <p>
              {achievementStats.nextAchievement.icon} <strong>{achievementStats.nextAchievement.name}</strong>
            </p>
            <p>
              {Math.min(
                Number(achievementStats.nextAchievement.current || 0),
                achievementStats.nextAchievement.target
              )} / {achievementStats.nextAchievement.target}
            </p>
          </PaperCard>
        )}
      </PaperCard>

      <div
        className="achievement-filter-tabs"
        role="group"
        aria-label="Filter achievements"
      >
        {[
          ["all", `All ${achievementStats.total}`],
          ["unlocked", `Unlocked ${achievementStats.unlocked}`],
          [
            "inProgress",
            `In progress ${achievementStats.total - achievementStats.unlocked}`,
          ],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={achievementView === value ? "is-active" : ""}
            aria-pressed={achievementView === value}
            onClick={() => setAchievementView(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleGroups.map((group) => (
        <section key={group.title} className="achievement-group-section">
          <SectionDivider label={group.title} icon="✦" />

          <div className="achievement-sticker-grid">
            {group.achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                groupTitle={group.title}
                downloadAchievementGraphicPng={downloadAchievementGraphicPng}
              />
            ))}
          </div>
        </section>
      ))}

      {!visibleGroups.length && (
        <PaperCard className="achievement-filter-empty">
          <p>No achievements match this view yet.</p>
        </PaperCard>
      )}
    </ScrapbookPanel>  )
}

export default AchievementsPanel
