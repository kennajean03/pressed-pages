import {
  scrapbookRecipes,
  resolveScrapbookRecipe,
} from "./scrapbookRecipes"

function uniqueAnchors(anchors = []) {
  return [...new Set(anchors)].slice(0, 3)
}

function mergeAvoidRules(...recipes) {
  return [
    ...new Set(
      recipes
        .flatMap((recipe) => recipe?.rules?.avoid || [])
        .filter(Boolean)
    ),
  ]
}

function normalizeDensity(density) {
  switch (density) {
    case "light":
      return "whisper"

    case "medium":
      return "journal"

    case "rich":
      return "keepsake"

    default:
      return density
  }
}

function resolveDensity(...recipes) {
  const densityOrder = [
    "whisper",
    "journal",
    "keepsake",
    "heirloom",
  ]

  return recipes.reduce((strongest, recipe) => {
    const density = normalizeDensity(recipe?.layout?.density)

    if (!density) return strongest

    return densityOrder.indexOf(density) >
      densityOrder.indexOf(strongest)
      ? density
      : strongest
  }, "whisper")
}

function resolveFirstValue(key, ...recipes) {
  return recipes.find((recipe) => recipe?.[key])?.[key]
}

export function resolveScrapbookComposition({
  readingState,
  genre,
  season,
  occasion,
} = {}) {
  const primaryRecipe = resolveScrapbookRecipe({
    readingState,
    genre,
    season,
    occasion,
  })

  const stateRecipe =
    readingState === "finished"
      ? scrapbookRecipes.finishedBook
      : readingState === "currentlyReading"
        ? scrapbookRecipes.currentlyReading
        : null

  const seasonalRecipe =
    season === "spring" ? scrapbookRecipes.springJournal : null

  const recipes = [primaryRecipe, stateRecipe, seasonalRecipe].filter(Boolean)

  return {
    id: recipes.map((recipe) => recipe.id).join("+"),
    feeling: primaryRecipe.feeling,
    story: primaryRecipe.story,

    paper: primaryRecipe.paper,
    paperRole: resolveFirstValue("paperRole", ...recipes),
    scrapRole: resolveFirstValue("scrapRole", ...recipes),
    notebookRole: resolveFirstValue("notebookRole", ...recipes),
    attachmentRole: resolveFirstValue("attachmentRole", ...recipes),
    botanicalRole: resolveFirstValue("botanicalRole", ...recipes),
    cardRole: resolveFirstValue("cardRole", ...recipes),
    bookmarkRole: resolveFirstValue("bookmarkRole", ...recipes),
    stampRole: resolveFirstValue("stampRole", ...recipes),
    patinaRole: resolveFirstValue("patinaRole", ...recipes),

    paperIntent: resolveFirstValue("paperIntent", ...recipes),
    specialtyPaper: resolveFirstValue("specialtyPaper", ...recipes),
    compositionMood: resolveFirstValue("compositionMood", ...recipes),
    compositionRules: resolveFirstValue("compositionRules", ...recipes),
    

    aging: primaryRecipe.aging,

    anchors: uniqueAnchors(
      recipes.flatMap((recipe) => recipe.anchors || [])
    ),

    layout: {
      cover: primaryRecipe.layout?.cover || "slightlyRaised",
      overlap: primaryRecipe.layout?.overlap || "gentle",
      density: resolveDensity(...recipes),
    },

    rules: {
      maxPrimaryAnchors: 3,
      avoid: mergeAvoidRules(...recipes),
      preserveReaderVoice: recipes.some(
        (recipe) => recipe?.rules?.preserveReaderVoice
      ),
    },

    recipes,
  }
}