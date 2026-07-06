import CommunityChallengeCard from "./CommunityChallengeCard"
import ScrapbookPanel from "./Scrapbook/ScrapbookPanel"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"

function CommunityChallengesPage({
  joinedCommunityChallengeIds,
  completedCommunityChallengeCount,
  totalCommunityReaderCount,
  communityChallengeView,
  setCommunityChallengeView,
  visibleCommunityChallenges,
  getCommunityChallengeProgress,
  joinedCommunityChallengeSet,
  getCommunityChallengeParticipantCount,
  getCommunityChallengeParticipants,
  getCommunityChallengeLeaderboard,
  user,
  profile,
  toggleCommunityChallenge,
  openSavedReview,
  setStep,
}) {
  return (
    <section className="community-scrapbook-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="community.hero" className="community-hero-card">
        <p className="scrapbook-kicker">Community Challenges</p>
        <h1>Challenge Hub</h1>
        <p>
          Join cozy reading challenges, track your progress automatically from your library,
          and see which readers are participating with you.
        </p>
      </ScrapbookPanel>

      <ScrapbookPanel recipe="community.buddyReads" className="community-hub-card">
        <button type="button" className="community-hub-link-card" onClick={() => setStep("buddyReads")}>
          <span aria-hidden="true">📚</span>
          <strong>Buddy Reads</strong>
          <small>Start shared reading adventures with friends.</small>
        </button>
      </ScrapbookPanel>

      <ScrapbookPanel recipe="community.summary" className="community-summary-card">
        <div className="community-challenge-summary">
          <StatCard
            icon="📌"
            value={joinedCommunityChallengeIds.length}
            label={`Joined challenge${joinedCommunityChallengeIds.length === 1 ? "" : "s"}`}
          />
          <StatCard
            icon="🏆"
            value={completedCommunityChallengeCount}
            label={`Completed challenge${completedCommunityChallengeCount === 1 ? "" : "s"}`}
          />
          <StatCard
            icon="🌎"
            value={totalCommunityReaderCount}
            label={`Reader${totalCommunityReaderCount === 1 ? "" : "s"} participating`}
          />
        </div>
      </ScrapbookPanel>

      <SectionDivider label="Challenge Shelf" icon="📚" />

      <div className="community-challenge-filter-tabs" aria-label="Challenge filters">
        {[
          ["all", "All"],
          ["joined", "Joined"],
          ["completed", "Completed"],
          ["open", "Still Open"],
        ].map(([filterId, label]) => (
          <button
            type="button"
            key={filterId}
            className={communityChallengeView === filterId ? "active" : ""}
            onClick={() => setCommunityChallengeView(filterId)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="community-challenge-grid">
        {visibleCommunityChallenges.map((challenge) => {
          const challengeProgress = getCommunityChallengeProgress(challenge)
          const isJoined = joinedCommunityChallengeSet.has(challenge.id)
          const participantCount = getCommunityChallengeParticipantCount(challenge.id)
          const participantProfiles = getCommunityChallengeParticipants(challenge.id)
          const visibleParticipantProfiles = participantProfiles.slice(0, 4)
          const hiddenParticipantCount = Math.max(0, participantCount - visibleParticipantProfiles.length)
          const leaderboard = getCommunityChallengeLeaderboard(challenge.id)
          const topLeaderboardReaders = leaderboard.topReaders || []
          const ownLeaderboardEntry = leaderboard.ownEntry || null
          const isPrivateLeaderboardReader = isJoined && Boolean(user) && !profile.isPublicProfile

          return (
            <CommunityChallengeCard
              key={challenge.id}
              challenge={challenge}
              challengeProgress={challengeProgress}
              isJoined={isJoined}
              participantCount={participantCount}
              visibleParticipantProfiles={visibleParticipantProfiles}
              hiddenParticipantCount={hiddenParticipantCount}
              leaderboard={leaderboard}
              topLeaderboardReaders={topLeaderboardReaders}
              ownLeaderboardEntry={ownLeaderboardEntry}
              isPrivateLeaderboardReader={isPrivateLeaderboardReader}
              toggleCommunityChallenge={toggleCommunityChallenge}
              openSavedReview={openSavedReview}
            />
          )
        })}
      </div>

      {visibleCommunityChallenges.length === 0 && (
        <ScrapbookPanel recipe="community.empty" className="community-empty-card">
          <p>No challenges match that filter yet.</p>
          <p>Join a challenge or finish a matching book to fill this shelf.</p>
        </ScrapbookPanel>
      )}

      <div className="community-back-home-wrap">
        <button type="button" className="paper-button" onClick={() => setStep("home")}>
          Back Home
        </button>
      </div>
    </section>
  )
}

export default CommunityChallengesPage