export const stickerMaterials = {
  none: {
    id: "none",
    name: "No Sticker",
    className: "",
    variants: [],
    asset: null,
  },

  favorite: {
    id: "favorite",
    name: "Favorite Sticker",
    className: "pp-sticker-favorite",
    variants: ["01", "02", "03"],
    asset: null,
  },

  fiveStar: {
    id: "fiveStar",
    name: "Five Star Sticker",
    className: "pp-sticker-five-star",
    variants: ["01", "02", "03"],
    asset: null,
  },

  buddyRead: {
    id: "buddyRead",
    name: "Buddy Read Sticker",
    className: "pp-sticker-buddy-read",
    variants: ["01", "02", "03"],
    asset: null,
  },

  annualScrapbook: {
    id: "annualScrapbook",
    name: "Annual Scrapbook Sticker",
    className: "pp-sticker-annual-scrapbook",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export function getStickerMaterial(sticker = "none") {
  return stickerMaterials[sticker] || stickerMaterials.none
}