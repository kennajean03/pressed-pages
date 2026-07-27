export const isAudiobookFormat = (bookInfo = {}) =>
  String(bookInfo.format || "").toLowerCase() === "audiobook"

export function getProgressPercent(bookInfo = {}) {
  const total = Number(bookInfo.totalPages) || 0
  const current = Number(bookInfo.currentPage) || 0

  if (total <= 0) return 0

  return Math.min(
    100,
    Math.max(0, Math.round((current / total) * 100))
  )
}

export function getProgressUnitCopy(bookInfo = {}) {
  const isAudiobook = isAudiobookFormat(bookInfo)

  return {
    isAudiobook,
    totalLabel: isAudiobook ? "Total Minutes" : "Total Pages",
    currentLabel: isAudiobook
      ? "Minutes Listened So Far"
      : "Current Page",
    reachedLabel: isAudiobook
      ? "Minutes listened so far today"
      : "Page I reached today",
    amountLabel: isAudiobook ? "Minutes Listened" : "Pages Read",
    endedLabel: isAudiobook ? "Ended At Minute" : "Ended On Page",
    optionalMinutesLabel: isAudiobook
      ? "Listening Time (auto-tracked)"
      : "Minutes Read (optional)",
    progressLine: (current, total) =>
      isAudiobook
        ? `Minute ${current || "0"} of ${total || "?"}`
        : `Page ${current || "0"} of ${total || "?"}`,
    loggedMessage: (amount) =>
      isAudiobook
        ? `Logged ${amount} minutes listened for today 🔥`
        : `Logged ${amount} pages for today 🔥`,
    higherProgressMessage: isAudiobook
      ? "Add a higher minute count before logging listening."
      : "Add a higher page number before logging reading.",
    overTotalMessage: isAudiobook
      ? "That minute count is higher than the audiobook's total minutes."
      : "That page number is higher than the book's total pages.",
  }
}
