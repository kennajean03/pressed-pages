import layoutSingleHero from "./keepsakePatterns/singleHero"
import layoutPhotoFan from "./keepsakePatterns/photoFan"
import layoutHeroMoment from "./keepsakePatterns/heroMoment"
import layoutMixedCluster from "./keepsakePatterns/mixedCluster"
import layoutFullSpread from "./keepsakePatterns/fullSpread"
import composeBookJourneyStory from "../../../scrapbook/composers/composeJourneyAnalysis"

export const ARRANGEMENT_PATTERNS = {
  singleHero: "singleHero",

  photoFan: "photoFan",

  heroMoment: "heroMoment",

  mixedCluster: "mixedCluster",

  fullSpread: "fullSpread",
}

const PHOTO_ROTATIONS = [
  -4.5,
  3,
  -2,
  4.25,
  -3.25,
  2,
]

const QUOTE_ROTATIONS = [
  1.4,
  -1.8,
  0.8,
  -0.9,
]

const FLOWER_ROTATIONS = [
  -9,
  6,
  -4,
  10,
  -6,
]

const PHOTO_SLOTS = [
  {
    desktop: {
      x: 6,
      y: 7,
      width: 24,
    },

    mobile: {
      x: 3,
      y: 5,
      width: 45,
    },
  },

  {
    desktop: {
      x: 36,
      y: 15,
      width: 24,
    },

    mobile: {
      x: 51,
      y: 19,
      width: 45,
    },
  },

  {
    desktop: {
      x: 68,
      y: 7,
      width: 24,
    },

    mobile: {
      x: 5,
      y: 39,
      width: 45,
    },
  },

  {
    desktop: {
      x: 55,
      y: 46,
      width: 23,
    },

    mobile: {
      x: 51,
      y: 54,
      width: 44,
    },
  },

  {
    desktop: {
      x: 18,
      y: 48,
      width: 23,
    },

    mobile: {
      x: 4,
      y: 70,
      width: 44,
    },
  },

  {
    desktop: {
      x: 72,
      y: 54,
      width: 22,
    },

    mobile: {
      x: 52,
      y: 80,
      width: 43,
    },
  },
]

const QUOTE_SLOTS = [
  {
    desktop: {
      x: 48,
      y: 2,
      width: 34,
    },

    mobile: {
      x: 17,
      y: 1,
      width: 72,
    },
  },

  {
    desktop: {
      x: 5,
      y: 44,
      width: 34,
    },

    mobile: {
      x: 4,
      y: 31,
      width: 72,
    },
  },

  {
    desktop: {
      x: 62,
      y: 35,
      width: 33,
    },

    mobile: {
      x: 23,
      y: 61,
      width: 72,
    },
  },

  {
    desktop: {
      x: 30,
      y: 58,
      width: 34,
    },

    mobile: {
      x: 6,
      y: 82,
      width: 74,
    },
  },
]

const FLOWER_SLOTS = [
  {
    desktop: {
      x: 39,
      y: 5,
      width: 15,
    },

    mobile: {
      x: 39,
      y: 15,
      width: 25,
    },
  },

  {
    desktop: {
      x: 79,
      y: 49,
      width: 15,
    },

    mobile: {
      x: 70,
      y: 48,
      width: 25,
    },
  },

  {
    desktop: {
      x: 23,
      y: 68,
      width: 14,
    },

    mobile: {
      x: 16,
      y: 73,
      width: 24,
    },
  },

  {
    desktop: {
      x: 1,
      y: 34,
      width: 14,
    },

    mobile: {
      x: 0,
      y: 47,
      width: 24,
    },
  },

  {
    desktop: {
      x: 55,
      y: 67,
      width: 14,
    },

    mobile: {
      x: 51,
      y: 88,
      width: 24,
    },
  },
]

