import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import "./PressedFlower.css"

const pressedFlowerTape =
  resolveScrapbookMaterialRole(
    "tape",
    "botanical",
    "tape-washi-sage-botanical-01"
  )

  const pressedFlowerSprig =
  resolveScrapbookMaterialRole(
    "botanicals",
    "movement",
    "leaf-fern-01"
  )

  const pressedFlowerDaisy =
  resolveScrapbookMaterialRole(
    "botanicals",
    "hero",
    "flower-daisy-white-01"
  )

  const pressedFlowerBlossom =
  resolveScrapbookMaterialRole(
    "botanicals",
    "filler",
    "flower-babys-breath-01"
  )

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
     {attachment === "tape" ? (
  <ScrapbookAsset
    asset={pressedFlowerTape}
    className={[
      "pressed-flower__attachment",
      "pressed-flower__attachment-asset--tape",
    ].join(" ")}
    placement={{
      width:
        "clamp(58px, 7vw, 72px)",
      x: "-50%",
      rotation: "-4deg",
      opacity: 0.94,
      shadow:
        "0 3px 5px rgba(60, 45, 38, 0.1)",
    }}
  />
) : attachment !== "none" ? (
  <span
    className={[
      "pressed-flower__attachment",
      `pressed-flower__attachment--${attachment}`,
    ].join(" ")}
    aria-hidden="true"
  />
) : null}

      <div className="pressed-flower__specimen">
  {resolvedVariant === "sprig" ? (
    <ScrapbookAsset
      asset={pressedFlowerSprig}
      className="pressed-flower__specimen-asset"
      placement={{
        width: "90%",
        rotation: "2deg",
        opacity: 0.94,
        shadow:
          "0 6px 7px rgba(61, 46, 32, 0.1)",
      }}
    />
  ) : resolvedVariant === "daisy" ? (
  <ScrapbookAsset
    asset={pressedFlowerDaisy}
    className="pressed-flower__specimen-asset"
    placement={{
      width: "100%",
      rotation: "-3deg",
      opacity: 0.96,
      shadow:
        "0 6px 7px rgba(61, 46, 32, 0.1)",
    }}
  />
) : resolvedVariant === "blossom" ? (
  <ScrapbookAsset
    asset={pressedFlowerBlossom}
    className="pressed-flower__specimen-asset"
    placement={{
      width: "100%",
      rotation: "2deg",
      opacity: 0.96,
      shadow:
        "0 6px 7px rgba(61, 46, 32, 0.1)",
    }}
  />
) : (
    <>
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
    </>
  )}
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