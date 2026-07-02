export const defaultAssetPhysicalProfile = {
  thickness: "flat",
  transparency: 0,
  edgeSoftness: 0.5,
  shadowDepth: "soft",
  scannerDpi: null,
}

export const defaultAssetProvenance = {
  sourceType: "placeholder",
  scannedBy: null,
  scannedAt: null,
  scanner: null,
  notes: "Code-generated placeholder until real Pressed Pages scans are added.",
}

export function createScrapbookAsset(asset) {
  return {
    collection: "core",
    seasons: ["all"],
    moods: [],
    tones: [],
    colors: [],
    compatibleWith: [],
    placements: [],
    rarity: "common",
    path: null,
    className: null,
    cssVariable: null,
    canFlip: true,
    maxRotation: 8,
    preferredShadow: "soft",
    physical: defaultAssetPhysicalProfile,
    provenance: defaultAssetProvenance,
    ...asset,
    physical: {
      ...defaultAssetPhysicalProfile,
      ...(asset.physical || {}),
    },
    provenance: {
      ...defaultAssetProvenance,
      ...(asset.provenance || {}),
    },
  }
}
