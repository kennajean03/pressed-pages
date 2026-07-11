export const scrapbookObjectTypes = {
  museumLabel: "museumLabel",
  mountedBook: "mountedBook",
  progressSheet: "progressSheet",
  journalPage: "journalPage",
  libraryTabs: "libraryTabs",
}

export const scrapbookObjectStates = {
  museumLabel: {
    quiet: "quiet",
    featured: "featured",
    archived: "archived",
  },

  mountedBook: {
    newlyPlaced: "newlyPlaced",
    active: "active",
    remembered: "remembered",
  },

  progressSheet: {
    blank: "blank",
    beginning: "beginning",
    middle: "middle",
    almostFinished: "almostFinished",
    completed: "completed",
  },

  journalPage: {
    blank: "blank",
    writing: "writing",
    collected: "collected",
    full: "full",
  },

  libraryTabs: {
    quiet: "quiet",
    active: "active",
    completed: "completed",
  },
}

export const scrapbookObjectRegistry = {
  [scrapbookObjectTypes.museumLabel]: {
    id: scrapbookObjectTypes.museumLabel,

    name: "Museum Label",

    purpose:
      "Introduce and describe the most important artifact on a scrapbook page.",

    semanticRole: "label",

    owns: [
      "title",
      "author",
      "format",
      "startedDate",
      "context",
    ],

    allowedAnchors: [
      "tape",
      "clip",
    ],

    prohibitedAnchors: [
      "flower",
      "bookmark",
      "texture",
      "fold",
    ],

    states: Object.values(
      scrapbookObjectStates.museumLabel
    ),

    defaultState:
      scrapbookObjectStates.museumLabel.featured,

    rules: {
      preserveNegativeSpace: true,

      heroTextOnly: true,

      maxAnchors: 1,

      avoidDecorativeClutter: true,
    },
  },

  [scrapbookObjectTypes.mountedBook]: {
    id: scrapbookObjectTypes.mountedBook,

    name: "Mounted Book",

    purpose:
      "Present the current book cover as the hero artifact of the scrapbook composition.",

    semanticRole: "heroArtifact",

    owns: [
      "cover",
      "coverAltText",
      "openDetailsAction",
    ],

    allowedAnchors: [
      "tape",
      "clip",
      "bookmark",
    ],

    prohibitedAnchors: [
      "texture",
      "handwriting",
      "fold",
    ],

    states: Object.values(
      scrapbookObjectStates.mountedBook
    ),

    defaultState:
      scrapbookObjectStates.mountedBook.active,

    rules: {
      heroPriority: true,

      coverMustRemainReadable: true,

      maxAnchors: 2,

      avoidDecorativeClutter: true,
    },
  },

  [scrapbookObjectTypes.progressSheet]: {
    id: scrapbookObjectTypes.progressSheet,

    name: "Progress Sheet",

    purpose:
      "Record the reader's movement through a book like a tracker kept inside its pages.",

    semanticRole: "tracker",

    owns: [
      "currentAmount",
      "totalAmount",
      "progressPercent",
      "progressLabel",
      "milestones",
    ],

    allowedAnchors: [
      "tape",
      "handwriting",
      "fold",
    ],

    prohibitedAnchors: [
      "flower",
      "clip",
      "bookmark",
      "ephemera",
      "texture",
    ],

    states: Object.values(
      scrapbookObjectStates.progressSheet
    ),

    defaultState:
      scrapbookObjectStates.progressSheet.beginning,

    rules: {
      preserveNegativeSpace: true,

      dataMustRemainReadable: true,

      progressMustRemainPrimary: true,

      maxAnchors: 1,

      avoidDecorativeClutter: true,
    },
  },

    [scrapbookObjectTypes.journalPage]: {
    id: scrapbookObjectTypes.journalPage,

    name: "Journal Page",

    purpose:
      "Preserve the reader's session details, notes, and memories from time spent with a book.",

    semanticRole: "memory",

    owns: [
      "sessionDate",
      "pagesRead",
      "minutesRead",
      "notes",
      "vibe",
      "photos",
      "quotes",
    ],

    allowedAnchors: [
      "tape",
      "flower",
      "clip",
      "handwriting",
      "bookmark",
      "fold",
    ],

    prohibitedAnchors: [
      "texture",
    ],

    states: Object.values(
      scrapbookObjectStates.journalPage
    ),

    defaultState:
      scrapbookObjectStates.journalPage.blank,

    rules: {
      preserveReaderVoice: true,

      emptyStateMustFeelIntentional: true,

      memoriesMustRemainPrimary: true,

      maxAnchors: 2,

      decorationsMustBeEarned: true,
    },
  },

    [scrapbookObjectTypes.libraryTabs]: {
    id: scrapbookObjectTypes.libraryTabs,

    name: "Library Tabs",

    purpose:
      "Attach the available actions for a book as clipped library tabs within the scrapbook composition.",

    semanticRole: "actions",

    owns: [
      "primaryAction",
      "secondaryAction",
      "supportingActions",
      "actionHierarchy",
    ],

    allowedAnchors: [
      "clip",
      "bookmark",
      "tape",
    ],

    prohibitedAnchors: [
      "flower",
      "texture",
      "handwriting",
      "fold",
      "ephemera",
    ],

    states: Object.values(
      scrapbookObjectStates.libraryTabs
    ),

    defaultState:
      scrapbookObjectStates.libraryTabs.active,

    rules: {
      actionsRemainSupporting: true,

      primaryActionMustRemainClear: true,

      destructiveActionsMustRemainDistinct: true,

      maxAnchors: 1,

      avoidDecorativeClutter: true,
    },
  },
}

export function getScrapbookObject(objectId) {
  return scrapbookObjectRegistry[objectId] || null
}

export function getScrapbookObjects() {
  return Object.values(scrapbookObjectRegistry)
}

export function isScrapbookObjectStateAllowed(
  objectId,
  state
) {
  const object = getScrapbookObject(objectId)

  if (!object || !state) return false

  return object.states.includes(state)
}

export function resolveScrapbookObjectState(
  objectId,
  requestedState
) {
  const object = getScrapbookObject(objectId)

  if (!object) return null

  if (
    requestedState &&
    object.states.includes(requestedState)
  ) {
    return requestedState
  }

  return object.defaultState
}

export function isScrapbookObjectAnchorAllowed(
  objectId,
  anchorType
) {
  const object = getScrapbookObject(objectId)

  if (!object || !anchorType) return false

  return object.allowedAnchors.includes(anchorType)
}