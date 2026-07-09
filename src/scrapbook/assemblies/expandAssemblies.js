import scrapbookAssemblies from "./assemblyRegistry"

function buildAssemblyAnchor(object = {}, assembly = {}) {
  return {
    type: object.type,
    assembly: {
      id: assembly.id,
      feeling: assembly.feeling,
      layout: assembly.layout,
      role: object.role,
      localPlacement: object.localPlacement || null,
    },
  }
}

function anchorType(anchor) {
  return typeof anchor === "string" ? anchor : anchor?.type
}

function hasAnchorType(anchors = [], type) {
  return anchors.some((anchor) => anchorType(anchor) === type)
}

export function expandAssemblies(anchorTypes = [], recipe = {}) {
  const expanded = [...anchorTypes]
  const requestedAssemblies = recipe.assemblies || []

  requestedAssemblies.forEach((assemblyId) => {
    const assembly = scrapbookAssemblies[assemblyId]

    if (!assembly) return

    assembly.objects.forEach((object) => {
      if (!hasAnchorType(expanded, object.type)) {
        expanded.push(buildAssemblyAnchor(object, assembly))
      }
    })
  })

  return expanded
}

export default expandAssemblies