import { resolveMaterialVariant } from "./helpers"

export function resolveClip(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.clip?.variant
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
  }
}