const BOOK_ASSET_BUCKET = "book-covers"

function getOwnedBookAssetPath({
  url,
  userId,
}) {
  if (
    typeof url !== "string" ||
    !url.trim() ||
    !userId
  ) {
    return ""
  }

  try {
    const parsedUrl = new URL(url.trim())
    const publicPathMarker =
      `/storage/v1/object/public/${BOOK_ASSET_BUCKET}/`
    const markerIndex =
      parsedUrl.pathname.indexOf(publicPathMarker)

    if (markerIndex === -1) return ""

    const encodedPath =
      parsedUrl.pathname.slice(
        markerIndex + publicPathMarker.length
      )
    const assetPath = decodeURIComponent(encodedPath)

    return assetPath.startsWith(`${userId}/`) &&
      !assetPath.includes("..")
      ? assetPath
      : ""
  } catch {
    return ""
  }
}

function getOwnedReadingMemoryPaths({
  photoPaths = [],
  userId,
}) {
  if (!userId) return []

  const suppliedPaths =
    Array.isArray(photoPaths)
      ? photoPaths
      : [photoPaths]

  return [
    ...new Set(
      suppliedPaths
        .filter((path) => typeof path === "string")
        .map((path) => path.trim())
        .filter(
          (path) =>
            path.startsWith(`${userId}/`) &&
            !path.includes("..")
        )
    ),
  ]
}

export {
  BOOK_ASSET_BUCKET,
  getOwnedBookAssetPath,
  getOwnedReadingMemoryPaths,
}
