import PaperCard from "./PaperCard/PaperCard"
import { useResolvedComposition } from "../../scrapbook/hooks"
import { renderAnchors } from "../../scrapbook/renderers/renderAnchors"

function ScrapbookPanel({
  as = "div",
  children,
  className = "",
  scrapbookId,
  objectType = "panel",
  variant = "analytics",
  recipeId,
  recipe: recipeIdAlias,
  readingState,
  genre,
  season,
  occasion = "annualScrapbook",
  hiddenAnchorTypes = [],
  maxFasteners = 1,
  ...props
}) {
  const { recipe: resolvedRecipe, composition } = useResolvedComposition({
    scrapbookId,
    objectType,
    variant,
    recipeId: recipeId || recipeIdAlias,
    readingState,
    genre,
    season,
    occasion,
  })

  return (
    <PaperCard
      as={as}
      composition={composition}
      className={className}
      data-composition-mood={resolvedRecipe?.compositionMood}
      data-scrapbook-feeling={composition?.feeling}
      {...props}
    >
      {renderAnchors(composition, {
        hiddenAnchorTypes,
        maxFasteners,
      })}
      {children}
    </PaperCard>
  )
}

export default ScrapbookPanel
