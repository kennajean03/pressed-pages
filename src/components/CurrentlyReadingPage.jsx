import DashboardSection from "./scrapbook/DashboardSection/DashboardSection"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import { useResolvedComposition } from "../scrapbook/hooks"
import { renderAnchors } from "../scrapbook/renderers/renderAnchors"
import CurrentReadingComposition from "./CurrentReadingComposition"

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
    const logs = getBookReadingLogs(item.id)

    return (
      sum +
      logs.reduce((bookTotal, log) => {
        const amount = Number(log.pagesRead || 0)
        return bookTotal + amount
      }, 0)
    )
  }, 0)

  const {
    recipe: currentlyReadingRecipe,
    composition: currentlyReadingComposition,
  } = useResolvedComposition({
    scrapbookId: "currently-reading-page",
    objectType: "page",
    variant: "currentlyReading",
    readingState: "currentlyReading",
  })

  const pageClasses = [
    "currently-reading-page",
    "scrapbook-page",
    "scrapbook-section",
    currentlyReadingComposition?.layout?.density &&
      `currently-reading-page--density-${currentlyReadingComposition.layout.density}`,
    currentlyReadingComposition?.feeling &&
      `currently-reading-page--feeling-${currentlyReadingComposition.feeling}`,
    currentlyReadingRecipe?.compositionMood &&
      `currently-reading-page--mood-${currentlyReadingRecipe.compositionMood}`,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={pageClasses}
      data-composition-mood={currentlyReadingRecipe?.compositionMood}
      data-scrapbook-feeling={currentlyReadingComposition?.feeling}
    >
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Journal"
        tapeVariant="sage"
        flower="sprig"
        className="currently-reading-hero paper-card paper-card--deckled"
      >
        {renderAnchors(currentlyReadingComposition)}
        <div className="currently-reading-hero-copy">
          <p className="scrapbook-kicker">Continue your story</p>
          <h1>Currently Reading</h1>
          <p>
            Track the books you are actively reading or listening to, log cozy sessions,
            and keep your progress tucked safely inside your reading journal.
          </p>
        </div>
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
          <button
            type="button"
            className="paper-button"
            onClick={() => setStep("addBook")}
          >
            Add a Book
          </button>
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
              className={[
                "currently-reading-card",
                "paper-card",
                "paper-card--journal",
                progressCopy.isAudiobook && "currently-reading-card--audio",
                lastLog?.notes && "currently-reading-card--has-notes",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <CurrentReadingComposition
  item={item}
  progressCopy={progressCopy}
  progressPercent={progressPercent}
  readingLogs={logs}
  lastLog={lastLog}
  coverSrc={coverSrc}
  currentAmount={currentAmount}
  totalAmount={totalAmount}
  formatDate={formatDate}
  formatDateKey={formatDateKey}
  setSelectedReadingLogBookId={setSelectedReadingLogBookId}
  setStep={setStep}
  finishBook={finishBook}
  openSavedReview={openSavedReview}
  editReview={editReview}
  deleteReview={deleteReview}
/>
            </DashboardSection>
          )
        })}
      </div>

      <button className="paper-button" onClick={() => setStep("home")}>
        Back Home
      </button>
    </section>
  )
}

export default CurrentlyReadingPage