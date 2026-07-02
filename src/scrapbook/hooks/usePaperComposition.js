import { useMemo } from "react"

import { composePaper } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function usePaperComposition({
  variant = "card",
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
        rotation,
        lift,
        scrapbookId,
      }),
    [theme, materials, density, variant, rotation, lift, scrapbookId]
  )
}