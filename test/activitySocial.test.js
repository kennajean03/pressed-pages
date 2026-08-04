import test from "node:test"
import assert from "node:assert/strict"
import {
  ACTIVITY_REACTION_TYPES,
  applyActivityReactionChange,
  normalizeActivityCommentBody,
} from "../src/domain/community/activitySocial.js"

test("activity comments trim whitespace and enforce the saved limit", () => {
  assert.deepEqual(normalizeActivityCommentBody("  lovely review  "), {
    ok: true,
    body: "lovely review",
    error: "",
  })
  assert.equal(normalizeActivityCommentBody("   ").ok, false)
  assert.equal(normalizeActivityCommentBody("x".repeat(501)).ok, false)
})

test("changing a reaction moves exactly one reader reaction between totals", () => {
  assert.deepEqual(
    applyActivityReactionChange({ heart: 2, spark: 1 }, "heart", "spark"),
    { heart: 1, spark: 2 }
  )
  assert.deepEqual(
    applyActivityReactionChange({ heart: 1 }, "heart", ""),
    { heart: 0 }
  )
  assert.deepEqual(ACTIVITY_REACTION_TYPES, ["heart", "spark", "laugh", "cry", "spicy"])
})
