import assert from "node:assert/strict"
import test from "node:test"

import { applyAnchorPolicy } from "../src/scrapbook/renderers/anchorPolicy.js"

test("keeps only one physical fastener by default", () => {
  const anchors = applyAnchorPolicy([
    {
      type: "goldTape",
      category: "attachment",
      attachment: "holding",
    },
    {
      type: "brassClip",
      category: "metal",
      attachment: "clamped",
      assetId: "metal-paperclip-antique-gold-01",
    },
    {
      type: "libraryCard",
      category: "ephemera",
      assetId: "ephemera-library-card-placeholder-001",
    },
  ])

  assert.deepEqual(
    anchors.map((anchor) => anchor.type),
    ["goldTape", "libraryCard"]
  )
})

test("counts assembly fasteners as physical attachments", () => {
  const anchors = applyAnchorPolicy([
    {
      type: "roseTape",
      assembly: { role: "fastener" },
      assetId: "tape-masking-cream-01",
    },
    {
      type: "pressedFlower",
      assembly: { role: "heldObject" },
      assetId: "flower-daisy-white-01",
    },
    {
      type: "linenTape",
      category: "attachment",
      assetId: "tape-masking-cream-01",
    },
  ])

  assert.deepEqual(
    anchors.map((anchor) => anchor.type),
    ["roseTape", "pressedFlower"]
  )
})

test("drops unresolved text placeholders and honors hidden types", () => {
  const anchors = applyAnchorPolicy(
    [
      { type: "pencilNote", category: "patina" },
      { type: "dateStamp", category: "stamp" },
      {
        type: "dateStamp",
        category: "stamp",
        assetId: "library-stamp-01",
      },
      {
        type: "libraryCard",
        category: "ephemera",
        assetId: "library-card-clean-01",
      },
    ],
    {
      hiddenAnchorTypes: ["libraryCard"],
    }
  )

  assert.deepEqual(
    anchors.map((anchor) => anchor.type),
    ["dateStamp"]
  )
})
