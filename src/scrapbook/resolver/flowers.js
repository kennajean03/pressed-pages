import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolveFlower(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.flower?.variant
  )

  const assetObject = resolveAssetForMaterial(material, dna, "flower", {
    variant,
    placements: ["corner", "tucked", "accent"],
    compatibleWith: [dna?.paper?.asset, dna?.paper?.variant].filter(Boolean),
    seed: dna?.identity?.seed + 203,
    ...options,
  })

  return {
    ...material,
    variant,
    corner: dna?.flower?.corner,
    assetKey: assetObject?.id || `${material.id}-${variant}`,
    asset: assetObject?.path || material.asset,
    assetObject,
    className: [
      material.className,
      assetObject?.className,
      `pp-flower-variant-${variant}`,
      dna?.flower?.corner && `pp-flower-corner-${dna.flower.corner}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}
