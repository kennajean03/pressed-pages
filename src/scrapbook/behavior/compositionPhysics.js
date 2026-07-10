import { getMaterialBehavior } from "../materials/materialBehaviors"

const defaultPhysics = {
  compressionOffset: "0px",
  sharedRotationOffset: 0,
  sharedShadow: null,
  rigidityScale: 1,
}

const compressionPhysics = {
  soft: {
    compressionOffset: "2px",
    rigidityScale: 0.99,
  },
  medium: {
    compressionOffset: "4px",
    rigidityScale: 0.985,
  },
  firm: {
    compressionOffset: "6px",
    rigidityScale: 0.98,
  },
}

export function resolveCompositionPhysics(anchor = {}) {
  const relationship = anchor.relationship || {}
  const material = getMaterialBehavior(anchor)

  const compression =
    compressionPhysics[relationship.compression] || defaultPhysics

  const compressionOffset =
    parseFloat(compression.compressionOffset) *
    material.compressionResponse

  return {
    ...defaultPhysics,
    ...compression,

    compressionOffset: `${compressionOffset}px`,

    rigidityScale:
      compression.rigidityScale +
      (material.rigidity - 0.5) * 0.05,

    sharedRotationOffset:
      relationship.sharedRotation
        ? -(1 - material.rigidity) * 2
        : 0,

    sharedShadow:
      relationship.sharedShadow
        ? "0 6px 12px rgba(79,59,51,.12)"
        : null,

    material,
  }
}

export default resolveCompositionPhysics