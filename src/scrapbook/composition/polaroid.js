import {
  createScrapbookDNA,
  getScrapbookLift,
  getScrapbookObject,
  getScrapbookLayer,
} from "../engine"

export function composePolaroid({
  variant = "polaroid",
  objectType = "polaroid",
  rotation,
  lift,
  scrapbookId = variant,
} = {}) {
  const object = getScrapbookObject(objectType)

  const dna = createScrapbookDNA({
    id: scrapbookId,
    type: objectType,
    variant,
  })

  const resolvedLift = lift ?? object.lift ?? dna.layout.lift
  const resolvedShadow = getScrapbookLift(resolvedLift)
  const resolvedRotation = rotation || dna.layout.rotation

  return {
    dna,
    object,
    objectType,
    variant,

    rotation: resolvedRotation,
    offsetX: dna.layout.offsetX,
    offsetY: dna.layout.offsetY,
    lift: resolvedLift,
    shadow: resolvedShadow,

    style: {
      "--pp-composed-rotation": resolvedRotation,
      "--pp-composed-offset-x": dna.layout.offsetX,
      "--pp-composed-offset-y": dna.layout.offsetY,
      "--pp-composed-shadow": resolvedShadow,
      "--pp-polaroid-layer": getScrapbookLayer("polaroid"),
      "--pp-photo-layer": getScrapbookLayer("photo"),
      "--pp-tape-layer": getScrapbookLayer("tape"),
      "--pp-clip-layer": getScrapbookLayer("clip"),
      "--pp-flower-layer": getScrapbookLayer("flower"),
    },

    classNames: [
      "pp-composed-polaroid",
      `pp-object-${objectType}`,
      `pp-dna-paper-${dna.paper.variant}`,
      `pp-dna-curl-${dna.paper.curl}`,
      dna.paper.fold !== "none" && `pp-dna-fold-${dna.paper.fold}`,
    ]
      .filter(Boolean)
      .join(" "),
  }
}