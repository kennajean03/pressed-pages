import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./ReviewSummaryStep.css"

function ReviewSummaryStep({
  editingReviewId,
  bookInfo,
  isFavorite,
  bookScore,
  obsessionScore,
  recommendationLevel,
  metrics,
  tropes,
  review,
  miniReviewText,
  saveReview,
  saveMessage,
  setStep,
  leaveReviewEditor,
}) {
  return (
    <section className="review-step review-step--summary scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 5 of 5"}
        </p>

        <h1>Review Summary</h1>
        <p className="scrapbook-page__intro">
  Gather the final rating, preserved thoughts, and emotional
  evidence before filing this book in your library.
</p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel review-summary-step__panel"
        scrapbookId="wizard.reviewSummary"
        objectType="action"
        variant="reviewSummary"
        recipeId="wizard.reviewSummary"
      >
        <div className="review-summary-step__hero">
  {bookInfo.coverUrl && (
    <div className="review-summary-step__cover-wrap">
      <img
        src={bookInfo.coverUrl}
        alt={`Cover of ${bookInfo.title || "the reviewed book"}`}
        className="review-summary-step__cover"
      />
    </div>
  )}

  <div className="review-summary-step__book-details">
    <p className="review-summary-step__kicker">
      Final review file
    </p>

    {isFavorite && (
      <p className="review-summary-step__favorite-stamp">
        🧠 Brain Chemistry Book
      </p>
    )}

    <h2>
      {bookInfo.title || "Untitled Book"}
    </h2>

    <p className="review-summary-step__author">
      by {bookInfo.author || "Unknown Author"}
    </p>

    <p className="review-summary-step__book-meta">
      {bookInfo.format || "Format not selected"}
      <span aria-hidden="true"> • </span>
      {bookInfo.status || "Status not selected"}
    </p>
  </div>
</div>

<div className="review-summary-step__score-grid">
  <div className="review-summary-step__score-card">
    <p>On Paper Score</p>

    <div>
      <strong>{bookScore.toFixed(1)}</strong>
      <span>/ 5</span>
    </div>
  </div>

  <div className="review-summary-step__score-card">
    <p>Obsession Score</p>

    <div>
      <strong>{obsessionScore}</strong>
      <span>/ 5</span>
    </div>
  </div>

  <div className="review-summary-step__score-card">
    <p>Spice Rating</p>

    <div>
      <strong>{metrics.spice}</strong>
      <span>/ 5</span>
    </div>
  </div>

  <div className="review-summary-step__score-card review-summary-step__recommendation-score">
    <p>Recommendation</p>

    <strong>
      {recommendationLevel || "Not selected"}
    </strong>
  </div>
</div>

<div className="review-summary-step__tropes">
  <p className="review-summary-step__kicker">
    Story markers
  </p>

  <h3>Tropes &amp; Themes</h3>

  <div className="review-summary-step__trope-list">
    {tropes.length > 0 ? (
      tropes.map((trope) => (
        <span key={trope}>
          {trope}
        </span>
      ))
    ) : (
      <p>No tropes or themes added.</p>
    )}
  </div>
</div>

<div className="review-summary-step__note review-summary-step__note--sentence">
  <p className="review-summary-step__kicker">
    The first thing to remember
  </p>

  <h3>One-Sentence Review</h3>

  <p>
    {review.oneSentenceReview?.trim() ||
      "No one-sentence review added yet."}
  </p>
</div>

<div className="review-summary-step__note review-summary-step__note--favorite">
  <div className="review-summary-step__note-heading">
    <div>
      <p className="review-summary-step__kicker">
        What stayed with me
      </p>

      <h3>Favorite Thing</h3>
    </div>

    {review.favoriteThingHasSpoiler && (
      <span className="review-summary-step__spoiler-mark">
        Contains spoilers
      </span>
    )}
  </div>

  <p>
    {review.favoriteThing?.trim() ||
      "No favorite thing added yet."}
  </p>
</div>

<div className="review-summary-step__note review-summary-step__note--complaint">
  <div className="review-summary-step__note-heading">
    <div>
      <p className="review-summary-step__kicker">
        What did not work
      </p>

      <h3>Biggest Complaint</h3>
    </div>

    {review.biggestComplaintHasSpoiler && (
      <span className="review-summary-step__spoiler-mark">
        Contains spoilers
      </span>
    )}
  </div>

  <p>
    {review.biggestComplaint?.trim() ||
      "No complaint added yet."}
  </p>
</div>

<div className="review-summary-step__note review-summary-step__note--vibe">
  <p className="review-summary-step__kicker">
    The atmosphere I am keeping
  </p>

  <h3>Vibe Check</h3>

  <p>
    {review.vibeCheck?.trim() ||
      "No vibe check added yet."}
  </p>
</div>

{bookInfo.reviewGraphicUrl && (
  <div className="review-summary-step__graphic-card">
    <p className="review-summary-step__kicker">
      Preserved shareable
    </p>

    <h3>Review Graphic</h3>

    <img
      src={bookInfo.reviewGraphicUrl}
      alt="Uploaded review graphic"
      className="review-summary-step__graphic"
    />
  </div>
)}

<div className="review-summary-step__mini-review">
  <p className="review-summary-step__kicker">
    Ready to copy
  </p>

  <h3>Mini Review Copy</h3>

  <pre>{miniReviewText}</pre>
</div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row review-summary-step__actions">
  <button
    type="button"
    onClick={() => setStep(4)}
  >
    Back
  </button>

  <button
    type="button"
    className="review-summary-step__save-action"
    onClick={saveReview}
  >
    {editingReviewId
      ? "Update Review"
      : "Save Review"}
  </button>

  <button
    type="button"
    onClick={() =>
      leaveReviewEditor("library")
    }
  >
    View Library
  </button>
</div>

      {saveMessage && (
  <p
    className="review-summary-step__save-message"
    role="status"
    aria-live="polite"
  >
    {saveMessage}
  </p>
)}
    </section>
  )
}

export default ReviewSummaryStep
