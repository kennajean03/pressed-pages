import {
  createScrapbookDNA,
  getScrapbookLift,
  getScrapbookObject,
  pickFromCollection,
} from "../engine"

import {
  getPaperMaterial,
  getTapeMaterial,
  getTextureMaterial,
} from "../materials"

import {
  resolvePaper,
  resolveTape,
  resolveTexture,
} from "../resolver"

import { resolvePaperFromIntent } from "../materials/paperIntentResolver"

const LAYER_ORDER = [
  "background",
  "underPaper",
  "paper",
  "abovePaper",
  "foreground",
]

const COMPOSITION_ZONES = {
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
  CENTER_LEFT: "center-left",
  CENTER: "center",
  CENTER_RIGHT: "center-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
  EDGE: "edge",
  MARGIN: "margin",
  FLOATING: "floating",
}

const PLACEMENT_INTENTS = {
  BACKDROP: "backdrop",
  BASE: "base",
  EDGE: "edge",
  ANCHOR: "anchor",
  CORNER: "corner",
  BALANCE: "balance",
  CLUSTER: "cluster",
  TUCKED: "tucked",
  FLOATING: "floating",
}

const VISUAL_WEIGHTS = {
  LIGHT: "light",
  MEDIUM: "medium",
  HEAVY: "heavy",
}

const COMPOSITION_PERSONALITIES = {
  BOTANICAL: {
    id: "botanical",
    label: "Botanical",
    mood: "pressed nature journal",
    traits: ["airy", "elegant", "soft", "organic", "botanical"],
    density: "light",
    rotationStyle: "gentle",
    layeringStyle: "minimal",
    accentPreference: ["flower", "leaf", "soft-tape"],
    texturePreference: "subtle",
    shadowPreference: "soft",
  },

  COZY: {
    id: "cozy",
    label: "Cozy",
    mood: "blanket, coffee, and a worn paperback",
    traits: ["warm", "layered", "tucked", "imperfect", "softly-crooked"],
    density: "medium",
    rotationStyle: "organic",
    layeringStyle: "overlapped",
    accentPreference: ["coffee-stain", "warm-tape", "paper-corner"],
    texturePreference: "warm",
    shadowPreference: "soft-lifted",
  },

  JOURNAL: {
    id: "journal",
    label: "Journal",
    mood: "daily reading notes and handwritten margins",
    traits: ["practical", "annotated", "structured", "notebook", "documented"],
    density: "medium",
    rotationStyle: "mostly-straight",
    layeringStyle: "stacked",
    accentPreference: ["notebook-edge", "clip", "sticky-note"],
    texturePreference: "lined",
    shadowPreference: "flat-soft",
  },

  VINTAGE: {
    id: "vintage",
    label: "Vintage",
    mood: "antique bookshop ephemera",
    traits: ["aged", "collected", "stained", "archival", "layered"],
    density: "rich",
    rotationStyle: "collected",
    layeringStyle: "deep",
    accentPreference: ["ticket", "receipt", "brass-clip", "coffee-stain"],
    texturePreference: "aged",
    shadowPreference: "deeper",
  },

  MINIMAL: {
    id: "minimal",
    label: "Minimal",
    mood: "clean stationery with one thoughtful detail",
    traits: ["clean", "centered", "quiet", "balanced", "simple"],
    density: "light",
    rotationStyle: "restrained",
    layeringStyle: "clean",
    accentPreference: ["single-tape", "small-flower", "subtle-texture"],
    texturePreference: "barely-there",
    shadowPreference: "clean-soft",
  },
}

const PERSONALITY_SEQUENCE = [
  COMPOSITION_PERSONALITIES.BOTANICAL,
  COMPOSITION_PERSONALITIES.COZY,
  COMPOSITION_PERSONALITIES.JOURNAL,
  COMPOSITION_PERSONALITIES.VINTAGE,
  COMPOSITION_PERSONALITIES.MINIMAL,
]

function pickMaterialId(theme, collectionName, fallbackId, seed) {
  return pickFromCollection(
    theme?.collections?.[collectionName],
    seed,
    fallbackId
  )
}

function pickCompositionPersonality(dna, objectType, variant) {
  const seed = dna?.identity?.seed ?? 0
  const baseIndex = Math.abs(seed + objectType.length + variant.length) %
    PERSONALITY_SEQUENCE.length

  return PERSONALITY_SEQUENCE[baseIndex]
}

function normalizeTapeZone(placement) {
  if (placement === "left") return COMPOSITION_ZONES.CENTER_LEFT
  if (placement === "right") return COMPOSITION_ZONES.CENTER_RIGHT
  if (placement === "bottom") return COMPOSITION_ZONES.BOTTOM_CENTER
  if (placement === "corner") return COMPOSITION_ZONES.TOP_RIGHT

  return COMPOSITION_ZONES.TOP_CENTER
}

function getTextureOpacity(object, personality) {
  if (!object.stain && personality.id === "minimal") return 0.24
  if (!object.stain && personality.id === "botanical") return 0.32
  if (!object.stain) return 0.42

  if (personality.id === "vintage") return 0.82
  if (personality.id === "cozy") return 0.72
  if (personality.id === "minimal") return 0.5

  return 0.66
}

