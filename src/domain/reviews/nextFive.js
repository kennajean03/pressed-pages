import { normalizeReviewForDisplay } from "./reviewModel.js"

export const NEXT_FIVE_LIMIT = 5

export function getNextFiveReviews(reviews = []) {
  return reviews
    .filter(
      (item) =>
        item?.bookInfo?.status === "TBR" &&
        Number(item?.bookInfo?.nextFiveRank) > 0
    )
    .sort(
      (first, second) =>
        Number(first.bookInfo.nextFiveRank) -
        Number(second.bookInfo.nextFiveRank)
    )
    .slice(0, NEXT_FIVE_LIMIT)
}

export function getMaybeNextReviews(reviews = [], limit = 3) {
  const nextFiveIds = new Set(
    getNextFiveReviews(reviews).map((review) => review.id)
  )

  return (Array.isArray(reviews) ? reviews : [])
    .filter(
      (review) =>
        review?.bookInfo?.status === "TBR" &&
        !nextFiveIds.has(review.id)
    )
    .sort((first, second) => {
      const firstDate = new Date(
        first.updatedAt || first.savedAt || 0
      ).getTime()
      const secondDate = new Date(
        second.updatedAt || second.savedAt || 0
      ).getTime()

      return secondDate - firstDate
    })
    .slice(0, Math.max(0, Number(limit) || 0))
}

export function compactNextFiveReviewRanks(
  reviews = [],
  now = new Date().toISOString()
) {
  const rankedTbrReviews = getNextFiveReviews(reviews)
  const rankById = new Map(
    rankedTbrReviews.map((item, index) => [item.id, index + 1])
  )

  return reviews.map((item) => {
    const expectedRank =
      item.bookInfo?.status === "TBR"
        ? rankById.get(item.id) || null
        : null
    const currentRank =
      Number(item.bookInfo?.nextFiveRank) || null

    if (currentRank === expectedRank) return item

    return normalizeReviewForDisplay({
      ...item,
      bookInfo: {
        ...item.bookInfo,
        nextFiveRank: expectedRank,
      },
      updatedAt: now,
    })
  })
}

export function getChangedNextFiveReviews(
  previousReviews = [],
  nextReviews = [],
  excludedId = ""
) {
  const previousRankById = new Map(
    previousReviews.map((item) => [
      item.id,
      Number(item.bookInfo?.nextFiveRank) || null,
    ])
  )

  return nextReviews.filter(
    (item) =>
      item.id !== excludedId &&
      previousRankById.get(item.id) !==
        (Number(item.bookInfo?.nextFiveRank) || null)
  )
}

export function reorderNextFiveReviews(
  reviews = [],
  reviewId,
  targetPosition,
  now = new Date().toISOString()
) {
  const currentNextFive = getNextFiveReviews(reviews)
  const currentIndex = currentNextFive.findIndex(
    (item) => item.id === reviewId
  )

  if (currentIndex < 0) return reviews

  const nextIndex = Math.min(
    currentNextFive.length - 1,
    Math.max(0, Number(targetPosition) - 1)
  )

  if (currentIndex === nextIndex) return reviews

  const reorderedNextFive = [...currentNextFive]
  const [movedReview] = reorderedNextFive.splice(currentIndex, 1)
  reorderedNextFive.splice(nextIndex, 0, movedReview)

  const rankById = new Map(
    reorderedNextFive.map((item, index) => [item.id, index + 1])
  )

  return reviews.map((item) => {
    if (!rankById.has(item.id)) return item

    return normalizeReviewForDisplay({
      ...item,
      bookInfo: {
        ...item.bookInfo,
        nextFiveRank: rankById.get(item.id),
      },
      updatedAt: now,
    })
  })
}

export function addReviewToNextFive(
  reviews = [],
  reviewId,
  now = new Date().toISOString()
) {
  const currentNextFive = getNextFiveReviews(reviews)
  const target = reviews.find((item) => item.id === reviewId)

  if (
    !target ||
    target.bookInfo?.status !== "TBR" ||
    currentNextFive.some((item) => item.id === reviewId) ||
    currentNextFive.length >= NEXT_FIVE_LIMIT
  ) {
    return reviews
  }

  return reviews.map((item) =>
    item.id === reviewId
      ? normalizeReviewForDisplay({
          ...item,
          bookInfo: {
            ...item.bookInfo,
            nextFiveRank: currentNextFive.length + 1,
          },
          updatedAt: now,
        })
      : item
  )
}

export function removeReviewFromNextFive(
  reviews = [],
  reviewId,
  now = new Date().toISOString()
) {
  return compactNextFiveReviewRanks(
    reviews.map((item) =>
      item.id === reviewId
        ? {
            ...item,
            bookInfo: {
              ...item.bookInfo,
              nextFiveRank: null,
            },
          }
        : item
    ),
    now
  )
}
