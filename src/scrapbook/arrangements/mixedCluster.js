const MIXED_CLUSTER_PHOTO_POSITIONS = [
  {
    desktop: {
      x: 28,
      y: 13,
      width: 34,
    },

    mobile: {
      x: 12,
      y: 10,
      width: 68,
    },
  },

  {
    desktop: {
      x: 55,
      y: 38,
      width: 27,
    },

    mobile: {
      x: 44,
      y: 46,
      width: 52,
    },
  },
]

const MIXED_CLUSTER_QUOTE_POSITIONS = [
  {
    desktop: {
      x: 48,
      y: 5,
      width: 38,
    },

    mobile: {
      x: 23,
      y: 2,
      width: 72,
    },
  },

  {
    desktop: {
      x: 8,
      y: 42,
      width: 38,
    },

    mobile: {
      x: 3,
      y: 48,
      width: 74,
    },
  },

  {
    desktop: {
      x: 34,
      y: 61,
      width: 38,
    },

    mobile: {
      x: 12,
      y: 76,
      width: 76,
    },
  },
]

const MIXED_CLUSTER_FLOWER_POSITIONS = [
  {
    desktop: {
      x: 22,
      y: 8,
      width: 15,
    },

    mobile: {
      x: 4,
      y: 8,
      width: 26,
    },
  },

  {
    desktop: {
      x: 61,
      y: 31,
      width: 15,
    },

    mobile: {
      x: 68,
      y: 36,
      width: 26,
    },
  },

  {
    desktop: {
      x: 27,
      y: 57,
      width: 14,
    },

    mobile: {
      x: 18,
      y: 67,
      width: 24,
    },
  },

  {
    desktop: {
      x: 73,
      y: 58,
      width: 14,
    },

    mobile: {
      x: 71,
      y: 72,
      width: 24,
    },
  },
]

function getPosition(
  positions,
  index,
  desktopOffset = 8,
  mobileOffset = 11
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

function chooseAnchor(
  photos,
  quotes,
  flowers
) {
  return (
    photos[0] ||
    quotes[0] ||
    flowers[0] ||
    null
  )
}

export function layoutMixedCluster(
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

  const anchor =
    chooseAnchor(
      photos,
      quotes,
      flowers
    )

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
            MIXED_CLUSTER_PHOTO_POSITIONS,
            currentPhotoIndex
          )

        photoIndex += 1

        const isAnchor =
          keepsake.id ===
          anchor?.id

        return {
          ...keepsake,

          role:
            isAnchor
              ? "hero"
              : "supporting",

          rotation:
            currentPhotoIndex %
              2 ===
            0
              ? -3
              : 3.5,

          layer:
            isAnchor
              ? 36
              : 32 +
                currentPhotoIndex,

          position,

          attachment:
            isAnchor
              ? "tape"
              : "none",

          relationship:
            isAnchor ||
            !anchor
              ? null
              : {
                  type: "gathersAround",

                  targetId:
                    anchor.id,
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
            MIXED_CLUSTER_QUOTE_POSITIONS,
            currentQuoteIndex
          )

        quoteIndex += 1

        const isAnchor =
          keepsake.id ===
          anchor?.id

        const targetPhoto =
          photos[
            currentQuoteIndex %
              Math.max(
                photos.length,
                1
              )
          ] || photos[0] || null

        return {
          ...keepsake,

          role:
            isAnchor
              ? "hero"
              : "supporting",

          rotation:
            currentQuoteIndex %
              2 ===
            0
              ? 1.3
              : -1.6,

          layer:
            isAnchor
              ? 28
              : 16 +
                currentQuoteIndex,

          position,

          attachment:
            isAnchor
              ? "tape"
              : "none",

          relationship:
            targetPhoto
              ? {
                  type: "tuckedUnder",

                  targetId:
                    targetPhoto.id,

                  visiblePercent: 0.78,
                }
              : isAnchor ||
                  !anchor
                ? null
                : {
                    type:
                      "gathersAround",

                    targetId:
                      anchor.id,
                  },
        }
      }

      if (
        keepsake.type === "flower"
      ) {
        const currentFlowerIndex =
          flowerIndex

        const position =
          getPosition(
            MIXED_CLUSTER_FLOWER_POSITIONS,
            currentFlowerIndex
          )

        flowerIndex += 1

        const target =
          photos[
            currentFlowerIndex %
              Math.max(
                photos.length,
                1
              )
          ] ||
          anchor

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
            50 +
            currentFlowerIndex,

          position,

          attachment:
            currentFlowerIndex === 0
              ? "tape"
              : "loose",

          relationship:
            target
              ? {
                  type:
                    photos.length > 0
                      ? "restsAcross"
                      : "gathersAround",

                  targetId:
                    target.id,
                }
              : null,
        }
      }

      return keepsake
    }
  )
}

export default layoutMixedCluster