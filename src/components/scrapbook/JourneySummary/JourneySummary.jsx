import "./JourneySummary.css"

function JourneySummary({
  eyebrow = "Your journey with this book",
  title = "A story preserved",
  startedDate,
  finishedDate,
  daysRead,
  sessions = 0,
  pagesRead = 0,
  minutesRead = 0,
  memoryCount = 0,
  longestSession,
  longestSessionLabel = "Biggest reading day",
  reflection,
  state = "remembered",
  rotate = "left",
  className = "",
  titleId,
}) {
  const journeySummaryClassName = [
    "pp-journey-summary",
    `pp-journey-summary--state-${state}`,
    `pp-journey-summary--rotate-${rotate}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const hasDateRange =
    Boolean(startedDate) ||
    Boolean(finishedDate)

  const hasJourneyStats =
    sessions > 0 ||
    pagesRead > 0 ||
    minutesRead > 0 ||
    memoryCount > 0

  const hasLongestSession =
    longestSession !== null &&
    longestSession !== undefined &&
    longestSession !== ""

  return (
    <section
      className={journeySummaryClassName}
      data-journey-summary-state={state}
      aria-labelledby={titleId}
    >
      <span
        className="pp-journey-summary__clip"
        aria-hidden="true"
      />

      <span
        className="pp-journey-summary__paper-edge"
        aria-hidden="true"
      />

      <header className="pp-journey-summary__heading">
        {eyebrow && (
          <p className="pp-journey-summary__eyebrow">
            {eyebrow}
          </p>
        )}

        <h3
          id={titleId}
          className="pp-journey-summary__title"
        >
          {title}
        </h3>

        {hasDateRange && (
          <p className="pp-journey-summary__date-range">
            {startedDate && (
              <span>
                Began{" "}
                <strong>{startedDate}</strong>
              </span>
            )}

            {startedDate && finishedDate && (
              <span
                className="pp-journey-summary__date-divider"
                aria-hidden="true"
              >
                —
              </span>
            )}

            {finishedDate && (
              <span>
                Finished{" "}
                <strong>{finishedDate}</strong>
              </span>
            )}
          </p>
        )}
      </header>

      <div className="pp-journey-summary__body">
        {daysRead !== null &&
          daysRead !== undefined && (
            <div className="pp-journey-summary__lead-stat">
              <strong>{daysRead}</strong>

              <span>
                {daysRead === 1
                  ? "day spent with this story"
                  : "days spent with this story"}
              </span>
            </div>
          )}

        {hasJourneyStats && (
          <dl className="pp-journey-summary__stats">
            <div className="pp-journey-summary__stat">
              <dt>Reading sessions</dt>
              <dd>{sessions}</dd>
            </div>

            <div className="pp-journey-summary__stat">
              <dt>Pages read</dt>
              <dd>{pagesRead}</dd>
            </div>

            <div className="pp-journey-summary__stat">
              <dt>Minutes together</dt>
              <dd>{minutesRead}</dd>
            </div>

            <div className="pp-journey-summary__stat">
              <dt>Memories preserved</dt>
              <dd>{memoryCount}</dd>
            </div>
          </dl>
        )}

        {hasLongestSession && (
          <div className="pp-journey-summary__highlight">
            <p className="pp-journey-summary__highlight-label">
              {longestSessionLabel}
            </p>

            <strong className="pp-journey-summary__highlight-value">
              {longestSession}
            </strong>
          </div>
        )}

        {reflection && (
          <blockquote className="pp-journey-summary__reflection">
            “{reflection}”
          </blockquote>
        )}
      </div>

      <footer className="pp-journey-summary__footer">
        <span aria-hidden="true">✦</span>
        <span>Preserved in Pressed Pages</span>
        <span aria-hidden="true">✦</span>
      </footer>
    </section>
  )
}

export default JourneySummary