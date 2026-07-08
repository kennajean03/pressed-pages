import "./BotanicalAccent.css"

const flowerSymbols = {
  blossom: "❀",
  daisy: "✿",
  sprig: "🌿",
  rose: "❁",
}

function BotanicalAccent({
  variant = "blossom",
  className = "",
  decorative = true,
  ...props
}) {
  const classes = ["pp-botanical-accent", `pp-botanical-accent--${variant}`, className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} aria-hidden={decorative ? "true" : undefined} {...props}>
      {flowerSymbols[variant] || flowerSymbols.blossom}
    </span>
  )
}

export default BotanicalAccent