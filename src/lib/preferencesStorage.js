export function loadJsonPreference({
  storage,
  key,
  fallback,
  validate = () => true,
  onError,
} = {}) {
  if (!storage || !key) return fallback

  try {
    const saved = storage.getItem(key)
    if (!saved) return fallback

    const parsed = JSON.parse(saved)
    return validate(parsed) ? parsed : fallback
  } catch (error) {
    onError?.(error)
    return fallback
  }
}

export function saveJsonPreference({
  storage,
  key,
  value,
  onError,
} = {}) {
  if (!storage || !key) {
    const error = new Error("Browser preference storage is unavailable.")
    onError?.(error)
    return { ok: false, error }
  }

  try {
    storage.setItem(key, JSON.stringify(value))
    return { ok: true, error: null }
  } catch (error) {
    onError?.(error)
    return { ok: false, error }
  }
}
