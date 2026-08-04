import { useState } from "react"

const REACTIONS = [
  ["heart", "♡", "Heart"],
  ["spark", "✦", "Spark"],
  ["laugh", "☺", "Laugh"],
  ["cry", "☂", "Emotional"],
  ["spicy", "♨", "Spicy"],
]

function getCommenterName(comment) {
  const profile = comment.readerProfile || {}
  const profileData = profile.profile_data || {}
  return comment.isOwnComment
    ? "You"
    : profileData.displayName || profile.display_name || profile.username || "Pressed Pages Reader"
}

export default function ActivitySocialActions({
  event,
  available,
  toggleActivityLike,
  toggleActivitySave,
  setActivityReaction,
  addActivityComment,
  updateActivityComment,
  deleteActivityComment,
  reportActivity,
  blockActivityReader,
  formatDate,
}) {
  const [commentDraft, setCommentDraft] = useState("")
  const [commentMessage, setCommentMessage] = useState("")
  const [commentPending, setCommentPending] = useState(false)
  const [visibleCommentCount, setVisibleCommentCount] = useState(3)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentBody, setEditingCommentBody] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [safetyMessage, setSafetyMessage] = useState("")
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false)
  const comments = event.comments || []
  const visibleComments = comments.slice(-visibleCommentCount)

  async function submitComment(eventObject) {
    eventObject.preventDefault()
    setCommentPending(true)
    setCommentMessage("")
    const result = await addActivityComment(event, commentDraft)
    setCommentPending(false)
    if (!result.ok) {
      setCommentMessage(result.error)
      return
    }
    setCommentDraft("")
  }

  async function saveComment(commentId) {
    setCommentPending(true)
    const result = await updateActivityComment(commentId, editingCommentBody)
    setCommentPending(false)
    if (!result.ok) {
      setCommentMessage(result.error)
      return
    }
    setEditingCommentId(null)
    setEditingCommentBody("")
  }

  async function removeComment(commentId) {
    setCommentPending(true)
    const result = await deleteActivityComment(commentId)
    setCommentPending(false)
    if (!result.ok) setCommentMessage(result.error)
    setDeleteConfirmId(null)
  }

  async function submitReport(reportEvent) {
    reportEvent.preventDefault()
    const reason = new FormData(reportEvent.currentTarget).get("reason")
    const result = await reportActivity(event, reason)
    setSafetyMessage(result.ok ? "Report saved for review." : result.error)
  }

  async function confirmBlock() {
    const result = await blockActivityReader(event)
    setSafetyMessage(result.ok ? "Reader blocked. Their updates are now hidden." : result.error)
    setBlockConfirmOpen(false)
  }

  return (
    <section className="activity-social" aria-label="Community interactions">
      <div className="activity-social__primary-actions">
        <button
          type="button"
          className={event.hasLiked ? "paper-button activity-like-button liked" : "paper-button activity-like-button"}
          onClick={() => toggleActivityLike(event)}
        >
          {event.hasLiked ? "♡ Liked" : "♡ Like"}
          <span>{Number(event.likeCount || 0)}</span>
        </button>

        <button
          type="button"
          className={event.hasSaved ? "paper-button activity-save-button saved" : "paper-button activity-save-button"}
          disabled={!available}
          onClick={() => toggleActivitySave(event)}
        >
          {event.hasSaved ? "◇ Saved" : "◇ Save"}
          <span>{Number(event.saveCount || 0)}</span>
        </button>

        <span className="activity-social__comment-count">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {available ? (
        <>
          <fieldset className="activity-social__reactions">
            <legend>Leave a reaction</legend>
            {REACTIONS.map(([value, symbol, label]) => (
              <button
                type="button"
                key={value}
                className={event.currentReaction === value ? "is-active" : ""}
                aria-pressed={event.currentReaction === value}
                aria-label={`${label} reaction, ${Number(event.reactionCounts?.[value] || 0)}`}
                onClick={() => setActivityReaction(event, value)}
              >
                <span aria-hidden="true">{symbol}</span>
                <small>{Number(event.reactionCounts?.[value] || 0)}</small>
              </button>
            ))}
          </fieldset>

          {comments.length > 0 && (
            <div className="activity-social__comments">
              {comments.length > visibleCommentCount && (
                <button
                  type="button"
                  className="activity-social__expand"
                  onClick={() => setVisibleCommentCount((current) => Math.min(comments.length, current + 5))}
                >
                  Show {Math.min(5, comments.length - visibleCommentCount)} older comments
                </button>
              )}
              {comments.length > 3 && visibleCommentCount >= comments.length && (
                <button type="button" className="activity-social__expand" onClick={() => setVisibleCommentCount(3)}>
                  Show recent comments
                </button>
              )}

              {visibleComments.map((comment) => (
                <article key={comment.id} className="activity-social__comment">
                  <div>
                    <strong>{getCommenterName(comment)}</strong>
                    <time>{comment.created_at ? formatDate(comment.created_at) : ""}</time>
                  </div>

                  {editingCommentId === comment.id ? (
                    <div className="activity-social__edit-row">
                      <label>
                        Edit comment
                        <textarea
                          value={editingCommentBody}
                          maxLength={500}
                          onChange={(changeEvent) => setEditingCommentBody(changeEvent.target.value)}
                        />
                      </label>
                      <button type="button" disabled={commentPending} onClick={() => saveComment(comment.id)}>Save edit</button>
                      <button type="button" onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p>{comment.body}</p>
                  )}

                  {comment.isOwnComment && editingCommentId !== comment.id && (
                    <div className="activity-social__comment-actions">
                      <button type="button" onClick={() => {
                        setEditingCommentId(comment.id)
                        setEditingCommentBody(comment.body)
                      }}>Edit</button>
                      {deleteConfirmId === comment.id ? (
                        <>
                          <button type="button" disabled={commentPending} onClick={() => removeComment(comment.id)}>Confirm delete</button>
                          <button type="button" onClick={() => setDeleteConfirmId(null)}>Keep it</button>
                        </>
                      ) : (
                        <button type="button" onClick={() => setDeleteConfirmId(comment.id)}>Delete</button>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          <form className="activity-social__comment-form" onSubmit={submitComment}>
            <label>
              Add a comment
              <textarea
                value={commentDraft}
                maxLength={500}
                placeholder="Leave a thoughtful note…"
                onChange={(changeEvent) => setCommentDraft(changeEvent.target.value)}
              />
            </label>
            <div>
              <small>{commentDraft.length}/500</small>
              <button type="submit" disabled={commentPending || !commentDraft.trim()}>
                {commentPending ? "Pressing note…" : "Post comment"}
              </button>
            </div>
          </form>

          {!event.isOwnActivity && (
            <details className="activity-social__safety">
              <summary>Safety options</summary>
              <form onSubmit={submitReport}>
                <label>
                  Report reason
                  <select name="reason" defaultValue="spam">
                    <option value="spam">Spam</option>
                    <option value="harassment">Harassment</option>
                    <option value="hate">Hate or abuse</option>
                    <option value="privacy">Privacy concern</option>
                    <option value="other">Other concern</option>
                  </select>
                </label>
                <button type="submit">Report update</button>
              </form>
              {blockConfirmOpen ? (
                <div className="activity-social__block-confirm">
                  <p>Block this reader and hide their updates from your feed?</p>
                  <button type="button" onClick={confirmBlock}>Confirm block</button>
                  <button type="button" onClick={() => setBlockConfirmOpen(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" onClick={() => setBlockConfirmOpen(true)}>Block reader</button>
              )}
              {safetyMessage && <p role="status">{safetyMessage}</p>}
            </details>
          )}
        </>
      ) : null}

      {commentMessage && <p className="activity-social__message" role="status">{commentMessage}</p>}
    </section>
  )
}
