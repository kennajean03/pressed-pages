import { composePaper } from "./paper"

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
    lift: featured ? "medium" : "soft",
    scrapbookId,
  })

  return {
    ...paper,
    featured,
    classNames: [
      paper.classNames,
      "pp-composed-book-card",
      featured && "pp-composed-book-card-featured",
    ]
      .filter(Boolean)
      .join(" "),
  }
}