import ReaderCard from "./ReaderCard"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function ActivityFeedPage({
  user,
  activityFeedMessage,
  activityFeedLoading,
  activityFeed,
  loadActivityFeed,
  setStep,
  formatDate,
  getActivityIcon,
  getActivityLabel,
  toggleActivityLike,
}) {
  return (
    <section className="activity-scrapbook-page scrapbook-page scrapbook-section">      
    <ScrapbookPanel recipe="activity.hero" className="activity-feed-hero">
  <p className="scrapbook-kicker">Friends & Following</p>
  <h1>Activity Feed</h1>
  <p>See recent reading updates from you and the readers you follow.</p>
</ScrapbookPanel>

      {activityFeedMessage && <p>{activityFeedMessage}</p>}

      <div className="activity-feed-actions activity-feed-toolbar">
        <button type="button" className="paper-button paper-button--quiet" onClick={() => loadActivityFeed(user)}>
  Refresh Feed
</button>
<button type="button" className="paper-button" onClick={() => setStep("profile")}>
  My Profile
</button>
      </div>

      {!user && (
        <div className="score-card">
          <p>Log in to see your personalized reading feed.</p>
        </div>
      )}

      {user && activityFeedLoading && <p>Loading activity...</p>}

      {user && !activityFeedLoading && activityFeed.length === 0 && (
        <div className="score-card">
          <p>🌸 Your feed is quiet for now.</p>
          <p>Follow a public reader profile or save a book update to start filling this page.</p>
        </div>
      )}

      {user && !activityFeedLoading && activityFeed.length > 0 && (
<div className="activity-feed-timeline">
            {activityFeed.map((event) => {
            const eventData = event.event_data || {}
            const reader = event.readerProfile || {}
            const profileData = reader.profile_data || {}
            const readerName =
              profileData.displayName ||
              reader.display_name ||
              reader.username ||
              (event.isOwnActivity ? "You" : "Pressed Pages Reader")
            const readerUsername = reader.username || "reader"
            const avatarUrl = profileData.avatarUrl || reader.avatar_url || ""

            return (
              <ScrapbookPanel key={event.id} as="article" recipe="activity.memory" className="activity-feed-memory-card">
                <div className="activity-feed-reader-wrap">
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

                      {eventData.oneSentenceReview && <p>“{eventData.oneSentenceReview}”</p>}
                    </div>
                  </div>

                  <div className="activity-reaction-row">
                    <button
                      type="button"
                      className={event.hasLiked ? "paper-button activity-like-button liked" : "paper-button activity-like-button"}
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
                </div>
              </ScrapbookPanel>
            )
          })}
        </div>
      )}

      <div className="activity-back-home-wrap">
  <button type="button" className="paper-button" onClick={() => setStep("home")}>
    Back Home
  </button>
</div>
    </section>
  )
}

export default ActivityFeedPage