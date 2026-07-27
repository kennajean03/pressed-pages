import test from "node:test"
import assert from "node:assert/strict"

import {
  addReviewToNextFive,
  compactNextFiveReviewRanks,
  getNextFiveReviews,
  removeReviewFromNextFive,
  reorderNextFiveReviews,
} from "../src/domain/reviews/nextFive.js"

const makeTbr = (id, rank = null) => ({
  id,
  bookInfo: {
    title: id,
    status: "TBR",
    nextFiveRank: rank,
  },
})

test("Next 5 is sorted and limited to five books", () => {
  const reviews = [
    makeTbr("six", 6),
    makeTbr("two", 2),
    makeTbr("one", 1),
    makeTbr("five", 5),
    makeTbr("four", 4),
    makeTbr("three", 3),
  ]

  assert.deepEqual(
    getNextFiveReviews(reviews).map((item) => item.id),
    ["one", "two", "three", "four", "five"]
  )
})

test("compaction removes gaps and clears invalid overflow ranks", () => {
  const compacted = compactNextFiveReviewRanks([
    makeTbr("one", 1),
    makeTbr("three", 3),
    makeTbr("overflow", 8),
  ])

  assert.deepEqual(
    compacted.map((item) => item.bookInfo.nextFiveRank),
    [1, 2, 3]
  )
})

test("reordering updates every affected rank", () => {
  const reordered = reorderNextFiveReviews(
    [makeTbr("one", 1), makeTbr("two", 2), makeTbr("three", 3)],
    "three",
    1
  )

  assert.deepEqual(
    getNextFiveReviews(reordered).map((item) => item.id),
    ["three", "one", "two"]
  )
})

test("adding stops at five and removing compacts the shelf", () => {
  const full = [1, 2, 3, 4, 5].map((rank) =>
    makeTbr(`book-${rank}`, rank)
  )
  const unchanged = addReviewToNextFive(
    [...full, makeTbr("six")],
    "six"
  )
  assert.equal(
    unchanged.find((item) => item.id === "six").bookInfo.nextFiveRank,
    null
  )

  const removed = removeReviewFromNextFive(full, "book-2")
  assert.deepEqual(
    getNextFiveReviews(removed).map((item) => item.id),
    ["book-1", "book-3", "book-4", "book-5"]
  )
  assert.deepEqual(
    getNextFiveReviews(removed).map(
      (item) => item.bookInfo.nextFiveRank
    ),
    [1, 2, 3, 4]
  )
})
