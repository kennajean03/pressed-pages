import {
  ARTIFACT_TYPES,
  deserializeReadingLogArtifacts,
} from "../memoryArtifacts/memoryArtifactSerializer"

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

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value)
  }

  return date.toISOString()
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
  const firstTime = new Date(
    getSessionTimestamp(firstSession)
  ).getTime()

  const secondTime = new Date(
    getSessionTimestamp(secondSession)
  ).getTime()

  const safeFirstTime =
    Number.isNaN(firstTime)
      ? 0
      : firstTime

  const safeSecondTime =
    Number.isNaN(secondTime)
      ? 0
      : secondTime

  return safeFirstTime - safeSecondTime
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
    Array.isArray(
      review.readingLogs
    )
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
              return true
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

    artifacts,
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

    type: artifact.type,

    data: {
      ...(artifact.data || {}),
    },

    sessionId:
      session.id,

    sessionDate:
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
      session.artifacts.forEach(
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

  for (
    const key of possibleKeys
  ) {
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
        id: `progress-${percentage}`,
        type: "progress",
        date:
          matchingSession.date,
        sessionId:
          matchingSession.id,
        percentage,
        page: targetPage,
        label: `Reached ${percentage}%`,
      })
    }
  )

  if (finishedAt) {
    milestones.push({
      id: "book-finished",
      type: "bookFinished",
      date: finishedAt,
      label: "Finished the book",
    })
  }

  return milestones.sort(
    (firstMilestone, secondMilestone) => {
      const firstTime = new Date(
        firstMilestone.date
      ).getTime()

      const secondTime = new Date(
        secondMilestone.date
      ).getTime()

      const safeFirstTime =
        Number.isNaN(firstTime)
          ? 0
          : firstTime

      const safeSecondTime =
        Number.isNaN(secondTime)
          ? 0
          : secondTime

      return (
        safeFirstTime -
        safeSecondTime
      )
    }
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

  return {
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

    counts: {
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
    },

    hasMemories:
      memories.length > 0,

    hasJourney:
      sessions.length > 0 ||
      memories.length > 0,
  }
}

export {
  buildBookJourney,
}

export default buildBookJourney