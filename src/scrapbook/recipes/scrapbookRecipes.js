export const scrapbookRecipeTypes = {
  readingState: "readingState",
  genre: "genre",
  seasonal: "seasonal",
  occasion: "occasion",
}

export const scrapbookAnchorTypes = {
  tape: "tape",
  flower: "flower",
  clip: "clip",
  ephemera: "ephemera",
  texture: "texture",
  handwriting: "handwriting",
  bookmark: "bookmark",
  fold: "fold",
}

export const scrapbookRecipes = {
  currentlyReading: {
  id: "currently-reading",
  type: scrapbookRecipeTypes.readingState,
  feeling: "possibility",
  story: "A fresh page for the book currently holding the reader's attention.",
  paper: "cream",
  paperIntent: "freshReadable",
  compositionMood: "hopeful",
  aging: "fresh",
    anchors: ["topTape", "bookmark", "softFlower"],
    atmosphere: {
  light: "morning",
  warmth: "soft",
  clutter: "minimal",
},
    layout: {
      cover: "slightlyRaised",
      overlap: "gentle",
      density: "light",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["heavyAging", "crowdedCorners"],
    },
  },

  finishedBook: {
  id: "finished-book",
  type: scrapbookRecipeTypes.readingState,
  feeling: "kept",
  story: "A completed reading memory preserved before the feeling fades.",
  paper: "aged",
  paperIntent: "warmMemory",
  compositionMood: "nostalgic",
  aging: "light",
    anchors: ["dateStamp", "pressedFlower", "reviewNote"],
    atmosphere: {
  light: "goldenHour",
  warmth: "warm",
  clutter: "collected",
},
    layout: {
      cover: "tucked",
      overlap: "medium",
      density: "medium",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["emptyLowerCorner"],
    },
  },

 cozyRomance: {
  id: "cozy-romance",
  type: scrapbookRecipeTypes.genre,
  feeling: "warm",
  story: "Soft, romantic, familiar, and a little sentimental.",
  paper: "cream",
  paperIntent: "softCozy",
  compositionMood: "cozy",
  aging: "soft",
    anchors: ["roseTape", "pressedDaisy", "bookmark"],
    atmosphere: {
  light: "windowLight",
  warmth: "cozy",
  clutter: "gentle",
},
    layout: {
      cover: "slightlyCrooked",
      overlap: "soft",
      density: "medium",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["sharpMetal", "darkHeavyTexture"],
    },
  },

  fantasyArchive: {
  id: "fantasy-archive",
  type: scrapbookRecipeTypes.genre,
  feeling: "enchanted",
  story: "A found page from an old library journal.",
  paper: "aged",
  paperIntent: "archivalStory",
  compositionMood: "mysterious",
  aging: "medium",
    anchors: ["brassClip", "pressedFern", "libraryCard"],
    atmosphere: {
  light: "candlelight",
  warmth: "aged",
  clutter: "layered",
},
    layout: {
      cover: "tucked",
      overlap: "layered",
      density: "medium",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["neonTape", "overlyCleanEdges"],
    },
  },

 vintageLibrary: {
  id: "vintage-library",
  type: scrapbookRecipeTypes.occasion,
  feeling: "remembered",
  story: "A book memory filed away like a treasured library card.",
  paper: "linen",
  paperIntent: "libraryArchive",
  compositionMood: "archival",
  aging: "medium",
    anchors: ["libraryCard", "dateStamp", "brassClip"],
    atmosphere: {
  light: "library",
  warmth: "archival",
  clutter: "organized",
},
    layout: {
      cover: "archived",
      overlap: "structured",
      density: "medium",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["twoClipsSameCorner", "flowerCrowdingText"],
    },
  },

  springJournal: {
  id: "spring-journal",
  type: scrapbookRecipeTypes.seasonal,
  feeling: "new",
  story: "A fresh seasonal page with soft botanical traces.",
  paper: "cream",
  paperIntent: "freshBotanical",
  compositionMood: "fresh",
  aging: "fresh",
    anchors: ["pressedDaisy", "sageTape", "pencilNote"],
    atmosphere: {
  light: "springMorning",
  warmth: "fresh",
  clutter: "airy",
},
    layout: {
      cover: "freshlyPlaced",
      overlap: "light",
      density: "light",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["coffeeRing", "heavyAging"],
    },
  },

annualScrapbook: {
  id: "annual-scrapbook",
  type: scrapbookRecipeTypes.occasion,
  feeling: "home",
  story: "A yearly volume assembled from the memories the reader chose to keep.",
  paper: "aged",
  paperIntent: "heirloomKeepsake",
  specialtyPaper: "fadedLetter",
  compositionMood: "heirloom",
  aging: "livedIn",
    anchors: ["signatureFlower", "coverMosaic", "annualMemoryNote"],
    atmosphere: {
  light: "evening",
  warmth: "home",
  clutter: "full",
},
    layout: {
      cover: "ceremonial",
      overlap: "intentional",
      density: "rich",
    },
    rules: {
      maxPrimaryAnchors: 3,
      preserveReaderVoice: true,
      avoid: ["aiWrittenFinalWord"],
    },
  },
}

export function getScrapbookRecipe(recipeId) {
  return scrapbookRecipes[recipeId] || scrapbookRecipes.currentlyReading
}

export function getScrapbookRecipesByType(type) {
  return Object.values(scrapbookRecipes).filter((recipe) => recipe.type === type)
}

export function resolveScrapbookRecipe({
  readingState,
  genre,
  season,
  occasion,
} = {}) {
  if (occasion === "annualScrapbook") return scrapbookRecipes.annualScrapbook
  if (genre === "fantasy") return scrapbookRecipes.fantasyArchive
  if (genre === "romance") return scrapbookRecipes.cozyRomance
  if (season === "spring") return scrapbookRecipes.springJournal
  if (readingState === "finished") return scrapbookRecipes.finishedBook

  return scrapbookRecipes.currentlyReading
}