import { getScrapbookAsset } from "../../../scrapbook/materials/assetRegistry"
import { ScrapbookAsset } from "../../../scrapbook/components/ScrapbookAsset"

import { usePaperComposition } from "../../../scrapbook/hooks"

import "./PaperCard.css"

function PaperCard({
  as: Component = "div",
  variant = "default",
  objectType = "paper",
  className = "",

  scrapbookId,

  tape,
  tapeVariant = "sage",

  flower,

  children,
  style,
  scrapbookComposition,

  ...props
}) {
  const composition = usePaperComposition({
    variant,
    objectType,
    lift: variant === "featured" ? "medium" : undefined,
    scrapbookId,
  })

  const personalityId = composition?.composition?.personalityId
  const layerCount = composition?.composition?.summary?.layerCount ?? 0
  const visualWeights = composition?.composition?.summary?.visualWeights ?? {}

  const hasBackgroundLayer = Boolean(composition?.layers?.background?.length)
  const hasAbovePaperLayer = Boolean(composition?.layers?.abovePaper?.length)
  const hasForegroundLayer = Boolean(composition?.layers?.foreground?.length)

  const hasHeavyLayer = Boolean(visualWeights.heavy)
  const hasMediumLayer = Boolean(visualWeights.medium)

  const materialComposition = scrapbookComposition?.composition

const tapeAsset = getScrapbookAsset(
  materialComposition?.materials?.tape
)

const flowerAsset = getScrapbookAsset(
  materialComposition?.materials?.botanical
)

  const classes = [
    "pp-paper-card",
    `pp-paper-card--${variant}`,
    scrapbookComposition?.composition?.feeling &&
  `pp-paper-card--feeling-${scrapbookComposition.composition.feeling}`,

scrapbookComposition?.composition?.paper?.variant &&
  `pp-paper-card--paper-${scrapbookComposition.composition.paper.variant}`,
    personalityId && `pp-paper-card--${personalityId}`,
    hasBackgroundLayer && "pp-paper-card--has-background-layer",
    hasAbovePaperLayer && "pp-paper-card--has-above-paper-layer",
    hasForegroundLayer && "pp-paper-card--has-foreground-layer",
    hasHeavyLayer && "pp-paper-card--has-heavy-layer",
    hasMediumLayer && "pp-paper-card--has-medium-layer",
    layerCount > 2 && "pp-paper-card--layered",
    composition.classNames,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Component
      className={classes}
      data-paper={
  scrapbookComposition?.composition?.paper?.variant
}

data-feeling={
  scrapbookComposition?.composition?.feeling
}
      data-scrapbook-personality={personalityId}
      data-scrapbook-layer-count={layerCount}
      data-scrapbook-has-background-layer={hasBackgroundLayer ? "true" : "false"}
      data-scrapbook-has-above-paper-layer={hasAbovePaperLayer ? "true" : "false"}
      data-scrapbook-has-foreground-layer={hasForegroundLayer ? "true" : "false"}
      style={{
        ...composition.style,
        ...style,
      }}
      {...props}
    >
      <div className="pp-paper-card__background-layer" aria-hidden="true" />
      <div
  className="pp-paper-card__paper-layer"
  aria-hidden="true"
  style={
    composition?.paper?.asset
      ? {
          backgroundImage: `url(${composition.paper.asset})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : undefined
  }
/>
      <div className="pp-paper-card__surface" aria-hidden="true" />

{tapeAsset && (
  <div className="pp-paper-card__above-paper-layer">
    <ScrapbookAsset
      asset={tapeAsset}
      placement={{
        rotation: "-2deg",
        scale: 1,
        opacity: 1,
      }}
    />
  </div>
)}

      <div className="pp-paper-card__content-layer">
        <div className="pp-paper-card__content">
          {children}
        </div>
      </div>

      {flowerAsset && (
  <div className="pp-paper-card__foreground-layer" aria-hidden="true">
    <ScrapbookAsset
      asset={flowerAsset}
      placement={{
        rotation: "-8deg",
        scale: 1,
        opacity: 1,
        shadow: "none",
      }}
    />
  </div>
)}
    </Component>
  )
}

export default PaperCard