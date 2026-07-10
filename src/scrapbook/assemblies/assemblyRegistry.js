export const scrapbookAssemblies = {
  pressedFlowerHold: {
    id: "pressedFlowerHold",

    feeling: "preserved memory",

    layout: {
      style: "tucked",
      primaryObject: "pressedFlower",
      fastener: "roseTape",
    },

    objects: [
      {
        type: "pressedFlower",
        role: "heldObject",

        localPlacement: {
          zone: "bottom-right",
          offsetX: 0,
          offsetY: 0,
          rotation: -6,
          layer: 1,
        },
      },

      {
        type: "roseTape",
        role: "fastener",

        localPlacement: {
          attachTo: "pressedFlower",
          anchorPoint: "stem",
          offsetX: 0,
          offsetY: -2,
          rotation: -3,
          layer: 2,
        },
      },
    ],
  },

  libraryArchive: {
    id: "libraryArchive",

    feeling: "borrowed story",

    layout: {
      style: "archived",
      primaryObject: "libraryCard",
      fastener: "topTape",
    },

    objects: [
     {
  type: "libraryCard",
  role: "heldObject",

  localPlacement: {
    zone: "behind-cover",
    layer: 1,
  },
},

      {
        type: "topTape",
        role: "fastener",

        localPlacement: {
          attachTo: "libraryCard",
          anchorPoint: "topEdge",
          layer: 2,
        },
      },
    ],
  },

  journalNote: {
    id: "journalNote",

    feeling: "reader reflection",

    layout: {
      style: "journal",
      primaryObject: "reviewNote",
      fastener: "goldTape",
    },

    objects: [
 {
  type: "reviewNote",
  role: "heldObject",

  localPlacement: {
    zone: "bottom-left",
    layer: 1,
  },
},

      {
        type: "goldTape",
        role: "fastener",

        localPlacement: {
          attachTo: "reviewNote",
          anchorPoint: "corner",
          layer: 2,
        },
      },
    ],
  },
}

export default scrapbookAssemblies