import QuoteSlip from "./QuoteSlipStack"
import PolaroidStack from "./PolaroidStack"
import PressedFlowerBundle from "./PressedFlowerBundle"

function renderKeepsake(keepsake) {
  if (!keepsake) {
    return null
  }

  switch (keepsake.type) {
    case "quoteCluster":
      return (
        <QuoteSlip
          key={keepsake.id}
          keepsake={keepsake}
        />
      )

    case "photoCluster":
      return (
        <PolaroidStack
          key={keepsake.id}
          keepsake={keepsake}
        />
      )

    case "flowerCluster":
      return (
        <PressedFlowerBundle
          key={keepsake.id}
          keepsake={keepsake}
        />
      )

    default:
      return null
  }
}

export default renderKeepsake