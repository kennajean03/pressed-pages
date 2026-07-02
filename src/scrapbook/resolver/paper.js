import { resolveMaterialVariant } from "./helpers"

export function resolvePaper(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.paper?.variant
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
    className: [
      material.className,
      `pp-paper-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}