import { createScrapbookDNA } from "../engine"

export function composeNotebookTab({
  materials,
  active = false,
  scrapbookId = "tab",
} = {}) {
  const dna = createScrapbookDNA({
    id: scrapbookId,
    type: "tab",
    variant: active ? "active" : "default",
  })

  return {
    dna,
    tape: materials?.tape,
    active,

    rotation: dna.layout.rotation,
    offsetX: dna.layout.offsetX,
    offsetY: dna.layout.offsetY,

    classNames: [
      "pp-composed-notebook-tab",
      materials?.tape?.className,
      active && "pp-composed-notebook-tab-active",
      `pp-dna-paper-${dna.paper.variant}`,
      `pp-dna-curl-${dna.paper.curl}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}