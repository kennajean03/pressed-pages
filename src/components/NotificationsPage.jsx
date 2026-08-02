import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import CommunityNav from "./CommunityNav"
import PaperCard from "./scrapbook/PaperCard/PaperCard"

export default function NotificationsPage({
  user,
  notifications,
  notificationsLoading,
  notificationsMessage,
  loadNotifications,
  markNotificationRead,
  setStep,
}) {
  const unreadCount = notifications.filter(
    (notification) =>
      !notification.is_read
  ).length

  const socialCount = notifications.filter(
    (notification) =>
      [
        "follow",
        "follower",
        "like",
        "reaction",
        "comment",
      ].some((type) =>
        String(
          notification.type ||
            notification.notification_type ||
            ""
        )
          .toLowerCase()
          .includes(type)
      )
  ).length

  return (
<section className="notifications-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="notifications.hero" className="notifications-hero">
  <p className="scrapbook-kicker">Community</p>
  <h1>Notifications</h1>
  <p>Open the little notes left by follows, likes, and real community updates.</p>
</ScrapbookPanel>

      <CommunityNav active="notifications" setStep={setStep} />

      {!user && (
        <PaperCard className="community-state-paper">
          <p>Log in to see notifications.</p>
        </PaperCard>
      )}

      {user && (
        <>
          <div className="notifications-toolbar">
            <div>
              <p className="scrapbook-kicker">
                Your reading world
              </p>
              <h2>Recent updates</h2>
            </div>

            <button
              type="button"
              className="paper-button paper-button--quiet"
              onClick={() => loadNotifications(user)}
            >
              Refresh Notifications
            </button>
          </div>

          <div className="notifications-workspace">
            <div className="notifications-stream">
              {notificationsLoading && (
                <PaperCard className="community-state-paper community-state-paper--loading" role="status">
                  <strong>Opening your mail pocket…</strong>
                  <p>Collecting follows, likes, and community updates.</p>
                </PaperCard>
              )}
              {notificationsMessage && (
                <PaperCard className="community-state-paper" role="status">
                  <p>{notificationsMessage}</p>
                </PaperCard>
              )}

              <div className="reader-card-list">
                {notifications.length === 0 && !notificationsLoading && (
                  <div className="score-card">
                    <p>🌸 No notifications yet.</p>
                    <p>When readers follow you or like your updates, they’ll show up here.</p>
                  </div>
                )}

                {notifications.map((notification) => (
                  <ScrapbookPanel
                    recipe={notification.is_read ? "notifications.read" : "notifications.unread"}
                    className="notification-card"
                    key={notification.id}
                    style={{
                      opacity: notification.is_read ? 0.72 : 1,
                    }}
                  >
                    <span
                      className="notification-card__status"
                      aria-hidden="true"
                    />

                    <div className="notification-card__copy">
                      <p>{notification.message || "You have a new notification."}</p>
                      <time>
                        {notification.created_at
                          ? new Date(notification.created_at).toLocaleString()
                          : ""}
                      </time>
                    </div>

                    {!notification.is_read && (
                      <button
                        type="button"
                        className="paper-button paper-button--quiet"
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        Mark Read
                      </button>
                    )}
                  </ScrapbookPanel>
                ))}
              </div>
            </div>

            <ScrapbookPanel
              recipe="notifications.summary"
              className="notifications-summary"
            >
              <p className="scrapbook-kicker">
                Notification summary
              </p>
              <h2>Your little updates</h2>

              <dl>
                <div>
                  <dt>All notifications</dt>
                  <dd>{notifications.length}</dd>
                </div>
                <div>
                  <dt>Unread</dt>
                  <dd>{unreadCount}</dd>
                </div>
                <div>
                  <dt>Social</dt>
                  <dd>{socialCount}</dd>
                </div>
              </dl>

              <p className="notifications-summary__note">
                This pocket contains only events Pressed Pages actually saves.
                Private messages and comment threads are not available here yet.
              </p>

              <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("findReaders")}>
                Find readers
              </button>
            </ScrapbookPanel>
          </div>

          <div className="community-back-home-wrap">
  <button type="button" className="paper-button" onClick={() => setStep("home")}>
    Back Home
  </button>
</div>
        </>
      )}
    </section>
  )
}
