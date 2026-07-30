import { useEffect, useRef, useState } from "react"
import "./AppShellHeader.css"

const ICON_PATHS = {
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h13v-9.5" />
      <path d="M9.5 20v-6h5v6" />
    </>
  ),
  library: (
    <>
      <path d="M4 5.5h4V20H4zM10 4h4v16h-4zM16 6l3.5-1 3.5 13.5-3.5 1z" />
    </>
  ),
  reading: (
    <>
      <path d="M3.5 5.5c3.8-.8 6.6.1 8.5 2.2v12c-1.9-2.1-4.7-3-8.5-2.2z" />
      <path d="M20.5 5.5c-3.8-.8-6.6.1-8.5 2.2v12c1.9-2.1 4.7-3 8.5-2.2z" />
    </>
  ),
  log: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
      <path d="m16.5 18.5 3-3" />
    </>
  ),
  tbr: (
    <>
      <path d="M4 7.5 12 4l8 3.5-8 3.5z" />
      <path d="M4 11.5 12 15l8-3.5M4 15.5 12 19l8-3.5" />
    </>
  ),
  wrap: (
    <>
      <path d="M5 5h14v15H5z" />
      <path d="M8 3v4M16 3v4M5 9h14" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  analytics: (
    <>
      <path d="M5 20v-6h3v6M10.5 20V9h3v11M16 20V4h3v16" />
      <path d="M3 20h18" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3z" />
      <path d="M10 20h4" />
    </>
  ),
}

function ShellIcon({ name }) {
  return (
    <svg
      aria-hidden="true"
      className="app-shell-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name] || ICON_PATHS.home}
    </svg>
  )
}

