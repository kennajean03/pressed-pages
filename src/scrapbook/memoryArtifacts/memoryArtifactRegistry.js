function normalizeArtifactText(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return ""
  }

  return String(value).trim()
}

function defineMemoryArtifact({
  id,
  type,
  requiredField,
  fields,
}) {
  if (!id || !type) {
    throw new Error(
      "Memory artifacts require both an id and type."
    )
  }

  return Object.freeze({
    id,
    type,
    requiredField,
    fields: Object.freeze(fields),
  })
}

const memoryArtifactRegistry = {
  favoriteQuote: defineMemoryArtifact({
    id: "favoriteQuote",
    type: "favorite-quote",
    requiredField: "quote",

    fields: {
      quote: {
        inputKey: "quote",
        legacyKeys: [
          "favoriteQuote",
          "favorite_quote",
        ],
        legacyOutputKey: "favoriteQuote",
        supabaseKey: "favorite_quote",
      },

      source: {
        inputKey: "quoteSource",
        legacyKeys: [
          "quoteSource",
          "quote_source",
        ],
        legacyOutputKey: "quoteSource",
        supabaseKey: "quote_source",
      },

      page: {
        inputKey: "quotePage",
        legacyKeys: [
          "quotePage",
          "quote_page",
        ],
        legacyOutputKey: "quotePage",
        supabaseKey: "quote_page",
      },
    },
  }),

  flower: defineMemoryArtifact({
    id: "flower",
    type: "flower",
    requiredField: "variant",

    fields: {
      variant: {
        inputKey: "flowerVariant",
        legacyKeys: [
          "flowerVariant",
          "flower_variant",
        ],
        legacyOutputKey: "flowerVariant",
        supabaseKey: "flower_variant",
      },

      label: {
        inputKey: "flowerLabel",
        legacyKeys: [
          "flowerLabel",
          "flower_label",
        ],
        legacyOutputKey: "flowerLabel",
        supabaseKey: "flower_label",
      },

      date: {
        inputKey: "flowerDate",
        legacyKeys: [
          "flowerDate",
          "flower_date",
        ],
        legacyOutputKey: "flowerDate",
        supabaseKey: "flower_date",
      },
    },
  }),

  photo: defineMemoryArtifact({
    id: "photo",
    type: "photo",
    requiredField: "url",

    fields: {
      url: {
        inputKey: "photoUrl",
        legacyKeys: [
          "photoUrl",
          "photo_url",
          "photoURL",
          "imageUrl",
          "imageURL",
          "photo",
        ],
        legacyOutputKey: "photoUrl",
        supabaseKey: "photo_url",
      },

      caption: {
        inputKey: "photoCaption",
        legacyKeys: [
          "photoCaption",
          "photo_caption",
          "caption",
        ],
        legacyOutputKey: "photoCaption",
        supabaseKey: "photo_caption",
      },

      location: {
        inputKey: "photoLocation",
        legacyKeys: [
          "photoLocation",
          "photo_location",
          "location",
        ],
        legacyOutputKey: "photoLocation",
        supabaseKey: "photo_location",
      },

      date: {
        inputKey: "photoDate",
        legacyKeys: [
          "photoDate",
          "photo_date",
        ],
        legacyOutputKey: "photoDate",
        supabaseKey: "photo_date",
      },
    },
  }),
}

const memoryArtifactDefinitions =
  Object.values(
    memoryArtifactRegistry
  )

function getMemoryArtifactDefinition(
  artifactId
) {
  return (
    memoryArtifactRegistry[
      artifactId
    ] || null
  )
}

function getMemoryArtifactDefinitionByType(
  artifactType
) {
  return (
    memoryArtifactDefinitions.find(
      (definition) =>
        definition.type ===
        artifactType
    ) || null
  )
}

function getFirstArtifactValue(
  source = {},
  keys = []
) {
  for (const key of keys) {
    const value = source?.[key]

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value
    }
  }

  return ""
}

function createMemoryArtifact(
  artifactId,
  values = {}
) {
  const definition =
    getMemoryArtifactDefinition(
      artifactId
    )

  if (!definition) {
    return null
  }

  const data = {}

  Object.entries(
    definition.fields
  ).forEach(
    ([fieldName, fieldDefinition]) => {
      const inputValue =
        values[fieldName] ??
        values[
          fieldDefinition.inputKey
        ]

      data[fieldName] =
        normalizeArtifactText(
          inputValue
        )
    }
  )

  if (
    !data[
      definition.requiredField
    ]
  ) {
    return null
  }

  return {
    type: definition.type,
    data,
  }
}

function createMemoryArtifactFromLog(
  artifactId,
  log = {}
) {
  const definition =
    getMemoryArtifactDefinition(
      artifactId
    )

  if (!definition) {
    return null
  }

  const values = {}

  Object.entries(
    definition.fields
  ).forEach(
    ([fieldName, fieldDefinition]) => {
      values[fieldName] =
        getFirstArtifactValue(
          log,
          fieldDefinition.legacyKeys
        )
    }
  )

  return createMemoryArtifact(
    artifactId,
    values
  )
}

function getEmptyLegacyArtifactFields() {
  const fields = {}

  memoryArtifactDefinitions.forEach(
    (definition) => {
      Object.values(
        definition.fields
      ).forEach(
        (fieldDefinition) => {
          fields[
            fieldDefinition.legacyOutputKey
          ] = ""
        }
      )
    }
  )

  return fields
}

function getEmptySupabaseArtifactFields() {
  const fields = {}

  memoryArtifactDefinitions.forEach(
    (definition) => {
      Object.values(
        definition.fields
      ).forEach(
        (fieldDefinition) => {
          fields[
            fieldDefinition.supabaseKey
          ] = null
        }
      )
    }
  )

  return fields
}

export {
  createMemoryArtifact,
  createMemoryArtifactFromLog,
  defineMemoryArtifact,
  getEmptyLegacyArtifactFields,
  getEmptySupabaseArtifactFields,
  getFirstArtifactValue,
  getMemoryArtifactDefinition,
  getMemoryArtifactDefinitionByType,
  memoryArtifactDefinitions,
  memoryArtifactRegistry,
  normalizeArtifactText,
}