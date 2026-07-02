import {
  createScrapbookDNA,
  getScrapbookLift,
  getScrapbookObject,
  pickFromCollection,
} from "../engine"

import {
  getPaperMaterial,
  getTapeMaterial,
  getTextureMaterial,
} from "../materials"

import {
  resolvePaper,
  resolveTape,
  resolveTexture,
} from "../resolver"

function pickMaterialId(theme, collectionName, fallbackId, seed) {
  return pickFromCollection(
    theme?.collections?.[collectionName],
    seed,
    fallbackId
  )
}

export function composePaper({
  theme,
  materials,
  density,
  variant = "card",
  objectType = "paper",
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

  const paperId = pickMaterialId(
    theme,
    "papers",
    materials?.paper?.id,
    dna.identity.seed + 101
  )

  const tapeId = pickMaterialId(
    theme,
    "tapes",
    materials?.tape?.id,
    dna.identity.seed + 102
  )

  const textureId = pickMaterialId(
    theme,
    "textures",
    materials?.texture?.id,
    dna.identity.seed + 103
  )

  const paperMaterial = getPaperMaterial(paperId)
  const tapeMaterial = getTapeMaterial(tapeId)
  const textureMaterial = getTextureMaterial(textureId)

  const resolvedPaper = object.paper
    ? resolvePaper(paperMaterial, dna)
    : null

  const resolvedTape =
    object.tape && density?.tape
      ? resolveTape(tapeMaterial, dna)
      : null

  const resolvedTexture =
    object.stain || density?.texture
      ? resolveTexture(textureMaterial, dna)
      : null

  const resolvedLift = lift ?? object.lift ?? dna.layout.lift
  const resolvedShadow = getScrapbookLift(resolvedLift)
  const resolvedRotation = rotation || dna.layout.rotation

  return {
    dna,
    object,
    objectType,
    variant,

    paper: resolvedPaper,
    texture: resolvedTexture,
    tape: resolvedTape,

    rotation: resolvedRotation,
    offsetX: dna.layout.offsetX,
    offsetY: dna.layout.offsetY,

    lift: resolvedLift,
    shadow: resolvedShadow,

    paperVariant: dna.paper.variant,
    tapeVariant: dna.tape.variant,
    stainVariant: dna.texture.stain,
    curl: dna.paper.curl,

    style: {
      "--pp-composed-rotation": resolvedRotation,
      "--pp-composed-offset-x": dna.layout.offsetX,
      "--pp-composed-offset-y": dna.layout.offsetY,
      "--pp-composed-shadow": resolvedShadow,
    },

    classNames: [
      "pp-composed-paper",
      `pp-object-${objectType}`,
      resolvedPaper && `pp-dna-paper-${dna.paper.variant}`,
      resolvedPaper && `pp-dna-curl-${dna.paper.curl}`,
      resolvedPaper && dna.paper.fold !== "none" && `pp-dna-fold-${dna.paper.fold}`,
      resolvedTexture && dna.texture.stain !== "none" && `pp-dna-stain-${dna.texture.stain}`,
      resolvedPaper?.className,
      resolvedTexture?.className,
      resolvedTape?.className,
    ]
      .filter(Boolean)
      .join(" "),
  }
}