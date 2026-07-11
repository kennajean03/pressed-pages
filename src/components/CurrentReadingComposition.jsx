import MountedBook from "./scrapbook/MountedBook/MountedBook"
import MuseumLabel from "./scrapbook/MuseumLabel/MuseumLabel"
import ProgressSheet from "./scrapbook/ProgressSheet/ProgressSheet"
import JournalPage from "./scrapbook/JournalPage/JournalPage"
import LibraryTabs from "./scrapbook/LibraryTabs/LibraryTabs"
import ScrapbookPhoto from "./scrapbook/ScrapbookPhoto/ScrapbookPhoto"
import FavoriteQuote from "./scrapbook/FavoriteQuote/FavoriteQuote"
import Sticker from "./scrapbook/Sticker/Sticker"
import {
  currentReadingObjectComposition,
} from "../scrapbook/composition/currentReadingObjectComposition"
import {
  resolveScrapbookObjectsByRole,
} from "../scrapbook/resolvers/resolveScrapbookObjects"
import ScrapbookObjectRenderer from "../scrapbook/renderers/ScrapbookObjectRenderer"

function CurrentReadingComposition({
  item,
  progressCopy,
  progressPercent,
  lastLog,
  coverSrc,
  currentAmount,
  totalAmount,
  formatDate,
  formatDateKey,
  setSelectedReadingLogBookId,
  setStep,
  finishBook,
  openSavedReview,
  editReview,
  deleteReview,
}) {
  const title =
    item.bookInfo.title || "Untitled Book"
  const author =
    item.bookInfo.author || "Unknown Author"
  const format =
    item.bookInfo.format || "Book"
  const dateStarted =
    item.bookInfo.dateStarted
  const isAudiobook =
    progressCopy.isAudiobook

  const resolvedObjectsByRole =
    resolveScrapbookObjectsByRole(
      currentReadingObjectComposition
    )

  const storyLabel =
    resolvedObjectsByRole.storyLabel

  const heroBook =
    resolvedObjectsByRole.heroBook

  const readingProgress =
    resolvedObjectsByRole.readingProgress

  const latestMemory =
    resolvedObjectsByRole.latestMemory

  const readingActions =
    resolvedObjectsByRole.readingActions

  const progressLine =
    progressCopy.progressLine(
      currentAmount,
      totalAmount
    )

  const readingMemoryStats = lastLog
    ? [
        {
          value: lastLog.pagesRead || 0,
          label: isAudiobook
            ? "minutes listened"
            : "pages read",
        },
        ...(!isAudiobook &&
        lastLog.minutesRead
          ? [
              {
                value: lastLog.minutesRead,
                label: "minutes",
              },
            ]
          : []),
      ]
    : []

  const latestMemoryPhoto =
    lastLog?.photoUrl ||
    lastLog?.photoURL ||
    lastLog?.imageUrl ||
    lastLog?.imageURL ||
    lastLog?.photo ||
    null

  const latestMemoryPhotoCaption =
    lastLog?.photoCaption ||
    lastLog?.caption ||
    ""

  const latestMemoryQuote =
    lastLog?.favoriteQuote ||
    lastLog?.quote ||
    ""

  const latestMemoryQuoteSource =
    lastLog?.quoteSource ||
    lastLog?.quoteChapter ||
    ""

  const latestMemoryQuotePage =
    lastLog?.quotePage ||
    lastLog?.pageNumber ||
    ""

  const hasMemoryArtifacts =
    Boolean(latestMemoryPhoto) ||
    Boolean(latestMemoryQuote)

  const handleLogReading = () => {
    setSelectedReadingLogBookId(item.id)
    setStep("readingLog")
  }

  const supportingBookActions = [
    {
      id: "view-details",
      label: "View details",
      onClick: () =>
        openSavedReview(item),
    },
    {
      id: "edit-book",
      label: "Edit book",
      onClick: () =>
        editReview(item),
    },
    {
      id: "delete-book",
      label: "Delete",
      tone: "danger",
      onClick: () =>
        deleteReview(item.id),
    },
  ]

  return (
    <article className="current-reading-composition current-reading-composition--v2">
      <header className="current-reading-composition__story-header">
        <ScrapbookObjectRenderer
          object={storyLabel?.object}
          definition={storyLabel?.definition}
          presentation={
            storyLabel?.presentation
          }
          className="current-reading-composition__story-label"
        >
          <p className="scrapbook-kicker">
            Currently reading
          </p>

          <span className="current-reading-composition__story-label-mark">
            Your story with this book
          </span>
        </ScrapbookObjectRenderer>
      </header>

      <ScrapbookObjectRenderer
        object={heroBook?.object}
        definition={heroBook?.definition}
        presentation={heroBook?.presentation}
        as="section"
        className="current-reading-composition__book-hero"
        aria-labelledby={`current-reading-title-${item.id}`}
      >
        <button
          type="button"
          className="current-reading-composition__cover"
          onClick={() =>
            openSavedReview(item)
          }
          aria-label={`Open details for ${title}`}
        >
          <MountedBook
            src={coverSrc}
            alt={`${title} cover`}
            scrapbookId={item.id}
            rotate="left"
            tape="linen"
            corners="photo"
            state="active"
          />
        </button>

        <div className="current-reading-composition__book-story">
          <MuseumLabel
            eyebrow="The Book"
            title={title}
            author={author}
            titleId={`current-reading-title-${item.id}`}
            rotate="right"
            tape="linen"
            state="featured"
          >
            <div
              className="current-reading-composition__metadata"
              aria-label="Book details"
            >
              <Sticker
                icon={
                  isAudiobook
                    ? "🎧"
                    : "📖"
                }
                tone="sage"
              >
                {format}
              </Sticker>

              {dateStarted && (
                <Sticker
                  icon="🌱"
                  tone="linen"
                >
                  Started{" "}
                  {formatDate(dateStarted)}
                </Sticker>
              )}
            </div>
          </MuseumLabel>
        </div>
      </ScrapbookObjectRenderer>

      <ScrapbookObjectRenderer
        object={readingProgress?.object}
        definition={
          readingProgress?.definition
        }
        presentation={
          readingProgress?.presentation
        }
        as="section"
        className="current-reading-composition__reading-progress"
      >
        <ProgressSheet
          eyebrow="Reading progress"
          title="Where you are now"
          titleId={`current-reading-progress-${item.id}`}
          percent={progressPercent}
          progressLine={progressLine}
          progressCaption={`${progressPercent}% complete`}
          state={
            readingProgress?.state ||
            "beginning"
          }
          paper="grid"
          rotate="left"
        />
      </ScrapbookObjectRenderer>

      <ScrapbookObjectRenderer
        object={latestMemory?.object}
        definition={latestMemory?.definition}
        presentation={
          latestMemory?.presentation
        }
        as="section"
        className="current-reading-composition__memory"
      >
        <JournalPage
          eyebrow="Reading memory"
          title="Your last session"
          titleId={`current-reading-memory-${item.id}`}
          date={
            lastLog
              ? formatDateKey(lastLog.date)
              : null
          }
          stats={readingMemoryStats}
          note={lastLog?.notes}
          emptyTitle="Your first reading memory is waiting."
          emptyCopy={`Log your next ${
            isAudiobook
              ? "listening"
              : "reading"
          } session to begin preserving your journey with this book.`}
          state={
            latestMemory?.state ||
            "writing"
          }
          paper="notebook"
          rotate="right"
        >
          {hasMemoryArtifacts && (
            <>
              {latestMemoryPhoto && (
                <ScrapbookPhoto
                  src={latestMemoryPhoto}
                  alt={`Reading memory from ${title}`}
                  caption={
                    latestMemoryPhotoCaption
                  }
                  date={
                    lastLog?.date
                      ? formatDateKey(
                          lastLog.date
                        )
                      : ""
                  }
                  rotation={-2}
                  size="small"
                />
              )}

              {latestMemoryQuote && (
                <FavoriteQuote
                  quote={latestMemoryQuote}
                  source={
                    latestMemoryQuoteSource
                  }
                  page={
                    latestMemoryQuotePage
                  }
                  rotation={1}
                  size="medium"
                />
              )}
            </>
          )}
        </JournalPage>
      </ScrapbookObjectRenderer>

      <ScrapbookObjectRenderer
        object={readingActions?.object}
        definition={
          readingActions?.definition
        }
        presentation={
          readingActions?.presentation
        }
        as="footer"
        className="current-reading-composition__actions"
      >
        <LibraryTabs
          primaryLabel={
            isAudiobook
              ? "Log Listening"
              : "Log Reading"
          }
          primaryIcon={
            isAudiobook
              ? "🎧"
              : "🔥"
          }
          onPrimary={handleLogReading}
          secondaryLabel="Finish Book"
          secondaryIcon="✓"
          onSecondary={() =>
            finishBook(item)
          }
          supportingActions={
            supportingBookActions
          }
          state={
            readingActions?.state ||
            "active"
          }
          align="left"
          ariaLabel={`Actions for ${title}`}
        />
      </ScrapbookObjectRenderer>
    </article>
  )
}

export default CurrentReadingComposition