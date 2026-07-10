export function getCompositionRecommendations(evaluation = {}) {
  const recommendations = []

  const { balance = {}, density } = evaluation

  const difference = Math.abs((balance.left || 0) - (balance.right || 0))

  if (difference >= 4) {
    recommendations.push({
      type: "balance",
      priority: "medium",
      message:
        balance.left > balance.right
          ? "Composition is left-heavy."
          : "Composition is right-heavy.",
    })
  }

  if (density === "airy") {
    recommendations.push({
      type: "density",
      priority: "low",
      message: "Room for another supporting scrapbook memory.",
    })
  }

  if (density === "dense") {
    recommendations.push({
      type: "density",
      priority: "medium",
      message: "Composition may benefit from more breathing room.",
    })
  }

  return recommendations
}

export default getCompositionRecommendations