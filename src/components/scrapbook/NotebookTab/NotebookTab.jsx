import { useNotebookTabComposition } from "../../../scrapbook/hooks"

import "./NotebookTab.css"

function NotebookTab({
  children,
  icon,
  active = false,
  onClick,
  tone = "sage",
  scrapbookId,
  className = "",
}) {
  const composition = useNotebookTabComposition({
    active,
    scrapbookId:
      scrapbookId ??
      (typeof children === "string" ? children : tone),
  })

  const classes = [
    "pp-notebook-tab",
    `pp-notebook-tab--${tone}`,
    active ? "pp-notebook-tab--active" : "",
    composition.classNames,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      style={{
        "--pp-composed-rotation": composition.rotation,
        "--pp-composed-offset-x": composition.offsetX,
        "--pp-composed-offset-y": composition.offsetY,
      }}
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