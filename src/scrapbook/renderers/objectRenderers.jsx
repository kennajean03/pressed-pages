function renderLabel({
  Element,
  className,
  attributes,
  children,
}) {
  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderHeroArtifact({
  Element,
  className,
  attributes,
  children,
}) {
  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderTracker({
  Element,
  className,
  attributes,
  children,
}) {
  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderMemory({
  Element,
  className,
  attributes,
  children,
}) {
  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderActions({
  Element,
  className,
  attributes,
  children,
}) {
  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

export const scrapbookObjectRenderers = {
  label: renderLabel,
  heroArtifact: renderHeroArtifact,
  tracker: renderTracker,
  memory: renderMemory,
  actions: renderActions,
}

export function getScrapbookObjectRenderer(
  semanticRole
) {
  if (!semanticRole) return null

  return scrapbookObjectRenderers[semanticRole] || null
}