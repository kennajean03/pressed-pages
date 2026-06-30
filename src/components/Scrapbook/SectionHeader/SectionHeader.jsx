import WashiTape from "../WashiTape/WashiTape"
import "./SectionHeader.css"

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tapeVariant = "sage",
  className = "",
}) {
  return (
    <div className={["pp-section-header", className].filter(Boolean).join(" ")}>
      {eyebrow && <WashiTape variant={tapeVariant}>{eyebrow}</WashiTape>}
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export default SectionHeader