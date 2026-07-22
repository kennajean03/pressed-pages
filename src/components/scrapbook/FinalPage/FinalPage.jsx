import "./FinalPage.css"

const VALID_STATES = [
  "finished",
  "continuing",
]

const VALID_ROTATIONS = [
  "left",
  "right",
  "straight",
  "none",
]

function FinalPage({
  eyebrow = "Final Page",
  title = "The Final Page",
  subtitle =
    "This journey has been preserved",
  bookTitle = "",
  finishedDate = "",
  closing =
    "The book may be finished, but the story of reading it remains.",
  state = "finished",
  rotate = "left",
  className = "",
  titleId,
}) {
  const resolvedState =
    VALID_STATES.includes(state)
      ? state
      : "finished"

  const resolvedRotation =
    VALID_ROTATIONS.includes(
      rotate
    )
      ? rotate
      : "left"

  const finalPageClasses = [
    "pp-final-page",
    `pp-final-page--state-${resolvedState}`,
    `pp-final-page--rotate-${resolvedRotation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={finalPageClasses}
      aria-labelledby={titleId}
      data-final-page-state={
        resolvedState
      }
    >
      <span
        className="pp-final-page__tape"
        aria-hidden="true"
      />

      <span
        className="pp-final-page__paper-edge"
        aria-hidden="true"
      />

      <header className="pp-final-page__heading">
        {eyebrow && (
          <p className="pp-final-page__eyebrow">
            {eyebrow}
          </p>
        )}

        <h3
          id={titleId}
          className="pp-final-page__title"
        >
          {title}
        </h3>

        {subtitle && (
          <p className="pp-final-page__subtitle">
            {subtitle}
          </p>
        )}
      </header>

      <div className="pp-final-page__body">
        {bookTitle && (
          <p className="pp-final-page__book">
            <span>
              Story preserved
            </span>

            <strong>
              {bookTitle}
            </strong>
          </p>
        )}

        {finishedDate && (
          <p className="pp-final-page__date">
            Finished{" "}
            <strong>
              {finishedDate}
            </strong>
          </p>
        )}

        {closing && (
          <p className="pp-final-page__closing">
            {closing}
          </p>
        )}
      </div>

      <footer className="pp-final-page__footer">
        <span aria-hidden="true">
          ✦
        </span>

        <span>
          End of this Book Journey
        </span>

        <span aria-hidden="true">
          ✦
        </span>
      </footer>

      <span
        className="pp-final-page__mark"
        aria-hidden="true"
      >
        fin.
      </span>
    </section>
  )
}

export default FinalPage