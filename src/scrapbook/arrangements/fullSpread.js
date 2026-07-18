const FULL_SPREAD_PHOTO_POSITIONS = [
  {
    desktop: {
      x: 5,
      y: 8,
      width: 26,
    },

    mobile: {
      x: 3,
      y: 7,
      width: 48,
    },
  },

  {
    desktop: {
      x: 35,
      y: 4,
      width: 27,
    },

    mobile: {
      x: 48,
      y: 17,
      width: 48,
    },
  },

  {
    desktop: {
      x: 67,
      y: 13,
      width: 26,
    },

    mobile: {
      x: 5,
      y: 38,
      width: 47,
    },
  },

  {
    desktop: {
      x: 18,
      y: 43,
      width: 27,
    },

    mobile: {
      x: 49,
      y: 50,
      width: 47,
    },
  },

  {
    desktop: {
      x: 50,
      y: 38,
      width: 28,
    },

    mobile: {
      x: 4,
      y: 69,
      width: 48,
    },
  },

  {
    desktop: {
      x: 70,
      y: 62,
      width: 24,
    },

    mobile: {
      x: 49,
      y: 80,
      width: 47,
    },
  },

  {
    desktop: {
      x: 7,
      y: 69,
      width: 25,
    },

    mobile: {
      x: 4,
      y: 100,
      width: 48,
    },
  },

  {
    desktop: {
      x: 38,
      y: 72,
      width: 26,
    },

    mobile: {
      x: 49,
      y: 111,
      width: 47,
    },
  },
]

const FULL_SPREAD_QUOTE_POSITIONS = [
  {
    desktop: {
      x: 23,
      y: 1,
      width: 35,
    },

    mobile: {
      x: 19,
      y: 1,
      width: 75,
    },
  },

  {
    desktop: {
      x: 57,
      y: 30,
      width: 36,
    },

    mobile: {
      x: 3,
      y: 31,
      width: 74,
    },
  },

  {
    desktop: {
      x: 4,
      y: 35,
      width: 35,
    },

    mobile: {
      x: 22,
      y: 62,
      width: 75,
    },
  },

  {
    desktop: {
      x: 30,
      y: 62,
      width: 37,
    },

    mobile: {
      x: 3,
      y: 93,
      width: 76,
    },
  },

  {
    desktop: {
      x: 59,
      y: 79,
      width: 35,
    },

    mobile: {
      x: 20,
      y: 124,
      width: 76,
    },
  },
]

const FULL_SPREAD_FLOWER_POSITIONS = [
  {
    desktop: {
      x: 27,
      y: 24,
      width: 14,
    },

    mobile: {
      x: 36,
      y: 28,
      width: 24,
    },
  },

  {
    desktop: {
      x: 61,
      y: 23,
      width: 15,
    },

    mobile: {
      x: 70,
      y: 43,
      width: 25,
    },
  },

  {
    desktop: {
      x: 41,
      y: 48,
      width: 14,
    },

    mobile: {
      x: 35,
      y: 59,
      width: 24,
    },
  },

  {
    desktop: {
      x: 8,
      y: 59,
      width: 15,
    },

    mobile: {
      x: 1,
      y: 79,
      width: 25,
    },
  },

  {
    desktop: {
      x: 76,
      y: 49,
      width: 15,
    },

    mobile: {
      x: 72,
      y: 75,
      width: 25,
    },
  },

  {
    desktop: {
      x: 29,
      y: 82,
      width: 14,
    },

    mobile: {
      x: 29,
      y: 108,
      width: 24,
    },
  },

  {
    desktop: {
      x: 65,
      y: 88,
      width: 14,
    },

    mobile: {
      x: 69,
      y: 119,
      width: 24,
    },
  },
]

const FULL_SPREAD_PHOTO_ROTATIONS = [
  -4.5,
  2.75,
  -2,
  4,
  -3.25,
  2,
  -1.5,
  3.5,
]

const FULL_SPREAD_QUOTE_ROTATIONS = [
  1.4,
  -1.7,
  0.8,
  -1.1,
  1.6,
]

const FULL_SPREAD_FLOWER_ROTATIONS = [
  -9,
  7,
  -5,
  10,
  -7,
  6,
  -4,
]

function getPosition(
  positions,
  index,
  desktopOffset = 11,
  mobileOffset = 31
) {
  const slot =
    positions[
      index %
        positions.length
    ]

  const cycle = Math.floor(
    index /
      positions.length
  )

  if (cycle === 0) {
    return slot
  }

  return {
    desktop: {
      ...slot.desktop,

      y:
        slot.desktop.y +
        cycle * desktopOffset,
    },

    mobile: {
      ...slot.mobile,

      y:
        slot.mobile.y +
        cycle * mobileOffset,
    },
  }
}

function getRotation(
  rotations,
  index
) {
  return rotations[
    index %
      rotations.length
  ]
}

