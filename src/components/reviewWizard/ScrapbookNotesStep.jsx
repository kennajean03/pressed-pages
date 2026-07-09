import ScrapbookPanel from "../scrapbook/ScrapbookPanel"

function ScrapbookNotesStep({
  editingReviewId,
  tropes,
  tropeInput,
  review,
  setStep,
  setTropeInput,
  addTropeTag,
  removeTropeTag,
  handleTropeInputKeyDown,
  updateReview,
  ReviewTextArea,
}) {
  return (
    <section className="review-step review-step--scrapbook-notes scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 3 of 5"}
        </p>

        <h1>Scrapbook Notes</h1>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel"
        scrapbookId="wizard.scrapbookNotes"
        objectType="action"
        variant="scrapbookNotes"
        recipeId="wizard.scrapbookNotes"
      >
        <div className="review-field">
          <label htmlFor="trope-tag-input">Tropes & Themes</label>

          <div className="trope-tag-input-wrap">
            {tropes.map((trope) => (
              <button
                type="button"
                key={trope}
                className="trope-tag-pill"
                onClick={() => removeTropeTag(trope)}
                aria-label={`Remove ${trope}`}
              >
                {trope} <span>×</span>
              </button>
            ))}

            <input
              id="trope-tag-input"
              type="text"
              value={tropeInput}
              placeholder="Add a trope or theme..."
              onChange={(event) => setTropeInput(event.target.value)}
              onKeyDown={handleTropeInputKeyDown}
              onBlur={() => addTropeTag()}
            />
          </div>

          <p className="field-helper-text">
            Press Enter or comma to add. Click a tag to remove it.
          </p>
        </div>

        <ReviewTextArea
          label="One-Sentence Review"
          value={review.oneSentenceReview}
          onChange={(value) => updateReview("oneSentenceReview", value)}
        />

        <ReviewTextArea
          label="Favorite Thing"
          value={review.favoriteThing}
          onChange={(value) => updateReview("favoriteThing", value)}
          spoilerChecked={Boolean(review.favoriteThingHasSpoiler)}
          onSpoilerChange={(checked) =>
            updateReview("favoriteThingHasSpoiler", checked)
          }
        />

        <ReviewTextArea
          label="Biggest Complaint"
          value={review.biggestComplaint}
          onChange={(value) => updateReview("biggestComplaint", value)}
          spoilerChecked={Boolean(review.biggestComplaintHasSpoiler)}
          onSpoilerChange={(checked) =>
            updateReview("biggestComplaintHasSpoiler", checked)
          }
        />

        <ReviewTextArea
          label="Vibe Check"
          placeholder="This book felt like..."
          value={review.vibeCheck}
          onChange={(value) => updateReview("vibeCheck", value)}
        />
      </ScrapbookPanel>

      <div className="scrapbook-action-row">
        <button onClick={() => setStep(2)}>
          Back
        </button>

        <button onClick={() => setStep(4)}>
          Next: Obsession Score
        </button>
      </div>
    </section>
  )
}

export default ScrapbookNotesStep