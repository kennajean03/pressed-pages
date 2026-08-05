import { classicTheme } from "./classic"
import { romanceTheme } from "./romance"
import { sageTheme } from "./sage"

export const scrapbookThemes = {
  classic: classicTheme,
  romance: romanceTheme,
  sage: sageTheme,
}

export function getScrapbookTheme(theme = "classic") {
  return scrapbookThemes[theme] || classicTheme
}
