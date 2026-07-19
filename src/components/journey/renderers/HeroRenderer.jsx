import MountedBook from "../../scrapbook/MountedBook/MountedBook"
import MuseumLabel from "../../scrapbook/MuseumLabel/MuseumLabel"
import Sticker from "../../scrapbook/Sticker/Sticker"

function HeroRenderer({
  review,
  journey,
  formatDate,
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

  const finishedDate =
    journey?.finishedAt ||
    bookInfo.dateFinished ||
    ""

  return (
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
  )
}

export default HeroRenderer