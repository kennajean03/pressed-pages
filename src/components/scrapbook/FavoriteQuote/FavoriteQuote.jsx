import "./FavoriteQuote.css"

const VALID_SIZES = ["small", "medium", "large", "hero"]

function FavoriteQuote({
  quote = "",
  source = "",
  page = "",
  rotation = 0,
  size = "medium",
  className = "",
}) {
  const resolvedSize = VALID_SIZES.includes(size)
    ? size
    : "medium"

  const resolvedRotation = Number.isFinite(Number(rotation))
    ? Number(rotation)
    : 0

  const hasQuote = Boolean(quote)

  const favoriteQuoteClasses = [
    "favorite-quote",
    `favorite-quote--${resolvedSize}`,
    !hasQuote ? "favorite-quote--empty" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <figure
      className={favoriteQuoteClasses}
      style={{
        "--favorite-quote-rotation": `${resolvedRotation}deg`,
      }}
      data-scrapbook-artifact="favorite-quote"
    >
      <div className="favorite-quote__paper">
        {hasQuote ? (
          <>
            <blockquote className="favorite-quote__text">
              “{quote}”
            </blockquote>

            {(source || page) && (
              <figcaption className="favorite-quote__footer">
                {source && (
                  <span className="favorite-quote__source">
                    {source}
                  </span>
                )}

                {page && (
                  <span className="favorite-quote__page">
                    p.{page}
                  </span>
                )}
              </figcaption>
            )}
          </>
        ) : (
          <div className="favorite-quote__placeholder">
            <span className="favorite-quote__placeholder-mark">
              “”
            </span>

            <p>
              A favorite quote will live here.
            </p>
          </div>
        )}
      </div>
    </figure>
  )
}

export default FavoriteQuote