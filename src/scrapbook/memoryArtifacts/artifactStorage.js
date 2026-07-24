import { supabase } from "../../lib/supabase"

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
    const parsedUrl =
      new URL(url.trim())

    const publicPathMarker =
      `/storage/v1/object/public/${BOOK_ASSET_BUCKET}/`

    const markerIndex =
      parsedUrl.pathname.indexOf(
        publicPathMarker
      )

    if (markerIndex === -1) {
      return ""
    }

    const encodedPath =
      parsedUrl.pathname.slice(
        markerIndex +
          publicPathMarker.length
      )

    const assetPath =
      decodeURIComponent(
        encodedPath
      )

    if (
      !assetPath.startsWith(
        `${userId}/`
      )
    ) {
      return ""
    }

    return assetPath
  } catch {
    return ""
  }
}

async function deleteOwnedBookAssets({
  urls = [],
  userId,
}) {
  if (!userId) {
    throw new Error(
      "A user is required before deleting book assets."
    )
  }

  const suppliedUrls =
    Array.isArray(urls)
      ? urls
      : [urls]

  const assetPaths = [
    ...new Set(
      suppliedUrls
        .map((url) =>
          getOwnedBookAssetPath({
            url,
            userId,
          })
        )
        .filter(Boolean)
    ),
  ]

  if (!assetPaths.length) {
    return {
      deletedPaths: [],
      count: 0,
    }
  }

  const { error } =
    await supabase.storage
      .from(BOOK_ASSET_BUCKET)
      .remove(assetPaths)

  if (error) {
    throw error
  }

  return {
    deletedPaths: assetPaths,
    count: assetPaths.length,
  }
}

const MEMORY_BUCKET = "reading-memories"
const BOOK_ASSET_BUCKET = "book-covers"

function getFileExtension(file) {
  const extension = file?.name
    ?.split(".")
    .pop()
    ?.toLowerCase()

  return extension || "jpg"
}

function buildReadingPhotoPath({
  userId,
  reviewId,
  logId,
  file,
}) {
  const extension = getFileExtension(file)

  return `${userId}/${reviewId}/${logId}.${extension}`
}

async function createReadingMemoryPhotoUrl(
  photoPath
) {
  if (!photoPath) {
    return ""
  }

  const { data, error } =
    await supabase.storage
      .from(MEMORY_BUCKET)
      .createSignedUrl(
        photoPath,
        60 * 60
      )

  if (error) {
    throw error
  }

  return data?.signedUrl || ""
}

async function uploadReadingMemoryPhoto({
  file,
  userId,
  reviewId,
  logId,
}) {
  if (!file) {
    return null
  }

  if (!userId || !reviewId || !logId) {
    throw new Error(
      "A user, book, and reading log are required before uploading a photo."
    )
  }

  const photoPath =
    buildReadingPhotoPath({
      userId,
      reviewId,
      logId,
      file,
    })

  const { error } =
    await supabase.storage
      .from(MEMORY_BUCKET)
      .upload(photoPath, file, {
        upsert: true,
        contentType:
          file.type || undefined,
      })

  if (error) {
    throw error
  }

  const photoUrl =
    await createReadingMemoryPhotoUrl(
      photoPath
    )

  return {
    photoPath,
    photoUrl,
  }
}

async function deleteReadingMemoryPhotos(
  photoPaths = []
) {
  const suppliedPaths =
    Array.isArray(photoPaths)
      ? photoPaths
      : [photoPaths]

  const validPaths = [
    ...new Set(
      suppliedPaths
        .filter(
          (path) =>
            typeof path ===
              "string" &&
            path.trim().length > 0
        )
        .map((path) =>
          path.trim()
        )
    ),
  ]

  if (!validPaths.length) {
    return {
      deletedPaths: [],
      count: 0,
    }
  }

  const { error } =
    await supabase.storage
      .from(MEMORY_BUCKET)
      .remove(validPaths)

  if (error) {
    throw error
  }

  return {
    deletedPaths: validPaths,
    count: validPaths.length,
  }
}

export {
  createReadingMemoryPhotoUrl,
  deleteOwnedBookAssets,
  deleteReadingMemoryPhotos,
  uploadReadingMemoryPhoto,
}