import "./NotebookTab.css"

function NotebookTab({
  children,
  icon,
  active = false,
  onClick,
  tone = "sage",
  className = "",
}) {
  const classes = [
    "pp-notebook-tab",
    `pp-notebook-tab--${tone}`,
    active ? "pp-notebook-tab--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
    >
      {icon && (
        <span
          className="pp-notebook-tab__icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span>{children}</span>
    </button>
  )
}

export default NotebookTab