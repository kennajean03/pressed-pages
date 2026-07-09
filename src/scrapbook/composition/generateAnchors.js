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

function resolveAttachmentAnchor(recipe = {}, seed = "") {
  switch (recipe.attachmentRole) {
    case "journal":
      return stableChoice(seed, "journal-tape", [
        "roseTape",
        "linenTape",
        "topTape",
      ])

    case "reading":
      return stableChoice(seed, "reading-tape", [
        "sageTape",
        "topTape",
        "linenTape",
      ])

    case "archive":
      return stableChoice(seed, "archive-tape", [
        "linenTape",
        "goldTape",
        "topTape",
      ])

    case "utility":
      return stableChoice(seed, "utility-tape", [
        "goldTape",
        "linenTape",
        "sageTape",
      ])

    default:
      return stableChoice(seed, "attachment-anchor", [
        "topTape",
        "roseTape",
        "sageTape",
        "goldTape",
        "linenTape",
      ])
  }
}

function resolveBookmarkAnchor(recipe = {}) {
  if (recipe.bookmarkRole) return "bookmark"

  return null
}

function resolveBotanicalAnchor(recipe = {}, seed = "") {
  switch (recipe.botanicalRole) {
    case "fresh":
      return stableChoice(seed, "fresh-botanical", [
        "softFlower",
        "pressedDaisy",
      ])

    case "hero":
      return stableChoice(seed, "hero-botanical", [
        "pressedFlower",
        "pressedDaisy",
        "softFlower",
      ])

    default:
      return stableChoice(seed, "botanical-anchor", [
        "softFlower",
        "pressedDaisy",
        "pressedFlower",
      ])
  }
}

function resolveEphemeraAnchor(recipe = {}, seed = "") {
  switch (recipe.cardRole) {
    case "review":
      return "reviewNote"
    case "library":
    case "archive":
      return "libraryCard"
    default:
      return stableChoice(seed, "ephemera-type", [
        "reviewNote",
        "libraryCard",
        "ticketStub",
        "annualMemoryNote",
      ])
  }
}

function resolveStampAnchor(recipe = {}) {
  if (recipe.stampRole === "finished") return "dateStamp"

  return "dateStamp"
}

function resolvePatinaAnchor(recipe = {}, seed = "") {
  if (recipe.notebookRole === "reflection") return "pencilNote"

  return stableChoice(seed, "patina-anchor", ["coffeeRing", "pencilNote"])
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
    generatedAnchors.push(resolveAttachmentAnchor(recipe, seed))
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.bookmark, seed, "bookmark")
  ) {
    generatedAnchors.push(resolveBookmarkAnchor(recipe) || "bookmark")
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.botanical, seed, "botanical")
  ) {
    generatedAnchors.push(resolveBotanicalAnchor(recipe, seed))
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.ephemera, seed, "ephemera")
  ) {
    generatedAnchors.push(resolveEphemeraAnchor(recipe, seed))
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.stamp, seed, "stamp")
  ) {
    generatedAnchors.push(resolveStampAnchor(recipe))
  }

  if (
    generatedAnchors.length < maxObjects &&
    shouldInclude(rules.patina, seed, "patina")
  ) {
    generatedAnchors.push(resolvePatinaAnchor(recipe, seed))
  }

  if (!generatedAnchors.length && rules.attachment) {
    generatedAnchors.push(resolveAttachmentAnchor(recipe, seed))
  }

  return generatedAnchors.filter(Boolean).slice(0, maxObjects)
}