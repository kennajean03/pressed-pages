import { composeBotanical } from "./botanical"
import { composePaper } from "./paper"

export function composeSection({
  materials,
  density,
  variant = "default",
} = {}) {
  const paper = composePaper({
    materials,
    density,
    variant: `section-${variant}`,
    lift: "medium",
  })

  const botanical = composeBotanical({
    materials,
    density,
  })

  return {
    ...paper,
    botanical,

    classNames: [
      paper.classNames,
      "pp-composed-section",
      `pp-composed-section-${variant}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}