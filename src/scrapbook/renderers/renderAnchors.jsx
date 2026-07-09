import React from "react"

import { getRelationshipBehavior } from "../behavior/relationshipBehavior"
import { getScrapbookZone } from "../behavior/scrapbookZones"
import { ScrapbookAsset } from "../components/ScrapbookAsset"
import { getScrapbookAsset } from "../materials/assetRegistry"
import { isBotanicalAnchor, renderBotanical } from "./renderBotanical.jsx"
import { isEphemeraAnchor, renderEphemera } from "./renderEphemera.jsx"
import { isPatinaAnchor, renderPatina } from "./renderPatina.jsx"
import { isRareAnchor, renderRare } from "./renderRare.jsx"
import { isStampAnchor, renderStamp } from "./renderStamp.jsx"
import { isTapeAnchor, renderTape } from "./renderTape.jsx"

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

const assemblyRoles = {
  heldObject: "heldObject",
  fastener: "fastener",
  memory: "memory",
}

const relationshipTypes = {
  heldBy: "heldBy",
  fastens: "fastens",
}

const rendererMatchers = [
  [isTapeAnchor, anchorRendererTypes.tape],
  [isBotanicalAnchor, anchorRendererTypes.botanical],
  [isEphemeraAnchor, anchorRendererTypes.ephemera],
  [isStampAnchor, anchorRendererTypes.stamp],
  [isPatinaAnchor, anchorRendererTypes.patina],
  [isRareAnchor, anchorRendererTypes.rare],
]

function getAssemblyRole(anchor = {}) {
  return anchor.assembly?.role || null
}

function getRelationshipType(anchor = {}) {
  return anchor.relationship?.relation || null
}

