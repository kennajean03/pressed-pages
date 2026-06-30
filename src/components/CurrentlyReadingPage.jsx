import DashboardSection from "./Scrapbook/DashboardSection/DashboardSection"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./Scrapbook/PolaroidFrame/PolaroidFrame"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import StatCard from "./Scrapbook/StatCard/StatCard"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"

function CurrentlyReadingPage({
  getProgressUnitCopy,
  saveMessage,
  currentlyReadingReviews,
  getProgressPercent,
  progressInputs,
  getBookReadingLogs,
  formatDate,
  formatDateKey,
  setSelectedReadingLogBookId,
  setStep,
  finishBook,
  openSavedReview,
  editReview,
  deleteReview,
}) {
  const totalActiveReads = currentlyReadingReviews.length
  const totalLogs = currentlyReadingReviews.reduce(
    (sum, item) => sum + getBookReadingLogs(item.id).length,
    0
  )
  const totalLoggedAmount = currentlyReadingReviews.reduce((sum, item) => {
    const progressCopy = getProgressUnitCopy(item.bookInfo)
    const logs = getBookReadingLogs(item.id)

    return (
      sum +
      logs.reduce((bookTotal, log) => {
        const amount = Number(log.pagesRead || 0)
        return bookTotal + amount
      }, 0)
    )
  }, 0)

  return (
    <section className="currently-reading-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Journal"
        tapeVariant="sage"
        flower="sprig"
        className="currently-reading-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">Continue your story</p>
        <h1>Currently Reading</h1>
        <p>
          Track the books you are actively reading or listening to, log cozy sessions,
          and keep your progress tucked safely inside your reading journal.
        </p>
      </PaperCard>

      {saveMessage && (
        <PaperCard className="currently-reading-message sticky-note paper-card">
          <p>{saveMessage}</p>
        </PaperCard>
      )}

      <div className="currently-reading-stats">
        <StatCard icon="📚" value={totalActiveReads} label="Active reads" />
        <StatCard icon="✍️" value={totalLogs} label="Logged sessions" />
        <StatCard icon="🌿" value={totalLoggedAmount} label="Pages/minutes logged" />
      </div>

      {currentlyReadingReviews.length === 0 && (
        <PaperCard className="currently-reading-empty paper-card sticky-note">
          <p>No currently reading books yet.</p>
          <button type="button" className="paper-button" onClick={() => setStep("addBook")}>Add a Book</button>
        </PaperCard>
      )}

      {currentlyReadingReviews.length > 0 && (
        <SectionDivider label="Open Books" icon="📖" />
      )}

      <div className="currently-reading-stack">
        {currentlyReadingReviews.map((item) => {
          const progressPercent = getProgressPercent(item.bookInfo)
          const progressCopy = getProgressUnitCopy(item.bookInfo)
          const logs = [...getBookReadingLogs(item.id)].sort((a, b) =>
            (b.date || "").localeCompare(a.date || "")
          )
          const lastLog = logs[0]
          const coverSrc = item.bookInfo.coverUrl || item.bookInfo.cover
          const currentAmount = item.bookInfo.currentPage || 0
          const totalAmount = item.bookInfo.totalPages || "?"

          return (
            <DashboardSection
              key={item.id}
              as="article"
              title={progressCopy.isAudiobook ? "Currently Listening" : "Currently Reading"}
              tapeVariant="sage"
              variant="journal"
              flower="sprig"
              className="currently-reading-card paper-card paper-card--journal"
            >
              <div className="currently-reading-card-layout">
                <button
                  type="button"
                  className="currently-reading-cover-button"
                  onClick={() => openSavedReview(item)}
                  aria-label={`Open details for ${item.bookInfo.title || "Untitled Book"}`}
                >
                  <PolaroidFrame
                    src={coverSrc}
                    alt={`${item.bookInfo.title || "Current read"} cover`}
                    rotate="left"
                  />
                </button>

                <div className="currently-reading-card-body">
                  <div className="currently-reading-title-row">
                    <div>
                      <h2>{item.bookInfo.title || "Untitled Book"}</h2>
                      <p className="currently-reading-author">
                        {item.bookInfo.author || "Unknown Author"}
                      </p>
                    </div>
                    <Sticker icon="📖" tone="sage">
                      {item.bookInfo.format || "Book"}
                    </Sticker>
                  </div>

                  <div className="currently-reading-sticker-row">
                    {item.bookInfo.dateStarted && (
                      <Sticker icon="🌱" tone="linen">
                        Started {formatDate(item.bookInfo.dateStarted)}
                      </Sticker>
                    )}
                    <Sticker icon={progressCopy.isAudiobook ? "🎧" : "📍"} tone="rose">
                      {progressCopy.progressLine(currentAmount, totalAmount)}
                    </Sticker>
                  </div>

                  <div className="currently-reading-progress-panel">
                    <ProgressBar percent={progressPercent} />
                    <p>{progressPercent}% complete</p>
                  </div>

                  {lastLog && (
                    <PaperCard variant="notebook" className="currently-reading-last-log paper-card paper-card--notebook">
                      <p className="scrapbook-kicker">Last session</p>
                      <strong>{formatDateKey(lastLog.date)}</strong>
                      <span>
                        {lastLog.pagesRead || 0} {progressCopy.isAudiobook ? "minutes listened" : "pages"}
                        {!progressCopy.isAudiobook && lastLog.minutesRead
                          ? ` • ${lastLog.minutesRead} minutes`
                          : ""}
                      </span>
                      {lastLog.notes && <em>“{lastLog.notes}”</em>}
                    </PaperCard>
                  )}

                  <div className="currently-reading-actions">
                    <button
                      className="paper-button"
                      onClick={() => {
                        setSelectedReadingLogBookId(item.id)
                        setStep("readingLog")
                      }}
                    >
                      🔥 {progressCopy.isAudiobook ? "Log Listening" : "Log Reading"}
                    </button>
                    <button className="paper-button paper-button--quiet" onClick={() => finishBook(item)}>
                      ✅ Finish Book
                    </button>
                    <button className="paper-button paper-button--quiet" onClick={() => openSavedReview(item)}>
                      View Details
                    </button>
                    <button className="paper-button paper-button--quiet" onClick={() => editReview(item)}>
                      Edit
                    </button>
                    <button className="paper-button paper-button--quiet" onClick={() => deleteReview(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </DashboardSection>
          )
        })}
      </div>

      <button className="paper-button" onClick={() => setStep("home")}>Back Home</button>
    </section>
  )
}

export default CurrentlyReadingPage
