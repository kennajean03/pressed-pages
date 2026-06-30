import "./SectionDivider.css"

function SectionDivider({ label, icon = "✿", className = "" }) {
  return (
    <div className={["pp-section-divider", className].filter(Boolean).join(" ")}>
      <span />
      <strong>
        {icon && <em aria-hidden="true">{icon}</em>}
        {label}
      </strong>
      <span />
    </div>
  )
}

export default SectionDivider