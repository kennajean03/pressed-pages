import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./BookScoreStep.css"

function BookScoreStep({
  editingReviewId,
  scores,
  bookScore,
  updateScore,
  setStep,
  ScoreSlider,
}) {
  return (
    <section className="review-step review-step--book-score scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 1 of 5"}
        </p>

        <h1>Book Score</h1>

        <p className="scrapbook-page__intro">
          Rate how the book worked on paper.
        </p>
      </div>

      <ScrapbookPanel
className="scrapbook-form-panel book-score-step__panel"
        scrapbookId="wizard.bookScore"
        objectType="action"
        variant="bookScore"
        recipeId="wizard.bookScore"
      >
        <div className="book-score-step__metric-card book-score-step__metric-card--plot">
  <ScoreSlider
    label="Plot"
    question="Did the story keep your attention?"
    value={scores.plot}
    onChange={(value) => updateScore("plot", value)}
  />
</div>

<div className="book-score-step__metric-card book-score-step__metric-card--vibe">
  <ScoreSlider
    label="Vibe"
    question="Did the book deliver the atmosphere it promised?"
    value={scores.vibe}
    onChange={(value) => updateScore("vibe", value)}
  />
</div>

<div className="book-score-step__metric-card book-score-step__metric-card--characters">
  <ScoreSlider
    label="Characters"
    question="Did you care about these people?"
    value={scores.characters}
    onChange={(value) => updateScore("characters", value)}
  />
</div>

<div className="book-score-step__metric-card book-score-step__metric-card--writing">
  <ScoreSlider
    label="Writing Style"
    question="Did the author's voice work for you?"
    value={scores.writingStyle}
    onChange={(value) => updateScore("writingStyle", value)}
  />
</div>

<div className="book-score-step__metric-card book-score-step__metric-card--enjoyability">
  <ScoreSlider
    label="Enjoyability"
    question="Did you want to keep reading?"
    value={scores.enjoyability}
    onChange={(value) => updateScore("enjoyability", value)}
  />
</div>

        <div className="score-card book-score-step__total-card">
  <p className="book-score-step__total-label">
    On Paper Score
  </p>

  <div className="book-score-step__total-score">
    <strong>{bookScore.toFixed(1)}</strong>
    <span>/ 5</span>
  </div>

  <p className="book-score-step__total-note">
    Your weighted rating across plot, vibe, characters,
    writing style, and enjoyability.
  </p>
</div>
      </ScrapbookPanel>

<div className="scrapbook-action-row book-score-step__actions">
          <button onClick={() => setStep(0)}>
          Back
        </button>

        <button onClick={() => setStep(2)}>
          Next: Romance Metrics
        </button>
      </div>
    </section>
  )
}

export default BookScoreStep