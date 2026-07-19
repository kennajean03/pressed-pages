import JournalPage from "../../scrapbook/JournalPage/JournalPage"
import FavoriteQuote from "../../scrapbook/FavoriteQuote/FavoriteQuote"
import PressedFlower from "../../scrapbook/PressedFlower/PressedFlower"
import ScrapbookPhoto from "../../scrapbook/ScrapbookPhoto/ScrapbookPhoto"

function getMemoryData(memory = {}) {
  return memory.data || {}
}

function getPhotoSource(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.url ||
    data.photoUrl ||
    data.src ||
    data.imageUrl ||
    ""
  )
}

function getPhotoCaption(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.caption ||
    data.photoCaption ||
    ""
  )
}

function getQuoteText(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.quote ||
    data.text ||
    data.value ||
    ""
  )
}

function getQuoteSource(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.source ||
    data.chapter ||
    ""
  )
}

function getQuotePage(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.page ||
    data.pageNumber ||
    ""
  )
}

function getFlowerVariant(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.variant ||
    data.flowerVariant ||
    ""
  )
}

function getFlowerLabel(memory = {}) {
  const data =
    getMemoryData(memory)

  return (
    data.label ||
    data.flowerLabel ||
    ""
  )
}

function JournalPageRenderer({
  layoutObject,
  review,
  formatDateKey,
}) {
  const session =
    layoutObject?.session

  if (!session) {
    return null
  }

  const bookInfo =
    review?.bookInfo || {}

  const title =
    bookInfo.title ||
    "Untitled Book"

  const artifacts =
    session.artifacts || []

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
    Number.isFinite(
      layoutObject.globalSessionIndex
    )
      ? layoutObject.globalSessionIndex
      : layoutObject.sessionIndex || 0

  const chapterIndex =
    Number.isFinite(
      layoutObject.chapterIndex
    )
      ? layoutObject.chapterIndex
      : 0

  return (
    <JournalPage
      eyebrow={`Reading memory ${
        globalSessionIndex + 1
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
          globalSessionIndex +
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
            globalSessionIndex %
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

export default JournalPageRenderer