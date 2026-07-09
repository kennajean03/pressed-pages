import ScrapbookPanel from "../scrapbook/ScrapbookPanel"

function RomanceMetricsStep({
  editingReviewId,
  metrics,
  updateMetric,
  setStep,
  ScoreSlider,
}) {
  return (
    <section className="review-step review-step--romance-metrics scrapbook-page">
      <div className="scrapbook-page__header">
        <p className="scrapbook-eyebrow">
          {editingReviewId ? "Edit Review" : "Step 2 of 5"}
        </p>

        <h1>Romance Reader Metrics</h1>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel"
        scrapbookId="wizard.romanceMetrics"
        objectType="action"
        variant="romanceMetrics"
        recipeId="wizard.romanceMetrics"
      >
        <ScoreSlider
          label="Spice"
          question="How spicy was the book?"
          value={metrics.spice}
          onChange={(value) => updateMetric("spice", value)}
        />

        <ScoreSlider
          label="Chemistry"
          question="How strong was the chemistry?"
          value={metrics.chemistry}
          onChange={(value) => updateMetric("chemistry", value)}
        />

        <ScoreSlider
          label="Tension"
          question="How much romantic tension was there?"
          value={metrics.tension}
          onChange={(value) => updateMetric("tension", value)}
        />

        <ScoreSlider
          label="Emotional Damage"
          question="How emotionally wrecked were you?"
          value={metrics.emotionalDamage}
          onChange={(value) => updateMetric("emotionalDamage", value)}
        />

        <ScoreSlider
          label="Book Hangover"
          question="How much are you still thinking about it?"
          value={metrics.bookHangover}
          onChange={(value) => updateMetric("bookHangover", value)}
        />

        <ScoreSlider
          label="Content Intensity"
          question="How intense was the content overall?"
          value={metrics.contentIntensity}
          onChange={(value) => updateMetric("contentIntensity", value)}
        />
      </ScrapbookPanel>

      <div className="scrapbook-action-row">
        <button onClick={() => setStep(1)}>Back</button>
        <button onClick={() => setStep(3)}>Next: Scrapbook Notes</button>
      </div>
    </section>
  )
}

export default RomanceMetricsStep