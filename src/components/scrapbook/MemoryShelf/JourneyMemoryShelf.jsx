import FavoriteQuote from "../FavoriteQuote/FavoriteQuote"
import PressedFlower from "../PressedFlower/PressedFlower"
import ScrapbookPhoto from "../ScrapbookPhoto/ScrapbookPhoto"

import composeJourneyArrangement from "../../../scrapbook/arrangements/composeJourneyArrangement"
import "./JourneyMemoryShelf.css"

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

function formatMemoryDate(
  memory = {},
  formatDateKey
) {
  if (!memory.date) {
    return ""
  }

  return typeof formatDateKey ===
    "function"
    ? formatDateKey(memory.date)
    : memory.date
}

function getKeepsakeStyle(
  keepsake = {}
) {
  const desktop =
    keepsake.position?.desktop || {}

  const mobile =
    keepsake.position?.mobile || {}

  return {
    "--keepsake-x-desktop":
      `${desktop.x ?? 0}%`,

    "--keepsake-y-desktop":
      `${desktop.y ?? 0}%`,

    "--keepsake-width-desktop":
      `${desktop.width ?? 25}%`,

    "--keepsake-x-mobile":
      `${mobile.x ?? desktop.x ?? 0}%`,

    "--keepsake-y-mobile":
      `${mobile.y ?? desktop.y ?? 0}%`,

    "--keepsake-width-mobile":
      `${mobile.width ?? desktop.width ?? 70}%`,

    "--keepsake-layer":
      keepsake.layer ?? 1,
  }
}

function getKeepsakeClassName(
  keepsake = {}
) {
  const {
    type,
    role,
    relationship,
    attachment,
    index = 0,
    preserveVisibility,
  } = keepsake

  return [
    "journey-memory-shelf__keepsake",

    type
      ? `journey-memory-shelf__keepsake--${type}`
      : "",

    role
      ? `journey-memory-shelf__keepsake--${role}`
      : "",

    relationship?.type
      ? `journey-memory-shelf__keepsake--${relationship.type}`
      : "",

    attachment &&
    attachment !== "none"
      ? `journey-memory-shelf__keepsake--attached-${attachment}`
      : "",

    preserveVisibility
      ? "journey-memory-shelf__keepsake--preserve-visibility"
      : "",

    /*
     * Temporary compatibility classes.
     *
     * Patch 3 will remove the old numbered
     * positioning system from the CSS and use
     * the composer variables instead.
     */
    type === "photo"
      ? "journey-memory-shelf__photo"
      : "",

    type === "photo"
      ? `journey-memory-shelf__photo--${
          (index % 4) + 1
        }`
      : "",

    type === "quote"
      ? "journey-memory-shelf__quote"
      : "",

    type === "quote"
      ? `journey-memory-shelf__quote--${
          (index % 3) + 1
        }`
      : "",

    type === "flower"
      ? "journey-memory-shelf__flower"
      : "",

    type === "flower"
      ? `journey-memory-shelf__flower--${
          (index % 4) + 1
        }`
      : "",
  ]
    .filter(Boolean)
    .join(" ")
}

function renderPhotoKeepsake({
  keepsake,
  formatDateKey,
}) {
  const memory =
    keepsake.memory || {}

  const photoIndex =
    keepsake.index || 0

  return (
    <ScrapbookPhoto
      src={getPhotoSource(memory)}
      alt={
        getPhotoCaption(memory) ||
        `Reading memory ${
          photoIndex + 1
        }`
      }
      caption={getPhotoCaption(memory)}
      date={formatMemoryDate(
        memory,
        formatDateKey
      )}
      rotation={keepsake.rotation}
      size={
        keepsake.role === "hero"
          ? "medium"
          : "small"
      }
    />
  )
}

function renderQuoteKeepsake({
  keepsake,
}) {
  const memory =
    keepsake.memory || {}

  return (
    <FavoriteQuote
      quote={getQuoteText(memory)}
      source={getQuoteSource(memory)}
      page={getQuotePage(memory)}
      rotation={keepsake.rotation}
      size="medium"
    />
  )
}

function renderFlowerKeepsake({
  keepsake,
  formatDateKey,
}) {
  const memory =
    keepsake.memory || {}

  return (
    <PressedFlower
      variant={getFlowerVariant(memory)}
      label={getFlowerLabel(memory)}
      date={formatMemoryDate(
        memory,
        formatDateKey
      )}
      attachment={
        keepsake.attachment ===
        "tape"
          ? "tape"
          : "none"
      }
      rotation={keepsake.rotation}
      size="small"
    />
  )
}

