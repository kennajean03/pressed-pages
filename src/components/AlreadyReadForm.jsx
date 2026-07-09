import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function AlreadyReadForm({
  saveMessage,
  alreadyReadBook,
  updateAlreadyReadBook,
  saveAlreadyReadBook,
  setStep,
  user,
  TextInput,
  DateInput,
  ImageUpload,
}) {
  return (
    <section className="already-read-page scrapbook-page">
      <div className="scrapbook-page__header already-read-page__header">
        <p className="scrapbook-eyebrow">Quick Add</p>
        <h1>Already Read</h1>
        <p className="scrapbook-page__intro">
          Add a finished book to your library without doing the full review flow.
          You can always open it later and add more details.
        </p>
      </div>

      {saveMessage && <p className="save-message">{saveMessage}</p>}

      <ScrapbookPanel
        className="scrapbook-form-panel already-read-form"
        scrapbookId="action.alreadyReadForm"
        objectType="action"
        variant="alreadyReadForm"
        recipeId="action.alreadyReadForm"
      >
        <TextInput
          label="Title"
          value={alreadyReadBook.title}
          onChange={(value) => updateAlreadyReadBook("title", value)}
        />

        <TextInput
          label="Author"
          value={alreadyReadBook.author}
          onChange={(value) => updateAlreadyReadBook("author", value)}
        />

        <ImageUpload
          label="Upload Book Cover"
          value={alreadyReadBook.coverUrl}
          onChange={(value) => updateAlreadyReadBook("coverUrl", value)}
          user={user}
        />

        <TextInput
          label="Rating /5 optional"
          value={alreadyReadBook.rating}
          onChange={(value) => updateAlreadyReadBook("rating", value)}
        />

        <DateInput
          label="Date Finished optional"
          value={alreadyReadBook.dateFinished}
          onChange={(value) => updateAlreadyReadBook("dateFinished", value)}
        />

        <label className="scrapbook-field">
          <span>Notes optional</span>
          <textarea
            value={alreadyReadBook.notes}
            onChange={(event) =>
              updateAlreadyReadBook("notes", event.target.value)
            }
            placeholder="Tiny thoughts, memory joggers, or why you added this one..."
          />
        </label>
      </ScrapbookPanel>

      <div className="library-action-row scrapbook-action-row">
        <button type="button" onClick={() => setStep("addBook")}>
          Back
        </button>
        <button type="button" onClick={saveAlreadyReadBook}>
          Add To Finished Shelf
        </button>
      </div>
    </section>
  )
}

export default AlreadyReadForm