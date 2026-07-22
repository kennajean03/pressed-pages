import {
  JOURNEY_LAYOUT_TYPES,
} from "../../scrapbook/journey/journeyLayoutRegistry"


function renderJourneyObject({
  layoutObject,
  renderers,
  sharedProps,
  childLayoutObjects = [],
  renderJournalPage,
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
    childLayoutObjects,
    renderJournalPage,
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

function getChapterJournalPages({
  layoutObjects,
  chapterIndex,
  chapterId,
}) {
  const journalPages = []

  for (
    let objectIndex =
      chapterIndex + 1;
    objectIndex <
    layoutObjects.length;
    objectIndex += 1
  ) {
    const candidate =
      layoutObjects[
        objectIndex
      ]

    if (
      candidate?.type !==
      JOURNEY_LAYOUT_TYPES
        .journalPage
    ) {
      break
    }

    if (
      candidate.chapterId ===
      chapterId
    ) {
      journalPages.push(
        candidate
      )
    }
  }

  return journalPages
}

function JourneyRenderer({
  layout = {},
  renderHero,
  renderSummary,
  renderChapter,
  renderJournalPage,
  renderFavoriteQuotes,
  renderKeepsakeCollection,
  renderReflection,
  renderReview,
  renderEnding,
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

[JOURNEY_LAYOUT_TYPES
  .keepsakeCollection]:
  renderKeepsakeCollection,
  
[JOURNEY_LAYOUT_TYPES
  .reflection]:
   renderReflection,

[JOURNEY_LAYOUT_TYPES.review]:
  renderReview,

    [JOURNEY_LAYOUT_TYPES.ending]:
      renderEnding,

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
          /*
           * Journal pages belonging to a
           * chapter are rendered by that
           * chapter's renderer rather than
           * as independent top-level objects.
           */
          if (
            layoutObject.type ===
            JOURNEY_LAYOUT_TYPES
              .journalPage
          ) {
            return null
          }

          const childLayoutObjects =
            layoutObject.type ===
            JOURNEY_LAYOUT_TYPES
              .chapter
              ? getChapterJournalPages({
                  layoutObjects,

                  chapterIndex:
                    objectIndex,

                  chapterId:
                    layoutObject.chapterId,
                })
              : []

          const renderedObject =
            renderJourneyObject({
              layoutObject,
              renderers,
              sharedProps,
              childLayoutObjects,
              renderJournalPage,
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