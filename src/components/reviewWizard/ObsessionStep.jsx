import ScrapbookPanel from "../scrapbook/ScrapbookPanel"

function ObsessionStep({
  editingReviewId,
  obsessionScore,
  isFavorite,
  recommendationLevel,
  setObsessionScore,
  setIsFavorite,
  setRecommendationLevel,
  setStep,
}) {
  return (
    <section className="review-step review-step--obsession scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 4 of 5"}
        </p>

        <h1>❤️ Obsession Score</h1>

        <p className="scrapbook-page__intro">
          I just finished this book. How obsessed am I?
        </p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel"
        scrapbookId="wizard.obsession"
        objectType="action"
        variant="obsession"
        recipeId="wizard.obsession"
      >
        <div className="score-card">
          <h2>{obsessionScore} / 5</h2>
        </div>

        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={obsessionScore}
          onChange={(e) => setObsessionScore(Number(e.target.value))}
        />

        <label>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          This book altered my brain chemistry
        </label>

        <label>
          Recommendation Level
          <select
            value={recommendationLevel}
            onChange={(e) => setRecommendationLevel(e.target.value)}
          >
            <option>Skip It</option>
            <option>Only If The Trope Interests You</option>
            <option>Recommend</option>
            <option>Strongly Recommend</option>
            <option>Altered My Brain Chemistry</option>
          </select>
        </label>
      </ScrapbookPanel>

      <div className="scrapbook-action-row">
        <button onClick={() => setStep(3)}>Back</button>
        <button onClick={() => setStep(5)}>Next: Results</button>
      </div>
    </section>
  )
}

export default ObsessionStep