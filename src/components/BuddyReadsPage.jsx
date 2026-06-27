function BuddyReadMiniCard({ buddyRead, respondToBuddyReadInvite }) {
  const acceptedMembers = (buddyRead.members || []).filter((member) => member.status === "accepted")
  const invitedMembers = (buddyRead.members || []).filter((member) => member.status === "invited")
  const currentUserInvited = buddyRead.membershipStatus === "invited"

  return (
    <article className="buddy-reads-section-card buddy-read-real-card">
      <div className="buddy-read-real-card-main">
        {buddyRead.book?.coverUrl ? (
          <img
            src={buddyRead.book.coverUrl}
            alt={`${buddyRead.book.title || "Buddy Read"} cover`}
            className="buddy-read-real-cover"
          />
        ) : (
          <div className="buddy-read-real-cover placeholder" aria-hidden="true">📖</div>
        )}

        <div>
          <p className="buddy-reads-kicker">
            {currentUserInvited ? "Invitation" : "Reading Adventure"}
          </p>
          <h2>{buddyRead.name || "Untitled Buddy Read"}</h2>
          <p>
            <strong>{buddyRead.book?.title || "Untitled Book"}</strong>
            {buddyRead.book?.author ? ` by ${buddyRead.book.author}` : ""}
          </p>
          <p>
            {acceptedMembers.length} joined
            {invitedMembers.length > 0 ? ` · ${invitedMembers.length} invited` : ""}
          </p>

          {buddyRead.members?.length > 0 && (
            <div className="buddy-read-member-row">
              {buddyRead.members.slice(0, 5).map((member) => (
                <span
                  key={`${buddyRead.id}-${member.userId}`}
                  className={member.status === "invited" ? "is-invited" : ""}
                  title={`${member.displayName}${member.status === "invited" ? " · invited" : ""}`}
                >
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt="" />
                  ) : (
                    <span>{member.displayName?.trim()?.charAt(0)?.toUpperCase() || "R"}</span>
                  )}
                </span>
              ))}
              {buddyRead.members.length > 5 && <small>+{buddyRead.members.length - 5}</small>}
            </div>
          )}
        </div>
      </div>

      {currentUserInvited && (
        <div className="buddy-reads-actions">
          <button type="button" onClick={() => respondToBuddyReadInvite(buddyRead.id, "accepted")}>
            Accept Invite
          </button>
          <button type="button" onClick={() => respondToBuddyReadInvite(buddyRead.id, "declined")}>
            Decline
          </button>
        </div>
      )}
    </article>
  )
}

function BuddyReadsPage({
  user,
  setStep,
  buddyReads = [],
  buddyReadsLoading = false,
  buddyReadsMessage = "",
  loadBuddyReads,
  respondToBuddyReadInvite,
}) {
  const activeBuddyReads = buddyReads.filter(
    (buddyRead) => buddyRead.status !== "completed" && buddyRead.membershipStatus !== "invited" && buddyRead.membershipStatus !== "declined"
  )
  const invitedBuddyReads = buddyReads.filter((buddyRead) => buddyRead.membershipStatus === "invited")
  const completedBuddyReads = buddyReads.filter((buddyRead) => buddyRead.status === "completed")

  return (
    <section>
      <p>Buddy Reads</p>
      <h1>Reading Adventures</h1>
      <p>
        Read together with friends, cheer each other on, and turn shared books into
        little scrapbook memories.
      </p>

      {buddyReadsMessage && <p>{buddyReadsMessage}</p>}

      <div className="buddy-reads-hero">
        <div className="buddy-reads-hero-icon" aria-hidden="true">📖</div>
        <p className="buddy-reads-kicker">Buddy Reads</p>
        <h2>Reading is better together.</h2>
        <p>
          Start a shared reading journey with friends and watch everyone&apos;s progress
          in one cozy place.
        </p>
        <div className="buddy-reads-actions">
          <button type="button" onClick={() => setStep("createBuddyRead")}>+ Start a Buddy Read</button>
          <button type="button" onClick={loadBuddyReads} disabled={!user || buddyReadsLoading}>
            {buddyReadsLoading ? "Refreshing..." : "Refresh"}
          </button>
          <button type="button" disabled title="Coming soon">
            Browse Public Buddy Reads · Coming Soon
          </button>
        </div>
      </div>

      <div className="buddy-reads-grid">
        <div className="buddy-reads-section-card">
          <span aria-hidden="true">📚</span>
          <p className="buddy-reads-kicker">Current Journeys</p>
          <h2>Reading Adventures</h2>

          {buddyReadsLoading && <p>Loading Buddy Reads...</p>}

          {!buddyReadsLoading && activeBuddyReads.length === 0 && (
            <>
              <p>No active Buddy Reads yet.</p>
              <p>Once you start reading together, your shared books will appear here.</p>
            </>
          )}

          {!buddyReadsLoading &&
            activeBuddyReads.map((buddyRead) => (
              <BuddyReadMiniCard
                key={buddyRead.id}
                buddyRead={buddyRead}
                respondToBuddyReadInvite={respondToBuddyReadInvite}
              />
            ))}
        </div>

        <div className="buddy-reads-section-card">
          <span aria-hidden="true">💌</span>
          <p className="buddy-reads-kicker">Friend Invites</p>
          <h2>Invitations</h2>

          {!buddyReadsLoading && invitedBuddyReads.length === 0 && (
            <>
              <p>No invitations waiting.</p>
              <p>When friends invite you to read together, they&apos;ll show up here.</p>
            </>
          )}

          {!buddyReadsLoading &&
            invitedBuddyReads.map((buddyRead) => (
              <BuddyReadMiniCard
                key={buddyRead.id}
                buddyRead={buddyRead}
                respondToBuddyReadInvite={respondToBuddyReadInvite}
              />
            ))}
        </div>

        <div className="buddy-reads-section-card">
          <span aria-hidden="true">🏆</span>
          <p className="buddy-reads-kicker">Finished Together</p>
          <h2>Completed Adventures</h2>

          {!buddyReadsLoading && completedBuddyReads.length === 0 && (
            <>
              <p>Your finished Buddy Reads will become part of your reading scrapbook.</p>
              <p>Celebrate the books you and your friends finished side by side.</p>
            </>
          )}

          {!buddyReadsLoading &&
            completedBuddyReads.map((buddyRead) => (
              <BuddyReadMiniCard
                key={buddyRead.id}
                buddyRead={buddyRead}
                respondToBuddyReadInvite={respondToBuddyReadInvite}
              />
            ))}
        </div>
      </div>

      <div className="score-card buddy-reads-coming-soon-card">
        <p>Now building in 12B.3</p>
        <h2>Cloud Buddy Reads</h2>
        <p>
          Buddy Reads now save to Supabase with owner/member records and invitation statuses.
          Shared progress comes next.
        </p>
      </div>
    </section>
  )
}

export default BuddyReadsPage
