import React from "react"

import { ScrapbookAsset } from "../components/ScrapbookAsset"

export const tapeAnchorTypes = new Set([
  "topTape",
  "roseTape",
  "sageTape",
  "goldTape",
  "linenTape",
])

const ephemeraTapeBehaviors = {
  libraryCard: {
    width: "92px",
    scale: 0.92,
    opacity: 0.95,
    rotate: -7,
    translateX: "-12px",
    translateY: "-10px",
    shadow: "0 4px 8px rgba(79, 59, 51, 0.14)",
  },
  reviewNote: {
    width: "82px",
    scale: 0.9,
    opacity: 0.94,
    rotate: 6,
    translateX: "10px",
    translateY: "-8px",
    shadow: "0 3px 7px rgba(79, 59, 51, 0.13)",
  },
  ticketStub: {
    width: "68px",
    scale: 0.86,
    opacity: 0.93,
    rotate: -10,
    translateX: "-6px",
    translateY: "-6px",
    shadow: "0 3px 6px rgba(79, 59, 51, 0.12)",
  },
  annualMemoryNote: {
    width: "88px",
    scale: 0.91,
    opacity: 0.95,
    rotate: 4,
    translateX: "8px",
    translateY: "-12px",
    shadow: "0 4px 8px rgba(79, 59, 51, 0.14)",
  },
}

const defaultEphemeraTapeBehavior = {
  width: "76px",
  scale: 0.88,
  opacity: 0.94,
  translateY: "-7px",
  shadow: "0 3px 6px rgba(79, 59, 51, 0.12)",
}

function getAttachedEphemeraType(composition = {}) {
  return composition?.anchors?.find((siblingAnchor) =>
    ["reviewNote", "libraryCard", "ticketStub", "annualMemoryNote"].includes(
      siblingAnchor.type
    )
  )?.type
}

export function isTapeAnchor(anchor = {}) {
  return (
    anchor.rendererType === "tape" ||
    anchor.objectType === "tape" ||
    anchor.object?.type === "tape" ||
    anchor.category === "tape" ||
    tapeAnchorTypes.has(anchor.type)
  )
}

export function renderTape(anchor, context = {}) {
  const { asset, placement, composition } = context

  if (!asset) return null

  const attachedEphemeraType = getAttachedEphemeraType(composition)
  const ephemeraBehavior =
    ephemeraTapeBehaviors[attachedEphemeraType] || defaultEphemeraTapeBehavior

  const tapePlacement = attachedEphemeraType
    ? {
        ...placement,
        ...ephemeraBehavior,
        width: placement?.width || ephemeraBehavior.width,
        scale: placement?.scale ?? ephemeraBehavior.scale,
        opacity: placement?.opacity ?? ephemeraBehavior.opacity,
        rotate: placement?.rotate ?? ephemeraBehavior.rotate ?? 0,
        translateX:
          placement?.translateX ?? ephemeraBehavior.translateX ?? "0px",
        translateY:
          placement?.translateY ?? ephemeraBehavior.translateY ?? "0px",
        shadow: placement?.shadow || ephemeraBehavior.shadow,
      }
    : placement

  return <ScrapbookAsset asset={asset} placement={tapePlacement} />
}

export default renderTape