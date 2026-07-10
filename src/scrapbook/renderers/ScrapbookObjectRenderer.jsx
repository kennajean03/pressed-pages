import {
  getScrapbookObjectRenderer,
} from "./objectRenderers"

function ScrapbookObjectRenderer({
  object,
  definition,
  presentation,
  as: Element = "div",
  className = "",
  children,
  ...rest
}) {
  if (!object || !definition) {
    return null
  }

  const resolvedPresentation =
    presentation ||
    {
      hero: false,
      emphasis: "supporting",
      placement: "flow",
      scale: "medium",
      density: "comfortable",
    }

  const objectClassName = [
    "scrapbook-object",
    `scrapbook-object--${object.id}`,
    `scrapbook-object--role-${definition.role}`,
    `scrapbook-object--semantic-${object.semanticRole}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const attributes = {
    "data-scrapbook-object": object.id,
    "data-object-role": definition.role,
    "data-object-state": definition.state,
    "data-object-semantic-role": object.semanticRole,

    "data-object-hero":
      String(resolvedPresentation.hero),

    "data-object-emphasis":
      resolvedPresentation.emphasis,

    "data-object-placement":
      resolvedPresentation.placement,

    "data-object-scale":
      resolvedPresentation.scale,

    "data-object-density":
      resolvedPresentation.density,

    ...rest,
  }

 const objectRenderer =
  getScrapbookObjectRenderer(
    object.semanticRole
  )

const renderModel = {
  object,
  definition,
  presentation:
    resolvedPresentation,
  Element,
  className:
    objectClassName,
  attributes,
  children,
}

if (objectRenderer) {
  return objectRenderer(
    renderModel
  )
}



  return (
    <Element
      className={objectClassName}
      {...attributes}
    >
      {children}
    </Element>
  )
}

export default ScrapbookObjectRenderer