import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

export default function CommunityChallengeCard({
  challenge,
  challengeProgress,
  isJoined,
  participantCount,
  visibleParticipantProfiles = [],
  hiddenParticipantCount = 0,
  leaderboard = {},
  topLeaderboardReaders = [],
  ownLeaderboardEntry = null,
  isPrivateLeaderboardReader = false,
  toggleCommunityChallenge,
  openSavedReview,
}) {
  return (
    <ScrapbookPanel
      as="article"
      recipe={challengeProgress.isComplete ? "community.challengeComplete" : "community.challengeCard"}
      className={`community-challenge-card ${isJoined ? "is-joined" : ""} ${
        challengeProgress.isComplete ? "is-complete" : ""
      }`}
    >
      <div className="community-challenge-card-header">
        <span className="community-challenge-icon">{challenge.icon}</span>
        <div>
          <p className="scrapbook-kicker">{challenge.tag}</p>
          <h2>{challenge.title}</h2>
        </div>
      </div>

      <p>{challenge.subtitle}</p>

      <div className="community-challenge-progress-row">
        <strong>
          {challengeProgress.progress}/{challenge.goal}
        </strong>
        <span>{challenge.label}</span>
      </div>

      <div className="progress-bar community-challenge-progress">
        <div
          className="progress-fill"
          style={{ width: `${challengeProgress.percent}%` }}
        />
        <span>{challengeProgress.percent}%</span>
      </div>

      <div className="community-challenge-meta">
        <span>Ends: {challenge.ends}</span>
        <span>
          {challengeProgress.total} matching book
          {challengeProgress.total === 1 ? "" : "s"}
        </span>
      </div>

      <div className="community-participation-card">
        <strong>
          {participantCount.toLocaleString()} reader
          {participantCount === 1 ? "" : "s"} joined
        </strong>
        <p>
          {isJoined
            ? "You’re signed up for this challenge."
            : participantCount > 0
              ? `Join ${participantCount.toLocaleString()} reader${
                  participantCount === 1 ? "" : "s"
                } tracking this prompt.`
              : "Be the first reader to join this challenge."}
        </p>

        {visibleParticipantProfiles.length > 0 ? (
          <div className="community-participant-list">
            {visibleParticipantProfiles.map((participant) => (
              <span
                key={`${challenge.id}-${participant.userId}`}
                className={participant.isFollowing ? "is-following" : ""}
                title={
                  participant.username
                    ? `@${participant.username}`
                    : participant.displayName
                }
              >
                {participant.avatarUrl ? (
                  <img src={participant.avatarUrl} alt="" />
                ) : (
                  <span className="community-participant-avatar-fallback">
                    {participant.isOwnReader
                      ? "✨"
                      : participant.isFollowing
                        ? "⭐"
                        : "📚"}
                  </span>
                )}
                <span>
                  {participant.displayName}
                  {participant.isFollowing && !participant.isOwnReader
                    ? " • friend"
                    : ""}
                </span>
              </span>
            ))}

            {hiddenParticipantCount > 0 && (
              <span className="community-participant-more">
                +{hiddenParticipantCount} more
              </span>
            )}
          </div>
        ) : (
          <div className="community-participant-list">
            <span>🌸 No readers shown yet</span>
          </div>
        )}
      </div>

      <div className="community-leaderboard-card">
        <div className="community-leaderboard-header">
          <strong>🏆 Challenge Leaderboard</strong>
          <span>
            {leaderboard.visibleCount || 0} public reader
            {leaderboard.visibleCount === 1 ? "" : "s"}
          </span>
        </div>

        {topLeaderboardReaders.length > 0 ? (
          <div className="community-leaderboard-list">
            {topLeaderboardReaders.map((entry) => (
              <div
                key={`${challenge.id}-leader-${entry.userId}`}
                className={`community-leaderboard-row ${
                  entry.isOwnReader ? "is-own-reader" : ""
                }`}
              >
                <span className="community-leaderboard-rank">
                  {entry.rank === 1
                    ? "🥇"
                    : entry.rank === 2
                      ? "🥈"
                      : entry.rank === 3
                        ? "🥉"
                        : `#${entry.rank}`}
                </span>
                <span className="community-leaderboard-reader">
                  {entry.avatarUrl ? (
                    <img src={entry.avatarUrl} alt="" />
                  ) : (
                    <span>{entry.isOwnReader ? "✨" : "📚"}</span>
                  )}
                  <strong>{entry.displayName}</strong>
                </span>
                <span className="community-leaderboard-progress">
                  {entry.progress}/{challenge.goal}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="community-leaderboard-empty">
            No public readers have ranked yet.
          </p>
        )}

        {ownLeaderboardEntry && (
          <div
            className={`community-leaderboard-own ${
              ownLeaderboardEntry.rank ? "" : "is-private"
            }`}
          >
            <strong>
              {ownLeaderboardEntry.rank
                ? `Your Rank: #${ownLeaderboardEntry.rank}`
                : "🔒 Private leaderboard mode"}
            </strong>
            <span>
              Your Progress: {ownLeaderboardEntry.progress}/{challenge.goal}
            </span>
          </div>
        )}

        {isPrivateLeaderboardReader && (
          <p className="community-leaderboard-privacy-note">
            Your profile is private, so your progress is hidden from public
            leaderboards.
          </p>
        )}
      </div>

      {challengeProgress.recentBooks.length > 0 && (
        <div className="community-challenge-books">
          <p>Recent matches</p>
          {challengeProgress.recentBooks.map((book) => (
            <button
              type="button"
              key={book.id || `${book?.bookInfo?.title}-${book?.bookInfo?.author}`}
              className="paper-button paper-button--quiet"
              onClick={() => openSavedReview(book)}
            >
              {book?.bookInfo?.title || "Untitled Book"}
            </button>
          ))}
        </div>
      )}

      {challengeProgress.isComplete && isJoined && (
        <p className="community-challenge-complete">🏆 Challenge complete!</p>
      )}

      <button
        type="button"
        className="paper-button"
        onClick={() => toggleCommunityChallenge(challenge.id)}
      >
        {isJoined ? "Leave Challenge" : "Join Challenge"}
      </button>
    </ScrapbookPanel>
  )
}