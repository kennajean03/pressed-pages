import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolveSticker(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(material, dna?.sticker?.variant)

  const assetObject = resolveAssetForMaterial(material, dna, "sticker", {
    variant,
    placements: ["accent", "corner"],
    seed: dna?.identity?.seed + 206,
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
      `pp-sticker-variant-${variant}`,
    ].filter(Boolean).join(" "),
  }
}
