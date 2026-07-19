import {
  ARTIFACT_TYPES,
  deserializeReadingLogArtifacts,
} from "../memoryArtifacts/memoryArtifactSerializer"
import composeJourneyAnalysis from "../composers/composeJourneyAnalysis"
import composeJourneyStory from "../story/composeJourneyStory"
import composeJourneyKeepsakes from "../composers/composeJourneyKeepsakes"

function normalizeNumber(value) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue)
    ? numberValue
    : 0
}

function normalizeText(value) {
  return String(value ?? "").trim()
}

function normalizeDateValue(value) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toISOString()
}

function getTimestampValue(value) {
  const timestamp = new Date(value).getTime()

  return Number.isNaN(timestamp)
    ? 0
    : timestamp
}

function getSessionTimestamp(session = {}) {
  return (
    normalizeDateValue(
      session.createdAt ||
        session.created_at ||
        session.updatedAt ||
        session.updated_at ||
        session.date ||
        session.logDate ||
        session.log_date
    ) || ""
  )
}

function compareSessionsByTime(
  firstSession,
  secondSession
) {
  return (
    getTimestampValue(
      getSessionTimestamp(firstSession)
    ) -
    getTimestampValue(
      getSessionTimestamp(secondSession)
    )
  )
}

function compareJourneyEventsByTime(
  firstEvent,
  secondEvent
) {
  const timeDifference =
    getTimestampValue(
      firstEvent.timestamp ||
        firstEvent.date
    ) -
    getTimestampValue(
      secondEvent.timestamp ||
        secondEvent.date
    )

  if (timeDifference !== 0) {
    return timeDifference
  }

  return (
    normalizeNumber(
      firstEvent.order
    ) -
    normalizeNumber(
      secondEvent.order
    )
  )
}

function getReviewBookId(review = {}) {
  return (
    review.id ||
    review.reviewId ||
    review.review_id ||
    review.bookInfo?.id ||
    ""
  )
}

function getSessionBookId(session = {}) {
  return (
    session.bookId ||
    session.book_id ||
    session.reviewId ||
    session.review_id ||
    ""
  )
}

function getReviewReadingLogs(
  review = {},
  readingLogs = []
) {
  const reviewId =
    getReviewBookId(review)

  const nestedLogs =
    Array.isArray(review.readingLogs)
      ? review.readingLogs
      : []

  const externalLogs =
    Array.isArray(readingLogs)
      ? readingLogs.filter(
          (session) => {
            const sessionBookId =
              getSessionBookId(
                session
              )

            if (!reviewId) {
              return false
            }

            return (
              sessionBookId ===
              reviewId
            )
          }
        )
      : []

  const logsById = new Map()

  ;[
    ...nestedLogs,
    ...externalLogs,
  ].forEach((session, index) => {
    if (!session) {
      return
    }

    const sessionId =
      session.id ||
      `${getSessionTimestamp(
        session
      )}-${index}`

    logsById.set(
      sessionId,
      session
    )
  })

  return Array.from(
    logsById.values()
  )
}

function normalizeSession(
  session = {},
  index = 0
) {
  const artifacts =
    deserializeReadingLogArtifacts(
      session
    )

  const startPage =
    normalizeNumber(
      session.startPage ??
        session.start_page
    )

  const endPage =
    normalizeNumber(
      session.endPage ??
        session.end_page
    )

  const storedPagesRead =
    normalizeNumber(
      session.pagesRead ??
        session.pages_read
    )

  const calculatedPagesRead =
    endPage > startPage
      ? endPage - startPage
      : 0

  const pagesRead =
    storedPagesRead ||
    calculatedPagesRead

  const timestamp =
    getSessionTimestamp(session)

  return {
    ...session,

    id:
      session.id ||
      `journey-session-${index}`,

    date:
      session.date ||
      session.logDate ||
      session.log_date ||
      timestamp,

    timestamp,

    startPage,
    endPage,
    pagesRead,

    minutesRead:
      normalizeNumber(
        session.minutesRead ??
          session.minutes_read
      ),

    notes:
      normalizeText(
        session.notes
      ),

    artifacts:
      Array.isArray(artifacts)
        ? artifacts
        : [],
  }
}

