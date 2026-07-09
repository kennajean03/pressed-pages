import ScrapbookPanel from "../scrapbook/ScrapbookPanel"

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
}) {
  return (
    <section className="review-step review-step--summary scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 5 of 5"}
        </p>

        <h1>Review Summary</h1>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel"
        scrapbookId="wizard.reviewSummary"
        objectType="action"
        variant="reviewSummary"
        recipeId="wizard.reviewSummary"
      >
        {bookInfo.coverUrl && (
          <img
            src={bookInfo.coverUrl}
            alt="Book cover"
            className="book-cover"
          />
        )}

        {isFavorite && <p>🧠 Brain Chemistry Book</p>}

        <h2>{bookInfo.title || "Untitled Book"}</h2>

        <p>{bookInfo.author || "Unknown Author"}</p>

        <p>
          {bookInfo.format} • {bookInfo.status}
        </p>

        <div className="score-card">
          <p>On Paper Score</p>
          <h2>{bookScore.toFixed(1)} / 5</h2>
        </div>

        <div className="score-card">
          <p>Obsession Score</p>
          <h2>{obsessionScore} / 5</h2>
        </div>

        <div className="score-card">
          <p>Recommendation</p>
          <h2>{recommendationLevel}</h2>
        </div>

        <div className="score-card">
          <p>Spice Rating</p>
          <h2>{metrics.spice} / 5</h2>
        </div>

        <p>
          <strong>Tropes & Themes:</strong>
          <br />
          {tropes.length > 0 ? tropes.join(" • ") : "None selected"}
        </p>

        <p>
          <strong>One-Sentence Review:</strong>
          <br />
          {review.oneSentenceReview}
        </p>

        <p>
          <strong>Favorite Thing:</strong>
          <br />
          {review.favoriteThing}
        </p>

        <p>
          <strong>Biggest Complaint:</strong>
          <br />
          {review.biggestComplaint}
        </p>

        <p>
          <strong>Vibe Check:</strong>
          <br />
          {review.vibeCheck}
        </p>

        {bookInfo.reviewGraphicUrl && (
          <div className="score-card">
            <p>Review Graphic</p>

            <img
              src={bookInfo.reviewGraphicUrl}
              alt="Review graphic"
              className="review-graphic"
            />
          </div>
        )}

        <div className="score-card">
          <p>Mini Review Copy</p>
          <pre>{miniReviewText}</pre>
        </div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row">
        <button onClick={() => setStep(4)}>
          Back
        </button>

        <button onClick={saveReview}>
          {editingReviewId ? "Update Review" : "Save Review"}
        </button>

        <button onClick={() => setStep("library")}>
          View Library
        </button>
      </div>

      {saveMessage && <p>{saveMessage}</p>}
    </section>
  )
}

export default ReviewSummaryStep