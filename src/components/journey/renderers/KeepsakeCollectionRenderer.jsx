import composeKeepsakeCollection from "../../../scrapbook/assemblies/composeKeepsakeCollection"

import renderKeepsake from "./keepsakes/renderKeepsake.jsx"

import "./KeepsakeCollectionRenderer.css"
import "../../scrapbook/MemoryShelf/JourneyMemoryShelf.css"

function KeepsakeCollectionRenderer({
  layoutObject,
}) {
  const keepsakes =
    Array.isArray(
      layoutObject?.keepsakes
    )
      ? layoutObject.keepsakes
      : []

const collection =
  composeKeepsakeCollection(
    keepsakes
  )

const preservedMemoryCount =
  keepsakes.reduce(
    (
      total,
      keepsake
    ) => {
      const itemCount =
        Array.isArray(
          keepsake?.items
        )
          ? keepsake.items.length
          : 0

      return (
        total +
        itemCount
      )
    },
    0
  )

  if (!collection.count) {
    return null
  }

 return (
  <section
    className={[
      "journey-memory-shelf",
      `journey-memory-shelf--${collection.density}`,
      "pp-book-journey__keepsakes",
      `pp-book-journey__keepsakes--${collection.pattern}`,
      `pp-book-journey__keepsakes--density-${collection.density}`,
    ].join(" ")}
    aria-labelledby="journey-keepsake-pocket-title"
    data-keepsake-pattern={
      collection.pattern
    }
    data-keepsake-density={
      collection.density
    }
    data-keepsake-count={
      preservedMemoryCount
    }
  >
    <span
      className="journey-memory-shelf__backing"
      aria-hidden="true"
    />

    <header className="journey-memory-shelf__heading">
      <p className="scrapbook-kicker">
        Keepsake Pocket
      </p>

      <h2 id="journey-keepsake-pocket-title">
        {layoutObject.title ||
          "What You Chose To Keep"}
      </h2>

      {layoutObject.subtitle && (
        <p className="journey-memory-shelf__description">
          {layoutObject.subtitle}
        </p>
      )}

      <p className="journey-memory-shelf__count">
        <strong>
          {preservedMemoryCount}
        </strong>{" "}
        {preservedMemoryCount === 1
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

      <div
        className={[
          "journey-memory-shelf__composition",
          "pp-book-journey__keepsake-contents",
          `pp-book-journey__keepsake-contents--${collection.pattern}`,
        ].join(" ")}
      >
        {collection.placements.map(
          ({
            id,
            keepsake,
            type,
            role,
            zone,
            layer,
          }) => {
            const renderedKeepsake =
              renderKeepsake({
                ...keepsake,
                id,
              })

            if (!renderedKeepsake) {
              return null
            }

            return (
              <div
                key={id}
                className={[
                  "pp-book-journey__keepsake-placement",
                  `pp-book-journey__keepsake-placement--${type}`,
                  `pp-book-journey__keepsake-placement--role-${role}`,
                  `pp-book-journey__keepsake-placement--zone-${zone}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-keepsake-type={
                  type
                }
                data-keepsake-role={
                  role
                }
                data-keepsake-zone={
                  zone
                }
                style={{
                  "--keepsake-collection-layer":
                    layer,
                }}
              >
                {renderedKeepsake}
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

export default KeepsakeCollectionRenderer