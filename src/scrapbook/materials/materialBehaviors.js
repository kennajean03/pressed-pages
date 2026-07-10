const defaultMaterialBehavior = {
  material: "paper",
  rigidity: 0.5,
  curl: 0.3,
  compressionResponse: 0.5,
  shadowSoftness: "soft",
  surface: "matte",
}

const materialBehaviors = {
  paper: {
    material: "paper",
    rigidity: 0.45,
    curl: 0.55,
    compressionResponse: 0.7,
    shadowSoftness: "soft",
    surface: "matte",
  },

  cardstock: {
    material: "cardstock",
    rigidity: 0.72,
    curl: 0.22,
    compressionResponse: 0.45,
    shadowSoftness: "medium",
    surface: "matte",
  },

  botanical: {
    material: "botanical",
    rigidity: 0.18,
    curl: 0.28,
    compressionResponse: 0.85,
    shadowSoftness: "delicate",
    surface: "organic",
  },

  tape: {
    material: "tape",
    rigidity: 0.62,
    curl: 0.08,
    compressionResponse: 0.3,
    shadowSoftness: "low",
    surface: "translucent",
  },

  metal: {
    material: "metal",
    rigidity: 0.95,
    curl: 0,
    compressionResponse: 0.08,
    shadowSoftness: "sharp",
    surface: "reflective",
  },

  photo: {
    material: "photo",
    rigidity: 0.92,
    curl: 0.04,
    compressionResponse: 0.18,
    shadowSoftness: "defined",
    surface: "satin",
  },

  receiptPaper: {
    material: "receiptPaper",
    rigidity: 0.28,
    curl: 0.76,
    compressionResponse: 0.78,
    shadowSoftness: "soft",
    surface: "thin",
  },
}

const materialByAnchorType = {
  pressedFlower: "botanical",
  pressedDaisy: "botanical",
  softFlower: "botanical",
  pressedFern: "botanical",
  signatureFlower: "botanical",

  topTape: "tape",
  roseTape: "tape",
  sageTape: "tape",
  goldTape: "tape",
  linenTape: "tape",

  libraryCard: "cardstock",
  reviewNote: "paper",
  annualMemoryNote: "paper",
  ticketStub: "cardstock",
  bookmark: "cardstock",

  brassClip: "metal",

  coverMosaic: "photo",
}

export function getMaterialBehavior(anchor = {}) {
  const materialType =
    anchor.material ||
    anchor.object?.material ||
    materialByAnchorType[anchor.type] ||
    defaultMaterialBehavior.material

  return {
    ...defaultMaterialBehavior,
    ...(materialBehaviors[materialType] || {}),
  }
}

export default getMaterialBehavior