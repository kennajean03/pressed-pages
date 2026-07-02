import { useMemo } from "react"

import { composePolaroid } from "../composition"

export function usePolaroidComposition({
  variant = "polaroid",
  objectType = "polaroid",
  rotation,
  lift,
  scrapbookId,
} = {}) {
  return useMemo(
    () =>
      composePolaroid({
        variant,
        objectType,
        rotation,
        lift,
        scrapbookId,
      }),
    [variant, objectType, rotation, lift, scrapbookId]
  )
}