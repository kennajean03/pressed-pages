import test from "node:test"
import assert from "node:assert/strict"

import {
  getPageTitle,
  PAGE_BACK_STEPS,
  REVIEW_EDITOR_BACK_STEPS,
} from "./pageNavigation.js"

test("resolves contextual shell page titles", () => {
  assert.equal(getPageTitle("home"), "Home")
  assert.equal(
    getPageTitle("library", undefined, {
      libraryFilter: "tbr",
    }),
    "TBR"
  )
  assert.equal(
    getPageTitle("analytics", undefined, {
      analyticsTab: "wrapUps",
    }),
    "Wrap-Ups"
  )
  assert.equal(
    getPageTitle("readingSummary", "TBR"),
    "TBR Summary"
  )
})

test("keeps editor and detail back destinations explicit", () => {
  assert.equal(REVIEW_EDITOR_BACK_STEPS[4], 3)
  assert.equal(REVIEW_EDITOR_BACK_STEPS.dnfSummary, "dnf")
  assert.equal(PAGE_BACK_STEPS.reviewGraphic, "viewReview")
  assert.equal(PAGE_BACK_STEPS.readingLog, "currentlyReading")
})
