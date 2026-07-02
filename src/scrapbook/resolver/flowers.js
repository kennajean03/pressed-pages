import { resolveMaterialVariant } from "./helpers"

export function resolveFlower(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.flower?.variant
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
    className: [
      material.className,
      `pp-flower-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}