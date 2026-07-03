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
  scrapbookComposition,
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
      scrapbookComposition?.composition?.feeling &&
        `pp-dashboard-section--feeling-${scrapbookComposition.composition.feeling}`,
      scrapbookComposition?.composition?.paper?.variant &&
        `pp-dashboard-section--paper-${scrapbookComposition.composition.paper.variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    data-paper={scrapbookComposition?.composition?.paper?.variant}
    data-feeling={scrapbookComposition?.composition?.feeling}
  >
    {children}
  </PaperCard>
)
}

export default DashboardSection