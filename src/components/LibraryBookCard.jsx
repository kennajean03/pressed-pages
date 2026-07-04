import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"
import { useResolvedComposition } from "../scrapbook/hooks"
import { renderAnchors } from "../scrapbook/renderers/renderAnchors"

function normalizeArray(value) {
  if (Array.isArray(value)) return value
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean)
  }
  return []
}

function getCover(book) {
  return book?.coverUrl || book?.cover || book?.image || ""
}

function LibraryBookCard({
  item,
  openSavedReview,
  editReview,
  deleteReview,
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
  const tropes = normalizeArray(book.tropes || safeItem.tropes)
  const themes = normalizeArray(book.themes || safeItem.themes)
  const progressPercent = typeof getProgressPercent === "function" ? getProgressPercent(safeItem) : 0
  const daysToRead = typeof getDaysToRead === "function" ? getDaysToRead(safeItem) : null
  const finishedDate = book.dateFinished || book.finishDate || safeItem.dateFinished
  const startedDate = book.dateStarted || book.startDate || safeItem.dateStarted
  const currentPage = Number(book.currentPage || safeItem.currentPage || 0)
  const totalPages = Number(book.totalPages || book.pages || safeItem.totalPages || 0)
  const score = safeItem.bookScore ?? safeItem.rating ?? book.rating ?? 0
  const obsession = safeItem.obsessionScore ?? safeItem.gutScore ?? 0
  const spice = safeItem.metrics?.spice ?? book.spice ?? 0
  const scrapbookComposition = useResolvedComposition({
  scrapbookId:
    safeItem.id ??
    book.googleBooksId ??
    book.isbn ??
    title,
  objectType: "book",
  variant: "library",
  readingState: resolveReadingState(status),
  genre: resolveGenre(book),
})

  const handleOpen = () => {
    if (typeof openSavedReview === "function") openSavedReview(safeItem)
  }

  function resolveReadingState(status) {
  if (status === "Finished") return "finished"
  if (status === "Reading") return "currentlyReading"
  return undefined
}

function resolveGenre(book = {}) {
  const rawGenre =
    book.genre ||
    book.primaryGenre ||
    book.category ||
    book.bookInfo?.genre ||
    book.bookInfo?.category ||
    ""

  const genre = String(rawGenre).toLowerCase()

  if (genre.includes("romance")) return "romance"
  if (genre.includes("fantasy")) return "fantasy"

  return undefined
}


  return (
    <PaperCard
      as="article"
      variant="journal"
      scrapbookComposition={scrapbookComposition}
      className="library-book-card paper-card paper-card--journal"
  >
  {renderAnchors(scrapbookComposition?.composition)}

  <div className="library-book-card-layout">
        <button
          type="button"
          className="library-cover-button"
          onClick={handleOpen}
          aria-label={`Open ${title}`}
        >
          {cover ? (
            <img src={cover} alt={`${title} cover`} className="library-book-cover book-cover" />
          ) : (
            <div className="library-cover-placeholder" aria-hidden="true">📖</div>
          )}
        </button>

        <div className="library-book-main">
          <div className="library-book-header-row">
            <Sticker tone={status === "DNF" ? "rose" : status === "Reading" ? "sage" : "gold"}>
              {status}
            </Sticker>
            {safeItem.isFavorite && <Sticker tone="rose">🧠 Brain Chemistry</Sticker>}
          </div>

          <button type="button" className="library-title-button" onClick={handleOpen}>
            {title}
          </button>

          <p><strong>{author}</strong></p>
          <p>{format} • {status}</p>

          {status === "Reading" || status === "TBR" ? (
            <div className="library-progress-wrap">
              <p>
                {startedDate ? `📖 Started ${formatDate ? formatDate(startedDate) : startedDate}` : "📖 Not started yet"}
              </p>
              {totalPages > 0 && <p>Page {currentPage || 0} of {totalPages}</p>}
              <ProgressBar value={progressPercent} />
            </div>
          ) : null}

          {status === "Finished" && (
            <>
              {finishedDate && <p>📅 Finished {formatDate ? formatDate(finishedDate) : finishedDate}</p>}
              {daysToRead !== null && daysToRead !== undefined && <p>⏱️ Read in {daysToRead} days</p>}
              <p>⭐ {score}/5 • ❤️ {obsession}/5 • 🌶️ {spice}/5</p>
            </>
          )}

          {status === "DNF" && (
            <p>🚫 DNF{safeItem.dnfInfo?.percent ? ` at ${safeItem.dnfInfo.percent}%` : ""}</p>
          )}

          {(tropes.length > 0 || themes.length > 0) && (
            <div className="library-book-tag-row">
              {[...tropes, ...themes].slice(0, 5).map((tag) => (
                <Sticker key={tag} tone="linen">{tag}</Sticker>
              ))}
            </div>
          )}

          <div className="library-action-row">
            <button type="button" className="paper-button library-action-button" onClick={handleOpen}>
              View Review
            </button>

            {status === "Reading" && typeof finishBook === "function" && (
              <button type="button" className="paper-button library-action-button" onClick={() => finishBook(safeItem)}>
                ✅ Finish Book
              </button>
            )}

            {typeof editReview === "function" && (
              <button type="button" className="paper-button library-action-button" onClick={() => editReview(safeItem)}>
                Edit
              </button>
            )}

            {typeof deleteReview === "function" && (
              <button type="button" className="paper-button library-action-button library-delete-button" onClick={() => deleteReview(safeItem.id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </PaperCard>
  )
}

export default LibraryBookCard