import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function BacklogImportForm({
  saveMessage,
  backlogRows,
  updateBacklogRow,
  removeBacklogRow,
  addBacklogRow,
  importBacklogBooks,
  setStep,
}) {
  return (
    <section className="backlog-import-page scrapbook-page">
      <div className="scrapbook-page__header backlog-import-page__header">
        <p className="scrapbook-eyebrow">Bulk Add</p>
        <h1>Backlog Import</h1>
        <p className="scrapbook-page__intro">
          Add older finished books in batches. Only title and author are
          required; rating and date finished are optional.
        </p>
      </div>

      {saveMessage && <p className="save-message">{saveMessage}</p>}

      <ScrapbookPanel
        className="backlog-import-panel scrapbook-form-panel"
        scrapbookId="action.backlogImportForm"
        objectType="action"
        variant="backlogImportForm"
        recipeId="action.backlogImportForm"
      >
        <div className="backlog-import-header">
          <span>Title *</span>
          <span>Author *</span>
          <span>Rating</span>
          <span>Date Finished</span>
          <span></span>
        </div>

        {backlogRows.map((row, index) => (
          <div className="backlog-import-row" key={`backlog-row-${index}`}>
            <input
              value={row.title}
              onChange={(event) =>
                updateBacklogRow(index, "title", event.target.value)
              }
              placeholder="Book title"
            />
            <input
              value={row.author}
              onChange={(event) =>
                updateBacklogRow(index, "author", event.target.value)
              }
              placeholder="Author"
            />
            <input
              value={row.rating}
              onChange={(event) =>
                updateBacklogRow(index, "rating", event.target.value)
              }
              placeholder="4.5"
            />
            <input
              type="date"
              value={row.dateFinished}
              onChange={(event) =>
                updateBacklogRow(index, "dateFinished", event.target.value)
              }
            />
            <button
              type="button"
              className="backlog-remove-button"
              onClick={() => removeBacklogRow(index)}
              disabled={backlogRows.length === 1}
              aria-label="Remove row"
            >
              ×
            </button>
          </div>
        ))}
      </ScrapbookPanel>

      <div className="library-action-row scrapbook-action-row">
        <button type="button" onClick={addBacklogRow}>
          + Add Row
        </button>
        <button type="button" onClick={importBacklogBooks}>
          Import Books
        </button>
        <button type="button" onClick={() => setStep("addBook")}>
          Back
        </button>
      </div>
    </section>
  )
}

export default BacklogImportForm