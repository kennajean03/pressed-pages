import ReaderCard from "./ReaderCard"

export default function ActivityFeedCard({
  event,
  reader,
  readerName,
  readerUsername,
  avatarUrl,
  profileData,
  eventData,
  formatDate,
  getActivityIcon,
  getActivityLabel,
  toggleActivityLike,
}) {
  return (
    <article className="activity-feed-card">
      <ReaderCard
        reader={{
          ...reader,
          displayName: event.isOwnActivity ? "You" : readerName,
          username: readerUsername,
          avatarUrl,
          profileData,
        }}
        stats={reader?.stats_data || reader?.statsData || {}}
        isOwnReader={event.isOwnActivity}
        compact
        meta={formatDate(event.created_at)}
      />

      <div className="activity-feed-body">
        <p className="activity-feed-type">
          {getActivityIcon(event.event_type)} {getActivityLabel(event.event_type)}
        </p>

        <div className="activity-feed-book">
          {eventData.coverUrl && (
            <img src={eventData.coverUrl} alt={`${eventData.title} cover`} />
          )}

          <div>
            <h3>{eventData.title || "Untitled Book"}</h3>
            <p>{eventData.author || "Unknown Author"}</p>
            <p>
              {eventData.rating ? `⭐ ${eventData.rating}/5` : ""}
              {eventData.spice ? ` • 🌶️ ${eventData.spice}/5` : ""}
              {eventData.obsession ? ` • ❤️ ${eventData.obsession}/5` : ""}
              {eventData.isFavorite ? " • 🧠 Brain chemistry" : ""}
            </p>

            {eventData.oneSentenceReview && (
              <p>“{eventData.oneSentenceReview}”</p>
            )}
          </div>
        </div>

        <div className="activity-reaction-row">
          <button
            type="button"
            className={
              event.hasLiked
                ? "activity-like-button liked"
                : "activity-like-button"
            }
            onClick={() => toggleActivityLike(event)}
          >
            {event.hasLiked ? "💗 Liked" : "🤍 Like"}
          </button>

          <span>
            {Number(event.likeCount || 0)}{" "}
            {Number(event.likeCount || 0) === 1 ? "like" : "likes"}
          </span>
        </div>
      </div>
    </article>
  )
}