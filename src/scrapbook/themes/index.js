import { classicTheme } from "./classic"
import { romanceTheme } from "./romance"

export const scrapbookThemes = {
  classic: classicTheme,
  romance: romanceTheme,
}

export function getScrapbookTheme(theme = "classic") {
  return scrapbookThemes[theme] || classicTheme
}