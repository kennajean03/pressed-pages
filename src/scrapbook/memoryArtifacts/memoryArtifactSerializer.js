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