import { resolveMaterialVariant } from "./helpers"
import { resolveAssetForMaterial } from "./assets"

export function resolveTape(material, dna, options = {}) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.tape?.variant
  )

  const assetObject = resolveAssetForMaterial(material, dna, "tape", {
    variant,
    placements: ["taped", "corner", "edge"],
    seed: dna?.identity?.seed + 202,
    ...options,
  })

  return {
    ...material,
    variant,
    angle: dna?.tape?.angle,
    assetKey: assetObject?.id || `${material.id}-${variant}`,
    asset: assetObject?.path || material.asset,
    assetObject,
    className: [
      material.className,
      assetObject?.className,
      `pp-tape-variant-${variant}`,
      dna?.tape?.angle && `pp-tape-angle-${dna.tape.angle}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}
