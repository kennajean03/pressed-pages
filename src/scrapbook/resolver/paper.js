import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolvePaper(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.paper?.variant
  )

  const assetObject = resolveAssetForMaterial(material, dna, "paper", {
    variant,
    placements: ["card", "background"],
    seed: dna?.identity?.seed + 201,
    ...options,
  })

  return {
    ...material,
    variant,
    assetKey: assetObject?.id || `${material.id}-${variant}`,
    asset: assetObject?.path || material.asset,
    assetObject,
    className: [
      material.className,
      assetObject?.className,
      `pp-paper-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}
