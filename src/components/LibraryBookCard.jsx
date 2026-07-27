import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import Sticker from "./scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"

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

function getLibraryRecipeId(status, book = {}) {
  const genre = String(
    book.genre || book.primaryGenre || book.category || ""
  ).toLowerCase()

  if (status === "Finished") return "finishedBook"
  if (status === "Reading") return "currentlyReading"
  if (status === "TBR") return "vintageLibrary"
  if (genre.includes("fantasy")) return "fantasyArchive"
  if (genre.includes("romance")) return "cozyRomance"

  return "vintageLibrary"
}

function LibraryBookCard({
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
  const tropes = normalizeArray(book.tropes || safeItem.tropes)
  const themes = normalizeArray(book.themes || safeItem.themes)
  const progressPercent =
    typeof getProgressPercent === "function"
      ? getProgressPercent(book)
      : 0
  const daysToRead = typeof getDaysToRead === "function" ? getDaysToRead(safeItem) : null
  const finishedDate = book.dateFinished || book.finishDate || safeItem.dateFinished
  const startedDate = book.dateStarted || book.startDate || safeItem.dateStarted
  const currentPage = Number(book.currentPage || safeItem.currentPage || 0)
  const totalPages = Number(book.totalPages || book.pages || safeItem.totalPages || 0)
  const score = safeItem.bookScore ?? safeItem.rating ?? book.rating ?? 0
  const obsession = safeItem.obsessionScore ?? safeItem.gutScore ?? 0
  const spice = safeItem.metrics?.spice ?? book.spice ?? 0
  const recipeId = getLibraryRecipeId(status, book)

  const handleOpen = () => {
    if (typeof openSavedReview === "function") openSavedReview(safeItem)
  }

  return (
    <ScrapbookPanel
      as="article"
      recipe={recipeId}
      className="library-book-card"
    >
      <div className="library-book-card-layout">
        <button
          type="button"
          className="library-cover-button"
          onClick={handleOpen}
          aria-label={`Open ${title}`}
        >
          {cover ? (
            <img
              src={cover}
              alt={`${title} cover`}
              className="library-book-cover book-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="library-cover-placeholder" aria-hidden="true">📖</div>
          )}
        </button>

        <div className="library-book-main">
          <div className="library-book-header-row">
            <Sticker
              tone={
                status === "DNF"
                  ? "rose"
                  : status === "Reading" || status === "TBR"
                    ? "sage"
                    : "gold"
              }
            >
              {status}
            </Sticker>
            {status === "TBR" && isNextFive && (
              <Sticker tone="rose">
                🔖 Next 5 · #{Number(book.nextFiveRank) || "—"}
              </Sticker>
            )}
            {safeItem.isFavorite && <Sticker tone="rose">🧠 Brain Chemistry</Sticker>}
          </div>

          <button type="button" className="library-title-button" onClick={handleOpen}>
            {title}
          </button>

          <p><strong>{author}</strong></p>
          <p>{format} • {status}</p>

          {status === "Reading" ? (
            <div className="library-progress-wrap">
              <p>
                {startedDate ? `📖 Started ${formatDate ? formatDate(startedDate) : startedDate}` : "📖 Not started yet"}
              </p>
              {totalPages > 0 && <p>Page {currentPage || 0} of {totalPages}</p>}
              <ProgressBar
                percent={progressPercent}
                label={`Reading progress for ${title}`}
              />
            </div>
          ) : null}

          {status === "TBR" && (
            <div className="library-tbr-wrap">
              <p>🔖 Saved for later</p>
              <p>Waiting for the right reading mood.</p>
            </div>
          )}

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
              {status === "TBR" ? "View TBR Entry" : "View Review"}
            </button>

            {status === "TBR" && typeof startReading === "function" && (
              <button
                type="button"
                className="paper-button library-action-button library-start-reading-button"
                aria-label={`Start reading ${title}`}
                onClick={() => startReading(safeItem)}
              >
                📖 Start Reading
              </button>
            )}

            {status === "TBR" && typeof toggleNextFive === "function" && (
              <button
                type="button"
                className={[
                  "paper-button",
                  "library-action-button",
                  "library-next-five-button",
                  isNextFive ? "library-next-five-button--selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={!isNextFive && nextFiveFull}
                aria-label={
                  isNextFive
                    ? `Remove ${title} from Next 5`
                    : nextFiveFull
                      ? `Next 5 is full`
                      : `Add ${title} to Next 5`
                }
                onClick={() => toggleNextFive(safeItem, !isNextFive)}
              >
                {isNextFive
                  ? "Remove from Next 5"
                  : nextFiveFull
                    ? "Next 5 Full"
                    : "🔖 Add to Next 5"}
              </button>
            )}

            {status === "Reading" && typeof finishBook === "function" && (
              <button
                type="button"
                className="paper-button library-action-button"
                aria-label={`Finish ${title}`}
                onClick={() => finishBook(safeItem)}
              >
                ✅ Finish Book
              </button>
            )}

            {typeof editReview === "function" && (
              <button
                type="button"
                className="paper-button library-action-button"
                aria-label={`Edit ${title}`}
                onClick={() => editReview(safeItem)}
              >
                Edit
              </button>
            )}

            {typeof deleteReview === "function" && (
              <button
                type="button"
                className="paper-button library-action-button library-delete-button"
                aria-label={`Delete ${title}`}
                onClick={() => deleteReview(safeItem.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </ScrapbookPanel>
  )
}

export default LibraryBookCard