function createJourneyMemory({
  artifact,
  session,
  artifactIndex,
}) {
  if (!artifact?.type) {
    return null
  }

  return {
    id:
      artifact.id ||
      `${session.id}-${artifact.type}-${artifactIndex}`,

    type:
      artifact.type,

    data: {
      ...(artifact.data || {}),
    },

    sessionId:
      session.id,

    sessionDate:
      session.date,

    date:
      artifact.data?.date ||
      session.date,

    timestamp:
      session.timestamp,

    pagesRead:
      session.pagesRead,

    endPage:
      session.endPage,

    notes:
      session.notes,
  }
}

function collectJourneyMemories(
  sessions = []
) {
  const memories = []

  sessions.forEach(
    (session) => {
      const artifacts =
        Array.isArray(
          session.artifacts
        )
          ? session.artifacts
          : []

      artifacts.forEach(
        (
          artifact,
          artifactIndex
        ) => {
          const memory =
            createJourneyMemory({
              artifact,
              session,
              artifactIndex,
            })

          if (memory) {
            memories.push(memory)
          }
        }
      )
    }
  )

  return memories
}

function getMemoriesByType(
  memories = [],
  artifactType
) {
  if (!artifactType) {
    return []
  }

  return memories.filter(
    (memory) =>
      memory.type ===
      artifactType
  )
}

function getLongestSession(
  sessions = []
) {
  if (!sessions.length) {
    return null
  }

  return sessions.reduce(
    (
      longestSession,
      currentSession
    ) => {
      if (!longestSession) {
        return currentSession
      }

      if (
        currentSession.pagesRead >
        longestSession.pagesRead
      ) {
        return currentSession
      }

      if (
        currentSession.pagesRead ===
          longestSession.pagesRead &&
        currentSession.minutesRead >
          longestSession.minutesRead
      ) {
        return currentSession
      }

      return longestSession
    },
    null
  )
}

function getLongestTimedSession(
  sessions = []
) {
  if (!sessions.length) {
    return null
  }

  return sessions.reduce(
    (
      longestSession,
      currentSession
    ) => {
      if (!longestSession) {
        return currentSession
      }

      return (
        currentSession.minutesRead >
        longestSession.minutesRead
          ? currentSession
          : longestSession
      )
    },
    null
  )
}

function getBookInfoDate(
  review = {},
  possibleKeys = []
) {
  const bookInfo =
    review.bookInfo || {}

  for (const key of possibleKeys) {
    const value =
      bookInfo[key] ??
      review[key]

    if (value) {
      return value
    }
  }

  return ""
}

function buildJourneyMilestones({
  review,
  sessions,
  startedAt,
  finishedAt,
}) {
  const milestones = []

  if (startedAt) {
    milestones.push({
      id: "book-started",
      type: "bookStarted",
      date: startedAt,
      timestamp:
        normalizeDateValue(
          startedAt
        ),
      label: "Started the book",
    })
  }

  const totalPages =
    normalizeNumber(
      review.bookInfo?.totalPages ??
        review.totalPages
    )

  const percentageTargets = [
    25,
    50,
    75,
  ]

  percentageTargets.forEach(
    (percentage) => {
      if (!totalPages) {
        return
      }

      const targetPage =
        Math.ceil(
          totalPages *
            (percentage / 100)
        )

      const matchingSession =
        sessions.find(
          (session) =>
            session.endPage >=
            targetPage
        )

      if (!matchingSession) {
        return
      }

      milestones.push({
        id:
          `progress-${percentage}`,

        type:
          "progress",

        date:
          matchingSession.date,

        timestamp:
          matchingSession.timestamp ||
          normalizeDateValue(
            matchingSession.date
          ),

        sessionId:
          matchingSession.id,

        percentage,
        page:
          targetPage,

        label:
          `Reached ${percentage}%`,
      })
    }
  )

  if (finishedAt) {
    milestones.push({
      id: "book-finished",
      type: "bookFinished",
      date: finishedAt,
      timestamp:
        normalizeDateValue(
          finishedAt
        ),
      label: "Finished the book",
    })
  }

  return milestones.sort(
    compareJourneyEventsByTime
  )
}

