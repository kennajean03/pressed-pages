import { resolveMaterialVariant } from "./helpers"

export function resolveSticker(material, dna) {
  if (!material) return null

  const variant = resolveMaterialVariant(
    material,
    dna?.sticker?.variant
  )

  return {
    ...material,
    variant,
    assetKey: `${material.id}-${variant}`,
    asset: material.asset,
    className: [
      material.className,
      `pp-sticker-variant-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}