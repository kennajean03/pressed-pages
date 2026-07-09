const TAPE_TYPES = new Set([
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
])

const BOTANICAL_TYPES = new Set([
  "pressedFlower",
  "pressedDaisy",
  "softFlower",
  "pressedFern",
  "signatureFlower",
])

const CARD_TYPES = new Set([
  "libraryCard",
  "reviewNote",
  "annualMemoryNote",
  "ticketStub",
])

function hasType(objects = [], types = new Set()) {
  return objects.some((object) => types.has(object.type))
}

function getFirstType(objects = [], types = new Set()) {
  return objects.find((object) => types.has(object.type))
}

function withAssembly(object, assembly) {
  return {
    ...object,
    assembly: {
      ...(object.assembly || {}),
      ...assembly,
    },
  }
}

export function resolveAssemblies(objects = [], recipe = {}) {
  const primaryTape = getFirstType(objects, TAPE_TYPES)
  const primaryBotanical = getFirstType(objects, BOTANICAL_TYPES)
  const primaryCard = getFirstType(objects, CARD_TYPES)

  const hasTape = Boolean(primaryTape)
  const hasBotanical = Boolean(primaryBotanical)
  const hasCard = Boolean(primaryCard)

  if (hasTape && hasBotanical && !hasCard) {
    return objects.map((object) =>
      object.type === primaryTape.type || object.type === primaryBotanical.type
        ? withAssembly(object, {
            id: "pressed-flower-hold",
            type: "pressedFlowerHold",
            role: object.type === primaryTape.type ? "fastener" : "heldObject",
            priority: "primary",
          })
        : object
    )
  }

  if (hasTape && hasCard) {
    return objects.map((object) =>
      object.type === primaryTape.type || object.type === primaryCard.type
        ? withAssembly(object, {
            id: "paper-memory-hold",
            type:
              primaryCard.type === "libraryCard"
                ? "libraryArchive"
                : "journalNote",
            role: object.type === primaryTape.type ? "fastener" : "heldObject",
            priority: "primary",
          })
        : object
    )
  }

  return objects
}

export default resolveAssemblies