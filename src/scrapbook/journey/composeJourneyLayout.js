import {
  STORY_CHAPTERS,
} from "../story/storyChapters"

import {
  JOURNEY_LAYOUT_TYPES,
  createJourneyLayoutObject,
} from "./journeyLayoutRegistry"

function normalizeNumber(value) {
  const numberValue =
    Number(value)

  return Number.isFinite(
    numberValue
  )
    ? numberValue
    : 0
}

function getSessionProgressPercent(
  session = {},
  totalPages = 0
) {
  const safeTotalPages =
    normalizeNumber(
      totalPages
    )

  const endPage =
    normalizeNumber(
      session.endPage ??
        session.end_page
    )

  if (
    safeTotalPages <= 0 ||
    endPage <= 0
  ) {
    return null
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (endPage /
          safeTotalPages) *
          100
      )
    )
  )
}

function getChapterDefinition(
  progressPercent,
  sessionIndex,
  sessionCount
) {
  const isFirstSession =
    sessionIndex === 0

  const isLastSession =
    sessionIndex ===
    sessionCount - 1

  if (isFirstSession) {
    return {
      id:
        "beginning",

      eyebrow:
        "Chapter One",

      title:
        "The Beginning",

      copy:
        "The first pages, first impressions, and the moment this story entered your life.",
    }
  }

  if (isLastSession) {
    return {
      id:
        "finalPages",

      eyebrow:
        "Final Chapter",

      title:
        "The Final Pages",

      copy:
        "The last stretch of the journey and the memories preserved before the book was closed.",
    }
  }

  if (
    progressPercent !== null &&
    progressPercent <= 25
  ) {
    return {
      id:
        "beginning",

      eyebrow:
        "Chapter One",

      title:
        "The Beginning",

      copy:
        "The first pages, first impressions, and the moment this story entered your life.",
    }
  }

  if (
    progressPercent !== null &&
    progressPercent <= 50
  ) {
    return {
      id:
        "settlingIn",

      eyebrow:
        "Chapter Two",

      title:
        "Settling Into the Story",

      copy:
        "The characters became familiar and the world of the book began to feel lived in.",
    }
  }

  if (
    progressPercent !== null &&
    progressPercent <= 75
  ) {
    return {
      id:
        "gettingAttached",

      eyebrow:
        "Chapter Three",

      title:
        "Getting Attached",

      copy:
        "The point where this story started leaving something behind.",
    }
  }

  if (
    progressPercent !== null
  ) {
    return {
      id:
        "finalPages",

      eyebrow:
        "Final Chapter",

      title:
        "The Final Pages",

      copy:
        "The last stretch of the journey and the memories preserved before the book was closed.",
    }
  }

  const relativeProgress =
    sessionCount > 1
      ? sessionIndex /
        (sessionCount - 1)
      : 0

  if (
    relativeProgress <= 0.25
  ) {
    return {
      id:
        "beginning",

      eyebrow:
        "Chapter One",

      title:
        "The Beginning",

      copy:
        "The first pages, first impressions, and the moment this story entered your life.",
    }
  }

  if (
    relativeProgress <= 0.5
  ) {
    return {
      id:
        "settlingIn",

      eyebrow:
        "Chapter Two",

      title:
        "Settling Into the Story",

      copy:
        "The characters became familiar and the world of the book began to feel lived in.",
    }
  }

  if (
    relativeProgress <= 0.75
  ) {
    return {
      id:
        "gettingAttached",

      eyebrow:
        "Chapter Three",

      title:
        "Getting Attached",

      copy:
        "The point where this story started leaving something behind.",
    }
  }

  return {
    id:
      "finalPages",

    eyebrow:
      "Final Chapter",

    title:
      "The Final Pages",

    copy:
      "The last stretch of the journey and the memories preserved before the book was closed.",
  }
}

function createSessionLayoutObject({
  session,
  sessionIndex,
  globalSessionIndex,
  chapterIndex,
  chapterId,
  storyChapter,
}) {
  return createJourneyLayoutObject({
    id:
      session.id ||
      `journey-session-${sessionIndex}`,

    type:
      JOURNEY_LAYOUT_TYPES
        .journalPage,

    storyChapter,

    chapterId,

chapterIndex,

sessionIndex,

globalSessionIndex,

session,
  })
}

function createReadingChapterLayoutObject({
  chapter,
  storyChapter,
}) {
  return createJourneyLayoutObject({
    id:
      `chapter-${chapter.id}`,

    type:
      JOURNEY_LAYOUT_TYPES
        .chapter,

    storyChapter,

    chapterId:
      chapter.id,

    eyebrow:
      chapter.eyebrow,

    title:
      chapter.title,

    copy:
      chapter.copy,

    sessions:
      chapter.sessions,

    sessionCount:
      chapter.sessions.length,
  })
}

