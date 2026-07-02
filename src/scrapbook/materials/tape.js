export const tapeMaterials = {
  none: {
    id: "none",
    name: "No Tape",
    className: "",
    variants: [],
    asset: null,
  },

  sage: {
    id: "sage",
    name: "Sage Washi Tape",
    className: "pp-tape-sage",
    tone: "green",
    variants: ["01", "02", "03"],
    asset: null,
  },

  blush: {
    id: "blush",
    name: "Blush Washi Tape",
    className: "pp-tape-blush",
    tone: "pink",
    variants: ["01", "02", "03"],
    asset: null,
  },

  cream: {
    id: "cream",
    name: "Cream Masking Tape",
    className: "pp-tape-cream",
    tone: "neutral",
    variants: ["01", "02", "03"],
    asset: null,
  },

  vintage: {
    id: "vintage",
    name: "Vintage Tape",
    className: "pp-tape-vintage",
    tone: "warm",
    variants: ["01", "02", "03"],
    asset: null,
  },
}

export function getTapeMaterial(tape = "sage") {
  return tapeMaterials[tape] || tapeMaterials.sage
}