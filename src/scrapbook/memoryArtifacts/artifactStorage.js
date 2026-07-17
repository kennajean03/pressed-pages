import { supabase } from "../../lib/supabase"

const MEMORY_BUCKET = "reading-memories"

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

export {
  createReadingMemoryPhotoUrl,
  uploadReadingMemoryPhoto,
}