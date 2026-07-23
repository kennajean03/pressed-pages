import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import "./ScrapbookPhoto.css"

const scrapbookPhotoPaperclip =
  resolveScrapbookMaterialRole(
    "metal",
    "paperclip",
    "metal-paperclip-antique-gold-01"
  )


const VALID_SIZES = ["small", "medium", "large", "hero"]

function ScrapbookPhoto({
  src = "",
  alt = "",
  caption = "",
  date = "",
  location = "",
  clip = "paperclip",
  rotation = 0,
  size = "medium",
  className = "",
}) {
  const resolvedSize = VALID_SIZES.includes(size) ? size : "medium"

  const resolvedRotation = Number.isFinite(Number(rotation))
    ? Number(rotation)
    : 0

  const hasPhoto = Boolean(src)
  const hasDetails = Boolean(caption || date || location)

  const scrapbookPhotoClasses = [
    "scrapbook-photo",
    `scrapbook-photo--${resolvedSize}`,
    clip !== "none"
      ? `scrapbook-photo--clip-${clip}`
      : "",
    !hasPhoto ? "scrapbook-photo--empty" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <figure
      className={scrapbookPhotoClasses}
      style={{
        "--scrapbook-photo-rotation": `${resolvedRotation}deg`,
      }}
      data-scrapbook-artifact="photo"
      data-scrapbook-photo-attachment={clip}
    >
     {clip === "paperclip" ? (
  <ScrapbookAsset
    asset={scrapbookPhotoPaperclip}
    className="scrapbook-photo__clip scrapbook-photo__clip-asset--paperclip"
    placement={{
      width:
        "clamp(44px, 6vw, 54px)",
      rotation: "8deg",
      shadow:
        "1px 3px 4px rgba(54, 43, 32, 0.16)",
    }}
  />
) : clip !== "none" ? (
  <span
    className={[
      "scrapbook-photo__clip",
      `scrapbook-photo__clip--${clip}`,
    ].join(" ")}
    aria-hidden="true"
  />
) : null}

      <div className="scrapbook-photo__paper">
        <div className="scrapbook-photo__image-window">
          {hasPhoto ? (
            <img
              src={src}
              alt={alt}
              className="scrapbook-photo__image"
              loading="lazy"
            />
          ) : (
            <div
              className="scrapbook-photo__placeholder"
              role="img"
              aria-label={alt || "Empty scrapbook photo"}
            >
              <span
                className="scrapbook-photo__placeholder-icon"
                aria-hidden="true"
              >
                ◇
              </span>

              <span className="scrapbook-photo__placeholder-text">
                Memory waiting to be added
              </span>
            </div>
          )}
        </div>

        {hasDetails && (
          <figcaption className="scrapbook-photo__details">
            {caption && (
              <p className="scrapbook-photo__caption">
                {caption}
              </p>
            )}

            {(date || location) && (
              <div className="scrapbook-photo__metadata">
                {location && (
                  <span className="scrapbook-photo__location">
                    <span aria-hidden="true">⌖</span>
                    {location}
                  </span>
                )}

                {date && (
                  <time className="scrapbook-photo__date">
                    {date}
                  </time>
                )}
              </div>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

export default ScrapbookPhoto