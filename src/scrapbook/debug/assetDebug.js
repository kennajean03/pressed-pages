export function summarizeResolvedAsset(resolvedMaterial) {
  const asset = resolvedMaterial?.assetObject

  if (!asset) {
    return {
      assetId: resolvedMaterial?.assetKey || null,
      name: resolvedMaterial?.name || null,
      category: null,
      status: "legacy-material",
    }
  }

  return {
    assetId: asset.id,
    name: asset.name,
    category: asset.category,
    collection: asset.collection,
    materialId: asset.materialId,
    variant: asset.variant,
    sourceType: asset.provenance?.sourceType,
    physical: asset.physical,
    placements: asset.placements,
    moods: asset.moods,
  }
}

export function summarizeCompositionAssets(composition) {
  return {
    objectType: composition?.objectType,
    variant: composition?.variant,
    seed: composition?.dna?.identity?.seed,
    paper: summarizeResolvedAsset(composition?.paper),
    tape: summarizeResolvedAsset(composition?.tape),
    texture: summarizeResolvedAsset(composition?.texture),
    flower: summarizeResolvedAsset(composition?.flower),
    clip: summarizeResolvedAsset(composition?.clip),
  }
}
