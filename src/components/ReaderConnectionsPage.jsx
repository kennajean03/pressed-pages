import ReaderCard from "./ReaderCard"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import PaperCard from "./scrapbook/PaperCard/PaperCard"

function ReaderConnectionsPage({
  type = "followers",
  targetReader,
  readers = [],
  loading = false,
  message = "",
  user,
  openReaderProfile,
  openReaderConnections,
  toggleFollowReader,
  setStep,
}) {
  const isFollowingPage = type === "following"
  const displayName =
    targetReader?.displayName ||
    targetReader?.display_name ||
    targetReader?.profileData?.displayName ||
    targetReader?.profile_data?.displayName ||
    "this reader"
  const username = targetReader?.username || targetReader?.profileData?.username || "reader"
  const isOwnList = user?.id && targetReader?.userId === user.id
  const title = isFollowingPage ? "Following" : "Followers"

  function getActionLabel(reader) {
    if (!user || reader.userId === user.id) return ""

    if (reader.isFollowingByCurrent) {
      return isFollowingPage && isOwnList ? "Unfollow" : "Following ✓"
    }

    return isFollowingPage ? "Follow Reader" : "Follow Back"
  }

  return (
    <section className="reader-connections-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="readerConnections.hero" className="reader-connections-hero">
  <p className="scrapbook-kicker">Community Connections</p>
  <h1>{title}</h1>
  <p>
    {isOwnList
      ? isFollowingPage
        ? "Readers you're following in your Pressed Pages community."
        : "Readers following your reader scrapbook."
      : isFollowingPage
        ? `Readers @${username} follows.`
        : `Readers following @${username}.`}
  </p>
</ScrapbookPanel>

<div className="library-action-row reader-connections-actions">
       <button type="button" className="paper-button paper-button--quiet" onClick={() => openReaderConnections("followers", targetReader)}>
  Followers
</button>
<button type="button" className="paper-button paper-button--quiet" onClick={() => openReaderConnections("following", targetReader)}>
  Following
</button>
<button type="button" className="paper-button" onClick={() => setStep(isOwnList ? "profile" : "publicProfileView")}>
  Back to Profile
</button>
      </div>

      {loading && (
        <PaperCard className="community-state-paper community-state-paper--loading" role="status" aria-live="polite">
          <strong>Opening the connection cards…</strong>
          <p>Gathering public {title.toLowerCase()} for this reader.</p>
        </PaperCard>
      )}
      {message && (
        <PaperCard className="community-state-paper" role="status">
          <p>{message}</p>
        </PaperCard>
      )}

      {!loading && !readers.length && (
        <PaperCard className="community-state-paper reader-connections-empty">
          {isFollowingPage ? (
            <>
              <p className="scrapbook-kicker">A quiet reading circle</p>
              <h2>No public readers followed yet.</h2>
              <p>
                {isOwnList
                  ? "Find readers who love the same books you do."
                  : `${displayName} is not following any public readers yet.`}
              </p>
              {isOwnList && (
               <button type="button" className="paper-button" onClick={() => setStep("findReaders")}>
  Find Readers
</button>
              )}
            </>
          ) : (
            <>
              <p className="scrapbook-kicker">An unopened guest book</p>
              <h2>No public followers yet.</h2>
              <p>
                {isOwnList
                  ? "Share your public profile to connect with more readers."
                  : `${displayName} does not have any public followers yet.`}
              </p>
            </>
          )}
        </PaperCard>
      )}

      <div className="reader-list">
        {readers.map((reader) => (
          <ReaderCard
            key={reader.userId}
            reader={reader}
            stats={reader.statsData || {}}
            compact
            meta={reader.userId === user?.id ? "That's you 🌸" : "Pressed Pages Reader"}
            actionLabel={getActionLabel(reader)}
            onAction={
              user && reader.userId !== user.id ? () => toggleFollowReader(reader) : null
            }
            onViewProfile={() => openReaderProfile(reader.username)}
          />
        ))}
      </div>
    </section>
  )
}

export default ReaderConnectionsPage
