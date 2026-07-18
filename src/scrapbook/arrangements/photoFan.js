const PHOTO_FAN_POSITIONS = [
  {
    desktop: {
      x: 24,
      y: 10,
      width: 31,
    },

    mobile: {
      x: 6,
      y: 8,
      width: 58,
    },
  },

  {
    desktop: {
      x: 47,
      y: 19,
      width: 30,
    },

    mobile: {
      x: 39,
      y: 25,
      width: 57,
    },
  },
]

const PHOTO_FAN_QUOTE_POSITION = {
  desktop: {
    x: 35,
    y: 3,
    width: 35,
  },

  mobile: {
    x: 18,
    y: 2,
    width: 72,
  },
}

const PHOTO_FAN_FLOWER_POSITIONS = [
  {
    desktop: {
      x: 43,
      y: 13,
      width: 15,
    },

    mobile: {
      x: 42,
      y: 17,
      width: 25,
    },
  },

  {
    desktop: {
      x: 67,
      y: 44,
      width: 14,
    },

    mobile: {
      x: 70,
      y: 48,
      width: 24,
    },
  },

  {
    desktop: {
      x: 20,
      y: 49,
      width: 14,
    },

    mobile: {
      x: 4,
      y: 52,
      width: 24,
    },
  },
]

function getFlowerPosition(index) {
  const slot =
    PHOTO_FAN_FLOWER_POSITIONS[
      index %
        PHOTO_FAN_FLOWER_POSITIONS.length
    ]

  const cycle = Math.floor(
    index /
      PHOTO_FAN_FLOWER_POSITIONS.length
  )

  if (cycle === 0) {
    return slot
  }

  return {
    desktop: {
      ...slot.desktop,

      y:
        slot.desktop.y +
        cycle * 7,
    },

    mobile: {
      ...slot.mobile,

      y:
        slot.mobile.y +
        cycle * 10,
    },
  }
}

export function layoutPhotoFan(
  keepsakes = []
) {
  const photos =
    keepsakes.filter(
      (keepsake) =>
        keepsake.type === "photo"
    )

  const heroPhoto =
    photos[0] || null

  const supportingPhoto =
    photos[1] || null

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
          PHOTO_FAN_POSITIONS[
            currentPhotoIndex %
              PHOTO_FAN_POSITIONS.length
          ]

        photoIndex += 1

        return {
          ...keepsake,

          role:
            currentPhotoIndex === 0
              ? "hero"
              : "supporting",

          rotation:
            currentPhotoIndex === 0
              ? -5
              : 4,

          layer:
            currentPhotoIndex === 0
              ? 32
              : 34,

          position,

          attachment:
            currentPhotoIndex === 0
              ? "tape"
              : "none",

          relationship:
            currentPhotoIndex === 1 &&
            heroPhoto
              ? {
                  type: "fansBeside",

                  targetId:
                    heroPhoto.id,
                }
              : null,

          preserveVisibility: true,
        }
      }

      if (
        keepsake.type === "quote"
      ) {
        const targetPhoto =
          supportingPhoto ||
          heroPhoto

        const currentQuoteIndex =
          quoteIndex

        quoteIndex += 1

        return {
          ...keepsake,

          role: "supporting",

          rotation:
            currentQuoteIndex %
              2 ===
            0
              ? 1.5
              : -1.25,

          layer:
            18 +
            currentQuoteIndex,

          position: {
            desktop: {
              ...PHOTO_FAN_QUOTE_POSITION.desktop,

              y:
                PHOTO_FAN_QUOTE_POSITION
                  .desktop.y +
                currentQuoteIndex * 8,
            },

            mobile: {
              ...PHOTO_FAN_QUOTE_POSITION.mobile,

              y:
                PHOTO_FAN_QUOTE_POSITION
                  .mobile.y +
                currentQuoteIndex * 12,
            },
          },

          attachment: "none",

          relationship:
            targetPhoto
              ? {
                  type: "tuckedUnder",

                  targetId:
                    targetPhoto.id,

                  visiblePercent: 0.72,
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
          getFlowerPosition(
            currentFlowerIndex
          )

        flowerIndex += 1

        const targetPhoto =
          currentFlowerIndex %
            2 ===
          0
            ? heroPhoto
            : supportingPhoto ||
              heroPhoto

        return {
          ...keepsake,

          role: "accent",

          rotation:
            currentFlowerIndex %
              2 ===
            0
              ? 8
              : -7,

          layer:
            52 +
            currentFlowerIndex,

          position,

          attachment:
            currentFlowerIndex === 0
              ? "tape"
              : "loose",

          relationship:
            targetPhoto
              ? {
                  type: "bridges",

                  targetId:
                    targetPhoto.id,

                  secondaryTargetId:
                    heroPhoto &&
                    supportingPhoto
                      ? supportingPhoto.id
                      : undefined,
                }
              : null,
        }
      }

      return keepsake
    }
  )
}

export default layoutPhotoFan