import React from "react"

export const patinaAnchorTypes = [
  "coffeeRing",
  "pencilNote",
]

export function isPatinaAnchor(anchor = {}) {
  return patinaAnchorTypes.includes(anchor.type)
}

export function renderPatina(anchor, context = {}) {
  if (!isPatinaAnchor(anchor)) return null

  return context.asset
    ? context.renderAssetAnchor?.(context)
    : null
}

export default renderPatina