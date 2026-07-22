import {
  ARTIFACT_TYPES,
} from "../memoryArtifacts/memoryArtifactSerializer"

function collectArtifactsByType(
  journey = {},
  artifactType
) {
  return (journey.sessions || [])
    .flatMap(
      (session) =>
        (session.artifacts || []).filter(
          (artifact) =>
            artifact?.type ===
            artifactType
        )
    )
}

function collectFavoriteQuotes(
  journey = {}
) {
  return collectArtifactsByType(
    journey,
    ARTIFACT_TYPES.favoriteQuote
  )
}

function collectPhotos(
  journey = {}
) {
  return collectArtifactsByType(
    journey,
    ARTIFACT_TYPES.photo
  )
}

function collectFlowers(
  journey = {}
) {
  return collectArtifactsByType(
    journey,
    ARTIFACT_TYPES.flower
  )
}


export function composeJourneyKeepsakes(
  journey = {}
) {
  const keepsakes = []

  const quotes =
    collectFavoriteQuotes(
      journey
    )

  if (quotes.length) {
    keepsakes.push({
      type: "quoteCluster",

      title:
        "Words Worth Remembering",

      items: quotes,
    })
  }

  const photos =
    collectPhotos(
      journey
    )

  if (photos.length) {
    keepsakes.push({
      type: "photoCluster",

      title:
        "Moments You Captured",

      items: photos,
    })
  }

  const flowers =
    collectFlowers(
      journey
    )

  if (flowers.length) {
    keepsakes.push({
      type: "flowerCluster",

      title:
        "Pressed Memories",

      items: flowers,
    })
  }

  return keepsakes
}

export default composeJourneyKeepsakes