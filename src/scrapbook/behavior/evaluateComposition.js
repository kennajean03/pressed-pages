function calculateVisualWeight(anchor = {}) {
  switch (anchor.type) {
    case "bookmark":
      return 5

    case "libraryCard":
    case "reviewNote":
      return 4

    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
      return 2

    default:
      return 1
  }
}

function calculateBalance(anchors = []) {
  let left = 0
  let right = 0

  anchors.forEach((anchor) => {
    const weight = calculateVisualWeight(anchor)

    const placement = anchor.placement || ""

    if (placement.includes("left")) {
      left += weight
    } else if (placement.includes("right")) {
      right += weight
    }
  })

  return {
    left,
    right,
  }
}

function calculateDensity(anchors = []) {
  if (anchors.length <= 3) return "airy"
  if (anchors.length <= 6) return "comfortable"
  if (anchors.length <= 9) return "rich"

  return "dense"
}

export function evaluateComposition(composition = {}) {
  const anchors = composition.anchors || []

  return {
    anchorCount: anchors.length,

    density: calculateDensity(anchors),

    balance: calculateBalance(anchors),
  }
}

export default evaluateComposition
