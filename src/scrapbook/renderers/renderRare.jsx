import React from "react"

export const rareAnchorTypes = [
  "coverMosaic",
  "signatureFlower",
  "handwrittenHeart",
]

export function isRareAnchor(anchor = {}) {
  return rareAnchorTypes.includes(anchor.type)
}

export function renderRare(anchor, context = {}) {
  if (!isRareAnchor(anchor)) return null

  return context.asset
    ? context.renderAssetAnchor?.(context)
    : null
}

export default renderRare