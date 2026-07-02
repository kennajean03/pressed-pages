import { resolveMaterialVariant } from "./helpers"

export function resolveTexture(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.texture?.grain
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
    className: [
      material.className,
      `pp-texture-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}