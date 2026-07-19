import renderKeepsake from "./keepsakes/renderKeepsake.jsx"

function KeepsakeCollectionRenderer({
  layoutObject,
}) {
  const keepsakes =
    Array.isArray(
      layoutObject?.keepsakes
    )
      ? layoutObject.keepsakes
      : []

  if (!keepsakes.length) {
    return null
  }

  return (
    <section className="pp-book-journey__keepsakes">
      <header className="pp-book-journey__keepsakes-header">
        <p className="pp-book-journey__eyebrow">
          Keepsake Pocket
        </p>

        <h2>
          {layoutObject.title ||
            "What You Chose To Keep"}
        </h2>

        {layoutObject.subtitle && (
          <p>
            {layoutObject.subtitle}
          </p>
        )}
      </header>

      <div className="pp-book-journey__keepsake-pocket">
        <div className="pp-book-journey__keepsake-contents">
          {keepsakes.map(
            (
              keepsake,
              keepsakeIndex
            ) =>
              renderKeepsake({
                ...keepsake,

                id:
                  keepsake.id ||
                  `${keepsake.type || "keepsake"}-${keepsakeIndex}`,
              })
          )}
        </div>

        <div
          className="pp-book-journey__keepsake-pocket-front"
          aria-hidden="true"
        >
          <span>
            Preserved during this
            reading journey
          </span>
        </div>
      </div>
    </section>
  )
}

export default KeepsakeCollectionRenderer