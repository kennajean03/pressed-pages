import React from "react"

import { getRelationshipBehavior } from "../behavior/relationshipBehavior"
import { ScrapbookAsset } from "../components/ScrapbookAsset"
import { getMaterialBehavior } from "../materials/materialBehaviors"

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

function resolveBotanicalMaterialPlacement(anchor = {}, placement = {}, behavior = {}) {
  const material = getMaterialBehavior(anchor)

  const curlLift = `${Math.round(material.curl * 4)}px`
  const delicateOpacity = material.surface === "organic" ? 0.96 : 1

  return {
    ...placement,
    scale: placement?.scale ?? behavior.scale,
    opacity:
      placement?.opacity ??
      (behavior.opacity != null ? behavior.opacity * delicateOpacity : delicateOpacity),
    rotate: placement?.rotate ?? behavior.rotate,
    translateX: placement?.translateX ?? behavior.translateX,
    translateY:
      placement?.translateY ??
      behavior.translateY ??
      curlLift,
    shadow:
      placement?.shadow ||
      behavior.shadow ||
      "0 2px 5px rgba(79, 59, 51, 0.08)",
  }
}

export function renderBotanical(anchor, context = {}) {
  const { asset, placement } = context

  if (!asset) return null

  const behavior = getRelationshipBehavior(anchor)
  const botanicalPlacement = resolveBotanicalMaterialPlacement(
    anchor,
    placement,
    behavior
  )

  return <ScrapbookAsset asset={asset} placement={botanicalPlacement} />
}

export default renderBotanical