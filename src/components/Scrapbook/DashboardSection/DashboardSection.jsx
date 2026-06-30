import PaperCard from "../PaperCard/PaperCard"
import "./DashboardSection.css"

function DashboardSection({
  as = "section",
  title,
  tapeVariant = "sage",
  variant = "journal",
  flower,
  className = "",
  children,
}) {
  return (
    <PaperCard
      as={as}
      variant={variant}
      tape={title}
      tapeVariant={tapeVariant}
      flower={flower}
      className={["pp-dashboard-section", className].filter(Boolean).join(" ")}
    >
      {children}
    </PaperCard>
  )
}

export default DashboardSection