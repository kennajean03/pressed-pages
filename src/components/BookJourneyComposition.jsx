import LibraryTabs from "./scrapbook/LibraryTabs/LibraryTabs"
import composeBookJourneyStory from "../scrapbook/journey/composeJourneyLayout"
import JourneyMemoryShelf from "./scrapbook/MemoryShelf/JourneyMemoryShelf"
import JourneyRenderer from "./journey/JourneyRenderer"
import HeroRenderer from "./journey/renderers/HeroRenderer"
import SummaryRenderer from "./journey/renderers/SummaryRenderer"
import ChapterRenderer from "./journey/renderers/ChapterRenderer"
import JournalPageRenderer from "./journey/renderers/JournalPageRenderer"
import FavoriteQuotesRenderer from "./journey/renderers/FavoriteQuotesRenderer"
import KeepsakeCollectionRenderer from "./journey/renderers/KeepsakeCollectionRenderer"


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


  const finishedDate =
    journey?.finishedAt ||
    bookInfo.dateFinished ||
    ""

    const journeyLayout =
  composeBookJourneyStory(
    journey || {}
  )

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

      <JourneyRenderer
  layout={journeyLayout}
  renderHero={HeroRenderer}
  renderSummary={SummaryRenderer}
  renderChapter={ChapterRenderer}
  renderJournalPage={JournalPageRenderer}
  renderFavoriteQuotes={FavoriteQuotesRenderer}
  renderKeepsakeCollection={KeepsakeCollectionRenderer}
  sharedProps={{
    review,
    journey,
    formatDate,
    getDaysToRead,
  }}
/>

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