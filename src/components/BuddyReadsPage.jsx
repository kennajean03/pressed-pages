import { useEffect, useMemo, useState } from "react"

function getMemberDisplayName(member) {
  return member?.displayName || member?.username || "Pressed Pages Reader"
}

function getMemberInitial(member) {
  return getMemberDisplayName(member).trim().charAt(0).toUpperCase() || "R"
}

function getMemberProgress(member, totalPages) {
  const percent =
    Number(member?.progress_percent) ||
    Number(member?.progressPercent) ||
    Number(member?.progress) ||
    0

  if (percent > 0) return Math.min(100, Math.round(percent))

  const page =
    Number(member?.current_page) ||
    Number(member?.currentPage) ||
    Number(member?.pages_read) ||
    Number(member?.pagesRead) ||
    0

  if (totalPages > 0 && page > 0) {
    return Math.min(100, Math.round((page / totalPages) * 100))
  }

  return member?.status === "finished" ? 100 : 0
}

function BuddyReadAvatar({ member, small = false }) {
  return (
    <span className={`buddy-read-reader-avatar${small ? " small" : ""}`}>
      {member?.avatarUrl ? (
        <img src={member.avatarUrl} alt="" />
      ) : (
        <span>{getMemberInitial(member)}</span>
      )}
    </span>
  )
}

function getPostAuthorName(post) {
  return (
    post?.author?.displayName ||
    post?.author?.username ||
    post?.displayName ||
    "Pressed Pages Reader"
  )
}

function getPostAuthorInitial(post) {
  return getPostAuthorName(post).trim().charAt(0).toUpperCase() || "R"
}

function formatBuddyReadPostTime(value) {
  if (!value) return "Just now"

  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value))
  } catch {
    return "Just now"
  }
}

function BuddyReadPostAvatar({ post }) {
  const avatarUrl = post?.author?.avatarUrl || ""

  return (
    <span className="buddy-read-reader-avatar small">
      {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>{getPostAuthorInitial(post)}</span>}
    </span>
  )
}

