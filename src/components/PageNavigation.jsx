export default function PageNavigation({
  title,
  onBack,
  onHome,
  bookJourney = false,
}) {
  return (
    <nav
      className={[
        "page-navigation",
        bookJourney
          ? "page-navigation--book-journey"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Page navigation"
    >
      <button
        type="button"
        className="page-nav-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <span className="page-navigation-title">
        {title}
      </span>

      <button
        type="button"
        className="page-nav-button"
        onClick={onHome}
      >
        Home
      </button>
    </nav>
  )
}
