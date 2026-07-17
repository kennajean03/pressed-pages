import DashboardSection from "./scrapbook/DashboardSection/DashboardSection"
import MemoryShelf from "./scrapbook/MemoryShelf/MemoryShelf"
import FavoriteQuote from "./scrapbook/FavoriteQuote/FavoriteQuote"
import ScrapbookPhoto from "./scrapbook/ScrapbookPhoto/ScrapbookPhoto"
import PressedFlower from "./scrapbook/PressedFlower/PressedFlower"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./scrapbook/PolaroidFrame/PolaroidFrame"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"
import { useResolvedComposition } from "../scrapbook/hooks"
import { renderAnchors } from "../scrapbook/renderers/renderAnchors"


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
  readingLogQuoteInputs,
setReadingLogQuoteInputs,
readingLogQuoteSourceInputs,
setReadingLogQuoteSourceInputs,
readingLogQuotePageInputs,
setReadingLogQuotePageInputs,
readingLogFlowerInputs,
setReadingLogFlowerInputs,
readingLogFlowerLabelInputs,
setReadingLogFlowerLabelInputs,
readingLogFlowerDateInputs,
setReadingLogFlowerDateInputs,

readingLogPhotoFiles,
setReadingLogPhotoFiles,

readingLogPhotoCaptionInputs,
setReadingLogPhotoCaptionInputs,

readingLogPhotoLocationInputs,
setReadingLogPhotoLocationInputs,

