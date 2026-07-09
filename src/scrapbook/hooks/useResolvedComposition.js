import { useMemo } from "react"

import { createScrapbookDNA } from "../engine/dna"
import { buildComposition } from "../composition/buildComposition"
import {
  getScrapbookRecipe,
  resolveScrapbookRecipe,
} from "../recipes/scrapbookRecipes"

export function useResolvedComposition({
  scrapbookId = "pressed-pages",
  objectType = "paper",
  variant = "default",
  recipeId,
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

    const recipe = recipeId
      ? getScrapbookRecipe(recipeId)
      : resolveScrapbookRecipe({
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
  }, [
    scrapbookId,
    objectType,
    variant,
    recipeId,
    readingState,
    genre,
    season,
    occasion,
  ])
}