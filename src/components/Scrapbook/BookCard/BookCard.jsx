import PaperCard from "../PaperCard/PaperCard"
import PolaroidFrame from "../PolaroidFrame/PolaroidFrame"
import "./BookCard.css"

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

  return (
    <PaperCard
      variant="journal"
      tape={status}
      tapeVariant="sage"
      flower="sprig"
      className={["pp-book-card", `pp-book-card--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="pp-book-card__cover">
        <PolaroidFrame
          src={bookCover}
          alt={`${bookTitle} cover`}
          rotate="left"
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
    </PaperCard>
  )
}

export default BookCard