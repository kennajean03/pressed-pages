import { useState } from "react"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import {
  getCalendarWeekDays,
  getLoggedCalendarDays,
} from "../domain/reading/calendarViews"
import "./ReadingCalendarPanel.css"
import FlagshipCorner from "./scrapbook/FlagshipCorner/FlagshipCorner"
import ArchivalDetail from "./scrapbook/ArchivalDetail/ArchivalDetail"

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
      <FlagshipCorner
        assetId="paper-scrap-torn-rose-letter-corner-01"
        className="phase17c-route-accent phase17c-route-accent--calendar"
        width="84px"
      />
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
          <ArchivalDetail folio="CAL · 06" label="reading rhythm" note="Every marked day held a story." mark="□" tone="rose" />
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
        <aside className="reading-calendar__legend" aria-label="Calendar legend">
          <p className="scrapbook-kicker">Month at a glance</p>
          <div>
            <span className="reading-calendar__legend-swatch reading-calendar__legend-swatch--read" />
            <span>
              <strong>Reading day</strong>
              <small>A session is pressed here</small>
            </span>
          </div>
          <div>
            <span className="reading-calendar__legend-swatch" />
            <span>
              <strong>Quiet day</strong>
              <small>No pages logged</small>
            </span>
          </div>
          <dl>
            <div>
              <dt>Days</dt>
              <dd>{readingCalendarStats.totalDaysRead}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{readingCalendarStats.totalPages}</dd>
            </div>
          </dl>
        </aside>

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
