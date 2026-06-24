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
    <section>
      <p>Community</p>
      <h1>Notifications</h1>
      <p>See follows and likes from other readers.</p>

      {!user && <p>Log in to see notifications.</p>}

      {user && (
        <>
          <button type="button" onClick={() => loadNotifications(user)}>
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
              <div
                className="score-card"
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
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" onClick={() => setStep("home")}>
            Back Home
          </button>
        </>
      )}
    </section>
  )
}