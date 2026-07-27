import test from "node:test"
import assert from "node:assert/strict"

import {
  normalizeBookInfoForStatus,
  normalizeReviewForDisplay,
} from "../src/domain/reviews/reviewModel.js"

const now = "2026-07-27T12:00:00.000Z"

test("TBR books do not receive reading dates or progress", () => {
  const result = normalizeBookInfoForStatus(
    {
      title: "Waiting Book",
      status: "TBR",
      currentPage: "20",
      dateStarted: now,
      dateFinished: now,
    },
    {},
    now
  )

  assert.equal(result.currentPage, "")
  assert.equal(result.dateStarted, "")
  assert.equal(result.dateFinished, "")
})

test("moving a TBR book to Reading starts it and clears Next 5", () => {
  const result = normalizeBookInfoForStatus(
    {
      status: "Reading",
      nextFiveRank: 1,
    },
    {
      status: "TBR",
      nextFiveRank: 1,
    },
    now
  )

  assert.equal(result.dateStarted, now)
  assert.equal(result.dateFinished, "")
  assert.equal(result.nextFiveRank, null)
})

test("finishing a book fills progress and completion dates", () => {
  const result = normalizeBookInfoForStatus(
    {
      status: "Finished",
      totalPages: "400",
    },
    {
      status: "Reading",
      dateStarted: "2026-07-20T12:00:00.000Z",
    },
    now
  )

  assert.equal(result.currentPage, "400")
  assert.equal(result.dateStarted, "2026-07-20T12:00:00.000Z")
  assert.equal(result.dateFinished, now)
})

test("shelf-only reviews do not retain finished-review fields", () => {
  const result = normalizeReviewForDisplay({
    id: "reading-1",
    bookInfo: {
      status: "Reading",
    },
    scores: { plot: 5 },
    tropes: ["Slow Burn"],
  })

  assert.equal(result.scores, null)
  assert.deepEqual(result.tropes, [])
  assert.equal(result.review, null)
})
