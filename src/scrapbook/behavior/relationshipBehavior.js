import { getAttachmentPoint } from "./attachmentPoints"
import { resolveCompositionPhysics } from "./compositionPhysics"


const defaultBehavior = {
  width: null,
  scale: null,
  opacity: null,
  rotate: null,
  translateX: null,
  translateY: null,
  shadow: null,
  layer: null,
  brightness: null,
}

const relationshipBehaviors = {
  heldBy: {
    scale: 0.88,
    opacity: 0.9,
    rotate: -3,
    translateX: "0px",
    translateY: "8px",
    shadow: "0 4px 8px rgba(79, 59, 51, 0.09)",
    layer: -1,
    brightness: 0.985,
  },

  fastens: {
    width: "82px",
    scale: 0.95,
    opacity: 0.96,
    rotate: -3,
    translateX: "0px",
    translateY: "-3px",
    shadow: "0 5px 10px rgba(79, 59, 51, 0.12)",
    layer: 2,
    brightness: 1,
  },
}

const tapeBehaviorByStrategy = {
  topEdge: {
    width: "92px",
    scale: 0.92,
    opacity: 0.95,
    point: "topEdge",
    shadow: "0 4px 8px rgba(79, 59, 51, 0.14)",
  },
  cornerHold: {
    width: "82px",
    scale: 0.9,
    opacity: 0.94,
    point: "corner",
    shadow: "0 3px 7px rgba(79, 59, 51, 0.13)",
  },
  smallStrip: {
    width: "68px",
    scale: 0.86,
    opacity: 0.93,
    point: "strip",
    shadow: "0 3px 6px rgba(79, 59, 51, 0.12)",
  },
  softTopEdge: {
    width: "88px",
    scale: 0.91,
    opacity: 0.95,
    point: "topEdge",
    shadow: "0 4px 8px rgba(79, 59, 51, 0.14)",
  },
  stemHold: {
    width: "96px",
    scale: 0.9,
    opacity: 0.92,
    point: "stem",
    shadow: "0 3px 6px rgba(79, 59, 51, 0.1)",
  },
  softStemHold: {
    width: "90px",
    scale: 0.88,
    opacity: 0.9,
    point: "stem",
    shadow: "0 3px 6px rgba(79, 59, 51, 0.09)",
  },
  fernHold: {
    width: "88px",
    scale: 0.87,
    opacity: 0.9,
    point: "stem",
    shadow: "0 3px 6px rgba(79, 59, 51, 0.09)",
  },
}

const botanicalBehaviorByStrategy = {
  cornerPeek: {
    scale: 0.72,
    opacity: 0.78,
    rotate: -8,
    translateX: "14px",
    translateY: "24px",
    shadow: "0 1px 3px rgba(79, 59, 51, 0.07)",
  },
}

const defaultTapeBehavior = {
  width: "76px",
  scale: 0.88,
  opacity: 0.94,
  rotate: 0,
  translateX: "0px",
  translateY: "-7px",
  shadow: "0 3px 6px rgba(79, 59, 51, 0.12)",
}

const defaultBotanicalBehavior = {
  scale: 0.72,
  opacity: 0.78,
  rotate: -8,
  translateX: "14px",
  translateY: "24px",
  shadow: "0 1px 3px rgba(79, 59, 51, 0.07)",
}

export function getRelationshipBehavior(anchor = {}) {
  const relationship = anchor.relationship

  if (!relationship) return defaultBehavior

 if (relationshipBehaviors[relationship.relation]) {
  const behavior = relationshipBehaviors[relationship.relation]
  const physics =
    resolveCompositionPhysics(anchor)

  return {
    ...defaultBehavior,
    ...behavior,
    translateY: behavior.translateY ?? physics.compressionOffset,
    scale: behavior.scale != null ? behavior.scale * physics.rigidityScale : null,
    rotate:
      (relationship.rotationBias ?? behavior.rotate ?? 0) +
      physics.sharedRotationOffset,
    opacity: relationship.visibility ?? behavior.opacity,
    shadow: physics.sharedShadow ?? behavior.shadow ?? defaultBehavior.shadow,
    brightness: behavior.brightness,
    layer: behavior.layer,
  }
}

  if (relationship.relation === "attachedTo") {
    const strategyBehavior = tapeBehaviorByStrategy[relationship.strategy] || {}
    const attachmentPoint = getAttachmentPoint(
      relationship.targetType,
      strategyBehavior.point
    )

    return {
      ...defaultTapeBehavior,
      ...strategyBehavior,
      rotate:
        relationship.rotationBias ??
        attachmentPoint.rotate ??
        defaultTapeBehavior.rotate,
      translateX: attachmentPoint.x ?? defaultTapeBehavior.translateX,
      translateY: attachmentPoint.y ?? defaultTapeBehavior.translateY,
      opacity:
        relationship.visibility ??
        strategyBehavior.opacity ??
        defaultTapeBehavior.opacity,
    }
  }

  if (relationship.relation === "tuckedUnder") {
    return {
      ...defaultBotanicalBehavior,
      ...(botanicalBehaviorByStrategy[relationship.strategy] || {}),
      rotate:
        relationship.rotationBias ??
        botanicalBehaviorByStrategy[relationship.strategy]?.rotate ??
        defaultBotanicalBehavior.rotate,
      opacity:
        relationship.visiblePercent != null
          ? Math.max(0.72, relationship.visiblePercent + 0.58)
          : defaultBotanicalBehavior.opacity,
    }
  }

  return defaultBehavior
}

export default getRelationshipBehavior