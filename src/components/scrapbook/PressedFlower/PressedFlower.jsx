import "./PressedFlower.css"

const VALID_SIZES = [
  "small",
  "medium",
  "large",
  "hero",
]

const VALID_VARIANTS = [
  "blossom",
  "daisy",
  "rose",
  "sprig",
]

const FLOWER_SYMBOLS = {
  blossom: "❀",
  daisy: "✿",
  rose: "❁",
  sprig: "🌿",
}

function PressedFlower({
  variant = "blossom",
  label = "",
  date = "",
  attachment = "tape",
  rotation = 0,
  size = "medium",
  className = "",
}) {
  const resolvedVariant =
    VALID_VARIANTS.includes(variant)
      ? variant
      : "blossom"

  const resolvedSize =
    VALID_SIZES.includes(size)
      ? size
      : "medium"

  const resolvedRotation =
    Number.isFinite(Number(rotation))
      ? Number(rotation)
      : 0

  const hasDetails =
    Boolean(label || date)

  const pressedFlowerClasses = [
    "pressed-flower",
    `pressed-flower--${resolvedVariant}`,
    `pressed-flower--${resolvedSize}`,
    attachment !== "none"
      ? `pressed-flower--attachment-${attachment}`
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <figure
      className={pressedFlowerClasses}
      style={{
        "--pressed-flower-rotation":
          `${resolvedRotation}deg`,
      }}
      data-scrapbook-artifact="flower"
      data-pressed-flower-variant={
        resolvedVariant
      }
      data-pressed-flower-attachment={
        attachment
      }
    >
      {attachment !== "none" && (
        <span
          className={[
            "pressed-flower__attachment",
            `pressed-flower__attachment--${attachment}`,
          ].join(" ")}
          aria-hidden="true"
        />
      )}

      <div className="pressed-flower__specimen">
        <span
          className="pressed-flower__stem"
          aria-hidden="true"
        />

        <span
          className="pressed-flower__bloom"
          aria-hidden="true"
        >
          {
            FLOWER_SYMBOLS[
              resolvedVariant
            ]
          }
        </span>

        <span
          className="pressed-flower__leaf pressed-flower__leaf--left"
          aria-hidden="true"
        />

        <span
          className="pressed-flower__leaf pressed-flower__leaf--right"
          aria-hidden="true"
        />
      </div>

      {hasDetails && (
        <figcaption className="pressed-flower__details">
          {label && (
            <span className="pressed-flower__label">
              {label}
            </span>
          )}

          {date && (
            <time className="pressed-flower__date">
              {date}
            </time>
          )}
        </figcaption>
      )}
    </figure>
  )
}

PressedFlower.artifactType = "flower"
PressedFlower.displayName = "PressedFlower"

export default PressedFlower