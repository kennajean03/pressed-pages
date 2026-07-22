const polaroidStackRecipe = {
  id: "polaroidStack",

  className:
    "scrapbook-assembly--polaroid-stack",

  attachment: "paperclip",

  attachmentPosition: {
    top: 0,
    left: "50%",
    x: "-50%",
    y: 0,
    rotation: 3,
    z: 100,
  },

  direction: "vertical",

  align: "center",

  paddingTop: "1.5rem",

  defaultLayer: {
    x: 0,
    y: -150,
    rotation: 0,
    z: 1,
  },

  repeatLayers: [
    {
      x: 0,
      y: 0,
      rotation: -3,
      z: 1,
    },
    {
      x: -24,
      y: -150,
      rotation: 2,
      z: 2,
    },
    {
      x: 20,
      y: -150,
      rotation: -1,
      z: 3,
    },
    {
      x: -10,
      y: -150,
      rotation: 3,
      z: 4,
    },
  ],

  cycleOffset: {
    x: 4,
    y: -8,
    rotation: -0.5,
    z: 4,
  },
}

export default polaroidStackRecipe