export const paperMaterials = {
  cream: {
    id: "cream",
    name: "Cream Paper",
    className: "pp-paper-cream",
    tone: "warm",
    weight: "light",
    variants: ["01", "02", "03"],
    asset: null,
  },

  aged: {
    id: "aged",
    name: "Aged Paper",
    className: "pp-paper-aged",
    tone: "warm",
    weight: "medium",
    variants: ["01", "02", "03"],
    asset: null,
  },

  linen: {
    id: "linen",
    name: "Linen Paper",
    className: "pp-paper-linen",
    tone: "neutral",
    weight: "medium",
    variants: ["01", "02", "03"],
    asset: null,
  },

  kraft: {
    id: "kraft",
    name: "Kraft Paper",
    className: "pp-paper-kraft",
    tone: "earthy",
    weight: "heavy",
    variants: ["01", "02", "03"],
    asset: null,
  },

  journal: {
    id: "journal",
    name: "Journal Paper",
    className: "pp-paper-journal",
    tone: "warm",
    weight: "light",
    variants: ["01", "02", "03"],
    asset: null,
  },

  watercolor: {
    id: "watercolor",
    name: "Watercolor Paper",
    className: "pp-paper-watercolor",
    tone: "soft",
    weight: "heavy",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export function getPaperMaterial(paper = "cream") {
  return paperMaterials[paper] || paperMaterials.cream
}