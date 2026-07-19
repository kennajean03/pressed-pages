import ScrapbookPhoto from "../../../scrapbook/ScrapbookPhoto/ScrapbookPhoto"

function getPhotoData(photo = {}) {
  return photo.data || photo
}

function getPhotoSource(photo = {}) {
  const data =
    getPhotoData(photo)

  return (
    data.src ||
    data.url ||
    data.photoUrl ||
    data.imageUrl ||
    ""
  )
}

function getPhotoCaption(photo = {}) {
  const data =
    getPhotoData(photo)

  return (
    data.caption ||
    data.note ||
    data.notes ||
    ""
  )
}

function getPhotoDate(photo = {}) {
  const data =
    getPhotoData(photo)

  return (
    data.date ||
    data.createdAt ||
    data.created_at ||
    ""
  )
}

function getPhotoLocation(photo = {}) {
  const data =
    getPhotoData(photo)

  return (
    data.location ||
    ""
  )
}

function PolaroidStack({
  keepsake,
}) {
  const photos =
    Array.isArray(
      keepsake?.items
    )
      ? keepsake.items
      : []

  const preservedPhotos =
    photos.filter(
      (photo) =>
        Boolean(
          getPhotoSource(photo)
        )
    )

  if (!preservedPhotos.length) {
    return null
  }

  return (
    <section className="journey-polaroid-stack">
      <header className="journey-polaroid-stack__header">
        <p className="scrapbook-kicker">
          Captured Moments
        </p>

        <h3>
          {keepsake?.title ||
            "Moments You Captured"}
        </h3>

        <span className="journey-polaroid-stack__count">
          {preservedPhotos.length}{" "}
          preserved{" "}
          {preservedPhotos.length === 1
            ? "photo"
            : "photos"}
        </span>
      </header>

      <div className="journey-polaroid-stack__photos">
        {preservedPhotos.map(
          (
            photo,
            photoIndex
          ) => (
            <ScrapbookPhoto
              key={
                photo.id ||
                `keepsake-photo-${photoIndex}`
              }
              src={
                getPhotoSource(photo)
              }
              alt={
                getPhotoCaption(photo) ||
                `Reading memory ${photoIndex + 1}`
              }
              caption={
                getPhotoCaption(photo)
              }
              date={
                getPhotoDate(photo)
              }
              location={
                getPhotoLocation(photo)
              }
              rotation={
                photoIndex % 3 === 0
                  ? -3
                  : photoIndex % 3 === 1
                    ? 2
                    : -1
              }
              clip={
                photoIndex % 2 === 0
                  ? "paperclip"
                  : "none"
              }
              size="medium"
            />
          )
        )}
      </div>
    </section>
  )
}

export default PolaroidStack