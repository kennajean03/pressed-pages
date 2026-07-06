import React from "react"

function anchorClass(anchor = {}) {
  return [
    "pp-scrapbook-anchor",
    `pp-scrapbook-anchor--${anchor.type}`,
    `pp-scrapbook-anchor--placement-${anchor.placement}`,
    `pp-scrapbook-anchor--depth-${anchor.depth}`,
    anchor.attachment && `pp-scrapbook-anchor--attachment-${anchor.attachment}`,
  ]
    .filter(Boolean)
    .join(" ")
}

function getAnchorLabel(anchor = {}) {
  const labels = {
    topTape: "tape",
    roseTape: "tape",
    sageTape: "tape",
    pressedFlower: "pressed flower",
    pressedDaisy: "pressed daisy",
    pressedFern: "pressed fern",
    bookmark: "bookmark",
    reviewNote: "review note",
    handwrittenHeart: "heart",
    libraryCard: "library card",
    brassClip: "paperclip",
    dateStamp: "date stamp",
    coverMosaic: "cover mosaic",
    annualMemoryNote: "memory note",
    signatureFlower: "signature flower",
    pencilNote: "pencil note",
  }

  return labels[anchor.type] || anchor.type || "scrapbook detail"
}

export function renderAnchors(composition, options = {}) {
  const hiddenAnchorTypes = options.hiddenAnchorTypes || []

  const anchors = composition?.anchors?.filter(
    (anchor) => !hiddenAnchorTypes.includes(anchor.type)
  )

  if (!anchors?.length) return null

  return anchors.map((anchor) => {
   const style = {
  "--pp-anchor-rotation": `${anchor.rotation || 0}deg`,
  "--pp-anchor-layer": anchor.layer ?? 4,
  "--pp-anchor-offset-x": `${anchor.offset?.x ?? 0}px`,
  "--pp-anchor-offset-y": `${anchor.offset?.y ?? 0}px`,

  // New
  "--pp-anchor-brightness":
    anchor.depth === "behind"
      ? 0.96
      : anchor.depth === "tucked"
        ? 0.985
        : 1,

  "--pp-anchor-scale":
    anchor.attachment === "holding"
      ? 0.985
      : 1,
}

    return (
      <span
        key={`${anchor.id}-${anchor.placement}`}
        className={anchorClass(anchor)}
        style={style}
        aria-hidden="true"
        title={getAnchorLabel(anchor)}
      />
    )
  })
}

export default renderAnchors