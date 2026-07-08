import "./StatCard.css"

function StatCard({
  icon,
  value,
  label,
  helper,
  className = "",
}) {
  return (
    <div className={["pp-stat-card", className].filter(Boolean).join(" ")}>
      {icon && <span className="pp-stat-card__icon" aria-hidden="true">{icon}</span>}
      <strong className="pp-stat-card__value">{value}</strong>
      <small className="pp-stat-card__label">{label}</small>
      {helper && <p className="pp-stat-card__helper">{helper}</p>}
    </div>
  )
}

export default StatCard