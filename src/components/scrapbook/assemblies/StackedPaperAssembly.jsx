import "./StackedPaperAssembly.css"

function StackedPaperAssembly({
  children,
  clip = "paperclip",
  className = "",
}) {
  const items =
    Array.isArray(children)
      ? children.filter(Boolean)
      : [children].filter(Boolean)

  return (
    <div
      className={[
        "stacked-paper-assembly",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {clip !== "none" && (
        <span
          className={`stacked-paper-assembly__clip stacked-paper-assembly__clip--${clip}`}
          aria-hidden="true"
        />
      )}

      {items.map(
        (child, index) => (
          <div
            key={index}
            className="stacked-paper-assembly__layer"
            style={{
              "--stack-index": index,
            }}
          >
            {child}
          </div>
        )
      )}
    </div>
  )
}

export default StackedPaperAssembly