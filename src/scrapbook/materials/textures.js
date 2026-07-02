export const textureMaterials = {
  none: {
    id: "none",
    name: "No Texture",
    className: "",
    asset: null,
  },

  paperGrain: {
    id: "paperGrain",
    name: "Paper Grain",
    className: "pp-texture-paper-grain",
    asset: null,
  },

  coffeeRing: {
    id: "coffeeRing",
    name: "Coffee Ring",
    className: "pp-texture-coffee-ring",
    asset: null,
  },

  teaStain: {
    id: "teaStain",
    name: "Tea Stain",
    className: "pp-texture-tea-stain",
    asset: null,
  },

  fibers: {
    id: "fibers",
    name: "Paper Fibers",
    className: "pp-texture-fibers",
    asset: null,
  },
}

export function getTextureMaterial(texture = "none") {
  return textureMaterials[texture] || textureMaterials.none
}