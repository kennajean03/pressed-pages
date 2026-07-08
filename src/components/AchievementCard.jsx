import ProgressBar from "./ProgressBar"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import Sticker from "./scrapbook/Sticker/Sticker"

function AchievementCard({ achievement, groupTitle, downloadAchievementGraphicPng }) {
  const current = Number(achievement.current || 0)
  const unlocked = current >= achievement.target
  const progressPercent = achievement.target
    ? Math.min(100, Math.round((current / achievement.target) * 100))
    : 0

  return (
    <PaperCard
      as="article"
      variant="journal"
      tape={unlocked ? "Unlocked" : "In Progress"}
      tapeVariant={unlocked ? "gold" : "linen"}
      flower={unlocked ? "blossom" : ""}
      className={`achievement-sticker-card paper-card paper-card--journal ${unlocked ? "is-unlocked" : "is-locked"}`}
    >
      <div className="achievement-sticker-card__icon" aria-hidden="true">
        {unlocked ? achievement.icon : "🔒"}
      </div>

      <h4>{achievement.name}</h4>
      <p>{achievement.description}</p>

      <div className="achievement-sticker-card__meta">
        <Sticker icon={unlocked ? "✅" : "📍"} tone={unlocked ? "sage" : "linen"} size="tiny">
          {unlocked ? "Unlocked" : `${Math.min(current, achievement.target)} / ${achievement.target}`}
        </Sticker>
      </div>

      <ProgressBar percent={progressPercent} />

      {unlocked && achievement.id !== "author-era-placeholder" && (
        <button
          type="button"
          className="paper-button achievement-download-button"
          onClick={() => downloadAchievementGraphicPng(achievement, groupTitle)}
        >
          🎨 Download Badge Graphic
        </button>
      )}
    </PaperCard>
  )
}

export default AchievementCard
