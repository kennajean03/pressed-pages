import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import Sticker from "./Scrapbook/Sticker/Sticker"

export default function ReaderCard({
  reader,
  stats = {},
  followStats: cardFollowStats = null,
  isOwnReader = false,
  compact = false,
  discovery = false,
  meta = "",
  actionLabel = "",
  onAction = null,
  actionDisabled = false,
  onViewProfile = null,
}) {
  const profileData = reader?.profileData || reader?.profile_data || {}
  const displayName =
    reader?.displayName ||
    reader?.display_name ||
    profileData.displayName ||
    (isOwnReader ? "You" : "Pressed Pages Reader")
  const username = reader?.username || profileData.username || "reader"
  const avatarUrl =
    profileData.avatarUrl ||
    reader?.avatarUrl ||
    reader?.avatar_url ||
    ""
  const bio =
    profileData.bio ||
    reader?.bio ||
    (compact
      ? "Romanticizing their reading life."
      : "A Pressed Pages reader romanticizing their reading life.")
  const readingAesthetic =
    profileData.readingAesthetic ||
    reader?.readingAesthetic ||
    "🌸 Scrapbook Reader"
  const readerType =
    profileData.readerType ||
    reader?.readerType ||
    "📚 TBR Collector"
  const favoriteSubgenre =
    profileData.favoriteSubgenre ||
    profileData.favoriteGenre ||
    reader?.favoriteSubgenre ||
    reader?.favoriteGenre ||
    "🌾 Romance Reader"
  const currentRead =
    stats?.currentRead ||
    stats?.currentlyReading ||
    reader?.currentRead ||
    reader?.currentlyReading ||
    reader?.statsData?.currentRead ||
    reader?.stats_data?.currentRead ||
    null
  const currentReadTitle =
    typeof currentRead === "string"
      ? currentRead
      : currentRead?.title || currentRead?.bookTitle || currentRead?.bookInfo?.title || ""
  const booksThisYear =
    stats?.booksThisYear ??
    reader?.statsData?.booksThisYear ??
    reader?.stats_data?.booksThisYear ??
    0
  const currentStreak =
    stats?.currentStreak ??
    stats?.readingStreak ??
    reader?.statsData?.currentStreak ??
    reader?.stats_data?.currentStreak ??
    0
  const averageRating =
    stats?.averageRating ??
    stats?.avgRating ??
    reader?.statsData?.averageRating ??
    reader?.stats_data?.averageRating ??
    null

  return (
    <PaperCard
      as="div"
      variant={compact ? "wide" : "journal"}
      tape={compact ? "" : "Reader Card"}
      tapeVariant="linen"
      className={[
        "reader-card",
        compact ? "reader-card-compact" : "",
        discovery ? "reader-card-discovery" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="reader-card-main">
        <div className="reader-card-avatar polaroid-frame">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${displayName} avatar`} />
          ) : (
            <span>📚</span>
          )}
        </div>

        <div className="reader-card-info">
          <p className="reader-card-kicker">{discovery ? "Reader Postcard" : compact ? "Reader Note" : "Reader Card"}</p>
          <h3>{displayName}</h3>
          <p>@{username}</p>
          {meta && <p className="reader-card-meta">{meta}</p>}
          {(!compact || discovery) && <p>{bio}</p>}

          <div className="reader-card-flair">
            <Sticker tone="sage">{readingAesthetic}</Sticker>
            <Sticker tone="linen">{readerType}</Sticker>
            {(!compact || discovery) && <Sticker tone="rose">{favoriteSubgenre}</Sticker>}
          </div>
        </div>
      </div>

      {discovery && (
        <div className="reader-card-discovery-note">
          <strong>Currently Reading</strong>
          <span>{currentReadTitle || "A mystery from their shelves"}</span>
        </div>
      )}

      <div className="reader-card-footer">
        <Sticker icon="📚" tone="gold">
          <strong>{booksThisYear}</strong> books this year
        </Sticker>

        {discovery && (
          <>
            <Sticker icon="🔥" tone="rose">
              <strong>{currentStreak}</strong> day streak
            </Sticker>
            {averageRating !== null && averageRating !== undefined && (
              <Sticker icon="⭐" tone="sage">
                <strong>{Number(averageRating).toFixed(1)}</strong> avg
              </Sticker>
            )}
          </>
        )}

        {cardFollowStats && (
          <>
            <Sticker icon="🌸" tone="sage">
              <strong>{cardFollowStats.followers || 0}</strong>{" "}
              follower{Number(cardFollowStats.followers || 0) === 1 ? "" : "s"}
            </Sticker>
            <Sticker icon="💌" tone="linen">
              <strong>{cardFollowStats.following || 0}</strong> following
            </Sticker>
          </>
        )}

        {onViewProfile && (
          <button type="button" className="paper-button paper-button--quiet" onClick={onViewProfile}>
            View Profile
          </button>
        )}

        {actionLabel && onAction && (
          <button
            type="button"
            className="paper-button"
            onClick={onAction}
            disabled={actionDisabled}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </PaperCard>
  )
}
