import { scrapbookAssets, getScrapbookAssetsByMaterial } from "../materials/assetRegistry"
import { seededChoice } from "../engine"

function includesAny(values = [], requested = []) {
  if (!requested?.length) return true
  return requested.some((value) => values.includes(value))
}

function scoreAsset(asset, query = {}) {
  let score = 0

  if (query.materialId && asset.materialId === query.materialId) score += 8
  if (query.variant && asset.variant === query.variant) score += 4
  if (query.collection && asset.collection === query.collection) score += 3
  if (includesAny(asset.seasons, query.seasons)) score += 2
  if (includesAny(asset.moods, query.moods)) score += 2
  if (includesAny(asset.tones, query.tones)) score += 2
  if (includesAny(asset.placements, query.placements)) score += 2
  if (includesAny(asset.compatibleWith, query.compatibleWith)) score += 1

  return score
}

export function resolveScrapbookAsset({
  category,
  materialId,
  variant,
  collection,
  seasons = [],
  moods = [],
  tones = [],
  placements = [],
  compatibleWith = [],
  seed = 1,
} = {}) {
  const pool = materialId
    ? getScrapbookAssetsByMaterial(materialId, category)
    : scrapbookAssets.filter((asset) => !category || asset.category === category)

  if (!pool.length) return null

  const query = {
    materialId,
    variant,
    collection,
    seasons,
    moods,
    tones,
    placements,
    compatibleWith,
  }

  const ranked = pool
    .map((asset) => ({ asset, score: scoreAsset(asset, query) }))
    .sort((a, b) => b.score - a.score)

  const bestScore = ranked[0]?.score ?? 0
  const best = ranked.filter((entry) => entry.score === bestScore).map((entry) => entry.asset)

  return seededChoice(seed, best) || best[0] || pool[0]
}

export function resolveAssetForMaterial(material, dna, category, options = {}) {
  if (!material) return null

  return resolveScrapbookAsset({
    category,
    materialId: material.id,
    variant: options.variant,
    collection: options.collection,
    seasons: options.seasons,
    moods: options.moods,
    tones: [material.tone, ...(options.tones || [])].filter(Boolean),
    placements: options.placements,
    compatibleWith: options.compatibleWith,
    seed: options.seed ?? dna?.identity?.seed ?? 1,
  })
}