function getNeighborPhoto(
  photos,
  index
) {
  if (photos.length === 0) {
    return null
  }

  return photos[
    index %
      photos.length
  ]
}

function getSecondaryPhoto(
  photos,
  index,
  primaryPhoto
) {
  if (photos.length < 2) {
    return null
  }

  const candidate =
    photos[
      (index + 1) %
        photos.length
    ]

  if (
    candidate?.id ===
    primaryPhoto?.id
  ) {
    return null
  }

  return candidate
}

export function layoutFullSpread(
  keepsakes = []
) {
  const photos =
    keepsakes.filter(
      (keepsake) =>
        keepsake.type === "photo"
    )

  const quotes =
    keepsakes.filter(
      (keepsake) =>
        keepsake.type === "quote"
    )

  const flowers =
    keepsakes.filter(
      (keepsake) =>
        keepsake.type === "flower"
    )

  const firstMemory =
    photos[0] ||
    quotes[0] ||
    flowers[0] ||
    null

  let photoIndex = 0
  let quoteIndex = 0
  let flowerIndex = 0

  return keepsakes.map(
    (keepsake) => {
      if (
        keepsake.type === "photo"
      ) {
        const currentPhotoIndex =
          photoIndex

        const position =
          getPosition(
            FULL_SPREAD_PHOTO_POSITIONS,
            currentPhotoIndex
          )

        const previousPhoto =
          currentPhotoIndex > 0
            ? photos[
                currentPhotoIndex -
                  1
              ]
            : null

        photoIndex += 1

        return {
          ...keepsake,

          role: "supporting",

          rotation:
            getRotation(
              FULL_SPREAD_PHOTO_ROTATIONS,
              currentPhotoIndex
            ),

          layer:
            31 +
            currentPhotoIndex,

          position,

          attachment:
            currentPhotoIndex === 0 ||
            currentPhotoIndex % 3 === 0
              ? "tape"
              : "none",

          relationship:
            previousPhoto
              ? {
                  type:
                    "gathersAround",

                  targetId:
                    previousPhoto.id,
                }
              : firstMemory &&
                  firstMemory.id !==
                    keepsake.id
                ? {
                    type:
                      "gathersAround",

                    targetId:
                      firstMemory.id,
                  }
                : null,

          preserveVisibility: true,
        }
      }

      if (
        keepsake.type === "quote"
      ) {
        const currentQuoteIndex =
          quoteIndex

        const position =
          getPosition(
            FULL_SPREAD_QUOTE_POSITIONS,
            currentQuoteIndex,
            12,
            32
          )

        const targetPhoto =
          getNeighborPhoto(
            photos,
            currentQuoteIndex
          )

        quoteIndex += 1

        return {
          ...keepsake,

          role: "supporting",

          rotation:
            getRotation(
              FULL_SPREAD_QUOTE_ROTATIONS,
              currentQuoteIndex
            ),

          layer:
            14 +
            currentQuoteIndex,

          position,

          attachment:
            currentQuoteIndex %
              3 ===
            2
              ? "tape"
              : "none",

          relationship:
            targetPhoto
              ? {
                  type:
                    "tuckedUnder",

                  targetId:
                    targetPhoto.id,

                  visiblePercent:
                    currentQuoteIndex %
                      2 ===
                    0
                      ? 0.76
                      : 0.82,
                }
              : firstMemory &&
                  firstMemory.id !==
                    keepsake.id
                ? {
                    type:
                      "gathersAround",

                    targetId:
                      firstMemory.id,
                  }
                : null,
        }
      }

      if (
        keepsake.type === "flower"
      ) {
        const currentFlowerIndex =
          flowerIndex

        const position =
          getPosition(
            FULL_SPREAD_FLOWER_POSITIONS,
            currentFlowerIndex,
            10,
            29
          )

        const targetPhoto =
          getNeighborPhoto(
            photos,
            currentFlowerIndex
          )

        const secondaryPhoto =
          getSecondaryPhoto(
            photos,
            currentFlowerIndex,
            targetPhoto
          )

        flowerIndex += 1

        return {
          ...keepsake,

          role: "accent",

          rotation:
            getRotation(
              FULL_SPREAD_FLOWER_ROTATIONS,
              currentFlowerIndex
            ),

          layer:
            52 +
            currentFlowerIndex,

          position,

          attachment:
            currentFlowerIndex %
              3 ===
            0
              ? "tape"
              : "loose",

          relationship:
            targetPhoto
              ? {
                  type:
                    secondaryPhoto
                      ? "bridges"
                      : "restsAcross",

                  targetId:
                    targetPhoto.id,

                  secondaryTargetId:
                    secondaryPhoto?.id,
                }
              : firstMemory &&
                  firstMemory.id !==
                    keepsake.id
                ? {
                    type:
                      "gathersAround",

                    targetId:
                      firstMemory.id,
                  }
                : null,
        }
      }

      return keepsake
    }
  )
}

export default layoutFullSpread