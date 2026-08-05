import test from "node:test"
import assert from "node:assert/strict"
import {
  buildCloudReviewGraphicDesignRow,
  getLocalReviewGraphicDesignsKey,
  normalizeReviewGraphicDesign,
  normalizeReviewGraphicOptions,
  reviewGraphicDesignFromCloudRow,
} from "./reviewGraphicDesigns.js"

test("normalizes a saved graphic design to supported deterministic options", () => {
  const design = normalizeReviewGraphicDesign({
    id: "design-1",
    name: "  A very long name  ",
    template: "unknown",
    size: "story",
    fields: { rating: false, unknown: true },
    style: { accent: "sage", coverOffsetY: 99, background: "unknown" },
  })

  assert.equal(design.template, "scrapbook")
  assert.equal(design.size, "story")
  assert.equal(design.fields.rating, false)
  assert.equal(design.fields.spice, true)
  assert.equal(design.style.accent, "sage")
  assert.equal(design.style.background, "notebook")
  assert.equal(design.style.coverOffsetY, 54)
})

test("keeps local-only design drawers separate for each reader", () => {
  assert.equal(
    getLocalReviewGraphicDesignsKey("reader-1"),
    "pressedPagesReviewGraphicDesigns:reader-1"
  )
  assert.equal(
    getLocalReviewGraphicDesignsKey(),
    "pressedPagesReviewGraphicDesigns:guest"
  )
})

test("round trips only safe versioned graphic design data through a cloud row", () => {
  const row = buildCloudReviewGraphicDesignRow({
    userId: "reader-1",
    design: {
      id: "design-1",
      name: "Rose proof",
      sourceReviewId: "review-1",
      sourceBookTitle: "A Book",
      template: "soft",
      size: "pinterest",
      fields: { review: false },
      style: { coverPlacement: "right", coverOffsetY: -22 },
    },
  })
  const design = reviewGraphicDesignFromCloudRow(row)

  assert.equal(row.user_id, "reader-1")
  assert.equal(row.design_data.template, "soft")
  assert.equal(design.sourceReviewId, "review-1")
  assert.equal(design.style.coverPlacement, "right")
  assert.equal(design.style.coverOffsetY, -22)
})

test("falls back to a complete editable options document", () => {
  assert.deepEqual(normalizeReviewGraphicOptions(), {
    template: "scrapbook",
    size: "square",
    fields: {
      rating: true,
      spice: true,
      obsession: true,
      review: true,
      vibe: true,
      tropes: true,
    },
    style: {
      accent: "rose",
      typography: "classic",
      background: "notebook",
      coverPlacement: "left",
      embellishment: "celestial",
      coverOffsetY: 0,
    },
  })
})
