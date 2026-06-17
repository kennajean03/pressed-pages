export default function ReadingHeatMap({
  heatMapStats,
  compact = false,
  formatDateKey,
}) {
  return (
    <div className={`reading-heatmap ${compact ? "reading-heatmap-compact" : ""}`}>
      <div className="reading-heatmap-summary">
        <div>
          <strong>{heatMapStats.readingDayCount}</strong>
          <span> reading days</span>
        </div>
        <div>
          <strong>{heatMapStats.consistencyPercent}%</strong>
          <span> consistency</span>
        </div>

        {!compact && (
          <>
            <div>
              <strong>{heatMapStats.totalSessions}</strong>
              <span> logs</span>
            </div>
            <div>
              <strong>{heatMapStats.totalPages}</strong>
              <span> pages</span>
            </div>
          </>
        )}
      </div>

      <div className="reading-heatmap-scroll">
        <div className="reading-heatmap-grid">
          {heatMapStats.days.map((day, index) =>
            day ? (
              <div
                key={day.date}
                className={`reading-heatmap-day ${
                  day.sessions > 0 ? "is-reading-day" : ""
                }`}
                title={`${formatDateKey(day.date)} • ${day.sessions} log${
                  day.sessions === 1 ? "" : "s"
                } • ${day.pages} pages`}
                aria-label={`${formatDateKey(day.date)}: ${
                  day.sessions
                } reading log${day.sessions === 1 ? "" : "s"}`}
              />
            ) : (
              <div
                key={`blank-${index}`}
                className="reading-heatmap-day is-blank"
              />
            )
          )}
        </div>
      </div>

      <div className="reading-heatmap-legend">
        <span>Less</span>
        <span className="reading-heatmap-day" />
        <span className="reading-heatmap-day is-reading-day" />
        <span>More</span>
      </div>
    </div>
  )
}