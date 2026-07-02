import PaperCard from "../PaperCard/PaperCard"

import { useSectionComposition } from "../../../scrapbook/hooks"

import "./DashboardSection.css"

function DashboardSection({
  as = "section",

  scrapbookId,

  title,

  tapeVariant = "sage",

  variant = "journal",

  flower,

  className = "",

  children,
}) {
  const composition = useSectionComposition({
    variant,
  })

  return (
    <PaperCard
      as={as}
      objectType="section"
      scrapbookId={scrapbookId ?? title}
      variant={variant}
      tape={title}
      tapeVariant={tapeVariant}
      flower={flower}
      className={[
        "pp-dashboard-section",
        composition.classNames,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </PaperCard>
  )
}

export default DashboardSection