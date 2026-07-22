const flowerBundleRecipe = {
  id: "flowerBundle",

  className:
    "scrapbook-assembly--flower-bundle",

  attachment: "none",

  attachmentPosition: {
    top: 0,
    left: "50%",
    x: "-50%",
    y: 0,
    rotation: 0,
    z: 100,
  },

  direction: "vertical",

  align: "center",

  paddingTop: "0",

  defaultLayer: {
    x: 0,
    y: 0,
    rotation: 0,
    z: 1,
  },

  repeatLayers: [
    {
      x: -18,
      y: 0,
      rotation: -6,
      z: 1,
    },

    {
      x: 17,
      y: 42,
      rotation: 7,
      z: 2,
    },

    {
      x: -4,
      y: 78,
      rotation: -3,
      z: 3,
    },
  ],

  cycleOffset: {
    x: 4,
    y: 34,
    rotation: 1,
    z: 3,
  },
}

export default flowerBundleRecipe