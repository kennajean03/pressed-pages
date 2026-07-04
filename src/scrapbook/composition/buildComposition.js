export function buildComposition(recipe) {
  if (!recipe) return null

  const anchors = (recipe.anchors || []).slice(0, 3)

  return {
    feeling: recipe.feeling,
    story: recipe.story,
    paper: {
      variant: recipe.paper,
      aging: recipe.aging,
    },
    layout: {
      coverStyle: recipe.layout?.cover ?? "slightlyRaised",
      overlap: recipe.layout?.overlap ?? "gentle",
      density: recipe.layout?.density ?? "light",
    },
    anchors: anchors.map((anchor, index) => ({
      id: anchor,
      type: anchor,
      placement: resolveAnchorPlacement(anchor, index),
      rotation: resolveAnchorRotation(anchor),
      depth: resolveAnchorDepth(anchor),
      layer: resolveAnchorLayer(anchor),
      offset: resolveAnchorOffset(anchor, index),
      attachment: resolveAnchorAttachment(anchor),
    })),
    rules: {
      maxPrimaryAnchors: recipe.rules?.maxPrimaryAnchors ?? 3,
      avoid: recipe.rules?.avoid ?? [],
      preserveReaderVoice: recipe.rules?.preserveReaderVoice ?? false,
    },
  }
}

function resolveAnchorPlacement(anchor, index) {
  const placements = {
    topTape: "over-cover-top",
    roseTape: "over-cover-top-left",
    sageTape: "over-cover-top-right",
    pressedFlower: "bottom-right",
    pressedDaisy: "bottom-right",
    pressedFern: "bottom-left",
    bookmark: "inside-cover",
    reviewNote: "bottom-left",
    handwrittenHeart: "near-title",
    libraryCard: "behind-cover",
    brassClip: "top-left",
    dateStamp: "bottom-center",
    coverMosaic: "background",
    annualMemoryNote: "center",
    signatureFlower: "top-right",
    pencilNote: "lower-margin",
  }

  return placements[anchor] ?? (index === 0 ? "top-left" : "bottom-right")
}

function resolveAnchorRotation(anchor) {
  switch (anchor) {
    case "pressedFlower":
    case "pressedDaisy":
      return -8
    case "pressedFern":
      return 11
    case "roseTape":
      return -4
    case "sageTape":
      return 5
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
    case "pressedFern":
      return "tucked"
    default:
      return "surface"
  }
}

function resolveAnchorLayer(anchor) {
  switch (anchor) {
    case "libraryCard":
      return 10
    case "bookmark":
      return 20
    case "pressedFlower":
    case "pressedDaisy":
    case "pressedFern":
      return 40
    case "topTape":
    case "roseTape":
    case "sageTape":
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
      return "holding"

    case "pressedFlower":
    case "pressedDaisy":
    case "pressedFern":
    case "signatureFlower":
      return "tucked"

    case "bookmark":
      return "peeking"

    case "libraryCard":
    case "reviewNote":
    case "annualMemoryNote":
      return "stacked"

    case "brassClip":
      return "clamped"

    case "handwrittenHeart":
    case "pencilNote":
    case "dateStamp":
      return "written"

    default:
      return "placed"
  }
}