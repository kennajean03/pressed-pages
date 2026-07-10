import React from "react"

import { getRelationshipBehavior } from "../behavior/relationshipBehavior"
import { ScrapbookAsset } from "../components/ScrapbookAsset"
import { getMaterialBehavior } from "../materials/materialBehaviors"

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

function resolveTapeMaterialPlacement(anchor = {}, placement = {}, behavior = {}) {
  const material = getMaterialBehavior(anchor)

  const translucency =
    material.surface === "translucent"
      ? 0.98
      : 1

  const tapeShadow =
    material.shadowSoftness === "low"
      ? "0 2px 4px rgba(79, 59, 51, 0.08)"
      : "0 3px 6px rgba(79, 59, 51, 0.12)"

  return {
    ...placement,
    width: placement?.width || behavior.width,
    scale: placement?.scale ?? behavior.scale,
    opacity:
      placement?.opacity ??
      (behavior.opacity != null
        ? behavior.opacity * translucency
        : translucency),
    rotate: placement?.rotate ?? behavior.rotate,
    translateX: placement?.translateX ?? behavior.translateX,
    translateY: placement?.translateY ?? behavior.translateY,
    shadow:
      placement?.shadow ||
      behavior.shadow ||
      tapeShadow,
  }
}

export function renderTape(anchor, context = {}) {
  const { asset, placement } = context

  if (!asset) return null

  const behavior = getRelationshipBehavior(anchor)

  const tapePlacement = resolveTapeMaterialPlacement(
    anchor,
    placement,
    behavior
  )

  return <ScrapbookAsset asset={asset} placement={tapePlacement} />
}

export default renderTape