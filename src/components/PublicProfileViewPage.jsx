import ReaderCard from "./ReaderCard"
import ReaderShelves from "./ReaderShelves"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"

function PublicProfileViewPage({
  publicProfileView,
  publicProfileLoading,
  publicProfileMessage,
  user,
  followStats,
  toggleFollowPublicProfile,
  openReaderConnections,
  publicProfileBooks,
  publicProfileShelf,
  setPublicProfileShelf,
  openSavedReview,
  setStep,
}) {
  return (
<section className="public-profile-page scrapbook-page scrapbook-section">     
  <ScrapbookPanel recipe="publicProfile.hero" className="public-profile-hero">
  <p className="scrapbook-kicker">Public Reader Profile</p>
  <h1>{publicProfileView ? `@${publicProfileView.username}` : "Reader profile"}</h1>
</ScrapbookPanel>

      {publicProfileLoading && <p>Loading public profile...</p>}
      {publicProfileMessage && <p>{publicProfileMessage}</p>}

      {publicProfileView ? (
        <>

        <SectionDivider label="Reader Card" icon="📬" />
          <ReaderCard
            reader={publicProfileView}
            stats={publicProfileView.statsData || {}}
            followStats={followStats}
            actionLabel={
              user && publicProfileView.userId !== user.id
                ? followStats.isFollowing
                  ? "Following ✓"
                  : "Follow Reader"
                : ""
            }
            onAction={
              user && publicProfileView.userId !== user.id
                ? toggleFollowPublicProfile
                : null
            }
          />

          {!user && <p>Log in to follow @{publicProfileView.username}.</p>}

          <div className="follow-count-row">
            <button
              type="button"
              className="follow-count-button profile-follow-sticker"
              onClick={() => openReaderConnections("followers", publicProfileView)}
            >
              <strong>{followStats.followers}</strong> follower
              {followStats.followers === 1 ? "" : "s"}
            </button>
            <button
              type="button"
              className="follow-count-button profile-follow-sticker"
              onClick={() => openReaderConnections("following", publicProfileView)}
            >
              <strong>{followStats.following}</strong> following
            </button>
          </div>

          <ScrapbookPanel recipe="publicProfile.stats" className="public-profile-stats-card">
  <div className="profile-stats-grid profile-stats-grid-v2">
    <StatCard
      icon="📚"
      value={publicProfileView.statsData?.booksThisYear || 0}
      label="Books this year"
    />
    <StatCard
      icon="🔥"
      value={publicProfileView.statsData?.currentStreak || 0}
      label={`Current streak day${publicProfileView.statsData?.currentStreak === 1 ? "" : "s"}`}
    />
    <StatCard
      icon="🏆"
      value={publicProfileView.statsData?.longestStreak || 0}
      label={`Longest streak day${publicProfileView.statsData?.longestStreak === 1 ? "" : "s"}`}
    />
    <StatCard
      icon="⭐"
      value={publicProfileView.statsData?.averageRating || "0.0"}
      label="Average rating"
    />
  </div>
</ScrapbookPanel>

<SectionDivider label="Public Shelves" icon="📚" />

          <ReaderShelves
            books={publicProfileBooks}
            activeShelf={publicProfileShelf}
            onShelfChange={setPublicProfileShelf}
            emptyName={`@${publicProfileView.username}`}
            onOpenBook={openSavedReview}
          />

          <button type="button" className="paper-button" onClick={() => setStep("home")}>
  Back Home
</button>
        </>
      ) : (
        !publicProfileLoading && (
          <div className="score-card">
            <p>🔒 No public profile loaded.</p>
            <p>This reader may have turned their profile private.</p>
            <button type="button" className="paper-button" onClick={() => setStep("home")}>
  Back Home
</button>
          </div>
        )
      )}
    </section>
  )
}

export default PublicProfileViewPage