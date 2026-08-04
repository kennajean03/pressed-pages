import { ScrapbookAsset } from "../../../scrapbook/components/ScrapbookAsset"
import { getScrapbookAsset } from "../../../scrapbook/materials/assetRegistry"

function FlagshipCorner({ assetId, className = "", width = "clamp(108px, 12vw, 176px)" }) {
  const asset = getScrapbookAsset(assetId)

  if (!asset) return null

  return (
    <ScrapbookAsset
      asset={asset}
      className={`phase17b-flagship-corner ${className}`.trim()}
      placement={{ width, shadow: "0 12px 24px rgba(61, 43, 35, 0.12)" }}
    />
  )
}

export default FlagshipCorner
