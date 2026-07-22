export const JOURNEY_LAYOUT_TYPES = {
  hero: "hero",

  journeySummary:
    "journeySummary",

  chapter: "chapter",

  journalPage:
    "journalPage",

  favoriteQuotes:
    "favoriteQuotes",
  keepsakeCollection:
  "keepsakeCollection",

reflection:
  "reflection",

review: "review",

ending: "ending",

  actions: "actions",
}

export const JOURNEY_LAYOUT_ROLES = {
  heroBook:
    "heroBook",

  summary:
    "summary",

  chapterDivider:
    "chapterDivider",

  readingMemory:
    "readingMemory",

  preservedQuote:
  "preservedQuote",

keepsakeCollection:
  "keepsakeCollection",

reflection:
  "reflection",
 
  ending:
   "ending",

   review: "review",

  action:
    "action",
}

const journeyLayoutRegistry = {
  [JOURNEY_LAYOUT_TYPES.hero]: {
    type:
      JOURNEY_LAYOUT_TYPES.hero,

    role:
      JOURNEY_LAYOUT_ROLES
        .heroBook,

    category:
      "opening",

    acceptsStoryChapter:
      true,

    description:
      "Introduces the book journey and presents the primary book identity.",
  },

  [JOURNEY_LAYOUT_TYPES
    .journeySummary]: {
    type:
      JOURNEY_LAYOUT_TYPES
        .journeySummary,

    role:
      JOURNEY_LAYOUT_ROLES
        .summary,

    category:
      "orientation",

    acceptsStoryChapter:
      true,

    description:
      "Summarizes the shape, statistics, and meaning of the reading journey.",
  },

  [JOURNEY_LAYOUT_TYPES.chapter]: {
    type:
      JOURNEY_LAYOUT_TYPES.chapter,

    role:
      JOURNEY_LAYOUT_ROLES
        .chapterDivider,

    category:
      "structure",

    acceptsStoryChapter:
      true,

    description:
      "Separates reading sessions into narrative stages of the journey.",
  },

  [JOURNEY_LAYOUT_TYPES
    .journalPage]: {
    type:
      JOURNEY_LAYOUT_TYPES
        .journalPage,

    role:
      JOURNEY_LAYOUT_ROLES
        .readingMemory,

    category:
      "memory",

    acceptsStoryChapter:
      true,

    description:
      "Renders an individual reading session as a preserved journal memory.",
  },

    [JOURNEY_LAYOUT_TYPES
    .favoriteQuotes]: {
    type:
      JOURNEY_LAYOUT_TYPES
        .favoriteQuotes,

    role:
      JOURNEY_LAYOUT_ROLES
        .preservedQuote,

    category:
      "memory",

    acceptsStoryChapter:
      true,

    description:
      "Preserves favorite quotations selected during the reading journey.",
  },

[JOURNEY_LAYOUT_TYPES
  .keepsakeCollection]: {
  type:
    JOURNEY_LAYOUT_TYPES
      .keepsakeCollection,

  role:
    JOURNEY_LAYOUT_ROLES
      .keepsakeCollection,

  category:
    "memory",

  acceptsStoryChapter:
    true,

  description:
    "Composes preserved reading artifacts into the keepsake pocket for the completed book journey.",
},
[JOURNEY_LAYOUT_TYPES
  .reflection]: {
  type:
    JOURNEY_LAYOUT_TYPES
      .reflection,

  role:
    JOURNEY_LAYOUT_ROLES
      .reflection,

  category:
    "reflection",

  acceptsStoryChapter:
    true,

  description:
    "Presents what the reading experience became and serves as the emotional climax of the Book Journey.",
},

  [JOURNEY_LAYOUT_TYPES.review]: {
    type:
      JOURNEY_LAYOUT_TYPES.review,

    role:
      JOURNEY_LAYOUT_ROLES
        .review,

    category:
      "reflection",

    acceptsStoryChapter:
      true,

    description:
  "Preserves the readers evaluation of the book after the Reflection.",
  },

  [JOURNEY_LAYOUT_TYPES.ending]: {
  type:
    JOURNEY_LAYOUT_TYPES.ending,

  role:
    JOURNEY_LAYOUT_ROLES.ending,

  category:
    "closing",

  acceptsStoryChapter:
    true,

  description:
    "Closes the completed Book Journey after the reflection and review.",
},

  [JOURNEY_LAYOUT_TYPES.actions]: {
    type:
      JOURNEY_LAYOUT_TYPES.actions,

    role:
      JOURNEY_LAYOUT_ROLES
        .action,

    category:
      "utility",

    acceptsStoryChapter:
      false,

    description:
      "Provides available journey actions without representing narrative content.",
  },
}

export function getJourneyLayoutDefinition(
  type
) {
  if (!type) {
    return null
  }

  return (
    journeyLayoutRegistry[
      type
    ] || null
  )
}

export function hasJourneyLayoutType(
  type
) {
  return Boolean(
    getJourneyLayoutDefinition(
      type
    )
  )
}

export function createJourneyLayoutObject({
  id,
  type,
  role,
  storyChapter = null,
  ...data
}) {
  const definition =
    getJourneyLayoutDefinition(
      type
    )

  if (!definition) {
    return null
  }

  return {
    id,

    type:
      definition.type,

    role:
      role ||
      definition.role,

    category:
      definition.category,

    storyChapter:
      definition
        .acceptsStoryChapter
        ? storyChapter
        : null,

    ...data,
  }
}

export {
  journeyLayoutRegistry,
}

export default journeyLayoutRegistry