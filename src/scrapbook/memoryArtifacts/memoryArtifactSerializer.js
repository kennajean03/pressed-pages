const ARTIFACT_TYPES = {
  favoriteQuote: "favorite-quote",
  flower: "flower",
  photo: "photo",
}

function normalizeText(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  return String(value).trim()
}

function createFavoriteQuoteArtifact({
  quote = "",
  source = "",
  page = "",
} = {}) {
  const normalizedQuote =
    normalizeText(quote)

  if (!normalizedQuote) {
    return null
  }

  return {
    type:
      ARTIFACT_TYPES.favoriteQuote,

    data: {
      quote:
        normalizedQuote,

      source:
        normalizeText(source),

      page:
        normalizeText(page),
    },
  }
}

function createFlowerArtifact({
  variant = "",
  label = "",
  date = "",
} = {}) {
  const normalizedVariant =
    normalizeText(variant)

  if (!normalizedVariant) {
    return null
  }

  return {
    type:
      ARTIFACT_TYPES.flower,

    data: {
      variant:
        normalizedVariant,

      label:
        normalizeText(label),

      date:
        normalizeText(date),
    },
  }
}

function createPhotoArtifact({
  url = "",
  caption = "",
  location = "",
  date = "",
} = {}) {
  const normalizedUrl =
    normalizeText(url)

  if (!normalizedUrl) {
    return null
  }

  return {
    type:
      ARTIFACT_TYPES.photo,

    data: {
      url:
        normalizedUrl,

      caption:
        normalizeText(caption),

      location:
        normalizeText(location),

      date:
        normalizeText(date),
    },
  }
}

function buildReadingSessionArtifacts({
  quote = "",
  quoteSource = "",
  quotePage = "",

  flowerVariant = "",
  flowerLabel = "",
  flowerDate = "",

  photoUrl = "",
  photoCaption = "",
  photoLocation = "",
  photoDate = "",
} = {}) {
  return [
    createFavoriteQuoteArtifact({
      quote,
      source:
        quoteSource,
      page:
        quotePage,
    }),

    createFlowerArtifact({
      variant:
        flowerVariant,
      label:
        flowerLabel,
      date:
        flowerDate,
    }),

    createPhotoArtifact({
      url:
        photoUrl,
      caption:
        photoCaption,
      location:
        photoLocation,
      date:
        photoDate,
    }),
  ].filter(Boolean)
}

function getArtifactByType(
  artifacts = [],
  artifactType
) {
  return (
    artifacts.find(
      (artifact) =>
        artifact?.type ===
        artifactType
    ) || null
  )
}

function mergeReadingSessionArtifacts(
  existingArtifacts = [],
  incomingArtifacts = []
) {
  const mergedArtifacts =
    new Map()

  existingArtifacts.forEach(
    (artifact) => {
      if (!artifact?.type) {
        return
      }

      mergedArtifacts.set(
        artifact.type,
        artifact
      )
    }
  )

  incomingArtifacts.forEach(
    (artifact) => {
      if (!artifact?.type) {
        return
      }

      mergedArtifacts.set(
        artifact.type,
        artifact
      )
    }
  )

  return Array.from(
    mergedArtifacts.values()
  )
}

function deserializeReadingLogArtifacts(
  log = {}
) {
  if (
    Array.isArray(
      log.artifacts
    )
  ) {
    return log.artifacts
      .filter(
        (artifact) =>
          artifact?.type
      )
  }

  return buildReadingSessionArtifacts({
    quote:
      log.favoriteQuote ??
      log.favorite_quote ??
      "",

    quoteSource:
      log.quoteSource ??
      log.quote_source ??
      "",

    quotePage:
      log.quotePage ??
      log.quote_page ??
      "",

    flowerVariant:
      log.flowerVariant ??
      log.flower_variant ??
      "",

    flowerLabel:
      log.flowerLabel ??
      log.flower_label ??
      "",

    flowerDate:
      log.flowerDate ??
      log.flower_date ??
      "",

    photoUrl:
      log.photoUrl ??
      log.photo_url ??
      log.photoURL ??
      log.imageUrl ??
      log.imageURL ??
      log.photo ??
      "",

    photoCaption:
      log.photoCaption ??
      log.photo_caption ??
      log.caption ??
      "",

    photoLocation:
      log.photoLocation ??
      log.photo_location ??
      log.location ??
      "",

    photoDate:
      log.photoDate ??
      log.photo_date ??
      log.date ??
      log.log_date ??
      "",
  })
}

function serializeArtifactsToLegacyFields(
  artifacts = []
) {
  const quoteArtifact =
    getArtifactByType(
      artifacts,
      ARTIFACT_TYPES.favoriteQuote
    )

  const flowerArtifact =
    getArtifactByType(
      artifacts,
      ARTIFACT_TYPES.flower
    )

  const photoArtifact =
    getArtifactByType(
      artifacts,
      ARTIFACT_TYPES.photo
    )

  return {
    favoriteQuote:
      quoteArtifact?.data?.quote ||
      "",

    quoteSource:
      quoteArtifact?.data?.source ||
      "",

    quotePage:
      quoteArtifact?.data?.page ||
      "",

    flowerVariant:
      flowerArtifact?.data?.variant ||
      "",

    flowerLabel:
      flowerArtifact?.data?.label ||
      "",

    flowerDate:
      flowerArtifact?.data?.date ||
      "",

    photoUrl:
      photoArtifact?.data?.url ||
      "",

    photoCaption:
      photoArtifact?.data?.caption ||
      "",

    photoLocation:
      photoArtifact?.data?.location ||
      "",

    photoDate:
      photoArtifact?.data?.date ||
      "",
  }
}

function serializeArtifactsForSupabase(
  artifacts = []
) {
  const legacyFields =
    serializeArtifactsToLegacyFields(
      artifacts
    )

  return {
    favorite_quote:
      legacyFields.favoriteQuote ||
      null,

    quote_source:
      legacyFields.quoteSource ||
      null,

    quote_page:
      legacyFields.quotePage ||
      null,

    flower_variant:
      legacyFields.flowerVariant ||
      null,

    flower_label:
      legacyFields.flowerLabel ||
      null,

    flower_date:
      legacyFields.flowerDate ||
      null,

    photo_url:
      legacyFields.photoUrl ||
      null,

    photo_caption:
      legacyFields.photoCaption ||
      null,

    photo_location:
      legacyFields.photoLocation ||
      null,

    photo_date:
      legacyFields.photoDate ||
      null,
  }
}

function hydrateReadingLogArtifacts(
  log = {}
) {
  const artifacts =
    deserializeReadingLogArtifacts(
      log
    )

  const legacyFields =
    serializeArtifactsToLegacyFields(
      artifacts
    )

  return {
    ...log,
    artifacts,
    ...legacyFields,
  }
}

export {
  ARTIFACT_TYPES,
  buildReadingSessionArtifacts,
  createFavoriteQuoteArtifact,
  createFlowerArtifact,
  createPhotoArtifact,
  deserializeReadingLogArtifacts,
  getArtifactByType,
  hydrateReadingLogArtifacts,
  mergeReadingSessionArtifacts,
  normalizeText,
  serializeArtifactsForSupabase,
  serializeArtifactsToLegacyFields,
}