import {
  getArtifactAttractions,
  getArtifactGravityRole,
} from "./artifactRegistry"

const GRAVITY_STRENGTH_ORDER = {
  none: 0,
  gentle: 1,
  moderate: 2,
  strong: 3,
}

function getGravityStrength(
  firstArtifactType,
  secondArtifactType
) {
  const firstAttractions =
    getArtifactAttractions(
      firstArtifactType
    )

  const secondAttractions =
    getArtifactAttractions(
      secondArtifactType
    )

  const firstStrength =
    firstAttractions[
      secondArtifactType
    ] || "none"

  const secondStrength =
    secondAttractions[
      firstArtifactType
    ] || "none"

  return GRAVITY_STRENGTH_ORDER[
    firstStrength
  ] >=
    GRAVITY_STRENGTH_ORDER[
      secondStrength
    ]
    ? firstStrength
    : secondStrength
}

function getArtifactRole(
  artifactType
) {
  return getArtifactGravityRole(
    artifactType
  )
}

function resolveGravityAnchor(
  artifactTypes = []
) {
  const anchorIndex =
    artifactTypes.findIndex(
      (artifactType) =>
        getArtifactRole(
          artifactType
        ) === "anchor"
    )

  if (anchorIndex >= 0) {
    return {
      index: anchorIndex,
      type:
        artifactTypes[
          anchorIndex
        ],
      role: "anchor",
    }
  }

  if (
    artifactTypes.length === 0
  ) {
    return null
  }

  return {
    index: 0,
    type: artifactTypes[0],
    role:
      getArtifactRole(
        artifactTypes[0]
      ),
  }
}

function resolveGravityConnections(
  artifactTypes = [],
  anchor = null
) {
  if (!anchor) {
    return []
  }

  return artifactTypes
    .map(
      (
        artifactType,
        artifactIndex
      ) => {
        if (
          artifactIndex ===
          anchor.index
        ) {
          return null
        }

        const strength =
          getGravityStrength(
            anchor.type,
            artifactType
          )

        if (
          strength === "none"
        ) {
          return null
        }

        return {
          anchorIndex:
            anchor.index,

          anchorType:
            anchor.type,

          artifactIndex,

          artifactType,

          artifactRole:
            getArtifactRole(
              artifactType
            ),

          strength,

          key:
            `${anchor.type}-${artifactType}`,
        }
      }
    )
    .filter(Boolean)
}

function resolveGravityStrength(
  connections = []
) {
  return connections.reduce(
    (
      strongestStrength,
      connection
    ) => {
      return GRAVITY_STRENGTH_ORDER[
        connection.strength
      ] >
        GRAVITY_STRENGTH_ORDER[
          strongestStrength
        ]
        ? connection.strength
        : strongestStrength
    },
    "none"
  )
}

function resolveScrapbookGravity({
  artifactTypes = [],
} = {}) {
  const normalizedArtifactTypes =
    artifactTypes.filter(
      Boolean
    )

  const anchor =
    resolveGravityAnchor(
      normalizedArtifactTypes
    )

  const connections =
    resolveGravityConnections(
      normalizedArtifactTypes,
      anchor
    )

  const strength =
    resolveGravityStrength(
      connections
    )

  const attractedTypes =
    connections.map(
      (connection) =>
        connection.artifactType
    )

  const hasGravity =
    Boolean(anchor) &&
    connections.length > 0

  return {
    anchor,
    attractedTypes,
    connections,
    hasGravity,
    strength,

    classes: [
      hasGravity
        ? "pp-journal-page--has-gravity"
        : "",

      anchor
        ? `pp-journal-page--gravity-anchor-${anchor.type}`
        : "",

      hasGravity
        ? `pp-journal-page--gravity-${strength}`
        : "",
    ].filter(Boolean),

    attributes: {
      "data-journal-gravity":
        hasGravity
          ? `${anchor.type}-${attractedTypes.join(
              "-"
            )}`
          : "",

      "data-journal-gravity-anchor":
        anchor?.type || "",

      "data-journal-gravity-strength":
        strength,

      "data-journal-gravity-attracted-types":
        attractedTypes.join(
          " "
        ),
    },
  }
}

export {
  GRAVITY_STRENGTH_ORDER,
  getArtifactRole,
  getGravityStrength,
  resolveGravityAnchor,
  resolveGravityConnections,
  resolveGravityStrength,
  resolveScrapbookGravity,
}