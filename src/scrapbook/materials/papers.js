import softCleanParchment from "../../assets/scrapbook/papers/paper-base-parchment-soft-clean-01.jpg"
import warmAgedParchment from "../../assets/scrapbook/papers/paper-base-parchment-warm-aged-01.jpg"
import ivoryArchiveParchment from "../../assets/scrapbook/papers/paper-base-parchment-ivory-archive-01.jpg"
import antiqueManuscript from "../../assets/scrapbook/papers/paper-specialty-manuscript-antique-01.jpg"
import fadedLetter from "../../assets/scrapbook/papers/paper-specialty-letter-faded-antique-01.jpg"
import burnedWash from "../../assets/scrapbook/papers/paper-specialty-parchment-burned-wash-01.jpg"

export const paperMaterials = {
  cream: {
    id: "cream",
    name: "Cream Paper",
    className: "pp-paper-cream",
    tone: "warm",
    weight: "light",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: softCleanParchment,
    assets: {
      "01": softCleanParchment,
      "02": warmAgedParchment,
      "03": ivoryArchiveParchment,
    },
  },

  aged: {
    id: "aged",
    name: "Aged Paper",
    className: "pp-paper-aged",
    tone: "warm",
    weight: "medium",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: warmAgedParchment,
    assets: {
      "01": warmAgedParchment,
      "02": ivoryArchiveParchment,
      "03": softCleanParchment,
    },
  },

  linen: {
    id: "linen",
    name: "Linen Paper",
    className: "pp-paper-linen",
    tone: "neutral",
    weight: "medium",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: ivoryArchiveParchment,
    assets: {
      "01": ivoryArchiveParchment,
      "02": softCleanParchment,
      "03": warmAgedParchment,
    },
  },

  kraft: {
    id: "kraft",
    name: "Kraft Paper",
    className: "pp-paper-kraft",
    tone: "earthy",
    weight: "heavy",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: null,
  },

  journal: {
    id: "journal",
    name: "Journal Paper",
    className: "pp-paper-journal",
    tone: "warm",
    weight: "light",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: null,
  },

  watercolor: {
    id: "watercolor",
    name: "Watercolor Paper",
    className: "pp-paper-watercolor",
    tone: "soft",
    weight: "heavy",
    role: "base",
    rarity: "common",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export const specialtyPaperMaterials = {
  antiqueManuscript: {
    id: "antiqueManuscript",
    name: "Antique Manuscript Page",
    className: "pp-paper-manuscript",
    tone: "archival",
    weight: "heavy",
    role: "specialty",
    rarity: "rare",
    variants: ["01"],
    asset: antiqueManuscript,
    usage: ["annualScrapbook", "milestone", "collage", "profileAccent"],
    textSafety: "decorativeOnly",
  },

  fadedLetter: {
    id: "fadedLetter",
    name: "Faded Letter Page",
    className: "pp-paper-faded-letter",
    tone: "archival",
    weight: "medium",
    role: "specialty",
    rarity: "rare",
    variants: ["01"],
    asset: fadedLetter,
    usage: ["annualScrapbook", "collage", "profileAccent", "reviewAccent"],
    textSafety: "decorativeOnly",
  },

  burnedWash: {
    id: "burnedWash",
    name: "Burned Parchment Wash",
    className: "pp-paper-burned-wash",
    tone: "dramatic",
    weight: "heavy",
    role: "specialty",
    rarity: "epic",
    variants: ["01"],
    asset: burnedWash,
    usage: ["annualScrapbook", "milestone", "quote", "emotionalAccent"],
    textSafety: "cardLayerOnly",
  },
}

export const allPaperMaterials = {
  ...paperMaterials,
  ...specialtyPaperMaterials,
}

export function getPaperMaterial(paper = "cream") {
  return paperMaterials[paper] || paperMaterials.cream
}

export function getSpecialtyPaperMaterial(paper) {
  return specialtyPaperMaterials[paper] || null
}

export function getAnyPaperMaterial(paper = "cream") {
  return allPaperMaterials[paper] || paperMaterials.cream
}