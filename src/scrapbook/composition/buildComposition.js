import { resolveScrapbookMaterialRoleId } from "../materials/assetRegistry"
import { generateAnchors } from "./generateAnchors"
import { resolveRelationships } from "../resolvers/resolveRelationships"
import { expandAssemblies } from "../assemblies/expandAssemblies"


function resolveCompositionRules(recipe = {}) {
  const density = recipe.compositionRules?.density || recipe.layout?.density || "whisper"

  return {
    density,
    preserveNegativeSpace: recipe.compositionRules?.preserveNegativeSpace ?? false,
    maxMeaningfulObjects:
      recipe.compositionRules?.maxMeaningfulObjects ??
      recipe.rules?.maxPrimaryAnchors ??
      3,

    attachment: recipe.compositionRules?.attachment ?? null,
    botanical: recipe.compositionRules?.botanical ?? null,
    bookmark: recipe.compositionRules?.bookmark ?? null,
    ephemera: recipe.compositionRules?.ephemera ?? null,
    stamp: recipe.compositionRules?.stamp ?? null,
    patina: recipe.compositionRules?.patina ?? null,

    avoid: [
      ...(recipe.rules?.avoid ?? []),
      ...(recipe.compositionRules?.avoid ?? []),
    ],
  }
}

export function buildComposition(recipe) {
  if (!recipe) return null

 const compositionRules = resolveCompositionRules(recipe)

const generatedAnchors = generateAnchors(recipe) || []

const anchors = expandAssemblies(generatedAnchors, recipe)

const baseObjects = anchors.map((anchor, index) =>
  buildCompositionObject(anchor, recipe, index)
)

const objects = resolveRelationships(baseObjects, recipe)

  return {
    id: recipe.id,
    type: recipe.type,
    feeling: recipe.feeling,
    story: recipe.story,

    paper: {
      variant: recipe.paper,
      role: recipe.paperRole,
      assetId: resolveScrapbookMaterialRoleId("papers", recipe.paperRole, recipe.paper),
      aging: recipe.aging,
    },

    materials: {
      basePaper: resolveScrapbookMaterialRoleId("papers", recipe.paperRole, recipe.paper),
      scrapPaper: resolveScrapbookMaterialRoleId("papers", recipe.scrapRole),
      notebookPaper: resolveScrapbookMaterialRoleId("notebook", recipe.notebookRole),
      tape: resolveScrapbookMaterialRoleId("tape", recipe.attachmentRole),
      botanical: resolveScrapbookMaterialRoleId("botanicals", recipe.botanicalRole),
      card: resolveScrapbookMaterialRoleId("cards", recipe.cardRole),
      bookmark: resolveScrapbookMaterialRoleId("bookmarks", recipe.bookmarkRole),
      stamp: resolveScrapbookMaterialRoleId("stamps", recipe.stampRole),
      patina: resolveScrapbookMaterialRoleId("patina", recipe.patinaRole),
    },

    compositionRules,

    layout: {
      coverStyle: recipe.layout?.cover ?? "slightlyRaised",
      overlap: recipe.layout?.overlap ?? "gentle",
      density: compositionRules.density,
      preserveNegativeSpace: compositionRules.preserveNegativeSpace,
      attachmentPlacement: recipe.layout?.attachmentPlacement,
      botanicalPlacement: recipe.layout?.botanicalPlacement,
      bookmarkPlacement: recipe.layout?.bookmarkPlacement,
      cardPlacement: recipe.layout?.cardPlacement,
      stampPlacement: recipe.layout?.stampPlacement,
      patinaPlacement: recipe.layout?.patinaPlacement,
    },

    objects,

    anchors: objects,

    rules: {
      maxPrimaryAnchors: compositionRules.maxMeaningfulObjects,
      avoid: compositionRules.avoid,
      preserveReaderVoice: recipe.rules?.preserveReaderVoice ?? false,
    },
  }
}

function buildCompositionObject(anchor, recipe, index) {
  const anchorDefinition =
    typeof anchor === "string"
      ? { type: anchor }
      : anchor

  const type = anchorDefinition.type

  return {
    id: `${type}-${index}`,
    type,

    assembly: anchorDefinition.assembly ?? null,

    category: resolveObjectCategory(type),
    role: resolveObjectRole(type),

    assetId: resolveAnchorAssetId(type, recipe),

    placement: resolveAnchorPlacement(type, recipe, index),

    rotation: resolveAnchorRotation(type),

    depth: resolveAnchorDepth(type),

    layer: resolveAnchorLayer(type),

    offset: resolveAnchorOffset(type, index),

    attachment: resolveAnchorAttachment(type),
  }
}

function resolveObjectCategory(anchor) {
  switch (anchor) {
    case "topTape":
    case "roseTape":
    case "sageTape":
    case "goldTape":
    case "linenTape":
      return "attachment"

    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
    case "signatureFlower":
      return "botanical"

    case "libraryCard":
    case "reviewNote":
    case "ticketStub":
    case "annualMemoryNote":
      return "ephemera"

    case "dateStamp":
      return "stamp"

    case "coffeeRing":
    case "pencilNote":
      return "patina"

    case "bookmark":
      return "bookmark"

    case "brassClip":
      return "metal"

    default:
      return "detail"
  }
}

