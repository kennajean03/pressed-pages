import "./MountedBook.css"

function MountedBook({
  src,
  alt = "",
  scrapbookId,
  rotate = "left",
  tape = "linen",
  corners = "photo",
  state = "active",
  loading = "lazy",
  className = "",
}) {
  const mountedBookClassName = [
    "pp-mounted-book",
    `pp-mounted-book--rotate-${rotate}`,
    `pp-mounted-book--tape-${tape}`,
    `pp-mounted-book--corners-${corners}`,
    `pp-mounted-book--state-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <figure
      className={mountedBookClassName}
      data-scrapbook-id={scrapbookId}
      data-mounted-book-state={state}
      data-mounted-book-tape={tape}
      data-mounted-book-corners={corners}
    >
      <span
        className="pp-mounted-book__tape"
        aria-hidden="true"
      />

      <span
        className="pp-mounted-book__mount"
        aria-hidden="true"
      />

      <div className="pp-mounted-book__cover-shell">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="pp-mounted-book__cover"
            loading={loading}
          />
        ) : (
          <div
            className="pp-mounted-book__placeholder"
            role="img"
            aria-label={alt || "Book cover unavailable"}
          >
            <span aria-hidden="true">📖</span>
          </div>
        )}

        <span
          className="pp-mounted-book__corner pp-mounted-book__corner--top-left"
          aria-hidden="true"
        />

        <span
          className="pp-mounted-book__corner pp-mounted-book__corner--top-right"
          aria-hidden="true"
        />

        <span
          className="pp-mounted-book__corner pp-mounted-book__corner--bottom-left"
          aria-hidden="true"
        />

        <span
          className="pp-mounted-book__corner pp-mounted-book__corner--bottom-right"
          aria-hidden="true"
        />
      </div>
    </figure>
  )
}

export default MountedBook