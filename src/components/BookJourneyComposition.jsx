import MountedBook from "./scrapbook/MountedBook/MountedBook"
import MuseumLabel from "./scrapbook/MuseumLabel/MuseumLabel"
import JourneySummary from "./scrapbook/JourneySummary/JourneySummary"
import JournalPage from "./scrapbook/JournalPage/JournalPage"
import FavoriteQuote from "./scrapbook/FavoriteQuote/FavoriteQuote"
import PressedFlower from "./scrapbook/PressedFlower/PressedFlower"
import ScrapbookPhoto from "./scrapbook/ScrapbookPhoto/ScrapbookPhoto"
import Sticker from "./scrapbook/Sticker/Sticker"
import LibraryTabs from "./scrapbook/LibraryTabs/LibraryTabs"
import composeBookJourneyStory from "../scrapbook/journey/composeJourneyLayout"
import JourneyMemoryShelf from "./scrapbook/MemoryShelf/JourneyMemoryShelf"
import JourneyRenderer from "./journey/JourneyRenderer"

function getMemoryData(memory = {}) {
  return memory.data || {}
}

function getPhotoSource(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.url ||
    data.photoUrl ||
    data.src ||
    data.imageUrl ||
    ""
  )
}

function getPhotoCaption(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.caption ||
    data.photoCaption ||
    ""
  )
}

function getQuoteText(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.quote ||
    data.text ||
    data.value ||
    ""
  )
}

function getQuoteSource(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.source ||
    data.chapter ||
    ""
  )
}

function getQuotePage(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.page ||
    data.pageNumber ||
    ""
  )
}

function getFlowerVariant(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.variant ||
    data.flowerVariant ||
    ""
  )
}

function getFlowerLabel(memory = {}) {
  const data = getMemoryData(memory)

  return (
    data.label ||
    data.flowerLabel ||
    ""
  )
}