function buildJourneyStatistics({
  review,
  sessions,
  sessionsWithNotes,
  memories,
  quotes,
  flowers,
  photos,
  milestones,
  totalPagesRead,
  totalMinutesRead,
  longestSession,
  longestTimedSession,
}) {
  const readingDates =
    new Set(
      sessions
        .map((session) =>
          String(
            session.date || ""
          ).slice(0, 10)
        )
        .filter(Boolean)
    )

  const totalSessions =
    sessions.length

  const averagePagesPerSession =
    totalSessions > 0
      ? Math.round(
          (totalPagesRead /
            totalSessions) *
            10
        ) / 10
      : 0

  const averageMinutesPerSession =
    totalSessions > 0
      ? Math.round(
          (totalMinutesRead /
            totalSessions) *
            10
        ) / 10
      : 0

  const pagesPerHour =
    totalMinutesRead > 0
      ? Math.round(
          (totalPagesRead /
            (totalMinutesRead / 60)) *
            10
        ) / 10
      : 0

  const totalBookPages =
    normalizeNumber(
      review.bookInfo?.totalPages ??
        review.totalPages
    )

  const furthestPage =
    sessions.reduce(
      (highestPage, session) =>
        Math.max(
          highestPage,
          normalizeNumber(
            session.endPage
          )
        ),
      0
    )

  const progressPercent =
    totalBookPages > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              (furthestPage /
                totalBookPages) *
                100
            )
          )
        )
      : 0

  return {
    totalSessions,
    readingDays:
      readingDates.size,

    totalPagesRead,
    totalMinutesRead,

    totalHoursRead:
      Math.round(
        (totalMinutesRead / 60) *
          10
      ) / 10,

    averagePagesPerSession,
    averageMinutesPerSession,
    pagesPerHour,

    sessionsWithNotes:
      sessionsWithNotes.length,

    preservedMemories:
      memories.length,

    quotes:
      quotes.length,

    flowers:
      flowers.length,

    photos:
      photos.length,

    milestones:
      milestones.length,

    totalBookPages,
    furthestPage,
    progressPercent,

    longestSession,
    longestTimedSession,
  }
}

function buildJourneyMemoryCollections({
  memories,
  quotes,
  flowers,
  photos,
  sessionsWithNotes,
}) {
  const notes =
    sessionsWithNotes.map(
      (session) => ({
        id:
          `${session.id}-note`,

        type:
          "readingNote",

        sessionId:
          session.id,

        sessionDate:
          session.date,

        date:
          session.date,

        timestamp:
          session.timestamp,

        text:
          session.notes,

        notes:
          session.notes,

        pagesRead:
          session.pagesRead,

        endPage:
          session.endPage,
      })
    )

  const byType =
    memories.reduce(
      (
        collections,
        memory
      ) => {
        if (!memory?.type) {
          return collections
        }

        if (
          !collections[
            memory.type
          ]
        ) {
          collections[
            memory.type
          ] = []
        }

        collections[
          memory.type
        ].push(
          memory
        )

        return collections
      },
      {}
    )

  return {
    all:
      memories,

    artifacts:
      memories,

    quotes,
    flowers,
    photos,
    notes,

    byType,

    counts: {
      all:
        memories.length,

      artifacts:
        memories.length,

      quotes:
        quotes.length,

      flowers:
        flowers.length,

      photos:
        photos.length,

      notes:
        notes.length,
    },
  }
}

function createSessionTimelineEvent(
  session,
  sessionIndex
) {
  return {
    id:
      `session-${session.id}`,

    type:
      "readingSession",

    order:
      20 + sessionIndex,

    date:
      session.date,

    timestamp:
      session.timestamp ||
      normalizeDateValue(
        session.date
      ),

    label:
      "Reading session",

    sessionId:
      session.id,

    session,

    pagesRead:
      session.pagesRead,

    minutesRead:
      session.minutesRead,

    endPage:
      session.endPage,

    notes:
      session.notes,
  }
}

function createMemoryTimelineEvent(
  memory,
  memoryIndex
) {
  return {
    id:
      `memory-${memory.id}`,

    type:
      "memoryPreserved",

    memoryType:
      memory.type,

    order:
      40 + memoryIndex,

    date:
      memory.date ||
      memory.sessionDate,

    timestamp:
      memory.timestamp ||
      normalizeDateValue(
        memory.date ||
          memory.sessionDate
      ),

    label:
      "Memory preserved",

    sessionId:
      memory.sessionId,

    memory,
  }
}

function createMilestoneTimelineEvent(
  milestone,
  milestoneIndex
) {
  return {
    ...milestone,

    id:
      `milestone-${milestone.id}`,

    timelineType:
      "milestone",

    order:
      milestone.type ===
      "bookStarted"
        ? 0
        : milestone.type ===
          "bookFinished"
          ? 1000
          : 10 +
            milestoneIndex,

    milestone,
  }
}

