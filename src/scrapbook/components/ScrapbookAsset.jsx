function resolveAssetSize(asset, placement = {}) {
  if (placement.width) return placement.width

  switch (asset?.category) {
    case "tape":
      return "96px"

    case "flower":
      return "72px"

    case "ephemera":
      return "112px"

    case "texture":
      return "150px"

    case "metal":
      return "58px"

    default:
      return "80px"
  }
}

function buildAssetStyle(asset, placement = {}) {
  return {
    width: resolveAssetSize(asset, placement),
    "--pp-asset-x": placement.x || "0px",
    "--pp-asset-y": placement.y || "0px",
    "--pp-asset-rotation": placement.rotation || "0deg",
    "--pp-asset-scale": placement.scale ?? 1,
    "--pp-asset-opacity": placement.opacity ?? 1,
    "--pp-asset-shadow": placement.shadow || "0 10px 22px rgba(79, 59, 51, 0.14)",
    ...placement.style,
  }
}

export function ScrapbookAsset({
  asset,
  placement = {},
  className = "",
  decorative = true,
  children,
}) {
  if (!asset) return null

  const classNames = [
    "pp-scrapbook-asset",
    `pp-scrapbook-asset-${asset.category}`,
    asset.className,
    placement.className,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const accessibilityProps = decorative
    ? { "aria-hidden": "true" }
    : { role: "img", "aria-label": asset.name }

  const imageSrc = asset.src || asset.path

  if (imageSrc) {
    return (
      <img
        {...accessibilityProps}
        className={classNames}
        src={imageSrc}
        alt={decorative ? "" : asset.name}
        style={buildAssetStyle(asset, placement)}
        loading="lazy"
        draggable="false"
      />
    )
  }

  return (
    <span
      {...accessibilityProps}
      className={classNames}
      style={buildAssetStyle(asset, placement)}
      data-asset-id={asset.id}
      data-asset-category={asset.category}
    >
      {children || asset.symbol || ""}
    </span>
  )
}