import { useState } from "react"
import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./BookInformationStep.css"

function BookInformationStep({
  editingReviewId,
  bookInfo,
  metrics,
  user,
  readingProgressPercent,
  updateBookInfo,
  updateMetric,
  saveReviewBasicChanges,
  handleBookInfoNext,
  leaveReviewEditor,
  getProgressUnitCopy,
  TextInput,
  DateInput,
  ImageUpload,
  ScoreSlider,
  ProgressBar,
}) {
  const [entryMode, setEntryMode] = useState("search")
  const [bookSearch, setBookSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchState, setSearchState] = useState("idle")
  const [searchMessage, setSearchMessage] = useState("")

  async function searchOpenLibrary(event) {
    event.preventDefault()
    const query = bookSearch.trim()

    if (!query) {
      setSearchMessage("Enter a title, author, or ISBN to search.")
      return
    }

    setSearchState("loading")
    setSearchMessage("")

    try {
      const params = new URLSearchParams({
        q: query,
        limit: "6",
        fields:
          "key,title,author_name,cover_i,first_publish_year,number_of_pages_median",
      })
      const response = await fetch(
        `https://openlibrary.org/search.json?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error("Book search is temporarily unavailable.")
      }

      const payload = await response.json()
      const results = Array.isArray(payload?.docs) ? payload.docs : []
      setSearchResults(results)
      setSearchState("complete")
      setSearchMessage(
        results.length
          ? `${results.length} possible matches found.`
          : "No matches found. Try another search or enter the book manually."
      )
    } catch (error) {
      setSearchResults([])
      setSearchState("error")
      setSearchMessage(
        error instanceof Error
          ? error.message
          : "Book search is temporarily unavailable."
      )
    }
  }

  function chooseSearchResult(result) {
    updateBookInfo("title", result?.title || "")
    updateBookInfo("author", result?.author_name?.[0] || "")
    updateBookInfo(
      "coverUrl",
      result?.cover_i
        ? `https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`
        : ""
    )
    updateBookInfo(
      "totalPages",
      result?.number_of_pages_median
        ? String(result.number_of_pages_median)
        : ""
    )
    updateBookInfo("sourceKey", result?.key || "")
    setSearchMessage(`${result?.title || "Book"} added to the entry below.`)
  }

  return (
    <section className="review-step review-step--book-information scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 0 of 5"}
        </p>

        <h1>Book Information</h1>

        <p className="scrapbook-page__intro">
          Start with the basics before the emotional damage begins.
        </p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel book-information-step__panel"
        scrapbookId="wizard.bookInformation"
        objectType="action"
        variant="bookInformation"
        recipeId="wizard.bookInformation"
      >
        {!editingReviewId && (
          <div className="book-information-step__finder">
            <div className="book-information-step__mode-tabs" aria-label="Book entry method">
              <button
                type="button"
                className={entryMode === "search" ? "is-active" : ""}
                aria-pressed={entryMode === "search"}
                onClick={() => setEntryMode("search")}
              >
                Search books
              </button>
              <button
                type="button"
                className={entryMode === "manual" ? "is-active" : ""}
                aria-pressed={entryMode === "manual"}
                onClick={() => setEntryMode("manual")}
              >
                Manual entry
              </button>
            </div>

            {entryMode === "search" ? (
              <>
                <form
                  className="book-information-step__search"
                  onSubmit={searchOpenLibrary}
                >
                  <label htmlFor="book-catalog-search">
                    Find by title, author, or ISBN
                  </label>
                  <div>
                    <input
                      id="book-catalog-search"
                      value={bookSearch}
                      onChange={(event) => setBookSearch(event.target.value)}
                      placeholder="Search Open Library..."
                    />
                    <button type="submit" disabled={searchState === "loading"}>
                      {searchState === "loading" ? "Searching…" : "Search"}
                    </button>
                  </div>
                </form>

                <p className="book-information-step__search-message" role="status">
                  {searchMessage}
                </p>

                {searchResults.length > 0 && (
                  <ul className="book-information-step__search-results">
                    {searchResults.map((result) => (
                      <li key={result.key}>
                        {result.cover_i ? (
                          <img
                            src={`https://covers.openlibrary.org/b/id/${result.cover_i}-S.jpg`}
                            alt=""
                            loading="lazy"
                          />
                        ) : (
                          <span aria-hidden="true">▥</span>
                        )}
                        <span>
                          <strong>{result.title || "Untitled Book"}</strong>
                          <small>
                            {result.author_name?.[0] || "Unknown author"}
                            {result.first_publish_year
                              ? ` · ${result.first_publish_year}`
                              : ""}
                          </small>
                        </span>
                        <button type="button" onClick={() => chooseSearchResult(result)}>
                          Use this book
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="book-information-step__manual-note">
                Enter the details below. Only a title is required to begin.
              </p>
            )}
          </div>
        )}

        <div className="book-information-step__title-field">
  <TextInput
    label="Title"
    value={bookInfo.title}
    onChange={(value) =>
      updateBookInfo("title", value)
    }
  />
</div>

        <div className="book-information-step__author-field">
  <TextInput
    label="Author"
    value={bookInfo.author}
    onChange={(value) =>
      updateBookInfo("author", value)
    }
  />
</div>

        <div className="book-information-step__upload book-information-step__cover-upload">
  <ImageUpload
    label="Upload Book Cover"
    value={bookInfo.coverUrl}
    onChange={(value) => updateBookInfo("coverUrl", value)}
    user={user}
  />
