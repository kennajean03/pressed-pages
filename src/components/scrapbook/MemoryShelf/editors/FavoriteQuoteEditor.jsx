function FavoriteQuoteEditor({
  item,
  readingLogQuoteInputs,
  setReadingLogQuoteInputs,
  readingLogQuoteSourceInputs,
  setReadingLogQuoteSourceInputs,
  readingLogQuotePageInputs,
  setReadingLogQuotePageInputs,
}) {
  if (!item) {
    return null
  }

  return (
    <div className="reading-log-memory-editor">
      <p className="scrapbook-kicker">
        Favorite Quote
      </p>

      <h3>
        Preserve a line you&apos;ll want to
        remember
      </h3>

      <p>
        Save a passage that made this reading
        session memorable.
      </p>

      <div className="review-field">
        <label>
          Favorite Quote
        </label>

        <textarea
          value={
            readingLogQuoteInputs[
              item.id
            ] || ""
          }
          onChange={(event) =>
            setReadingLogQuoteInputs({
              ...readingLogQuoteInputs,

              [item.id]:
                event.target.value,
            })
          }
          placeholder="A sentence worth keeping forever..."
        />
      </div>

      <div className="reading-log-form-grid">
        <div className="review-field">
          <label>
            Chapter or Source (optional)
          </label>

          <input
            type="text"
            value={
              readingLogQuoteSourceInputs[
                item.id
              ] || ""
            }
            onChange={(event) =>
              setReadingLogQuoteSourceInputs({
                ...readingLogQuoteSourceInputs,

                [item.id]:
                  event.target.value,
              })
            }
            placeholder="Chapter 18"
          />
        </div>

        <div className="review-field">
          <label>
            Page (optional)
          </label>

          <input
            type="text"
            value={
              readingLogQuotePageInputs[
                item.id
              ] || ""
            }
            onChange={(event) =>
              setReadingLogQuotePageInputs({
                ...readingLogQuotePageInputs,

                [item.id]:
                  event.target.value,
              })
            }
            placeholder="237"
          />
        </div>
      </div>
    </div>
  )
}

export default FavoriteQuoteEditor