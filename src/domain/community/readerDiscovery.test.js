import test from "node:test"
import assert from "node:assert/strict"
import {
  getDiscoveryPageCount,
  getReaderDiscoveryReasons,
  normalizeReaderDiscoveryProfile,
} from "./readerDiscovery.js"

test("normalizes discovery preferences to approved, unique public values", () => {
  assert.deepEqual(normalizeReaderDiscoveryProfile({
    is_discoverable: true,
    genres: ["Fantasy", "Fantasy", "Private genre"],
    reading_styles: ["Mood reader"],
  }), {
    isDiscoverable: true,
    genres: ["Fantasy"],
    formats: [],
    vibes: [],
    readingStyles: ["Mood reader"],
  })
})

test("explains filtered results using only the reader's public selections", () => {
  assert.deepEqual(getReaderDiscoveryReasons({
    discoveryData: { genres: ["Fantasy"], vibes: ["Cozy"] },
  }, { genre: "Fantasy", format: "", vibe: "Cozy", readingStyle: "" }), [
    "Shared public taste: Fantasy",
    "Shared public taste: Cozy",
  ])
})

test("calculates a stable minimum page count", () => {
  assert.equal(getDiscoveryPageCount(0), 1)
  assert.equal(getDiscoveryPageCount(25), 3)
})
