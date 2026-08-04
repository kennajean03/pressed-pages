import ReaderCard from "./ReaderCard"
import ReaderShelves from "./ReaderShelves"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import PaperCard from "./scrapbook/PaperCard/PaperCard"

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
  onShareProfile,
  openMessageRequest,
  messagingStatus,
  canMessageReader,
  setStep,
}) {
  return (
<section className="public-profile-page scrapbook-page scrapbook-section">     
  <ScrapbookPanel recipe="publicProfile.hero" className="public-profile-hero">
  <p className="scrapbook-kicker">Public Reader Profile</p>
  <h1>{publicProfileView ? `@${publicProfileView.username}` : "Reader profile"}</h1>
</ScrapbookPanel>

      {publicProfileLoading && (
        <PaperCard className="community-state-paper community-state-paper--loading" role="status" aria-live="polite">
          <strong>Opening the reader scrapbook…</strong>
          <p>Gathering the public profile and reader-safe shelves.</p>
        </PaperCard>
      )}
      {publicProfileMessage && (
        <PaperCard className="community-state-paper" role="status">
          <p>{publicProfileMessage}</p>
        </PaperCard>
      )}

      {publicProfileView ? (
        <>

        <SectionDivider label="Reader Card" icon="📬" />
          <div className="public-profile-overview">
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
          </div>

          <div className="public-profile-action-row" aria-label="Reader actions">
            {user?.id === publicProfileView.userId && (
              <button type="button" className="paper-button" disabled>This is you</button>
            )}
            <button type="button" className="paper-button paper-button--quiet" onClick={onShareProfile}>
              Share profile
            </button>
            {user && publicProfileView.userId !== user.id && (
              <button
                type="button"
                className="paper-button"
                disabled={messagingStatus === "unavailable" || !canMessageReader}
                onClick={() => openMessageRequest(publicProfileView)}
              >
                {canMessageReader ? "Message reader" : "Messages closed"}
              </button>
            )}
          </div>
          <p className="public-profile-action-note">
            Sharing copies this reader-safe profile link. Messages always begin as requests
            {canMessageReader ? "." : "; this reader’s current privacy setting does not accept a request from you."}
          </p>

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
          <PaperCard className="community-state-paper public-profile-empty">
            <p className="scrapbook-kicker">Reader card unavailable</p>
            <h2>No public profile is available.</h2>
            <p>This reader may have turned their profile private.</p>
            <button type="button" className="paper-button" onClick={() => setStep("home")}>
  Back Home
</button>
          </PaperCard>
        )
      )}
    </section>
  )
}

export default PublicProfileViewPage
