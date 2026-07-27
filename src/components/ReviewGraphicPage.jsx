import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import "./ReviewGraphicPage.css"

const GRAPHIC_FIELDS = {
  rating: "Rating",
  spice: "Spice",
  obsession: "Obsession",
  review: "One-Sentence Review",
  vibe: "Vibe Check",
  tropes: "Tropes & Themes",
}

function ReviewGraphicPage({
  selectedReview,
  reviewGraphicTemplate,
  setReviewGraphicTemplate,
  reviewGraphicSize,
  setReviewGraphicSize,
  reviewGraphicFields,
  toggleReviewGraphicField,
  reviewGraphicCoverDataUrl,
  getReviewGraphicOptions,
  getReviewGraphicDataUrl,
  downloadSocialGraphic,
  reviewCaptionPlatform,
  setReviewCaptionPlatform,
  buildReviewCaption,
  copyReviewCaption,
  saveMessage,
  downloadReviewGraphicPng,
  downloadSvgFile,
  setStep,
  setLibraryFilter,
}) {
  const title =
    selectedReview?.bookInfo?.title || "Untitled Book"
  const graphicOptions = {
    ...getReviewGraphicOptions(),
    coverDataUrl: reviewGraphicCoverDataUrl,
  }
  const previewUrl = getReviewGraphicDataUrl(
    selectedReview,
    graphicOptions
  )

  return (
    <section className="review-graphic-page scrapbook-page">
      <header className="review-graphic-page__header">
        <p className="scrapbook-kicker">Shareable keepsake</p>
        <h1>Review Graphic</h1>
        <p>
          Compose a polished graphic for <strong>{title}</strong>, then
          download the size that fits where you want to share it.
        </p>
      </header>

      {saveMessage && (
        <p
          className="review-graphic-page__message"
          role="status"
          aria-live="polite"
        >
          {saveMessage}
        </p>
      )}

      <div className="review-graphic-page__layout">
        <ScrapbookPanel
          className="review-graphic-page__controls"
          recipe="vintageLibrary"
        >
          <div className="review-graphic-page__control-group">
            <p className="review-graphic-page__kicker">Composition</p>

            <label>
              Template
              <select
                value={reviewGraphicTemplate}
                onChange={(event) =>
                  setReviewGraphicTemplate(event.target.value)
                }
              >
                <option value="scrapbook">Scrapbook</option>
                <option value="minimal">Minimal</option>
                <option value="dark">Dark Romance</option>
                <option value="soft">Soft Romance</option>
              </select>
            </label>

            <label>
              Preview Size
              <select
                value={reviewGraphicSize}
                onChange={(event) =>
                  setReviewGraphicSize(event.target.value)
                }
              >
                <option value="square">Square Post</option>
                <option value="story">
                  Instagram/Facebook Story
                </option>
                <option value="pinterest">Pinterest</option>
              </select>
            </label>
          </div>

          <fieldset className="review-graphic-page__fields">
            <legend>Details to include</legend>

            <div>
              {Object.entries(GRAPHIC_FIELDS).map(([field, label]) => (
                <button
                  key={field}
                  type="button"
                  className={
                    reviewGraphicFields[field]
                      ? "filter-button active"
                      : "filter-button"
                  }
                  aria-pressed={Boolean(reviewGraphicFields[field])}
                  onClick={() => toggleReviewGraphicField(field)}
                >
                  {reviewGraphicFields[field] ? "✓" : "+"} {label}
                </button>
              ))}
            </div>
          </fieldset>
        </ScrapbookPanel>

        <ScrapbookPanel
          className="review-graphic-page__preview-card"
          recipe="finishedBook"
        >
          <div className="review-graphic-page__preview-heading">
            <div>
              <p className="review-graphic-page__kicker">
                Live preview
              </p>
              <h2>{title}</h2>
            </div>

            <span>{reviewGraphicSize}</span>
          </div>

          <img
            src={previewUrl}
            alt={`Generated ${reviewGraphicSize} review graphic for ${title}`}
            className="review-graphic-page__preview"
          />
        </ScrapbookPanel>
      </div>

      <ScrapbookPanel
        className="review-graphic-page__export-card"
        recipe="readingSummary"
      >
        <p className="review-graphic-page__kicker">Social export</p>
        <h2>Download a finished size</h2>
        <p>Each button renders a fresh file using the current settings.</p>

        <div className="review-graphic-page__export-actions">
          <button
            type="button"
            onClick={() => downloadSocialGraphic(selectedReview, "square")}
          >
            Download Square Post
          </button>
          <button
            type="button"
            onClick={() => downloadSocialGraphic(selectedReview, "story")}
          >
            Download Story
          </button>
          <button
            type="button"
            onClick={() => downloadSocialGraphic(selectedReview, "pinterest")}
          >
            Download Pinterest Pin
          </button>
        </div>
      </ScrapbookPanel>

      <ScrapbookPanel
        className="review-graphic-page__caption-card"
        recipe="vintageLibrary"
      >
        <div>
          <p className="review-graphic-page__kicker">Auto caption</p>
          <h2>Ready-to-copy post text</h2>
        </div>

        <label>
          Caption Style
          <select
            value={reviewCaptionPlatform}
            onChange={(event) =>
              setReviewCaptionPlatform(event.target.value)
            }
          >
            <option value="instagram">Instagram Feed</option>
            <option value="story">
              Instagram/Facebook Story
            </option>
            <option value="facebook">Facebook Post</option>
            <option value="pinterest">Pinterest Pin</option>
          </select>
        </label>

        <pre>{buildReviewCaption(selectedReview, reviewCaptionPlatform)}</pre>

        <button
          type="button"
          onClick={() => copyReviewCaption(selectedReview)}
        >
          📋 Copy Caption
        </button>
      </ScrapbookPanel>

      <div className="review-graphic-page__utility-actions">
        <button
          type="button"
          onClick={() =>
            downloadReviewGraphicPng(selectedReview, graphicOptions)
          }
        >
          Download Current Preview PNG
        </button>
        <button
          type="button"
          onClick={() => downloadSvgFile(selectedReview, graphicOptions)}
        >
          Download SVG Backup
        </button>
        <button type="button" onClick={() => setStep("viewReview")}>
          Back to Review
        </button>
        <button
          type="button"
          onClick={() => {
            setLibraryFilter("finished")
            setStep("library")
          }}
        >
          Back to Library
        </button>
      </div>
    </section>
  )
}

export default ReviewGraphicPage