function getLayerPersonalityNotes(type, personality) {
  if (type === "texture") {
    return {
      intent: personality.texturePreference,
      shadow: "none",
      shouldDominate: false,
    }
  }

  if (type === "paper") {
    return {
      intent: personality.layeringStyle,
      shadow: personality.shadowPreference,
      shouldDominate: true,
    }
  }

  if (type === "tape") {
    return {
      intent:
        personality.id === "minimal"
          ? "quiet-anchor"
          : personality.id === "cozy"
            ? "hand-placed-anchor"
            : "visible-anchor",
      shadow: personality.shadowPreference,
      shouldDominate: false,
    }
  }

  return {
    intent: "support-composition",
    shadow: personality.shadowPreference,
    shouldDominate: false,
  }
}

function createCompositionRule({
  layer,
  role,
  placementIntent,
  zone,
  visualWeight,
  supports = [],
  avoids = [],
  behavior = [],
  personality,
  personalityNotes,
}) {
  return {
    layer,
    role,
    placementIntent,
    zone,
    visualWeight,
    supports,
    avoids,
    behavior,
    personality,
    personalityNotes,
  }
}

function createLayer({
  id,
  type,
  role,
  material,
  layer,
  placement,
  placementIntent,
  zone,
  visualWeight,
  className,
  style,
  supports,
  avoids,
  behavior,
  personality,
}) {
  const personalityNotes = getLayerPersonalityNotes(type, personality)

  const rule = createCompositionRule({
    layer,
    role,
    placementIntent,
    zone,
    visualWeight,
    supports,
    avoids,
    behavior,
    personality: personality.id,
    personalityNotes,
  })

  return {
    id,
    type,
    role,
    material,
    layer,
    placement,
    placementIntent,
    zone,
    visualWeight,
    className,
    style,
    personality: personality.id,
    personalityNotes,
    rule,
  }
}

function buildCompositionLayers({
  object,
  dna,
  personality,
  resolvedPaper,
  resolvedTexture,
  resolvedTape,
}) {
  const background = []
  const underPaper = []
  const paper = []
  const abovePaper = []
  const foreground = []

  if (resolvedTexture) {
    background.push(
      createLayer({
        id: `texture-${dna.texture.stain}`,
        type: "texture",
        role: "background-texture",
        material: resolvedTexture,
        layer: "background",
        placement: "behind-paper",
        placementIntent: PLACEMENT_INTENTS.BACKDROP,
        zone: COMPOSITION_ZONES.CENTER,
        visualWeight: VISUAL_WEIGHTS.LIGHT,
        className: resolvedTexture.className,
        style: {
          "--pp-layer-rotation": dna.layout.rotation,
          "--pp-layer-opacity": getTextureOpacity(object, personality),
        },
        supports: ["paper", "photo", "journal", "card"],
        avoids: ["primary-text"],
        behavior: [
          "stay-behind",
          "soften-edges",
          "avoid-dominance",
          `match-${personality.id}-texture`,
        ],
        personality,
      })
    )
  }

  if (resolvedPaper) {
    paper.push(
      createLayer({
        id: `paper-${dna.paper.variant}`,
        type: "paper",
        role: "main-paper",
        material: resolvedPaper,
        layer: "paper",
        placement: "base",
        placementIntent: PLACEMENT_INTENTS.BASE,
        zone: COMPOSITION_ZONES.CENTER,
        visualWeight: VISUAL_WEIGHTS.HEAVY,
        className: resolvedPaper.className,
        style: {
          "--pp-layer-curl": dna.paper.curl,
          "--pp-layer-fold": dna.paper.fold,
        },
        supports: ["content", "tape", "flower", "paperclip", "ephemera"],
        avoids: [],
        behavior: [
          "hold-content",
          "define-surface",
          "receive-decorations",
          `carry-${personality.id}-mood`,
        ],
        personality,
      })
    )
  }

  if (resolvedTape) {
    const tapeZone = normalizeTapeZone(dna.tape.placement)

    abovePaper.push(
      createLayer({
        id: `tape-${dna.tape.variant}`,
        type: "tape",
        role: "paper-anchor",
        material: resolvedTape,
        layer: "abovePaper",
        placement: dna.tape.placement || "top",
        placementIntent: PLACEMENT_INTENTS.ANCHOR,
        zone: tapeZone,
        visualWeight:
          personality.id === "minimal"
            ? VISUAL_WEIGHTS.LIGHT
            : VISUAL_WEIGHTS.MEDIUM,
        className: resolvedTape.className,
        style: {
          "--pp-layer-rotation": dna.tape.rotation || "0deg",
        },
        supports: ["paper", "photo", "receipt", "ticket", "bookmark"],
        avoids: ["primary-text", "book-cover"],
        behavior: [
          "anchor-edge",
          "sit-above-paper",
          "suggest-hand-placement",
          `follow-${personality.id}-placement`,
        ],
        personality,
      })
    )
  }

  return {
    order: LAYER_ORDER,
    background,
    underPaper,
    paper,
    abovePaper,
    foreground,
    all: [
      ...background,
      ...underPaper,
      ...paper,
      ...abovePaper,
      ...foreground,
    ],
  }
}

