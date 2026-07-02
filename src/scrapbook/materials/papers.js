export const paperMaterials = {
  cream: {
    id: "cream",
    name: "Cream Paper",
    className: "pp-paper-cream",
    tone: "warm",
    weight: "light",
    asset: null,
  },

  aged: {
    id: "aged",
    name: "Aged Paper",
    className: "pp-paper-aged",
    tone: "warm",
    weight: "medium",
    asset: null,
  },

  linen: {
    id: "linen",
    name: "Linen Paper",
    className: "pp-paper-linen",
    tone: "neutral",
    weight: "medium",
    asset: null,
  },

  kraft: {
    id: "kraft",
    name: "Kraft Paper",
    className: "pp-paper-kraft",
    tone: "earthy",
    weight: "heavy",
    asset: null,
  },

  journal: {
    id: "journal",
    name: "Journal Paper",
    className: "pp-paper-journal",
    tone: "warm",
    weight: "light",
    asset: null,
  },

  watercolor: {
    id: "watercolor",
    name: "Watercolor Paper",
    className: "pp-paper-watercolor",
    tone: "soft",
    weight: "heavy",
    asset: null,
  },
}

export function getPaperMaterial(paper = "cream") {
  return paperMaterials[paper] || paperMaterials.cream
}