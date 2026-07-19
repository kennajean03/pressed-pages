import JourneySummary from "../../scrapbook/JourneySummary/JourneySummary"

function SummaryRenderer({
  review,
  journey,
  formatDate,
  getDaysToRead,
}) {
  if (!review || !journey?.hasJourney) {
    return null
  }

  const bookInfo =
    review.bookInfo || {}

  const startedDate =
    journey.startedAt ||
    bookInfo.dateStarted ||
    ""

  const finishedDate =
    journey.finishedAt ||
    bookInfo.dateFinished ||
    ""

  const daysRead =
    typeof getDaysToRead ===
    "function"
      ? getDaysToRead(review)
      : null

  const longestSession =
    journey.longestSession ||
    null

  const longestSessionCopy =
    longestSession
      ? [
          `${longestSession.pagesRead || 0} pages`,

          longestSession.date &&
          typeof formatDate ===
            "function"
            ? `on ${formatDate(
                longestSession.date
              )}`
            : "",
        ]
          .filter(Boolean)
          .join(" ")
      : ""

  return (
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
  )
}

export default SummaryRenderer