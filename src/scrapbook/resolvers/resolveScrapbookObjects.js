import {
  getScrapbookObject,
  resolveScrapbookObjectState,
} from "../objects/scrapbookObjectRegistry"

const defaultScrapbookObjectPresentation = {
  hero: false,
  emphasis: "supporting",
  placement: "flow",
  scale: "medium",
  density: "comfortable",
}

function resolveScrapbookObjectPresentation(
  definition,
  object
) {
  const requestedPresentation =
    definition?.presentation || {}

  const hero = Boolean(
    requestedPresentation.hero ??
      definition?.hero ??
      false
  )

  return {
    ...defaultScrapbookObjectPresentation,
    ...requestedPresentation,
    hero,
    emphasis:
      requestedPresentation.emphasis ||
      (hero ? "primary" : "supporting"),
    placement:
      requestedPresentation.placement ||
      "flow",
    scale:
      requestedPresentation.scale ||
      (hero ? "large" : "medium"),
    density:
      requestedPresentation.density ||
      "comfortable",
    semanticRole:
      object?.semanticRole || null,
  }
}

export function resolveScrapbookObjects(composition) {
  if (!composition?.objects?.length) {
    return []
  }

  return [...composition.objects]
    .sort(
      (firstDefinition, secondDefinition) =>
        firstDefinition.order -
        secondDefinition.order
    )
    .map((definition) => {
      const object = getScrapbookObject(
        definition.type
      )

      const compositionRole =
        definition.role || null

      const presentation =
        resolveScrapbookObjectPresentation(
          definition,
          object
        )

      if (!object) {
        return {
          id: definition.id,
          role: compositionRole,
          compositionRole,
          definition,
          object: null,
          state: null,
          presentation,
          isResolved: false,
        }
      }

      const state =
        resolveScrapbookObjectState(
          object.id,
          definition.state
        )

      return {
        id: definition.id,
        role: compositionRole,
        compositionRole,
        definition: {
          ...definition,
          state,
        },
        object,
        state,
        presentation,
        isResolved: true,
      }
    })
}

export function resolveScrapbookObjectsByRole(
  composition
) {
  return resolveScrapbookObjects(
    composition
  ).reduce(
    (
      resolvedByRole,
      resolvedObject
    ) => {
      if (!resolvedObject.compositionRole) {
        return resolvedByRole
      }

      resolvedByRole[
        resolvedObject.compositionRole
      ] = resolvedObject

      return resolvedByRole
    },
    {}
  )
}

export function getResolvedScrapbookObject(
  composition,
  objectId
) {
  if (!objectId) return null

  return (
    resolveScrapbookObjects(
      composition
    ).find(
      (resolvedObject) =>
        resolvedObject.id === objectId
    ) || null
  )
}

export function getResolvedScrapbookObjectByRole(
  composition,
  role
) {
  if (!role) return null

  return (
    resolveScrapbookObjects(
      composition
    ).find(
      (resolvedObject) =>
        resolvedObject.compositionRole ===
        role
    ) || null
  )
}