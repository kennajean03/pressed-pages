import FinalPage from "../../scrapbook/FinalPage/FinalPage"
import "./EndingRenderer.css"

function EndingRenderer({
  layoutObject,
  review,
  journey,
  formatDate,
}) {
  const storyChapter =
    layoutObject
      ?.storyChapter || {}

  const chapterData =
    storyChapter.data || {}

  const resolvedReview =
    review ||
    journey?.review ||
    {}

  const bookInfo =
    resolvedReview.bookInfo ||
    journey?.bookInfo ||
    {}

  const bookTitle =
    bookInfo.title ||
    resolvedReview.title ||
    "This Story"

  const rawFinishedDate =
    chapterData.finishedAt ||
    journey?.finishedAt ||
    bookInfo.dateFinished ||
    ""

  const finishedDate =
    rawFinishedDate &&
    typeof formatDate ===
      "function"
      ? formatDate(
          rawFinishedDate
        )
      : rawFinishedDate

  const reviewStatus =
  bookInfo.status ||
  resolvedReview.status ||
  journey?.status ||
  ""

const isFinished =
  reviewStatus === "Finished" ||
  Boolean(
    rawFinishedDate
  )

  const title =
    storyChapter.title ||
    (
      isFinished
        ? "The Final Page"
        : "To Be Continued"
    )

  const subtitle =
    storyChapter.subtitle ||
    (
      isFinished
        ? "This journey has been preserved"
        : "This story is still unfolding"
    )

  const closing =
    isFinished
      ? "The book may be finished, but the story of reading it remains."
      : "This reading journey is still unfolding, and its final page has not been written yet."

  return (
    <section className="book-journey-composition__ending">
      <FinalPage
        titleId={`book-journey-ending-${
          resolvedReview.id ||
          "page"
        }`}
        eyebrow={
          isFinished
            ? "Final Page"
            : "Reading Journey"
        }
        title={title}
        subtitle={
          subtitle
        }
        bookTitle={
          bookTitle
        }
        finishedDate={
          finishedDate
        }
        closing={
          closing
        }
        state={
          isFinished
            ? "finished"
            : "continuing"
        }
        rotate="left"
      />
    </section>
  )
}

export default EndingRenderer