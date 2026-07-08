import React from "react"

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
  return <EphemeraObject anchor={anchor} />
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