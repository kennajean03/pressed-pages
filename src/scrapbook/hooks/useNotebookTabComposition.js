import { useMemo } from "react"

import { composeNotebookTab } from "../composition"
import { useScrapbook } from "./useScrapbook"

export function useNotebookTabComposition({
  active = false,
  scrapbookId,
} = {}) {
  const { materials } = useScrapbook()

  return useMemo(
    () =>
      composeNotebookTab({
        materials,
        active,
        scrapbookId,
      }),
    [materials, active, scrapbookId]
  )
}