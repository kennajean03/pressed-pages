import {
  hydrateReadingLogArtifacts,
} from "./memoryArtifactSerializer"

import {
  createReadingMemoryPhotoUrl,
} from "./artifactStorage"

export async function buildReadingLogFromRow(
  row = {}
) {
  let photoUrl = ""

  if (row.photo_path) {
    try {
      photoUrl =
        await createReadingMemoryPhotoUrl(
          row.photo_path
        )
    } catch (photoError) {
      console.warn(
        "Could not load reading memory photo:",
        photoError
      )
    }
  }

  return hydrateReadingLogArtifacts({
    id: row.id,

    bookId:
      row.book_id || "",

    date:
      row.log_date || "",

    pagesRead:
      row.pages_read ?? 0,

    endPage:
      row.end_page ?? null,

    minutesRead:
      row.minutes_read ?? null,

    notes:
      row.notes || "",

    favoriteQuote:
      row.favorite_quote || "",

    quoteSource:
      row.quote_source || "",

    quotePage:
      row.quote_page || "",

    flowerVariant:
      row.flower_variant || "",

    flowerLabel:
      row.flower_label || "",

    flowerDate:
      row.flower_date || "",

    photoPath:
      row.photo_path || "",

    photoUrl,

    photoCaption:
      row.photo_caption || "",

    photoLocation:
      row.photo_location || "",

    photoDate:
      row.photo_date || "",

    createdAt:
      row.created_at || "",

    updatedAt:
      row.updated_at || "",
  })
}

export default buildReadingLogFromRow