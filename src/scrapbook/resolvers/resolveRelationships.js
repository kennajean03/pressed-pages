const EPHEMERA_PRIORITY = [
  "libraryCard",
  "reviewNote",
  "annualMemoryNote",
  "ticketStub",
]

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

const BOOKMARK_TYPES = new Set(["bookmark"])

const CARD_TYPES = new Set([
  "libraryCard",
  "reviewNote",
  "annualMemoryNote",
  "ticketStub",
])

const tapeStrategiesByTarget = {
  libraryCard: {
    strategy: "topEdge",
    overlap: 0.35,
    rotationBias: -6,
    depthBias: 2,
    visibility: 0.94,
  },
  reviewNote: {
    strategy: "cornerHold",
    overlap: 0.28,
    rotationBias: 5,
    depthBias: 2,
    visibility: 0.92,
  },
  annualMemoryNote: {
    strategy: "softTopEdge",
    overlap: 0.3,
    rotationBias: 4,
    depthBias: 2,
    visibility: 0.93,
  },
  ticketStub: {
    strategy: "smallStrip",
    overlap: 0.24,
    rotationBias: -9,
    depthBias: 2,
    visibility: 0.9,
  },
}

function findFirstObjectByType(objects = [], types = []) {
  return types
    .map((type) => objects.find((object) => object.type === type))
    .find(Boolean)
}

function addRelationship(object, relationship) {
  return {
    ...object,
    relationship: {
      ...(object.relationship || {}),
      ...relationship,
    },
  }
}

export function resolveRelationships(objects = [], recipe = {}) {
  const primaryEphemera = findFirstObjectByType(objects, EPHEMERA_PRIORITY)

  return objects.map((object) => {
    if (TAPE_TYPES.has(object.type) && primaryEphemera) {
      const behavior = tapeStrategiesByTarget[primaryEphemera.type]

      return addRelationship(object, {
        relation: "attachedTo",
        targetType: primaryEphemera.type,
        targetId: primaryEphemera.id,
        strength: "primary",
        ...behavior,
      })
    }

    if (BOTANICAL_TYPES.has(object.type)) {
      return addRelationship(object, {
        relation: "tuckedUnder",
        targetType: "book",
        targetId: "primaryBook",
        strength: "soft",
        strategy: "cornerPeek",
        visiblePercent: object.type === "pressedFern" ? 0.32 : 0.25,
        rotationBias: object.type === "pressedFern" ? 8 : -6,
        depthBias: -1,
      })
    }

    if (BOOKMARK_TYPES.has(object.type)) {
      return addRelationship(object, {
        relation: "inside",
        targetType: "book",
        targetId: "primaryBook",
        strength: "primary",
        strategy: "pagePeek",
        protrusion: 0.45,
        bend: "soft",
        depthBias: 1,
      })
    }

    if (CARD_TYPES.has(object.type)) {
      return addRelationship(object, {
        relation: "behind",
        targetType: "book",
        targetId: "primaryBook",
        strength: object.type === "libraryCard" ? "primary" : "secondary",
        strategy: object.type === "libraryCard" ? "sidePeek" : "paperStack",
        visiblePercent: object.type === "libraryCard" ? 0.4 : 0.5,
        offsetBias: object.type === "libraryCard" ? "left" : "lowerLeft",
        depthBias: -2,
      })
    }

    return object
  })
}

export default resolveRelationships