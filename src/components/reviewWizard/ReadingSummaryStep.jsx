import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./ReadingSummaryStep.css"

function ReadingSummaryStep({
  editingReviewId,
  bookInfo,
  readingProgressPercent,
  readingReviewText,
  tbrReviewText,
  saveReview,
  saveMessage,
  setStep,
  setLibraryFilter,
  leaveReviewEditor,
  getProgressUnitCopy,
  ProgressBar,
}) {
  const isTbr =
    bookInfo.status === "TBR"

  const progressCopy =
    getProgressUnitCopy(bookInfo)

  const summaryCopy = isTbr
    ? tbrReviewText
    : readingReviewText

  async function openDestinationShelf() {
    if (isTbr) {
      setLibraryFilter("tbr")
    }

    await leaveReviewEditor(
      isTbr
        ? "library"
        : "currentlyReading"
    )
  }

  return (
    <section
      className={[
        "review-step",
        "review-step--reading-summary",
        isTbr
          ? "review-step--tbr-summary"
          : "",
        "scrapbook-page",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {isTbr
            ? editingReviewId
              ? "Edit TBR Entry"
              : "TBR Shelf"
            : editingReviewId
              ? "Edit Reading Progress"
              : "Currently Reading"}
        </p>

        <h1>
          {isTbr
            ? "Saved to TBR"
            : "Reading Progress"}
        </h1>

        <p className="scrapbook-page__intro">
          {isTbr
            ? "Preserve this book on your waiting shelf until the right reading mood finds it."
            : "File this book on your active shelf and preserve exactly where the story is waiting for you."}
        </p>
      </div>

      <ScrapbookPanel
        className={[
          "scrapbook-form-panel",
          "reading-summary-step__panel",
          isTbr
            ? "reading-summary-step__panel--tbr"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        scrapbookId="wizard.readingSummary"
        objectType="action"
        variant="readingSummary"
        recipeId="wizard.readingSummary"
      >
        <div
          className={[
            "reading-summary-step__hero",
            isTbr
              ? "reading-summary-step__hero--tbr"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="reading-summary-step__cover-wrap">
            {bookInfo.coverUrl ? (
              <img
                src={bookInfo.coverUrl}
                alt={`Cover of ${
                  bookInfo.title ||
                  "the selected book"
                }`}
                className="reading-summary-step__cover"
              />
            ) : (
              <div className="reading-summary-step__cover-placeholder">
                <span>Cover pending</span>
              </div>
            )}
          </div>

          <div className="reading-summary-step__book-details">
            <p className="reading-summary-step__kicker">
              {isTbr
                ? "TBR shelf file"
                : "Active reading file"}
            </p>

            <h2>
              {bookInfo.title ||
                "Untitled Book"}
            </h2>

            <p className="reading-summary-step__author">
              by{" "}
              {bookInfo.author ||
                "Unknown Author"}
            </p>

            <p className="reading-summary-step__meta">
              {bookInfo.format ||
                "Format not selected"}

              <span aria-hidden="true">
                {" "}
                •{" "}
              </span>

              {bookInfo.status ||
                "Reading"}
            </p>
          </div>
        </div>

        {isTbr ? (
          <div className="reading-summary-step__tbr-card">
            <div className="reading-summary-step__tbr-stamp">
              TBR
            </div>

            <p className="reading-summary-step__kicker">
              Saved for later
            </p>

            <h3>Waiting for its turn</h3>

            <p className="reading-summary-step__tbr-copy">
              This book is safely filed on your TBR
              shelf. Later, it can be chosen for your
              curated Next 5 or moved directly into
              Currently Reading.
            </p>

            <div className="reading-summary-step__tbr-details">
              {bookInfo.series && (
                <span>
                  {bookInfo.series}
                  {bookInfo.bookNumber
                    ? ` #${bookInfo.bookNumber}`
                    : ""}
                </span>
              )}

              {bookInfo.genre && (
                <span>
                  {bookInfo.genre}
                </span>
              )}

              {bookInfo.totalPages && (
                <span>
                  {progressCopy.totalLabel}:{" "}
                  {bookInfo.totalPages}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="reading-summary-step__progress-card">
            <p className="reading-summary-step__kicker">
              Current bookmark
            </p>

            <div className="reading-summary-step__percent">
              <strong>
                {readingProgressPercent}
              </strong>

              <span>%</span>
            </div>

            <p className="reading-summary-step__progress-line">
              {progressCopy.progressLine(
                bookInfo.currentPage,
                bookInfo.totalPages
              )}
            </p>

            <ProgressBar
              percent={
                readingProgressPercent
              }
            />

            <div className="reading-summary-step__progress-labels">
              <span>Story started</span>
              <span>Final page</span>
            </div>
          </div>
        )}

        <div className="reading-summary-step__copy-card">
          <p className="reading-summary-step__kicker">
            Ready to copy
          </p>

          <h3>
            {isTbr
              ? "TBR Shelf Copy"
              : "Currently Reading Copy"}
          </h3>

          <pre>
            {summaryCopy}
          </pre>
        </div>

        <div className="reading-summary-step__closing-note">
          <p>
            {isTbr
              ? "Waiting for the right chapter"
              : "Saved between chapters"}
          </p>

          <span>
            {isTbr
              ? "Your full TBR remains flexible. A future Next 5 shelf will let you intentionally choose which books are closest to becoming your next read."
              : "You can return through Currently Reading to log sessions, save quotes, preserve photos, and update your progress."}
          </span>
        </div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row reading-summary-step__actions">
        <button
          type="button"
          onClick={() => setStep(0)}
        >
          Back
        </button>

        <button
          type="button"
          className="reading-summary-step__save-action"
          onClick={saveReview}
        >
          {isTbr
            ? editingReviewId
              ? "Update TBR Entry"
              : "Save to TBR"
            : editingReviewId
              ? "Update Reading Progress"
              : "Save to Currently Reading"}
        </button>

        <button
          type="button"
          onClick={
            openDestinationShelf
          }
        >
          {isTbr
            ? "View TBR Shelf"
            : "View Currently Reading"}
        </button>
      </div>

      {saveMessage && (
        <p
          className="reading-summary-step__save-message"
          role="status"
          aria-live="polite"
        >
          {saveMessage}
        </p>
      )}
    </section>
  )
}

export default ReadingSummaryStep
