import "./LibraryTabs.css"

function LibraryTabs({
  primaryLabel,
  primaryIcon,
  onPrimary,

  secondaryLabel,
  secondaryIcon,
  onSecondary,

  supportingActions = [],

  state = "active",
  align = "left",
  className = "",
  ariaLabel = "Book actions",
}) {
  const libraryTabsClassName = [
    "pp-library-tabs",
    `pp-library-tabs--state-${state}`,
    `pp-library-tabs--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav
      className={libraryTabsClassName}
      data-library-tabs-state={state}
      aria-label={ariaLabel}
    >
      <div className="pp-library-tabs__primary-row">
        {primaryLabel && (
          <button
            type="button"
            className="pp-library-tabs__tab pp-library-tabs__tab--primary"
            onClick={onPrimary}
          >
            {primaryIcon && (
              <span
                className="pp-library-tabs__icon"
                aria-hidden="true"
              >
                {primaryIcon}
              </span>
            )}

            <span>{primaryLabel}</span>
          </button>
        )}

        {secondaryLabel && (
          <button
            type="button"
            className="pp-library-tabs__tab pp-library-tabs__tab--secondary"
            onClick={onSecondary}
          >
            {secondaryIcon && (
              <span
                className="pp-library-tabs__icon"
                aria-hidden="true"
              >
                {secondaryIcon}
              </span>
            )}

            <span>{secondaryLabel}</span>
          </button>
        )}
      </div>

      {supportingActions.length > 0 && (
        <div className="pp-library-tabs__supporting">
          {supportingActions.map((action) => (
            <button
              key={action.id || action.label}
              type="button"
              className={[
                "pp-library-tabs__supporting-action",
                action.tone === "danger" &&
                  "pp-library-tabs__supporting-action--danger",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default LibraryTabs