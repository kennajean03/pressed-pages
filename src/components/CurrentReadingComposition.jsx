import PaperCard from "./scrapbook/PaperCard/PaperCard"
import PolaroidFrame from "./scrapbook/PolaroidFrame/PolaroidFrame"
import Sticker from "./scrapbook/Sticker/Sticker"
import ProgressBar from "./ProgressBar"
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
  const title = item.bookInfo.title || "Untitled Book"
  const author = item.bookInfo.author || "Unknown Author"
  const format = item.bookInfo.format || "Book"
  const dateStarted = item.bookInfo.dateStarted
  const isAudiobook = progressCopy.isAudiobook

const resolvedObjectsByRole =
  resolveScrapbookObjectsByRole(
    currentReadingObjectComposition
  )

const storyLabel =
  resolvedObjectsByRole.storyLabel

const readingProgress =
  resolvedObjectsByRole.readingProgress

  const progressLine = progressCopy.progressLine(
    currentAmount,
    totalAmount
  )

  const handleLogReading = () => {
    setSelectedReadingLogBookId(item.id)
    setStep("readingLog")
  }

  return (
    <article className="current-reading-composition current-reading-composition--v2">
<header className="current-reading-composition__story-header">
  <ScrapbookObjectRenderer
  object={storyLabel?.object}
  definition={storyLabel?.definition}
  className="current-reading-composition__story-label"
>
    <p className="scrapbook-kicker">Currently reading</p>

    <span className="current-reading-composition__story-label-mark">
      Your story with this book
    </span>
  </ScrapbookObjectRenderer>
</header>

      <section
        className="current-reading-composition__book-hero"
        aria-labelledby={`current-reading-title-${item.id}`}
      >
        <button
          type="button"
          className="current-reading-composition__cover"
          onClick={() => openSavedReview(item)}
          aria-label={`Open details for ${title}`}
        >
          <PolaroidFrame
            src={coverSrc}
            alt={`${title} cover`}
            rotate="left"
          />
        </button>

        <div className="current-reading-composition__book-story">
          <div className="current-reading-composition__title-card">
            <p className="scrapbook-kicker">The book</p>

            <h2 id={`current-reading-title-${item.id}`}>
              {title}
            </h2>

            <p className="current-reading-composition__author">
              by {author}
            </p>
          </div>

          <div
            className="current-reading-composition__metadata"
            aria-label="Book details"
          >
            <Sticker icon={isAudiobook ? "🎧" : "📖"} tone="sage">
              {format}
            </Sticker>

            {dateStarted && (
              <Sticker icon="🌱" tone="linen">
                Started {formatDate(dateStarted)}
              </Sticker>
            )}
          </div>
        </div>
      </section>

      <ScrapbookObjectRenderer
  object={readingProgress?.object}
  definition={readingProgress?.definition}
  as="section"
  className="current-reading-composition__reading-progress"
>
  <div className="current-reading-composition__section-heading">
    <div>
      <p className="scrapbook-kicker">Reading progress</p>
      <h3>Where you are now</h3>
    </div>

    <strong className="current-reading-composition__progress-percent">
      {progressPercent}%
    </strong>
  </div>

  <div className="current-reading-composition__progress-story">
    <ProgressBar percent={progressPercent} />

    <div className="current-reading-composition__progress-details">
      <span className="current-reading-composition__progress-line">
        {progressLine}
      </span>

      <span className="current-reading-composition__progress-caption">
        {progressPercent}% complete
      </span>
    </div>
  </div>
</ScrapbookObjectRenderer>

      <section className="current-reading-composition__memory">
        <div className="current-reading-composition__section-heading">
          <div>
            <p className="scrapbook-kicker">Reading memory</p>
            <h3>Your last session</h3>
          </div>
        </div>

        {lastLog ? (
          <PaperCard
            variant="notebook"
            className="current-reading-composition__last-log paper-card paper-card--notebook"
          >
            <div className="current-reading-composition__last-log-header">
              <p className="scrapbook-kicker">Last session</p>
              <strong>{formatDateKey(lastLog.date)}</strong>
            </div>

            <div className="current-reading-composition__last-log-stats">
              <span>
                <strong>{lastLog.pagesRead || 0}</strong>{" "}
                {isAudiobook ? "minutes listened" : "pages read"}
              </span>

              {!isAudiobook && lastLog.minutesRead ? (
                <span>
                  <strong>{lastLog.minutesRead}</strong> minutes
                </span>
              ) : null}
            </div>

            {lastLog.notes && (
              <blockquote className="current-reading-composition__last-log-note">
                “{lastLog.notes}”
              </blockquote>
            )}
          </PaperCard>
        ) : (
          <PaperCard
            variant="notebook"
            className="current-reading-composition__last-log current-reading-composition__last-log--empty paper-card paper-card--notebook"
          >
            <p className="scrapbook-kicker">A blank page</p>

            <strong>
              Your first reading memory is waiting.
            </strong>

            <span>
              Log your next {isAudiobook ? "listening" : "reading"} session
              to begin preserving your journey with this book.
            </span>
          </PaperCard>
        )}
      </section>

      <footer className="current-reading-composition__actions">
        <div className="current-reading-composition__primary-actions">
          <button
            type="button"
            className="paper-button current-reading-composition__log-action"
            onClick={handleLogReading}
          >
            <span aria-hidden="true">
              {isAudiobook ? "🎧" : "🔥"}
            </span>

            {isAudiobook ? "Log Listening" : "Log Reading"}
          </button>

          <button
            type="button"
            className="paper-button paper-button--quiet current-reading-composition__finish-action"
            onClick={() => finishBook(item)}
          >
            <span aria-hidden="true">✓</span>
            Finish Book
          </button>
        </div>

        <div
          className="current-reading-composition__supporting-actions"
          aria-label="More book actions"
        >
          <button
            type="button"
            className="current-reading-composition__text-action"
            onClick={() => openSavedReview(item)}
          >
            View details
          </button>

          <button
            type="button"
            className="current-reading-composition__text-action"
            onClick={() => editReview(item)}
          >
            Edit book
          </button>

          <button
            type="button"
            className="current-reading-composition__text-action current-reading-composition__text-action--danger"
            onClick={() => deleteReview(item.id)}
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  )
}

export default CurrentReadingComposition