import test from "node:test"
import assert from "node:assert/strict"

import {
  DEFAULT_APPEARANCE_THEME,
  getScrapbookThemeForAppearance,
  normalizeAppearancePreferences,
  normalizeAppearanceTheme,
} from "./appearanceThemes.js"

test("keeps Paper Light as the safe appearance fallback", () => {
  assert.equal(normalizeAppearanceTheme(), DEFAULT_APPEARANCE_THEME)
  assert.equal(normalizeAppearanceTheme("retired-theme-v0"), DEFAULT_APPEARANCE_THEME)
})

test("normalizes persisted appearance preferences without dropping future fields", () => {
  assert.deepEqual(
    normalizeAppearancePreferences({
      theme: "rose-letter-v1",
      motion: "reduced",
      density: "compact",
      futureSetting: "preserved",
    }),
    {
      theme: "rose-letter-v1",
      motion: "reduced",
      density: "compact",
      futureSetting: "preserved",
    }
  )
})

test("maps appearance themes to their semantic scrapbook material sets", () => {
  assert.equal(getScrapbookThemeForAppearance("paper-v1"), "classic")
  assert.equal(getScrapbookThemeForAppearance("rose-letter-v1"), "romance")
  assert.equal(getScrapbookThemeForAppearance("sage-study-v1"), "sage")
})
