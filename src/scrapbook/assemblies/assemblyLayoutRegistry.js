import quoteStackRecipe from "./quoteStack"
import polaroidStackRecipe from "./polaroidStack"
import flowerBundleRecipe from "./flowerBundle"

import defaultAssemblyRecipe from "./assemblyRecipeDefaults"

const assemblyLayoutRegistry = {
  quoteStack: quoteStackRecipe,
  polaroidStack: polaroidStackRecipe,
  flowerBundle: flowerBundleRecipe,
}

export function hasAssemblyLayoutRecipe(
  recipeName
) {
  return Boolean(
    recipeName &&
      assemblyLayoutRegistry[
        recipeName
      ]
  )
}

export function getAssemblyLayoutRecipe(
  recipeName,
  {
    fallback = true,
    warn = true,
  } = {}
) {
  if (!recipeName) {
    return fallback
      ? defaultAssemblyRecipe
      : null
  }

  const recipe =
    assemblyLayoutRegistry[
      recipeName
    ]

  if (recipe) {
    return recipe
  }

  if (
    warn &&
    import.meta.env.DEV
  ) {
    console.warn(
      `[Pressed Pages] Unknown scrapbook assembly recipe: "${recipeName}". Falling back to the default assembly recipe.`
    )
  }

  return fallback
    ? defaultAssemblyRecipe
    : null
}

export default assemblyLayoutRegistry