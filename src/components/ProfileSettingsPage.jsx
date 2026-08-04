import { useState } from "react"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import FlagshipCorner from "./scrapbook/FlagshipCorner/FlagshipCorner"
import ArchivalDetail from "./scrapbook/ArchivalDetail/ArchivalDetail"
import { READER_DISCOVERY_OPTIONS } from "../domain/community/readerDiscovery"
import "./ProfileSettingsPage.css"
import "../styles/phase15f-profiles-settings.css"

const SETTINGS_SECTIONS = [
  ["account", "Account"],
  ["profile", "Profile"],
  ["privacy", "Privacy"],
  ["discovery", "Discovery"],
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
  readerDiscoveryProfile,
  setReaderDiscoveryProfile,
  readerDiscoveryStatus,
  readerDiscoveryMessage,
  saveReaderDiscoveryProfile,
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

  function toggleDiscoveryValue(field, value) {
    setReaderDiscoveryProfile((current) => {
      const selected = current[field] || []
      return {
        ...current,
        [field]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      }
    })
  }

  return (
    <section className="profile-settings-page scrapbook-page scrapbook-section">
      <FlagshipCorner
        assetId="paper-scrap-torn-manuscript-corner-01"
        className="phase17c-route-accent phase17c-route-accent--settings"
        width="88px"
      />
      <ScrapbookPanel recipe="profile.hero" className="profile-settings-hero">
        <p className="scrapbook-kicker">Reader Desk</p>
        <h1>Settings & privacy</h1>
        <p>
          Keep your account, public scrapbook, reading goals, and app
          preferences together in one carefully labeled folio.
        </p>
        <ArchivalDetail folio="DESK · 07" label="reader folio" note="Filed carefully. Changed whenever you like." mark="◇" tone="ink" />
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
                <Sticker icon={profile.isPublicProfile ? "◉" : "◇"} tone="sage">
                  {profile.isPublicProfile ? "Public" : "Private"}
                </Sticker>
                <p>
                  Reading notes, private uploads, account email, and editor
                  drafts are never shown on the public profile.
                </p>
              </div>
              <label>
                Who may send a message request
                <select
                  value={profile.messagePermission || "followers"}
                  onChange={(event) => updateProfile("messagePermission", event.target.value)}
                >
                  <option value="none">No one</option>
                  <option value="followers">Readers who follow me</option>
                  <option value="everyone">Any signed-in reader</option>
                </select>
              </label>
              <p className="profile-settings-helper">
                A request never grants an ongoing conversation automatically. You must accept before the other reader can continue.
              </p>
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
                ["messages", "Message requests and replies"],
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

          {activeSection === "discovery" && (
            <section>
              <h2>Reader discovery</h2>
              <p>
                Choose whether your public reader postcard can appear in Find Readers, then select only the tastes you are comfortable sharing.
              </p>
              {readerDiscoveryStatus === "unavailable" && (
                <p className="profile-settings-helper" role="status">
                  Discovery is safely off until the Phase 18C database update is installed.
                </p>
              )}
              {readerDiscoveryMessage && <p className="profile-settings-helper" role="status">{readerDiscoveryMessage}</p>}
              <label className="profile-settings-switch">
                <input
                  type="checkbox"
                  checked={Boolean(readerDiscoveryProfile.isDiscoverable)}
                  disabled={readerDiscoveryStatus === "unavailable"}
                  onChange={(event) => setReaderDiscoveryProfile((current) => ({
                    ...current,
                    isDiscoverable: event.target.checked,
                  }))}
                />
                <span>Let signed-in readers find my public postcard</span>
              </label>
              {!profile.isPublicProfile && (
                <p className="profile-settings-helper">Your main profile must also be public before discovery can be enabled.</p>
              )}

              <div className="profile-settings-discovery-groups">
                {[
                  ["genres", "Genres", READER_DISCOVERY_OPTIONS.genres],
                  ["formats", "Formats", READER_DISCOVERY_OPTIONS.formats],
                  ["vibes", "Reading vibes", READER_DISCOVERY_OPTIONS.vibes],
                  ["readingStyles", "Reading styles", READER_DISCOVERY_OPTIONS.readingStyles],
                ].map(([field, label, options]) => (
                  <fieldset key={field} disabled={readerDiscoveryStatus === "unavailable"}>
                    <legend>{label}</legend>
                    <div className="profile-settings-discovery-options">
                      {options.map((option) => (
                        <label key={option}>
                          <input
                            type="checkbox"
                            checked={(readerDiscoveryProfile[field] || []).includes(option)}
                            onChange={() => toggleDiscoveryValue(field, option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <p className="profile-settings-helper">
                These selections explain search results. Pressed Pages does not create compatibility percentages or infer tastes from private reading data.
              </p>
              <button
                type="button"
                disabled={readerDiscoveryStatus === "unavailable" || (readerDiscoveryProfile.isDiscoverable && !profile.isPublicProfile)}
                onClick={saveReaderDiscoveryProfile}
              >
                Save discovery choices
              </button>
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
                These choices apply throughout your scrapbook as you select
                them and are saved with your profile. Reduced movement also
                works alongside your device setting.
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
