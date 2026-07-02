import PaperCard from "../PaperCard/PaperCard"
import PolaroidFrame from "../PolaroidFrame/PolaroidFrame"
import { useBookCardComposition } from "../../../scrapbook/hooks"
import "./BookCard.css"

function getStableBookId(book, bookTitle) {
  return book.id ?? book.googleBooksId ?? book.isbn ?? bookTitle
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

  const personalityId = bookComposition?.composition?.personalityId
  const layoutId = bookComposition?.layoutId
  const layoutLabel = bookComposition?.layout?.label

  const classes = [
    "pp-book-card",
    `pp-book-card--${variant}`,
    variant === "featured" && "pp-book-card--hero",
    personalityId && `pp-book-card--${personalityId}`,
    layoutId && `pp-book-card--layout-${layoutId}`,
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
    >
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