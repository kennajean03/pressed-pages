export const compositionMoods = {
  hopeful: {
    paperWeight: "light",
    shadow: "soft",
    layering: "minimal",
    warmth: "fresh",
  },

  nostalgic: {
    paperWeight: "medium",
    shadow: "warm",
    layering: "collected",
    warmth: "golden",
  },

  cozy: {
    paperWeight: "medium",
    shadow: "soft",
    layering: "gentle",
    warmth: "cozy",
  },

  mysterious: {
    paperWeight: "heavy",
    shadow: "deep",
    layering: "layered",
    warmth: "aged",
  },

  archival: {
    paperWeight: "medium",
    shadow: "crisp",
    layering: "structured",
    warmth: "neutral",
  },

  fresh: {
    paperWeight: "light",
    shadow: "light",
    layering: "airy",
    warmth: "morning",
  },

  heirloom: {
    paperWeight: "heavy",
    shadow: "soft",
    layering: "rich",
    warmth: "memory",
  },
}

export function getCompositionMood(id = "hopeful") {
  return compositionMoods[id] || compositionMoods.hopeful
}