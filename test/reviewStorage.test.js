import test from "node:test"
import assert from "node:assert/strict"

import {
  buildCloudReviewRows,
  isRetryableCloudError,
  loadReviewsFromStorage,
  saveReviewsToLocalStorage,
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
