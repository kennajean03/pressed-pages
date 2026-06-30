import "./Sticker.css"

function Sticker({
  children,
  icon,
  tone = "cream",
  size = "default",
  className = "",
}) {
  return (
    <span
      className={[
        "pp-sticker",
        `pp-sticker--${tone}`,
        `pp-sticker--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}

export default Sticker