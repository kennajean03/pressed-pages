import {
  getScrapbookObjectRenderer,
} from "./objectRenderers"

function ScrapbookObjectRenderer({
  object,
  definition,
  as: Element = "div",
  className = "",
  children,
  ...rest
}) {
  if (!object || !definition) {
    return null
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
    ...rest,
  }

  const objectRenderer =
    getScrapbookObjectRenderer(
      object.semanticRole
    )

  if (objectRenderer) {
    return objectRenderer({
      object,
      definition,
      Element,
      className: objectClassName,
      attributes,
      children,
    })
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