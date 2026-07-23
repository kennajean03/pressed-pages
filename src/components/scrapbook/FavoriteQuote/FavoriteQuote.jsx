import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import "./FavoriteQuote.css"

const favoriteQuotePaper =
  resolveScrapbookMaterialRole(
    "paper",
    "tornNote",
    "paper-scrap-medium-torn-note-01"
  )


const VALID_SIZES = ["small", "medium", "large", "hero"]

function removeWrappingQuotes(value = "") {
  return String(value)
    .trim()
    .replace(/^[“”"]+/, "")
    .replace(/[“”"]+$/, "")
    .trim()
}

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

  const resolvedQuote =
  removeWrappingQuotes(quote)

const hasQuote =
  Boolean(resolvedQuote)


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
  <ScrapbookAsset
    asset={favoriteQuotePaper}
    className="favorite-quote__paper-asset"
    placement={{
      width: "100%",
      shadow:
        "0 8px 18px rgba(60, 45, 38, 0.12)",
    }}
  />

  {hasQuote ? (
          <>
            <blockquote className="favorite-quote__text">
              “{resolvedQuote}”
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

FavoriteQuote.artifactType = "favorite-quote"
FavoriteQuote.displayName = "FavoriteQuote"

export default FavoriteQuote