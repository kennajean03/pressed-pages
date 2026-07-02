import { useMemo } from "react"

import { composeBotanical } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function useBotanicalComposition({ corner } = {}) {
  const { materials, density } = useScrapbook()

  return useMemo(
    () =>
      composeBotanical({
        materials,
        density,
        corner,
      }),
    [materials, density, corner]
  )
}