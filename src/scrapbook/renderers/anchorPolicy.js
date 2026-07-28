const PHYSICAL_FASTENER_TYPES = new Set([
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
  "brassClip",
])

const ASSET_REQUIRED_TYPES = new Set([
  "dateStamp",
  "pencilNote",
])

function isPhysicalFastener(anchor = {}) {
  return (
    PHYSICAL_FASTENER_TYPES.has(anchor.type) ||
    anchor.category === "attachment" ||
    anchor.category === "metal" ||
    anchor.assembly?.role === "fastener" ||
    anchor.attachment === "holding" ||
    anchor.attachment === "clamped"
  )
}

function hasRenderableAsset(anchor = {}) {
  return Boolean(anchor.assetId)
}

export function applyAnchorPolicy(anchors = [], options = {}) {
  const hiddenAnchorTypes = new Set(options.hiddenAnchorTypes || [])
  const maxFasteners =
    Number.isFinite(options.maxFasteners)
      ? Math.max(0, options.maxFasteners)
      : 1

  let fastenerCount = 0

  return anchors.filter((anchor) => {
    if (!anchor || hiddenAnchorTypes.has(anchor.type)) {
      return false
    }

    if (
      ASSET_REQUIRED_TYPES.has(anchor.type) &&
      !hasRenderableAsset(anchor)
    ) {
      return false
    }

    if (!isPhysicalFastener(anchor)) {
      return true
    }

    if (fastenerCount >= maxFasteners) {
      return false
    }

    fastenerCount += 1
    return true
  })
}

export default applyAnchorPolicy
