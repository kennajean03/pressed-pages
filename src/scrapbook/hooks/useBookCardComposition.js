import { useMemo } from "react"

import { composeBookCard } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function useBookCardComposition({
  featured = false,
  scrapbookId,
  recipe,
} = {}) {
  const { materials, density } = useScrapbook()

  return useMemo(
    () =>
      composeBookCard({
        materials,
        density,
        recipe,
        featured,
        scrapbookId,
      }),
    [materials, density, recipe, featured, scrapbookId]
  )
}