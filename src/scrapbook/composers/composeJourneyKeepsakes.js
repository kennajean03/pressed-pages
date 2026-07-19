function collectFavoriteQuotes(journey = {}) {
  return (journey.sessions || [])
    .flatMap(
      (session) =>
        (session.artifacts || []).filter(
          (artifact) =>
            artifact.type ===
            "favoriteQuote"
        )
    )
}

function collectPhotos(journey = {}) {
  return (journey.sessions || [])
    .flatMap(
      (session) =>
        (session.artifacts || []).filter(
          (artifact) =>
            artifact.type ===
              "readingPhoto" ||
            artifact.type === "photo"
        )
    )
}

function collectFlowers(journey = {}) {
  return (journey.sessions || [])
    .flatMap(
      (session) =>
        (session.artifacts || []).filter(
          (artifact) =>
            artifact.type ===
            "flower"
        )
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