function BuddyReadDiscussionFeed({
  buddyRead,
  user,
  posts = [],
  postsLoading = false,
  loadBuddyReadPosts,
  createBuddyReadPost,
  deleteBuddyReadPost,
}) {
  const [postBody, setPostBody] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    if (buddyRead?.id) {
      loadBuddyReadPosts?.(buddyRead.id)
    }
  }, [buddyRead?.id])

  async function handleSubmitPost(event) {
    event.preventDefault()

    const cleanBody = postBody.trim()
    if (!cleanBody || isPosting) return

    setIsPosting(true)
    const result = await createBuddyReadPost?.(buddyRead.id, cleanBody)
    setIsPosting(false)

    if (result?.ok) {
      setPostBody("")
    }
  }

  return (
    <div className="buddy-read-discussion-feed">
      <div className="buddy-read-discussion-header">
        <div>
          <p className="buddy-reads-kicker">Discussion Feed</p>
          <h3>Book Chat</h3>
        </div>
        <button type="button" onClick={() => loadBuddyReadPosts?.(buddyRead.id)} disabled={postsLoading}>
          {postsLoading ? "Refreshing..." : "Refresh Chat"}
        </button>
      </div>

      <form className="buddy-read-post-composer" onSubmit={handleSubmitPost}>
        <label htmlFor={`buddy-read-post-${buddyRead.id}`}>What are you thinking?</label>
        <textarea
          id={`buddy-read-post-${buddyRead.id}`}
          value={postBody}
          onChange={(event) => setPostBody(event.target.value)}
          placeholder="Drop a spoiler-free update, a reaction, or a little reading note..."
          maxLength={800}
          rows={4}
        />
        <div className="buddy-read-post-composer-actions">
          <small>{postBody.length}/800</small>
          <button type="submit" disabled={!user || !postBody.trim() || isPosting}>
            {isPosting ? "Posting..." : "Post Update"}
          </button>
        </div>
      </form>

      <div className="buddy-read-post-list">
        {postsLoading && posts.length === 0 && <p>Loading discussion...</p>}

        {!postsLoading && posts.length === 0 && (
          <div className="buddy-read-empty-chat">
            <span aria-hidden="true">💬</span>
            <strong>No discussion yet.</strong>
            <p>Start the first little bookish check-in for this Buddy Read.</p>
          </div>
        )}

        {posts.map((post) => {
          const isOwnPost = post.userId === user?.id

          return (
            <article className="buddy-read-post-card" key={post.id}>
              <BuddyReadPostAvatar post={post} />
              <div className="buddy-read-post-body">
                <div className="buddy-read-post-meta">
                  <strong>{getPostAuthorName(post)}</strong>
                  <small>{formatBuddyReadPostTime(post.createdAt)}</small>
                </div>
                <p>{post.body}</p>
                {isOwnPost && (
                  <button
                    type="button"
                    className="buddy-read-text-button"
                    onClick={() => deleteBuddyReadPost?.(buddyRead.id, post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function BuddyReadDashboard({
  buddyRead,
  user,
  setStep,
  loadBuddyReads,
  leaveBuddyRead,
  buddyReadPosts = [],
  buddyReadPostsLoading = false,
  loadBuddyReadPosts,
  createBuddyReadPost,
  deleteBuddyReadPost,
  onClose,
}) {
  const acceptedMembers = (buddyRead.members || []).filter((member) => member.status === "accepted")
  const invitedMembers = (buddyRead.members || []).filter((member) => member.status === "invited")
  const totalPages = Number(buddyRead.book?.pages) || 0

  const progressRows = acceptedMembers.map((member) => ({
    ...member,
    progress: getMemberProgress(member, totalPages),
  }))

  const averageProgress = progressRows.length
    ? Math.round(progressRows.reduce((sum, member) => sum + member.progress, 0) / progressRows.length)
    : 0

  const activityItems = [
    ...acceptedMembers.map((member) => ({
      icon: member.isCurrentUser ? "📖" : "🌿",
      text: `${getMemberDisplayName(member)} joined the Buddy Read.`,
    })),
    ...invitedMembers.map((member) => ({
      icon: "💌",
      text: `${getMemberDisplayName(member)} has an invitation waiting.`,
    })),
  ].slice(0, 6)

  return (
    <article className="buddy-read-dashboard">
      <div className="buddy-read-dashboard-header">
        <button type="button" onClick={onClose}>
          ← Back to Buddy Reads
        </button>

        <div className="buddy-read-dashboard-title">
          <p className="buddy-reads-kicker">Active Buddy Read</p>
          <h2>{buddyRead.name || "Untitled Buddy Read"}</h2>
          <p>
            <strong>{buddyRead.book?.title || "Untitled Book"}</strong>
            {buddyRead.book?.author ? ` by ${buddyRead.book.author}` : ""}
          </p>
        </div>
      </div>

      <div className="buddy-read-dashboard-layout">
        <div className="buddy-read-dashboard-book-card">
          {buddyRead.book?.coverUrl ? (
            <img src={buddyRead.book.coverUrl} alt={`${buddyRead.book.title || "Buddy Read"} cover`} />
          ) : (
            <div className="buddy-read-real-cover placeholder">📖</div>
          )}

          <div>
            <p className="buddy-reads-kicker">Overall Progress</p>
            <h3>{averageProgress}% together</h3>
            <div className="buddy-read-progress-track">
              <span style={{ width: `${averageProgress}%` }} />
            </div>
            <p>
              {acceptedMembers.length} joined
              {invitedMembers.length > 0 ? ` · ${invitedMembers.length} invited` : ""}
            </p>
          </div>
        </div>

        <div className="buddy-read-dashboard-panel">
          <p className="buddy-reads-kicker">Reading Crew</p>
          <h3>Everyone&apos;s Progress</h3>

          <div className="buddy-read-progress-list">
            {progressRows.map((member) => (
              <div className="buddy-read-progress-row" key={`${buddyRead.id}-${member.userId}`}>
                <BuddyReadAvatar member={member} small />
                <div>
                  <strong>{getMemberDisplayName(member)}</strong>
                  <div className="buddy-read-progress-track">
                    <span style={{ width: `${member.progress}%` }} />
                  </div>
                </div>
                <b>{member.progress}%</b>
              </div>
            ))}
          </div>

          {invitedMembers.length > 0 && (
            <div className="buddy-read-dashboard-invites">
              <strong>Pending Invites</strong>
              {invitedMembers.map((member) => (
                <span key={`${buddyRead.id}-invite-${member.userId}`}>
                  <BuddyReadAvatar member={member} small />
                  {getMemberDisplayName(member)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="buddy-read-dashboard-panel">
          <p className="buddy-reads-kicker">Latest Activity</p>
          <h3>Reading Timeline</h3>

          <div className="buddy-read-activity-list">
            {activityItems.length > 0 ? (
              activityItems.map((item, index) => (
                <div className="buddy-read-activity-item" key={`${item.text}-${index}`}>
                  <span>{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              ))
            ) : (
              <p>No activity yet.</p>
            )}
          </div>
        </div>

        <div className="buddy-read-dashboard-panel buddy-read-dashboard-panel-wide">
          <BuddyReadDiscussionFeed
            buddyRead={buddyRead}
            user={user}
            posts={buddyReadPosts}
            postsLoading={buddyReadPostsLoading}
            loadBuddyReadPosts={loadBuddyReadPosts}
            createBuddyReadPost={createBuddyReadPost}
            deleteBuddyReadPost={deleteBuddyReadPost}
          />
        </div>

        <div className="buddy-read-dashboard-panel">
          <p className="buddy-reads-kicker">Quick Actions</p>
          <h3>Keep Reading Together</h3>

          <div className="buddy-read-dashboard-actions">
            <button type="button" onClick={loadBuddyReads}>
              Refresh Progress
            </button>
            <button type="button" onClick={() => setStep("currentlyReading")}>
              Log Reading
            </button>
            <button type="button" onClick={() => setStep("createBuddyRead")}>
              Start Another Buddy Read
            </button>
            <button
              type="button"
              className="buddy-read-danger-button"
              onClick={() => leaveBuddyRead?.(buddyRead.id)}
            >
              Leave Buddy Read
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function BuddyReadMiniCard({ buddyRead, respondToBuddyReadInvite, leaveBuddyRead, onOpen }) {
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

      <div className="buddy-reads-actions">
        {!currentUserInvited && (
          <button type="button" onClick={() => onOpen?.(buddyRead.id)}>
            Open Dashboard
          </button>
        )}

        {currentUserInvited ? (
          <>
            <button type="button" onClick={() => respondToBuddyReadInvite(buddyRead.id, "accepted")}>
              Accept Invite
            </button>
            <button type="button" onClick={() => respondToBuddyReadInvite(buddyRead.id, "declined")}>
              Decline
            </button>
          </>
        ) : (
          <button
            type="button"
            className="buddy-read-danger-button"
            onClick={() => leaveBuddyRead?.(buddyRead.id)}
          >
            Remove From Dashboard
          </button>
        )}
      </div>
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
  leaveBuddyRead,
  buddyReadPostsById = {},
  buddyReadPostsLoadingById = {},
  loadBuddyReadPosts,
  createBuddyReadPost,
  deleteBuddyReadPost,
}) {
  const [selectedBuddyReadId, setSelectedBuddyReadId] = useState("")

  const activeBuddyReads = buddyReads.filter(
    (buddyRead) =>
      buddyRead.status !== "completed" &&
      buddyRead.membershipStatus !== "invited" &&
      buddyRead.membershipStatus !== "declined" &&
      buddyRead.membershipStatus !== "left"
  )
  const invitedBuddyReads = buddyReads.filter((buddyRead) => buddyRead.membershipStatus === "invited")
  const completedBuddyReads = buddyReads.filter(
    (buddyRead) => buddyRead.status === "completed" && buddyRead.membershipStatus !== "left"
  )

  const selectedBuddyRead = useMemo(
    () => buddyReads.find((buddyRead) => buddyRead.id === selectedBuddyReadId),
    [buddyReads, selectedBuddyReadId]
  )

  if (selectedBuddyRead) {
    return (
      <section>
        <BuddyReadDashboard
          buddyRead={selectedBuddyRead}
          user={user}
          setStep={setStep}
          loadBuddyReads={loadBuddyReads}
          leaveBuddyRead={leaveBuddyRead}
          buddyReadPosts={buddyReadPostsById[selectedBuddyRead.id] || []}
          buddyReadPostsLoading={Boolean(buddyReadPostsLoadingById[selectedBuddyRead.id])}
          loadBuddyReadPosts={loadBuddyReadPosts}
          createBuddyReadPost={createBuddyReadPost}
          deleteBuddyReadPost={deleteBuddyReadPost}
          onClose={() => setSelectedBuddyReadId("")}
        />
      </section>
    )
  }

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
                leaveBuddyRead={leaveBuddyRead}
                onOpen={setSelectedBuddyReadId}
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
                leaveBuddyRead={leaveBuddyRead}
                onOpen={setSelectedBuddyReadId}
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
                leaveBuddyRead={leaveBuddyRead}
                onOpen={setSelectedBuddyReadId}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default BuddyReadsPage
