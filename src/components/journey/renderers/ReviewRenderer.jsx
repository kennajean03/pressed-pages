import "./ReviewRenderer.css"

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

  const reviewCopy =
    resolvedReview.review || {}

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
            {resolvedReview.bookScore} / 5
          </h3>
        </div>

        <div className="score-card">
          <p>Obsession Score</p>

          <h3>
            {resolvedReview.obsessionScore}{" "}
            / 5
          </h3>
        </div>

        <div className="score-card">
          <p>Spice Rating</p>

          <h3>
            {resolvedReview.metrics
              ?.spice || 0}{" "}
            / 5
          </h3>
        </div>

        <div className="score-card">
          <p>Recommendation</p>

          <h3>
            {
              resolvedReview
                .recommendationLevel
            }
          </h3>
        </div>
      </div>

      <div className="book-journey-composition__review-copy">
        <p>
          <strong>Tropes</strong>
          <br />

          {(resolvedReview.tropes || [])
            .length > 0
            ? (
                resolvedReview.tropes ||
                []
              ).join(" • ")
            : "None selected"}
        </p>

        <p>
          <strong>
            One-Sentence Review
          </strong>
          <br />

          {reviewCopy
            .oneSentenceReview ||
            ""}
        </p>

        {SpoilerReviewSection && (
          <>
            <SpoilerReviewSection
              label="Favorite Thing"
              value={
                reviewCopy
                  .favoriteThing ||
                ""
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

            <SpoilerReviewSection
              label="Biggest Complaint"
              value={
                reviewCopy
                  .biggestComplaint ||
                ""
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
          </>
        )}

        <p>
          <strong>
            Vibe Check
          </strong>
          <br />

          {reviewCopy.vibeCheck || ""}
        </p>
      </div>

      {bookInfo.reviewGraphicUrl && (
        <div className="score-card">
          <p>Review Graphic</p>

          <img
            src={
              bookInfo.reviewGraphicUrl
            }
            alt="Review graphic"
            className="review-graphic"
          />
        </div>
      )}

      <div
  className={[
    "score-card",
    "book-journey-composition__mini-review",
  ].join(" ")}
>
  <p>Mini Review Copy</p>

  <pre className="book-journey-composition__mini-review-text">
    {resolvedReview
      .miniReviewText}
  </pre>
</div>
    </section>
  )
}

export default ReviewRenderer