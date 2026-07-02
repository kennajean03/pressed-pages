import { randomScrapbookCorner, randomScrapbookRotation } from "../engine"

export function composeBotanical({
  materials,
  density,
  corner,
} = {}) {
  const enabled = Boolean(density?.flower && materials?.flower?.id !== "none")

  return {
    enabled,
    flower: enabled ? materials?.flower : null,

    corner: corner || randomScrapbookCorner(),
    rotation: randomScrapbookRotation(4),
    opacity: enabled ? 0.78 : 0,

    classNames: [
      "pp-composed-botanical",
      enabled && materials?.flower?.className,
    ]
      .filter(Boolean)
      .join(" "),
  }
}