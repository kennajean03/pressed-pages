export const defaultAssemblyLayer = {
  x: 0,
  y: 0,
  rotation: 0,
  z: 1,
}

export const defaultAttachmentPosition = {
  top: 0,
  left: "50%",
  x: "-50%",
  y: 0,
  rotation: 0,
  z: 100,
}

export const defaultAssemblyRecipe = {
  id: "defaultStack",

  className: "",

  attachment: "none",

  attachmentPosition: {
    ...defaultAttachmentPosition,
  },

  direction: "vertical",

  align: "center",

  paddingTop: "0",

  defaultLayer: {
    ...defaultAssemblyLayer,
  },

  repeatLayers: [
    {
      ...defaultAssemblyLayer,
    },
  ],
}

export default defaultAssemblyRecipe