readingLogPhotoDateInputs,
setReadingLogPhotoDateInputs,

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
          <p>
            Go back to Currently Reading and choose a book log to manage.
          </p>
          <button
            className="paper-button"
            onClick={() => setStep("currentlyReading")}
          >
            Back to Currently Reading
          </button>
        </PaperCard>
      </section>
    )
  }

  const {
    recipe: readingLogRecipe,
    composition: readingLogComposition,
  } = useResolvedComposition({
    scrapbookId: `reading-log-${item.id}`,
    objectType: "page",
    variant: "readingLog",
    readingState: "currentlyReading",
  })

  const pageClasses = [
    "reading-log-page",
    "scrapbook-page",
    "scrapbook-section",
    readingLogComposition?.layout?.density &&
      `reading-log-page--density-${readingLogComposition.layout.density}`,
    readingLogComposition?.feeling &&
      `reading-log-page--feeling-${readingLogComposition.feeling}`,
    readingLogRecipe?.compositionMood &&
      `reading-log-page--mood-${readingLogRecipe.compositionMood}`,
  ]
    .filter(Boolean)
    .join(" ")

  const progressPercent = getProgressPercent(item.bookInfo)
  const progressCopy = getProgressUnitCopy(item.bookInfo)

  const pageInputValue =
    progressInputs[item.id] ??
    item.bookInfo.currentPage ??
    ""

  const readingLogs = [
    ...getBookReadingLogs(item.id),
  ].sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  )

  const coverSrc =
    item.bookInfo.coverUrl ||
    item.bookInfo.cover

    const memoryStatus = {
  photo: Boolean(
    readingLogPhotoFiles[item.id]
  ),

  favoriteQuote: Boolean(
    readingLogQuoteInputs[item.id]?.trim()
  ),

  flower: Boolean(
    readingLogFlowerInputs[item.id]
  ),
}

  return (
    <section
      className={pageClasses}
      data-composition-mood={
        readingLogRecipe?.compositionMood
      }
      data-scrapbook-feeling={
        readingLogComposition?.feeling
      }
    >
      <PaperCard
        as="header"
        variant="deckled"
        tape="Reading Log"
        tapeVariant="sage"
        flower="sprig"
        className="reading-log-hero paper-card paper-card--deckled"
      >
        {renderAnchors(readingLogComposition)}

        <div className="reading-log-hero-layout">
          <PolaroidFrame
            src={coverSrc}
            alt={`${item.bookInfo.title || "Book"} cover`}
            rotate="left"
          />

          <div className="reading-log-title-stack">
            <p className="scrapbook-kicker">
              Today's Reading Session
            </p>

            <div className="reading-log-title-strip">
              <h1>
                {item.bookInfo.title || "Untitled Book"}
              </h1>
            </div>

            <p className="reading-log-author">
              {item.bookInfo.author || "Unknown Author"}
            </p>

            <div className="reading-log-hero-stickers">
              <Sticker
                icon={
                  progressCopy.isAudiobook
                    ? "🎧"
                    : "📖"
                }
                tone="sage"
              >
                {progressCopy.progressLine(
                  item.bookInfo.currentPage,
                  item.bookInfo.totalPages
                )}
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
          <p className="scrapbook-kicker">
            Log a new memory
          </p>

          <h2>
            {progressCopy.isAudiobook
              ? "What did you listen to today?"
              : "What did you read today?"}
          </h2>

          <p>
            Add today’s progress, minutes, and any notes
            you want to remember from this session.
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
              max={
                item.bookInfo.totalPages ||
                undefined
              }
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
            <label>
              {progressCopy.optionalMinutesLabel}
            </label>

            <input
              type="number"
              min="0"
              value={
                progressCopy.isAudiobook
                  ? ""
                  : readingLogMinutesInputs[
                      item.id
                    ] || ""
              }
              disabled={
                progressCopy.isAudiobook
              }
              placeholder={
                progressCopy.isAudiobook
                  ? "Uses minutes listened above"
                  : ""
              }
              onChange={(event) =>
                setReadingLogMinutesInputs({
                  ...readingLogMinutesInputs,
                  [item.id]:
                    event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="review-field">
          <label>Reading Notes (optional)</label>

          <textarea
            value={
              readingLogNoteInputs[item.id] ||
              ""
            }
            onChange={(event) =>
              setReadingLogNoteInputs({
                ...readingLogNoteInputs,
                [item.id]:
                  event.target.value,
              })
            }
            placeholder="Optional: where you read, thoughts, chaos, etc."
          />
        </div>

       <MemoryShelf
  memoryStatus={memoryStatus}
  editorProps={{
    item,

    readingLogQuoteInputs,
    setReadingLogQuoteInputs,

    readingLogQuoteSourceInputs,
    setReadingLogQuoteSourceInputs,

    readingLogQuotePageInputs,
    setReadingLogQuotePageInputs,

    readingLogFlowerInputs,
    setReadingLogFlowerInputs,

    readingLogFlowerLabelInputs,
    setReadingLogFlowerLabelInputs,

    readingLogFlowerDateInputs,
    setReadingLogFlowerDateInputs,

    readingLogPhotoFiles,
    setReadingLogPhotoFiles,

    readingLogPhotoCaptionInputs,
    setReadingLogPhotoCaptionInputs,

    readingLogPhotoLocationInputs,
    setReadingLogPhotoLocationInputs,

    readingLogPhotoDateInputs,
    setReadingLogPhotoDateInputs,
  }}
/>

        <button
          className="paper-button reading-log-submit-button"
          onClick={() =>
            logReadingProgress(item.id)
          }
        >
          🔥{" "}
          {progressCopy.isAudiobook
            ? "Log Listening"
            : "Log Reading"}
        </button>
      </DashboardSection>

      <SectionDivider
        label="Session History"
        icon="☕"
      />

      <DashboardSection
        title="Reading Journal"
        tapeVariant="rose"
        variant="notebook"
        className="reading-log-history-card paper-card paper-card--notebook"
      >
        <div className="reading-log-history-intro">
          <p className="scrapbook-kicker">
            Session archive
          </p>

          <h2>Your reading memories</h2>

          <p>
            Each log is a little bookmark in this
            book’s story. Edit details or delete
            accidental entries here.
          </p>
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
            const draftKey =
              `${item.id}-${log.id}`

            const draft =
              readingLogDrafts[draftKey] ||
              {}

            const hasUnsavedEdits = Boolean(
              readingLogDirty[draftKey]
            )

            const savedQuote =
  draft.favoriteQuote ??
  log.favoriteQuote ??
  ""

const savedQuoteSource =
  draft.quoteSource ??
  log.quoteSource ??
  ""

const savedQuotePage =
  draft.quotePage ??
  log.quotePage ??
  ""

const savedArtifacts = Array.isArray(draft.artifacts)
  ? draft.artifacts
  : Array.isArray(log.artifacts)
    ? log.artifacts
    : []

const savedPhotoArtifact = savedArtifacts.find((artifact) => {
  const artifactType =
    artifact?.type ||
    artifact?.artifactType ||
    artifact?.kind ||
    artifact?.id ||
    ""

  return [
    "photo",
    "readingPhoto",
    "reading-photo",
    "scrapbookPhoto",
    "scrapbook-photo",
  ].includes(artifactType)
})

const savedPhotoPayload =
  savedPhotoArtifact?.payload ||
  savedPhotoArtifact?.data ||
  savedPhotoArtifact ||
  {}

const savedPhoto =
  draft.photoUrl ??
  log.photoUrl ??
  log.photoURL ??
  log.imageUrl ??
  log.imageURL ??
  log.photo ??
  savedPhotoPayload.photoUrl ??
  savedPhotoPayload.photoURL ??
  savedPhotoPayload.url ??
  savedPhotoPayload.src ??
  savedPhotoPayload.imageUrl ??
  ""

const savedPhotoCaption =
  draft.photoCaption ??
  log.photoCaption ??
  log.caption ??
  savedPhotoPayload.photoCaption ??
  savedPhotoPayload.caption ??
  ""

const savedPhotoLocation =
  draft.photoLocation ??
  log.photoLocation ??
  log.location ??
  savedPhotoPayload.photoLocation ??
  savedPhotoPayload.location ??
  ""

const savedPhotoDate =
  draft.photoDate ??
  log.photoDate ??
  savedPhotoPayload.photoDate ??
  savedPhotoPayload.date ??
  ""

const savedFlowerVariant =
  draft.flowerVariant ??
  log.flowerVariant ??
  ""

const savedFlowerLabel =
  draft.flowerLabel ??
  log.flowerLabel ??
  ""

const savedFlowerDate =
  draft.flowerDate ??
  log.flowerDate ??
  ""

const hasSavedArtifacts =
  Boolean(savedPhoto) ||
  Boolean(savedQuote) ||
  Boolean(savedFlowerVariant)


            return (
              <PaperCard
                variant="journal"
                className="reading-log-timeline-entry paper-card paper-card--journal"
                key={log.id}
              >
                <div className="reading-log-memory-header">
                  <div>
                    <p className="scrapbook-kicker">
                      Journal Entry
                    </p>

                    <h3>
                      {formatDateKey(
                        draft.date ??
                          log.date
                      )}
                    </h3>
                  </div>

                  <Sticker
                    icon={
                      progressCopy.isAudiobook
                        ? "🎧"
                        : "📖"
                    }
                    tone="sage"
                  >
                    {draft.pagesRead ??
                      log.pagesRead ??
                      0}{" "}
                    {progressCopy.isAudiobook
                      ? "minutes listened"
                      : "pages"}
                  </Sticker>
                </div>

                <div className="reading-log-entry-summary">
                  <Sticker
                    icon="📅"
                    tone="linen"
                  >
                    {formatDateKey(
                      draft.date ??
                        log.date
                    )}
                  </Sticker>

                  <Sticker
                    icon={
                      progressCopy.isAudiobook
                        ? "🎧"
                        : "📖"
                    }
                    tone="sage"
                  >
                    {draft.pagesRead ??
                      log.pagesRead ??
                      0}{" "}
                    {progressCopy.isAudiobook
                      ? "minutes listened"
                      : "pages"}
                  </Sticker>

                  {!progressCopy.isAudiobook &&
                  (draft.minutesRead ??
                    log.minutesRead) ? (
                    <Sticker
                      icon="☕"
                      tone="rose"
                    >
                      {draft.minutesRead ??
                        log.minutesRead}{" "}
                      minutes
                    </Sticker>
                  ) : null}
                </div>

                <div className="reading-log-edit-grid">
                  <label>
                    Log Date

                    <input
                      type="date"
                      value={
                        draft.date ??
                        log.date ??
                        ""
                      }
                      onChange={(event) =>
                        stageReadingLogEdit(
                          item.id,
                          log.id,
                          "date",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.amountLabel}

                    <input
                      type="number"
                      min="0"
                      value={
                        draft.pagesRead ??
                        log.pagesRead ??
                        0
                      }
                      onChange={(event) =>
                        stageReadingLogEdit(
                          item.id,
                          log.id,
                          "pagesRead",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.endedLabel}

                    <input
                      type="number"
                      min="0"
                      max={
                        item.bookInfo
                          .totalPages ||
                        undefined
                      }
                      value={
                        draft.endPage ??
                        log.endPage ??
                        0
                      }
                      onChange={(event) =>
                        stageReadingLogEdit(
                          item.id,
                          log.id,
                          "endPage",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    {progressCopy.isAudiobook
                      ? "Listening Minutes"
                      : "Minutes Read"}

                    <input
                      type="number"
                      min="0"
                      value={
                        draft.minutesRead ??
                        log.minutesRead ??
                        ""
                      }
                      onChange={(event) =>
                        stageReadingLogEdit(
                          item.id,
                          log.id,
                          "minutesRead",
                          event.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <label className="reading-log-notes-field">
                  Notes

                  <textarea
                    value={
                      draft.notes ??
                      log.notes ??
                      ""
                    }
                    placeholder="What do you want to remember about this session?"
                    onChange={(event) =>
                      stageReadingLogEdit(
                        item.id,
                        log.id,
                        "notes",
                        event.target.value
                      )
                    }
                  />
                </label>

                {hasSavedArtifacts && (
  <div className="reading-log-entry-artifacts">
    <div className="reading-log-entry-artifacts__heading">
      <p className="scrapbook-kicker">
        Preserved from this session
      </p>

      <span>
        Memory artifacts
      </span>
    </div>

    <div className="reading-log-entry-artifacts__collection">
      {savedPhoto && (
        <ScrapbookPhoto
          src={savedPhoto}
          alt={`Reading memory from ${
            item.bookInfo.title ||
            "this book"
          }`}
          caption={savedPhotoCaption}
          location={savedPhotoLocation}
          date={
            savedPhotoDate
              ? formatDateKey(savedPhotoDate)
              : log.date
                ? formatDateKey(log.date)
                : ""
          }
          clip="paperclip"
          rotation={-2}
          size="small"
        />
      )}

            {savedQuote && (
        <FavoriteQuote
          quote={savedQuote}
          source={savedQuoteSource}
          page={savedQuotePage}
          rotation={1}
          size="medium"
        />
      )}

      {savedFlowerVariant && (
        <PressedFlower
          variant={savedFlowerVariant}
          label={savedFlowerLabel}
          date={
            savedFlowerDate
              ? formatDateKey(savedFlowerDate)
              : ""
          }
          attachment="tape"
          rotation={-2}
          size="medium"
        />
      )}
    </div>
  </div>
)}

                <div className="reading-log-entry-actions">
                  {hasUnsavedEdits && (
                    <button
                      className="paper-button"
                      onClick={() =>
                        saveReadingLogEdits(
                          item.id,
                          log.id
                        )
                      }
                    >
                      Save Edits
                    </button>
                  )}

                  <button
                    className="paper-button paper-button--quiet"
                    onClick={() =>
                      deleteReadingLog(
                        item.id,
                        log.id
                      )
                    }
                  >
                    Delete Log
                  </button>
                </div>
              </PaperCard>
            )
          })}
        </div>
      </DashboardSection>

      <div className="reading-log-footer-actions">
        <button
          className="paper-button"
          onClick={() =>
            setStep("currentlyReading")
          }
        >
          Back to Currently Reading
        </button>

        <button
          className="paper-button paper-button--quiet"
          onClick={() => setStep("home")}
        >
          Back Home
        </button>
      </div>
    </section>
  )
}

export default ReadingLogPage