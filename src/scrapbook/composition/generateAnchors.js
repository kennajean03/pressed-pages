
function stableHash(value = "") {
  return String(value)
    .split("")
    .reduce((hash, char) => {
      return (hash * 31 + char.charCodeAt(0)) >>> 0
    }, 7)
}

function stableChance(seed, salt = "") {
  const hash = stableHash(`${seed}:${salt}`)
  return (hash % 1000) / 1000
}

function shouldInclude(rule, seed, salt) {
  if (!rule) return false

  const chance = typeof rule.chance === "number" ? rule.chance : 1

  return stableChance(seed, salt) <= chance
}

function stableChoice(seed, salt, choices = []) {
  if (!choices.length) return null

  const hash = stableHash(`${seed}:${salt}`)
  return choices[hash % choices.length]
}

function normalizeDensity(density = "whisper") {
  switch (density) {
    case "light":
      return "whisper"
    case "medium":
      return "journal"
    case "rich":
      return "keepsake"
    default:
      return density
  }
}

function maxObjectsForDensity(density = "whisper") {
  switch (normalizeDensity(density)) {
    case "whisper":
      return 1

    case "journal":
      return 2

    case "keepsake":
      return 3

    case "heirloom":
      return 4

    default:
      return 2
  }
}

export function generateAnchors(recipe = {}) {  
    const rules = recipe.compositionRules

  if (!rules) {
    return (recipe.anchors || []).slice(0, recipe.rules?.maxPrimaryAnchors ?? 3)
  }

  const seed = recipe.id || recipe.story || "pressed-pages"
  const density = normalizeDensity(rules.density || recipe.layout?.density)
  const maxObjects = Math.min(
    rules.maxMeaningfulObjects ?? maxObjectsForDensity(density),
    maxObjectsForDensity(density)
  )

  const generatedAnchors = []

  if (shouldInclude(rules.attachment, seed, "attachment")) {
    generatedAnchors.push("topTape")
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.bookmark, seed, "bookmark")
  ) {
    generatedAnchors.push("bookmark")
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.botanical, seed, "botanical")
  ) {
    generatedAnchors.push("softFlower")
  }

  if (
  generatedAnchors.length < maxObjects &&
  shouldInclude(rules.ephemera, seed, "ephemera")
) {
generatedAnchors.push(
  stableChoice(seed, "ephemera-type", [
    "reviewNote",
    "libraryCard",
    "ticketStub",
    "annualMemoryNote",
  ])
)
}

if (
  generatedAnchors.length < maxObjects &&
  shouldInclude(rules.stamp, seed, "stamp")
) {
  generatedAnchors.push("dateStamp")
}

if (
  generatedAnchors.length < maxObjects &&
  shouldInclude(rules.patina, seed, "patina")
) {
  generatedAnchors.push("coffeeRing")
}

  if (!generatedAnchors.length && rules.attachment) {
    generatedAnchors.push("topTape")
  }

    return generatedAnchors.slice(0, maxObjects)

}