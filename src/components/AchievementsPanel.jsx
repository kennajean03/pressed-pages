import ProgressBar from "./ProgressBar"
import AchievementCard from "./AchievementCard"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function AchievementsPanel({
  analyticsTab,
  achievementStats,
  downloadAchievementGraphicPng,
}) {
  const overallPercent = achievementStats.total
    ? Math.round((achievementStats.unlocked / achievementStats.total) * 100)
    : 0

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

      {achievementStats.groups.map((group) => (
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
    </ScrapbookPanel>  )
}

export default AchievementsPanel
