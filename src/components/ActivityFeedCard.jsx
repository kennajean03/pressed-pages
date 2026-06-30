import ReaderCard from "./ReaderCard"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import Sticker from "./Scrapbook/Sticker/Sticker"

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
  const getMoodStickers = (eventData = {}) => {
    const stickers = []

    if (Number(eventData.rating || 0) >= 5) {
      stickers.push({ icon: "⭐", label: "Five Star", tone: "gold" })
    }

    if (Number(eventData.spice || 0) >= 4) {
      stickers.push({ icon: "🌶️", label: "Spicy", tone: "rose" })
    }

    if (eventData.isFavorite) {
      stickers.push({ icon: "🧠", label: "Brain Chemistry", tone: "sage" })
    }

    if (eventData.oneSentenceReview) {
      stickers.push({ icon: "✍️", label: "Review Note", tone: "linen" })
    }

    return stickers
  }

  return (
    <section className="activity-scrapbook-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Community Scrapbook"
        tapeVariant="sage"
        flower="sprig"
        className="activity-feed-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">Friends & Following</p>
        <h1>Activity Feed</h1>
        <p>
          A shared reading scrapbook of updates, reviews, favorites, and little
          bookish moments from you and the readers you follow.
        </p>
      </PaperCard>

      {activityFeedMessage && (
        <PaperCard className="activity-feed-message paper-card sticky-note">
          <p>{activityFeedMessage}</p>
        </PaperCard>
      )}

      <div className="activity-feed-actions activity-feed-toolbar">
        <button type="button" className="paper-button" onClick={() => loadActivityFeed(user)}>
          Refresh Feed
        </button>
        <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("profile")}>
          My Profile
        </button>
      </div>

      {!user && (
        <PaperCard
          variant="notebook"
          tape="Reader Notes"
          className="activity-feed-empty paper-card paper-card--notebook"
        >
          <p>Log in to see your personalized reading feed.</p>
        </PaperCard>
      )}

      {user && activityFeedLoading && (
        <PaperCard className="activity-feed-empty paper-card sticky-note">
          <p>Loading activity...</p>
        </PaperCard>
      )}

      {user && !activityFeedLoading && activityFeed.length === 0 && (
        <PaperCard
          variant="notebook"
          tape="Quiet Feed"
          tapeVariant="rose"
          className="activity-feed-empty paper-card paper-card--notebook"
        >
          <p>🌸 Your feed is quiet for now.</p>
          <p>Follow a public reader profile or save a book update to start filling this page.</p>
        </PaperCard>
      )}

      {user && !activityFeedLoading && activityFeed.length > 0 && (
        <>
          <SectionDivider label="Recent Reading Moments" icon="🌸" />

          <div className="activity-feed-list activity-feed-timeline">
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
              const moodStickers = getMoodStickers(eventData)

              return (
                <PaperCard
                  as="article"
                  key={event.id}
                  variant="journal"
                  tape={getActivityLabel(event.event_type)}
                  tapeVariant={event.isOwnActivity ? "gold" : "sage"}
                  flower={eventData.isFavorite ? "sprig" : undefined}
                  className="activity-feed-card activity-feed-memory-card paper-card paper-card--journal"
                >
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
                  </div>

                  <div className="activity-feed-body">
                    <p className="activity-feed-type">
                      <span aria-hidden="true">{getActivityIcon(event.event_type)}</span>
                      {getActivityLabel(event.event_type)}
                    </p>

                    <div className="activity-feed-book">
                      {eventData.coverUrl ? (
                        <img src={eventData.coverUrl} alt={`${eventData.title} cover`} />
                      ) : (
                        <div className="activity-feed-cover-placeholder" aria-hidden="true">
                          📖
                        </div>
                      )}

                      <div className="activity-feed-book-copy">
                        <h3>{eventData.title || "Untitled Book"}</h3>
                        <p>{eventData.author || "Unknown Author"}</p>

                        <div className="activity-feed-sticker-row">
                          {eventData.rating && (
                            <Sticker icon="⭐" tone="gold">
                              {eventData.rating}/5
                            </Sticker>
                          )}
                          {eventData.spice && (
                            <Sticker icon="🌶️" tone="rose">
                              {eventData.spice}/5
                            </Sticker>
                          )}
                          {eventData.obsession && (
                            <Sticker icon="❤️" tone="linen">
                              {eventData.obsession}/5
                            </Sticker>
                          )}
                          {moodStickers.map((sticker) => (
                            <Sticker key={`${event.id}-${sticker.label}`} icon={sticker.icon} tone={sticker.tone}>
                              {sticker.label}
                            </Sticker>
                          ))}
                        </div>

                        {eventData.oneSentenceReview && (
                          <blockquote className="activity-feed-quote">
                            “{eventData.oneSentenceReview}”
                          </blockquote>
                        )}
                      </div>
                    </div>

                    <div className="activity-reaction-row">
                      <button
                        type="button"
                        className={event.hasLiked ? "activity-like-button liked" : "activity-like-button"}
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
                </PaperCard>
              )
            })}
          </div>
        </>
      )}

      <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("home")}>
        Back Home
      </button>
    </section>
  )
}

export default ActivityFeedPage