function BookJourneyComposition({
  review,
  journey,
  formatDate,
  formatDateKey,
  getDaysToRead,
  isOwner = false,
  SpoilerReviewSection,
  isReviewOwnedByCurrentUser,
  isSpoilerRevealed,
  toggleSpoilerReveal,
  setStep,
  editReview,
  deleteReview,
}) {
  if (!review) {
    return null
  }

  const bookInfo =
    review.bookInfo || {}

  const title =
    bookInfo.title ||
    "Untitled Book"

  const author =
    bookInfo.author ||
    "Unknown Author"

  const format =
    bookInfo.format ||
    "Book"

  const coverSrc =
    bookInfo.coverUrl ||
    ""

  const startedDate =
    journey?.startedAt ||
    bookInfo.dateStarted ||
    ""

  const finishedDate =
    journey?.finishedAt ||
    bookInfo.dateFinished ||
    ""

  const daysRead =
    typeof getDaysToRead === "function"
      ? getDaysToRead(review)
      : null

  const longestSession =
    journey?.longestSession || null

  const longestSessionCopy =
    longestSession
      ? [
          `${longestSession.pagesRead || 0} pages`,
          longestSession.date &&
          typeof formatDate === "function"
            ? `on ${formatDate(
                longestSession.date
              )}`
            : "",
        ]
          .filter(Boolean)
          .join(" ")
      : ""

  const sessions =
    journey?.sessions || []
    const journeyLayout =
  composeBookJourneyStory(
    journey || {}
  )

const journeyChapters =
  journeyLayout.chapters || []

  const reviewOwnedByCurrentUser =
    typeof isReviewOwnedByCurrentUser ===
    "function"
      ? isReviewOwnedByCurrentUser(
          review
        )
      : isOwner

  const supportingActions = [
    {
      id: "back-to-library",
      label: "Back to Library",
      onClick: () =>
        setStep("library"),
    },

    ...(isOwner
      ? [
          {
            id: "edit-review",
            label:
              "Edit Review / Dates",
            onClick: () =>
              editReview(review),
          },
          {
            id: "delete-review",
            label: "Delete Review",
            tone: "danger",
            onClick: () =>
              deleteReview(
                review.id
              ),
          },
        ]
      : []),
  ]

  return (
    <article className="book-journey-composition">
      <header className="book-journey-composition__story-header">
        <p className="scrapbook-kicker">
          Finished book
        </p>

        <span className="book-journey-composition__story-mark">
          The story of reading this book
        </span>
      </header>

      <section
        className="book-journey-composition__hero"
        aria-labelledby={`book-journey-title-${review.id}`}
      >
        <div className="book-journey-composition__cover">
          <MountedBook
            src={coverSrc}
            alt={`${title} cover`}
            scrapbookId={review.id}
            rotate="left"
            tape="linen"
            corners="photo"
            state="remembered"
          />
        </div>

        <div className="book-journey-composition__book-label">
          <MuseumLabel
            eyebrow="Preserved Story"
            title={title}
            author={author}
            titleId={`book-journey-title-${review.id}`}
            rotate="right"
            tape="linen"
            state="featured"
          >
            <div className="book-journey-composition__metadata">
              <Sticker
                icon="📖"
                tone="sage"
              >
                {format}
              </Sticker>

              {review.isFavorite && (
                <Sticker
                  icon="🧠"
                  tone="rose"
                >
                  Brain Chemistry
                </Sticker>
              )}

              {finishedDate && (
                <Sticker
                  icon="✦"
                  tone="gold"
                >
                  Finished{" "}
                  {typeof formatDate ===
                  "function"
                    ? formatDate(
                        finishedDate
                      )
                    : finishedDate}
                </Sticker>
              )}
            </div>
          </MuseumLabel>
        </div>
      </section>

      {journey?.hasJourney && (
        <section className="book-journey-composition__summary">
          <JourneySummary
            titleId={`book-journey-summary-${review.id}`}
            startedDate={
              startedDate &&
              typeof formatDate ===
                "function"
                ? formatDate(
                    startedDate
                  )
                : startedDate
            }
            finishedDate={
              finishedDate &&
              typeof formatDate ===
                "function"
                ? formatDate(
                    finishedDate
                  )
                : finishedDate
            }
            daysRead={daysRead}
            sessions={
              journey.totalSessions
            }
            pagesRead={
              journey.totalPagesRead
            }
            minutesRead={
              journey.totalMinutesRead
            }
            memoryCount={
              journey.counts
                ?.memories || 0
            }
            longestSession={
              longestSessionCopy
            }
            state="remembered"
            rotate="left"
          />
        </section>
      )}

      {journeyChapters.length > 0 && (
  <section className="book-journey-composition__chapters">
    {journeyChapters.map(
      (
        chapter,
        chapterIndex
      ) => (
        <section
          key={chapter.id}
          className={[
            "book-journey-composition__chapter",
            `book-journey-composition__chapter--${chapter.id}`,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <header className="book-journey-composition__chapter-heading">
            <p className="scrapbook-kicker">
              {chapter.eyebrow}
            </p>

            <h2>
              {chapter.title}
            </h2>

            <p>
              {chapter.copy}
            </p>

            <span className="book-journey-composition__chapter-count">
              {chapter.sessions.length}{" "}
              reading{" "}
              {chapter.sessions.length === 1
                ? "memory"
                : "memories"}
            </span>
          </header>

          <div className="book-journey-composition__journal-pages">
            {chapter.sessions.map(
              (
                session,
                sessionIndex
              ) => {
                const artifacts =
                  session.artifacts ||
                  []

                const photoMemory =
                  artifacts.find(
                    (artifact) =>
                      artifact?.type ===
                        "readingPhoto" ||
                      artifact?.type ===
                        "photo"
                  )

                const quoteMemory =
                  artifacts.find(
                    (artifact) =>
                      artifact?.type ===
                      "favoriteQuote"
                  )

                const flowerMemory =
                  artifacts.find(
                    (artifact) =>
                      artifact?.type ===
                      "flower"
                  )

                const photoSrc =
                  getPhotoSource(
                    photoMemory
                  )

                const quoteText =
                  getQuoteText(
                    quoteMemory
                  )

                const flowerVariant =
                  getFlowerVariant(
                    flowerMemory
                  )

                const stats = [
                  {
                    value:
                      session.pagesRead ||
                      0,
                    label:
                      "pages read",
                  },

                  ...(session.minutesRead
                    ? [
                        {
                          value:
                            session.minutesRead,
                          label:
                            "minutes",
                        },
                      ]
                    : []),
                ]

                const globalSessionIndex =
                  sessions.findIndex(
                    (journeySession) =>
                      journeySession.id ===
                      session.id
                  )

                const safeSessionIndex =
                  globalSessionIndex >= 0
                    ? globalSessionIndex
                    : sessionIndex

                return (
                  <JournalPage
                    key={session.id}
                    eyebrow={`Reading memory ${
                      safeSessionIndex + 1
                    }`}
                    title={
                      session.notes
                        ? "A moment with this story"
                        : "A reading session preserved"
                    }
                    titleId={`book-journey-session-${session.id}`}
                    date={
                      session.date &&
                      typeof formatDateKey ===
                        "function"
                        ? formatDateKey(
                            session.date
                          )
                        : session.date
                    }
                    stats={stats}
                    note={
                      session.notes
                    }
                    state="collected"
                    paper="notebook"
                    rotate={
                      (
                        safeSessionIndex +
                        chapterIndex
                      ) %
                        2 ===
                      0
                        ? "right"
                        : "left"
                    }
                  >
                    {photoSrc && (
                      <ScrapbookPhoto
                        src={photoSrc}
                        alt={`Reading memory from ${title}`}
                        caption={getPhotoCaption(
                          photoMemory
                        )}
                        date={
                          session.date &&
                          typeof formatDateKey ===
                            "function"
                            ? formatDateKey(
                                session.date
                              )
                            : ""
                        }
                        rotation={
                          safeSessionIndex %
                            2 ===
                          0
                            ? -2
                            : 2
                        }
                        size="small"
                      />
                    )}

                    {quoteText && (
                      <FavoriteQuote
                        quote={
                          quoteText
                        }
                        source={getQuoteSource(
                          quoteMemory
                        )}
                        page={getQuotePage(
                          quoteMemory
                        )}
                        rotation={1}
                        size="medium"
                      />
                    )}

                    {flowerVariant && (
                      <PressedFlower
                        variant={
                          flowerVariant
                        }
                        label={getFlowerLabel(
                          flowerMemory
                        )}
                        date={
                          session.date &&
                          typeof formatDateKey ===
                            "function"
                            ? formatDateKey(
                                session.date
                              )
                            : ""
                        }
                        attachment="tape"
                        rotation={-3}
                        size="small"
                      />
                    )}
                  </JournalPage>
                )
              }
            )}
          </div>
        </section>
      )
    )}
  </section>
)}

<JourneyMemoryShelf
  journey={journey}
  formatDateKey={formatDateKey}
/>

      <section className="book-journey-composition__review">
        <header className="book-journey-composition__chapter-heading">
          <p className="scrapbook-kicker">
            Final Chapter
          </p>

          <h2>The Book Review</h2>

          <p>
            What remained after the
            final page.
          </p>
        </header>

        <div className="book-journey-composition__score-grid">
          <div className="score-card">
            <p>On Paper Score</p>
            <h3>
              {review.bookScore} / 5
            </h3>
          </div>

          <div className="score-card">
            <p>Obsession Score</p>
            <h3>
              {review.obsessionScore}{" "}
              / 5
            </h3>
          </div>

          <div className="score-card">
            <p>Spice Rating</p>
            <h3>
              {review.metrics?.spice ||
                0}{" "}
              / 5
            </h3>
          </div>

          <div className="score-card">
            <p>Recommendation</p>
            <h3>
              {
                review.recommendationLevel
              }
            </h3>
          </div>
        </div>

        <div className="book-journey-composition__review-copy">
          <p>
            <strong>Tropes</strong>
            <br />

            {(review.tropes || [])
              .length > 0
              ? (
                  review.tropes ||
                  []
                ).join(" • ")
              : "None selected"}
          </p>

          <p>
            <strong>
              One-Sentence Review
            </strong>
            <br />

            {review.review
              ?.oneSentenceReview ||
              ""}
          </p>

          {SpoilerReviewSection && (
            <>
              <SpoilerReviewSection
                label="Favorite Thing"
                value={
                  review.review
                    ?.favoriteThing ||
                  ""
                }
                hasSpoiler={Boolean(
                  review.review
                    ?.favoriteThingHasSpoiler
                )}
                shouldHide={
                  Boolean(
                    review.review
                      ?.favoriteThingHasSpoiler
                  ) &&
                  !reviewOwnedByCurrentUser
                }
                isRevealed={
                  typeof isSpoilerRevealed ===
                  "function"
                    ? isSpoilerRevealed(
                        review.id,
                        "favoriteThing"
                      )
                    : false
                }
                onToggleReveal={() =>
                  toggleSpoilerReveal?.(
                    review.id,
                    "favoriteThing"
                  )
                }
              />

              <SpoilerReviewSection
                label="Biggest Complaint"
                value={
                  review.review
                    ?.biggestComplaint ||
                  ""
                }
                hasSpoiler={Boolean(
                  review.review
                    ?.biggestComplaintHasSpoiler
                )}
                shouldHide={
                  Boolean(
                    review.review
                      ?.biggestComplaintHasSpoiler
                  ) &&
                  !reviewOwnedByCurrentUser
                }
                isRevealed={
                  typeof isSpoilerRevealed ===
                  "function"
                    ? isSpoilerRevealed(
                        review.id,
                        "biggestComplaint"
                      )
                    : false
                }
                onToggleReveal={() =>
                  toggleSpoilerReveal?.(
                    review.id,
                    "biggestComplaint"
                  )
                }
              />
            </>
          )}

          <p>
            <strong>
              Vibe Check
            </strong>
            <br />

            {review.review
              ?.vibeCheck ||
              ""}
          </p>
        </div>

        {bookInfo.reviewGraphicUrl && (
          <div className="score-card">
            <p>Review Graphic</p>

            <img
              src={
                bookInfo.reviewGraphicUrl
              }
              alt="Review graphic"
              className="review-graphic"
            />
          </div>
        )}

        <div className="score-card">
          <p>Mini Review Copy</p>

          <pre>
            {review.miniReviewText}
          </pre>
        </div>
      </section>

      <footer className="book-journey-composition__actions">
        <LibraryTabs
          primaryLabel={
            isOwner
              ? "Generate Review Graphic"
              : "Back to Library"
          }
          primaryIcon={
            isOwner ? "🎨" : "←"
          }
          onPrimary={() =>
            isOwner
              ? setStep(
                  "reviewGraphic"
                )
              : setStep("library")
          }
          supportingActions={
            supportingActions
          }
          state="remembered"
          align="left"
          ariaLabel={`Actions for ${title}`}
        />
      </footer>
    </article>
  )
}

export default BookJourneyComposition