export function resolveMaterialVariant(
  material,
  preferredVariant
) {
  if (!material) return "01"

  const variants = material.variants ?? []

  if (!variants.length) {
    return "01"
  }

  if (variants.includes(preferredVariant)) {
    return preferredVariant
  }

  return variants[0]
}