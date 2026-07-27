export default function ProgressBar({
  percent = 0,
  label = "Reading progress",
}) {
  const numericPercent = Number(percent)
  const safePercent = Number.isFinite(numericPercent)
    ? Math.min(100, Math.max(0, numericPercent))
    : 0

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={safePercent}
    >
      <div
        className="progress-fill"
        style={{ width: `${safePercent}%` }}
        aria-hidden="true"
      />
      <span>{safePercent}%</span>
    </div>
  )
}
