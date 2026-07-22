export const STORY_CHAPTERS = {
  cover: "cover",

  journeySummary:
    "journeySummary",

  readingTimeline:
    "readingTimeline",

  keepsakeCollection:
    "keepsakeCollection",

  milestones:
    "milestones",

  favoriteQuotes:
    "favoriteQuotes",

  photoGallery:
    "photoGallery",

  memoryCollection:
    "memoryCollection",

  readingNotes:
    "readingNotes",

  statistics:
    "statistics",

  reflection:
    "reflection",

  review:
    "review",

  ending:
    "ending",
}

export const CHAPTER_PRIORITY = {
  required: "required",

  primary: "primary",

  secondary: "secondary",

  optional: "optional",
}

export const CHAPTER_PURPOSES = {
  introduce: "introduce",

  orient: "orient",

  preserveMemory:
    "preserveMemory",

  documentJourney:
    "documentJourney",

  reflect: "reflect",

  evaluate: "evaluate",


  celebrate: "celebrate",

  conclude: "conclude",
}

export const CHAPTER_TRANSITIONS = {
  immediate: "immediate",

  gentle: "gentle",

  reflective: "reflective",

  celebratory: "celebratory",

  closing: "closing",
}

function normalizeEmotionalWeight(
  value
) {
  const numberValue =
    Number(value)

  if (
    !Number.isFinite(
      numberValue
    )
  ) {
    return 50
  }

  return Math.min(
    100,
    Math.max(
      0,
      numberValue
    )
  )
}

export function createStoryChapter({
  id,
  type,
  title = "",
  subtitle = "",

  purpose =
    CHAPTER_PURPOSES
      .documentJourney,

  emotionalWeight = 50,

  transition =
    CHAPTER_TRANSITIONS
      .gentle,

  priority =
    CHAPTER_PRIORITY.primary,

  data = {},
}) {
  return {
    id,
    type,

    title,
    subtitle,

    purpose,

    emotionalWeight:
      normalizeEmotionalWeight(
        emotionalWeight
      ),

    transition,

    priority,

    data,
  }
}

export default STORY_CHAPTERS