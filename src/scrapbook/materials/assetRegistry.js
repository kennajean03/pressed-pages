import { createScrapbookAsset } from "./assetSchema"
import { scrapbookAssetCategories, scrapbookAssetPlacements, scrapbookAssetTones } from "./assetCategories"

import softCleanParchment from "../../assets/scrapbook/papers/paper-base-parchment-soft-clean-01.jpg"
import warmAgedParchment from "../../assets/scrapbook/papers/paper-base-parchment-warm-aged-01.jpg"
import ivoryArchiveParchment from "../../assets/scrapbook/papers/paper-base-parchment-ivory-archive-01.jpg"

import handmadeCreamPaper from "../../assets/scrapbook/papers/paper-sheet-handmade-cream-01.png"
import handmadePaperScrap from "../../assets/scrapbook/papers/paper-scrap-handmade-01.png"

import notebookCreamPaper from "../../assets/scrapbook/papers/notebook-paper-cream-01.png"
import notebookGridPaper from "../../assets/scrapbook/papers/notebook-paper-grid-01.png"

import maskingCreamTape from "../../assets/scrapbook/tape/tape-masking-cream-01.png"
import transparentTape from "../../assets/scrapbook/tape/tape-transparent-01.png"

import libraryCardCheckout01 from "../../assets/scrapbook/cards/library-card-checkout-01.png"
import libraryCardCheckout02 from "../../assets/scrapbook/cards/library-card-checkout-02.png"
import libraryCardClean01 from "../../assets/scrapbook/cards/library-card-clean-01.png"

import flowerDaisyWhite01 from "../../assets/scrapbook/flowers/flower-daisy-white-01.png"
import leafFern01 from "../../assets/scrapbook/flowers/leaf-fern-01.png"
import flowerBabysBreath01 from "../../assets/scrapbook/flowers/flower-babys-breath-01.png"

import bookmarkKraft01 from "../../assets/scrapbook/bookmarks/bookmark-kraft-01.png"

import coffeeRing01 from "../../assets/scrapbook/stains/coffee-ring-01.png"

import libraryStamp01 from "../../assets/scrapbook/stamps/library-stamp-01.png"

const P = scrapbookAssetPlacements
const T = scrapbookAssetTones
const C = scrapbookAssetCategories

