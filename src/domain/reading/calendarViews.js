export function getCalendarWeekDays(calendarDays = [], selectedDate = "") {
  const days = calendarDays.filter(Boolean)
  const selectedIndex = days.findIndex((day) => day.date === selectedDate)

  if (selectedIndex < 0) {
    return days.slice(0, 7)
  }

  const getSundayKey = (dateKey) => {
    const date = new Date(`${dateKey}T12:00:00`)
    date.setDate(date.getDate() - date.getDay())
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-")
  }
  const selectedSunday = getSundayKey(days[selectedIndex].date)

  return days.filter((day) => getSundayKey(day.date) === selectedSunday)
}

export function getLoggedCalendarDays(calendarDays = []) {
  return calendarDays.filter((day) => day && Number(day.sessions) > 0)
}
