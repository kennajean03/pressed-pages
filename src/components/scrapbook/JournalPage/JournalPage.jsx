import {
  Children,
  isValidElement,
} from "react"
import "./JournalPage.css"

const ARTIFACT_TYPE_ALIASES = {
  FavoriteQuote: "favorite-quote",
  ScrapbookPhoto: "photo",
  PressedFlower: "flower",
}

function getArtifactType(child) {
  if (!isValidElement(child)) {
    return ""
  }

  const explicitArtifactType =
    child.props?.["data-scrapbook-artifact"] ||
    child.props?.artifactType ||
    child.type?.artifactType

  if (explicitArtifactType) {
    return explicitArtifactType
  }

  const componentName =
    child.type?.displayName ||
    child.type?.name ||
    ""

  return ARTIFACT_TYPE_ALIASES[componentName] || ""
}

function getCompositionRecipe(artifactTypes) {
  const artifactCount = artifactTypes.length
  const photoCount = artifactTypes.filter(
    (type) => type === "photo"
  ).length
    const quoteCount = artifactTypes.filter(
    (type) =>
      type === "favorite-quote" ||
      type === "quote"
  ).length

  const flowerCount = artifactTypes.filter(
    (type) => type === "flower"
  ).length

  if (artifactCount === 0) {
    return "empty"
  }

  if (artifactCount === 1) {
    if (photoCount === 1) {
      return "single-photo"
    }

    if (quoteCount === 1) {
      return "single-quote"
    }

    if (flowerCount === 1) {
      return "single-flower"
    }

    return "single-artifact"
  }

    if (
    artifactCount === 2 &&
    photoCount === 1 &&
    quoteCount === 1
  ) {
    return "photo-quote"
  }

  if (
    artifactCount === 2 &&
    flowerCount === 1 &&
    quoteCount === 1
  ) {
    return "flower-quote"
  }

  if (
    artifactCount === 2 &&
    flowerCount === 1 &&
    photoCount === 1
  ) {
    return "flower-photo"
  }

  if (
    artifactCount === 2 &&
    photoCount === 2
  ) {
    return "photo-pair"
  }

  if (
    artifactCount === 2 &&
    quoteCount === 2
  ) {
    return "quote-pair"
  }

  if (
    artifactCount === 2 &&
    flowerCount === 2
  ) {
    return "flower-pair"
  }
  if (
    photoCount > 0 &&
    quoteCount > 0 &&
    flowerCount > 0
  ) {
    return "photo-quote-flower"
  }

    if (
    (photoCount > 0 && quoteCount > 0) ||
    (photoCount > 0 && flowerCount > 0) ||
    (quoteCount > 0 && flowerCount > 0)
  ) {
    return "mixed-keepsakes"
  }

  if (photoCount === artifactCount) {
    return "photo-collection"
  }

    if (quoteCount === artifactCount) {
    return "quote-collection"
  }

  if (flowerCount === artifactCount) {
    return "flower-collection"
  }

  return "keepsake-collection"
}

function JournalPage({
  eyebrow = "Reading memory",
  title = "Your last session",
  date,
  stats = [],
  note,
  emptyTitle = "Your first reading memory is waiting.",
  emptyCopy,
  state = "writing",
  paper = "notebook",
  rotate = "right",
  children,
  className = "",
  titleId,
}) {
  const artifactChildren =
    Children.toArray(children).filter(Boolean)

  const artifactTypes =
    artifactChildren
      .map(getArtifactType)
      .filter(Boolean)

  const artifactCount =
    artifactChildren.length

  const compositionRecipe =
    getCompositionRecipe(artifactTypes)

  const hasMemory =
    Boolean(date) ||
    stats.length > 0 ||
    Boolean(note) ||
    artifactCount > 0

  const resolvedState =
    hasMemory ? state : "blank"

  const journalPageClassName = [
    "pp-journal-page",
    `pp-journal-page--state-${resolvedState}`,
    `pp-journal-page--paper-${paper}`,
    `pp-journal-page--rotate-${rotate}`,
    artifactCount > 0
      ? "pp-journal-page--has-artifacts"
      : "",
    artifactCount > 1
      ? "pp-journal-page--artifact-collection"
      : "",
    `pp-journal-page--composition-${compositionRecipe}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={journalPageClassName}
      data-journal-page-state={resolvedState}
      data-journal-page-paper={paper}
      data-journal-composition={compositionRecipe}
      data-journal-artifact-count={artifactCount}
      data-journal-artifact-types={
        artifactTypes.join(" ")
      }
      aria-labelledby={titleId}
    >
      <span
        className="pp-journal-page__tape"
        aria-hidden="true"
      />

      <span
        className="pp-journal-page__margin-line"
        aria-hidden="true"
      />

      <header className="pp-journal-page__heading">
        <div>
          {eyebrow && (
            <p className="pp-journal-page__eyebrow">
              {eyebrow}
            </p>
          )}

          <h3
            id={titleId}
            className="pp-journal-page__title"
          >
            {title}
          </h3>
        </div>
      </header>

      {hasMemory ? (
        <div className="pp-journal-page__memory">
          <div className="pp-journal-page__session-header">
            <p className="pp-journal-page__session-label">
              Last session
            </p>

            {date && (
              <strong className="pp-journal-page__date">
                {date}
              </strong>
            )}
          </div>

          {stats.length > 0 && (
            <div className="pp-journal-page__stats">
              {stats.map((stat, index) => (
                <span
                  key={`${stat.label}-${index}`}
                  className="pp-journal-page__stat"
                >
                  <strong>{stat.value}</strong>{" "}
                  {stat.label}
                </span>
              ))}
            </div>
          )}

          {note && (
            <blockquote className="pp-journal-page__note">
              “{note}”
            </blockquote>
          )}

          {artifactCount > 0 && (
            <div
              className="pp-journal-page__artifacts"
              data-composition-recipe={
                compositionRecipe
              }
              data-artifact-count={
                artifactCount
              }
            >
              {artifactChildren}
            </div>
          )}
        </div>
      ) : (
        <div className="pp-journal-page__empty">
          <p className="pp-journal-page__empty-kicker">
            A blank page
          </p>

          <strong>{emptyTitle}</strong>

          {emptyCopy && (
            <span>{emptyCopy}</span>
          )}
        </div>
      )}

      <span
        className="pp-journal-page__fold"
        aria-hidden="true"
      />
    </section>
  )
}

export default JournalPage