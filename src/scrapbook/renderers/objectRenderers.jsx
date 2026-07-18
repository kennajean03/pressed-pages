function renderLabel(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderHeroArtifact(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderTracker(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderMemory(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderSummary(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

  return (
    <Element
      className={className}
      {...attributes}
    >
      {children}
    </Element>
  )
}

function renderActions(renderModel) {
  const {
    Element,
    className,
    attributes,
    children,
  } = renderModel

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
  summary: renderSummary,
  actions: renderActions,
}

export function getScrapbookObjectRenderer(
  semanticRole
) {
  if (!semanticRole) return null

  return scrapbookObjectRenderers[semanticRole] || null
}