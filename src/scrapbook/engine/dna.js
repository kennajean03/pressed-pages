import {
  createScrapbookSeed,
  seededChoice,
  seededOffset,
  seededRotation,
} from "./seed"

export const scrapbookObjectTypes = {
  book: "book",
  section: "section",
  paper: "paper",
  tab: "tab",
  botanical: "botanical",
  polaroid: "polaroid",
  achievement: "achievement",
  buddyRead: "buddyRead",
  annualPage: "annualPage",
  quote: "quote",
  journalEntry: "journalEntry",
  statistic: "statistic",
}

export function createScrapbookDNA({
  id = "pressed-pages",
  type = scrapbookObjectTypes.paper,
  variant = "default",
} = {}) {
  const seed = createScrapbookSeed(`${type}-${variant}-${id}`)

  return {
    identity: {
      id,
      type,
      variant,
      seed,
    },

    layout: {
      rotation: seededRotation(seed + 1, 1.1),
      offsetX: seededOffset(seed + 2, 3),
      offsetY: seededOffset(seed + 3, 3),
      lift: seededChoice(seed + 11, ["soft", "medium"]),
    },

    paper: {
      variant: seededChoice(seed + 4, ["01", "02", "03"]),
      curl: seededChoice(seed + 10, ["none", "soft", "medium"]),
      fold: seededChoice(seed + 12, ["none", "top-right", "bottom-left"]),
    },

    tape: {
      variant: seededChoice(seed + 5, ["01", "02", "03"]),
      angle: seededChoice(seed + 13, ["left", "right", "straight"]),
    },

    flower: {
      variant: seededChoice(seed + 6, ["01", "02", "03"]),
      corner: seededChoice(seed + 9, [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ]),
    },

    clip: {
      variant: seededChoice(seed + 7, ["01", "02"]),
      corner: seededChoice(seed + 14, ["top-left", "top-right"]),
    },

    texture: {
      stain: seededChoice(seed + 8, ["none", "coffee-01", "tea-01"]),
      grain: seededChoice(seed + 15, ["fine", "soft", "rough"]),
    },
  }
}