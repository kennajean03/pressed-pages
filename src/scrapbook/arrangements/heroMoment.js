const HERO_MOMENT_PHOTO_POSITIONS = [
  {
    desktop: {
      x: 34,
      y: 7,
      width: 32,
    },

    mobile: {
      x: 18,
      y: 5,
      width: 64,
    },
  },

  {
    desktop: {
      x: 12,
      y: 36,
      width: 27,
    },

    mobile: {
      x: 3,
      y: 43,
      width: 49,
    },
  },

  {
    desktop: {
      x: 61,
      y: 37,
      width: 27,
    },

    mobile: {
      x: 48,
      y: 49,
      width: 49,
    },
  },
]

const HERO_MOMENT_QUOTE_POSITIONS = [
  {
    desktop: {
      x: 7,
      y: 8,
      width: 35,
    },

    mobile: {
      x: 3,
      y: 1,
      width: 72,
    },
  },

  {
    desktop: {
      x: 57,
      y: 10,
      width: 35,
    },

    mobile: {
      x: 25,
      y: 30,
      width: 72,
    },
  },

  {
    desktop: {
      x: 32,
      y: 61,
      width: 36,
    },

    mobile: {
      x: 9,
      y: 76,
      width: 78,
    },
  },
]

const HERO_MOMENT_FLOWER_POSITIONS = [
  {
    desktop: {
      x: 29,
      y: 30,
      width: 15,
    },

    mobile: {
      x: 29,
      y: 36,
      width: 25,
    },
  },

  {
    desktop: {
      x: 56,
      y: 31,
      width: 15,
    },

    mobile: {
      x: 58,
      y: 41,
      width: 25,
    },
  },

  {
    desktop: {
      x: 44,
      y: 61,
      width: 14,
    },

    mobile: {
      x: 39,
      y: 72,
      width: 24,
    },
  },

  {
    desktop: {
      x: 7,
      y: 57,
      width: 14,
    },

    mobile: {
      x: 2,
      y: 68,
      width: 24,
    },
  },

  {
    desktop: {
      x: 80,
      y: 57,
      width: 14,
    },

    mobile: {
      x: 74,
      y: 69,
      width: 24,
    },
  },
]

function getPosition(
  positions,
  index,
  desktopOffset = 7,
  mobileOffset = 10
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

export function layoutHeroMoment(
  keepsakes = []
) {
  const photos =
    keepsakes.filter(
      (keepsake) =>
        keepsake.type === "photo"
    )

  const heroPhoto =
    photos[0] || null

  const leftSupportingPhoto =
    photos[1] || null

  const rightSupportingPhoto =
    photos[2] || null

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
          HERO_MOMENT_PHOTO_POSITIONS[
            currentPhotoIndex %
              HERO_MOMENT_PHOTO_POSITIONS.length
          ]

        photoIndex += 1

        const isHero =
          currentPhotoIndex === 0

        return {
          ...keepsake,

          role:
            isHero
              ? "hero"
              : "supporting",

          rotation:
            currentPhotoIndex === 0
              ? -1.5
              : currentPhotoIndex === 1
                ? -5
                : 4.5,

          layer:
            isHero
              ? 38
              : 32 +
                currentPhotoIndex,

          position,

          attachment:
            isHero
              ? "tape"
              : "none",

          relationship:
            isHero || !heroPhoto
              ? null
              : {
                  type: "supports",

                  targetId:
                    heroPhoto.id,
                },

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
            HERO_MOMENT_QUOTE_POSITIONS,
            currentQuoteIndex,
            8,
            12
          )

        quoteIndex += 1

        const targetPhoto =
          currentQuoteIndex === 0
            ? leftSupportingPhoto ||
              heroPhoto
            : currentQuoteIndex === 1
              ? rightSupportingPhoto ||
                heroPhoto
              : heroPhoto

        return {
          ...keepsake,

          role: "supporting",

          rotation:
            currentQuoteIndex %
              2 ===
            0
              ? 1.25
              : -1.5,

          layer:
            16 +
            currentQuoteIndex,

          position,

          attachment: "none",

          relationship:
            targetPhoto
              ? {
                  type: "tuckedUnder",

                  targetId:
                    targetPhoto.id,

                  visiblePercent: 0.74,
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
            HERO_MOMENT_FLOWER_POSITIONS,
            currentFlowerIndex
          )

        flowerIndex += 1

        let targetPhoto =
          heroPhoto

        let secondaryTargetId

        if (
          currentFlowerIndex === 0
        ) {
          targetPhoto =
            leftSupportingPhoto ||
            heroPhoto

          secondaryTargetId =
            heroPhoto?.id
        }

        if (
          currentFlowerIndex === 1
        ) {
          targetPhoto =
            rightSupportingPhoto ||
            heroPhoto

          secondaryTargetId =
            heroPhoto?.id
        }

        if (
          currentFlowerIndex >= 2
        ) {
          targetPhoto =
            heroPhoto
        }

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
                  type:
                    secondaryTargetId
                      ? "bridges"
                      : "restsAcross",

                  targetId:
                    targetPhoto.id,

                  secondaryTargetId,
                }
              : null,
        }
      }

      return keepsake
    }
  )
}

export default layoutHeroMoment