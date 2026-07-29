import test from "node:test"
import assert from "node:assert/strict"
import {
  getCalendarWeekDays,
  getLoggedCalendarDays,
} from "../src/domain/reading/calendarViews.js"

const julyDays = Array.from({ length: 31 }, (_, index) => ({
  date: `2026-07-${String(index + 1).padStart(2, "0")}`,
  day: index + 1,
  sessions: index === 27 ? 2 : 0,
}))

test("week view respects Sunday boundaries late in a month", () => {
  assert.deepEqual(
    getCalendarWeekDays(julyDays, "2026-07-29").map((day) => day.day),
    [26, 27, 28, 29, 30, 31]
  )
})

test("week view remains stable at the beginning of a month", () => {
  assert.deepEqual(
    getCalendarWeekDays(julyDays, "2026-07-01").map((day) => day.day),
    [1, 2, 3, 4]
  )
})

test("list view excludes blanks and days without sessions", () => {
  assert.deepEqual(
    getLoggedCalendarDays([null, ...julyDays]).map((day) => day.date),
    ["2026-07-28"]
  )
})
