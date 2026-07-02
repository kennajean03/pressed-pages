import { createContext, useContext, useMemo } from "react"

import {
  getClipMaterial,
  getFlowerMaterial,
  getPaperMaterial,
  getStickerMaterial,
  getTapeMaterial,
  getTextureMaterial,
} from "../materials"

import { getScrapbookTheme } from "../themes"
import { getScrapbookDensity } from "../engine"

const ScrapbookContext = createContext(null)

export function ScrapbookProvider({
  children,
  theme = "classic",
  density = "balanced",
}) {
  const value = useMemo(() => {
    const activeTheme = getScrapbookTheme(theme)
    const activeDensity = getScrapbookDensity(density)

    const materials = {
      paper: getPaperMaterial(activeTheme.paper),
      tape: getTapeMaterial(activeTheme.tape),
      flower: getFlowerMaterial(activeTheme.flower),
      clip: getClipMaterial(activeTheme.clip),
      texture: getTextureMaterial(activeTheme.texture),
      sticker: getStickerMaterial(activeTheme.sticker),
    }

    return {
      theme: activeTheme,
      density: activeDensity,
      materials,
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