export const DEFAULT_BOOK_INFO = {
  title: "",
  author: "",
  coverUrl: "",
  series: "",
  bookNumber: "",
  genre: "",
  format: "Kindle",
  reviewGraphicUrl: "",
  status: "Finished",
  totalPages: "",
  currentPage: "",
  dateStarted: "",
  dateFinished: "",
  nextFiveRank: null,
}

export const DEFAULT_SCORES = {
  plot: 0,
  vibe: 0,
  characters: 0,
  writingStyle: 0,
  enjoyability: 0,
}

export const DEFAULT_METRICS = {
  spice: 0,
  chemistry: 0,
  tension: 0,
  emotionalDamage: 0,
  bookHangover: 0,
  contentIntensity: 0,
}

export function getBlankReviewText() {
  return {
    oneSentenceReview: "",
    favoriteThing: "",
    favoriteThingHasSpoiler: false,
    biggestComplaint: "",
    biggestComplaintHasSpoiler: false,
    vibeCheck: "",
  }
}

export function normalizeReviewForDisplay(reviewItem) {
  const safeReview = reviewItem || {}
  const safeBookInfo = safeReview.bookInfo || {}
  const status = safeBookInfo.status || "Finished"
  const keepsReviewData = status === "Finished"
  const keepsDnfData = status === "DNF"

  return {
    ...safeReview,
    bookInfo: {
      ...DEFAULT_BOOK_INFO,
      ...safeBookInfo,
    },
    dnfInfo: keepsDnfData
      ? safeReview.dnfInfo || {
          percent: "",
          reason: "",
          wouldReadAuthorAgain: "Maybe",
        }
      : null,
    scores: keepsReviewData
      ? {
          ...DEFAULT_SCORES,
          ...(safeReview.scores || {}),
        }
      : null,
    metrics: keepsReviewData
      ? {
          ...DEFAULT_METRICS,
          ...(safeReview.metrics || {}),
        }
      : null,
    review: keepsReviewData
      ? {
          ...getBlankReviewText(),
          ...(safeReview.review || {}),
        }
      : null,
    tropes:
      keepsReviewData && Array.isArray(safeReview.tropes)
        ? safeReview.tropes
        : [],
    obsessionScore: keepsReviewData
      ? safeReview.obsessionScore ?? ""
      : null,
    recommendationLevel: keepsReviewData
      ? safeReview.recommendationLevel || ""
      : null,
    isFavorite: keepsReviewData
      ? Boolean(safeReview.isFavorite)
      : false,
    bookScore: keepsReviewData
      ? safeReview.bookScore ?? ""
      : null,
    miniReviewText: safeReview.miniReviewText || "",
    readingLogs: Array.isArray(safeReview.readingLogs)
      ? safeReview.readingLogs
      : [],
  }
}

export function normalizeBookInfoForStatus(
  nextBookInfo = {},
  previousBookInfo = {},
  now = new Date().toISOString()
) {
  const status = nextBookInfo.status || "Finished"
  const previousStatus = previousBookInfo.status || ""
  const normalizedBookInfo = {
    ...previousBookInfo,
    ...nextBookInfo,
  }

  if (status === "TBR") {
    return {
      ...normalizedBookInfo,
      currentPage: "",
      dateStarted: "",
      dateFinished: "",
      nextFiveRank:
        previousStatus === "TBR"
          ? normalizedBookInfo.nextFiveRank || null
          : null,
    }
  }

  if (status === "Reading") {
    return {
      ...normalizedBookInfo,
      dateStarted:
        normalizedBookInfo.dateStarted ||
        previousBookInfo.dateStarted ||
        now,
      dateFinished: "",
      nextFiveRank: null,
    }
  }

  if (status === "DNF") {
    return {
      ...normalizedBookInfo,
      currentPage: "",
      dateFinished: "",
      nextFiveRank: null,
    }
  }

  return {
    ...normalizedBookInfo,
    currentPage:
      normalizedBookInfo.totalPages ||
      normalizedBookInfo.currentPage ||
      "",
    dateStarted:
      normalizedBookInfo.dateStarted ||
      previousBookInfo.dateStarted ||
      now,
    dateFinished:
      previousStatus === "Finished"
        ? normalizedBookInfo.dateFinished || now
        : nextBookInfo.dateFinished || now,
    nextFiveRank: null,
  }
}
