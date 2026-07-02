import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolveClip(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(material, dna?.clip?.variant)

  const assetObject = resolveAssetForMaterial(material, dna, "metal", {
    variant,
    placements: ["pinned", "corner"],
    seed: dna?.identity?.seed + 204,
    ...options,
  })

  return {
    ...material,
    variant,
    corner: dna?.clip?.corner,
    assetKey: assetObject?.id || `${material.id}-${variant}`,
    asset: assetObject?.path || material.asset,
    assetObject,
    className: [
      material.className,
      assetObject?.className,
      `pp-clip-variant-${variant}`,
      dna?.clip?.corner && `pp-clip-corner-${dna.clip.corner}`,
    ].filter(Boolean).join(" "),
  }
}
