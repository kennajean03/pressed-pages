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

  const classes = [
    "pp-paper-card",
    `pp-paper-card--${variant}`,
    composition.classNames,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Component
      className={classes}
      style={{
        ...composition.style,
        ...style,
      }}
      {...props}
    >
      {tape && (
        <WashiTape
          variant={tapeVariant}
          className="pp-paper-card__tape"
        >
          {tape}
        </WashiTape>
      )}

      {children}

      {flower && (
        <BotanicalAccent
          variant={flower}
          className="pp-paper-card__flower"
        />
      )}
    </Component>
  )
}

export default PaperCard