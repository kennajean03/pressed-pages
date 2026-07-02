import { useMemo } from "react"
import { composeAssetLayer } from "../composition"

export function useScrapbookAssetLayer(options = {}) {
  const seed = options?.dna?.identity?.seed
  const includeKey = options?.include?.join("|")

  return useMemo(
    () => composeAssetLayer(options),
    [seed, includeKey, options?.objectType, options?.collection]
  )
}
