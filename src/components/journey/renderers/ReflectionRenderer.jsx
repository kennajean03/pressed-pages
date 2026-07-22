import ReflectionLetter from "../../scrapbook/ReflectionLetter/ReflectionLetter"

function normalizeCount(
  value
) {
  const numberValue =
    Number(value)

  return Number.isFinite(
    numberValue
  )
    ? numberValue
    : 0
}

function buildClosing(
  journey = {}
) {
  const sessionCount =
    normalizeCount(
      journey.totalSessions
    )

  const memoryCount =
    normalizeCount(
      journey.counts
        ?.memories
    )

  const preservedPieces = []

  if (sessionCount > 0) {
    preservedPieces.push(
      `${sessionCount} reading ${
        sessionCount === 1
          ? "session"
          : "sessions"
      }`
    )
  }

  if (memoryCount > 0) {
    preservedPieces.push(
      `${memoryCount} preserved ${
        memoryCount === 1
          ? "memory"
          : "memories"
      }`
    )
  }

  if (
    !preservedPieces.length
  ) {
    return ""
  }

  return `This journey now holds ${preservedPieces.join(
    " and "
  )}.`
}

function ReflectionRenderer({
  layoutObject,
  review,
  journey,
  reviewOwnedByCurrentUser = false,
  isSpoilerRevealed,
}) {
  const storyReview =
    layoutObject
      ?.storyChapter
      ?.data
      ?.review

  const resolvedReview =
    storyReview ||
    review ||
    {}

  const reviewCopy =
    resolvedReview.review ||
    {}

  const reflection =
    reviewCopy
      .oneSentenceReview ||
    ""

  const vibeCheck =
    reviewCopy.vibeCheck ||
    ""

  const favoriteThingHasSpoiler =
    Boolean(
      reviewCopy
        .favoriteThingHasSpoiler
    )

  const favoriteThingIsRevealed =
    typeof isSpoilerRevealed ===
      "function"
      ? isSpoilerRevealed(
          resolvedReview.id,
          "favoriteThing"
        )
      : false

  const mayShowFavoriteThing =
    !favoriteThingHasSpoiler ||
    reviewOwnedByCurrentUser ||
    favoriteThingIsRevealed

  const favoriteThing =
    mayShowFavoriteThing
      ? reviewCopy
          .favoriteThing ||
        ""
      : ""

  const closing =
    buildClosing(
      journey
    )

  const title =
    layoutObject
      ?.storyChapter
      ?.title ||
    "Looking Back"

  const subtitle =
    layoutObject
      ?.storyChapter
      ?.subtitle ||
    "What this reading journey became"

  const hasReflectionContent =
    Boolean(reflection) ||
    Boolean(favoriteThing) ||
    Boolean(vibeCheck) ||
    Boolean(closing)

  if (!hasReflectionContent) {
    return null
  }

  return (
    <section className="book-journey-composition__reflection">
      <ReflectionLetter
        titleId={`book-journey-reflection-${
          resolvedReview.id ||
          "letter"
        }`}
        eyebrow="Reflection Letter"
        title={title}
        subtitle={subtitle}
        reflection={
          reflection
        }
        favoriteThing={
          favoriteThing
        }
        vibeCheck={
          vibeCheck
        }
        closing={
          closing
        }
        state="cherished"
        rotate="right"
      />
    </section>
  )
}

export default ReflectionRenderer