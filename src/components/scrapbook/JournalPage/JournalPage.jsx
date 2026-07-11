import "./JournalPage.css"

function JournalPage({
  eyebrow = "Reading memory",
  title = "Your last session",
  date,
  stats = [],
  note,
  emptyTitle = "Your first reading memory is waiting.",
  emptyCopy,
  state = "writing",
  paper = "notebook",
  rotate = "right",
  children,
  className = "",
  titleId,
}) {
  const hasMemory =
    Boolean(date) ||
    stats.length > 0 ||
    Boolean(note) ||
    Boolean(children)

  const resolvedState =
    hasMemory ? state : "blank"

  const journalPageClassName = [
    "pp-journal-page",
    `pp-journal-page--state-${resolvedState}`,
    `pp-journal-page--paper-${paper}`,
    `pp-journal-page--rotate-${rotate}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={journalPageClassName}
      data-journal-page-state={resolvedState}
      data-journal-page-paper={paper}
      aria-labelledby={titleId}
    >
      <span
        className="pp-journal-page__tape"
        aria-hidden="true"
      />

      <span
        className="pp-journal-page__margin-line"
        aria-hidden="true"
      />

      <header className="pp-journal-page__heading">
        <div>
          {eyebrow && (
            <p className="pp-journal-page__eyebrow">
              {eyebrow}
            </p>
          )}

          <h3
            id={titleId}
            className="pp-journal-page__title"
          >
            {title}
          </h3>
        </div>
      </header>

      {hasMemory ? (
        <div className="pp-journal-page__memory">
          <div className="pp-journal-page__session-header">
            <p className="pp-journal-page__session-label">
              Last session
            </p>

            {date && (
              <strong className="pp-journal-page__date">
                {date}
              </strong>
            )}
          </div>

          {stats.length > 0 && (
            <div className="pp-journal-page__stats">
              {stats.map((stat, index) => (
                <span
                  key={`${stat.label}-${index}`}
                  className="pp-journal-page__stat"
                >
                  <strong>{stat.value}</strong>{" "}
                  {stat.label}
                </span>
              ))}
            </div>
          )}

          {note && (
            <blockquote className="pp-journal-page__note">
              “{note}”
            </blockquote>
          )}

          {children && (
            <div className="pp-journal-page__artifacts">
              {children}
            </div>
          )}
        </div>
      ) : (
        <div className="pp-journal-page__empty">
          <p className="pp-journal-page__empty-kicker">
            A blank page
          </p>

          <strong>{emptyTitle}</strong>

          {emptyCopy && (
            <span>{emptyCopy}</span>
          )}
        </div>
      )}

      <span
        className="pp-journal-page__fold"
        aria-hidden="true"
      />
    </section>
  )
}

export default JournalPage