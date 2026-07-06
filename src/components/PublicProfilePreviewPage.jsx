import ReaderCard from "./ReaderCard"
import ReaderShelves from "./ReaderShelves"
import ReadingHeatMap from "./ReadingHeatMap"
import ScrapbookPanel from "./Scrapbook/ScrapbookPanel"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"

function PublicProfilePreviewPage({
  cleanProfileUsername,
  profile,
  profileDisplayName,
  profileReadingAesthetic,
  profileReaderType,
  profileFavoriteSubgenre,
  yearToDateCount,
  followStats,
  readingStreakStats,
  averageRating,
  savedReviews,
  profilePreviewShelf,
  setProfilePreviewShelf,
  openSavedReview,
  getReadingHeatMapStats,
  formatDateKey,
  recentFinishedReads,
  achievementStats,
  setStep,
}) {
  return (
    <section className="public-profile-preview-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="publicProfile.previewHero" className="public-profile-preview-hero">
  <p className="scrapbook-kicker">Public Profile Preview</p>
  <h1>@{cleanProfileUsername}</h1>
  <p>This is the shareable version of your reader scrapbook.</p>
</ScrapbookPanel>

      {profile.isPublicProfile ? (
        <>
        <SectionDivider label="Reader Card" icon="📬" />
          <ReaderCard
            reader={{
              username: cleanProfileUsername,
              displayName: profileDisplayName,
              avatarUrl: profile.avatarUrl,
              profileData: {
                ...profile,
                readingAesthetic: profileReadingAesthetic,
                readerType: profileReaderType,
                favoriteSubgenre: profileFavoriteSubgenre,
              },
            }}
            stats={{ booksThisYear: yearToDateCount }}
            followStats={followStats}
          />

         <ScrapbookPanel recipe="publicProfile.stats" className="public-profile-stats-card">
  <div className="profile-stats-grid profile-stats-grid-v2">
    <StatCard icon="📚" value={yearToDateCount} label="Books this year" />
    <StatCard
      icon="🔥"
      value={readingStreakStats.currentStreak}
      label={`Current streak day${readingStreakStats.currentStreak === 1 ? "" : "s"}`}
    />
    <StatCard
      icon="🏆"
      value={readingStreakStats.longestStreak}
      label={`Longest streak day${readingStreakStats.longestStreak === 1 ? "" : "s"}`}
    />
    <StatCard icon="⭐" value={averageRating} label="Average rating" />
  </div>
</ScrapbookPanel>

<SectionDivider label="Public Shelves" icon="📚" />

          <ReaderShelves
            books={savedReviews}
            activeShelf={profilePreviewShelf}
            onShelfChange={setProfilePreviewShelf}
            emptyName="you"
            onOpenBook={openSavedReview}
          />

<SectionDivider label="Pressed Petals" icon="🌸" />

          <ScrapbookPanel recipe="profile.petals" className="profile-petals-card">
            <p>🌸 Pressed Petals</p>
            <p>A bloom for every day spent reading.</p>
            <ReadingHeatMap
              heatMapStats={getReadingHeatMapStats(90)}
              compact
              formatDateKey={formatDateKey}
            />
          </ScrapbookPanel>

<SectionDivider label="Recently Finished" icon="📖" />

          <div className="score-card profile-recent-card">
            <p>Recently Finished</p>

            {recentFinishedReads.length ? (
              <div className="profile-recent-grid">
                {recentFinishedReads.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="profile-recent-book"
                    onClick={() => openSavedReview(item)}
                    aria-label={`Open ${item.bookInfo.title || "book"} review`}
                    title={`${item.bookInfo.title || "Untitled Book"} by ${
                      item.bookInfo.author || "Unknown Author"
                    }`}
                  >
                    {item.bookInfo.coverUrl && (
                      <img src={item.bookInfo.coverUrl} alt={`${item.bookInfo.title} cover`} />
                    )}
                    <strong>{item.bookInfo.title || "Untitled Book"}</strong>
                    <p>{item.bookInfo.author || "Unknown Author"}</p>
                    <p>⭐ {item.bookScore}/5</p>
                  </button>
                ))}
              </div>
            ) : (
              <p>No recent finished books yet.</p>
            )}
          </div>

          <SectionDivider label="Achievement Showcase" icon="🏆" />

          <ScrapbookPanel recipe="profile.achievements" className="profile-achievement-card">
  <p>Achievement Showcase</p>
  <p>Unlocked Achievements: {achievementStats.unlocked} / {achievementStats.total}</p>
</ScrapbookPanel>
        </>
      ) : (
        <div className="score-card">
          <p>🔒 This profile is private.</p>
          <p>Turn on public sharing in Edit Profile to preview the public version.</p>
        </div>
      )}

      <div className="profile-back-home-wrap">
  <button type="button" className="paper-button" onClick={() => setStep("profile")}>
    Back to Profile
  </button>
</div>
    </section>
  )
}

export default PublicProfilePreviewPage