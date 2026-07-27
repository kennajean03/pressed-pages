import { createContext, useContext } from "react"

export const ScrapbookContext = createContext(null)

export function useScrapbookContext() {
  const context = useContext(ScrapbookContext)

  if (!context) {
    throw new Error(
      "useScrapbook must be used inside ScrapbookProvider"
    )
  }

  return context
}
