export default function PageNavigation({
  title,
  onBack,
  onHome,
}) {
  return (
    <div className="page-navigation">
      <button
        className="page-nav-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="page-navigation-title">
        {title}
      </div>

      <button
        className="page-nav-button"
        onClick={onHome}
      >
        🏠 Home
      </button>
    </div>
  )
}