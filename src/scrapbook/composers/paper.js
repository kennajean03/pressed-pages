import {
  createScrapbookSeed,
  getScrapbookLift,
  seededOffset,
  seededRotation,
} from "../engine"

export function composePaper({
  materials,
  density,
  variant = "card",
  rotation,
  lift = "soft",
  scrapbookId = variant,
} = {}) {
  const baseSeed = createScrapbookSeed(`paper-${scrapbookId}-${variant}`)
  const resolvedRotation = rotation || seededRotation(baseSeed + 1, 1.1)
  const resolvedOffsetX = seededOffset(baseSeed + 2, 3)
  const resolvedOffsetY = seededOffset(baseSeed + 3, 3)
  const resolvedShadow = getScrapbookLift(lift)

  return {
    variant,

    paper: materials?.paper,
    texture: density?.texture ? materials?.texture : null,
    tape: density?.tape ? materials?.tape : null,

    rotation: resolvedRotation,
    offsetX: resolvedOffsetX,
    offsetY: resolvedOffsetY,

    lift,
    shadow: resolvedShadow,

    style: {
      "--pp-composed-rotation": resolvedRotation,
      "--pp-composed-offset-x": resolvedOffsetX,
      "--pp-composed-offset-y": resolvedOffsetY,
      "--pp-composed-shadow": resolvedShadow,
    },

    classNames: [
      "pp-composed-paper",
      materials?.paper?.className,
      density?.texture && materials?.texture?.className,
      density?.tape && materials?.tape?.className,
    ]
      .filter(Boolean)
      .join(" "),
  }
}