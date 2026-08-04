import { useState } from "react"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import CommunityNav from "./CommunityNav"
import PaperCard from "./scrapbook/PaperCard/PaperCard"

function isSocialNotification(notification) {
  return [
    "follow",
    "follower",
    "like",
    "reaction",
    "comment",
    "message",
  ].some((type) =>
    String(
      notification.type ||
        notification.notification_type ||
        ""
    )
      .toLowerCase()
      .includes(type)
  )
}

export default function NotificationsPage({
  user,
  notifications,
  notificationsLoading,
  notificationsMessage,
  loadNotifications,
  markNotificationRead,
  setStep,
}) {
  const [notificationFilter, setNotificationFilter] = useState("all")
  const unreadCount = notifications.filter(
    (notification) =>
      !notification.is_read
  ).length

  const socialCount = notifications.filter(isSocialNotification).length
  const visibleNotifications = notifications.filter((notification) => {
    if (notificationFilter === "unread") return !notification.is_read
    if (notificationFilter === "social") return isSocialNotification(notification)
    return true
  })

  const emptyNotificationCopy = {
    all: "When readers follow you, react, comment, save an update, or send a message request, it will show up here.",
    unread: "You have opened every notification in this pocket.",
    social: "Follows, likes, reactions, comments, saves, and message requests will appear here.",
  }

  return (
<section className="notifications-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="notifications.hero" className="notifications-hero">
  <p className="scrapbook-kicker">Community</p>
  <h1>Notifications</h1>
  <p>Open the little notes left by follows, reactions, comments, saves, and real community updates.</p>
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
              <div className="notifications-filters" aria-label="Filter notifications">
                {[
                  ["all", "All", notifications.length],
                  ["unread", "Unread", unreadCount],
                  ["social", "Social", socialCount],
                ].map(([filter, label, count]) => (
                  <button
                    type="button"
                    key={filter}
                    className={notificationFilter === filter ? "is-active" : ""}
                    aria-pressed={notificationFilter === filter}
                    onClick={() => setNotificationFilter(filter)}
                  >
                    {label} <span>{count}</span>
                  </button>
                ))}
              </div>

              {notificationsLoading && (
                <PaperCard className="community-state-paper community-state-paper--loading" role="status">
                  <strong>Opening your mail pocket…</strong>
                  <p>Collecting follows, reactions, comments, saves, and community updates.</p>
                </PaperCard>
              )}
              {notificationsMessage && (
                <PaperCard className="community-state-paper" role="status">
                  <p>{notificationsMessage}</p>
                </PaperCard>
              )}

              <div className="reader-card-list">
                {visibleNotifications.length === 0 && !notificationsLoading && (
                  <PaperCard className="community-state-paper notifications-empty">
                    <p className="scrapbook-kicker">Quiet mail pocket</p>
                    <h3>Nothing here yet.</h3>
                    <p>{emptyNotificationCopy[notificationFilter]}</p>
                  </PaperCard>
                )}

                {visibleNotifications.map((notification) => (
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
                Private messages live in their own request-gated folio and only create notifications Pressed Pages actually saves.
              </p>

              <button type="button" className="paper-button" onClick={() => setStep("messages")}>
                Open messages
              </button>

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