function renderKeepsake({
  keepsake,
  formatDateKey,
}) {
  if (
    keepsake.type === "photo"
  ) {
    return renderPhotoKeepsake({
      keepsake,
      formatDateKey,
    })
  }

  if (
    keepsake.type === "quote"
  ) {
    return renderQuoteKeepsake({
      keepsake,
    })
  }

  if (
    keepsake.type === "flower"
  ) {
    return renderFlowerKeepsake({
      keepsake,
      formatDateKey,
    })
  }

  return null
}

function JourneyMemoryShelf({
  journey,
  title = "Collected Along the Way",
  eyebrow = "The Memory Pocket",
  description =
    "The photographs, lines, and small pieces of this story you chose to keep.",
  formatDateKey,
  className = "",
}) {
  const photos =
    Array.isArray(journey?.photos)
      ? journey.photos.filter(
          (memory) =>
            Boolean(
              getPhotoSource(memory)
            )
        )
      : []

  const quotes =
    Array.isArray(journey?.quotes)
      ? journey.quotes.filter(
          (memory) =>
            Boolean(
              getQuoteText(memory)
            )
        )
      : []

  const flowers =
    Array.isArray(journey?.flowers)
      ? journey.flowers.filter(
          (memory) =>
            Boolean(
              getFlowerVariant(memory)
            )
        )
      : []

  const pocket =
  composeJourneyArrangement({
    photos,
    quotes,
    flowers,
  })

  if (pocket.counts.total === 0) {
    return null
  }

  const shelfClassName = [
    "journey-memory-shelf",

    pocket.hasPhotos
      ? "journey-memory-shelf--has-photos"
      : "",

    pocket.hasQuotes
      ? "journey-memory-shelf--has-quotes"
      : "",

    pocket.hasFlowers
      ? "journey-memory-shelf--has-flowers"
      : "",

    pocket.density
      ? `journey-memory-shelf--${pocket.density}`
      : "",

    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={shelfClassName}
      aria-labelledby="journey-memory-shelf-title"
      data-keepsake-density={
        pocket.density
      }
    >
      <span
        className="journey-memory-shelf__backing"
        aria-hidden="true"
      />

      <header className="journey-memory-shelf__heading">
        <p className="scrapbook-kicker">
          {eyebrow}
        </p>

        <h2 id="journey-memory-shelf-title">
          {title}
        </h2>

        <p className="journey-memory-shelf__description">
          {description}
        </p>

        <p className="journey-memory-shelf__count">
          <strong>
            {pocket.counts.total}
          </strong>{" "}
          {pocket.counts.total === 1
            ? "keepsake"
            : "keepsakes"}{" "}
          tucked inside
        </p>
      </header>

      <div className="journey-memory-shelf__display">
        <div
          className="journey-memory-shelf__paper"
          aria-hidden="true"
        />

        <div
          className="journey-memory-shelf__pocket"
          aria-hidden="true"
        >
          <span className="journey-memory-shelf__pocket-label">
            gathered while reading
          </span>
        </div>

        <div className="journey-memory-shelf__composition">
          {pocket.keepsakes.map(
            (keepsake) => {
              const content =
                renderKeepsake({
                  keepsake,
                  formatDateKey,
                })

              if (!content) {
                return null
              }

              return (
                <div
                  key={keepsake.id}
                  className={getKeepsakeClassName(
                    keepsake
                  )}
                  style={getKeepsakeStyle(
                    keepsake
                  )}
                  data-keepsake-id={
                    keepsake.id
                  }
                  data-keepsake-type={
                    keepsake.type
                  }
                  data-keepsake-role={
                    keepsake.role
                  }
                  data-keepsake-relationship={
                    keepsake.relationship
                      ?.type || undefined
                  }
                  data-keepsake-target={
                    keepsake.relationship
                      ?.targetId || undefined
                  }
                >
                  {content}
                </div>
              )
            }
          )}
        </div>
      </div>

      <footer className="journey-memory-shelf__footer">
        <span aria-hidden="true">
          ✦
        </span>

        <p>
          These pieces now belong to the
          permanent story of this book.
        </p>

        <span aria-hidden="true">
          ✦
        </span>
      </footer>
    </section>
  )
}

export default JourneyMemoryShelf