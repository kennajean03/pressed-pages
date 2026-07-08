import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

export default function NotificationsPage({
  user,
  notifications,
  notificationsLoading,
  notificationsMessage,
  loadNotifications,
  markNotificationRead,
  setStep,
}) {
  return (
<section className="notifications-page scrapbook-page scrapbook-section">
       <ScrapbookPanel recipe="notifications.hero" className="notifications-hero">
  <p className="scrapbook-kicker">Community</p>
  <h1>Notifications</h1>
  <p>See follows and likes from other readers.</p>
</ScrapbookPanel>

      {!user && <p>Log in to see notifications.</p>}

      {user && (
        <>
          <button type="button" className="paper-button paper-button--quiet" onClick={() => loadNotifications(user)}>
  Refresh Notifications
</button>

          {notificationsLoading && <p>Loading notifications...</p>}
          {notificationsMessage && <p>{notificationsMessage}</p>}

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
    opacity: notification.is_read ? 0.7 : 1,
  }}
>
                <p>{notification.message || "You have a new notification."}</p>
                <p>
                  {notification.created_at
                    ? new Date(notification.created_at).toLocaleString()
                    : ""}
                </p>

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