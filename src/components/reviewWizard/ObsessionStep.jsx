import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./ObsessionStep.css"

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
className="scrapbook-form-panel obsession-step__panel"
        scrapbookId="wizard.obsession"
        objectType="action"
        variant="obsession"
        recipeId="wizard.obsession"
      >
       <div className="obsession-step__score-card">
  <p className="obsession-step__kicker">
    Immediate reaction
  </p>

  <div className="obsession-step__score-display">
    <strong>{obsessionScore}</strong>
    <span>/ 5</span>
  </div>

  <p className="obsession-step__score-copy">
    How completely did this book take over your thoughts?
  </p>

  <div className="obsession-step__range-wrap">
    <input
      type="range"
      min="1"
      max="5"
      step="1"
      value={obsessionScore}
      aria-label="Obsession score"
      onChange={(event) =>
        setObsessionScore(
          Number(event.target.value)
        )
      }
    />

    <div
      className="obsession-step__range-labels"
      aria-hidden="true"
    >
      <span>Liked it</span>
      <span>Consumed me</span>
    </div>
  </div>
</div>

<label className="obsession-step__favorite-card">
  <input
    type="checkbox"
    checked={isFavorite}
    onChange={(event) =>
      setIsFavorite(
        event.target.checked
      )
    }
  />

  <span className="obsession-step__favorite-mark">
    🧠
  </span>

  <span className="obsession-step__favorite-copy">
    <strong>
      This book altered my brain chemistry
    </strong>

    <small>
      Preserve it as one of the books that permanently
      changed the wiring.
    </small>
  </span>
</label>

<label className="obsession-step__recommendation-card">
  <span className="obsession-step__kicker">
    Final recommendation
  </span>

  <strong>
    Who would you hand this book to?
  </strong>

  <select
    value={recommendationLevel}
    onChange={(event) =>
      setRecommendationLevel(
        event.target.value
      )
    }
  >
    <option>Skip It</option>
    <option>
      Only If The Trope Interests You
    </option>
    <option>Recommend</option>
    <option>Strongly Recommend</option>
    <option>
      Altered My Brain Chemistry
    </option>
  </select>
</label>

<div className="obsession-step__closing-note">
  <p>Filed after the final page</p>

  <span>
    Your obsession score stays separate from the weighted
    On Paper Score because sometimes a book is imperfect
    and still becomes unforgettable.
  </span>
</div>
      </ScrapbookPanel>

<div className="scrapbook-action-row obsession-step__actions">
          <button onClick={() => setStep(3)}>Back</button>
        <button onClick={() => setStep(5)}>Next: Results</button>
      </div>
    </section>
  )
}

export default ObsessionStep