import { createScrapbookAsset } from "./assetSchema"
import { scrapbookAssetCategories, scrapbookAssetPlacements, scrapbookAssetTones } from "./assetCategories"
import softCleanParchment from "../../assets/scrapbook/papers/paper-base-parchment-soft-clean-01.jpg"
import warmAgedParchment from "../../assets/scrapbook/papers/paper-base-parchment-warm-aged-01.jpg"
import ivoryArchiveParchment from "../../assets/scrapbook/papers/paper-base-parchment-ivory-archive-01.jpg"

const P = scrapbookAssetPlacements
const T = scrapbookAssetTones
const C = scrapbookAssetCategories

export const scrapbookAssets = [
    createScrapbookAsset({
    id: "paper-base-parchment-soft-clean-01",
    name: "Soft Clean Parchment",
    category: C.paper,
    materialId: "cream",
    variant: "01",
    path: softCleanParchment,
    tones: [T.warm, T.soft],
    colors: ["cream", "ivory"],
    moods: ["cozy", "romance", "journal"],
    compatibleWith: ["cream", "aged", "linen", "watercolor"],
    placements: [P.background, P.card],
    className: "pp-paper-cream pp-asset-real-paper",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.62, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "paper-base-parchment-warm-aged-01",
    name: "Warm Aged Parchment",
    category: C.paper,
    materialId: "cream",
    variant: "02",
    path: warmAgedParchment,
    tones: [T.warm, T.earthy, T.muted],
    colors: ["tea", "parchment"],
    moods: ["vintage", "moody", "classic"],
    compatibleWith: ["cream", "aged", "linen", "kraft", "journal"],
    placements: [P.background, P.card],
    className: "pp-paper-aged pp-asset-real-paper",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.74, shadowDepth: "medium" },
  }),
  createScrapbookAsset({
    id: "paper-base-parchment-ivory-archive-01",
    name: "Ivory Archive Parchment",
    category: C.paper,
    materialId: "cream",
    variant: "03",
    path: ivoryArchiveParchment,
    tones: [T.warm, T.neutral, T.soft],
    colors: ["ivory", "cream"],
    moods: ["archive", "library", "classic"],
    compatibleWith: ["cream", "aged", "linen", "watercolor"],
    placements: [P.background, P.card],
    className: "pp-paper-linen pp-asset-real-paper",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.68, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "tape-washi-sage-placeholder-001",
    name: "Sage Washi Placeholder",
    category: C.tape,
    materialId: "sage-washi",
    variant: "01",
    tones: [T.earthy, T.soft],
    colors: ["sage", "cream"],
    moods: ["botanical", "cozy"],
    placements: [P.taped, P.corner, P.edge],
    className: "pp-asset-placeholder-tape pp-asset-tape-sage",
    physical: { thickness: "thin", transparency: 0.16, edgeSoftness: 0.58, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "tape-rose-placeholder-001",
    name: "Dusty Rose Tape Placeholder",
    category: C.tape,
    materialId: "rose-tape",
    variant: "02",
    tones: [T.warm, T.soft],
    colors: ["rose", "blush"],
    moods: ["romance", "soft", "feminine"],
    placements: [P.taped, P.corner, P.edge],
    className: "pp-asset-placeholder-tape pp-asset-tape-rose",
    physical: { thickness: "thin", transparency: 0.2, edgeSoftness: 0.64, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "flower-daisy-placeholder-001",
    name: "Pressed Daisy Placeholder",
    category: C.flower,
    materialId: "daisy",
    variant: "01",
    seasons: ["spring", "summer"],
    tones: [T.warm, T.soft],
    colors: ["cream", "yellow", "sage"],
    moods: ["romance", "cottagecore", "sunny"],
    compatibleWith: ["cream", "linen", "watercolor"],
    placements: [P.corner, P.tucked, P.behindPhoto, P.accent],
    className: "pp-asset-placeholder-flower pp-asset-flower-daisy",
    maxRotation: 18,
    physical: { thickness: "thin", transparency: 0.34, edgeSoftness: 0.82, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "flower-fern-placeholder-001",
    name: "Pressed Fern Placeholder",
    category: C.flower,
    materialId: "fern",
    variant: "02",
    seasons: ["spring", "summer", "autumn"],
    tones: [T.earthy, T.muted],
    colors: ["sage", "olive"],
    moods: ["fantasy", "nature", "archive"],
    compatibleWith: ["kraft", "aged", "cream"],
    placements: [P.corner, P.tucked, P.behindPhoto, P.divider],
    className: "pp-asset-placeholder-flower pp-asset-flower-fern",
    maxRotation: 22,
    physical: { thickness: "thin", transparency: 0.42, edgeSoftness: 0.76, shadowDepth: "soft" },
  }),
  createScrapbookAsset({
    id: "metal-paperclip-brass-placeholder-001",
    name: "Brass Paperclip Placeholder",
    category: C.metal,
    materialId: "brass-clip",
    variant: "01",
    tones: [T.warm, T.earthy],
    colors: ["brass", "gold"],
    moods: ["archive", "classic", "library"],
    placements: [P.pinned, P.corner, P.overPhoto],
    className: "pp-asset-placeholder-metal pp-asset-paperclip-brass",
    physical: { thickness: "raised", transparency: 0, edgeSoftness: 0.28, shadowDepth: "crisp" },
  }),
  createScrapbookAsset({
    id: "texture-coffee-ring-placeholder-001",
    name: "Coffee Ring Placeholder",
    category: C.texture,
    materialId: "coffee-ring",
    variant: "01",
    tones: [T.warm, T.earthy],
    colors: ["coffee", "sepia"],
    moods: ["vintage", "messy", "late-night-reading"],
    placements: [P.background, P.edge],
    className: "pp-asset-placeholder-texture pp-asset-coffee-ring",
    canFlip: false,
    physical: { thickness: "flat", transparency: 0.58, edgeSoftness: 0.9, shadowDepth: "none" },
  }),
  createScrapbookAsset({
    id: "ephemera-library-card-placeholder-001",
    name: "Library Card Placeholder",
    category: C.ephemera,
    materialId: "library-card",
    variant: "01",
    tones: [T.warm, T.neutral],
    colors: ["cream", "ink"],
    moods: ["library", "archive", "classic"],
    placements: [P.tucked, P.behindPhoto, P.card],
    className: "pp-asset-placeholder-ephemera pp-asset-library-card",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.44, shadowDepth: "medium" },
  }),
]

export function getScrapbookAsset(assetId) {
  return scrapbookAssets.find((asset) => asset.id === assetId) || null
}

export function getScrapbookAssetsByCategory(category) {
  return scrapbookAssets.filter((asset) => asset.category === category)
}

export function getScrapbookAssetsByMaterial(materialId, category) {
  return scrapbookAssets.filter((asset) => {
    if (category && asset.category !== category) return false
    return asset.materialId === materialId
  })
}
