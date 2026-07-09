const defaultAttachmentPoint = {
  x: "0px",
  y: "0px",
  rotate: 0,
}

const attachmentPointsByType = {
  pressedFlower: {
    stem: {
      x: "18px",
      y: "48px",
      rotate: -3,
    },
  },
  pressedDaisy: {
    stem: {
      x: "18px",
      y: "48px",
      rotate: -3,
    },
  },
  softFlower: {
    stem: {
      x: "16px",
      y: "46px",
      rotate: 2,
    },
  },
  pressedFern: {
    stem: {
      x: "14px",
      y: "42px",
      rotate: 5,
    },
  },
  signatureFlower: {
    stem: {
      x: "18px",
      y: "48px",
      rotate: -4,
    },
  },

  libraryCard: {
    topEdge: {
      x: "-10px",
      y: "-12px",
      rotate: -6,
    },
  },

  reviewNote: {
    corner: {
      x: "10px",
      y: "-8px",
      rotate: 5,
    },
  },

  annualMemoryNote: {
    topEdge: {
      x: "8px",
      y: "-12px",
      rotate: 4,
    },
  },

  ticketStub: {
    strip: {
      x: "-6px",
      y: "-6px",
      rotate: -9,
    },
  },
}

export function getAttachmentPoint(targetType, pointName) {
  return (
    attachmentPointsByType[targetType]?.[pointName] ||
    defaultAttachmentPoint
  )
}

export default getAttachmentPoint