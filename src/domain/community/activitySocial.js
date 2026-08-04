export const ACTIVITY_REACTION_TYPES = ["heart", "spark", "laugh", "cry", "spicy"]

export function normalizeActivityCommentBody(value, maxLength = 500) {
  const body = String(value || "").trim()
  if (!body || body.length > maxLength) {
    return {
      ok: false,
      body,
      error: `Comments must be between 1 and ${maxLength} characters.`,
    }
  }
  return { ok: true, body, error: "" }
}

export function applyActivityReactionChange(counts, previousReaction, nextReaction) {
  const nextCounts = { ...(counts || {}) }

  if (previousReaction) {
    nextCounts[previousReaction] = Math.max(0, Number(nextCounts[previousReaction] || 0) - 1)
  }
  if (nextReaction) {
    nextCounts[nextReaction] = Number(nextCounts[nextReaction] || 0) + 1
  }

  return nextCounts
}
