export const clipMaterials = {
  none: {
    id: "none",
    name: "No Clip",
    className: "",
    variants: [],
    asset: null,
  },

  silverPaperclip: {
    id: "silverPaperclip",
    name: "Silver Paperclip",
    className: "pp-clip-silver-paperclip",
    tone: "silver",
    variants: ["01", "02"],
    asset: null,
  },

  brassPaperclip: {
    id: "brassPaperclip",
    name: "Brass Paperclip",
    className: "pp-clip-brass-paperclip",
    tone: "gold",
    variants: ["01", "02"],
    asset: null,
  },

  binderClip: {
    id: "binderClip",
    name: "Binder Clip",
    className: "pp-clip-binder",
    tone: "black",
    variants: ["01", "02"],
    asset: null,
  },
}

export function getClipMaterial(clip = "none") {
  return clipMaterials[clip] || clipMaterials.none
}