export function composeJourneyChapters(
  journey = {}
) {
  const sessions =
    Array.isArray(
      journey.sessions
    )
      ? journey.sessions
      : []

  if (!sessions.length) {
    return []
  }

  const totalPages =
    normalizeNumber(
      journey.bookInfo
        ?.totalPages ??
        journey.review
          ?.bookInfo
          ?.totalPages ??
        journey.review
          ?.totalPages
    )

  const chaptersById =
    new Map()

  sessions.forEach(
    (
      session,
      sessionIndex
    ) => {
      const progressPercent =
        getSessionProgressPercent(
          session,
          totalPages
        )

      const chapterDefinition =
        getChapterDefinition(
          progressPercent,
          sessionIndex,
          sessions.length
        )

      if (
        !chaptersById.has(
          chapterDefinition.id
        )
      ) {
        chaptersById.set(
          chapterDefinition.id,
          {
            ...chapterDefinition,

            sessions: [],
          }
        )
      }

      chaptersById
        .get(
          chapterDefinition.id
        )
        .sessions.push(
          session
        )
    }
  )

  return Array.from(
    chaptersById.values()
  )
}

function createHeroLayoutObject(
  storyChapter
) {
  return createJourneyLayoutObject({
    id:
      "journey-hero",

    type:
      JOURNEY_LAYOUT_TYPES
        .hero,

    storyChapter,
  })
}

function createSummaryLayoutObject(
  storyChapter
) {
  return createJourneyLayoutObject({
    id:
      "journey-summary",

    type:
      JOURNEY_LAYOUT_TYPES
        .journeySummary,

    storyChapter,
  })
}

function createFavoriteQuotesLayoutObject(
  storyChapter
) {
  const quotes =
    Array.isArray(
      storyChapter?.data
        ?.quotes
    )
      ? storyChapter.data
          .quotes
      : []

  return createJourneyLayoutObject({
    id:
      "journey-favorite-quotes",

    type:
      JOURNEY_LAYOUT_TYPES
        .favoriteQuotes,

    storyChapter,

    quotes,

    quoteCount:
      quotes.length,

    title:
      storyChapter?.title ||
      "Words Worth Remembering",

    subtitle:
      storyChapter?.subtitle ||
      "",
  })
}

function createKeepsakeCollectionLayoutObject(
  storyChapter
) {
  const keepsakes =
    Array.isArray(
      storyChapter?.data
        ?.keepsakes
    )
      ? storyChapter.data
          .keepsakes
      : []

  return createJourneyLayoutObject({
    id:
      "journey-keepsakes",

    type:
      JOURNEY_LAYOUT_TYPES
        .keepsakeCollection,

    storyChapter,

    keepsakes,

    title:
      storyChapter?.title ||
      "What You Chose To Keep",

    subtitle:
      storyChapter?.subtitle ||
      "",
  })
}

function createReflectionLayoutObject(
  storyChapter
) {
  return createJourneyLayoutObject({
    id:
      "journey-reflection",

    type:
      JOURNEY_LAYOUT_TYPES
        .reflection,

    storyChapter,

    title:
      storyChapter?.title ||
      "Looking Back",

    subtitle:
      storyChapter?.subtitle ||
      "What this reading journey became",
  })
}

function createReviewLayoutObject(
  storyChapter
) {
  return createJourneyLayoutObject({
    id:
      "journey-review",

    type:
      JOURNEY_LAYOUT_TYPES
        .review,

    storyChapter,
  })
}

function createEndingLayoutObject(
  storyChapter
) {
  return createJourneyLayoutObject({
    id:
      "journey-ending",

    type:
      JOURNEY_LAYOUT_TYPES
        .ending,

    storyChapter,

    title:
      storyChapter?.title ||
      "The Final Page",

    subtitle:
      storyChapter?.subtitle ||
      "This journey has been preserved",
  })
}

function createActionsLayoutObject() {
  return createJourneyLayoutObject({
    id:
      "journey-actions",

    type:
      JOURNEY_LAYOUT_TYPES
        .actions,
  })
}

