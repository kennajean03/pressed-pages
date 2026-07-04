import { useMemo } from "react"

import { createScrapbookDNA } from "../engine/dna"
import { resolveScrapbookComposition } from "../recipes/recipeResolver"
import { buildComposition } from "../composition/buildComposition"

export function useResolvedComposition({
  scrapbookId = "pressed-pages",
  objectType = "paper",
  variant = "default",
  readingState,
  genre,
  season,
  occasion,
} = {}) {
  return useMemo(() => {
    const dna = createScrapbookDNA({
      id: scrapbookId,
      type: objectType,
      variant,
    })

    const recipe = resolveScrapbookComposition({
      readingState,
      genre,
      season,
      occasion,
    })

    const composition = buildComposition(recipe)

if (variant === "library" && composition) {
  composition.paper.variant = "aged"
  composition.paper.aging = composition.paper.aging ?? "medium"
  composition.layout.density = composition.layout.density ?? "medium"
}

    return {
      dna,
      recipe,
      composition,
    }
  }, [scrapbookId, objectType, variant, readingState, genre, season, occasion])
}