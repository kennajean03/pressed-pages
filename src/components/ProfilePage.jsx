import BookCard from "./Scrapbook/BookCard/BookCard"
import BotanicalAccent from "./Scrapbook/BotanicalAccent/BotanicalAccent"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./Scrapbook/PolaroidFrame/PolaroidFrame"
import ScrapbookPanel from "./Scrapbook/ScrapbookPanel"
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
  achievementStats,
  openReaderConnections,
  setStep,
}) {
  const readerBio = profile.bio || "Add a little reader bio to make this page feel like yours."

  return (
    <section className="profile-scrapbook-page scrapbook-page scrapbook-section">
      <ScrapbookPanel
        as="header"
        recipe="profile.hero"
        className="profile-hero-card"
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
      </ScrapbookPanel>

      {profileSavedMessage && (
        <PaperCard className="profile-message-card paper-card sticky-note">
          <p>{profileSavedMessage}</p>
        </PaperCard>
      )}

      <div className="profile-scrapbook-grid">
        <ScrapbookPanel
          as="aside"
          recipe="profile.flair"
          className="profile-flair-card"
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
        </ScrapbookPanel>

        <div className="profile-main-stack">
          <ScrapbookPanel
            recipe="profile.snapshot"
            className="profile-snapshot-card"
          >
            <div className="profile-stats-grid profile-stats-grid-v2">
              <StatCard icon="📚" value={yearToDateCount} label="Books this year" />
              <StatCard icon="🔥" value={readingStreakStats.currentStreak} label="Current streak" />
              <StatCard icon="🏆" value={readingStreakStats.longestStreak} label="Longest streak" />
              <StatCard icon="⭐" value={averageRating} label="Average rating" />
              <StatCard icon="🌶️" value={averageSpice} label="Average spice" />
              <StatCard icon="📖" value={readingAnalyticsStats.readingDaysThisYear} label="Reading days" />
            </div>
          </ScrapbookPanel>

          <ScrapbookPanel
            recipe={profile.isPublicProfile ? "profile.public" : "profile.private"}
            className="profile-public-card-v2"
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
          </ScrapbookPanel>
        </div>
      </div>

      <SectionDivider label="Pressed Petals" icon="🌸" />

      <ScrapbookPanel
        recipe="profile.petals"
        className="profile-petals-card"
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
      </ScrapbookPanel>

      <SectionDivider label="Recently Finished" icon="📚" />

      <ScrapbookPanel
        recipe="profile.recentFinished"
        className="profile-recent-card-v2"
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
      </ScrapbookPanel>

      <SectionDivider label="Achievement Stickers" icon="🏆" />

      <ScrapbookPanel
        recipe="profile.achievements"
        className="profile-achievement-card"
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
      </ScrapbookPanel>

      <div className="profile-back-home-wrap">
  <button type="button" className="paper-button" onClick={() => setStep("home")}>
    Back Home
  </button>
</div>
    </section>
  )
}

export default ProfilePage