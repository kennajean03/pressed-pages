import { useMemo } from "react"

import { composeSection } from "../composers"
import { useScrapbook } from "./useScrapbook"

export function useSectionComposition({ variant = "default" } = {}) {
  const { materials, density } = useScrapbook()

  return useMemo(
    () =>
      composeSection({
        materials,
        density,
        variant,
      }),
    [materials, density, variant]
  )
}