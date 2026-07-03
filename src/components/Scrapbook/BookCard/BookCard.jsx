import PaperCard from "../PaperCard/PaperCard"
import PolaroidFrame from "../PolaroidFrame/PolaroidFrame"
import {
  useBookCardComposition,
  useResolvedComposition,
} from "../../../scrapbook/hooks"
import { renderAnchors } from "../../../scrapbook/renderers/renderAnchors"
import "./BookCard.css"

function getStableBookId(book, bookTitle) {
  return book.id ?? book.googleBooksId ?? book.isbn ?? bookTitle
}

function normalizeText(value = "") {
  return String(value).toLowerCase().trim()
}

function resolveReadingState(status) {
  const normalized = normalizeText(status)

  if (normalized.includes("finished")) return "finished"
  if (normalized.includes("current") || normalized.includes("reading")) return "currentlyReading"

  return undefined
}

function resolveGenre(book = {}) {
  const rawGenre =
    book.genre ||
    book.primaryGenre ||
    book.category ||
    book.shelf ||
    book.bookInfo?.genre ||
    book.bookInfo?.category ||
    ""

  const genre = normalizeText(rawGenre)

  if (genre.includes("romance")) return "romance"
  if (genre.includes("fantasy")) return "fantasy"

  return undefined
}

function resolveSeason() {
  const month = new Date().getMonth()

  if (month >= 2 && month <= 4) return "spring"
  if (month >= 5 && month <= 7) return "summer"
  if (month >= 8 && month <= 10) return "autumn"

  return "winter"
}

function BookCard({
  book = {},
  title,
  author,
  cover,
  status,
  rating,
  obsession,
  progress,
  actionLabel,
  onAction,
  variant = "default",
  className = "",
}) {
  const bookTitle = title || book.title || "Untitled Book"
  const bookAuthor = author || book.author || "Unknown Author"
  const bookCover = cover || book.coverUrl || book.cover
  const stableBookId = getStableBookId(book, bookTitle)

  const bookComposition = useBookCardComposition({
    featured: variant === "featured",
    scrapbookId: stableBookId,
  })

 const { composition: scrapbookComposition } = useResolvedComposition({
  scrapbookId: stableBookId,
  objectType: "book",
  variant,
  readingState: resolveReadingState(status || book.status),
  genre: resolveGenre(book),
  season: resolveSeason(),
})

  const personalityId = bookComposition?.composition?.personalityId
  const layoutId = bookComposition?.layoutId
  const layoutLabel = bookComposition?.layout?.label

  const classes = [
    "pp-book-card",
    `pp-book-card--${variant}`,
    variant === "featured" && "pp-book-card--hero",
    personalityId && `pp-book-card--${personalityId}`,
    layoutId && `pp-book-card--layout-${layoutId}`,
    scrapbookComposition?.layout?.density &&
      `pp-book-card--density-${scrapbookComposition.layout.density}`,
    scrapbookComposition?.feeling &&
      `pp-book-card--feeling-${scrapbookComposition.feeling}`,
    scrapbookComposition?.anchors?.length && "pp-book-card--has-scrapbook-anchors",
    bookCover && "pp-book-card--has-cover",
    !bookCover && "pp-book-card--no-cover",
    rating && "pp-book-card--has-rating",
    typeof progress === "number" && "pp-book-card--has-progress",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <PaperCard
      objectType="book"
      scrapbookId={stableBookId}
      variant={variant === "featured" ? "deckled" : "journal"}
      tape={status}
      tapeVariant="sage"
      flower="sprig"
      className={classes}
      data-book-personality={personalityId}
      data-book-layout={layoutId}
      data-book-layout-label={layoutLabel}
      data-scrapbook-feeling={scrapbookComposition?.feeling}
      data-scrapbook-density={scrapbookComposition?.layout?.density}
    >
      {renderAnchors(scrapbookComposition)}

      <div className="pp-book-card__memory-layer" aria-hidden="true" />

      <div className="pp-book-card__layout">
        <div className="pp-book-card__cover">
          <PolaroidFrame
            src={bookCover}
            alt={`${bookTitle} cover`}
            rotate={personalityId === "minimal" ? "none" : "left"}
          />
        </div>

        <div className="pp-book-card__body">
          <h2>{bookTitle}</h2>
          <p className="pp-book-card__author">{bookAuthor}</p>

          {(rating || obsession) && (
            <div className="pp-book-card__ratings">
              {rating && <span>⭐ {rating}/5</span>}
              {obsession && <span>❤️ {obsession}/5</span>}
            </div>
          )}

          {typeof progress === "number" && (
            <div className="pp-book-card__progress">
              <div>
                <span style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
              </div>
              <small>{progress}% complete</small>
            </div>
          )}

          {actionLabel && onAction && (
            <button className="paper-button pp-book-card__action" onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </PaperCard>
  )
}

export default BookCard