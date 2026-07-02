import { resolveMaterialVariant } from "./helpers"

export function resolveTape(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.tape?.variant
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
    className: [
      material.className,
      `pp-tape-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}