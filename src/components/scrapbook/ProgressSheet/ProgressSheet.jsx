import "./ProgressSheet.css"

function ProgressSheet({
  eyebrow = "Reading progress",
  title = "Where you are now",
  percent = 0,
  progressLine,
  progressCaption,
  state = "beginning",
  paper = "grid",
  rotate = "left",
  children,
  className = "",
  titleId,
}) {
  const normalizedPercent = Math.min(
    100,
    Math.max(0, Number(percent) || 0)
  )

  const progressSheetClassName = [
    "pp-progress-sheet",
    `pp-progress-sheet--state-${state}`,
    `pp-progress-sheet--paper-${paper}`,
    `pp-progress-sheet--rotate-${rotate}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={progressSheetClassName}
      data-progress-sheet-state={state}
      data-progress-sheet-paper={paper}
      aria-labelledby={titleId}
    >
      <span
        className="pp-progress-sheet__tape"
        aria-hidden="true"
      />

      <span
        className="pp-progress-sheet__fold"
        aria-hidden="true"
      />

      <div className="pp-progress-sheet__heading">
        <div>
          {eyebrow && (
            <p className="pp-progress-sheet__eyebrow">
              {eyebrow}
            </p>
          )}

          <h3
            id={titleId}
            className="pp-progress-sheet__title"
          >
            {title}
          </h3>
        </div>

        <strong className="pp-progress-sheet__percent">
          {normalizedPercent}%
        </strong>
      </div>

      <div className="pp-progress-sheet__tracker">
        <div
          className="pp-progress-sheet__track"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={normalizedPercent}
          aria-label={`${normalizedPercent}% complete`}
        >
          <span
            className="pp-progress-sheet__fill"
            style={{
              "--progress-sheet-percent": `${normalizedPercent}%`,
            }}
          />
        </div>

        {(progressLine || progressCaption) && (
          <div className="pp-progress-sheet__details">
            {progressLine && (
              <span className="pp-progress-sheet__progress-line">
                {progressLine}
              </span>
            )}

            {progressCaption && (
              <span className="pp-progress-sheet__caption">
                {progressCaption}
              </span>
            )}
          </div>
        )}
      </div>

      {children && (
        <div className="pp-progress-sheet__annotations">
          {children}
        </div>
      )}
    </section>
  )
}

export default ProgressSheet