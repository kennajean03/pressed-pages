import { useState } from "react"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import {
  getCalendarWeekDays,
  getLoggedCalendarDays,
} from "../domain/reading/calendarViews"
import "./ReadingCalendarPanel.css"

const VIEW_OPTIONS = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "list", label: "List" },
]

function ReadingCalendarPanel({
  analyticsTab,
  readingCalendarStats,
  selectedCalendarDate,
  setSelectedCalendarDate,
  shiftCalendarMonth,
  formatDateKey,
}) {
  const [calendarView, setCalendarView] = useState("month")
  const calendarDays = readingCalendarStats.calendarDays.filter(Boolean)
  const weekDays = getCalendarWeekDays(calendarDays, selectedCalendarDate)
  const loggedDays = getLoggedCalendarDays(calendarDays)

  const selectDay = (date) => {
    setSelectedCalendarDate(date)
  }

  const renderDayButton = (day, compact = false) => (
    <button
      key={day.date}
      type="button"
      className={[
        "reading-calendar__day",
        compact && "reading-calendar__day--compact",
        day.sessions > 0 && "reading-calendar__day--read",
        selectedCalendarDate === day.date && "reading-calendar__day--selected",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => selectDay(day.date)}
      aria-pressed={selectedCalendarDate === day.date}
      aria-label={`${formatDateKey(day.date)}${
        day.sessions
          ? `, ${day.sessions} reading ${
              day.sessions === 1 ? "session" : "sessions"
            }`
          : ", no reading logged"
      }`}
    >
      <span className="reading-calendar__day-number">{day.day}</span>
      {day.sessions > 0 ? (
        <span className="reading-calendar__day-memory">
          <strong>{day.pages} pg</strong>
          <span>
            {day.sessions} {day.sessions === 1 ? "session" : "sessions"}
          </span>
        </span>
      ) : (
        <span className="reading-calendar__day-empty">—</span>
      )}
    </button>
  )

  return (
    <ScrapbookPanel
      scrapbookId="analytics-reading-calendar"
      className={`score-card reading-calendar ${
        analyticsTab === "calendar" ? "" : "analytics-panel-hidden"
      }`}
    >
      <header className="reading-calendar__header">
        <div>
          <p className="scrapbook-kicker">Reading rhythm</p>
          <h2>Reading Calendar</h2>
          <p>
            {readingCalendarStats.totalDaysRead} reading day
            {readingCalendarStats.totalDaysRead === 1 ? "" : "s"} ·{" "}
            {readingCalendarStats.totalPages} pages
            {readingCalendarStats.totalMinutes
              ? ` · ${readingCalendarStats.totalHours} hours`
              : ""}
          </p>
        </div>

        <div className="reading-calendar__view-tabs" aria-label="Calendar view">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={calendarView === option.value ? "is-active" : ""}
              onClick={() => setCalendarView(option.value)}
              aria-pressed={calendarView === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div className="reading-calendar__month-nav">
        <button type="button" onClick={() => shiftCalendarMonth(-1)}>
          ← Previous
        </button>
        <h3>{readingCalendarStats.monthLabel}</h3>
        <button type="button" onClick={() => shiftCalendarMonth(1)}>
          Next →
        </button>
      </div>

      <div className="reading-calendar__spread">
        <div className="reading-calendar__views">
          {calendarView === "month" && (
            <div className="reading-calendar__month">
              <div className="reading-calendar__weekdays" aria-hidden="true">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (dayName) => (
                    <strong key={dayName}>{dayName}</strong>
                  )
                )}
              </div>

              <div className="reading-calendar__month-grid">
                {readingCalendarStats.calendarDays.map((day, index) =>
                  day ? renderDayButton(day) : (
                    <span
                      className="reading-calendar__blank-day"
                      key={`blank-${index}`}
                      aria-hidden="true"
                    />
                  )
                )}
              </div>
            </div>
          )}

          {calendarView === "week" && (
            <div className="reading-calendar__week">
              <p className="reading-calendar__view-note">
                The week containing your selected day
              </p>
              <div className="reading-calendar__week-grid">
                {weekDays.map((day) => renderDayButton(day, true))}
              </div>
            </div>
          )}

          {calendarView === "list" && (
            <div className="reading-calendar__list">
              {loggedDays.length ? (
                loggedDays.map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    className={
                      selectedCalendarDate === day.date ? "is-selected" : ""
                    }
                    onClick={() => selectDay(day.date)}
                  >
                    <span>{formatDateKey(day.date)}</span>
                    <strong>
                      {day.pages} pages · {day.sessions}{" "}
                      {day.sessions === 1 ? "session" : "sessions"}
                    </strong>
                  </button>
                ))
              ) : (
                <p className="reading-calendar__empty-list">
                  No reading sessions are tucked into this month yet.
                </p>
              )}
            </div>
          )}
        </div>

        <aside className="reading-calendar__day-details" aria-live="polite">
          <p className="scrapbook-kicker">Selected day</p>
          <h3>
            {selectedCalendarDate
              ? formatDateKey(selectedCalendarDate)
              : "Choose a calendar day"}
          </h3>

          {readingCalendarStats.selectedDay?.logs?.length ? (
            <div className="reading-calendar__session-list">
              {readingCalendarStats.selectedDay.logs.map((log) => (
                <article key={log.id}>
                  <strong>{log.title}</strong>
                  <p>
                    {log.pagesRead || 0} pages
                    {log.endPage ? ` · ended on page ${log.endPage}` : ""}
                    {log.minutesRead ? ` · ${log.minutesRead} minutes` : ""}
                  </p>
                  {log.notes && <blockquote>{log.notes}</blockquote>}
                </article>
              ))}
            </div>
          ) : (
            <p className="reading-calendar__empty-day">
              No reading logged for this day.
            </p>
          )}
        </aside>
      </div>
    </ScrapbookPanel>
  )
}

export default ReadingCalendarPanel
