export const KEEPSAKE_COLLECTION_PATTERNS = {
  singleFeature: "singleFeature",
  pairedKeepsakes: "pairedKeepsakes",
  keepsakeCluster: "keepsakeCluster",
  fullPocket: "fullPocket",
}

const KEEPSAKE_TYPE_ROLES = {
  photoCluster: "visual",
  quoteCluster: "words",
  flowerCluster: "accent",
}

const ROLE_PRIORITY = {
  visual: 1,
  words: 2,
  accent: 3,
  supporting: 4,
}

function getKeepsakeRole(
  keepsake = {}
) {
  return (
    KEEPSAKE_TYPE_ROLES[
      keepsake.type
    ] || "supporting"
  )
}

function getPattern(
  keepsakes = []
) {
  const count =
    keepsakes.length

  if (count <= 1) {
    return KEEPSAKE_COLLECTION_PATTERNS
      .singleFeature
  }

  if (count === 2) {
    return KEEPSAKE_COLLECTION_PATTERNS
      .pairedKeepsakes
  }

  if (count === 3) {
    return KEEPSAKE_COLLECTION_PATTERNS
      .keepsakeCluster
  }

  return KEEPSAKE_COLLECTION_PATTERNS
    .fullPocket
}

function getDensity(
  count
) {
  if (count <= 1) {
    return "quiet"
  }

  if (count === 2) {
    return "gathered"
  }

  if (count === 3) {
    return "layered"
  }

  return "abundant"
}

function sortKeepsakes(
  keepsakes = []
) {
  return [...keepsakes].sort(
    (first, second) => {
      const firstRole =
        getKeepsakeRole(first)

      const secondRole =
        getKeepsakeRole(second)

      return (
        ROLE_PRIORITY[firstRole] -
        ROLE_PRIORITY[secondRole]
      )
    }
  )
}

function getPlacement({
  keepsake,
  index,
  pattern,
}) {
  const role =
    getKeepsakeRole(keepsake)

  if (
    pattern ===
    KEEPSAKE_COLLECTION_PATTERNS
      .singleFeature
  ) {
    return {
      role: "featured",
      zone: "center",
      layer: 1,
    }
  }

  if (
    pattern ===
    KEEPSAKE_COLLECTION_PATTERNS
      .pairedKeepsakes
  ) {
    return {
      role:
        index === 0
          ? "primary"
          : "secondary",

      zone:
        index === 0
          ? "left"
          : "right",

      layer:
        index + 1,
    }
  }

  if (
    pattern ===
    KEEPSAKE_COLLECTION_PATTERNS
      .keepsakeCluster
  ) {
    const zones = [
      "feature",
      "supporting",
      "accent",
    ]

    return {
      role:
        index === 0
          ? "primary"
          : role,

      zone:
        zones[index] ||
        "supporting",

      layer:
        index + 1,
    }
  }

  const fullPocketZones = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]

  return {
    role:
      index === 0
        ? "primary"
        : role,

    zone:
      fullPocketZones[
        index %
          fullPocketZones.length
      ],

    layer:
      index + 1,
  }
}

export function composeKeepsakeCollection(
  keepsakes = []
) {
  const safeKeepsakes =
    Array.isArray(keepsakes)
      ? keepsakes.filter(Boolean)
      : []

  const pattern =
    getPattern(
      safeKeepsakes
    )

  const orderedKeepsakes =
    sortKeepsakes(
      safeKeepsakes
    )

  const placements =
    orderedKeepsakes.map(
      (
        keepsake,
        index
      ) => ({
        id:
          keepsake.id ||
          `${keepsake.type || "keepsake"}-${index}`,

        keepsake,

        type:
          keepsake.type ||
          "unknown",

        ...getPlacement({
          keepsake,
          index,
          pattern,
        }),
      })
    )

  return {
    pattern,

    density:
      getDensity(
        placements.length
      ),

    count:
      placements.length,

    placements,
  }
}

export default composeKeepsakeCollection