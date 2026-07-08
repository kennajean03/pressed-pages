import React from "react"

import { ScrapbookAsset } from "../components/ScrapbookAsset"

export const stampAnchorTypes = new Set(["dateStamp"])

export function isStampAnchor(anchor = {}) {
  return (
    anchor.rendererType === "stamp" ||
    anchor.objectType === "stamp" ||
    anchor.object?.type === "stamp" ||
    anchor.category === "stamp" ||
    stampAnchorTypes.has(anchor.type)
  )
}

export function renderStamp(anchor, context = {}) {
  const { asset, placement } = context

  if (!asset) return null

  return (
    <ScrapbookAsset
      asset={asset}
      placement={placement}
    />
  )
}

export default renderStamp