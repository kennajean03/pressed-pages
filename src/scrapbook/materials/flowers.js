export const flowerMaterials = {
  none: {
    id: "none",
    name: "No Flower",
    className: "",
    variants: [],
    asset: null,
  },

  hydrangea: {
    id: "hydrangea",
    name: "Pressed Hydrangea",
    className: "pp-flower-hydrangea",
    tone: "soft-blue",
    variants: ["01", "02", "03"],
    asset: null,
  },

  daisy: {
    id: "daisy",
    name: "Pressed Daisy",
    className: "pp-flower-daisy",
    tone: "cream",
    variants: ["01", "02", "03"],
    asset: null,
  },

  lavender: {
    id: "lavender",
    name: "Pressed Lavender",
    className: "pp-flower-lavender",
    tone: "purple",
    variants: ["01", "02", "03"],
    asset: null,
  },

  fern: {
    id: "fern",
    name: "Pressed Fern",
    className: "pp-flower-fern",
    tone: "green",
    variants: ["01", "02", "03"],
    asset: null,
  },

  rosePetal: {
    id: "rosePetal",
    name: "Pressed Rose Petal",
    className: "pp-flower-rose-petal",
    tone: "pink",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export function getFlowerMaterial(flower = "none") {
  return flowerMaterials[flower] || flowerMaterials.none
}