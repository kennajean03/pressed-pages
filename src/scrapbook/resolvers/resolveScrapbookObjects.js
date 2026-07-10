import {
  getScrapbookObject,
  resolveScrapbookObjectState,
} from "../objects/scrapbookObjectRegistry"

export function resolveScrapbookObjects(composition) {
  if (!composition?.objects?.length) {
    return []
  }

  return [...composition.objects]
    .sort(
      (firstDefinition, secondDefinition) =>
        firstDefinition.order - secondDefinition.order
    )
    .map((definition) => {
      const object = getScrapbookObject(definition.type)

      if (!object) {
        return {
          id: definition.id,
          role: definition.role,
          definition,
          object: null,
          state: null,
          isResolved: false,
        }
      }

      const state = resolveScrapbookObjectState(
        object.id,
        definition.state
      )

      return {
        id: definition.id,
        role: definition.role,
        definition: {
          ...definition,
          state,
        },
        object,
        state,
        isResolved: true,
      }
    })
}

export function resolveScrapbookObjectsByRole(composition) {
  return resolveScrapbookObjects(composition).reduce(
    (resolvedByRole, resolvedObject) => {
      if (!resolvedObject.role) {
        return resolvedByRole
      }

      resolvedByRole[resolvedObject.role] =
        resolvedObject

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
    resolveScrapbookObjects(composition).find(
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
    resolveScrapbookObjects(composition).find(
      (resolvedObject) =>
        resolvedObject.role === role
    ) || null
  )
}