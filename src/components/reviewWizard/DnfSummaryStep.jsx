import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./DnfSummaryStep.css"

function DnfSummaryStep({
  editingReviewId,
  bookInfo,
  dnfInfo,
  dnfReviewText,
  saveReview,
  saveMessage,
  setStep,
  setLibraryFilter,
  leaveReviewEditor,
}) {
  const rawPercent = String(dnfInfo.percent ?? "")
    .replace(/[^\d.]/g, "")
  const numericPercent = Number(rawPercent)
  const normalizedPercent =
    rawPercent !== "" && Number.isFinite(numericPercent)
      ? String(Math.min(100, Math.max(0, numericPercent)))
      : ""
  const hasPercent = normalizedPercent !== ""

  async function openDnfShelf() {
    setLibraryFilter("dnf")
    await leaveReviewEditor("library")
  }

  return (
    <section className="review-step review-step--dnf-summary scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit DNF" : "DNF Summary"}
        </p>

        <h1>DNF Summary</h1>

        <p className="scrapbook-page__intro">
          File the unfinished story with the reason you left it behind—and
          keep your reading time available for something better.
        </p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel dnf-summary-step__panel"
        scrapbookId="wizard.dnfSummary"
        objectType="action"
        variant="dnfSummary"
        recipeId="wizard.dnfSummary"
        hiddenAnchorTypes={[
          "libraryCard",
          "dateStamp",
        ]}
      >
        <div className="dnf-summary-step__hero">
          <div className="dnf-summary-step__cover-wrap">
            {bookInfo.coverUrl ? (
              <img
                src={bookInfo.coverUrl}
                alt={`Cover of ${bookInfo.title || "the DNF book"}`}
                className="dnf-summary-step__cover"
              />
            ) : (
              <div className="dnf-summary-step__cover-placeholder">
                Cover pending
              </div>
            )}
          </div>

          <div className="dnf-summary-step__book-copy">
            <p className="dnf-summary-step__kicker">
              Unfinished reading file
            </p>

            <span className="dnf-summary-step__stamp">DNF</span>

            <h2>{bookInfo.title || "Untitled Book"}</h2>

            <p>by {bookInfo.author || "Unknown Author"}</p>

            <small>
              {bookInfo.format || "Format not selected"} • DNF
            </small>
          </div>
        </div>

        <div className="dnf-summary-step__percent-card">
          <p className="dnf-summary-step__kicker">
            Last bookmark
          </p>

          {hasPercent ? (
            <>
              <div>
                <strong>{normalizedPercent}</strong>
                <span>%</span>
              </div>

              <p>of the book completed</p>
            </>
          ) : (
            <p className="dnf-summary-step__missing-value">
              Not listed
            </p>
          )}
        </div>

        <div className="dnf-summary-step__author-card">
          <p className="dnf-summary-step__kicker">
            Author check
          </p>

          <h3>Would read this author again?</h3>

          <strong>{dnfInfo.wouldReadAuthorAgain || "Maybe"}</strong>
        </div>

        <div className="dnf-summary-step__reason-card">
          <p className="dnf-summary-step__kicker">
            Why I set it down
          </p>

          <h3>DNF Reason</h3>

          <p>{dnfInfo.reason || "No reason listed"}</p>
        </div>

        <div className="dnf-summary-step__copy-card">
          <p className="dnf-summary-step__kicker">
            Ready to copy
          </p>

          <h3>DNF Copy</h3>

          <pre>{dnfReviewText}</pre>
        </div>

        <div className="dnf-summary-step__closing-note">
          <p>Permission to move on</p>
          <span>
            The unfinished book stays recorded without taking another minute
            from the stories you are more excited to read.
          </span>
        </div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row dnf-summary-step__actions">
        <button type="button" onClick={() => setStep("dnf")}>
          Back
        </button>

        <button
          type="button"
          className="dnf-summary-step__save-action"
          onClick={saveReview}
        >
          {editingReviewId ? "Update DNF" : "Save DNF"}
        </button>

        <button
          type="button"
          onClick={openDnfShelf}
        >
          View DNF Shelf
        </button>
      </div>

      {saveMessage && (
        <p
          className="dnf-summary-step__save-message"
          role="status"
          aria-live="polite"
        >
          {saveMessage}
        </p>
      )}
    </section>
  )
}

export default DnfSummaryStep
