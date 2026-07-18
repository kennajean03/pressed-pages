import {
  STORY_CHAPTERS,
  CHAPTER_PRIORITY,
  CHAPTER_PURPOSES,
  CHAPTER_TRANSITIONS,
  createStoryChapter,
} from "./storyChapters"

function getBookTitle(
  journey = {}
) {
  return (
    journey.bookInfo?.title ||
    journey.review?.title ||
    "Book Journey"
  )
}

function getCollectionWeight(
  collection = [],
  {
    base = 55,
    increment = 7,
    maximum = 95,
  } = {}
) {
  const count =
    Array.isArray(collection)
      ? collection.length
      : 0

  return Math.min(
    maximum,
    base +
      count * increment
  )
}

function buildOpening(journey) {
  const bookTitle =
    getBookTitle(journey)

  return createStoryChapter({
    id: "cover",

    type:
      STORY_CHAPTERS.cover,

    title:
      bookTitle,

    subtitle:
      "A Book Journey",

    purpose:
      CHAPTER_PURPOSES
        .introduce,

    emotionalWeight:
      65,

    transition:
      CHAPTER_TRANSITIONS
        .immediate,

    priority:
      CHAPTER_PRIORITY
        .required,

    data: {
      book:
        journey.bookInfo,

      review:
        journey.review,
    },
  })
}

function buildJourneySummary(
  journey
) {
  return createStoryChapter({
    id: "summary",

    type:
      STORY_CHAPTERS
        .journeySummary,

    title:
      "Your Journey",

    subtitle:
      "The shape of your time with this book",

    purpose:
      CHAPTER_PURPOSES
        .orient,

    emotionalWeight:
      60,

    transition:
      CHAPTER_TRANSITIONS
        .gentle,

    priority:
      CHAPTER_PRIORITY
        .required,

    data: {
      statistics:
        journey.statistics,

      analysis:
        journey.analysis,

      startedAt:
        journey.startedAt,

      finishedAt:
        journey.finishedAt,
    },
  })
}

function buildPhotoChapter(
  journey
) {
  const photos =
    Array.isArray(
      journey.photos
    )
      ? journey.photos
      : []

  if (
    photos.length === 0
  ) {
    return null
  }

  return createStoryChapter({
    id: "photos",

    type:
      STORY_CHAPTERS
        .photoGallery,

    title:
      "Moments Preserved",

    subtitle:
      photos.length === 1
        ? "A moment from this reading journey"
        : `${photos.length} moments from this reading journey`,

    purpose:
      CHAPTER_PURPOSES
        .preserveMemory,

    emotionalWeight:
      getCollectionWeight(
        photos,
        {
          base: 65,
          increment: 7,
          maximum: 95,
        }
      ),

    transition:
      CHAPTER_TRANSITIONS
        .gentle,

    priority:
      CHAPTER_PRIORITY
        .primary,

    data: {
      photos,
    },
  })
}

function buildQuoteChapter(
  journey
) {
  const quotes =
    Array.isArray(
      journey.quotes
    )
      ? journey.quotes
      : []

  if (
    quotes.length === 0
  ) {
    return null
  }

  return createStoryChapter({
    id: "quotes",

    type:
      STORY_CHAPTERS
        .favoriteQuotes,

    title:
      "Words Worth Remembering",

    subtitle:
      quotes.length === 1
        ? "A line you chose to preserve"
        : `${quotes.length} lines you chose to preserve`,

    purpose:
      CHAPTER_PURPOSES
        .preserveMemory,

    emotionalWeight:
      getCollectionWeight(
        quotes,
        {
          base: 70,
          increment: 6,
          maximum: 96,
        }
      ),

    transition:
      CHAPTER_TRANSITIONS
        .reflective,

    priority:
      CHAPTER_PRIORITY
        .primary,

    data: {
      quotes,
    },
  })
}

function buildMilestoneChapter(
  journey
) {
  const milestones =
    Array.isArray(
      journey.milestones
    )
      ? journey.milestones
      : []

  if (
    milestones.length === 0
  ) {
    return null
  }

  return createStoryChapter({
    id: "milestones",

    type:
      STORY_CHAPTERS
        .milestones,

    title:
      "Along the Way",

    subtitle:
      "The markers that shaped this journey",

    purpose:
      CHAPTER_PURPOSES
        .documentJourney,

    emotionalWeight:
      getCollectionWeight(
        milestones,
        {
          base: 50,
          increment: 4,
          maximum: 78,
        }
      ),

    transition:
      CHAPTER_TRANSITIONS
        .gentle,

    priority:
      CHAPTER_PRIORITY
        .secondary,

    data: {
      milestones,
    },
  })
}