export default function AppShellHeader({
  step,
  user,
  profile,
  displayName,
  libraryFilter,
  analyticsTab,
  unreadCount = 0,
  setStep,
  setLibraryFilter,
  setAnalyticsTab,
  onSignOut,
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    if (!isProfileMenuOpen) return undefined

    function closeProfileMenu(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    function closeProfileMenuFromKeyboard(event) {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", closeProfileMenu)
    document.addEventListener("keydown", closeProfileMenuFromKeyboard)

    return () => {
      document.removeEventListener("pointerdown", closeProfileMenu)
      document.removeEventListener("keydown", closeProfileMenuFromKeyboard)
    }
  }, [isProfileMenuOpen])

  function chooseProfileDestination(targetStep) {
    setIsProfileMenuOpen(false)
    setStep(targetStep)
  }

  const primaryItems = [
    {
      id: "home",
      label: "Home",
      icon: "home",
      active: step === "home",
      action: () => setStep("home"),
    },
    {
      id: "library",
      label: "Library",
      icon: "library",
      active: step === "library" && libraryFilter !== "tbr",
      action: () => {
        setLibraryFilter("all")
        setStep("library")
      },
    },
    {
      id: "currently-reading",
      label: "Currently Reading",
      icon: "reading",
      active: step === "currentlyReading",
      action: () => setStep("currentlyReading"),
    },
    {
      id: "reading-log",
      label: "Reading Log",
      icon: "log",
      active: step === "readingLog",
      action: () => setStep("readingLog"),
    },
    {
      id: "tbr",
      label: "TBR",
      icon: "tbr",
      active: step === "library" && libraryFilter === "tbr",
      action: () => {
        setLibraryFilter("tbr")
        setStep("library")
      },
    },
    {
      id: "wrap-ups",
      label: "Wrap-Ups",
      icon: "wrap",
      active: step === "analytics" && analyticsTab === "wrapUps",
      action: () => {
        setAnalyticsTab("wrapUps")
        setStep("analytics")
      },
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "analytics",
      active: step === "analytics" && analyticsTab !== "wrapUps",
      action: () => {
        setAnalyticsTab("overview")
        setStep("analytics")
      },
    },
    {
      id: "profile",
      label: "Profile",
      icon: "profile",
      active: [
        "profile",
        "editProfile",
        "publicProfilePreview",
        "settings",
      ].includes(step),
      action: () => setStep("profile"),
    },
  ]

  const readerName =
    displayName ||
    user?.email?.split("@")[0] ||
    "Reader"

  const readerInitial =
    readerName.trim().charAt(0).toUpperCase() ||
    "R"

  const isProfileSectionActive = [
    "profile",
    "editProfile",
    "publicProfilePreview",
    "settings",
  ].includes(step)
  const isAddBookActive = [
    "addBook",
    "alreadyRead",
    "backlogImport",
    "readingSummary",
    "dnf",
    "dnfSummary",
    0,
    1,
    2,
    3,
    4,
    5,
  ].includes(step)

  return (
    <header className="app-shell-header">
      <div className="app-shell-header__inner">
        <button
          type="button"
          className="app-shell-brand"
          onClick={() => setStep("home")}
          aria-label="Pressed Pages home"
        >
          <span
            className="app-shell-brand__mark"
            aria-hidden="true"
          >
            <ShellIcon name="reading" />
          </span>

          <span className="app-shell-brand__copy">
            <strong>Pressed Pages</strong>
            <small>preserve the stories</small>
          </span>
        </button>

        {user ? (
          <>
            <nav
              className="app-shell-nav"
              aria-label="Primary navigation"
            >
              {primaryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "app-shell-nav__item",
                    item.active
                      ? "app-shell-nav__item--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={item.action}
                  aria-current={
                    item.active
                      ? "page"
                      : undefined
                  }
                >
                  <ShellIcon name={item.icon} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="app-shell-reader">
              <button
                type="button"
                className={[
                  "app-shell-add-book",
                  isAddBookActive ? "app-shell-add-book--active" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => setStep("addBook")}
                aria-current={isAddBookActive ? "page" : undefined}
                aria-label="Add Book"
              >
                <span aria-hidden="true">＋</span>
                <span className="app-shell-add-book__label">Add Book</span>
              </button>

              <button
                type="button"
                className={[
                  "app-shell-notifications",
                  step === "notifications"
                    ? "app-shell-notifications--active"
                    : "",
                ].filter(Boolean).join(" ")}
                onClick={() =>
                  setStep("notifications")
                }
                aria-current={
                  step === "notifications"
                    ? "page"
                    : undefined
                }
                aria-label={
                  unreadCount
                    ? `${unreadCount} unread notifications`
                    : "Notifications"
                }
              >
                <ShellIcon name="bell" />
                {unreadCount > 0 && (
                  <span className="app-shell-notifications__dot">
                    {unreadCount > 9
                      ? "9+"
                      : unreadCount}
                  </span>
                )}
              </button>

              <div
                className="app-shell-profile-menu"
                ref={profileMenuRef}
              >
                <button
                  type="button"
                  className={[
                    "app-shell-profile",
                    isProfileSectionActive
                      ? "app-shell-profile--active"
                      : "",
                    isProfileMenuOpen
                      ? "app-shell-profile--open"
                      : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() =>
                    setIsProfileMenuOpen((current) => !current)
                  }
                  aria-label="Reader menu"
                  aria-haspopup="menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt=""
                      className="app-shell-profile__avatar"
                    />
                  ) : (
                    <span className="app-shell-profile__fallback">
                      {readerInitial}
                    </span>
                  )}

                  <span className="app-shell-profile__name">
                    {readerName}
                  </span>
                  <span
                    className="app-shell-profile__chevron"
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="app-shell-profile-menu__popover"
                    role="menu"
                    aria-label="Reader menu"
                  >
                    <p className="app-shell-profile-menu__identity">
                      <strong>{readerName}</strong>
                      <span>{user.email}</span>
                    </p>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => chooseProfileDestination("profile")}
                    >
                      Reader Profile
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => chooseProfileDestination("editProfile")}
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() =>
                        chooseProfileDestination("publicProfilePreview")
                      }
                    >
                      Public Preview
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => chooseProfileDestination("settings")}
                    >
                      Settings & Privacy
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="app-shell-profile-menu__sign-out"
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        onSignOut()
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="app-shell-public-actions">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("welcome-preview")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
              }
            >
              Take a tour
            </button>

            <button
              type="button"
              className="app-shell-public-actions__primary"
              onClick={() =>
                document
                  .getElementById("welcome-account")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
              }
            >
              Start Your Journal
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
