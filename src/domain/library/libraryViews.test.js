import test from "node:test"
import assert from "node:assert/strict"
import { normalizeLibraryView } from "./libraryViews.js"

test("keeps the compact grid as the default library view", () => {
  assert.equal(normalizeLibraryView(), "grid")
  assert.equal(normalizeLibraryView("unknown"), "grid")
})

test("accepts the purpose-built shelf view", () => {
  assert.equal(normalizeLibraryView("shelf"), "shelf")
})
