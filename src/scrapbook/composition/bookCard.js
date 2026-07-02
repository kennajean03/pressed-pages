import { composePaper } from "./paper"

const BOOK_CARD_LAYOUTS = [
  {
    id: "cover-high-left",
    label: "Cover High Left",
    coverPlacement: "high-left",
    bodyPlacement: "center-right",
    statusPlacement: "left-edge",
  },
  {
    id: "cover-high-right",
    label: "Cover High Right",
    coverPlacement: "high-right",
    bodyPlacement: "center-left",
    statusPlacement: "left-edge",
  },
  {
    id: "cover-centered",
    label: "Cover Centered",
    coverPlacement: "center",
    bodyPlacement: "lower-center",
    statusPlacement: "top-left",
  },
  {
    id: "cover-tucked",
    label: "Cover Tucked",
    coverPlacement: "tucked-top",
    bodyPlacement: "lower-left",
    statusPlacement: "middle-left",
  },
]

function pickBookCardLayout(seed = 0) {
  return BOOK_CARD_LAYOUTS[Math.abs(seed) % BOOK_CARD_LAYOUTS.length]
}

export function composeBookCard({
  materials,
  density,
  featured = false,
  scrapbookId,
} = {}) {
  const paper = composePaper({
    materials,
    density,
    variant: featured ? "featured-book-card" : "book-card",
    objectType: "book",
    lift: featured ? "medium" : "soft",
    scrapbookId,
  })

  const layout = pickBookCardLayout(paper?.dna?.identity?.seed)

  return {
    ...paper,
    featured,
    layout,
    layoutId: layout.id,
    statusPlacement: layout.statusPlacement,
    classNames: [
      paper.classNames,
      "pp-composed-book-card",
      featured && "pp-composed-book-card-featured",
      layout.id && `pp-book-layout-${layout.id}`,
      layout.statusPlacement && `pp-book-status-${layout.statusPlacement}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}