function buildTimelineChapter(
  journey
) {
  const timeline =
    Array.isArray(
      journey.timeline
    )
      ? journey.timeline
      : []

  if (
    timeline.length === 0
  ) {
    return null
  }

  return createStoryChapter({
    id: "timeline",

    type:
      STORY_CHAPTERS
        .readingTimeline,

    title:
      "Reading Journey",

    subtitle:
      "How your time with this book unfolded",

    purpose:
      CHAPTER_PURPOSES
        .documentJourney,

    emotionalWeight:
      62,

    transition:
      CHAPTER_TRANSITIONS
        .gentle,

    priority:
      CHAPTER_PRIORITY
        .primary,

    data: {
      timeline,

      sessions:
        journey.sessions,
    },
  })
}

function buildReadingNotesChapter(
  journey
) {
  const notes =
    journey
      .memoryCollections
      ?.notes || []

  if (
    notes.length === 0
  ) {
    return null
  }

  return createStoryChapter({
    id: "reading-notes",

    type:
      STORY_CHAPTERS
        .readingNotes,

    title:
      "Notes from the Margins",

    subtitle:
      notes.length === 1
        ? "A thought preserved while reading"
        : `${notes.length} thoughts preserved while reading`,

    purpose:
      CHAPTER_PURPOSES
        .preserveMemory,

    emotionalWeight:
      getCollectionWeight(
        notes,
        {
          base: 58,
          increment: 5,
          maximum: 88,
        }
      ),

    transition:
      CHAPTER_TRANSITIONS
        .reflective,

    priority:
      CHAPTER_PRIORITY
        .secondary,

    data: {
      notes,
    },
  })
}

function buildReflectionChapter(
  journey
) {
  return createStoryChapter({
    id: "reflection",

    type:
      STORY_CHAPTERS
        .reflection,

    title:
      "Looking Back",

    subtitle:
      "What this reading journey became",

    purpose:
      CHAPTER_PURPOSES
        .reflect,

    emotionalWeight:
      82,

    transition:
      CHAPTER_TRANSITIONS
        .reflective,

    priority:
      CHAPTER_PRIORITY
        .primary,

    data: {
      analysis:
        journey.analysis,

      statistics:
        journey.statistics,

      review:
        journey.review,
    },
  })
}

function buildEnding(journey) {
  const isFinished =
    Boolean(
      journey.finishedAt
    )

  return createStoryChapter({
    id: "ending",

    type:
      STORY_CHAPTERS.ending,

    title:
      isFinished
        ? "The Final Page"
        : "To Be Continued",

    subtitle:
      isFinished
        ? "This journey has been preserved"
        : "This story is still unfolding",

    purpose:
      isFinished
        ? CHAPTER_PURPOSES
            .conclude
        : CHAPTER_PURPOSES
            .celebrate,

    emotionalWeight:
      isFinished
        ? 90
        : 70,

    transition:
      isFinished
        ? CHAPTER_TRANSITIONS
            .closing
        : CHAPTER_TRANSITIONS
            .gentle,

    priority:
      CHAPTER_PRIORITY
        .required,

    data: {
      finishedAt:
        journey.finishedAt,

      hasJourney:
        journey.hasJourney,
    },
  })
}

function getStoryMood(
  journey
) {
  return (
    journey.analysis
      ?.storyType ||
    "quietReflection"
  )
}

function getStoryEmotionalPeak(
  chapters = []
) {
  if (
    chapters.length === 0
  ) {
    return null
  }

  return chapters.reduce(
    (
      strongestChapter,
      currentChapter
    ) => {
      if (
        !strongestChapter
      ) {
        return currentChapter
      }

      return (
        currentChapter
          .emotionalWeight >
        strongestChapter
          .emotionalWeight
          ? currentChapter
          : strongestChapter
      )
    },
    null
  )
}

export function composeJourneyStory(
  journey = {}
) {
  const chapters = [
    buildOpening(
      journey
    ),

    buildJourneySummary(
      journey
    ),

    buildPhotoChapter(
      journey
    ),

    buildQuoteChapter(
      journey
    ),

    buildMilestoneChapter(
      journey
    ),

    buildTimelineChapter(
      journey
    ),

    buildReadingNotesChapter(
      journey
    ),

    buildReflectionChapter(
      journey
    ),

    buildEnding(
      journey
    ),
  ].filter(Boolean)

  const emotionalPeak =
    getStoryEmotionalPeak(
      chapters
    )

  return {
    title:
      `${getBookTitle(
        journey
      )} Journey`,

    mood:
      getStoryMood(
        journey
      ),

    opening:
      chapters[0] ||
      null,

    ending:
      chapters[
        chapters.length - 1
      ] || null,

    chapters,

    chapterCount:
      chapters.length,

    emotionalPeak: {
      chapterId:
        emotionalPeak?.id ||
        "",

      chapterType:
        emotionalPeak?.type ||
        "",

      weight:
        emotionalPeak
          ?.emotionalWeight ||
        0,
    },
  }
}

export default composeJourneyStory