function chooseArrangementPattern({
  photos,
  quotes,
  flowers,
}) {
  const photoCount =
    photos.length

  const quoteCount =
    quotes.length

  const flowerCount =
    flowers.length

  const totalCount =
    photoCount +
    quoteCount +
    flowerCount

  if (
    photoCount === 1 &&
    quoteCount === 0 &&
    flowerCount <= 1
  ) {
    return ARRANGEMENT_PATTERNS.singleHero
  }

  if (
    photoCount === 2 &&
    quoteCount <= 1 &&
    flowerCount <= 2
  ) {
    return ARRANGEMENT_PATTERNS.photoFan
  }

  if (
    photoCount === 3 &&
    totalCount <= 6
  ) {
    return ARRANGEMENT_PATTERNS.heroMoment
  }

  if (
    photoCount >= 4 ||
    totalCount >= 7
  ) {
    return ARRANGEMENT_PATTERNS.fullSpread
  }

  return ARRANGEMENT_PATTERNS.mixedCluster
}

function getMemoryId(
  memory = {},
  type,
  index
) {
  return (
    memory.id ||
    memory.memoryId ||
    `${type}-${index + 1}`
  )
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

function getRole(type, index) {
  if (type === "photo") {
    return index === 0
      ? "hero"
      : "supporting"
  }

  if (type === "quote") {
    return "supporting"
  }

  if (type === "flower") {
    return "accent"
  }

  return "supporting"
}

function getRotation(
  type,
  index
) {
  if (type === "photo") {
    return PHOTO_ROTATIONS[
      index %
        PHOTO_ROTATIONS.length
    ]
  }

  if (type === "quote") {
    return QUOTE_ROTATIONS[
      index %
        QUOTE_ROTATIONS.length
    ]
  }

  if (type === "flower") {
    return FLOWER_ROTATIONS[
      index %
        FLOWER_ROTATIONS.length
    ]
  }

  return 0
}

function getLayer(
  type,
  index
) {
  if (type === "quote") {
    return 10 + index
  }

  if (type === "photo") {
    return 30 + index
  }

  if (type === "flower") {
    return 50 + index
  }

  return 20 + index
}

function getSlot(
  slots,
  index
) {
  const slot =
    slots[
      index %
        slots.length
    ]

  const cycle =
    Math.floor(
      index /
        slots.length
    )

  if (cycle === 0) {
    return slot
  }

  return {
    desktop: {
      ...slot.desktop,

      y:
        slot.desktop.y +
        cycle * 8,
    },

    mobile: {
      ...slot.mobile,

      y:
        slot.mobile.y +
        cycle * 12,
    },
  }
}

function getFallbackPosition(
  type,
  index
) {
  if (type === "photo") {
    return getSlot(
      PHOTO_SLOTS,
      index
    )
  }

  if (type === "quote") {
    return getSlot(
      QUOTE_SLOTS,
      index
    )
  }

  if (type === "flower") {
    return getSlot(
      FLOWER_SLOTS,
      index
    )
  }

  return {
    desktop: {
      x: 10,
      y: 10,
      width: 28,
    },

    mobile: {
      x: 5,
      y: 10,
      width: 80,
    },
  }
}

function getAttachment(
  type,
  index
) {
  if (type === "photo") {
    return (
      index === 0 ||
      index % 3 === 0
    )
      ? "tape"
      : "none"
  }

  if (type === "flower") {
    return index % 2 === 0
      ? "tape"
      : "loose"
  }

  return "none"
}

function buildKeepsake({
  memory,
  type,
  index,
  photos,
}) {
  const id =
    getMemoryId(
      memory,
      type,
      index
    )

  const relatedPhoto =
    photos.length > 0
      ? photos[
          index %
            photos.length
        ]
      : null

  return {
    id,

    type,

    role:
      getRole(
        type,
        index
      ),

    memory,

    index,

    rotation:
      getRotation(
        type,
        index
      ),

    layer:
      getLayer(
        type,
        index
      ),

    position:
      getFallbackPosition(
        type,
        index
      ),

    attachment:
      getAttachment(
        type,
        index
      ),

    relationship:
      type === "quote" &&
      relatedPhoto
        ? {
            type: "tuckedUnder",

            targetId:
              getMemoryId(
                relatedPhoto,
                "photo",
                index %
                  photos.length
              ),

            visiblePercent: 0.78,
          }
        : type === "flower" &&
            relatedPhoto
          ? {
              type: "restsAcross",

              targetId:
                getMemoryId(
                  relatedPhoto,
                  "photo",
                  index %
                    photos.length
                ),
            }
          : null,

    preserveVisibility:
      type === "photo",
  }
}

function applyArrangementPattern({
  pattern,
  keepsakes,
}) {
  switch (pattern) {
    case ARRANGEMENT_PATTERNS.singleHero:
      return layoutSingleHero(
        keepsakes
    )

    case ARRANGEMENT_PATTERNS.photoFan:
        return layoutPhotoFan(
        keepsakes
    )

    case ARRANGEMENT_PATTERNS.heroMoment:
        return layoutHeroMoment(
        keepsakes
    )

    case ARRANGEMENT_PATTERNS.mixedCluster:
        return layoutMixedCluster(
        keepsakes
    )

    case ARRANGEMENT_PATTERNS.fullSpread:
        return layoutFullSpread(
        keepsakes
    )

    default:
        return keepsakes
  }
}

export function composeKeepsakeArrangement({
  photos = [],
  quotes = [],
  flowers = [],
} = {}) {
  const safePhotos =
    Array.isArray(photos)
      ? photos
      : []

  const safeQuotes =
    Array.isArray(quotes)
      ? quotes
      : []

  const safeFlowers =
    Array.isArray(flowers)
      ? flowers
      : []

  const story =
  composeBookJourneyStory({
    photos: safePhotos,
    quotes: safeQuotes,
    flowers: safeFlowers,
  })

  const pattern =
    chooseArrangementPattern({
      photos: safePhotos,
      quotes: safeQuotes,
      flowers: safeFlowers,
    })

  const photoKeepsakes =
    safePhotos.map(
      (memory, index) =>
        buildKeepsake({
          memory,
          type: "photo",
          index,
          photos: safePhotos,
        })
    )

  const quoteKeepsakes =
    safeQuotes.map(
      (memory, index) =>
        buildKeepsake({
          memory,
          type: "quote",
          index,
          photos: safePhotos,
        })
    )

  const flowerKeepsakes =
    safeFlowers.map(
      (memory, index) =>
        buildKeepsake({
          memory,
          type: "flower",
          index,
          photos: safePhotos,
        })
    )

  const baseKeepsakes = [
    ...quoteKeepsakes,
    ...photoKeepsakes,
    ...flowerKeepsakes,
  ].sort(
    (first, second) =>
      first.layer -
      second.layer
  )

  const keepsakes =
    applyArrangementPattern({
      pattern,
      keepsakes: baseKeepsakes,
    }).sort(
      (first, second) =>
        first.layer -
        second.layer
    )

  const total =
    keepsakes.length

  const density =
    getDensity(total)

  return {
    id:
      "book-journey-keepsake-arrangement",

    story,

    pattern,

    density,

    counts: {
      total,

      photos:
        photoKeepsakes.length,

      quotes:
        quoteKeepsakes.length,

      flowers:
        flowerKeepsakes.length,
    },

    hasPhotos:
      photoKeepsakes.length > 0,

    hasQuotes:
      quoteKeepsakes.length > 0,

    hasFlowers:
      flowerKeepsakes.length > 0,

    keepsakes,

    composition: {
      photosRemainVisible: true,

      quotesMayTuck: true,

      flowersActAsAccents: true,

      tapeRequiresPurpose: true,
    },
  }
}

export default composeKeepsakeArrangement