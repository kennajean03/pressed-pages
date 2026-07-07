export const scrapbookRecipeTypes = {
  readingState: "readingState",
  genre: "genre",
  seasonal: "seasonal",
  occasion: "occasion",
  profile: "profile",
  community: "community",
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
  paperRole: "base",
  paperIntent: "freshReadable",

  notebookRole: "ruled",
  attachmentRole: "primary",
  botanicalRole: "hero",
  bookmarkRole: "neutral",

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

  "profile.hero": {
    id: "profile-hero",
    type: scrapbookRecipeTypes.profile,
    feeling: "personal",
    story: "The reader's personal scrapbook cover page.",
    paper: "deckled",
    paperIntent: "readerIdentity",
    compositionMood: "warmWelcome",
    aging: "soft",
    anchors: ["topTape", "softFlower"],
    atmosphere: {
      light: "windowLight",
      warmth: "warm",
      clutter: "personal",
    },
    layout: {
      cover: "featured",
      overlap: "gentle",
      density: "feature",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["crowdedText", "heavyAging"],
    },
  },

  "profile.flair": {
    id: "profile-flair",
    type: scrapbookRecipeTypes.profile,
    feeling: "expressive",
    story: "A small collection of reader identity stickers and favorite notes.",
    paper: "notebook",
    paperIntent: "readerFlair",
    compositionMood: "playful",
    aging: "fresh",
    anchors: ["roseTape", "pressedDaisy"],
    atmosphere: {
      light: "soft",
      warmth: "cozy",
      clutter: "collected",
    },
    layout: {
      cover: "none",
      overlap: "soft",
      density: "cozy",
    },
    rules: {
      maxPrimaryAnchors: 2,
      avoid: ["darkHeavyTexture"],
    },
  },

  "profile.snapshot": {
    id: "profile-snapshot",
    type: scrapbookRecipeTypes.profile,
    feeling: "documented",
    story: "A quick reading-life snapshot with stats worth keeping.",
    paper: "journal",
    paperIntent: "readingStats",
    compositionMood: "organized",
    aging: "light",
    anchors: ["sageTape", "pencilNote"],
    atmosphere: {
      light: "morning",
      warmth: "soft",
      clutter: "structured",
    },
    layout: {
      cover: "none",
      overlap: "minimal",
      density: "structured",
    },
    rules: {
      maxPrimaryAnchors: 2,
      avoid: ["crowdedCorners"],
    },
  },

  "profile.public": {
    id: "profile-public",
    type: scrapbookRecipeTypes.profile,
    feeling: "shared",
    story: "A reader-safe public scrapbook link ready to share.",
    paper: "wide",
    paperIntent: "publicSharing",
    compositionMood: "polished",
    aging: "fresh",
    anchors: ["goldTape"],
    atmosphere: {
      light: "clean",
      warmth: "warm",
      clutter: "minimal",
    },
    layout: {
      cover: "none",
      overlap: "minimal",
      density: "simple",
    },
    rules: {
      maxPrimaryAnchors: 1,
      avoid: ["privateNotes", "visualClutter"],
    },
  },

  "profile.private": {
    id: "profile-private",
    type: scrapbookRecipeTypes.profile,
    feeling: "protected",
    story: "A private reader scrapbook kept just for the owner.",
    paper: "wide",
    paperIntent: "privateProfile",
    compositionMood: "quiet",
    aging: "fresh",
    anchors: ["linenTape"],
    atmosphere: {
      light: "soft",
      warmth: "calm",
      clutter: "minimal",
    },
    layout: {
      cover: "none",
      overlap: "minimal",
      density: "simple",
    },
    rules: {
      maxPrimaryAnchors: 1,
      avoid: ["publicBadge"],
    },
  },

  "profile.petals": {
    id: "profile-petals",
    type: scrapbookRecipeTypes.profile,
    feeling: "blooming",
    story: "A pressed-petal record of recent reading days.",
    paper: "notebook",
    paperIntent: "readingBloom",
    compositionMood: "botanical",
    aging: "soft",
    anchors: ["pressedFlower", "sageTape"],
    atmosphere: {
      light: "springMorning",
      warmth: "fresh",
      clutter: "airy",
    },
    layout: {
      cover: "none",
      overlap: "light",
      density: "cozy",
    },
    rules: {
      maxPrimaryAnchors: 2,
      avoid: ["heavyAging"],
    },
  },

  "profile.recentFinished": {
    id: "profile-recent-finished",
    type: scrapbookRecipeTypes.profile,
    feeling: "remembered",
    story: "Recently finished books arranged like a scrapbook shelf.",
    paper: "wide",
    paperIntent: "finishedShelf",
    compositionMood: "nostalgic",
    aging: "light",
    anchors: ["roseTape", "reviewNote"],
    atmosphere: {
      light: "goldenHour",
      warmth: "warm",
      clutter: "collected",
    },
    layout: {
      cover: "shelf",
      overlap: "medium",
      density: "shelf",
    },
    rules: {
      maxPrimaryAnchors: 2,
      avoid: ["emptyLowerCorner"],
    },
  },

  "profile.achievements": {
    id: "profile-achievements",
    type: scrapbookRecipeTypes.profile,
    feeling: "celebrated",
    story: "Achievement stickers displayed like little reading trophies.",
    paper: "journal",
    paperIntent: "achievementShowcase",
    compositionMood: "celebration",
    aging: "soft",
    anchors: ["goldTape", "pressedDaisy"],
    atmosphere: {
      light: "warm",
      warmth: "golden",
      clutter: "festive",
    },
    layout: {
      cover: "none",
      overlap: "soft",
      density: "celebration",
    },
    rules: {
      maxPrimaryAnchors: 3,
      avoid: ["tooFormal", "flatLayout"],
    },
  },

  "community.hero": {
  id: "community-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "gathering",
  story: "A welcome page inviting readers into the community.",
  paper: "deckled",
  paperIntent: "communityWelcome",
  compositionMood: "warmWelcome",
  aging: "soft",
  anchors: ["topTape", "pressedFlower"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "open",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 3,
  },
},

"community.buddyReads": {
  id: "community-buddy-reads",
  type: scrapbookRecipeTypes.community,
  feeling: "shared",
  story: "An invitation to read alongside friends.",
  paper: "cream",
  paperIntent: "sharedReading",
  compositionMood: "friendly",
  aging: "fresh",
  anchors: ["bookmark", "sageTape"],
  atmosphere: {
    light: "windowLight",
    warmth: "cozy",
    clutter: "minimal",
  },
  layout: {
    cover: "none",
    overlap: "light",
    density: "simple",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"community.summary": {
  id: "community-summary",
  type: scrapbookRecipeTypes.community,
  feeling: "progress",
  story: "A quick snapshot of your community activity.",
  paper: "journal",
  paperIntent: "communityStats",
  compositionMood: "organized",
  aging: "light",
  anchors: ["pencilNote", "linenTape"],
  atmosphere: {
    light: "soft",
    warmth: "warm",
    clutter: "structured",
  },
  layout: {
    cover: "none",
    overlap: "minimal",
    density: "structured",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"community.empty": {
  id: "community-empty",
  type: scrapbookRecipeTypes.community,
  feeling: "anticipation",
  story: "An empty place waiting for future reading memories.",
  paper: "notebook",
  paperIntent: "futureMemories",
  compositionMood: "hopeful",
  aging: "fresh",
  anchors: ["topTape"],
  atmosphere: {
    light: "morning",
    warmth: "soft",
    clutter: "minimal",
  },
  layout: {
    cover: "none",
    overlap: "light",
    density: "simple",
  },
  rules: {
    maxPrimaryAnchors: 1,
  },
},

"community.challengeCard": {
  id: "community-challenge-card",
  type: scrapbookRecipeTypes.community,
  feeling: "inviting",
  story: "A community reading prompt saved like a challenge card.",
  paper: "cream",
  paperIntent: "challengePrompt",
  compositionMood: "friendly",
  aging: "fresh",
  anchors: ["sageTape", "pencilNote"],
  atmosphere: {
    light: "windowLight",
    warmth: "cozy",
    clutter: "collected",
  },
  layout: {
    cover: "none",
    overlap: "soft",
    density: "medium",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"community.challengeComplete": {
  id: "community-challenge-complete",
  type: scrapbookRecipeTypes.community,
  feeling: "celebrated",
  story: "A completed community challenge preserved like a reading trophy.",
  paper: "journal",
  paperIntent: "challengeCelebration",
  compositionMood: "celebration",
  aging: "soft",
  anchors: ["goldTape", "pressedDaisy"],
  atmosphere: {
    light: "warm",
    warmth: "golden",
    clutter: "festive",
  },
  layout: {
    cover: "none",
    overlap: "soft",
    density: "celebration",
  },
  rules: {
    maxPrimaryAnchors: 3,
  },
},

"buddyReads.hero": {
  id: "buddy-reads-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "together",
  story: "A shared reading invitation page for friends reading side by side.",
  paper: "deckled",
  paperIntent: "sharedReadingWelcome",
  compositionMood: "warmWelcome",
  aging: "soft",
  anchors: ["topTape", "bookmark"],
  atmosphere: {
    light: "windowLight",
    warmth: "cozy",
    clutter: "personal",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"buddyReads.actions": {
  id: "buddy-reads-actions",
  type: scrapbookRecipeTypes.community,
  feeling: "inviting",
  story: "A cozy prompt to start or refresh shared reading adventures.",
  paper: "cream",
  paperIntent: "buddyReadActions",
  compositionMood: "friendly",
  aging: "fresh",
  anchors: ["sageTape", "pressedDaisy"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "gentle",
  },
  layout: {
    cover: "none",
    overlap: "soft",
    density: "medium",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"activity.hero": {
  id: "activity-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "connected",
  story: "A page collecting reading memories from friends.",
  paper: "deckled",
  paperIntent: "activityWelcome",
  compositionMood: "warmWelcome",
  aging: "soft",
  anchors: ["topTape", "pressedFlower"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "gentle",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"activity.memory": {
  id: "activity-memory",
  type: scrapbookRecipeTypes.community,
  feeling: "shared",
  story: "A friend's reading update preserved like a scrapbook memory.",
  paper: "journal",
  paperIntent: "readingMemory",
  compositionMood: "personal",
  aging: "light",
  anchors: ["linenTape", "pencilNote"],
  atmosphere: {
    light: "windowLight",
    warmth: "cozy",
    clutter: "collected",
  },
  layout: {
    cover: "none",
    overlap: "soft",
    density: "medium",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"readerConnections.hero": {
  id: "reader-connections-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "connected",
  story: "A reader connection list saved like a community address page.",
  paper: "deckled",
  paperIntent: "readerConnections",
  compositionMood: "friendly",
  aging: "soft",
  anchors: ["topTape", "pencilNote"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "organized",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"readerDiscovery.hero": {
  id: "reader-discovery-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "curious",
  story: "A discovery page for finding kindred reader spirits.",
  paper: "deckled",
  paperIntent: "readerDiscovery",
  compositionMood: "friendly",
  aging: "soft",
  anchors: ["topTape", "pressedFlower"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "open",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"publicProfile.hero": {
  id: "public-profile-hero",
  type: scrapbookRecipeTypes.profile,
  feeling: "shared",
  story: "A public-facing reader scrapbook cover page.",
  paper: "deckled",
  paperIntent: "publicReaderIdentity",
  compositionMood: "warmWelcome",
  aging: "soft",
  anchors: ["topTape", "pressedFlower"],
  atmosphere: {
    light: "windowLight",
    warmth: "warm",
    clutter: "personal",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"publicProfile.stats": {
  id: "public-profile-stats",
  type: scrapbookRecipeTypes.profile,
  feeling: "documented",
  story: "A public snapshot of this reader's reading life.",
  paper: "journal",
  paperIntent: "publicReaderStats",
  compositionMood: "organized",
  aging: "light",
  anchors: ["sageTape", "pencilNote"],
  atmosphere: {
    light: "morning",
    warmth: "soft",
    clutter: "structured",
  },
  layout: {
    cover: "none",
    overlap: "minimal",
    density: "structured",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},


"publicProfile.previewHero": {
  id: "public-profile-preview-hero",
  type: scrapbookRecipeTypes.profile,
  feeling: "previewed",
  story: "A preview page for the reader's public scrapbook.",
  paper: "deckled",
  paperIntent: "publicPreview",
  compositionMood: "polished",
  aging: "soft",
  anchors: ["topTape", "softFlower"],
  atmosphere: {
    light: "windowLight",
    warmth: "warm",
    clutter: "personal",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"notifications.hero": {
  id: "notifications-hero",
  type: scrapbookRecipeTypes.community,
  feeling: "connected",
  story: "A community note page for follows, likes, and reader interactions.",
  paper: "deckled",
  paperIntent: "communityNotifications",
  compositionMood: "friendly",
  aging: "soft",
  anchors: ["topTape", "pencilNote"],
  atmosphere: {
    light: "morning",
    warmth: "warm",
    clutter: "organized",
  },
  layout: {
    cover: "featured",
    overlap: "gentle",
    density: "light",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"notifications.unread": {
  id: "notifications-unread",
  type: scrapbookRecipeTypes.community,
  feeling: "new",
  story: "A fresh reader note waiting to be opened.",
  paper: "cream",
  paperIntent: "freshCommunityNote",
  compositionMood: "hopeful",
  aging: "fresh",
  anchors: ["sageTape", "softFlower"],
  atmosphere: {
    light: "morning",
    warmth: "soft",
    clutter: "minimal",
  },
  layout: {
    cover: "none",
    overlap: "light",
    density: "simple",
  },
  rules: {
    maxPrimaryAnchors: 2,
  },
},

"notifications.read": {
  id: "notifications-read",
  type: scrapbookRecipeTypes.community,
  feeling: "kept",
  story: "A community note already tucked into the scrapbook.",
  paper: "journal",
  paperIntent: "keptCommunityNote",
  compositionMood: "quiet",
  aging: "light",
  anchors: ["linenTape"],
  atmosphere: {
    light: "soft",
    warmth: "calm",
    clutter: "minimal",
  },
  layout: {
    cover: "none",
    overlap: "minimal",
    density: "simple",
  },
  rules: {
    maxPrimaryAnchors: 1,
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