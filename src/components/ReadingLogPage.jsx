import DashboardSection from "./Scrapbook/DashboardSection/DashboardSection"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./Scrapbook/PolaroidFrame/PolaroidFrame"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"
import Sticker from "./Scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"

function ReadingLogPage({
  getProgressUnitCopy,
  savedReviews,
  selectedReadingLogBookId,
  saveMessage,
  getProgressPercent,
  progressInputs,
  setProgressInputs,
  readingLogMinutesInputs,
  setReadingLogMinutesInputs,
  readingLogNoteInputs,
  setReadingLogNoteInputs,
  getBookReadingLogs,
  logReadingProgress,
  readingLogDrafts,
  readingLogDirty,
  stageReadingLogEdit,
  saveReadingLogEdits,
  deleteReadingLog,
  formatDateKey,
  setStep,
}) {
  const item = savedReviews.find(
    (reviewItem) => reviewItem.id === selectedReadingLogBookId
  )

  if (!item) {
    return (
      <section className="reading-log-page scrapbook-page scrapbook-section">
        <PaperCard className="reading-log-empty paper-card sticky-note">
          <p className="scrapbook-kicker">Reading Log</p>
          <h1>No book selected</h1>
          <p>Go back to Currently Reading and choose a book log to manage.</p>
          <button className="paper-button" onClick={() => setStep("currentlyReading")}>
            Back to Currently Reading
          </button>
        </PaperCard>
      </section>
    )
  }

  const progressPercent = getProgressPercent(item.bookInfo)
  const progressCopy = getProgressUnitCopy(item.bookInfo)
  const pageInputValue = progressInputs[item.id] ?? item.bookInfo.currentPage ?? ""
  const readingLogs = [...getBookReadingLogs(item.id)].sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  )
  const coverSrc = item.bookInfo.coverUrl || item.bookInfo.cover

  return (
    <section className="reading-log-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Log"
        tapeVariant="sage"
        flower="sprig"
        className="reading-log-hero paper-card paper-card--deckled"
      >
        <div className="reading-log-hero-layout">
          <PolaroidFrame
            src={coverSrc}
            alt={`${item.bookInfo.title || "Book"} cover`}
            rotate="left"
          />
          <div>
            <p className="scrapbook-kicker">Today’s reading session</p>
            <h1>{item.bookInfo.title || "Untitled Book"}</h1>
            <p>{item.bookInfo.author || "Unknown Author"}</p>
            <div className="reading-log-hero-stickers">
              <Sticker icon={progressCopy.isAudiobook ? "🎧" : "📖"} tone="sage">
                {progressCopy.progressLine(item.bookInfo.currentPage, item.bookInfo.totalPages)}
              </Sticker>
              <Sticker icon="🌸" tone="rose">
                {progressPercent}% complete
              </Sticker>
            </div>
          </div>
        </div>
      </PaperCard>

      {saveMessage && (
        <PaperCard className="reading-log-message sticky-note paper-card">
          <p>{saveMessage}</p>
        </PaperCard>
      )}

      <DashboardSection
        title="Current Progress"
        tapeVariant="linen"
        variant="journal"
        flower="sprig"
        className="reading-log-entry-card paper-card paper-card--journal"
      >
        <div className="reading-log-session-intro">
          <p className="scrapbook-kicker">Log a new memory</p>
          <h2>{progressCopy.isAudiobook ? "What did you listen to today?" : "What did you read today?"}</h2>
          <p>
            Add today’s progress, minutes, and any notes you want to remember from this session.
          </p>
        </div>

        <div className="reading-log-progress-card">
          <ProgressBar percent={progressPercent} />
          <p>{progressPercent}% complete</p>
        </div>

        <div className="reading-log-form-grid">
          <div className="review-field">
            <label>{progressCopy.reachedLabel}</label>
            <input
              type="number"
              min="0"
              max={item.bookInfo.totalPages || undefined}
              value={pageInputValue}
              onChange={(event) =>
                setProgressInputs({
                  ...progressInputs,
                  [item.id]: event.target.value,
                })
              }
            />
          </div>

          <div className="review-field">
            <label>{progressCopy.optionalMinutesLabel}</label>
            <input
              type="number"
              min="0"
              value={progressCopy.isAudiobook ? "" : readingLogMinutesInputs[item.id] || ""}
              disabled={progressCopy.isAudiobook}
              placeholder={progressCopy.isAudiobook ? "Uses minutes listened above" : ""}
              onChange={(event) =>
                setReadingLogMinutesInputs({
                  ...readingLogMinutesInputs,
                  [item.id]: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="review-field">
          <label>Reading Notes (optional)</label>
          <textarea
            value={readingLogNoteInputs[item.id] || ""}
            onChange={(event) =>
              setReadingLogNoteInputs({
                ...readingLogNoteInputs,
                [item.id]: event.target.value,
              })
            }
            placeholder="Optional: where you read, thoughts, chaos, etc."
          />
        </div>

        <button className="paper-button reading-log-submit-button" onClick={() => logReadingProgress(item.id)}>
          🔥 {progressCopy.isAudiobook ? "Log Listening" : "Log Reading"}
        </button>
      </DashboardSection>

      <SectionDivider label="Session History" icon="☕" />

      <DashboardSection
        title="Reading Journal"
        tapeVariant="rose"
        variant="notebook"
        className="reading-log-history-card paper-card paper-card--notebook"
      >
        <div className="reading-log-history-intro">
          <p className="scrapbook-kicker">Session archive</p>
          <h2>Your reading memories</h2>
          <p>Each log is a little bookmark in this book’s story. Edit details or delete accidental entries here.</p>
        </div>

        {readingLogs.length === 0 && (
          <PaperCard className="reading-log-empty-note sticky-note paper-card">
            <p>
              {progressCopy.isAudiobook
                ? "No listening logs yet. Your streak starts once you log 2 days in a row."
                : "No page logs yet. Your streak starts once you log 2 days in a row."}
            </p>
          </PaperCard>
        )}

        <div className="reading-log-timeline">
          {readingLogs.map((log) => {
            const draftKey = `${item.id}-${log.id}`
            const draft = readingLogDrafts[draftKey] || {}
            const hasUnsavedEdits = Boolean(readingLogDirty[draftKey])

            return (
              <PaperCard variant="journal" className="reading-log-timeline-entry paper-card paper-card--journal" key={log.id}>
                <div className="reading-log-memory-header">
                  <div>
                    <p className="scrapbook-kicker">Journal Entry</p>
                    <h3>{formatDateKey(draft.date ?? log.date)}</h3>
                  </div>
                  <Sticker icon={progressCopy.isAudiobook ? "🎧" : "📖"} tone="sage">
                    {draft.pagesRead ?? log.pagesRead ?? 0} {progressCopy.isAudiobook ? "minutes listened" : "pages"}
                  </Sticker>
                </div>

                <div className="reading-log-entry-summary">
                  <Sticker icon="📅" tone="linen">
                    {formatDateKey(draft.date ?? log.date)}
                  </Sticker>
                  <Sticker icon={progressCopy.isAudiobook ? "🎧" : "📖"} tone="sage">
                    {draft.pagesRead ?? log.pagesRead ?? 0} {progressCopy.isAudiobook ? "minutes listened" : "pages"}
                  </Sticker>
                  {!progressCopy.isAudiobook && (draft.minutesRead ?? log.minutesRead) ? (
                    <Sticker icon="☕" tone="rose">
                      {draft.minutesRead ?? log.minutesRead} minutes
                    </Sticker>
                  ) : null}
                </div>

                <div className="reading-log-edit-grid">
                  <label>
                    Log Date
                    <input
                      type="date"
                      value={draft.date ?? log.date ?? ""}
                      onChange={(event) =>
                        stageReadingLogEdit(item.id, log.id, "date", event.target.value)
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.amountLabel}
                    <input
                      type="number"
                      min="0"
                      value={draft.pagesRead ?? log.pagesRead ?? 0}
                      onChange={(event) =>
                        stageReadingLogEdit(item.id, log.id, "pagesRead", event.target.value)
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.endedLabel}
                    <input
                      type="number"
                      min="0"
                      max={item.bookInfo.totalPages || undefined}
                      value={draft.endPage ?? log.endPage ?? 0}
                      onChange={(event) =>
                        stageReadingLogEdit(item.id, log.id, "endPage", event.target.value)
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.isAudiobook ? "Listening Minutes" : "Minutes Read"}
                    <input
                      type="number"
                      min="0"
                      value={draft.minutesRead ?? log.minutesRead ?? ""}
                      onChange={(event) =>
                        stageReadingLogEdit(item.id, log.id, "minutesRead", event.target.value)
                      }
                    />
                  </label>
                </div>

                <label className="reading-log-notes-field">
                  Notes
                  <textarea
                    value={draft.notes ?? log.notes ?? ""}
                    placeholder="What do you want to remember about this session?"
                    onChange={(event) =>
                      stageReadingLogEdit(item.id, log.id, "notes", event.target.value)
                    }
                  />
                </label>

                <div className="reading-log-entry-actions">
                  {hasUnsavedEdits && (
                    <button className="paper-button" onClick={() => saveReadingLogEdits(item.id, log.id)}>
                      Save Edits
                    </button>
                  )}

                  <button className="paper-button paper-button--quiet" onClick={() => deleteReadingLog(item.id, log.id)}>
                    Delete Log
                  </button>
                </div>
              </PaperCard>
            )
          })}
        </div>
      </DashboardSection>

      <div className="reading-log-footer-actions">
        <button className="paper-button" onClick={() => setStep("currentlyReading")}>
          Back to Currently Reading
        </button>
        <button className="paper-button paper-button--quiet" onClick={() => setStep("home")}>Back Home</button>
      </div>
    </section>
  )
}

export default ReadingLogPage
