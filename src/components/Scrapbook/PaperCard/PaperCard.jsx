import BotanicalAccent from "../BotanicalAccent/BotanicalAccent"
import WashiTape from "../WashiTape/WashiTape"

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

  const classes = [
    "pp-paper-card",
    `pp-paper-card--${variant}`,
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
      <div className="pp-paper-card__paper-layer" aria-hidden="true" />
      <div className="pp-paper-card__surface" aria-hidden="true" />

      {tape && (
        <div className="pp-paper-card__above-paper-layer">
          <WashiTape
            variant={tapeVariant}
            className="pp-paper-card__tape"
          >
            {tape}
          </WashiTape>
        </div>
      )}

      <div className="pp-paper-card__content-layer">
        <div className="pp-paper-card__content">
          {children}
        </div>
      </div>

      {flower && (
        <div className="pp-paper-card__foreground-layer" aria-hidden="true">
          <BotanicalAccent
            variant={flower}
            className="pp-paper-card__flower"
          />
        </div>
      )}
    </Component>
  )
}

export default PaperCard