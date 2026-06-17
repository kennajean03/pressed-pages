import ProgressBar from "./ProgressBar"

export default function LibraryBookCard({
  item,
  openSavedReview,
  editReview,
  deleteReview,
  finishBook,
  formatDate,
  getProgressPercent,
  getDaysToRead,
}) {
  const bookInfo = item?.bookInfo || {}
  const dnfInfo = item?.dnfInfo || {}
  const metrics = item?.metrics || {}

  return (
    <div className="score-card library-book-card">
      {bookInfo.coverUrl ? (
        <button
          type="button"
          className="library-cover-button"
          onClick={() => openSavedReview(item)}
          aria-label={`Open review for ${bookInfo.title || "Untitled Book"}`}
        >
          <img
            src={bookInfo.coverUrl}
            alt={`${bookInfo.title || "Book"} cover`}
            className="book-cover library-book-cover"
          />
        </button>
      ) : (
        <button
          type="button"
          className="library-cover-button library-cover-placeholder"
          onClick={() => openSavedReview(item)}
          aria-label={`Open review for ${bookInfo.title || "Untitled Book"}`}
        >
          📖
        </button>
      )}

      {bookInfo.status === "DNF" ? (
        <>
          <p>🚫 DNF</p>
          <button
            type="button"
            className="library-title-button"
            onClick={() => openSavedReview(item)}
          >
            {bookInfo.title || "Untitled Book"}
          </button>
          <p>{bookInfo.author || "Unknown Author"}</p>
          <p>
            {bookInfo.format} • {bookInfo.status}
          </p>
          <p>📍 DNF at {dnfInfo.percent || "?"}%</p>
          <p>Reason: {dnfInfo.reason || "No reason listed"}</p>
          <p>
            Would read author again:{" "}
            {dnfInfo.wouldReadAuthorAgain || "Maybe"}
          </p>
        </>
      ) : bookInfo.status === "Reading" || bookInfo.status === "TBR" ? (
        <>
          <p>📖 Currently Reading</p>
          <button
            type="button"
            className="library-title-button"
            onClick={() => openSavedReview(item)}
          >
            {bookInfo.title || "Untitled Book"}
          </button>
          <p>{bookInfo.author || "Unknown Author"}</p>
          <p>{bookInfo.format} • Reading</p>
          {bookInfo.dateStarted && (
            <p>📖 Started {formatDate(bookInfo.dateStarted)}</p>
          )}
          <p>
            Page {bookInfo.currentPage || "0"} of{" "}
            {bookInfo.totalPages || "?"}
          </p>

          <ProgressBar percent={getProgressPercent(bookInfo)} />

          <button
            type="button"
            className="library-action-button"
            onClick={() => finishBook(item)}
          >
            ✅ Finish Book
          </button>
        </>
      ) : (
        <>
          {item?.isFavorite && <p>🧠 Brain Chemistry Book</p>}

          <button
            type="button"
            className="library-title-button"
            onClick={() => openSavedReview(item)}
          >
            {bookInfo.title || "Untitled Book"}
          </button>
          <p>{bookInfo.author || "Unknown Author"}</p>
          <p>
            {bookInfo.format} • {bookInfo.status}
          </p>
          {bookInfo.dateFinished && (
            <p>📅 Finished {formatDate(bookInfo.dateFinished)}</p>
          )}
          {getDaysToRead(item) && (
            <p>
              ⏱️ Read in {getDaysToRead(item)} day
              {getDaysToRead(item) !== 1 ? "s" : ""}
            </p>
          )}
          <p>
            ⭐ {item?.bookScore}/5 • ❤️ {item?.obsessionScore}/5 • 🌶️{" "}
            {metrics.spice}/5
          </p>
          <p>{item?.recommendationLevel}</p>
        </>
      )}

      <button
        type="button"
        className="library-action-button"
        onClick={() => openSavedReview(item)}
      >
        View Review
      </button>
      <button
        type="button"
        className="library-action-button"
        onClick={() => editReview(item)}
      >
        Edit Review / Dates
      </button>
      <button
        type="button"
        className="library-action-button library-delete-button"
        onClick={() => deleteReview(item.id)}
      >
        Delete
      </button>
    </div>
  )
}
