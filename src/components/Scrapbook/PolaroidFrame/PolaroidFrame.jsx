import { usePolaroidComposition } from "../../../scrapbook/hooks"
import "./PolaroidFrame.css"

function PolaroidFrame({
  src,
  alt,
  caption,

  scrapbookId,

  rotate = "left",

  className = "",
}) {
const composition = usePolaroidComposition({
   objectType: "polaroid",
    variant: "polaroid",
    scrapbookId:
      scrapbookId ??
      caption ??
      src ??
      "polaroid",
  })

  return (
    <figure
      className={[
        "pp-polaroid",
        `pp-polaroid--${rotate}`,
        composition.classNames,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={composition.style}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="pp-polaroid__image"
        />
      ) : (
        <div className="pp-polaroid__placeholder">
          📖
        </div>
      )}

      {caption && (
        <figcaption className="pp-polaroid__caption">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default PolaroidFrame