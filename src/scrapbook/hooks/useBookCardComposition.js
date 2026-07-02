import { useMemo } from "react"

import { composeBookCard } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function useBookCardComposition({
  featured = false,
  scrapbookId,
} = {}) {
  const { materials, density } = useScrapbook()

  return useMemo(
    () =>
      composeBookCard({
        materials,
        density,
        featured,
        scrapbookId,
      }),
    [materials, density, featured, scrapbookId]
  )
}