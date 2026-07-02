import { randomScrapbookOffset, randomScrapbookRotation } from "../engine"

export function composeNotebookTab({
  materials,
  active = false,
} = {}) {
  return {
    tape: materials?.tape,
    active,

    rotation: randomScrapbookRotation(active ? 0.7 : 1.4),
    offsetX: randomScrapbookOffset(2),
    offsetY: randomScrapbookOffset(1),

    classNames: [
      "pp-composed-notebook-tab",
      materials?.tape?.className,
      active && "pp-composed-notebook-tab-active",
    ]
      .filter(Boolean)
      .join(" "),
  }
}