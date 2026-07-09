import React from "react"

import { getRelationshipBehavior } from "../behavior/relationshipBehavior"
import { ScrapbookAsset } from "../components/ScrapbookAsset"

export const tapeAnchorTypes = new Set([
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
])

export function isTapeAnchor(anchor = {}) {
  return (
    anchor.rendererType === "tape" ||
    anchor.objectType === "tape" ||
    anchor.object?.type === "tape" ||
    anchor.category === "tape" ||
    tapeAnchorTypes.has(anchor.type)
  )
}

export function renderTape(anchor, context = {}) {
  const { asset, placement } = context

  if (!asset) return null

  const behavior = getRelationshipBehavior(anchor)

  const tapePlacement = {
    ...placement,
    width: placement?.width || behavior.width,
    scale: placement?.scale ?? behavior.scale,
    opacity: placement?.opacity ?? behavior.opacity,
    rotate: placement?.rotate ?? behavior.rotate,
    translateX: placement?.translateX ?? behavior.translateX,
    translateY: placement?.translateY ?? behavior.translateY,
    shadow: placement?.shadow || behavior.shadow,
  }

  return <ScrapbookAsset asset={asset} placement={tapePlacement} />
}

export default renderTape