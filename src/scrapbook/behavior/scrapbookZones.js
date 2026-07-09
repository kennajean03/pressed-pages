const defaultZone = {
  top: null,
  right: null,
  bottom: null,
  left: null,
}

function px(value) {
  return `${value}px`
}

function hashString(value = "") {
  return [...String(value)].reduce(
    (hash, character) => hash + character.charCodeAt(0),
    0
  )
}

function pickFromRange(range, seed = "") {
  if (!Array.isArray(range)) return range

  const [min, max] = range
  const hash = hashString(seed)
  const percentage = (hash % 100) / 100
  const value = Math.round(min + (max - min) * percentage)

  return px(value)
}

function resolveZoneValue(value, seed) {
  return Array.isArray(value) ? pickFromRange(value, seed) : value
}

const zones = {
  "top-left": {
    top: [-10, -4],
    left: [14, 26],
  },

  "top-right": {
    top: [-10, -4],
    right: [14, 26],
  },

  "top-center": {
    top: [-10, -6],
    left: "50%",
    centerX: true,
  },

  "bottom-right": {
    right: [14, 26],
    bottom: [8, 18],
  },

  "bottom-left": {
    left: [14, 26],
    bottom: [8, 18],
  },

  "bottom-center": {
    left: "50%",
    bottom: [10, 18],
    centerX: true,
  },

  "behind-cover": {
    left: [28, 42],
    top: [36, 52],
  },

  "inside-cover": {
    left: [108, 126],
    top: [14, 28],
  },

  "near-title": {
    right: [22, 34],
    top: [34, 50],
  },

  "lower-margin": {
    right: [26, 38],
    bottom: [20, 32],
  },

  "over-cover-top": {
    top: [-14, -8],
    left: "50%",
    centerX: true,
  },

  "over-cover-top-left": {
    top: [-14, -8],
    left: [18, 32],
  },

  "over-cover-top-right": {
    top: [-14, -8],
    right: [18, 32],
  },

  "near-writing": {
    right: [18, 32],
    bottom: [18, 34],
  },
}

export function getScrapbookZone(placement, seed = "") {
  const zone = zones[placement] || defaultZone

  return {
    ...zone,
    top: resolveZoneValue(zone.top, `${seed}-${placement}-top`),
    right: resolveZoneValue(zone.right, `${seed}-${placement}-right`),
    bottom: resolveZoneValue(zone.bottom, `${seed}-${placement}-bottom`),
    left: resolveZoneValue(zone.left, `${seed}-${placement}-left`),
  }
}

export default getScrapbookZone