function createReadingTimelineLayout({
  journey,
  storyChapter,
}) {
  const readingChapters =
    composeJourneyChapters(
      journey
    )

  const layoutObjects = []

  readingChapters.forEach(
    (
      readingChapter,
      chapterIndex
    ) => {
      const chapterLayoutObject =
        createReadingChapterLayoutObject({
          chapter:
            readingChapter,

          storyChapter,
        })

      if (chapterLayoutObject) {
        layoutObjects.push(
          chapterLayoutObject
        )
      }

      readingChapter.sessions.forEach(
        (
          session,
          sessionIndex
        ) => {
          const matchingSessionIndex =
            Array.isArray(
              journey.sessions
            )
              ? journey.sessions.findIndex(
                  (
                    journeySession
                  ) =>
                    journeySession.id ===
                    session.id
                )
              : -1

          const globalSessionIndex =
            matchingSessionIndex >= 0
              ? matchingSessionIndex
              : sessionIndex

          const sessionLayoutObject =
            createSessionLayoutObject({
              session,

              sessionIndex,

              globalSessionIndex,

              chapterIndex,

              chapterId:
                readingChapter.id,

              storyChapter,
            })

          if (sessionLayoutObject) {
            layoutObjects.push(
              sessionLayoutObject
            )
          }
        }
      )
    }
  )

  return {
    readingChapters,

    layoutObjects,
  }
}
function translateStoryChapter({
  storyChapter,
  journey,
}) {
  switch (
    storyChapter.type
  ) {
    case STORY_CHAPTERS.cover:
      return {
        readingChapters: [],

        layoutObjects: [
          createHeroLayoutObject(
            storyChapter
          ),
        ].filter(Boolean),
      }

    case STORY_CHAPTERS
      .journeySummary:
      return {
        readingChapters: [],

        layoutObjects:
          journey.hasJourney
            ? [
                createSummaryLayoutObject(
                  storyChapter
                ),
              ].filter(Boolean)
            : [],
      }

    case STORY_CHAPTERS
      .readingTimeline:
      return createReadingTimelineLayout({
        journey,
        storyChapter,
      })


    case STORY_CHAPTERS
      .favoriteQuotes:
      return {
        readingChapters: [],

        layoutObjects: [
          createFavoriteQuotesLayoutObject(
            storyChapter
          ),
        ].filter(Boolean),
      }

      case STORY_CHAPTERS
  .keepsakeCollection:
  return {
    readingChapters: [],

    layoutObjects: [
      createKeepsakeCollectionLayoutObject(
        storyChapter
      ),
    ].filter(Boolean),
  }

    case STORY_CHAPTERS
  .reflection:
  return {
    readingChapters: [],

    layoutObjects: [
      createReflectionLayoutObject(
        storyChapter
      ),
    ].filter(Boolean),
  }

  case STORY_CHAPTERS
  .review:
  return {
    readingChapters: [],

    layoutObjects: [
      createReviewLayoutObject(
        storyChapter
      ),
    ].filter(Boolean),
  }

  case STORY_CHAPTERS
  .ending:
  return {
    readingChapters: [],

    layoutObjects: [
      createEndingLayoutObject(
        storyChapter
      ),
    ].filter(Boolean),
  }

    /*
     * These story chapters are part of the
     * canonical narrative, but do not yet have
     * dedicated layout objects or renderer
     * components.
     */
    case STORY_CHAPTERS.photoGallery:
    case STORY_CHAPTERS.milestones:
    case STORY_CHAPTERS.readingNotes:
    case STORY_CHAPTERS.memoryCollection:
    case STORY_CHAPTERS.statistics:
    default:
      return {
        readingChapters: [],

        layoutObjects: [],
      }
  }
}

export function composeJourneyLayout(
  journey = {}
) {
  const storyChapters =
    Array.isArray(
      journey.story?.chapters
    )
      ? journey.story.chapters
      : []

  const layoutObjects = []
  const readingChapters = []

  storyChapters.forEach(
    (storyChapter) => {
      const translatedChapter =
        translateStoryChapter({
          storyChapter,
          journey,
        })

      layoutObjects.push(
        ...translatedChapter
          .layoutObjects
      )

      readingChapters.push(
        ...translatedChapter
          .readingChapters
      )
    }
  )

  const actionsLayoutObject =
    createActionsLayoutObject()

  if (actionsLayoutObject) {
    layoutObjects.push(
      actionsLayoutObject
    )
  }

  return {
    chapters:
      readingChapters,

    story:
      layoutObjects,

    layoutObjects,

    sourceStory:
      journey.story || null,

    counts: {
      chapters:
        readingChapters.length,

      storyChapters:
        storyChapters.length,

      storyObjects:
        layoutObjects.length,

      layoutObjects:
        layoutObjects.length,

      sessions:
        journey.totalSessions ||
        0,
    },
  }
}

/*
 * Temporary compatibility alias.
 *
 * Existing imports using the old function name
 * can continue working while the rest of the app
 * transitions to composeJourneyLayout.
 */
export const composeBookJourneyStory =
  composeJourneyLayout

export default composeJourneyLayout