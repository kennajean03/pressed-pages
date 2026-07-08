import React from "react"

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

  return (
    <ScrapbookAsset
      asset={asset}
      placement={placement}
    />
  )
}

export default renderTape