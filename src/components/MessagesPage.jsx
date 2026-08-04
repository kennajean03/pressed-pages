import { useMemo, useState } from "react"
import CommunityNav from "./CommunityNav"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import {
  DIRECT_MESSAGE_MAX_LENGTH,
  canReplyToConversation,
  getDirectMessagePartner,
} from "../domain/community/directMessages"

const REPORT_REASONS = [
  ["spam", "Spam"],
  ["harassment", "Harassment"],
  ["hate", "Hate or abuse"],
  ["privacy", "Privacy concern"],
  ["other", "Other"],
]

export default function MessagesPage({
  user,
  conversations,
  selectedConversationId,
  messageDraftTarget,
  messagesLoading,
  messagesMessage,
  messagesStatus,
  loadDirectMessages,
  selectDirectConversation,
  sendDirectMessage,
  respondToMessageRequest,
  closeDirectConversation,
  reportDirectMessage,
  blockMessageReader,
  clearMessageDraftTarget,
  setStep,
}) {
  const [body, setBody] = useState("")
  const [busy, setBusy] = useState(false)
  const [localMessage, setLocalMessage] = useState("")
  const [showSafety, setShowSafety] = useState(false)
  const [reportMessageId, setReportMessageId] = useState("")
  const [reportReason, setReportReason] = useState("spam")

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId) || null,
    [conversations, selectedConversationId]
  )
  const partner = selectedConversation
    ? getDirectMessagePartner(selectedConversation, user?.id)
    : messageDraftTarget
  const selectedMessages = selectedConversation?.messages || []
  const canReply = selectedConversation
    ? canReplyToConversation(selectedConversation, user?.id)
    : Boolean(messageDraftTarget)
  const isIncomingRequest = Boolean(
    selectedConversation?.status === "pending" &&
      selectedConversation.recipient_id === user?.id
  )

  async function handleSend(event) {
    event.preventDefault()
    setBusy(true)
    setLocalMessage("")
    const result = await sendDirectMessage({
      conversation: selectedConversation,
      targetReader: messageDraftTarget,
      body,
    })
    setBusy(false)
    if (result?.ok) {
      setBody("")
      clearMessageDraftTarget()
    } else {
      setLocalMessage(result?.error || "The message could not be sent.")
    }
  }

  async function handleResponse(status) {
    setBusy(true)
    const result = await respondToMessageRequest(selectedConversation, status)
    setBusy(false)
    setLocalMessage(result?.ok ? "" : result?.error || "The request could not be updated.")
  }

  async function handleReport(event) {
    event.preventDefault()
    const result = await reportDirectMessage(reportMessageId, reportReason)
    setLocalMessage(result?.ok ? "Report saved privately for review." : result?.error || "The report could not be saved.")
    if (result?.ok) setReportMessageId("")
  }

  return (
    <section className="messages-page scrapbook-page scrapbook-section">
      <ScrapbookPanel recipe="notifications.hero" className="messages-hero">
        <p className="scrapbook-kicker">Reader correspondence</p>
        <h1>Messages</h1>
        <p>Private notes begin as requests. You decide who enters your reading circle.</p>
      </ScrapbookPanel>

      <CommunityNav active="messages" setStep={setStep} />

      {!user && (
        <PaperCard className="community-state-paper">
          <p>Log in to open your message folio.</p>
        </PaperCard>
      )}

      {user && messagesStatus === "unavailable" && (
        <PaperCard className="community-state-paper" role="status">
          <strong>Message folio awaiting activation</strong>
          <p>Apply the Phase 18B database migration before private messages can be used.</p>
        </PaperCard>
      )}

      {user && messagesStatus !== "unavailable" && (
        <>
          <div className="messages-toolbar">
            <div>
              <p className="scrapbook-kicker">Private & request-gated</p>
              <h2>Your correspondence</h2>
            </div>
            <button type="button" className="paper-button paper-button--quiet" onClick={() => loadDirectMessages(user)}>
              Refresh messages
            </button>
          </div>

          {(messagesMessage || localMessage) && (
            <PaperCard className="community-state-paper" role="status" aria-live="polite">
              <p>{localMessage || messagesMessage}</p>
            </PaperCard>
          )}

          <div className="messages-workspace">
            <aside className="messages-index" aria-label="Conversations">
              <p className="scrapbook-kicker">Inbox</p>
              {messagesLoading && <p>Opening message pockets…</p>}
              {!messagesLoading && !conversations.length && !messageDraftTarget && (
                <div className="messages-empty-index">
                  <strong>No messages yet.</strong>
                  <p>Find a public reader to begin a request.</p>
                  <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("findReaders")}>
                    Find readers
                  </button>
                </div>
              )}
              {messageDraftTarget && (
                <button type="button" className="messages-index-card is-active" aria-current="true">
                  <span className="messages-index-avatar" aria-hidden="true">✉</span>
                  <span><strong>@{messageDraftTarget.username || "reader"}</strong><small>New request</small></span>
                </button>
              )}
              {conversations.map((conversation) => {
                const conversationPartner = getDirectMessagePartner(conversation, user.id)
                return (
                  <button
                    type="button"
                    key={conversation.id}
                    className={`messages-index-card ${conversation.id === selectedConversationId && !messageDraftTarget ? "is-active" : ""}`}
                    aria-current={conversation.id === selectedConversationId && !messageDraftTarget ? "true" : undefined}
                    onClick={() => selectDirectConversation(conversation.id)}
                  >
                    <span className="messages-index-avatar">
                      {conversationPartner?.avatarUrl ? <img src={conversationPartner.avatarUrl} alt="" /> : "✉"}
                    </span>
                    <span>
                      <strong>{conversationPartner?.displayName || `@${conversationPartner?.username || "reader"}`}</strong>
                      <small>{conversation.status === "pending" ? "Message request" : conversation.lastMessagePreview || "Open conversation"}</small>
                    </span>
                    {conversation.unreadCount > 0 && <b aria-label={`${conversation.unreadCount} unread`}>{conversation.unreadCount}</b>}
                  </button>
                )
              })}
            </aside>

            <ScrapbookPanel recipe="notifications.summary" className="messages-thread">
              {!partner ? (
                <div className="messages-thread-empty">
                  <p className="scrapbook-kicker">Choose a letter</p>
                  <h2>Your messages stay private.</h2>
                  <p>Open a conversation from the inbox or find a reader to send a request.</p>
                </div>
              ) : (
                <>
                  <header className="messages-thread-header">
                    <div>
                      <p className="scrapbook-kicker">Correspondence with</p>
                      <h2>{partner.displayName || `@${partner.username || "reader"}`}</h2>
                      <p>@{partner.username || "reader"}</p>
                    </div>
                    <button type="button" className="paper-button paper-button--quiet" onClick={() => setShowSafety((current) => !current)}>
                      Safety
                    </button>
                  </header>

                  {showSafety && selectedConversation && (
                    <div className="messages-safety-panel">
                      <p>Closing keeps the record but stops replies. Blocking also hides this reader across community spaces.</p>
                      <button type="button" onClick={() => closeDirectConversation(selectedConversation)}>Close conversation</button>
                      <button type="button" className="messages-danger-button" onClick={() => blockMessageReader(selectedConversation)}>Block reader</button>
                    </div>
                  )}

                  {isIncomingRequest && (
                    <div className="messages-request-banner">
                      <strong>Message request</strong>
                      <p>Accept to reply, or decline without opening a conversation.</p>
                      <div>
                        <button type="button" disabled={busy} onClick={() => handleResponse("accepted")}>Accept request</button>
                        <button type="button" disabled={busy} onClick={() => handleResponse("declined")}>Decline</button>
                      </div>
                    </div>
                  )}

                  <div className="messages-thread-list" aria-live="polite">
                    {!selectedMessages.length && (
                      <p className="messages-thread-intro">
                        {messageDraftTarget
                          ? "Introduce yourself with one thoughtful note. They can accept before either of you continue."
                          : "This message pocket is quiet."}
                      </p>
                    )}
                    {selectedMessages.map((message) => (
                      <article key={message.id} className={message.sender_id === user.id ? "is-mine" : "is-theirs"}>
                        <p>{message.body}</p>
                        <footer>
                          <time>{new Date(message.created_at).toLocaleString()}</time>
                          {message.sender_id === user.id && <span>{message.read_at ? "Read" : "Sent"}</span>}
                          {message.sender_id !== user.id && (
                            <button type="button" onClick={() => setReportMessageId(message.id)}>Report</button>
                          )}
                        </footer>
                      </article>
                    ))}
                  </div>

                  {reportMessageId && (
                    <form className="messages-report-form" onSubmit={handleReport}>
                      <label>
                        Report reason
                        <select value={reportReason} onChange={(event) => setReportReason(event.target.value)}>
                          {REPORT_REASONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                        </select>
                      </label>
                      <button type="submit">Submit private report</button>
                      <button type="button" onClick={() => setReportMessageId("")}>Cancel</button>
                    </form>
                  )}

                  {canReply && !isIncomingRequest && selectedConversation?.status !== "closed" && (
                    <form className="messages-composer" onSubmit={handleSend}>
                      <label htmlFor="direct-message-body">Write a private message</label>
                      <textarea
                        id="direct-message-body"
                        value={body}
                        maxLength={DIRECT_MESSAGE_MAX_LENGTH}
                        onChange={(event) => setBody(event.target.value)}
                        placeholder="Write a thoughtful note…"
                      />
                      <div>
                        <small>{body.length}/{DIRECT_MESSAGE_MAX_LENGTH}</small>
                        <button type="submit" disabled={busy || !body.trim()}>{busy ? "Sending…" : messageDraftTarget ? "Send request" : "Send message"}</button>
                      </div>
                    </form>
                  )}

                  {selectedConversation?.status === "declined" && <p className="messages-closed-note">This request was declined.</p>}
                  {selectedConversation?.status === "closed" && <p className="messages-closed-note">This conversation is closed.</p>}
                </>
              )}
            </ScrapbookPanel>
          </div>
        </>
      )}
    </section>
  )
}
