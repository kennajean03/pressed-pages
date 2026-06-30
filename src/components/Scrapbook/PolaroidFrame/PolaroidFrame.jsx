import "./PolaroidFrame.css"

function PolaroidFrame({
  src,
  alt,
  caption,
  rotate = "left",
  className = "",
}) {
  return (
    <figure
      className={[
        "pp-polaroid",
        `pp-polaroid--${rotate}`,
        className,
      ].join(" ")}
    >
      {src ? (
        <img src={src} alt={alt} className="pp-polaroid__image" />
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