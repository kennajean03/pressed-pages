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

const FORMAT_OPTIONS = [
  ["square", "Square", "1080 × 1080", "Feed posts"],
  ["story", "Story", "1080 × 1920", "Stories & reels"],
  ["pinterest", "Pinterest", "1000 × 1500", "Tall pins"],
]

const STYLE_OPTIONS = {
  accent: [
    ["rose", "Pressed Rose"],
    ["sage", "Library Sage"],
    ["gold", "Antique Gold"],
    ["midnight", "Midnight Ink"],
  ],
  typography: [
    ["classic", "Classic Serif"],
    ["editorial", "Editorial"],
    ["handwritten", "Handwritten Note"],
  ],
  background: [
    ["notebook", "Ruled Paper"],
    ["grid", "Archive Grid"],
    ["plain", "Clean Paper"],
  ],
  coverPlacement: [
    ["left", "Cover Left"],
    ["right", "Cover Right"],
  ],
  embellishment: [
    ["celestial", "Celestial Corner"],
    ["botanical", "Pressed Botanical"],
    ["none", "No Embellishment"],
  ],
}

function GraphicChoiceGroup({ legend, value, options, onChange }) {
  return (
    <fieldset className="review-graphic-page__choice-group">
      <legend>{legend}</legend>
      <div>
        {options.map(([optionValue, label]) => (
          <button
            type="button"
            key={optionValue}
            className={value === optionValue ? "active" : ""}
            aria-pressed={value === optionValue}
            onClick={() => onChange(optionValue)}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function ReviewGraphicPage({
  selectedReview,
  reviewGraphicTemplate,
  setReviewGraphicTemplate,
  reviewGraphicSize,
  setReviewGraphicSize,
  reviewGraphicFields,
  toggleReviewGraphicField,
  reviewGraphicStyle,
  updateReviewGraphicStyle,
  reviewGraphicCoverDataUrl,
  getReviewGraphicOptions,
  getReviewGraphicDataUrl,
  downloadSocialGraphic,
  reviewCaptionPlatform,
  setReviewCaptionPlatform,
  buildReviewCaption,
  copyReviewCaption,
  shareReviewCaption,
  copyReviewProfileLink,
  isPublicProfile,
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
        <p className="scrapbook-kicker">The clipping desk</p>
        <h1>Press a Review Graphic</h1>
        <p>
          Arrange <strong>{title}</strong> like a finished scrapbook clipping,
          then export a polished file for the place you want to share it.
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
          hiddenAnchorTypes={[
            "libraryCard",
            "dateStamp",
          ]}
        >
          <div className="review-graphic-page__control-group">
            <p className="review-graphic-page__kicker">01 · Composition</p>

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
          </div>

          <fieldset className="review-graphic-page__format-picker">
            <legend>Format</legend>
            <div>
              {FORMAT_OPTIONS.map(([value, label, dimensions, detail]) => (
                <button
                  type="button"
                  key={value}
                  className={reviewGraphicSize === value ? "active" : ""}
                  aria-pressed={reviewGraphicSize === value}
                  onClick={() => setReviewGraphicSize(value)}
                >
                  <strong>{label}</strong>
                  <span>{dimensions}</span>
                  <small>{detail}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="review-graphic-page__fields">
            <legend>02 · Details to include</legend>

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

          <div className="review-graphic-page__design-controls">
            <p className="review-graphic-page__kicker">03 · Art direction</p>
            <GraphicChoiceGroup
              legend="Accent color"
              value={reviewGraphicStyle.accent}
              options={STYLE_OPTIONS.accent}
              onChange={(value) => updateReviewGraphicStyle("accent", value)}
            />
            <GraphicChoiceGroup
              legend="Typography"
              value={reviewGraphicStyle.typography}
              options={STYLE_OPTIONS.typography}
              onChange={(value) => updateReviewGraphicStyle("typography", value)}
            />
            <GraphicChoiceGroup
              legend="Paper pattern"
              value={reviewGraphicStyle.background}
              options={STYLE_OPTIONS.background}
              onChange={(value) => updateReviewGraphicStyle("background", value)}
            />
            <GraphicChoiceGroup
              legend="Book placement"
              value={reviewGraphicStyle.coverPlacement}
              options={STYLE_OPTIONS.coverPlacement}
              onChange={(value) => updateReviewGraphicStyle("coverPlacement", value)}
            />
            <GraphicChoiceGroup
              legend="Embellishment"
              value={reviewGraphicStyle.embellishment}
              options={STYLE_OPTIONS.embellishment}
              onChange={(value) => updateReviewGraphicStyle("embellishment", value)}
            />
          </div>
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

            <span>
              {FORMAT_OPTIONS.find(([value]) => value === reviewGraphicSize)?.[2]}
            </span>
          </div>

          <div
            className={`review-graphic-page__preview-stage review-graphic-page__preview-stage--${reviewGraphicSize}`}
          >
            <img
              src={previewUrl}
              alt={`Generated ${reviewGraphicSize} review graphic for ${title}`}
              className="review-graphic-page__preview"
            />
          </div>
          <p className="review-graphic-page__preview-note">
            The preview is scaled to fit this desk. Your download uses the full
            export dimensions shown above.
          </p>
        </ScrapbookPanel>
      </div>

      <ScrapbookPanel
        className="review-graphic-page__export-card"
        recipe="readingSummary"
      >
        <p className="review-graphic-page__kicker">04 · Export drawer</p>
        <h2>Take the finished clipping with you</h2>
        <p>
          Each export renders a fresh file using the current content, paper,
          placement, typography, and embellishment settings.
        </p>

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
        hiddenAnchorTypes={[
          "libraryCard",
          "dateStamp",
        ]}
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

        <div className="review-graphic-page__caption-actions">
          <button
            type="button"
            onClick={() => copyReviewCaption(selectedReview)}
          >
            Copy Caption
          </button>
          <button
            type="button"
            onClick={() => shareReviewCaption(selectedReview)}
          >
            Share Caption
          </button>
          <button
            type="button"
            onClick={copyReviewProfileLink}
            title={
              isPublicProfile
                ? "Copy the public reader profile where finished books appear"
                : "Enable Public Profile in Settings first"
            }
          >
            Copy Public Profile Link
          </button>
        </div>
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