</div>

        <div className="book-information-step__series-field">
  <TextInput
    label="Series"
    value={bookInfo.series}
    onChange={(value) =>
      updateBookInfo("series", value)
    }
  />
</div>

        <div className="book-information-step__number-field">
  <TextInput
    label="Book Number"
    value={bookInfo.bookNumber}
    onChange={(value) =>
      updateBookInfo(
        "bookNumber",
        value
      )
    }
  />
</div>

        <div className="book-information-step__genre-field">
  <TextInput
    label="Genre"
    value={bookInfo.genre}
    onChange={(value) =>
      updateBookInfo("genre", value)
    }
  />
</div>
        <div className="book-information-step__total-field">
  <TextInput
    label={
      getProgressUnitCopy(
        bookInfo
      ).totalLabel
    }
    value={bookInfo.totalPages}
    onChange={(value) =>
      updateBookInfo(
        "totalPages",
        value
      )
    }
  />
</div>

        {editingReviewId && bookInfo.status === "Finished" && (
          <div className="score-card book-information-step__spice-card">
  <p>Spice Rating</p>

            <ScoreSlider
              label="Spice"
              question="How spicy was the book?"
              value={metrics.spice}
              onChange={(value) => updateMetric("spice", value)}
            />
          </div>
        )}

        <div className="score-card book-information-step__dates-card">
  <p>Reading Dates</p>

          <p>
            These can be edited manually, but the app will also fill them in
            automatically when you start or finish a book.
          </p>

          <DateInput
            label="Date Started"
            value={bookInfo.dateStarted}
            onChange={(value) => updateBookInfo("dateStarted", value)}
          />

          <DateInput
            label="Date Finished"
            value={bookInfo.dateFinished}
            onChange={(value) => updateBookInfo("dateFinished", value)}
          />
        </div>

        {bookInfo.status === "Reading" && (
  <div className="book-information-step__reading-progress">
    <TextInput
      label={
        getProgressUnitCopy(
          bookInfo
        ).currentLabel
      }
      value={bookInfo.currentPage}
      onChange={(value) =>
        updateBookInfo(
          "currentPage",
          value
        )
      }
    />

    {bookInfo.totalPages && (
      <ProgressBar
        percent={
          readingProgressPercent
        }
      />
    )}
  </div>
)}

        <div className="book-information-step__upload book-information-step__graphic-upload">
  <ImageUpload
    label="Upload Review Graphic"
    value={bookInfo.reviewGraphicUrl}
    onChange={(value) =>
      updateBookInfo("reviewGraphicUrl", value)
    }
    user={user}
  />
</div>

        <label className="book-information-step__select-field book-information-step__format-field">
  Format

          <select
            value={bookInfo.format}
            onChange={(e) => updateBookInfo("format", e.target.value)}
          >
            <option>Kindle</option>
            <option>KU</option>
            <option>Physical</option>
            <option>Audiobook</option>
          </select>
        </label>

        <label className="book-information-step__select-field book-information-step__status-field">
          Reading Status

          <select
            value={bookInfo.status}
            onChange={(e) => updateBookInfo("status", e.target.value)}
          >
            <option>TBR</option>
            <option>Reading</option>
            <option>Finished</option>
            <option>DNF</option>
          </select>
        </label>

        <label className="book-information-step__reason-field scrapbook-field">
          <span>Why do you want to read this?</span>
          <textarea
            value={bookInfo.reasonToRead || ""}
            onChange={(event) => updateBookInfo("reasonToRead", event.target.value)}
            placeholder="The recommendation, mood, trope, or little spark that brought it here..."
          />
        </label>

        <label className="book-information-step__note-field scrapbook-field">
          <span>Initial note</span>
          <textarea
            value={bookInfo.initialNote || ""}
            onChange={(event) => updateBookInfo("initialNote", event.target.value)}
            placeholder="A first impression or note to your future reading self..."
          />
        </label>

        <aside className="book-information-step__preview" aria-label="Book entry preview">
          <p>Library preview</p>
          <div>
            {bookInfo.coverUrl ? (
              <img src={bookInfo.coverUrl} alt="" />
            ) : (
              <span className="book-information-step__preview-placeholder" aria-hidden="true">
                ▥
              </span>
            )}
            <span>
              <strong>{bookInfo.title || "Untitled Book"}</strong>
              <small>{bookInfo.author || "Author to be added"}</small>
              <em>{bookInfo.status || "Finished"} · {bookInfo.format || "Book"}</em>
            </span>
          </div>
          <p>
            {bookInfo.reasonToRead ||
              "Your reason to read will be pressed here as a reminder."}
          </p>
        </aside>
      </ScrapbookPanel>

      <div className="book-information-step__actions">
  {editingReviewId && (
    <button
      type="button"
      className="book-information-step__save-action"
      onClick={saveReviewBasicChanges}
    >
      Save Book Info
    </button>
  )}

  <button
    type="button"
    className="book-information-step__back-action"
    onClick={() => leaveReviewEditor("home")}
  >
    Back Home
  </button>

  <button
    type="button"
    className="book-information-step__next-action"
    onClick={handleBookInfoNext}
  >
    {bookInfo.status === "DNF"
      ? "Next: DNF Details"
      : bookInfo.status === "Reading"
        ? "Next: Reading Summary"
        : bookInfo.status === "TBR"
          ? "Save to TBR"
          : "Next: Book Score"}
  </button>
</div>
    </section>
  )
}

export default BookInformationStep
