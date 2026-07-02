import { useMemo } from "react"

import { composeNotebookTab } from "../composers"
import { useScrapbook } from "./useScrapbook"

export function useNotebookTabComposition({ active = false } = {}) {
  const { materials } = useScrapbook()

  return useMemo(
    () =>
      composeNotebookTab({
        materials,
        active,
      }),
    [materials, active]
  )
}