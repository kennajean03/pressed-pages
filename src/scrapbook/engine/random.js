export function pickScrapbookItem(items = [], fallback = null) {
  if (!items.length) return fallback

  return items[Math.floor(Math.random() * items.length)]
}

export function randomScrapbookRotation(max = 1.4) {
  const value = Math.random() * max * 2 - max
  return `${value.toFixed(2)}deg`
}

export function randomScrapbookOffset(max = 6) {
  const value = Math.random() * max * 2 - max
  return `${value.toFixed(1)}px`
}

export function randomScrapbookCorner() {
  return pickScrapbookItem(
    ["top-left", "top-right", "bottom-left", "bottom-right"],
    "top-right"
  )
}