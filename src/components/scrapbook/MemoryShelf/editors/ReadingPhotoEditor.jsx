import {
  useEffect,
  useState,
} from "react"
import ScrapbookPhoto from "../../ScrapbookPhoto/ScrapbookPhoto"

function ReadingPhotoEditor({
  item,

  readingLogPhotoFiles = {},
  setReadingLogPhotoFiles,

  readingLogPhotoCaptionInputs = {},
  setReadingLogPhotoCaptionInputs,

  readingLogPhotoLocationInputs = {},
  setReadingLogPhotoLocationInputs,

  readingLogPhotoDateInputs = {},
  setReadingLogPhotoDateInputs,
}) {
  const [previewUrl, setPreviewUrl] =
    useState("")

  if (!item) {
    return null
  }

  const selectedFile =
    readingLogPhotoFiles[item.id] ||
    null

  const photoCaption =
    readingLogPhotoCaptionInputs[item.id] ||
    ""

  const photoLocation =
    readingLogPhotoLocationInputs[item.id] ||
    ""

  const photoDate =
    readingLogPhotoDateInputs[item.id] ||
    ""

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("")
      return undefined
    }

    const nextPreviewUrl =
      URL.createObjectURL(selectedFile)

    setPreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(
        nextPreviewUrl
      )
    }
  }, [selectedFile])

  const handlePhotoChange = (
    event
  ) => {
    const nextFile =
      event.target.files?.[0] ||
      null

    if (!nextFile) {
      return
    }

    if (
      !nextFile.type.startsWith(
        "image/"
      )
    ) {
      event.target.value = ""
      return
    }

    setReadingLogPhotoFiles?.({
      ...readingLogPhotoFiles,
      [item.id]: nextFile,
    })

    if (!photoDate) {
      const today =
        new Date()
          .toISOString()
          .slice(0, 10)

      setReadingLogPhotoDateInputs?.({
        ...readingLogPhotoDateInputs,
        [item.id]: today,
      })
    }
  }

  const clearPhoto = () => {
    setReadingLogPhotoFiles?.(
      (
        currentFiles = {}
      ) => {
        const nextFiles = {
          ...currentFiles,
        }

        delete nextFiles[item.id]

        return nextFiles
      }
    )
  }

  return (
    <div className="reading-log-memory-editor">
      <p className="scrapbook-kicker">
        Reading Photo
      </p>

      <h3>
        Preserve a photo from today
      </h3>

      <p>
        Tuck a quiet moment from your reading
        life into this session’s journal.
      </p>

      <div className="review-field">
        <label
          htmlFor={`reading-photo-${item.id}`}
        >
          Choose Photo
        </label>

        <input
          id={`reading-photo-${item.id}`}
          type="file"
          accept="image/*"
          onChange={
            handlePhotoChange
          }
        />
      </div>

      <div className="reading-log-form-grid">
        <div className="review-field">
          <label
            htmlFor={`reading-photo-location-${item.id}`}
          >
            Reading Place
          </label>

          <input
            id={`reading-photo-location-${item.id}`}
            type="text"
            value={photoLocation}
            placeholder="Porch swing, coffee shop..."
            onChange={(event) => {
              setReadingLogPhotoLocationInputs?.({
                ...readingLogPhotoLocationInputs,
                [item.id]:
                  event.target.value,
              })
            }}
          />
        </div>

        <div className="review-field">
          <label
            htmlFor={`reading-photo-date-${item.id}`}
          >
            Memory Date
          </label>

          <input
            id={`reading-photo-date-${item.id}`}
            type="date"
            value={photoDate}
            onChange={(event) => {
              setReadingLogPhotoDateInputs?.({
                ...readingLogPhotoDateInputs,
                [item.id]:
                  event.target.value,
              })
            }}
          />
        </div>
      </div>

      <div className="review-field">
        <label
          htmlFor={`reading-photo-caption-${item.id}`}
        >
          Handwritten Caption
        </label>

        <input
          id={`reading-photo-caption-${item.id}`}
          type="text"
          value={photoCaption}
          placeholder="Today's little memory."
          onChange={(event) => {
            setReadingLogPhotoCaptionInputs?.({
              ...readingLogPhotoCaptionInputs,
              [item.id]:
                event.target.value,
            })
          }}
        />
      </div>

      <div className="reading-photo-preview">
        <ScrapbookPhoto
          src={previewUrl}
          alt={
            selectedFile
              ? `Reading memory selected for ${
                  item.bookInfo?.title ||
                  "this book"
                }`
              : "Reading memory waiting to be selected"
          }
          caption={
            photoCaption ||
            (selectedFile
              ? "Today's little memory."
              : "")
          }
          location={
            photoLocation
          }
          date={
            photoDate
              ? new Date(
                  `${photoDate}T12:00:00`
                ).toLocaleDateString()
              : ""
          }
          clip="paperclip"
          size="small"
          rotation={-2}
        />
      </div>

      {selectedFile && (
        <div className="reading-photo-selection-note">
          <p>
            <strong>
              Selected:
            </strong>{" "}
            {selectedFile.name}
          </p>

          <button
            type="button"
            className="paper-button paper-button--secondary"
            onClick={clearPhoto}
          >
            Remove Photo
          </button>
        </div>
      )}
    </div>
  )
}

export default ReadingPhotoEditor