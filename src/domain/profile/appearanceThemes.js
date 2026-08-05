export const DEFAULT_APPEARANCE_THEME = "paper-v1"

export const APPEARANCE_THEMES = {
  "paper-v1": {
    id: "paper-v1",
    label: "Paper Light",
    description: "Warm ivory paper with the original archival palette.",
    scrapbookTheme: "classic",
  },
  "rose-letter-v1": {
    id: "rose-letter-v1",
    label: "Rose Letter",
    description: "A soft rose-paper palette with botanical brass accents.",
    scrapbookTheme: "romance",
  },
  "sage-study-v1": {
    id: "sage-study-v1",
    label: "Sage Study",
    description: "A calm sage-and-ink reading desk with warm paper.",
    scrapbookTheme: "sage",
  },
}

export function normalizeAppearanceTheme(value) {
  return Object.hasOwn(APPEARANCE_THEMES, value)
    ? value
    : DEFAULT_APPEARANCE_THEME
}

export function normalizeAppearancePreferences(value = {}) {
  const preferences = value && typeof value === "object" ? value : {}

  return {
    ...preferences,
    theme: normalizeAppearanceTheme(preferences.theme),
    motion: preferences.motion === "reduced" ? "reduced" : "full",
    density: preferences.density === "compact" ? "compact" : "cozy",
  }
}

export function getScrapbookThemeForAppearance(value) {
  return APPEARANCE_THEMES[normalizeAppearanceTheme(value)].scrapbookTheme
}
