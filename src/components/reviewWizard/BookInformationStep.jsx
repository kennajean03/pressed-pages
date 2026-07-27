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

        <label className="book-information-step__select-field">
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

        <label className="book-information-step__select-field">
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