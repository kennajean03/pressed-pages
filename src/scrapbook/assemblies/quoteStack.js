const quoteStackRecipe = {
  id: "quoteStack",

  className:
    "scrapbook-assembly--quote-stack",

  attachment: "paperclip",

  attachmentPosition: {
    top: 0,
    left: "50%",
    x: "-50%",
    y: 0,
    rotation: -4,
    z: 100,
  },

  direction: "vertical",

  align: "center",

  paddingTop: "1.5rem",

  defaultLayer: {
    x: 0,
    y: -80,
    rotation: 0,
    z: 1,
  },

  repeatLayers: [
    {
      x: 0,
      y: 0,
      rotation: 0,
      z: 1,
    },
    {
      x: -12,
      y: -80,
      rotation: -2,
      z: 2,
    },
    {
      x: 10,
      y: -80,
      rotation: 2,
      z: 3,
    },
    {
      x: -6,
      y: -80,
      rotation: -1,
      z: 4,
    },
  ],

  cycleOffset: {
    x: 2,
    y: -4,
    rotation: 0.5,
    z: 4,
  },
}

export default quoteStackRecipe