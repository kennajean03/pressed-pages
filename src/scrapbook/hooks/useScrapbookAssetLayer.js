import { useMemo } from "react"
import { composeAssetLayer } from "../composition"

export function useScrapbookAssetLayer(options = {}) {
  const seed = options?.dna?.identity?.seed
  const includeKey = options?.include?.join("|")

  return useMemo(
    () => composeAssetLayer(options),
    // The stable composition inputs intentionally define cache identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, includeKey, options?.objectType, options?.collection]
  )
}
