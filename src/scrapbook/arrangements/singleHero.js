const SINGLE_HERO_PHOTO_POSITION = {
  desktop: {
    x: 34,
    y: 11,
    width: 32,
  },

  mobile: {
    x: 15,
    y: 9,
    width: 70,
  },
}

const SINGLE_HERO_FLOWER_POSITIONS = [
  {
    desktop: {
      x: 61,
      y: 13,
      width: 15,
    },

    mobile: {
      x: 67,
      y: 12,
      width: 26,
    },
  },

  {
    desktop: {
      x: 23,
      y: 48,
      width: 14,
    },

    mobile: {
      x: 7,
      y: 48,
      width: 25,
    },
  },

  {
    desktop: {
      x: 58,
      y: 53,
      width: 14,
    },

    mobile: {
      x: 66,
      y: 55,
      width: 24,
    },
  },
]

function getFlowerPosition(index) {
  const slot =
    SINGLE_HERO_FLOWER_POSITIONS[
      index %
        SINGLE_HERO_FLOWER_POSITIONS.length
    ]

  const cycle = Math.floor(
    index /
      SINGLE_HERO_FLOWER_POSITIONS.length
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

export function layoutSingleHero(
  keepsakes = []
) {
  const heroPhoto =
    keepsakes.find(
      (keepsake) =>
        keepsake.type === "photo"
    ) || null

  let flowerIndex = 0

  return keepsakes.map(
    (keepsake) => {
      if (
        keepsake.type === "photo"
      ) {
        return {
          ...keepsake,

          role: "hero",

          rotation: -2.25,

          layer: 30,

          position:
            SINGLE_HERO_PHOTO_POSITION,

          attachment: "tape",

          relationship: null,

          preserveVisibility: true,
        }
      }

      if (
        keepsake.type === "flower"
      ) {
        const position =
          getFlowerPosition(
            flowerIndex
          )

        const currentFlowerIndex =
          flowerIndex

        flowerIndex += 1

        return {
          ...keepsake,

          role: "accent",

          rotation:
            currentFlowerIndex %
              2 ===
            0
              ? 7
              : -8,

          layer:
            50 +
            currentFlowerIndex,

          position,

          attachment:
            currentFlowerIndex === 0
              ? "tape"
              : "loose",

          relationship:
            heroPhoto
              ? {
                  type: "restsAcross",

                  targetId:
                    heroPhoto.id,
                }
              : null,
        }
      }

      return keepsake
    }
  )
}

export default layoutSingleHero