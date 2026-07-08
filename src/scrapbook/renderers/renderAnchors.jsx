import React from "react"

import { getScrapbookAsset } from "../materials/assetRegistry"
import { ScrapbookAsset } from "../components/ScrapbookAsset"
import { isEphemeraAnchor, renderEphemera } from "./renderEphemera.jsx"
import { isTapeAnchor, renderTape } from "./renderTape.jsx"
import { isBotanicalAnchor, renderBotanical } from "./renderBotanical.jsx"
import { isStampAnchor, renderStamp } from "./renderStamp.jsx"


const anchorLabels = {
  topTape: "tape",
  roseTape: "tape",
  sageTape: "tape",
  goldTape: "tape",
  linenTape: "tape",
  pressedFlower: "pressed flower",
  softFlower: "pressed flower",
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
  coffeeRing: "coffee ring",
}

const anchorRendererTypes = {
  tape: "tape",
  botanical: "botanical",
  ephemera: "ephemera",
  stamp: "stamp",
  patina: "patina",
  rare: "rare",
  asset: "asset",
}




const patinaAnchorTypes = new Set(["coffeeRing", "pencilNote"])

const rareAnchorTypes = new Set([
  "coverMosaic",
  "signatureFlower",
  "handwrittenHeart",
])

function anchorClass(anchor = {}, rendererType = anchorRendererTypes.asset) {
  return [
    "pp-scrapbook-anchor",
    `pp-scrapbook-anchor--${anchor.type}`,
    `pp-scrapbook-anchor--renderer-${rendererType}`,
    `pp-scrapbook-anchor--placement-${anchor.placement}`,
    `pp-scrapbook-anchor--depth-${anchor.depth}`,
    anchor.attachment && `pp-scrapbook-anchor--attachment-${anchor.attachment}`,
    anchor.assetId && "pp-scrapbook-anchor--has-asset",
  ]
    .filter(Boolean)
    .join(" ")
}

function getAnchorLabel(anchor = {}) {
  return anchorLabels[anchor.type] || anchor.type || "scrapbook detail"
}

function resolveAnchorRendererType(anchor = {}) {
  const semanticType =
    anchor.rendererType ||
    anchor.objectType ||
    anchor.object?.type ||
    anchor.category

  if (semanticType && anchorRendererTypes[semanticType]) {
    return semanticType
  }

  if (isTapeAnchor(anchor)) return anchorRendererTypes.tape
  if (isBotanicalAnchor(anchor)) return anchorRendererTypes.botanical 
  if (isEphemeraAnchor(anchor)) return anchorRendererTypes.ephemera
  if (isStampAnchor(anchor)) return anchorRendererTypes.stamp
  if (patinaAnchorTypes.has(anchor.type)) return anchorRendererTypes.patina
  if (rareAnchorTypes.has(anchor.type)) return anchorRendererTypes.rare

  return anchorRendererTypes.asset
}

function resolveAnchorPlacement(anchor = {}) {
  const placement = {
    rotation: "0deg",
    scale: 1,
    opacity: 1,
    shadow: "none",
  }

  switch (anchor.attachment) {
    case "holding":
      return {
        ...placement,
        width: "82px",
        rotation: "0deg",
        scale: 0.92,
        opacity: 0.96,
        shadow: "0 4px 8px rgba(79, 59, 51, 0.1)",
      }

    case "tucked":
      return {
        ...placement,
        width: anchor.type === "pressedFern" ? "58px" : "44px",
        rotation: "0deg",
        scale: 0.88,
        opacity: 0.82,
        shadow: "0 3px 7px rgba(79, 59, 51, 0.08)",
      }

    case "peeking":
      return {
        ...placement,
        width: "36px",
        scale: 0.9,
        opacity: 0.92,
        shadow: "0 6px 12px rgba(79, 59, 51, 0.12)",
      }

    case "stacked":
      return {
        ...placement,
        width: "104px",
        scale: 0.92,
        opacity: 0.96,
        shadow: "0 8px 16px rgba(79, 59, 51, 0.12)",
      }

    case "written":
      return {
        ...placement,
        width: "78px",
        scale: 0.9,
        opacity: 0.78,
      }

    case "patina":
      return {
        ...placement,
        width: "140px",
        scale: 1,
        opacity: 0.22,
        shadow: "none",
      }

    default:
      return placement
  }
}