function summarizeComposition(layers) {
  return layers.all.reduce(
    (summary, layer) => {
      summary.layerCount += 1
      summary.types[layer.type] = (summary.types[layer.type] || 0) + 1
      summary.visualWeights[layer.visualWeight] =
        (summary.visualWeights[layer.visualWeight] || 0) + 1
      summary.zones[layer.zone] = (summary.zones[layer.zone] || 0) + 1

      if (layer.personality) {
        summary.personalities[layer.personality] =
          (summary.personalities[layer.personality] || 0) + 1
      }

      return summary
    },
    {
      layerCount: 0,
      types: {},
      visualWeights: {},
      zones: {},
      personalities: {},
    }
  )
}

export function composePaper({
  theme,
  materials,
  density,
  variant = "card",
  objectType = "paper",
  rotation,
  lift,
  scrapbookId = variant,
} = {}) {
  const object = getScrapbookObject(objectType)

  const dna = createScrapbookDNA({
    id: scrapbookId,
    type: objectType,
    variant,
  })

  const personality = pickCompositionPersonality(dna, objectType, variant)

 const paperIntent =
  materials?.paperIntent ||
  materials?.paper?.intent ||
  materials?.recipe?.paperIntent

const paperCandidates = paperIntent
  ? resolvePaperFromIntent(paperIntent)
  : null

const paperId = paperCandidates?.length
  ? pickFromCollection(
      paperCandidates,
      dna.identity.seed + 101,
      materials?.paper?.id || paperCandidates[0]
    )
  : pickMaterialId(
      theme,
      "papers",
      materials?.paper?.id,
      dna.identity.seed + 101
    )

  const tapeId = pickMaterialId(
    theme,
    "tapes",
    materials?.tape?.id,
    dna.identity.seed + 102
  )

  const textureId = pickMaterialId(
    theme,
    "textures",
    materials?.texture?.id,
    dna.identity.seed + 103
  )

  const paperMaterial = getPaperMaterial(paperId)
  const tapeMaterial = getTapeMaterial(tapeId)
  const textureMaterial = getTextureMaterial(textureId)

  const resolvedPaper = object.paper
    ? resolvePaper(paperMaterial, dna)
    : null

  const resolvedTape =
    object.tape && density?.tape
      ? resolveTape(tapeMaterial, dna)
      : null

  const resolvedTexture =
    object.stain || density?.texture
      ? resolveTexture(textureMaterial, dna)
      : null

  const resolvedLift = lift ?? object.lift ?? dna.layout.lift
  const resolvedShadow = getScrapbookLift(resolvedLift)
  const resolvedRotation = rotation || dna.layout.rotation

  const layers = buildCompositionLayers({
    object,
    dna,
    personality,
    resolvedPaper,
    resolvedTexture,
    resolvedTape,
  })

  const composition = {
    rulesVersion: "13D.6B",
    personality,
    personalityId: personality.id,
    personalityLabel: personality.label,
    personalityMood: personality.mood,
    layerOrder: LAYER_ORDER,
    zones: COMPOSITION_ZONES,
    placementIntents: PLACEMENT_INTENTS,
    visualWeights: VISUAL_WEIGHTS,
    summary: summarizeComposition(layers),
  }

  return {
    dna,
    object,
    objectType,
    variant,

    paper: resolvedPaper,
    texture: resolvedTexture,
    tape: resolvedTape,

    layers,
    composition,

    rotation: resolvedRotation,
    offsetX: dna.layout.offsetX,
    offsetY: dna.layout.offsetY,

    lift: resolvedLift,
    shadow: resolvedShadow,

    paperVariant: dna.paper.variant,
    tapeVariant: dna.tape.variant,
    stainVariant: dna.texture.stain,
    curl: dna.paper.curl,

    style: {
      "--pp-composed-rotation": resolvedRotation,
      "--pp-composed-offset-x": dna.layout.offsetX,
      "--pp-composed-offset-y": dna.layout.offsetY,
      "--pp-composed-shadow": resolvedShadow,
      "--pp-composition-personality": personality.id,
    },

    classNames: [
      "pp-composed-paper",
      `pp-object-${objectType}`,
      `pp-composition-${personality.id}`,
      resolvedPaper && `pp-dna-paper-${dna.paper.variant}`,
      resolvedPaper && `pp-dna-curl-${dna.paper.curl}`,
      resolvedPaper && dna.paper.fold !== "none" && `pp-dna-fold-${dna.paper.fold}`,
      resolvedTexture && dna.texture.stain !== "none" && `pp-dna-stain-${dna.texture.stain}`,
      resolvedPaper?.className,
      resolvedTexture?.className,
      resolvedTape?.className,
    ]
      .filter(Boolean)
      .join(" "),
  }
}