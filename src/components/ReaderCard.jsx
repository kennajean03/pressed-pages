export default function ReaderCard({
  reader,
  stats = {},
  followStats: cardFollowStats = null,
  isOwnReader = false,
  compact = false,
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
  const booksThisYear =
    stats?.booksThisYear ??
    reader?.statsData?.booksThisYear ??
    reader?.stats_data?.booksThisYear ??
    0

  return (
    <div className={compact ? "reader-card reader-card-compact" : "reader-card"}>
      <div className="reader-card-main">
        <div className="reader-card-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${displayName} avatar`} />
          ) : (
            <span>📚</span>
          )}
        </div>

        <div className="reader-card-info">
          <p className="reader-card-kicker">Reader Card</p>
          <h3>{displayName}</h3>
          <p>@{username}</p>
          {meta && <p>{meta}</p>}
          {!compact && <p>{bio}</p>}

          <div className="reader-card-flair">
            <span>{readingAesthetic}</span>
            <span>{readerType}</span>
            {!compact && <span>{favoriteSubgenre}</span>}
          </div>
        </div>
      </div>

      <div className="reader-card-footer">
        <span>
          <strong>{booksThisYear}</strong> books this year
        </span>

        {cardFollowStats && (
          <>
            <span>
              <strong>{cardFollowStats.followers || 0}</strong>{" "}
              follower{Number(cardFollowStats.followers || 0) === 1 ? "" : "s"}
            </span>
            <span>
              <strong>{cardFollowStats.following || 0}</strong> following
            </span>
          </>
        )}

        {onViewProfile && (
          <button type="button" onClick={onViewProfile}>
            View Profile
          </button>
        )}

        {actionLabel && onAction && (
          <button type="button" onClick={onAction} disabled={actionDisabled}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}