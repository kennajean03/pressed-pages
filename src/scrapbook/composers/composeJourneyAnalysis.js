const STORY_TYPES = {
  quietReflection:
    "quietReflection",

  visualJourney:
    "visualJourney",

  sharedMoments:
    "sharedMoments",

  treasuredCollection:
    "treasuredCollection",

  wordsRemembered:
    "wordsRemembered",
}

function getDensity(total) {
  if (total <= 1) {
    return "quiet"
  }

  if (total <= 3) {
    return "gathered"
  }

  if (total <= 7) {
    return "layered"
  }

  return "abundant"
}

function getDominantMemory({
  photos,
  quotes,
  flowers,
}) {
  const candidates = [
    {
      type: "photos",
      count: photos.length,
    },

    {
      type: "favoriteQuotes",
      count: quotes.length,
    },

    {
      type: "flowers",
      count: flowers.length,
    },
  ]

  candidates.sort(
    (a, b) =>
      b.count - a.count
  )

  return candidates[0].type
}

function getStoryType({
  photos,
  quotes,
  flowers,
}) {
  if (photos.length >= 4) {
    return STORY_TYPES.treasuredCollection
  }

  if (photos.length >= 2) {
    return STORY_TYPES.sharedMoments
  }

  if (photos.length === 1) {
    return STORY_TYPES.visualJourney
  }

  if (quotes.length >= 2) {
    return STORY_TYPES.wordsRemembered
  }

  return STORY_TYPES.quietReflection
}

function getPacing({
  sessions,
}) {
  if (sessions.length === 0) {
    return "unknown"
  }

  if (sessions.length <= 5) {
    return "focused"
  }

  if (sessions.length <= 20) {
    return "steady"
  }

  return "chaptered"
}

function buildEmphasis({
  dominantMemory,
  sessions,
}) {
  const emphasis = [
    dominantMemory,
  ]

  if (sessions.length >= 10) {
    emphasis.push(
      "readingJourney"
    )
  }

  return emphasis
}

function buildStrengths({
  photos,
  quotes,
  sessions,
}) {
  const strengths = []

  if (photos.length > 0) {
    strengths.push(
      "visualMemories"
    )
  }

  if (quotes.length > 0) {
    strengths.push(
      "writtenMemories"
    )
  }

  if (sessions.length >= 10) {
    strengths.push(
      "consistentReading"
    )
  }

  return strengths
}

export function composeJourneyAnalysis(
  journey = {}
) {
  const {
    photos = [],
    quotes = [],
    flowers = [],
    sessions = [],
    milestones = [],
  } = journey

  const totalArtifacts =
    photos.length +
    quotes.length +
    flowers.length +
    milestones.length

  const dominantMemory =
    getDominantMemory({
      photos,
      quotes,
      flowers,
    })

  return {
    storyType:
      getStoryType({
        photos,
        quotes,
        flowers,
      }),

    dominantMemory,

    density:
      getDensity(
        totalArtifacts
      ),

    pacing:
      getPacing({
        sessions,
      }),

    emphasis:
      buildEmphasis({
        dominantMemory,
        sessions,
      }),

    strengths:
      buildStrengths({
        photos,
        quotes,
        sessions,
      }),

    counts: {
      photos:
        photos.length,

      quotes:
        quotes.length,

      flowers:
        flowers.length,

      sessions:
        sessions.length,

      milestones:
        milestones.length,
    },
  }
}

export default composeJourneyAnalysis