import {
  createMemoryArtifact,
  createMemoryArtifactFromLog,
  getEmptyLegacyArtifactFields,
  getEmptySupabaseArtifactFields,
  getMemoryArtifactDefinitionByType,
  memoryArtifactDefinitions,
  normalizeArtifactText,
} from "./memoryArtifactRegistry"

const ARTIFACT_TYPES = Object.freeze(
  memoryArtifactDefinitions.reduce(
    (types, definition) => ({
      ...types,
      [definition.id]:
        definition.type,
    }),
    {}
  )
)

function normalizeText(value) {
  return normalizeArtifactText(
    value
  )
}

function createFavoriteQuoteArtifact({
  quote = "",
  source = "",
  page = "",
} = {}) {
  return createMemoryArtifact(
    "favoriteQuote",
    {
      quote,
      source,
      page,
    }
  )
}

function createFlowerArtifact({
  variant = "",
  label = "",
  date = "",
} = {}) {
  return createMemoryArtifact(
    "flower",
    {
      variant,
      label,
      date,
    }
  )
}

function createPhotoArtifact({
  url = "",
  caption = "",
  location = "",
  date = "",
} = {}) {
  return createMemoryArtifact(
    "photo",
    {
      url,
      caption,
      location,
      date,
    }
  )
}

function buildReadingSessionArtifacts(
  sessionValues = {}
) {
  return memoryArtifactDefinitions
    .map((definition) =>
      createMemoryArtifact(
        definition.id,
        sessionValues
      )
    )
    .filter(Boolean)
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
    Array.isArray(log.artifacts)
  ) {
    return log.artifacts.filter(
      (artifact) =>
        artifact?.type
    )
  }

  return memoryArtifactDefinitions
    .map((definition) =>
      createMemoryArtifactFromLog(
        definition.id,
        log
      )
    )
    .filter(Boolean)
}

function serializeArtifactsToLegacyFields(
  artifacts = []
) {
  const legacyFields =
    getEmptyLegacyArtifactFields()

  artifacts.forEach(
    (artifact) => {
      if (!artifact?.type) {
        return
      }

      const definition =
        getMemoryArtifactDefinitionByType(
          artifact.type
        )

      if (!definition) {
        return
      }

      Object.entries(
        definition.fields
      ).forEach(
        ([fieldName, fieldDefinition]) => {
          legacyFields[
            fieldDefinition.legacyOutputKey
          ] =
            normalizeText(
              artifact.data?.[
                fieldName
              ]
            )
        }
      )
    }
  )

  return legacyFields
}

function serializeArtifactsForSupabase(
  artifacts = []
) {
  const supabaseFields =
    getEmptySupabaseArtifactFields()

  artifacts.forEach(
    (artifact) => {
      if (!artifact?.type) {
        return
      }

      const definition =
        getMemoryArtifactDefinitionByType(
          artifact.type
        )

      if (!definition) {
        return
      }

      Object.entries(
        definition.fields
      ).forEach(
        ([fieldName, fieldDefinition]) => {
          const value =
            normalizeText(
              artifact.data?.[
                fieldName
              ]
            )

          supabaseFields[
            fieldDefinition.supabaseKey
          ] =
            value || null
        }
      )
    }
  )

  return supabaseFields
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

async function buildReadingLogFromRow(
  row = {}
) {
  let photoUrl =
    row.photoUrl || ""

  const photoPath =
    row.photo_path ||
    row.photoPath ||
    ""

  if (photoPath && !photoUrl) {
    try {
      photoUrl =
        await createReadingMemoryPhotoUrl(
          photoPath
        )
    } catch (photoError) {
      console.warn(
        "Could not load reading photo:",
        photoError
      )
    }
  }

  return hydrateReadingLogArtifacts({
    id: row.id,

    bookId:
      row.book_id ||
      row.bookId ||
      "",

    date:
      row.log_date ||
      row.date ||
      "",

    pagesRead:
      row.pages_read ??
      row.pagesRead ??
      0,

    endPage:
      row.end_page ??
      row.endPage ??
      null,

    minutesRead:
      row.minutes_read ??
      row.minutesRead ??
      null,

    notes:
      row.notes || "",

    favoriteQuote:
      row.favorite_quote ||
      row.favoriteQuote ||
      "",

    quoteSource:
      row.quote_source ||
      row.quoteSource ||
      "",

    quotePage:
      row.quote_page ||
      row.quotePage ||
      "",

    flowerVariant:
      row.flower_variant ||
      row.flowerVariant ||
      "",

    flowerLabel:
      row.flower_label ||
      row.flowerLabel ||
      "",

    flowerDate:
      row.flower_date ||
      row.flowerDate ||
      "",

    photoPath,

    photoUrl,

    photoCaption:
      row.photo_caption ||
      row.photoCaption ||
      "",

    photoLocation:
      row.photo_location ||
      row.photoLocation ||
      "",

    photoDate:
      row.photo_date ||
      row.photoDate ||
      "",

    createdAt:
      row.created_at ||
      row.createdAt ||
      "",

    updatedAt:
      row.updated_at ||
      row.updatedAt ||
      "",
  })
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