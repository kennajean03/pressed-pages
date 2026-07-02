export function pickFromCollection(collection = [], seed = 0, fallback = null) {
  if (!Array.isArray(collection) || !collection.length) {
    return fallback
  }

  const safeIndex = Math.abs(seed) % collection.length

  return collection[safeIndex] ?? fallback
}