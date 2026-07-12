const artifactRegistry = {
  photo: {
    id: "photo",
    label: "Reading Photo",
    category: "visual",
    gravityRole: "anchor",

    relationships: [
      "favorite-quote",
      "quote",
      "location",
      "reading-place",
      "flower",
      "ticket",
    ],

    attractions: {
      "favorite-quote": "strong",
      quote: "strong",
      location: "moderate",
      "reading-place": "moderate",
      flower: "gentle",
      ticket: "gentle",
    },
  },

  "favorite-quote": {
    id: "favorite-quote",
    label: "Favorite Quote",
    category: "text",
    gravityRole: "companion",

    aliases: [
      "quote",
    ],

    relationships: [
      "photo",
      "flower",
      "coffee",
      "song",
      "music",
    ],

    attractions: {
      photo: "strong",
      flower: "moderate",
      coffee: "gentle",
      song: "gentle",
      music: "gentle",
    },
  },

  quote: {
    id: "quote",
    label: "Quote",
    category: "text",
    gravityRole: "companion",

    canonicalType: "favorite-quote",

    relationships: [
      "photo",
      "flower",
      "coffee",
      "song",
      "music",
    ],

    attractions: {
      photo: "strong",
      flower: "moderate",
      coffee: "gentle",
      song: "gentle",
      music: "gentle",
    },
  },

  location: {
    id: "location",
    label: "Reading Location",
    category: "context",
    gravityRole: "detail",

    aliases: [
      "reading-place",
    ],

    relationships: [
      "photo",
      "favorite-quote",
      "quote",
    ],

    attractions: {
      photo: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
    },
  },

  "reading-place": {
    id: "reading-place",
    label: "Reading Place",
    category: "context",
    gravityRole: "detail",

    canonicalType: "location",

    relationships: [
      "photo",
      "favorite-quote",
      "quote",
    ],

    attractions: {
      photo: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
    },
  },

  coffee: {
    id: "coffee",
    label: "Coffee Memory",
    category: "sensory",
    gravityRole: "detail",

    relationships: [
      "favorite-quote",
      "quote",
      "song",
      "music",
      "photo",
    ],

    attractions: {
      "favorite-quote": "gentle",
      quote: "gentle",
      song: "moderate",
      music: "moderate",
      photo: "gentle",
    },
  },

  song: {
    id: "song",
    label: "Reading Song",
    category: "sensory",
    gravityRole: "detail",

    aliases: [
      "music",
    ],

    relationships: [
      "coffee",
      "favorite-quote",
      "quote",
      "photo",
    ],

    attractions: {
      coffee: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
      photo: "gentle",
    },
  },

  music: {
    id: "music",
    label: "Reading Music",
    category: "sensory",
    gravityRole: "detail",

    canonicalType: "song",

    relationships: [
      "coffee",
      "favorite-quote",
      "quote",
      "photo",
    ],

    attractions: {
      coffee: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
      photo: "gentle",
    },
  },

  flower: {
    id: "flower",
    label: "Pressed Flower",
    category: "emotional",
    gravityRole: "accent",

    relationships: [
      "favorite-quote",
      "quote",
      "photo",
    ],

    attractions: {
      "favorite-quote": "moderate",
      quote: "moderate",
      photo: "gentle",
    },
  },

  bookmark: {
    id: "bookmark",
    label: "Bookmark",
    category: "ephemera",
    gravityRole: "edge",

    relationships: [
      "favorite-scene",
      "ticket",
      "favorite-quote",
      "quote",
    ],

    attractions: {
      "favorite-scene": "strong",
      ticket: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
    },
  },

  ticket: {
    id: "ticket",
    label: "Ticket Stub",
    category: "ephemera",
    gravityRole: "detail",

    relationships: [
      "photo",
      "bookmark",
      "favorite-scene",
    ],

    attractions: {
      bookmark: "moderate",
      "favorite-scene": "moderate",
      photo: "gentle",
    },
  },

  "favorite-scene": {
    id: "favorite-scene",
    label: "Favorite Scene",
    category: "text",
    gravityRole: "companion",

    relationships: [
      "bookmark",
      "ticket",
      "photo",
      "favorite-quote",
      "quote",
    ],

    attractions: {
      bookmark: "strong",
      ticket: "moderate",
      photo: "moderate",
      "favorite-quote": "gentle",
      quote: "gentle",
    },
  },

  achievement: {
    id: "achievement",
    label: "Achievement",
    category: "milestone",
    gravityRole: "anchor",

    relationships: [
      "seal",
      "ribbon",
      "photo",
    ],

    attractions: {
      seal: "strong",
      ribbon: "strong",
      photo: "gentle",
    },
  },

  seal: {
    id: "seal",
    label: "Achievement Seal",
    category: "milestone",
    gravityRole: "accent",

    relationships: [
      "achievement",
      "ribbon",
    ],

    attractions: {
      achievement: "strong",
      ribbon: "moderate",
    },
  },

  ribbon: {
    id: "ribbon",
    label: "Ribbon",
    category: "milestone",
    gravityRole: "accent",

    relationships: [
      "achievement",
      "seal",
    ],

    attractions: {
      achievement: "strong",
      seal: "moderate",
    },
  },
}

function getArtifactDefinition(
  artifactType
) {
  return (
    artifactRegistry[
      artifactType
    ] || null
  )
}

function getCanonicalArtifactType(
  artifactType
) {
  const definition =
    getArtifactDefinition(
      artifactType
    )

  return (
    definition?.canonicalType ||
    artifactType
  )
}

function getArtifactCategory(
  artifactType
) {
  return (
    getArtifactDefinition(
      artifactType
    )?.category ||
    "unknown"
  )
}

function getArtifactGravityRole(
  artifactType
) {
  return (
    getArtifactDefinition(
      artifactType
    )?.gravityRole ||
    "detail"
  )
}

function getArtifactRelationships(
  artifactType
) {
  return (
    getArtifactDefinition(
      artifactType
    )?.relationships ||
    []
  )
}

function getArtifactAttractions(
  artifactType
) {
  return (
    getArtifactDefinition(
      artifactType
    )?.attractions ||
    {}
  )
}

function artifactTypeExists(
  artifactType
) {
  return Boolean(
    getArtifactDefinition(
      artifactType
    )
  )
}

export {
  artifactRegistry,
  artifactTypeExists,
  getArtifactAttractions,
  getArtifactCategory,
  getArtifactDefinition,
  getArtifactGravityRole,
  getArtifactRelationships,
  getCanonicalArtifactType,
}