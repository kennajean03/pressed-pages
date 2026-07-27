import test from "node:test"
import assert from "node:assert/strict"

import {
  getProgressPercent,
  getProgressUnitCopy,
} from "../src/domain/reading/progress.js"

test("progress is clamped and safe for missing totals", () => {
  assert.equal(getProgressPercent({ currentPage: 10 }), 0)
  assert.equal(
    getProgressPercent({ currentPage: 500, totalPages: 400 }),
    100
  )
  assert.equal(
    getProgressPercent({ currentPage: -10, totalPages: 400 }),
    0
  )
})

test("audiobooks use listening language", () => {
  const copy = getProgressUnitCopy({ format: "Audiobook" })

  assert.equal(copy.totalLabel, "Total Minutes")
  assert.equal(copy.progressLine(30, 120), "Minute 30 of 120")
})
