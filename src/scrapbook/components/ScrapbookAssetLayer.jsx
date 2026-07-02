import { ScrapbookAsset } from "./ScrapbookAsset"

export function ScrapbookAssetLayer({
  assets = [],
  className = "",
  children,
}) {
  if (!assets.length && !children) return null

  return (
    <span className={["pp-scrapbook-asset-layer", className].filter(Boolean).join(" ")} aria-hidden="true">
      {assets.map((entry) => (
        <ScrapbookAsset
          key={`${entry.slot}-${entry.asset?.id}`}
          asset={entry.asset}
          placement={entry.placement}
        />
      ))}
      {children}
    </span>
  )
}
