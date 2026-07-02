export const scrapbookObjects = {
  book: {
    paper: true,
    tape: true,
    flower: false,
    clip: false,
    stain: true,
    lift: "soft",
  },

  section: {
    paper: true,
    tape: true,
    flower: true,
    clip: false,
    stain: false,
    lift: "soft",
  },

  notebookTab: {
    paper: false,
    tape: true,
    flower: false,
    clip: false,
    stain: false,
    lift: "none",
  },

  polaroid: {
  paper: true,
  tape: true,
  flower: true,
  clip: true,
  sticker: false,
  stain: false,
  lift: "medium",
},

  achievement: {
    paper: true,
    tape: false,
    flower: false,
    clip: true,
    sticker: true,
    stain: false,
    lift: "medium",
  },

  journalEntry: {
    paper: true,
    tape: false,
    flower: false,
    clip: false,
    stain: true,
    lift: "soft",
  },
}

export function getScrapbookObject(type) {
  return scrapbookObjects[type] ?? scrapbookObjects.book
}