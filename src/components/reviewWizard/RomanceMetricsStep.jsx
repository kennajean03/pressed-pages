import ScrapbookPanel from "../scrapbook/ScrapbookPanel"
import "./RomanceMetricsStep.css"

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
        <p className="scrapbook-page__intro">
  Record the chemistry, tension, emotional fallout, and
  everything that stayed with you after the last page.
</p>
      </div>

      <ScrapbookPanel
        className="scrapbook-form-panel romance-metrics-step__panel"
        scrapbookId="wizard.romanceMetrics"
        objectType="action"
        variant="romanceMetrics"
        recipeId="wizard.romanceMetrics"
      >
        <div className="romance-metrics-step__metric romance-metrics-step__metric--spice">
  <p className="romance-metrics-step__category">
    Heat
  </p>

  <ScoreSlider
    label="Spice"
    question="How spicy was the book?"
    value={metrics.spice}
    onChange={(value) =>
      updateMetric("spice", value)
    }
  />
</div>

<div className="romance-metrics-step__metric romance-metrics-step__metric--chemistry">
  <p className="romance-metrics-step__category">
    Connection
  </p>

  <ScoreSlider
    label="Chemistry"
    question="How strong was the chemistry?"
    value={metrics.chemistry}
    onChange={(value) =>
      updateMetric("chemistry", value)
    }
  />
</div>

<div className="romance-metrics-step__metric romance-metrics-step__metric--tension">
  <p className="romance-metrics-step__category">
    Anticipation
  </p>

  <ScoreSlider
    label="Tension"
    question="How much romantic tension was there?"
    value={metrics.tension}
    onChange={(value) =>
      updateMetric("tension", value)
    }
  />
</div>

<div className="romance-metrics-step__metric romance-metrics-step__metric--damage">
  <p className="romance-metrics-step__category">
    Aftermath
  </p>

  <ScoreSlider
    label="Emotional Damage"
    question="How emotionally wrecked were you?"
    value={metrics.emotionalDamage}
    onChange={(value) =>
      updateMetric(
        "emotionalDamage",
        value
      )
    }
  />
</div>

<div className="romance-metrics-step__metric romance-metrics-step__metric--hangover">
  <p className="romance-metrics-step__category">
    Lingering Effect
  </p>

  <ScoreSlider
    label="Book Hangover"
    question="How much are you still thinking about it?"
    value={metrics.bookHangover}
    onChange={(value) =>
      updateMetric(
        "bookHangover",
        value
      )
    }
  />
</div>

<div className="romance-metrics-step__metric romance-metrics-step__metric--intensity">
  <p className="romance-metrics-step__category">
    Overall Weight
  </p>

  <ScoreSlider
    label="Content Intensity"
    question="How intense was the content overall?"
    value={metrics.contentIntensity}
    onChange={(value) =>
      updateMetric(
        "contentIntensity",
        value
      )
    }
  />
</div>

<div className="romance-metrics-step__note">
  <p>Reader’s note</p>

  <span>
    These reaction metrics preserve how the book felt.
    They do not change the weighted On Paper Score.
  </span>
</div>
      </ScrapbookPanel>

      <div className="scrapbook-action-row romance-metrics-step__actions">
        <button onClick={() => setStep(1)}>Back</button>
        <button onClick={() => setStep(3)}>Next: Scrapbook Notes</button>
      </div>
    </section>
  )
}

export default RomanceMetricsStep