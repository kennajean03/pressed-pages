export const READER_DISCOVERY_PAGE_SIZE = 12

export const READER_DISCOVERY_OPTIONS = {
  genres: [
    "Romance", "Fantasy", "Literary Fiction", "Mystery", "Thriller",
    "Historical Fiction", "Science Fiction", "Nonfiction",
  ],
  formats: ["Paperback", "Hardcover", "Ebook", "Audiobook", "Kindle Unlimited"],
  vibes: ["Cozy", "Emotional", "Dark", "Whimsical", "Reflective", "Adventurous", "Spicy", "Comforting"],
  readingStyles: [
    "Mood reader", "Series binger", "Slow reader", "Fast reader",
    "Night reader", "Audiobook-first", "Review writer", "Social reader",
  ],
}

export const EMPTY_READER_DISCOVERY_PROFILE = {
  isDiscoverable: false,
  genres: [],
  formats: [],
  vibes: [],
  readingStyles: [],
}

export const EMPTY_READER_DISCOVERY_FILTERS = {
  genre: "",
  format: "",
  vibe: "",
  readingStyle: "",
}

export function normalizeDiscoveryValues(values, allowedValues) {
  const allowed = new Set(allowedValues)
  return [...new Set((Array.isArray(values) ? values : []).filter((value) => allowed.has(value)))].slice(0, 8)
}

export function normalizeReaderDiscoveryProfile(value = {}) {
  return {
    isDiscoverable: Boolean(value.isDiscoverable ?? value.is_discoverable),
    genres: normalizeDiscoveryValues(value.genres, READER_DISCOVERY_OPTIONS.genres),
    formats: normalizeDiscoveryValues(value.formats, READER_DISCOVERY_OPTIONS.formats),
    vibes: normalizeDiscoveryValues(value.vibes, READER_DISCOVERY_OPTIONS.vibes),
    readingStyles: normalizeDiscoveryValues(
      value.readingStyles ?? value.reading_styles,
      READER_DISCOVERY_OPTIONS.readingStyles
    ),
  }
}

export function getReaderDiscoveryReasons(reader, filters = EMPTY_READER_DISCOVERY_FILTERS) {
  const discovery = normalizeReaderDiscoveryProfile(reader?.discoveryData || {})
  const requested = [
    [filters.genre, discovery.genres],
    [filters.format, discovery.formats],
    [filters.vibe, discovery.vibes],
    [filters.readingStyle, discovery.readingStyles],
  ]
    .filter(([value, values]) => value && values.includes(value))
    .map(([value]) => value)

  if (requested.length) return requested.map((value) => `Shared public taste: ${value}`)

  return [
    discovery.genres[0] ? `Reads ${discovery.genres[0]}` : "",
    discovery.vibes[0] ? `${discovery.vibes[0]} reading vibe` : "",
    discovery.readingStyles[0] || "",
  ].filter(Boolean).slice(0, 3)
}

export function getDiscoveryPageCount(total, pageSize = READER_DISCOVERY_PAGE_SIZE) {
  return Math.max(1, Math.ceil(Math.max(0, Number(total) || 0) / pageSize))
}
