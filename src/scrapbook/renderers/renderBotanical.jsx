import React from "react"

import { ScrapbookAsset } from "../components/ScrapbookAsset"

export const botanicalAnchorTypes = new Set([
  "pressedFlower",
  "softFlower",
  "pressedDaisy",
  "pressedFern",
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

  return (
    <ScrapbookAsset
      asset={asset}
      placement={placement}
    />
  )
}

export default renderBotanical