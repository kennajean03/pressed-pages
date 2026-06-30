import BookCard from "./Scrapbook/BookCard/BookCard"
import BotanicalAccent from "./Scrapbook/BotanicalAccent/BotanicalAccent"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./Scrapbook/PolaroidFrame/PolaroidFrame"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ReadingHeatMap from "./ReadingHeatMap"

function ProfilePage({
  profile,
  profileSavedMessage,
  cleanProfileUsername,
  profileDisplayName,
  profileReadingAesthetic,
  profileReaderType,
  profileFavoriteSubgenre,
  profileFavoriteGenre,
  profileFavoriteTrope,
  profileFavoriteVibe,
  followStats,
  yearToDateCount,
  publicProfileUrl,
  copyPublicProfileLink,
  readingStreakStats,
  averageRating,
  averageSpice,
  readingAnalyticsStats,
  getReadingHeatMapStats,
  formatDateKey,
  recentFinishedReads,
  openSavedReview,
  formatDate,
  achievementStats,
  openReaderConnections,
  setStep,
}) {
  const readerBio = profile.bio || "Add a little reader bio to make this page feel like yours."

  return (
    <section className="profile-scrapbook-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reader Scrapbook"
        tapeVariant="sage"
        flower="blossom"
        className="profile-hero-card paper-card paper-card--deckled"
      >
        <div className="profile-hero-layout">
          <div className="profile-polaroid-wrap">
            <PolaroidFrame
              src={profile.avatarUrl}
              alt={`${profileDisplayName} avatar`}
              caption={profileDisplayName}
              rotate="left"
            />
          </div>

          <div className="profile-hero-copy">
            <p className="scrapbook-kicker">Read • Rate • Romanticize</p>
            <h1>{profileDisplayName}</h1>
            <p className="profile-username">@{cleanProfileUsername}</p>
            <p className="profile-bio-note">{readerBio}</p>

            <div className="profile-follow-stickers">
              <button
                type="button"
                className="follow-count-button profile-follow-sticker"
                onClick={() => openReaderConnections("followers")}
              >
                <strong>{followStats.followers}</strong> follower
                {followStats.followers === 1 ? "" : "s"}
              </button>
              <button
                type="button"
                className="follow-count-button profile-follow-sticker"
                onClick={() => openReaderConnections("following")}
              >
                <strong>{followStats.following}</strong> following
              </button>
            </div>

            <div className="profile-hero-actions">
              <button type="button" className="paper-button" onClick={() => setStep("editProfile")}>
                Edit Profile
              </button>
              {profile.isPublicProfile && (
                <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("publicProfilePreview")}>
                  Preview Public Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </PaperCard>

      {profileSavedMessage && (
        <PaperCard className="profile-message-card paper-card sticky-note">
          <p>{profileSavedMessage}</p>
        </PaperCard>
      )}

      <div className="profile-scrapbook-grid">
        <PaperCard
          as="aside"
          variant="notebook"
          tape="Reader Flair"
          tapeVariant="rose"
          className="profile-flair-card paper-card paper-card--notebook"
        >
          <div className="profile-sticker-stack">
            <Sticker icon="🌸" tone="rose">{profileReadingAesthetic}</Sticker>
            <Sticker icon="📚" tone="sage">{profileReaderType}</Sticker>
            <Sticker icon="💌" tone="linen">{profileFavoriteSubgenre}</Sticker>
          </div>

          <SectionDivider label="Favorites" icon="✿" />

          <div className="profile-favorite-notes">
            <div>
              <strong>Favorite Genre</strong>
              <p>{profileFavoriteGenre}</p>
            </div>
            <div>
              <strong>Favorite Trope</strong>
              <p>{profileFavoriteTrope}</p>
            </div>
            <div>
              <strong>Favorite Vibe</strong>
              <p>{profileFavoriteVibe}</p>
            </div>
          </div>
        </PaperCard>

        <div className="profile-main-stack">
          <PaperCard
            variant="journal"
            tape="Reading Snapshot"
            tapeVariant="sage"
            className="profile-snapshot-card paper-card paper-card--journal"
          >
            <div className="profile-stats-grid profile-stats-grid-v2">
              <StatCard icon="📚" value={yearToDateCount} label="Books this year" />
              <StatCard icon="🔥" value={readingStreakStats.currentStreak} label="Current streak" />
              <StatCard icon="🏆" value={readingStreakStats.longestStreak} label="Longest streak" />
              <StatCard icon="⭐" value={averageRating} label="Average rating" />
              <StatCard icon="🌶️" value={averageSpice} label="Average spice" />
              <StatCard icon="📖" value={readingAnalyticsStats.readingDaysThisYear} label="Reading days" />
            </div>
          </PaperCard>

          <PaperCard
            variant="wide"
            tape={profile.isPublicProfile ? "Public Profile" : "Private Profile"}
            tapeVariant={profile.isPublicProfile ? "gold" : "linen"}
            className="profile-public-card-v2 paper-card paper-card--wide"
          >
            <h3>{profile.isPublicProfile ? "🌎 Public profile enabled" : "🔒 Profile is private"}</h3>
            <p>
              {profile.isPublicProfile
                ? "Share a reader-safe version of this scrapbook with your profile link."
                : "Your profile stays private until you turn public sharing on in Edit Profile."}
            </p>

            {profile.isPublicProfile && (
              <div className="profile-public-actions">
                <input readOnly value={publicProfileUrl} aria-label="Public profile link" />
                <button type="button" className="paper-button" onClick={copyPublicProfileLink}>
                  Copy Profile Link
                </button>
              </div>
            )}
          </PaperCard>
        </div>
      </div>

      <SectionDivider label="Pressed Petals" icon="🌸" />

      <PaperCard
        variant="notebook"
        tape="Reading Bloom"
        tapeVariant="sage"
        className="profile-petals-card paper-card paper-card--notebook"
      >
        <div className="profile-section-heading">
          <BotanicalAccent variant="sprig" />
          <div>
            <h2>Pressed Petals</h2>
            <p>A bloom for every day you spent reading.</p>
          </div>
        </div>
        <ReadingHeatMap
          heatMapStats={getReadingHeatMapStats(90)}
          compact
          formatDateKey={formatDateKey}
        />
      </PaperCard>

      <SectionDivider label="Recently Finished" icon="📚" />

      <PaperCard
        variant="wide"
        tape="Finished Shelf"
        tapeVariant="rose"
        className="profile-recent-card-v2 paper-card paper-card--wide"
      >
        {recentFinishedReads.length ? (
          <div className="profile-recent-grid-v2">
            {recentFinishedReads.map((item) => {
              const book = item.bookInfo || {}
              return (
                <BookCard
                  key={item.id}
                  book={book}
                  status="Finished"
                  rating={item.bookScore}
                  obsession={item.obsessionScore}
                  variant="compact"
                  actionLabel="Open Review"
                  onAction={() => openSavedReview(item)}
                />
              )
            })}
          </div>
        ) : (
          <div className="profile-empty-note sticky-note">
            <p>No finished books yet. Finish a book to start building your shelf.</p>
          </div>
        )}
      </PaperCard>

      <SectionDivider label="Achievement Stickers" icon="🏆" />

      <PaperCard
        variant="journal"
        tape="Achievement Showcase"
        tapeVariant="gold"
        flower="daisy"
        className="profile-achievement-card paper-card paper-card--journal"
      >
        <div className="profile-achievement-row">
          <Sticker icon="🏆" tone="gold" size="large">
            {achievementStats.unlocked} / {achievementStats.total} unlocked
          </Sticker>

          {achievementStats.nextAchievement ? (
            <Sticker icon={achievementStats.nextAchievement.icon} tone="sage" size="large">
              Next: {achievementStats.nextAchievement.name}
            </Sticker>
          ) : (
            <Sticker icon="✨" tone="rose" size="large">
              Every achievement is unlocked
            </Sticker>
          )}
        </div>
      </PaperCard>

      <button type="button" className="paper-button" onClick={() => setStep("home")}>
        Back Home
      </button>
    </section>
  )
}

export default ProfilePage
