import "./ReviewRenderer.css"

function formatScore(value) {
  const isMissing =
    value === null ||
    value === undefined ||
    (
      typeof value === "string" &&
      value.trim() === ""
    )

  if (isMissing) {
    return "Not rated"
  }

  const numberValue =
    Number(value)

  return Number.isFinite(
    numberValue
  )
    ? `${numberValue} / 5`
    : "Not rated"
}

function hasText(
  value
) {
  if (
    typeof value ===
    "string"
  ) {
    return (
      value.trim().length > 0
    )
  }

  return Boolean(value)
}

function ReviewRenderer({
  layoutObject,
  review,
  SpoilerReviewSection,
  reviewOwnedByCurrentUser = false,
  isSpoilerRevealed,
  toggleSpoilerReveal,
}) {
  const storyReview =
    layoutObject
      ?.storyChapter
      ?.data
      ?.review

  const resolvedReview =
    storyReview ||
    review ||
    null

  if (!resolvedReview) {
    return null
  }

  const bookInfo =
    resolvedReview.bookInfo || {}

    const reviewGraphicUrl =
  typeof bookInfo.reviewGraphicUrl ===
    "string"
    ? bookInfo.reviewGraphicUrl.trim()
    : ""

  const reviewCopy =
    resolvedReview.review || {}

    const tropes =
  Array.isArray(
    resolvedReview.tropes
  )
    ? resolvedReview.tropes.filter(
        hasText
      )
    : []

const hasReviewCopyContent =
  tropes.length > 0 ||
  hasText(
    reviewCopy.oneSentenceReview
  ) ||
  hasText(
    reviewCopy.favoriteThing
  ) ||
  hasText(
    reviewCopy.biggestComplaint
  ) ||
  hasText(
    reviewCopy.vibeCheck
  )


 const miniReviewContainsProtectedContent =
  Boolean(
    reviewCopy
      .favoriteThingHasSpoiler
  ) ||
  Boolean(
    reviewCopy
      .biggestComplaintHasSpoiler
  )

const mayShowMiniReviewCopy =
  hasText(
    resolvedReview.miniReviewText
  ) &&
  (
    reviewOwnedByCurrentUser ||
    !miniReviewContainsProtectedContent
  )


  const title =
    layoutObject
      ?.storyChapter
      ?.title ||
    "The Book Review"

  const subtitle =
    layoutObject
      ?.storyChapter
      ?.subtitle ||
    "What remained after the final page"

  return (
    <section className="book-journey-composition__review">
      <header className="book-journey-composition__chapter-heading">
        <p className="scrapbook-kicker">
          Final Chapter
        </p>

        <h2>{title}</h2>

        {subtitle && (
          <p>{subtitle}</p>
        )}
      </header>

      <div className="book-journey-composition__score-grid">
        <div className="score-card">
          <p>On Paper Score</p>

         <h3>
  {formatScore(
    resolvedReview.bookScore
  )}
</h3>
        </div>

        <div className="score-card">
          <p>Obsession Score</p>

         <h3>
  {formatScore(
    resolvedReview.obsessionScore
  )}
</h3>
        </div>

        <div className="score-card">
          <p>Spice Rating</p>

         <h3>
  {formatScore(
    resolvedReview.metrics
      ?.spice
  )}
</h3>
        </div>

        <div className="score-card">
          <p>Recommendation</p>

         <h3>
  {resolvedReview
    .recommendationLevel ||
    "Not selected"}
</h3>
        </div>
      </div>
  {hasReviewCopyContent && (
  <div className="book-journey-composition__review-copy">
    {tropes.length > 0 && (
      <p>
        <strong>
          Tropes
        </strong>
        <br />

        {tropes.join(" • ")}
      </p>
    )}

    {hasText(
      reviewCopy.oneSentenceReview
    ) && (
      <p>
        <strong>
          One-Sentence Review
        </strong>
        <br />

        {
          reviewCopy
            .oneSentenceReview
        }
      </p>
    )}

    {SpoilerReviewSection && (
      <>
        {hasText(
          reviewCopy.favoriteThing
        ) && (
          <SpoilerReviewSection
            label="Favorite Thing"
            value={
              reviewCopy
                .favoriteThing
            }
            hasSpoiler={Boolean(
              reviewCopy
                .favoriteThingHasSpoiler
            )}
            shouldHide={
              Boolean(
                reviewCopy
                  .favoriteThingHasSpoiler
              ) &&
              !reviewOwnedByCurrentUser
            }
            isRevealed={
              typeof isSpoilerRevealed ===
              "function"
                ? isSpoilerRevealed(
                    resolvedReview.id,
                    "favoriteThing"
                  )
                : false
            }
            onToggleReveal={() =>
              toggleSpoilerReveal?.(
                resolvedReview.id,
                "favoriteThing"
              )
            }
          />
        )}

        {hasText(
          reviewCopy.biggestComplaint
        ) && (
          <SpoilerReviewSection
            label="Biggest Complaint"
            value={
              reviewCopy
                .biggestComplaint
            }
            hasSpoiler={Boolean(
              reviewCopy
                .biggestComplaintHasSpoiler
            )}
            shouldHide={
              Boolean(
                reviewCopy
                  .biggestComplaintHasSpoiler
              ) &&
              !reviewOwnedByCurrentUser
            }
            isRevealed={
              typeof isSpoilerRevealed ===
              "function"
                ? isSpoilerRevealed(
                    resolvedReview.id,
                    "biggestComplaint"
                  )
                : false
            }
            onToggleReveal={() =>
              toggleSpoilerReveal?.(
                resolvedReview.id,
                "biggestComplaint"
              )
            }
          />
        )}
      </>
    )}

    {hasText(
      reviewCopy.vibeCheck
    ) && (
      <p>
        <strong>
          Vibe Check
        </strong>
        <br />

        {reviewCopy.vibeCheck}
      </p>
    )}
  </div>
)}

     {reviewGraphicUrl && (
  <div
    className={[
      "score-card",
      "book-journey-composition__review-graphic-card",
    ].join(" ")}
  >
    <p>Review Graphic</p>

    <img
      src={reviewGraphicUrl}
      alt="Generated review graphic"
      className="review-graphic"
    />
  </div>
)}

      {mayShowMiniReviewCopy && (
  <div
    className={[
      "score-card",
      "book-journey-composition__mini-review",
    ].join(" ")}
  >
    <p>Mini Review Copy</p>

    <pre className="book-journey-composition__mini-review-text">
      {resolvedReview.miniReviewText}
    </pre>
  </div>
)}
    </section>
  )
}

export default ReviewRenderer