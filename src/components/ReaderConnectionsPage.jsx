import ReaderCard from "./ReaderCard"

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
    <section>
      <p>Community Connections</p>
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

      <div className="library-action-row">
        <button type="button" onClick={() => openReaderConnections("followers", targetReader)}>
          Followers
        </button>
        <button type="button" onClick={() => openReaderConnections("following", targetReader)}>
          Following
        </button>
        <button type="button" onClick={() => setStep(isOwnList ? "profile" : "publicProfileView")}>
          Back to Profile
        </button>
      </div>

      {loading && <p>Loading {title.toLowerCase()}...</p>}
      {message && <p>{message}</p>}

      {!loading && !readers.length && (
        <div className="score-card">
          {isFollowingPage ? (
            <>
              <p>📚 No following yet.</p>
              <p>
                {isOwnList
                  ? "Find readers who love the same books you do."
                  : `${displayName} is not following any public readers yet.`}
              </p>
              {isOwnList && (
                <button type="button" onClick={() => setStep("findReaders")}>
                  Find Readers
                </button>
              )}
            </>
          ) : (
            <>
              <p>🌸 No followers yet.</p>
              <p>
                {isOwnList
                  ? "Share your public profile to connect with more readers."
                  : `${displayName} does not have any public followers yet.`}
              </p>
            </>
          )}
        </div>
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
