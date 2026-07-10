function calculateVisualWeight(anchor = {}) {
  let weight = 1

  switch (anchor.type) {
    case "bookmark":
      weight = 5
      break

    case "libraryCard":
      weight = 4
      break

    case "reviewNote":
      weight = 4
      break

    case "pressedFlower":
    case "pressedDaisy":
    case "softFlower":
    case "pressedFern":
      weight = 2
      break

    case "topTape":
    case "roseTape":
    case "goldTape":
    case "sageTape":
    case "linenTape":
      weight = 1
      break

    default:
      weight = 1
  }

  return weight
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