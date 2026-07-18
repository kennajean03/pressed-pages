import {
  JOURNEY_LAYOUT_TYPES,
} from "../../scrapbook/journey/journeyLayoutRegistry"

function renderJourneyObject({
  layoutObject,
  renderers,
  sharedProps,
}) {
  if (!layoutObject) {
    return null
  }

  const renderer =
    renderers[
      layoutObject.type
    ]

  if (
    typeof renderer !==
    "function"
  ) {
    return null
  }

  return renderer({
    layoutObject,
    ...sharedProps,
  })
}

function getJourneyObjectKey(
  layoutObject,
  objectIndex
) {
  return (
    layoutObject?.id ||
    `${layoutObject?.type || "journey-object"}-${objectIndex}`
  )
}

function JourneyRenderer({
  layout = {},
  renderHero,
  renderSummary,
  renderChapter,
  renderJournalPage,
  renderFavoriteQuotes,
  renderReview,
  renderActions,
  sharedProps = {},
  className = "",
}) {
  const layoutObjects =
    Array.isArray(
      layout.layoutObjects
    )
      ? layout.layoutObjects
      : Array.isArray(
            layout.story
          )
        ? layout.story
        : []

  if (!layoutObjects.length) {
    return null
  }

  const renderers = {
    [JOURNEY_LAYOUT_TYPES.hero]:
      renderHero,

    [JOURNEY_LAYOUT_TYPES
      .journeySummary]:
      renderSummary,

    [JOURNEY_LAYOUT_TYPES.chapter]:
      renderChapter,

    [JOURNEY_LAYOUT_TYPES
      .journalPage]:
      renderJournalPage,

    [JOURNEY_LAYOUT_TYPES
      .favoriteQuotes]:
      renderFavoriteQuotes,

    [JOURNEY_LAYOUT_TYPES.review]:
      renderReview,

    [JOURNEY_LAYOUT_TYPES.actions]:
      renderActions,
  }

  const rendererClassName = [
    "journey-renderer",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={
        rendererClassName
      }
      data-journey-renderer="true"
    >
      {layoutObjects.map(
        (
          layoutObject,
          objectIndex
        ) => {
          const renderedObject =
            renderJourneyObject({
              layoutObject,
              renderers,
              sharedProps,
            })

          if (!renderedObject) {
            return null
          }

          return (
            <div
              key={getJourneyObjectKey(
                layoutObject,
                objectIndex
              )}
              className={[
                "journey-renderer__object",
                `journey-renderer__object--${layoutObject.type}`,
              ]
                .filter(Boolean)
                .join(" ")}
              data-journey-layout-type={
                layoutObject.type
              }
              data-journey-layout-role={
                layoutObject.role ||
                ""
              }
            >
              {renderedObject}
            </div>
          )
        }
      )}
    </div>
  )
}

export default JourneyRenderer