import "./MuseumLabel.css"

function MuseumLabel({
  eyebrow,
  title,
  author,
  children,
  rotate = "right",
  state = "featured",
  tape = "linen",
  className = "",
  titleId,
}) {
  const museumLabelClassName = [
    "pp-museum-label",
    `pp-museum-label--rotate-${rotate}`,
    `pp-museum-label--state-${state}`,
    `pp-museum-label--tape-${tape}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={museumLabelClassName}
      data-museum-label-state={state}
      data-museum-label-tape={tape}
      aria-labelledby={titleId}
    >
      <span
        className="pp-museum-label__tape"
        aria-hidden="true"
      />

      <div className="pp-museum-label__content">
        {eyebrow && (
          <p className="pp-museum-label__eyebrow">
            {eyebrow}
          </p>
        )}

        <h2
          id={titleId}
          className="pp-museum-label__title"
        >
          {title}
        </h2>

        {author && (
          <p className="pp-museum-label__author">
            by {author}
          </p>
        )}

        {children && (
          <div className="pp-museum-label__details">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}

export default MuseumLabel