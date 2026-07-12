import {
  getArtifactRelationships,
  getCanonicalArtifactType,
} from "./artifactRegistry"

import {
  resolveScrapbookGravity,
} from "./scrapbookGravity"

const QUOTE_ARTIFACT_TYPES = new Set([
  "favorite-quote",
  "quote",
])

const DENSITY_THRESHOLDS = {
  quiet: 1,
  balanced: 3,
  collected: 6,
}

function normalizeArtifactTypes(
  artifactTypes = []
) {
  return artifactTypes
    .filter(Boolean)
    .map(
      (artifactType) =>
        getCanonicalArtifactType(
          artifactType
        )
    )
}

function countArtifactTypes(
  artifactTypes = []
) {
  return artifactTypes.reduce(
    (
      counts,
      artifactType
    ) => {
      if (
        artifactType === "photo"
      ) {
        counts.photo += 1
      }

      if (
        QUOTE_ARTIFACT_TYPES.has(
          artifactType
        )
      ) {
        counts.quote += 1
      }

      return counts
    },
    {
      photo: 0,
      quote: 0,
    }
  )
}

function resolveMemoryDensity(
  artifactCount = 0
) {
  if (
    artifactCount <=
    DENSITY_THRESHOLDS.quiet
  ) {
    return "quiet"
  }

  if (
    artifactCount <=
    DENSITY_THRESHOLDS.balanced
  ) {
    return "balanced"
  }

  if (
    artifactCount <=
    DENSITY_THRESHOLDS.collected
  ) {
    return "collected"
  }

  return "treasured"
}

function resolveCompositionRecipe(
  artifactTypes = []
) {
  const artifactCount =
    artifactTypes.length

  const {
    photo: photoCount,
    quote: quoteCount,
  } = countArtifactTypes(
    artifactTypes
  )

  if (
    artifactCount === 0
  ) {
    return "empty"
  }

  if (
    artifactCount === 1
  ) {
    if (
      photoCount === 1
    ) {
      return "single-photo"
    }

    if (
      quoteCount === 1
    ) {
      return "single-quote"
    }

    return "single-artifact"
  }

  if (
    artifactCount === 2 &&
    photoCount === 1 &&
    quoteCount === 1
  ) {
    return "photo-quote"
  }

  if (
    artifactCount === 2 &&
    photoCount === 2
  ) {
    return "photo-pair"
  }

  if (
    artifactCount === 2 &&
    quoteCount === 2
  ) {
    return "quote-pair"
  }

  if (
    photoCount > 0 &&
    quoteCount > 0
  ) {
    return "mixed-keepsakes"
  }

  if (
    photoCount ===
    artifactCount
  ) {
    return "photo-collection"
  }

  if (
    quoteCount ===
    artifactCount
  ) {
    return "quote-collection"
  }

  return "keepsake-collection"
}

function artifactsAreRelated(
  firstArtifactType,
  secondArtifactType
) {
  if (
    !firstArtifactType ||
    !secondArtifactType
  ) {
    return false
  }

  const firstRelationships =
    getArtifactRelationships(
      firstArtifactType
    )

  const secondRelationships =
    getArtifactRelationships(
      secondArtifactType
    )

  return (
    firstRelationships.includes(
      secondArtifactType
    ) ||
    secondRelationships.includes(
      firstArtifactType
    )
  )
}

function resolveArtifactRelationships(
  artifactTypes = []
) {
  const relationships = []

  artifactTypes.forEach(
    (
      artifactType,
      artifactIndex
    ) => {
      artifactTypes
        .slice(
          artifactIndex + 1
        )
        .forEach(
          (
            candidateArtifactType,
            candidateOffset
          ) => {
            if (
              !artifactsAreRelated(
                artifactType,
                candidateArtifactType
              )
            ) {
              return
            }

            relationships.push({
              firstIndex:
                artifactIndex,

              firstType:
                artifactType,

              secondIndex:
                artifactIndex +
                candidateOffset +
                1,

              secondType:
                candidateArtifactType,

              key:
                `${artifactType}-${candidateArtifactType}`,
            })
          }
        )
    }
  )

  return relationships
}

function resolvePrimaryRelationship(
  relationships = []
) {
  return (
    relationships[0] ||
    null
  )
}

function resolveJournalComposition({
  artifactTypes = [],
  state = "writing",
} = {}) {
  const normalizedArtifactTypes =
    normalizeArtifactTypes(
      artifactTypes
    )

  const artifactCount =
    normalizedArtifactTypes.length

  const recipe =
    resolveCompositionRecipe(
      normalizedArtifactTypes
    )

  const density =
    resolveMemoryDensity(
      artifactCount
    )

  const relationships =
    resolveArtifactRelationships(
      normalizedArtifactTypes
    )

  const primaryRelationship =
    resolvePrimaryRelationship(
      relationships
    )

  const gravity =
    resolveScrapbookGravity({
      artifactTypes:
        normalizedArtifactTypes,
    })

  const hasArtifacts =
    artifactCount > 0

  const isCollection =
    artifactCount > 1

  const hasRelationships =
    relationships.length > 0

  return {
    artifactCount,

    artifactTypes:
      normalizedArtifactTypes,

    density,

    gravity,

    hasArtifacts,

    hasRelationships,

    isCollection,

    primaryRelationship,

    recipe,

    relationships,

    state,

    classes: [
      hasArtifacts
        ? "pp-journal-page--has-artifacts"
        : "",

      isCollection
        ? "pp-journal-page--artifact-collection"
        : "",

      hasRelationships
        ? "pp-journal-page--has-relationships"
        : "",

      primaryRelationship
        ? `pp-journal-page--relationship-${primaryRelationship.key}`
        : "",

      `pp-journal-page--composition-${recipe}`,

      `pp-journal-page--density-${density}`,

      ...gravity.classes,
    ].filter(Boolean),

    attributes: {
      "data-journal-composition":
        recipe,

      "data-journal-memory-density":
        density,

      "data-journal-artifact-count":
        artifactCount,

      "data-journal-artifact-types":
        normalizedArtifactTypes.join(
          " "
        ),

      "data-journal-relationship-count":
        relationships.length,

      "data-journal-primary-relationship":
        primaryRelationship?.key ||
        "",

      "data-journal-relationships":
        relationships
          .map(
            (
              relationship
            ) =>
              relationship.key
          )
          .join(" "),

      ...gravity.attributes,
    },
  }
}

export {
  artifactsAreRelated,
  countArtifactTypes,
  normalizeArtifactTypes,
  resolveArtifactRelationships,
  resolveCompositionRecipe,
  resolveJournalComposition,
  resolveMemoryDensity,
  resolvePrimaryRelationship,
}