function EphemeraObject({ anchor }) {
  return (
    <span className={`pp-ephemera-object pp-ephemera-object--${anchor.type}`}>
      {anchor.type === "libraryCard" && (
        <>
          <span className="pp-ephemera-object__label">Library Card</span>
          <span className="pp-ephemera-object__line" />
          <span className="pp-ephemera-object__line" />
          <span className="pp-ephemera-object__line pp-ephemera-object__line--short" />
        </>
      )}

      {anchor.type === "reviewNote" && (
        <>
          <span className="pp-ephemera-object__scribble" />
          <span className="pp-ephemera-object__line" />
          <span className="pp-ephemera-object__line pp-ephemera-object__line--short" />
        </>
      )}

      {anchor.type === "ticketStub" && (
        <span className="pp-ephemera-object__label">Admit One</span>
      )}

      {anchor.type === "annualMemoryNote" && (
        <>
          <span className="pp-ephemera-object__label">Memory</span>
          <span className="pp-ephemera-object__line" />
          <span className="pp-ephemera-object__line" />
        </>
      )}
    </span>
  )
}

function renderAssetAnchor({ asset, placement }) {
  if (!asset) return null

  return <ScrapbookAsset asset={asset} placement={placement} />
}

function renderTapeAnchor(context) {
  return renderTape(context.anchor, context)
}

function renderBotanicalAnchor(context) {
  return renderBotanical(context.anchor, context)
}

function renderStampAnchor(context) {
  return renderStamp(context.anchor, context)
}

function renderPatinaAnchor(context) {
  return renderAssetAnchor(context)
}

function renderRareAnchor(context) {
  return renderAssetAnchor(context)
}

function renderEphemeraAnchor(context) {
  const renderedEphemera = renderEphemera?.(context.anchor, context)

  return renderedEphemera || <EphemeraObject anchor={context.anchor} />
}

const anchorRenderers = {
  [anchorRendererTypes.tape]: renderTapeAnchor,
  [anchorRendererTypes.botanical]: renderBotanicalAnchor,
  [anchorRendererTypes.ephemera]: renderEphemeraAnchor,
  [anchorRendererTypes.stamp]: renderStampAnchor,
  [anchorRendererTypes.patina]: renderPatinaAnchor,
  [anchorRendererTypes.rare]: renderRareAnchor,
  [anchorRendererTypes.asset]: renderAssetAnchor,
}

export function renderAnchors(composition, options = {}) {
  const hiddenAnchorTypes = options.hiddenAnchorTypes || []

  const anchors = composition?.anchors?.filter(
    (anchor) => !hiddenAnchorTypes.includes(anchor.type)
  )

  if (!anchors?.length) return null

  return anchors.map((anchor) => {
    const asset = getScrapbookAsset(anchor.assetId)
    const placement = resolveAnchorPlacement(anchor)
    const rendererType = resolveAnchorRendererType(anchor)
    const renderer = anchorRenderers[rendererType] || renderAssetAnchor

    const style = {
      "--pp-anchor-rotation": `${anchor.rotation || 0}deg`,
      "--pp-anchor-layer": anchor.layer ?? 4,
      "--pp-anchor-offset-x": `${anchor.offset?.x ?? 0}px`,
      "--pp-anchor-offset-y": `${anchor.offset?.y ?? 0}px`,
      "--pp-anchor-brightness":
        anchor.depth === "behind"
          ? 0.96
          : anchor.depth === "tucked"
            ? 0.985
            : 1,
      "--pp-anchor-scale": anchor.attachment === "holding" ? 0.985 : 1,
    }

    return (
      <span
        key={`${anchor.id}-${anchor.placement}`}
        className={anchorClass(anchor, rendererType)}
        style={style}
        aria-hidden="true"
        title={getAnchorLabel(anchor)}
      >
        {renderer({
          anchor,
          asset,
          placement,
          rendererType,
          composition,
          options,
        })}
      </span>
    )
  })
}

export default renderAnchors