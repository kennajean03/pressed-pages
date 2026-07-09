import ScrapbookPanel from "../scrapbook/ScrapbookPanel"

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
        className="scrapbook-form-panel"
        scrapbookId="wizard.bookScore"
        objectType="action"
        variant="bookScore"
        recipeId="wizard.bookScore"
      >
        <ScoreSlider
          label="Plot"
          question="Did the story keep your attention?"
          value={scores.plot}
          onChange={(value) => updateScore("plot", value)}
        />

        <ScoreSlider
          label="Vibe"
          question="Did the book deliver the atmosphere it promised?"
          value={scores.vibe}
          onChange={(value) => updateScore("vibe", value)}
        />

        <ScoreSlider
          label="Characters"
          question="Did you care about these people?"
          value={scores.characters}
          onChange={(value) => updateScore("characters", value)}
        />

        <ScoreSlider
          label="Writing Style"
          question="Did the author's voice work for you?"
          value={scores.writingStyle}
          onChange={(value) => updateScore("writingStyle", value)}
        />

        <ScoreSlider
          label="Enjoyability"
          question="Did you want to keep reading?"
          value={scores.enjoyability}
          onChange={(value) => updateScore("enjoyability", value)}
        />

        <div className="score-card">
          <p>On Paper Score</p>
          <h2>{bookScore.toFixed(1)} / 5</h2>
        </div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row">
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