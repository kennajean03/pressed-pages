import BotanicalAccent from "../BotanicalAccent/BotanicalAccent"
import WashiTape from "../WashiTape/WashiTape"

import "./PaperCard.css"

function PaperCard({
  as: Component = "div",
  variant = "default",
  className = "",

  tape,
  tapeVariant = "sage",

  flower,

  children,

  ...props
}) {
  const classes = [
    "pp-paper-card",
    `pp-paper-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Component className={classes} {...props}>

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