function buildJourneyTimeline({
  sessions,
  memories,
  milestones,
}) {
  const sessionEvents =
    sessions.map(
      createSessionTimelineEvent
    )

  const memoryEvents =
    memories.map(
      createMemoryTimelineEvent
    )

  const milestoneEvents =
    milestones.map(
      createMilestoneTimelineEvent
    )

  return [
    ...milestoneEvents,
    ...sessionEvents,
    ...memoryEvents,
  ].sort(
    compareJourneyEventsByTime
  )
}

function buildBookJourney(
  review = {},
  readingLogs = []
) {
  const sessions =
    getReviewReadingLogs(
      review,
      readingLogs
    )
      .map(normalizeSession)
      .sort(
        compareSessionsByTime
      )

  const memories =
    collectJourneyMemories(
      sessions
    )

  const quotes =
    getMemoriesByType(
      memories,
      ARTIFACT_TYPES.favoriteQuote
    )

  const flowers =
    getMemoriesByType(
      memories,
      ARTIFACT_TYPES.flower
    )

  const photos =
    getMemoriesByType(
      memories,
      ARTIFACT_TYPES.photo
    )

  const totalPagesRead =
    sessions.reduce(
      (total, session) =>
        total +
        session.pagesRead,
      0
    )

  const totalMinutesRead =
    sessions.reduce(
      (total, session) =>
        total +
        session.minutesRead,
      0
    )

  const sessionsWithNotes =
    sessions.filter(
      (session) =>
        Boolean(
          session.notes
        )
    )

  const firstSession =
    sessions[0] || null

  const latestSession =
    sessions[
      sessions.length - 1
    ] || null

  const startedAt =
    getBookInfoDate(
      review,
      [
        "startedAt",
        "startDate",
        "dateStarted",
        "started_at",
        "start_date",
      ]
    ) ||
    firstSession?.date ||
    ""

  const finishedAt =
    getBookInfoDate(
      review,
      [
        "finishedAt",
        "finishDate",
        "dateFinished",
        "finished_at",
        "finish_date",
      ]
    ) || ""

  const longestSession =
    getLongestSession(
      sessions
    )

  const longestTimedSession =
    getLongestTimedSession(
      sessions
    )

  const milestones =
    buildJourneyMilestones({
      review,
      sessions,
      startedAt,
      finishedAt,
    })

  const statistics =
    buildJourneyStatistics({
      review,
      sessions,
      sessionsWithNotes,
      memories,
      quotes,
      flowers,
      photos,
      milestones,
      totalPagesRead,
      totalMinutesRead,
      longestSession,
      longestTimedSession,
    })

  const memoryCollections =
    buildJourneyMemoryCollections({
      memories,
      quotes,
      flowers,
      photos,
      sessionsWithNotes,
    })

  const timeline =
    buildJourneyTimeline({
      sessions,
      memories,
      milestones,
    })

  const counts = {
    sessions:
      sessions.length,

    notes:
      sessionsWithNotes.length,

    memories:
      memories.length,

    quotes:
      quotes.length,

    flowers:
      flowers.length,

    photos:
      photos.length,

    milestones:
      milestones.length,

    timelineEvents:
      timeline.length,
  }

  const journey = {
  review,

  bookId:
    getReviewBookId(review),

  bookInfo:
    review.bookInfo || {},

  startedAt,
  finishedAt,

  totalSessions:
    sessions.length,

  totalPagesRead,
  totalMinutesRead,

  sessions,
  sessionsWithNotes,

  memories,
  quotes,
  flowers,
  photos,

  firstSession,
  latestSession,

  longestSession,
  longestTimedSession,

  milestones,

  statistics,
  memoryCollections,
  timeline,

  counts,

  hasMemories:
    memories.length > 0,

  hasJourney:
    sessions.length > 0 ||
    memories.length > 0 ||
    milestones.length > 0,
}

journey.analysis =
  composeJourneyAnalysis(
    journey
  )

journey.keepsakes =
  composeJourneyKeepsakes(
    journey
  )

journey.story =
  composeJourneyStory(
    journey
  )

return journey
}

export {
  buildBookJourney,
  buildJourneyMemoryCollections,
  buildJourneyMilestones,
  buildJourneyStatistics,
  buildJourneyTimeline,
}

export default buildBookJourney