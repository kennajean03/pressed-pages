import React from "react"

import { getMaterialBehavior } from "../materials/materialBehaviors"

export const ephemeraAnchorTypes = [
  "reviewNote",
  "libraryCard",
  "ticketStub",
  "annualMemoryNote",
]

export function isEphemeraAnchor(anchor = {}) {
  return ephemeraAnchorTypes.includes(anchor.type)
}

export function renderEphemera(anchor) {
  const material = getMaterialBehavior(anchor)

  return (
    <EphemeraObject
      anchor={anchor}
      material={material}
    />
  )
}

function resolveMaterialStyle(material) {
  const borderRadius =
    material.material === "cardstock"
      ? "5px"
      : material.material === "receiptPaper"
        ? "2px"
        : "7px"

  const opacity =
    material.material === "receiptPaper"
      ? 0.9
      : 0.96

  const transform = `
    rotate(${(material.curl - 0.3) * 2}deg)
    scale(${1 + (material.rigidity - 0.5) * 0.02})
  `

  const boxShadow =
    material.shadowSoftness === "medium"
      ? "0 8px 16px rgba(79,59,51,.14)"
      : material.shadowSoftness === "soft"
        ? "0 6px 12px rgba(79,59,51,.10)"
        : "0 4px 8px rgba(79,59,51,.08)"

  return {
    borderRadius,
    opacity,
    transform,
    boxShadow,
  }
}

function EphemeraObject({ anchor, material }) {
  const materialStyle = resolveMaterialStyle(material)

  return (
    <span
      className={`pp-ephemera-object pp-ephemera-object--${anchor.type}`}
      style={materialStyle}
    >
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