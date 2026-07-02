function hashString(value = "") {
  let hash = 0

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

export function createScrapbookSeed(id = "pressed-pages") {
  return hashString(String(id))
}

export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function seededRange(seed, min, max) {
  return min + seededRandom(seed) * (max - min)
}

export function seededRotation(
  seed,
  maxRotation = 1.4
) {
  return (
    seededRange(
      seed,
      -maxRotation,
      maxRotation
    ).toFixed(2) + "deg"
  )
}

export function seededOffset(
  seed,
  maxOffset = 5
) {
  return (
    seededRange(
      seed,
      -maxOffset,
      maxOffset
    ).toFixed(1) + "px"
  )
}

export function seededChoice(
  seed,
  items = []
) {
  if (!items.length) return null

  return items[
    Math.floor(
      seededRandom(seed) * items.length
    )
  ]
}

