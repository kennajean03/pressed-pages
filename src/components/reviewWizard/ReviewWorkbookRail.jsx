const REVIEW_STEPS = [
  { number: 1, label: "Book score" },
  { number: 2, label: "Romance metrics" },
  { number: 3, label: "Scrapbook notes" },
  { number: 4, label: "Obsession" },
  { number: 5, label: "Final review" },
]

function ReviewWorkbookRail({ bookInfo = {}, currentStep = 1 }) {
  const title = bookInfo.title || "Untitled Book"
  const author = bookInfo.author || "Unknown Author"

  return (
    <aside className="review-workbook-rail" aria-label="Review workbook progress">
      <div className="review-workbook-rail__book">
        {bookInfo.coverUrl ? (
          <img src={bookInfo.coverUrl} alt={`Cover of ${title}`} />
        ) : (
          <span className="review-workbook-rail__cover-fallback" aria-hidden="true">
            {title.slice(0, 1).toUpperCase()}
          </span>
        )}

        <div>
          <p>Reviewing</p>
          <h2>{title}</h2>
          <span>by {author}</span>
        </div>
      </div>

      <ol className="review-workbook-rail__steps">
        {REVIEW_STEPS.map((step) => {
          const isCurrent = currentStep === step.number
          const isComplete = currentStep > step.number

          return (
            <li
              key={step.number}
              className={isComplete ? "is-complete" : ""}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span>{isComplete ? "✓" : step.number}</span>
              <strong>{step.label}</strong>
            </li>
          )
        })}
      </ol>

      <p className="review-workbook-rail__note">
        Your work is kept as you move between these pages.
      </p>
    </aside>
  )
}

export default ReviewWorkbookRail
