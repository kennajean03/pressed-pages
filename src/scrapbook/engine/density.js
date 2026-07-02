export const scrapbookDensity = {
  minimal: {
    tape: true,
    flower: false,
    clip: false,
    sticker: false,
    texture: true,
  },

  balanced: {
    tape: true,
    flower: true,
    clip: false,
    sticker: false,
    texture: true,
  },

  rich: {
    tape: true,
    flower: true,
    clip: true,
    sticker: true,
    texture: true,
  },
}

export function getScrapbookDensity(density = "balanced") {
  return scrapbookDensity[density] || scrapbookDensity.balanced
}