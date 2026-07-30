import { useState } from "react"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import "./ProfileSettingsPage.css"

const SETTINGS_SECTIONS = [
  ["account", "Account"],
  ["profile", "Profile"],
  ["privacy", "Privacy"],
  ["notifications", "Notifications"],
  ["goals", "Goals"],
  ["connections", "Connections"],
  ["appearance", "Appearance"],
  ["data", "Data"],
]

function ProfileSettingsPage({
  user,
  profile,
  profileSavedMessage,
  followStats,
  readingGoals,
  updateProfile,
  updateReadingGoal,
  saveProfile,
  downloadAccountData,
  requestAccountDeletion,
  setStep,
}) {
  const [activeSection, setActiveSection] = useState("account")
  const [deletionOpen, setDeletionOpen] = useState(false)
  const [deletionConfirmation, setDeletionConfirmation] = useState("")

  const notifications = {
    follows: true,
    buddyReads: true,
    challenges: true,
    readingReminders: false,
    ...(profile.notificationPreferences || {}),
  }
  const appearance = {
    motion: "full",
    density: "cozy",
    ...(profile.appearancePreferences || {}),
  }

  function updateNotification(key, value) {
    updateProfile("notificationPreferences", {
      ...notifications,
      [key]: value,
    })
  }

  function updateAppearance(key, value) {
    updateProfile("appearancePreferences", {
      ...appearance,
      [key]: value,
    })
  }

  return (
    <section className="profile-settings-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="profile.hero" className="profile-settings-hero">
        <p className="scrapbook-kicker">Reader Desk</p>
        <h1>Settings & privacy</h1>
        <p>
          Keep your account, public scrapbook, reading goals, and app
          preferences together in one carefully labeled folio.
        </p>
      </ScrapbookPanel>

      {profileSavedMessage && (
        <PaperCard className="profile-settings-message" role="status">
          <p>{profileSavedMessage}</p>
        </PaperCard>
      )}

      <div className="profile-settings-layout">
        <nav className="profile-settings-index" aria-label="Settings sections">
          <p className="scrapbook-kicker">Folio Index</p>
          {SETTINGS_SECTIONS.map(([key, label]) => (
            <button
              type="button"
              key={key}
              className={activeSection === key ? "active" : ""}
              aria-pressed={activeSection === key}
              onClick={() => setActiveSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <PaperCard
          as="div"
          variant="notebook"
          tape={SETTINGS_SECTIONS.find(([key]) => key === activeSection)?.[1]}
          tapeVariant="sage"
          className="profile-settings-sheet"
        >
          {activeSection === "account" && (
            <section>
              <h2>Account</h2>
              <p>Your sign-in identity and account shortcuts.</p>
              <label>
                Email
                <input type="email" value={user?.email || ""} readOnly />
              </label>
              <div className="profile-settings-action-row">
                <button type="button" onClick={() => setStep("editProfile")}>
                  Edit reader details
                </button>
              </div>
            </section>
          )}

          {activeSection === "profile" && (
            <section>
              <h2>Profile</h2>
              <p>Choose how your name and reader introduction appear.</p>
              <label>
                Display name
                <input
                  value={profile.displayName || ""}
                  onChange={(event) => updateProfile("displayName", event.target.value)}
                />
              </label>
              <label>
                Username
                <input
                  value={profile.username || ""}
                  onChange={(event) => updateProfile("username", event.target.value)}
                />
              </label>
              <label>
                Reader biography
                <textarea
                  value={profile.bio || ""}
                  onChange={(event) => updateProfile("bio", event.target.value)}
                />
              </label>
              <button type="button" onClick={saveProfile}>Save profile settings</button>
            </section>
          )}

          {activeSection === "privacy" && (
            <section>
              <h2>Privacy</h2>
              <p>
                A private profile is visible only to you. Public profiles expose
                the reader-safe card, statistics, and shelves.
              </p>
              <label className="profile-settings-switch">
                <input
                  type="checkbox"
                  checked={Boolean(profile.isPublicProfile)}
                  onChange={(event) => updateProfile("isPublicProfile", event.target.checked)}
                />
                <span>Make my reader profile public</span>
              </label>
              <div className="profile-settings-privacy-note">
                <Sticker icon={profile.isPublicProfile ? "🌎" : "🔒"} tone="sage">
                  {profile.isPublicProfile ? "Public" : "Private"}
                </Sticker>
                <p>
                  Reading notes, private uploads, account email, and editor
                  drafts are never shown on the public profile.
                </p>
              </div>
              <button type="button" onClick={saveProfile}>Save privacy setting</button>
            </section>
          )}

          {activeSection === "notifications" && (
            <section>
              <h2>Notifications</h2>
              <p>Choose which moments should leave a note in your inbox.</p>
              {[
                ["follows", "New followers"],
                ["buddyReads", "Buddy read invitations and updates"],
                ["challenges", "Community challenge updates"],
                ["readingReminders", "Reading reminders"],
              ].map(([key, label]) => (
                <label className="profile-settings-switch" key={key}>
                  <input
                    type="checkbox"
                    checked={Boolean(notifications[key])}
                    onChange={(event) => updateNotification(key, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button type="button" onClick={saveProfile}>Save notification settings</button>
            </section>
          )}

          {activeSection === "goals" && (
            <section>
              <h2>Goals</h2>
              <p>Adjust the annual targets used throughout your almanac.</p>
              {[
                ["books", "Books"],
                ["pages", "Pages"],
                ["readingDays", "Reading days"],
                ["minutes", "Reading minutes"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    type="number"
                    min="0"
                    value={readingGoals[key] || ""}
                    onChange={(event) => updateReadingGoal(key, event.target.value)}
                  />
                </label>
              ))}
            </section>
          )}

          {activeSection === "connections" && (
            <section>
              <h2>Connections</h2>
              <p>Review the readers attached to your scrapbook.</p>
              <div className="profile-settings-connection-grid">
                <button type="button" onClick={() => setStep("followers")}>
                  <strong>{followStats.followers}</strong>
                  Followers
                </button>
                <button type="button" onClick={() => setStep("following")}>
                  <strong>{followStats.following}</strong>
                  Following
                </button>
                <button type="button" onClick={() => setStep("findReaders")}>
                  Find readers
                </button>
              </div>
            </section>
          )}

          {activeSection === "appearance" && (
            <section>
              <h2>Appearance</h2>
              <p>Keep the scrapbook comfortable for the way you read.</p>
              <label>
                Motion
                <select
                  value={appearance.motion}
                  onChange={(event) => updateAppearance("motion", event.target.value)}
                >
                  <option value="full">Full paper movement</option>
                  <option value="reduced">Reduced movement</option>
                </select>
              </label>
              <label>
                Layout density
                <select
                  value={appearance.density}
                  onChange={(event) => updateAppearance("density", event.target.value)}
                >
                  <option value="cozy">Cozy</option>
                  <option value="compact">Compact</option>
                </select>
              </label>
              <p className="profile-settings-helper">
                These preferences are saved with your profile. The complete
                application-wide accessibility pass arrives in Phase 14M.
              </p>
              <button type="button" onClick={saveProfile}>Save appearance settings</button>
            </section>
          )}

          {activeSection === "data" && (
            <section>
              <h2>Data</h2>
              <p>Take a copy of your reading life or request account removal.</p>
              <button type="button" onClick={downloadAccountData}>
                Download my data
              </button>

              <SectionDivider label="Danger Zone" icon="!" />
              {!deletionOpen ? (
                <button
                  type="button"
                  className="profile-settings-danger-button"
                  onClick={() => setDeletionOpen(true)}
                >
                  Request account deletion
                </button>
              ) : (
                <div className="profile-settings-danger-zone">
                  <h3>Request account deletion</h3>
                  <p>
                    This records a deletion request for review. Your library
                    remains intact until the request is processed.
                  </p>
                  <label>
                    Type DELETE to confirm
                    <input
                      value={deletionConfirmation}
                      onChange={(event) => setDeletionConfirmation(event.target.value)}
                    />
                  </label>
                  <div className="profile-settings-action-row">
                    <button
                      type="button"
                      className="profile-settings-danger-button"
                      disabled={deletionConfirmation !== "DELETE"}
                      onClick={requestAccountDeletion}
                    >
                      Submit deletion request
                    </button>
                    <button type="button" onClick={() => setDeletionOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </PaperCard>
      </div>

      <button type="button" className="paper-button" onClick={() => setStep("profile")}>
        Back to Profile
      </button>
    </section>
  )
}

export default ProfileSettingsPage
