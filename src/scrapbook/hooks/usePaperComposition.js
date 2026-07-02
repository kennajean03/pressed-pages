import { useMemo } from "react"

import { composePaper } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function usePaperComposition({
  variant = "card",
  objectType = "paper",
  rotation,
  lift = "soft",
  scrapbookId,
} = {}) {
  const { theme, materials, density } = useScrapbook()

  return useMemo(
    () =>
      composePaper({
        theme,
        materials,
        density,
        variant,
        objectType,
        rotation,
        lift,
        scrapbookId,
      }),
    [theme, materials, density, variant, objectType, rotation, lift, scrapbookId]
  )
}