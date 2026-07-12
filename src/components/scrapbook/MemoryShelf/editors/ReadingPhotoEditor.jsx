import ScrapbookPhoto from "../../ScrapbookPhoto/ScrapbookPhoto"

function ReadingPhotoEditor() {
  return (
    <div className="reading-log-memory-editor">
      <p className="scrapbook-kicker">
        Reading Photo
      </p>

      <h3>
        Preserve a photo from today
      </h3>

      <p>
        Soon you'll be able to tuck photos
        from your reading life directly into
        your journal.
      </p>

      <div className="reading-photo-preview">
        <ScrapbookPhoto
          caption="Today's little memory."
          date={
            new Date().toLocaleDateString()
          }
          clip="paperclip"
          size="small"
          rotation={-2}
        />
      </div>
    </div>
  )
}

export default ReadingPhotoEditor