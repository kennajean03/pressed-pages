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
  const { asset, placement, composition } = context

  if (!asset) return null

  const hasEphemeraSibling = composition?.anchors?.some((siblingAnchor) =>
    ["reviewNote", "libraryCard", "ticketStub", "annualMemoryNote"].includes(
      siblingAnchor.type
    )
  )

  const tapePlacement = hasEphemeraSibling
    ? {
        ...placement,
        width: placement?.width || "76px",
        scale: placement?.scale ?? 0.88,
        opacity: placement?.opacity ?? 0.94,
        shadow:
          placement?.shadow || "0 3px 6px rgba(79, 59, 51, 0.12)",
      }
    : placement

  return (
    <ScrapbookAsset
      asset={asset}
      placement={tapePlacement}
    />
  )
}

export default renderTape