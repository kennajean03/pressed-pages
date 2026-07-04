export const paperIntentMap = {
  freshReadable: ["cream"],

  softCozy: ["cream", "aged"],

  warmMemory: ["aged"],

  archivalStory: ["aged", "linen"],

  libraryArchive: ["linen"],

  freshBotanical: ["cream"],

  heirloomKeepsake: ["aged"],
}

export function resolvePaperFromIntent(intent) {
  return paperIntentMap[intent] || ["cream"]
}