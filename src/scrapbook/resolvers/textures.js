import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolveTexture(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(material, dna?.texture?.stain)

  const assetObject = resolveAssetForMaterial(material, dna, "texture", {
    variant,
    placements: ["background", "edge"],
    seed: dna?.identity?.seed + 205,
    ...options,
  })

  return {
    ...material,
    variant,
    grain: dna?.texture?.grain,
    assetKey: assetObject?.id || `${material.id}-${variant}`,
    asset: assetObject?.path || material.asset,
    assetObject,
    className: [
      material.className,
      assetObject?.className,
      `pp-texture-variant-${variant}`,
      dna?.texture?.grain && `pp-texture-grain-${dna.texture.grain}`,
    ].filter(Boolean).join(" "),
  }
}
