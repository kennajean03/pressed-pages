import { useMemo } from "react"

import { composePaper } from "../composers"
import { useScrapbook } from "./useScrapbook"

export function usePaperComposition({
  variant = "card",
  rotation,
  lift = "soft",
  scrapbookId,
} = {}) {
  const { materials, density } = useScrapbook()

  return useMemo(
    () =>
      composePaper({
        materials,
        density,
        variant,
        rotation,
        lift,
        scrapbookId,
      }),
    [materials, density, variant, rotation, lift, scrapbookId]
  )
}