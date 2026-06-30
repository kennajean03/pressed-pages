import "./WashiTape.css"

function WashiTape({ children, className = "", variant = "sage", ...props }) {
  const classes = ["pp-washi-tape", `pp-washi-tape--${variant}`, className]
    .filter(Boolean)
    .join(" ")

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  )
}

export default WashiTape