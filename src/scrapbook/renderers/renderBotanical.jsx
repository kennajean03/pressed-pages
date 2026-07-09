import React from "react"

import { getRelationshipBehavior } from "../behavior/relationshipBehavior"
import { ScrapbookAsset } from "../components/ScrapbookAsset"

export const botanicalAnchorTypes = new Set([
  "pressedFlower",
  "softFlower",
  "pressedDaisy",
  "pressedFern",
  "signatureFlower",
])

export function isBotanicalAnchor(anchor = {}) {
  return (
    anchor.rendererType === "botanical" ||
    anchor.objectType === "botanical" ||
    anchor.object?.type === "botanical" ||
    anchor.category === "botanical" ||
    botanicalAnchorTypes.has(anchor.type)
  )
}

export function renderBotanical(anchor, context = {}) {
  const { asset, placement } = context

  if (!asset) return null

  const behavior = getRelationshipBehavior(anchor)

  const botanicalPlacement = {
    ...placement,
    scale: placement?.scale ?? behavior.scale,
    opacity: placement?.opacity ?? behavior.opacity,
    rotate: placement?.rotate ?? behavior.rotate,
    translateX: placement?.translateX ?? behavior.translateX,
    translateY: placement?.translateY ?? behavior.translateY,
    shadow: placement?.shadow || behavior.shadow,
  }

  return <ScrapbookAsset asset={asset} placement={botanicalPlacement} />
}

export default renderBotanical