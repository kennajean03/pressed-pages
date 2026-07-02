export const textureMaterials = {
  none: {
    id: "none",
    name: "No Texture",
    className: "",
    variants: [],
    asset: null,
  },

  paperGrain: {
    id: "paperGrain",
    name: "Paper Grain",
    className: "pp-texture-paper-grain",
    variants: ["01", "02", "03"],
    asset: null,
  },

  coffeeRing: {
    id: "coffeeRing",
    name: "Coffee Ring",
    className: "pp-texture-coffee-ring",
    variants: ["01", "02", "03"],
    asset: null,
  },

  teaStain: {
    id: "teaStain",
    name: "Tea Stain",
    className: "pp-texture-tea-stain",
    variants: ["01", "02", "03"],
    asset: null,
  },

  fibers: {
    id: "fibers",
    name: "Paper Fibers",
    className: "pp-texture-fibers",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export function getTextureMaterial(texture = "none") {
  return textureMaterials[texture] || textureMaterials.none
}