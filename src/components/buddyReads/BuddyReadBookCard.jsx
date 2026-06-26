import { getBookStatusIcon, getBookStatusLabel } from "./BuddyReadUtils"

export default function BuddyReadBookCard({ book, selected = false, onSelect, compact = false }) {
  if (!book) return null

  return (
    <button
      type="button"
      className={`buddy-read-book-card ${selected ? "selected" : ""} ${compact ? "compact" : ""}`}
      onClick={onSelect}
    >
      <span className="buddy-read-book-cover-wrap">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={`${book.title} cover`} />
        ) : (
          <span className="buddy-read-cover-placeholder">📕</span>
        )}
      </span>

      <span className="buddy-read-book-card-body">
        <strong>{book.title}</strong>
        <small>{book.author}</small>
        {book.pages && <small>{book.pages} pages</small>}
      </span>

      <span className="buddy-read-book-card-side">
        <span className="buddy-read-status-badge">
          <span aria-hidden="true">{getBookStatusIcon(book.status)}</span>
          {getBookStatusLabel(book.status)}
        </span>
        {selected && <b>Selected</b>}
      </span>
    </button>
  )
}
