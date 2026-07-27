import test from "node:test"
import assert from "node:assert/strict"

import {
  buildCloudReviewRows,
  getCloudErrorMessage,
  isRetryableCloudError,
  loadReviewsFromStorage,
  saveReviewsToLocalStorage,
  updateCloudReviewRow,
  upsertCloudReviewRows,
  withRetry,
} from "../src/lib/reviewStorage.js"

function createMemoryStorage(initialValue = null) {
  let value = initialValue

  return {
    getItem: () => value,
    setItem: (_key, nextValue) => {
      value = nextValue
    },
    removeItem: () => {
      value = null
    },
  }
}

test("corrupted local data safely returns an empty library", () => {
  const storage = createMemoryStorage("{not-json")
  let reportedError = null
  const reviews = loadReviewsFromStorage({
    storage,
    onError: (error) => {
      reportedError = error
    },
  })

  assert.deepEqual(reviews, [])
  assert.ok(reportedError)
})

test("local writes report quota failures", () => {
  const storage = {
    setItem: () => {
      throw new Error("Quota exceeded")
    },
  }

  const result = saveReviewsToLocalStorage({
    storage,
    reviews: [{ id: "one" }],
  })

  assert.equal(result.ok, false)
  assert.match(result.error.message, /Quota/)
})

test("cloud rows keep ownership and prepared review data", () => {
  const rows = buildCloudReviewRows({
    reviews: [{ id: "one", title: "Book" }],
    userId: "reader-1",
    prepareReview: (review) => ({ ...review, cleaned: true }),
    updatedAt: "now",
  })

  assert.deepEqual(rows, [
    {
      id: "one",
      user_id: "reader-1",
      review_data: {
        id: "one",
        title: "Book",
        cleaned: true,
      },
      updated_at: "now",
    },
  ])
})

test("retry recovers from a transient failure", async () => {
  let attempts = 0
  const result = await withRetry(
    async () => {
      attempts += 1
      if (attempts < 2) throw new Error("Temporary")
      return "saved"
    },
    { delayMs: 0 }
  )

  assert.equal(result, "saved")
  assert.equal(attempts, 2)
})

test("cloud error classification retries only transient failures", () => {
  assert.equal(
    isRetryableCloudError({ message: "Network request failed" }),
    true
  )
  assert.equal(
    isRetryableCloudError({ status: 503, message: "Unavailable" }),
    true
  )
  assert.equal(
    isRetryableCloudError({ status: 401, message: "Unauthorized" }),
    false
  )
})

test("cloud upserts retry a transient response", async () => {
  let attempts = 0
  const client = {
    from: () => ({
      upsert: async () => {
        attempts += 1
        return attempts === 1
          ? {
              error: {
                status: 503,
                message: "Temporarily unavailable",
              },
            }
          : { error: null }
      },
    }),
  }

  const result = await upsertCloudReviewRows({
    client,
    rows: [{ id: "one" }],
  })

  assert.equal(result.ok, true)
  assert.equal(attempts, 2)
})

test("cloud updates retain owner scoping and retry transient failures", async () => {
  let attempts = 0
  const filters = []
  const client = {
    from: () => ({
      update: () => {
        attempts += 1
        const query = {
          error: attempts === 1
            ? { status: 503, message: "Temporarily unavailable" }
            : null,
          eq(field, value) {
            filters.push([field, value])
            return this
          },
          then(resolve) {
            resolve({ error: this.error })
          },
        }
        return query
      },
    }),
  }

  const result = await updateCloudReviewRow({
    client,
    reviewId: "review-1",
    userId: "reader-1",
    reviewData: { id: "review-1" },
  })

  assert.equal(result.ok, true)
  assert.equal(attempts, 2)
  assert.deepEqual(filters.slice(-2), [
    ["id", "review-1"],
    ["user_id", "reader-1"],
  ])
})

test("cloud errors preserve useful messages", () => {
  assert.equal(
    getCloudErrorMessage({ message: "Row violates policy" }),
    "Row violates policy"
  )
})
