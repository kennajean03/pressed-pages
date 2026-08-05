export const LIBRARY_VIEW_STORAGE_KEY = "pressedPagesLibraryView"
export const LIBRARY_VIEW_OPTIONS = ["grid", "shelf"]

export function normalizeLibraryView(value) {
  return LIBRARY_VIEW_OPTIONS.includes(value) ? value : "grid"
}
