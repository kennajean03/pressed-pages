export const REVIEW_GRAPHIC_DESIGN_VERSION = 1
export const LOCAL_REVIEW_GRAPHIC_DESIGNS_KEY = "pressedPagesReviewGraphicDesigns"

// Keep device-only drafts separated by signed-in owner. This prevents one
// person's unsynced clipping-drawer designs appearing for another account in
// a shared browser. The anonymous key is intentionally separate too.
export function getLocalReviewGraphicDesignsKey(userId = "") {
  const ownerKey = String(userId || "guest").trim() || "guest"
  return `${LOCAL_REVIEW_GRAPHIC_DESIGNS_KEY}:${ownerKey}`
}

export const DEFAULT_REVIEW_GRAPHIC_FIELDS = {
  rating: true,
  spice: true,
  obsession: true,
  review: true,
  vibe: true,
  tropes: true,
}

export const DEFAULT_REVIEW_GRAPHIC_STYLE = {
  accent: "rose",
  typography: "classic",
  background: "notebook",
  coverPlacement: "left",
  embellishment: "celestial",
  coverOffsetY: 0,
}

const allowed = {
  template: ["scrapbook", "minimal", "dark", "soft"],
  size: ["square", "story", "pinterest"],
  accent: ["rose", "sage", "gold", "midnight"],
  typography: ["classic", "editorial", "handwritten"],
  background: ["notebook", "grid", "plain"],
  coverPlacement: ["left", "right"],
  embellishment: ["celestial", "botanical", "none"],
}

function pick(value, options, fallback) {
  return options.includes(value) ? value : fallback
}

function clampNumber(value, minimum, maximum, fallback) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return fallback
  return Math.min(maximum, Math.max(minimum, Math.round(numeric)))
}

export function normalizeReviewGraphicOptions(value = {}) {
  const fields = value.fields && typeof value.fields === "object"
    ? value.fields
    : {}
  const style = value.style && typeof value.style === "object"
    ? value.style
    : {}

  return {
    template: pick(value.template, allowed.template, "scrapbook"),
    size: pick(value.size, allowed.size, "square"),
    fields: Object.fromEntries(
      Object.keys(DEFAULT_REVIEW_GRAPHIC_FIELDS).map((key) => [
        key,
        typeof fields[key] === "boolean"
          ? fields[key]
          : DEFAULT_REVIEW_GRAPHIC_FIELDS[key],
      ])
    ),
    style: {
      accent: pick(style.accent, allowed.accent, DEFAULT_REVIEW_GRAPHIC_STYLE.accent),
      typography: pick(style.typography, allowed.typography, DEFAULT_REVIEW_GRAPHIC_STYLE.typography),
      background: pick(style.background, allowed.background, DEFAULT_REVIEW_GRAPHIC_STYLE.background),
      coverPlacement: pick(style.coverPlacement, allowed.coverPlacement, DEFAULT_REVIEW_GRAPHIC_STYLE.coverPlacement),
      embellishment: pick(style.embellishment, allowed.embellishment, DEFAULT_REVIEW_GRAPHIC_STYLE.embellishment),
      coverOffsetY: clampNumber(style.coverOffsetY, -54, 54, 0),
    },
  }
}

export function normalizeReviewGraphicDesign(value = {}) {
  const options = normalizeReviewGraphicOptions(value)
  const name = String(value.name || "Untitled design").trim().slice(0, 80)

  return {
    id: String(value.id || ""),
    designVersion: REVIEW_GRAPHIC_DESIGN_VERSION,
    name: name || "Untitled design",
    sourceReviewId: String(value.sourceReviewId || value.source_review_id || ""),
    sourceBookTitle: String(value.sourceBookTitle || value.source_book_title || "").trim().slice(0, 160),
    createdAt: value.createdAt || value.created_at || "",
    updatedAt: value.updatedAt || value.updated_at || "",
    ...options,
  }
}

export function createReviewGraphicDesign({
  id = "",
  name = "Untitled design",
  sourceReviewId = "",
  sourceBookTitle = "",
  options = {},
  createdAt = new Date().toISOString(),
  updatedAt = createdAt,
} = {}) {
  return normalizeReviewGraphicDesign({
    id,
    name,
    sourceReviewId,
    sourceBookTitle,
    ...options,
    createdAt,
    updatedAt,
  })
}

export function buildCloudReviewGraphicDesignRow({ design, userId } = {}) {
  if (!userId || !design?.id) return null
  const normalized = normalizeReviewGraphicDesign(design)
  return {
    id: normalized.id,
    user_id: userId,
    design_version: normalized.designVersion,
    name: normalized.name,
    source_review_id: normalized.sourceReviewId || null,
    source_book_title: normalized.sourceBookTitle || null,
    design_data: {
      template: normalized.template,
      size: normalized.size,
      fields: normalized.fields,
      style: normalized.style,
    },
    created_at: normalized.createdAt || new Date().toISOString(),
    updated_at: normalized.updatedAt || new Date().toISOString(),
  }
}

export function reviewGraphicDesignFromCloudRow(row = {}) {
  return normalizeReviewGraphicDesign({
    id: row.id,
    designVersion: row.design_version,
    name: row.name,
    sourceReviewId: row.source_review_id,
    sourceBookTitle: row.source_book_title,
    ...(row.design_data || {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
}
