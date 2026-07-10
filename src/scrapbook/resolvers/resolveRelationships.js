const EPHEMERA_PRIORITY = [
  "libraryCard",
  "reviewNote",
  "annualMemoryNote",
  "ticketStub",
]

const BOTANICAL_PRIORITY = [
  "pressedFlower",
  "pressedDaisy",
  "softFlower",
  "pressedFern",
  "signatureFlower",
]

const TAPE_TYPES = new Set([
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
])

const BOTANICAL_TYPES = new Set(BOTANICAL_PRIORITY)

const BOOKMARK_TYPES = new Set(["bookmark"])

const CARD_TYPES = new Set([
  "libraryCard",
  "reviewNote",
  "annualMemoryNote",
  "ticketStub",
])

const assemblyRelationshipStrategies = {
  pressedFlowerHold: {
    heldObject: {
      relation: "heldBy",
      targetRole: "fastener",
      strength: "primary",
      strategy: "stemUnderTape",
      visiblePercent: 0.82,
      overlap: 0.42,
      sharedRotation: true,
      sharedShadow: true,
      compression: "soft",
      depthBias: -1,
    },
    fastener: {
      relation: "fastens",
      targetRole: "heldObject",
      strength: "primary",
      strategy: "stemHold",
      overlap: 0.42,
      visibility: 0.94,
      sharedRotation: true,
      sharedShadow: true,
      compression: "soft",
      depthBias: 3,
    },
  },

  libraryArchive: {
    heldObject: {
      relation: "heldBy",
      targetRole: "fastener",
      strength: "primary",
      strategy: "topEdgeUnderTape",
      visiblePercent: 0.68,
      overlap: 0.35,
      sharedRotation: true,
      sharedShadow: true,
      compression: "medium",
      depthBias: -2,
    },
    fastener: {
      relation: "fastens",
      targetRole: "heldObject",
      strength: "primary",
      strategy: "topEdge",
      overlap: 0.35,
      visibility: 0.95,
      sharedRotation: true,
      sharedShadow: true,
      compression: "medium",
      depthBias: 3,
    },
  },
    journalNote: {
    heldObject: {
      relation: "heldBy",
      targetRole: "fastener",
      strength: "primary",
      strategy: "cornerUnderTape",
      visiblePercent: 0.82,
      overlap: 0.30,
      sharedRotation: true,
      sharedShadow: true,
      compression: "soft",
      depthBias: -1,
    },

    fastener: {
      relation: "fastens",
      targetRole: "heldObject",
      strength: "primary",
      strategy: "cornerHold",
      overlap: 0.30,
      visibility: 0.94,
      sharedRotation: true,
      sharedShadow: true,
      compression: "soft",
      depthBias: 3,
    },
  },
}

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
  pressedFlower: {
    strategy: "stemHold",
    overlap: 0.42,
    rotationBias: -3,
    depthBias: 3,
    visibility: 0.92,
  },
  pressedDaisy: {
    strategy: "stemHold",
    overlap: 0.42,
    rotationBias: -3,
    depthBias: 3,
    visibility: 0.92,
  },
  softFlower: {
    strategy: "softStemHold",
    overlap: 0.38,
    rotationBias: 2,
    depthBias: 3,
    visibility: 0.9,
  },
  pressedFern: {
    strategy: "fernHold",
    overlap: 0.36,
    rotationBias: 5,
    depthBias: 3,
    visibility: 0.9,
  },
  signatureFlower: {
    strategy: "stemHold",
    overlap: 0.42,
    rotationBias: -4,
    depthBias: 3,
    visibility: 0.93,
  },
}

function findFirstObjectByType(objects = [], types = []) {
  return types
    .map((type) => objects.find((object) => object.type === type))
    .find(Boolean)
}

function findAssemblyPartner(objects = [], object = {}, targetRole) {
  if (!object.assembly?.id || !targetRole) return null

  return objects.find(
    (candidate) =>
      candidate.id !== object.id &&
      candidate.assembly?.id === object.assembly.id &&
      candidate.assembly?.role === targetRole
  )
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

function resolveAssemblyRelationship(object = {}, objects = []) {
  const assemblyId = object.assembly?.id
  const assemblyRole = object.assembly?.role

  if (!assemblyId || !assemblyRole) return null

  const assemblyStrategy = assemblyRelationshipStrategies[assemblyId]?.[assemblyRole]

  if (!assemblyStrategy) return null

  const partner = findAssemblyPartner(
    objects,
    object,
    assemblyStrategy.targetRole
  )

  return {
    assemblyId,
    assemblyRole,
    partnerId: partner?.id,
    partnerType: partner?.type,
    partnerRole: partner?.assembly?.role,
    ...assemblyStrategy,
  }
}

export function resolveRelationships(objects = [], recipe = {}) {
  const primaryEphemera = findFirstObjectByType(objects, EPHEMERA_PRIORITY)
  const primaryBotanical = findFirstObjectByType(objects, BOTANICAL_PRIORITY)
  const primaryTapeTarget = primaryEphemera || primaryBotanical

  return objects.map((object) => {
    const assemblyRelationship = resolveAssemblyRelationship(object, objects)

    if (assemblyRelationship) {
      return addRelationship(object, assemblyRelationship)
    }

    if (TAPE_TYPES.has(object.type) && primaryTapeTarget) {
      const behavior = tapeStrategiesByTarget[primaryTapeTarget.type]

      return addRelationship(object, {
        relation: "attachedTo",
        targetType: primaryTapeTarget.type,
        targetId: primaryTapeTarget.id,
        strength: primaryEphemera ? "primary" : "soft",
        ...behavior,
      })
    }

    if (BOTANICAL_TYPES.has(object.type)) {
      return addRelationship(object, {
        relation: "tuckedUnder",
        targetType: primaryTapeTarget?.type === object.type ? "tape" : "book",
        targetId:
          primaryTapeTarget?.type === object.type ? "primaryTape" : "primaryBook",
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