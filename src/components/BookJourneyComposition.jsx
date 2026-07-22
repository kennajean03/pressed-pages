import composeBookJourneyStory from "../scrapbook/journey/composeJourneyLayout"
import JourneyRenderer from "./journey/JourneyRenderer"
import HeroRenderer from "./journey/renderers/HeroRenderer"
import SummaryRenderer from "./journey/renderers/SummaryRenderer"
import ChapterRenderer from "./journey/renderers/ChapterRenderer"
import JournalPageRenderer from "./journey/renderers/JournalPageRenderer"
import KeepsakeCollectionRenderer from "./journey/renderers/KeepsakeCollectionRenderer"
import ReflectionRenderer from "./journey/renderers/ReflectionRenderer"
import ReviewRenderer from "./journey/renderers/ReviewRenderer"
import EndingRenderer from "./journey/renderers/EndingRenderer"
import ActionsRenderer from "./journey/renderers/ActionsRenderer"

function BookJourneyComposition({
  review,
  journey,
  formatDate,
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
  renderKeepsakeCollection={KeepsakeCollectionRenderer}
  renderReflection={ReflectionRenderer}
  renderReview={ReviewRenderer}
  renderEnding={EndingRenderer}
  renderActions={ActionsRenderer}
  sharedProps={{
    review,
    journey,
    formatDate,
    getDaysToRead,
    reviewOwnedByCurrentUser,
    isSpoilerRevealed,
    SpoilerReviewSection,
    toggleSpoilerReveal,
    isOwner,
    setStep,
    supportingActions,
  }}
/>

     
    </article>
  )
}

export default BookJourneyComposition