function resolveObjectRole(anchor) {
  switch (anchor) {
    case "reviewNote":
      return "readingReflection"
    case "libraryCard":
      return "libraryMemory"
    case "ticketStub":
      return "occasionMemory"
    case "annualMemoryNote":
      return "annualReflection"
    case "dateStamp":
      return "timeMarker"
    case "coffeeRing":
      return "livedInPatina"
    case "topTape":
    case "roseTape":
    case "sageTape":
    case "goldTape":
    case "linenTape":
      return "attachment"
    case "softFlower":
    case "pressedFlower":
    case "pressedDaisy":
    case "pressedFern":
    case "signatureFlower":
      return "botanicalMemory"
    default:
      return "decorativeDetail"
  }
}

function resolveAnchorAssetId(anchor, recipe) {
  switch (anchor) {
    case "topTape":
    case "roseTape":
    case "sageTape":
    case "goldTape":
    case "linenTape":
      return resolveScrapbookMaterialRoleId("tape", recipe.attachmentRole, "tape-washi-sage-placeholder-001")

    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "signatureFlower":
      return resolveScrapbookMaterialRoleId("botanicals", recipe.botanicalRole, "flower-daisy-placeholder-001")

    case "pressedFern":
      return resolveScrapbookMaterialRoleId("botanicals", "movement", "flower-fern-placeholder-001")

    case "bookmark":
      return resolveScrapbookMaterialRoleId("bookmarks", recipe.bookmarkRole, null)

    case "libraryCard":
    case "reviewNote":
    case "ticketStub":
    case "annualMemoryNote":
      return resolveScrapbookMaterialRoleId("cards", recipe.cardRole, "ephemera-library-card-placeholder-001")

    case "dateStamp":
      return resolveScrapbookMaterialRoleId("stamps", recipe.stampRole, null)

    case "coffeeRing":
      return resolveScrapbookMaterialRoleId("patina", recipe.patinaRole, "texture-coffee-ring-placeholder-001")

    case "pencilNote":
      return null

    case "brassClip":
      return resolveScrapbookMaterialRoleId("metal", "paperclip", "metal-paperclip-brass-placeholder-001")

    default:
      return null
  }
}

function resolveAnchorPlacement(anchor, recipe = {}, index) {
  const placementOverride = resolveRecipePlacementOverride(anchor, recipe)

  if (placementOverride) return placementOverride

  const placements = {
    topTape: "over-cover-top",
    roseTape: "over-cover-top-left",
    sageTape: "over-cover-top-right",
    goldTape: "over-cover-top",
    linenTape: "over-cover-top",
    softFlower: "bottom-right",
    pressedFlower: "bottom-right",
    pressedDaisy: "bottom-right",
    pressedFern: "bottom-left",
    bookmark: "inside-cover",
    reviewNote: "bottom-left",
    handwrittenHeart: "near-title",
    libraryCard: "behind-cover",
    brassClip: "top-left",
    dateStamp: "bottom-center",
    coffeeRing: "background",
    coverMosaic: "background",
    annualMemoryNote: "center",
    signatureFlower: "top-right",
    pencilNote: "lower-margin",
    ticketStub: "bottom-right",
  }

  return placements[anchor] ?? (index === 0 ? "top-left" : "bottom-right")
}

function resolveRecipePlacementOverride(anchor, recipe = {}) {
  const category = resolveObjectCategory(anchor)

  switch (category) {
    case "attachment":
      return recipe.layout?.attachmentPlacement
    case "botanical":
      return recipe.layout?.botanicalPlacement
    case "bookmark":
      return recipe.layout?.bookmarkPlacement
    case "ephemera":
      return recipe.layout?.cardPlacement
    case "stamp":
      return recipe.layout?.stampPlacement
    case "patina":
      return recipe.layout?.patinaPlacement
    default:
      return null
  }
}

function resolveAnchorRotation(anchor) {
  switch (anchor) {
    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "signatureFlower":
      return -8
    case "pressedFern":
      return 11
    case "roseTape":
      return -4
    case "sageTape":
      return 5
    case "goldTape":
      return -3
    case "linenTape":
      return 2
    case "reviewNote":
      return -2
    case "libraryCard":
      return 1
    case "ticketStub":
      return 4
    default:
      return 0
  }
}

function resolveAnchorDepth(anchor) {
  switch (anchor) {
    case "libraryCard":
      return "behind"
    case "bookmark":
      return "inside"
    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
    case "signatureFlower":
      return "tucked"
    default:
      return "surface"
  }
}

function resolveAnchorLayer(anchor) {
  switch (anchor) {
    case "coffeeRing":
      return 5
    case "libraryCard":
      return 10
    case "bookmark":
      return 20
    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
    case "signatureFlower":
      return 40
    case "topTape":
    case "roseTape":
    case "sageTape":
    case "goldTape":
    case "linenTape":
      return 50
    case "brassClip":
      return 60
    case "handwrittenHeart":
    case "pencilNote":
    case "dateStamp":
      return 70
    default:
      return 30
  }
}

function resolveAnchorOffset(anchor, index) {
  return {
    x: (index % 2 === 0 ? -1 : 1) * (2 + index),
    y: index,
  }
}

function resolveAnchorAttachment(anchor) {
  switch (anchor) {
    case "topTape":
    case "roseTape":
    case "sageTape":
    case "goldTape":
    case "linenTape":
      return "holding"

    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
    case "signatureFlower":
      return "tucked"

    case "bookmark":
      return "peeking"

    case "libraryCard":
    case "reviewNote":
    case "ticketStub":
    case "annualMemoryNote":
      return "stacked"

    case "brassClip":
      return "clamped"

    case "handwrittenHeart":
    case "pencilNote":
    case "dateStamp":
      return "written"

    case "coffeeRing":
      return "patina"

    default:
      return "placed"
  }
}