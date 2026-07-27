export const LOCAL_REVIEWS_KEY = "brainChemistryBooksReviews"

export function loadReviewsFromStorage({
  storage,
  key = LOCAL_REVIEWS_KEY,
  normalize = (item) => item,
  onError,
} = {}) {
  if (!storage) return []

  try {
    const saved = storage.getItem(key)
    const parsedReviews = saved ? JSON.parse(saved) : []

    return Array.isArray(parsedReviews)
      ? parsedReviews.map(normalize)
      : []
  } catch (error) {
    onError?.(error)
    return []
  }
}

export function saveReviewsToLocalStorage({
  storage,
  reviews,
  key = LOCAL_REVIEWS_KEY,
  onError,
} = {}) {
  if (!storage) {
    const error = new Error("Browser storage is unavailable.")
    onError?.(error)
    return { ok: false, error }
  }

  try {
    storage.setItem(
      key,
      JSON.stringify(Array.isArray(reviews) ? reviews : [])
    )
    return { ok: true, error: null }
  } catch (error) {
    onError?.(error)
    return { ok: false, error }
  }
}

export function removeLocalReviews({
  storage,
  key = LOCAL_REVIEWS_KEY,
  onError,
} = {}) {
  try {
    storage?.removeItem(key)
    return { ok: true, error: null }
  } catch (error) {
    onError?.(error)
    return { ok: false, error }
  }
}

export function buildCloudReviewRows({
  reviews = [],
  userId,
  prepareReview = (item) => item,
  updatedAt = new Date().toISOString(),
} = {}) {
  if (!userId) return []

  return reviews.filter(Boolean).map((review) => ({
    id: review.id,
    user_id: userId,
    review_data: prepareReview(review),
    updated_at: updatedAt,
  }))
}

export async function withRetry(
  operation,
  {
    attempts = 3,
    delayMs = 150,
    shouldRetry = () => true,
  } = {}
) {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation(attempt)
    } catch (error) {
      lastError = error

      if (attempt >= attempts || !shouldRetry(error)) {
        throw error
      }

      await new Promise((resolve) => {
        setTimeout(resolve, delayMs * attempt)
      })
    }
  }

  throw lastError
}

export function isRetryableCloudError(error) {
  const status = Number(error?.status || error?.statusCode || 0)
  const message = String(error?.message || "").toLowerCase()

  return (
    status >= 500 ||
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("timeout") ||
    message.includes("temporarily unavailable")
  )
}

export async function upsertCloudReviewRows({
  client,
  rows = [],
  attempts = 2,
} = {}) {
  if (!client || !rows.length) {
    return { ok: true, error: null }
  }

  try {
    await withRetry(
      async () => {
        const { error } = await client
          .from("reviews")
          .upsert(rows)

        if (error) throw error
      },
      {
        attempts,
        shouldRetry: isRetryableCloudError,
      }
    )

    return { ok: true, error: null }
  } catch (error) {
    return { ok: false, error }
  }
}
