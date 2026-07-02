export const clipMaterials = {
  none: {
    id: "none",
    name: "No Clip",
    className: "",
    asset: null,
  },

  silverPaperclip: {
    id: "silverPaperclip",
    name: "Silver Paperclip",
    className: "pp-clip-silver-paperclip",
    tone: "silver",
    asset: null,
  },

  brassPaperclip: {
    id: "brassPaperclip",
    name: "Brass Paperclip",
    className: "pp-clip-brass-paperclip",
    tone: "gold",
    asset: null,
  },

  binderClip: {
    id: "binderClip",
    name: "Binder Clip",
    className: "pp-clip-binder",
    tone: "black",
    asset: null,
  },
}

export function getClipMaterial(clip = "none") {
  return clipMaterials[clip] || clipMaterials.none
}