export const scrapbookAssets = [
  createScrapbookAsset({
    id: "paper-sheet-handmade-cream-01",
    name: "Handmade Cream Paper",
    category: C.paper,
    materialId: "handmade-cream",
    variant: "01",
    path: handmadeCreamPaper,
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "ivory"],
    moods: ["cozy", "romance", "journal", "scrapbook"],
    compatibleWith: ["cream", "aged", "linen", "kraft", "watercolor"],
    placements: [P.background, P.card],
    className: "pp-paper-handmade-cream pp-asset-real-paper",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.78, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "paper-scrap-handmade-01",
    name: "Handmade Paper Scrap",
    category: C.paper,
    materialId: "handmade-scrap",
    variant: "01",
    path: handmadePaperScrap,
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "ivory"],
    moods: ["cozy", "scrapbook", "handmade"],
    compatibleWith: ["cream", "aged", "linen", "kraft", "watercolor"],
    placements: [P.background, P.card, P.tucked],
    className: "pp-paper-handmade-scrap pp-asset-real-paper",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.86, shadowDepth: "medium" },
  }),

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
    id: "notebook-paper-cream-01",
    name: "Cream Notebook Paper",
    category: C.paper,
    materialId: "notebook-ruled",
    variant: "01",
    path: notebookCreamPaper,
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "ink"],
    moods: ["journal", "notes", "reflection"],
    compatibleWith: ["cream", "linen", "library-card"],
    placements: [P.card, P.tucked, P.background],
    className: "pp-notebook-paper-cream pp-asset-real-paper",
    physical: { thickness: "thin", transparency: 0, edgeSoftness: 0.54, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "notebook-paper-grid-01",
    name: "Cream Dot Grid Notebook Paper",
    category: C.paper,
    materialId: "notebook-grid",
    variant: "01",
    path: notebookGridPaper,
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "ink"],
    moods: ["tracker", "planner", "analytics", "journal"],
    compatibleWith: ["cream", "linen", "library-card"],
    placements: [P.card, P.tucked, P.background],
    className: "pp-notebook-paper-grid pp-asset-real-paper",
    physical: { thickness: "thin", transparency: 0, edgeSoftness: 0.54, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "tape-masking-cream-01",
    name: "Cream Masking Tape",
    category: C.tape,
    materialId: "masking-cream",
    variant: "01",
    path: maskingCreamTape,
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "beige"],
    moods: ["cozy", "journal", "handmade"],
    placements: [P.taped, P.corner, P.edge],
    className: "pp-asset-real-tape pp-asset-tape-masking-cream",
    physical: { thickness: "thin", transparency: 0.12, edgeSoftness: 0.68, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "tape-transparent-01",
    name: "Transparent Matte Tape",
    category: C.tape,
    materialId: "transparent-tape",
    variant: "01",
    path: transparentTape,
    tones: [T.neutral, T.soft],
    colors: ["frosted", "clear"],
    moods: ["quiet", "archive", "minimal"],
    placements: [P.taped, P.corner, P.edge],
    className: "pp-asset-real-tape pp-asset-tape-transparent",
    physical: { thickness: "thin", transparency: 0.42, edgeSoftness: 0.72, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "library-card-checkout-01",
    name: "Library Checkout Card",
    category: C.ephemera,
    materialId: "library-card",
    variant: "01",
    path: libraryCardCheckout01,
    tones: [T.warm, T.neutral],
    colors: ["cream", "ink"],
    moods: ["library", "archive", "classic"],
    placements: [P.tucked, P.behindPhoto, P.card],
    className: "pp-asset-real-ephemera pp-asset-library-card",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.46, shadowDepth: "medium" },
  }),

  createScrapbookAsset({
    id: "library-card-checkout-02",
    name: "Library Checkout Card Alternate",
    category: C.ephemera,
    materialId: "library-card",
    variant: "02",
    path: libraryCardCheckout02,
    tones: [T.warm, T.neutral],
    colors: ["cream", "ink"],
    moods: ["library", "archive", "classic"],
    placements: [P.tucked, P.behindPhoto, P.card],
    className: "pp-asset-real-ephemera pp-asset-library-card-alt",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.46, shadowDepth: "medium" },
  }),

  createScrapbookAsset({
    id: "library-card-clean-01",
    name: "Clean Library Metadata Card",
    category: C.ephemera,
    materialId: "library-metadata-card",
    variant: "01",
    path: libraryCardClean01,
    tones: [T.warm, T.neutral, T.soft],
    colors: ["cream", "ink"],
    moods: ["library", "metadata", "clean"],
    placements: [P.tucked, P.behindPhoto, P.card],
    className: "pp-asset-real-ephemera pp-asset-library-card-clean",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.42, shadowDepth: "medium" },
  }),

  createScrapbookAsset({
    id: "flower-daisy-white-01",
    name: "Pressed White Daisy",
    category: C.flower,
    materialId: "daisy",
    variant: "01",
    path: flowerDaisyWhite01,
    seasons: ["spring", "summer"],
    tones: [T.warm, T.soft],
    colors: ["cream", "yellow", "sage"],
    moods: ["romance", "cottagecore", "sunny"],
    compatibleWith: ["cream", "linen", "watercolor"],
    placements: [P.corner, P.tucked, P.behindPhoto, P.accent],
    className: "pp-asset-real-flower pp-asset-flower-daisy",
    maxRotation: 18,
    physical: { thickness: "thin", transparency: 0.22, edgeSoftness: 0.86, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "leaf-fern-01",
    name: "Pressed Fern Leaf",
    category: C.flower,
    materialId: "fern",
    variant: "01",
    path: leafFern01,
    seasons: ["spring", "summer", "autumn"],
    tones: [T.earthy, T.muted],
    colors: ["sage", "olive"],
    moods: ["fantasy", "nature", "archive"],
    compatibleWith: ["kraft", "aged", "cream"],
    placements: [P.corner, P.tucked, P.behindPhoto, P.divider],
    className: "pp-asset-real-flower pp-asset-leaf-fern",
    maxRotation: 22,
    physical: { thickness: "thin", transparency: 0.28, edgeSoftness: 0.8, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "flower-babys-breath-01",
    name: "Pressed Baby's Breath",
    category: C.flower,
    materialId: "babys-breath",
    variant: "01",
    path: flowerBabysBreath01,
    seasons: ["spring", "summer"],
    tones: [T.warm, T.soft, T.neutral],
    colors: ["cream", "sage"],
    moods: ["soft", "romance", "filler", "delicate"],
    compatibleWith: ["cream", "linen", "watercolor", "kraft"],
    placements: [P.corner, P.tucked, P.behindPhoto, P.accent],
    className: "pp-asset-real-flower pp-asset-flower-babys-breath",
    maxRotation: 16,
    physical: { thickness: "thin", transparency: 0.32, edgeSoftness: 0.9, shadowDepth: "soft" },
  }),

  createScrapbookAsset({
    id: "bookmark-kraft-01",
    name: "Kraft Bookmark",
    category: C.ephemera,
    materialId: "kraft-bookmark",
    variant: "01",
    path: bookmarkKraft01,
    tones: [T.warm, T.earthy, T.neutral],
    colors: ["kraft", "brown"],
    moods: ["cozy", "library", "journal"],
    compatibleWith: ["cream", "aged", "linen"],
    placements: [P.tucked, P.behindPhoto, P.edge],
    className: "pp-asset-real-ephemera pp-asset-bookmark-kraft",
    physical: { thickness: "medium", transparency: 0, edgeSoftness: 0.48, shadowDepth: "medium" },
  }),

  createScrapbookAsset({
    id: "coffee-ring-01",
    name: "Coffee Ring",
    category: C.texture,
    materialId: "coffee-ring",
    variant: "01",
    path: coffeeRing01,
    tones: [T.warm, T.earthy],
    colors: ["coffee", "sepia"],
    moods: ["vintage", "messy", "late-night-reading"],
    placements: [P.background, P.edge],
    className: "pp-asset-real-texture pp-asset-coffee-ring",
    canFlip: false,
    physical: { thickness: "flat", transparency: 0.68, edgeSoftness: 0.92, shadowDepth: "none" },
  }),

  createScrapbookAsset({
    id: "library-stamp-01",
    name: "Return By Library Stamp",
    category: C.ephemera,
    materialId: "library-stamp",
    variant: "01",
    path: libraryStamp01,
    tones: [T.warm, T.muted],
    colors: ["red", "ink"],
    moods: ["library", "archive", "history"],
    placements: [P.card, P.edge, P.accent],
    className: "pp-asset-real-ephemera pp-asset-library-stamp",
    physical: { thickness: "flat", transparency: 0.18, edgeSoftness: 0.72, shadowDepth: "none" },
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

export const scrapbookMaterialRoles = {
  papers: {
    base: ["paper-sheet-handmade-cream-01"],
    scrap: ["paper-scrap-handmade-01"],
    archival: [
      "paper-base-parchment-soft-clean-01",
      "paper-base-parchment-warm-aged-01",
      "paper-base-parchment-ivory-archive-01",
    ],
    antique: [
      "paper-base-parchment-warm-aged-01",
      "paper-base-parchment-ivory-archive-01",
    ],
  },

  notebook: {
    ruled: ["notebook-paper-cream-01"],
    grid: ["notebook-paper-grid-01"],
  },

  tape: {
    primary: ["tape-masking-cream-01"],
    subtle: ["tape-transparent-01"],
    botanical: ["tape-masking-cream-01"],
    placeholder: ["tape-washi-sage-placeholder-001", "tape-rose-placeholder-001"],
  },

  cards: {
    checkout: ["library-card-checkout-01", "library-card-checkout-02"],
    metadata: ["library-card-clean-01"],
    placeholder: ["ephemera-library-card-placeholder-001"],
  },

  botanicals: {
    hero: ["flower-daisy-white-01"],
    filler: ["flower-babys-breath-01"],
    movement: ["leaf-fern-01"],
    placeholder: ["flower-daisy-placeholder-001", "flower-fern-placeholder-001"],
  },

  bookmarks: {
    neutral: ["bookmark-kraft-01"],
  },

  stamps: {
    library: ["library-stamp-01"],
  },

  patina: {
    coffee: ["coffee-ring-01"],
    placeholder: ["texture-coffee-ring-placeholder-001"],
  },

  metal: {
    paperclip: ["metal-paperclip-brass-placeholder-001"],
  },
}

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

export function resolveScrapbookMaterialRole(category, role, fallbackAssetId = null) {
  if (!category || !role) return getScrapbookAsset(fallbackAssetId)

  const assetIds = scrapbookMaterialRoles?.[category]?.[role]

  if (!assetIds?.length) {
    return getScrapbookAsset(fallbackAssetId)
  }

  return getScrapbookAsset(assetIds[0]) || getScrapbookAsset(fallbackAssetId)
}

export function resolveScrapbookMaterialRoleId(category, role, fallbackAssetId = null) {
  return resolveScrapbookMaterialRole(category, role, fallbackAssetId)?.id || fallbackAssetId
}