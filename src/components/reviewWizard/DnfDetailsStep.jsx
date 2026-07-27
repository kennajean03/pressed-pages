import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./DnfDetailsStep.css"

function DnfDetailsStep({
  editingReviewId,
  bookInfo,
  dnfInfo,
  updateDnfInfo,
  setStep,
  ReviewTextArea,
}) {
  const percentValue = String(dnfInfo.percent ?? "")
    .replace(/[^\d.]/g, "")

  function updatePercent(value) {
    if (value === "") {
      updateDnfInfo("percent", "")
      return
    }

    const numericValue = Number(value)

    if (!Number.isFinite(numericValue)) return

    updateDnfInfo(
      "percent",
      String(Math.min(100, Math.max(0, numericValue)))
    )
  }

  return (
    <section className="review-step review-step--dnf-details scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit DNF" : "DNF Details"}
        </p>

        <h1>DNF Tracker</h1>

        <p className="scrapbook-page__intro">
          Closing a book early is still part of your reading story. Preserve
          where you stopped and what made you set it down.
        </p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel dnf-details-step__panel"
        scrapbookId="wizard.dnfDetails"
        objectType="action"
        variant="dnfDetails"
        recipeId="wizard.dnfDetails"
      >
        <div className="dnf-details-step__book-file">
          <div className="dnf-details-step__cover-wrap">
            {bookInfo.coverUrl ? (
              <img
                src={bookInfo.coverUrl}
                alt={`Cover of ${bookInfo.title || "the DNF book"}`}
                className="dnf-details-step__cover"
              />
            ) : (
              <div className="dnf-details-step__cover-placeholder">
                Cover pending
              </div>
            )}
          </div>

          <div className="dnf-details-step__book-copy">
            <p className="dnf-details-step__kicker">
              Closed before the final page
            </p>

            <h2>{bookInfo.title || "Untitled Book"}</h2>

            <p>
              by {bookInfo.author || "Unknown Author"}
            </p>

            <span>
              {bookInfo.format || "Format not selected"} • DNF
            </span>
          </div>
        </div>

        <div className="dnf-details-step__percent-card">
          <p className="dnf-details-step__kicker">
            Last bookmark
          </p>

          <div className="review-field">
            <label htmlFor="dnf-percent">DNF Percent</label>

            <div className="dnf-details-step__percent-input">
              <input
                id="dnf-percent"
                type="number"
                min="0"
                max="100"
                step="1"
                inputMode="numeric"
                value={percentValue}
                onChange={(event) => updatePercent(event.target.value)}
              />

              <span aria-hidden="true">%</span>
            </div>
          </div>

          <p className="dnf-details-step__helper">
            Enter the approximate percentage you reached before stopping.
          </p>
        </div>

        <div className="dnf-details-step__reason-card">
          <p className="dnf-details-step__kicker">
            What made me close it
          </p>

          <ReviewTextArea
            label="DNF Reason"
            value={dnfInfo.reason}
            placeholder="Why did you quit?"
            onChange={(value) => updateDnfInfo("reason", value)}
          />
        </div>

        <label className="dnf-details-step__author-card">
          <span className="dnf-details-step__kicker">
            Future shelf check
          </span>

          <strong>Would you read this author again?</strong>

          <select
            value={dnfInfo.wouldReadAuthorAgain}
            onChange={(event) =>
              updateDnfInfo("wouldReadAuthorAgain", event.target.value)
            }
          >
            <option>Yes</option>
            <option>Maybe</option>
            <option>No</option>
          </select>
        </label>

        <div className="dnf-details-step__permission-note">
          <p>A note from your reading life</p>
          <span>
            Not every book needs to be finished to teach you something about
            your taste, timing, or boundaries.
          </span>
        </div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row dnf-details-step__actions">
        <button type="button" onClick={() => setStep(0)}>
          Back
        </button>

        <button
          type="button"
          className="dnf-details-step__next-action"
          onClick={() => setStep("dnfSummary")}
        >
          Next: DNF Summary
        </button>
      </div>
    </section>
  )
}

export default DnfDetailsStep
