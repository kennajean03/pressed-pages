export const stickerMaterials = {
  none: {
    id: "none",
    name: "No Sticker",
    className: "",
    asset: null,
  },

  favorite: {
    id: "favorite",
    name: "Favorite Sticker",
    className: "pp-sticker-favorite",
    asset: null,
  },

  fiveStar: {
    id: "fiveStar",
    name: "Five Star Sticker",
    className: "pp-sticker-five-star",
    asset: null,
  },

  buddyRead: {
    id: "buddyRead",
    name: "Buddy Read Sticker",
    className: "pp-sticker-buddy-read",
    asset: null,
  },

  annualScrapbook: {
    id: "annualScrapbook",
    name: "Annual Scrapbook Sticker",
    className: "pp-sticker-annual-scrapbook",
    asset: null,
  },
}

export function getStickerMaterial(sticker = "none") {
  return stickerMaterials[sticker] || stickerMaterials.none
}