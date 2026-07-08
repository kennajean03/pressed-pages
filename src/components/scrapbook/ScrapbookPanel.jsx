import PaperCard from "./PaperCard/PaperCard"
import { useResolvedComposition } from "../../scrapbook/hooks"
import { renderAnchors } from "../../scrapbook/renderers/renderAnchors"

function ScrapbookPanel({
  children,
  className = "",
  scrapbookId,
  objectType = "panel",
  variant = "analytics",
  readingState,
  genre,
  season,
  occasion = "annualScrapbook",
}) {
  const { recipe, composition } = useResolvedComposition({
    scrapbookId,
    objectType,
    variant,
    readingState,
    genre,
    season,
    occasion,
  })

  return (
    <PaperCard
      composition={composition}
      className={className}
      data-composition-mood={recipe?.compositionMood}
      data-scrapbook-feeling={composition?.feeling}
    >
      {renderAnchors(composition)}
      {children}
    </PaperCard>
  )
}

export default ScrapbookPanel