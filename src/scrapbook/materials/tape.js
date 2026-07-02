export const tapeMaterials = {
  none: {
    id: "none",
    name: "No Tape",
    className: "",
    asset: null,
  },

  sage: {
    id: "sage",
    name: "Sage Washi Tape",
    className: "pp-tape-sage",
    tone: "green",
    asset: null,
  },

  blush: {
    id: "blush",
    name: "Blush Washi Tape",
    className: "pp-tape-blush",
    tone: "pink",
    asset: null,
  },

  cream: {
    id: "cream",
    name: "Cream Masking Tape",
    className: "pp-tape-cream",
    tone: "neutral",
    asset: null,
  },

  vintage: {
    id: "vintage",
    name: "Vintage Tape",
    className: "pp-tape-vintage",
    tone: "warm",
    asset: null,
  },
}

export function getTapeMaterial(tape = "sage") {
  return tapeMaterials[tape] || tapeMaterials.sage
}