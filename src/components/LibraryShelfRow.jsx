import ProgressBar from "./ProgressBar"
import Sticker from "./scrapbook/Sticker/Sticker"

function getCover(book) {
  return book?.coverUrl || book?.cover || book?.image || ""
}

function LibraryShelfRow({
  item,
  openSavedReview,
  editReview,
  deleteReview,
  startReading,
  toggleNextFive,
  isNextFive = false,
  nextFiveFull = false,
  finishBook,
  formatDate,
  getProgressPercent,
  getDaysToRead,
}) {
  const safeItem = item || {}
  const book = safeItem.bookInfo || {}
  const title = book.title || "Untitled Book"
  const author = book.author || "Unknown Author"
  const status = book.status || "Finished"
  const format = book.format || book.bookFormat || "Book"
  const cover = getCover(book)
  const currentPage = Number(book.currentPage || safeItem.currentPage || 0)
  const totalPages = Number(book.totalPages || book.pages || safeItem.totalPages || 0)
  const finishedDate = book.dateFinished || book.finishDate || safeItem.dateFinished
  const startedDate = book.dateStarted || book.startDate || safeItem.dateStarted
  const progressPercent = typeof getProgressPercent === "function" ? getProgressPercent(book) : 0
  const daysToRead = typeof getDaysToRead === "function" ? getDaysToRead(safeItem) : null
  const score = safeItem.bookScore ?? safeItem.rating ?? book.rating ?? 0
  const statusSlug = String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

  function openBook() {
    openSavedReview?.(safeItem)
  }

  return (
    <article className={`library-shelf-row library-shelf-row--${statusSlug || "unknown"}`} data-library-status={status}>
      <button type="button" className="library-shelf-row__cover" onClick={openBook} aria-label={`Open ${title}`}>
        {cover ? (
          <img src={cover} alt={`${title} cover`} loading="lazy" decoding="async" />
        ) : (
          <span aria-hidden="true">▥</span>
        )}
      </button>

      <div className="library-shelf-row__identity">
        <div className="library-shelf-row__labels">
          <Sticker tone={status === "DNF" ? "rose" : status === "Reading" || status === "TBR" ? "sage" : "gold"}>{status}</Sticker>
          {status === "TBR" && isNextFive && <Sticker tone="rose">Next 5 · #{Number(book.nextFiveRank) || "—"}</Sticker>}
          {safeItem.isFavorite && <Sticker tone="rose">Brain Chemistry</Sticker>}
        </div>
        <button type="button" className="library-shelf-row__title" onClick={openBook}>{title}</button>
        <p>{author}</p>
        <small>{format}</small>
      </div>

      <div className="library-shelf-row__ledger">
        {status === "Reading" && (
          <>
            <span>{startedDate ? `Started ${formatDate ? formatDate(startedDate) : startedDate}` : "Reading now"}</span>
            <strong>{totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : `${Math.round(progressPercent)}% complete`}</strong>
            <ProgressBar percent={progressPercent} label={`Reading progress for ${title}`} />
          </>
        )}
        {status === "TBR" && (
          <>
            <span>Waiting shelf note</span>
            <strong>{book.reasonToRead || book.initialNotes || "Saved for later"}</strong>
          </>
        )}
        {status === "Finished" && (
          <>
            <span>{finishedDate ? `Finished ${formatDate ? formatDate(finishedDate) : finishedDate}` : "Finished"}</span>
            <strong>{Number(score).toFixed(1)}/5 on paper{daysToRead !== null && daysToRead !== undefined ? ` · ${daysToRead} days` : ""}</strong>
          </>
        )}
        {status === "DNF" && (
          <>
            <span>Closed before the final page</span>
            <strong>DNF{safeItem.dnfInfo?.percent ? ` at ${safeItem.dnfInfo.percent}%` : ""}</strong>
          </>
        )}
      </div>

      <div className="library-shelf-row__actions" aria-label={`Actions for ${title}`}>
        <button type="button" className="paper-button library-action-button--primary" onClick={openBook}>
          {status === "TBR" ? "Open entry" : "Open review"}
        </button>
        <details className="library-card-actions-pocket">
          <summary><span>Actions</span><span aria-hidden="true">⌄</span></summary>
          <div className="library-card-actions-pocket__menu">
            {status === "TBR" && typeof startReading === "function" && (
              <button type="button" className="paper-button" aria-label={`Start reading ${title}`} onClick={() => startReading(safeItem)}>Start reading</button>
            )}
            {status === "TBR" && typeof toggleNextFive === "function" && (
              <button
                type="button"
                className="paper-button"
                disabled={!isNextFive && nextFiveFull}
                aria-label={isNextFive ? `Remove ${title} from Next 5` : nextFiveFull ? "Next 5 is full" : `Add ${title} to Next 5`}
                onClick={() => toggleNextFive(safeItem, !isNextFive)}
              >
                {isNextFive ? "Remove from Next 5" : nextFiveFull ? "Next 5 Full" : "Add to Next 5"}
              </button>
            )}
            {status === "Reading" && typeof finishBook === "function" && (
              <button type="button" className="paper-button" aria-label={`Finish ${title}`} onClick={() => finishBook(safeItem)}>Finish book</button>
            )}
            {typeof editReview === "function" && <button type="button" className="paper-button" aria-label={`Edit ${title}`} onClick={() => editReview(safeItem)}>Edit</button>}
            {typeof deleteReview === "function" && <button type="button" className="paper-button library-delete-button" aria-label={`Delete ${title}`} onClick={() => deleteReview(safeItem.id)}>Delete</button>}
          </div>
        </details>
      </div>
    </article>
  )
}

export default LibraryShelfRow
