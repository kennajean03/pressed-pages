import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import "./ReflectionLetter.css"

const reflectionLetterTape =
  resolveScrapbookMaterialRole(
    "tape",
    "romantic",
    "tape-washi-dusty-rose-01"
  )


const VALID_STATES = [
  "quiet",
  "remembered",
  "cherished",
]

const VALID_ROTATIONS = [
  "left",
  "right",
  "straight",
  "none",
]

function ReflectionLetter({
  eyebrow = "Reflection Letter",
  title = "Looking Back",
  subtitle =
    "What this reading journey became",
  reflection = "",
  favoriteThing = "",
  favoriteThingLabel =
    "What stayed with me",
  vibeCheck = "",
  closing = "",
  state = "cherished",
  rotate = "right",
  className = "",
  titleId,
}) {
  const resolvedState =
    VALID_STATES.includes(state)
      ? state
      : "cherished"

  const resolvedRotation =
    VALID_ROTATIONS.includes(
      rotate
    )
      ? rotate
      : "right"

  const hasContent =
    Boolean(reflection) ||
    Boolean(favoriteThing) ||
    Boolean(vibeCheck) ||
    Boolean(closing)

  if (!hasContent) {
    return null
  }

  const reflectionLetterClasses = [
    "pp-reflection-letter",
    `pp-reflection-letter--state-${resolvedState}`,
    `pp-reflection-letter--rotate-${resolvedRotation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={
        reflectionLetterClasses
      }
      aria-labelledby={titleId}
      data-reflection-letter-state={
        resolvedState
      }
    >
      <ScrapbookAsset
  asset={reflectionLetterTape}
  className="pp-reflection-letter__tape"
  placement={{
    width:
      "clamp(120px, 19vw, 150px)",
    rotation: "-2.4deg",
    opacity: 0.96,
    shadow:
      "0 3px 7px rgba(60, 45, 38, 0.12)",
  }}
/>

      <span
        className="pp-reflection-letter__fold"
        aria-hidden="true"
      />

      <header className="pp-reflection-letter__heading">
        {eyebrow && (
          <p className="pp-reflection-letter__eyebrow">
            {eyebrow}
          </p>
        )}

        <h3
          id={titleId}
          className="pp-reflection-letter__title"
        >
          {title}
        </h3>

        {subtitle && (
          <p className="pp-reflection-letter__subtitle">
            {subtitle}
          </p>
        )}
      </header>

      <div className="pp-reflection-letter__body">
        {reflection && (
          <blockquote className="pp-reflection-letter__reflection">
            {reflection}
          </blockquote>
        )}

        {favoriteThing && (
          <div className="pp-reflection-letter__kept">
            <p className="pp-reflection-letter__kept-label">
              {favoriteThingLabel}
            </p>

            <p className="pp-reflection-letter__kept-copy">
              {favoriteThing}
            </p>
          </div>
        )}

        {vibeCheck && (
          <div className="pp-reflection-letter__vibe">
            <span>
              How this story felt
            </span>

            <strong>
              {vibeCheck}
            </strong>
          </div>
        )}

        {closing && (
          <p className="pp-reflection-letter__closing">
            {closing}
          </p>
        )}
      </div>

      <footer className="pp-reflection-letter__footer">
        <span aria-hidden="true">
          ✦
        </span>

        <span>
          Preserved after the final page
        </span>

        <span aria-hidden="true">
          ✦
        </span>
      </footer>

      <span
        className="pp-reflection-letter__seal"
        aria-hidden="true"
      >
        ✦
      </span>
    </section>
  )
}

export default ReflectionLetter