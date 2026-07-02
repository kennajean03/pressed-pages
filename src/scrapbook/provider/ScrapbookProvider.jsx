import { createContext, useContext, useMemo } from "react"

import {
  getClipMaterial,
  getFlowerMaterial,
  getPaperMaterial,
  getStickerMaterial,
  getTapeMaterial,
  getTextureMaterial,
} from "../materials"

import { getScrapbookDensity } from "../engine"
import { getScrapbookTheme } from "../themes"

function pickThemeMaterial(theme, collectionName, fallback) {
  const collection = theme?.collections?.[collectionName]

  if (Array.isArray(collection) && collection.length) {
    return collection[0]
  }

  return fallback
}

const ScrapbookContext = createContext(null)

export function ScrapbookProvider({
  children,
  theme = "classic",
  density = "balanced",
}) {
  const value = useMemo(() => {
    const activeTheme = getScrapbookTheme(theme)
    const activeDensity = getScrapbookDensity(density)

    const fallbackMaterialIds = {
      paper: pickThemeMaterial(activeTheme, "papers", activeTheme.paper),
      tape: pickThemeMaterial(activeTheme, "tapes", activeTheme.tape),
      flower: pickThemeMaterial(activeTheme, "flowers", activeTheme.flower),
      clip: pickThemeMaterial(activeTheme, "clips", activeTheme.clip),
      texture: pickThemeMaterial(activeTheme, "textures", activeTheme.texture),
      sticker: pickThemeMaterial(activeTheme, "stickers", activeTheme.sticker),
    }

    const fallbackMaterials = {
      paper: getPaperMaterial(fallbackMaterialIds.paper),
      tape: getTapeMaterial(fallbackMaterialIds.tape),
      flower: getFlowerMaterial(fallbackMaterialIds.flower),
      clip: getClipMaterial(fallbackMaterialIds.clip),
      texture: getTextureMaterial(fallbackMaterialIds.texture),
      sticker: getStickerMaterial(fallbackMaterialIds.sticker),
    }

    return {
      theme: activeTheme,
      density: activeDensity,
      fallbackMaterialIds,
      fallbackMaterials,
      materials: fallbackMaterials,
    }
  }, [theme, density])

  return (
    <ScrapbookContext.Provider value={value}>
      {children}
    </ScrapbookContext.Provider>
  )
}

export function useScrapbook() {
  const context = useContext(ScrapbookContext)

  if (!context) {
    throw new Error("useScrapbook must be used inside ScrapbookProvider")
  }

  return context
}