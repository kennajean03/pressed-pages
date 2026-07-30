import assert from "node:assert/strict"
import test from "node:test"

import {
  getOwnedBookAssetPath,
  getOwnedReadingMemoryPaths,
} from "../src/scrapbook/memoryArtifacts/assetOwnership.js"

test("book asset cleanup only resolves current-reader paths", () => {
  const ownUrl =
    "https://example.supabase.co/storage/v1/object/public/book-covers/reader-a/book/cover.png"
  const otherUrl =
    "https://example.supabase.co/storage/v1/object/public/book-covers/reader-b/book/cover.png"

  assert.equal(
    getOwnedBookAssetPath({ url: ownUrl, userId: "reader-a" }),
    "reader-a/book/cover.png"
  )
  assert.equal(
    getOwnedBookAssetPath({ url: otherUrl, userId: "reader-a" }),
    ""
  )
})

test("reading-memory cleanup rejects other-reader and traversal paths", () => {
  assert.deepEqual(
    getOwnedReadingMemoryPaths({
      photoPaths: [
        "reader-a/book/log.jpg",
        "reader-b/book/log.jpg",
        "reader-a/book/log.jpg",
        "reader-a/../reader-b/escape.jpg",
      ],
      userId: "reader-a",
    }),
    ["reader-a/book/log.jpg"]
  )
})
