export const DIRECT_MESSAGE_MAX_LENGTH = 2000

export function normalizeDirectMessageBody(value) {
  const body = String(value || "").trim()

  if (!body) {
    return { ok: false, body: "", error: "Write a message before sending it." }
  }

  if (body.length > DIRECT_MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      body,
      error: `Messages can be up to ${DIRECT_MESSAGE_MAX_LENGTH.toLocaleString()} characters.`,
    }
  }

  return { ok: true, body, error: "" }
}

export function getDirectMessagePartner(conversation, currentUserId) {
  if (!conversation || !currentUserId) return null
  return conversation.requester_id === currentUserId
    ? conversation.recipientProfile || null
    : conversation.requesterProfile || null
}

export function canReplyToConversation(conversation, currentUserId) {
  if (!conversation || !currentUserId) return false
  if (conversation.status === "accepted") return true
  return (
    conversation.status === "pending" &&
    conversation.requester_id === currentUserId &&
    Number(conversation.messageCount || 0) === 0
  )
}