function anchorClass(anchor = {}, rendererType = anchorRendererTypes.asset) {
  const assemblyRole = getAssemblyRole(anchor)
  const relationshipType = getRelationshipType(anchor)

  return [
    "pp-scrapbook-anchor",
    `pp-scrapbook-anchor--${anchor.type}`,
    `pp-scrapbook-anchor--renderer-${rendererType}`,
    `pp-scrapbook-anchor--placement-${anchor.placement}`,
    `pp-scrapbook-anchor--depth-${anchor.depth}`,
    assemblyRole && `pp-scrapbook-anchor--role-${assemblyRole}`,
    anchor.assembly?.id && `pp-scrapbook-anchor--assembly-${anchor.assembly.id}`,
    relationshipType && `pp-scrapbook-anchor--relation-${relationshipType}`,
    anchor.relationship?.strategy &&
      `pp-scrapbook-anchor--strategy-${anchor.relationship.strategy}`,
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

  const matchedRenderer = rendererMatchers.find(([matches]) => matches(anchor))

  return matchedRenderer?.[1] || anchorRendererTypes.asset
}

function resolveAnchorPlacement(anchor = {}, relationshipBehavior = {}) {
  const placement = {
    rotation: "0deg",
    scale: 1,
    opacity: 1,
    shadow: "none",
    translateX: "0px",
    translateY: "0px",
  }

  const assemblyRole = getAssemblyRole(anchor)

  if (assemblyRole === assemblyRoles.heldObject) {
    return {
      ...placement,
      width: relationshipBehavior.width ?? (anchor.type === "pressedFern" ? "58px" : "46px"),
      scale: relationshipBehavior.scale ?? 0.88,
      opacity: relationshipBehavior.opacity ?? 0.86,
      shadow: relationshipBehavior.shadow ?? "0 3px 7px rgba(79, 59, 51, 0.08)",
      translateX: relationshipBehavior.translateX ?? "0px",
      translateY: relationshipBehavior.translateY ?? "5px",
    }
  }

  if (assemblyRole === assemblyRoles.fastener) {
    return {
      ...placement,
      width: relationshipBehavior.width ?? "82px",
      scale: relationshipBehavior.scale ?? 0.94,
      opacity: relationshipBehavior.opacity ?? 0.97,
      shadow: relationshipBehavior.shadow ?? "0 4px 8px rgba(79, 59, 51, 0.1)",
      translateX: relationshipBehavior.translateX ?? "0px",
      translateY: relationshipBehavior.translateY ?? "-2px",
    }
  }

  switch (anchor.attachment) {
    case "holding":
      return {
        ...placement,
        width: relationshipBehavior.width ?? "82px",
        scale: relationshipBehavior.scale ?? 0.92,
        opacity: relationshipBehavior.opacity ?? 0.96,
        shadow: relationshipBehavior.shadow ?? "0 4px 8px rgba(79, 59, 51, 0.1)",
        translateX: relationshipBehavior.translateX ?? "0px",
        translateY: relationshipBehavior.translateY ?? "-2px",
      }

    case "tucked":
      return {
        ...placement,
        width: relationshipBehavior.width ?? (anchor.type === "pressedFern" ? "58px" : "44px"),
        scale: relationshipBehavior.scale ?? 0.88,
        opacity: relationshipBehavior.opacity ?? 0.82,
        shadow: relationshipBehavior.shadow ?? "0 3px 7px rgba(79, 59, 51, 0.08)",
        translateX: relationshipBehavior.translateX ?? "0px",
        translateY: relationshipBehavior.translateY ?? "6px",
      }

    case "peeking":
      return {
        ...placement,
        width: relationshipBehavior.width ?? "36px",
        scale: relationshipBehavior.scale ?? 0.9,
        opacity: relationshipBehavior.opacity ?? 0.92,
        shadow: relationshipBehavior.shadow ?? "0 6px 12px rgba(79, 59, 51, 0.12)",
        translateX: relationshipBehavior.translateX ?? "0px",
        translateY: relationshipBehavior.translateY ?? "-12px",
      }

    case "stacked":
      return {
        ...placement,
        width: relationshipBehavior.width ?? "104px",
        scale: relationshipBehavior.scale ?? 0.92,
        opacity: relationshipBehavior.opacity ?? 0.96,
        shadow: relationshipBehavior.shadow ?? "0 8px 16px rgba(79, 59, 51, 0.12)",
        translateX: relationshipBehavior.translateX ?? "-8px",
        translateY: relationshipBehavior.translateY ?? "0px",
      }

    case "written":
      return {
        ...placement,
        width: relationshipBehavior.width ?? "78px",
        scale: relationshipBehavior.scale ?? 0.9,
        opacity: relationshipBehavior.opacity ?? 0.78,
        shadow: relationshipBehavior.shadow ?? placement.shadow,
        translateX: relationshipBehavior.translateX ?? "0px",
        translateY: relationshipBehavior.translateY ?? "0px",
      }

    case "patina":
      return {
        ...placement,
        width: relationshipBehavior.width ?? "140px",
        scale: relationshipBehavior.scale ?? 1,
        opacity: relationshipBehavior.opacity ?? 0.22,
        shadow: relationshipBehavior.shadow ?? "none",
        translateX: relationshipBehavior.translateX ?? "0px",
        translateY: relationshipBehavior.translateY ?? "0px",
      }

    default:
      return {
        ...placement,
        width: relationshipBehavior.width ?? placement.width,
        scale: relationshipBehavior.scale ?? placement.scale,
        opacity: relationshipBehavior.opacity ?? placement.opacity,
        shadow: relationshipBehavior.shadow ?? placement.shadow,
        translateX: relationshipBehavior.translateX ?? placement.translateX,
        translateY: relationshipBehavior.translateY ?? placement.translateY,
      }
  }
}

function resolveAnchorLayer(anchor = {}, relationshipBehavior = {}) {
  const relationship = anchor.relationship || {}
  const assemblyRole = getAssemblyRole(anchor)

  if (typeof relationshipBehavior.layer === "number") {
    return (anchor.layer ?? 4) + relationshipBehavior.layer
  }

  if (relationship.relation === relationshipTypes.heldBy) {
    return anchor.layer ?? 3
  }

  if (relationship.relation === relationshipTypes.fastens) {
    return anchor.layer ?? 7
  }

  if (typeof relationship.depthBias === "number") {
    return (anchor.layer ?? 4) + relationship.depthBias
  }

  if (assemblyRole === assemblyRoles.heldObject) {
    return anchor.layer ?? 3
  }

  if (assemblyRole === assemblyRoles.fastener) {
    return anchor.layer ?? 6
  }

  if (assemblyRole === assemblyRoles.memory) {
    return anchor.layer ?? 2
  }

  return anchor.layer ?? 4
}

function resolveAnchorRotation(anchor = {}, relationshipBehavior = {}) {
  const baseRotation = anchor.rotation || 0

  if (typeof relationshipBehavior.rotate === "number") {
    return baseRotation + relationshipBehavior.rotate
  }

  return baseRotation
}

function resolveAnchorBrightness(anchor = {}, relationshipBehavior = {}) {
  if (relationshipBehavior.brightness != null) {
    return relationshipBehavior.brightness
  }

  if (anchor.depth === "behind") return 0.96
  if (anchor.depth === "tucked") return 0.985

  return 1
}

function resolveAnchorZoneStyle(anchor = {}, composition = {}) {
  const seed = [
    composition.id,
    composition.type,
    anchor.id,
    anchor.type,
    anchor.assembly?.id,
    anchor.assembly?.role,
    anchor.relationship?.relation,
    anchor.relationship?.strategy,
    anchor.placement,
  ]
    .filter(Boolean)
    .join("-")

  const zone = getScrapbookZone(anchor.placement, seed)

  return {
    top: zone.top ?? undefined,
    right: zone.right ?? undefined,
    bottom: zone.bottom ?? undefined,
    left: zone.left ?? undefined,
    "--pp-anchor-zone-center-x": zone.centerX ? "-50%" : "0px",
  }
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

function renderEphemeraAnchor(context) {
  return renderEphemera(context.anchor, context)
}

function renderStampAnchor(context) {
  return renderStamp(context.anchor, context)
}

function renderPatinaAnchor(context) {
  return renderPatina(context.anchor, {
    ...context,
    renderAssetAnchor,
  })
}

function renderRareAnchor(context) {
  return renderRare(context.anchor, {
    ...context,
    renderAssetAnchor,
  })
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
    const relationshipBehavior = getRelationshipBehavior(anchor)
    const placement = resolveAnchorPlacement(anchor, relationshipBehavior)
    const rendererType = resolveAnchorRendererType(anchor)
    const renderer = anchorRenderers[rendererType] || renderAssetAnchor
    const zoneStyle = resolveAnchorZoneStyle(anchor, composition)
    const assemblyRole = getAssemblyRole(anchor)
    const relationshipType = getRelationshipType(anchor)

    const style = {
      ...zoneStyle,
      "--pp-anchor-rotation": `${resolveAnchorRotation(anchor, relationshipBehavior)}deg`,
      "--pp-anchor-layer": resolveAnchorLayer(anchor, relationshipBehavior),
      "--pp-anchor-offset-x": `${anchor.offset?.x ?? 0}px`,
      "--pp-anchor-offset-y": `${anchor.offset?.y ?? 0}px`,
      "--pp-anchor-brightness": resolveAnchorBrightness(anchor, relationshipBehavior),
      "--pp-anchor-scale":
        placement.scale ?? (anchor.attachment === "holding" ? 0.985 : 1),
      "--pp-anchor-translate-x": placement.translateX ?? "0px",
      "--pp-anchor-translate-y": placement.translateY ?? "0px",
    }

    return (
      <span
        key={`${anchor.id}-${anchor.placement}`}
        className={anchorClass(anchor, rendererType)}
        style={style}
        aria-hidden="true"
        title={getAnchorLabel(anchor)}
        data-assembly-id={anchor.assembly?.id}
        data-assembly-role={assemblyRole}
        data-relationship={relationshipType}
        data-relationship-strategy={anchor.relationship?.strategy}
        data-relationship-partner-id={anchor.relationship?.partnerId}
      >
        {renderer({
          anchor,
          asset,
          placement,
          rendererType,
          assemblyRole,
          relationshipType,
          relationship: anchor.relationship,
          relationshipBehavior,
          composition,
          options,
        })}
      </span>
    )
  })
}

export default renderAnchors