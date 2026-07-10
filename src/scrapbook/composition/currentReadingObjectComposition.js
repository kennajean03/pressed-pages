import {
  scrapbookObjectStates,
  scrapbookObjectTypes,
} from "../objects/scrapbookObjectRegistry"

export const currentReadingObjectComposition = {
  id: "current-reading-object-composition",

  story:
    "A living scrapbook page that grows as the reader spends time with the current book.",

  archetype: "activeReadingJournal",

  objects: [
    {
      id: "current-reading-story-label",
      type: scrapbookObjectTypes.museumLabel,
      role: "storyLabel",
      state: scrapbookObjectStates.museumLabel.quiet,
      order: 1,
      required: true,
    },

   {
  id: "current-reading-mounted-book",
  type: scrapbookObjectTypes.mountedBook,
  role: "heroBook",
  state: scrapbookObjectStates.mountedBook.active,
  order: 2,
  required: true,

  presentation: {
    hero: true,
    emphasis: "primary",
    placement: "center",
    scale: "large",
    density: "comfortable",
  },
},

    {
      id: "current-reading-progress-sheet",
      type: scrapbookObjectTypes.progressSheet,
      role: "readingProgress",
      state: scrapbookObjectStates.progressSheet.beginning,
      order: 3,
      required: true,
    },

    {
      id: "current-reading-journal-page",
      type: scrapbookObjectTypes.journalPage,
      role: "latestMemory",
      state: scrapbookObjectStates.journalPage.blank,
      order: 4,
      required: true,
    },

    {
      id: "current-reading-library-tabs",
      type: scrapbookObjectTypes.libraryTabs,
      role: "readingActions",
      state: scrapbookObjectStates.libraryTabs.active,
      order: 5,
      required: true,
    },
  ],

  relationships: [
    {
      from: "current-reading-story-label",
      to: "current-reading-mounted-book",
      type: "introduces",
    },

    {
      from: "current-reading-progress-sheet",
      to: "current-reading-mounted-book",
      type: "tracks",
    },

    {
      from: "current-reading-journal-page",
      to: "current-reading-mounted-book",
      type: "remembers",
    },

    {
      from: "current-reading-library-tabs",
      to: "current-reading-mounted-book",
      type: "actsOn",
    },
  ],

  layout: {
    readingOrder: [
      "current-reading-story-label",
      "current-reading-mounted-book",
      "current-reading-progress-sheet",
      "current-reading-journal-page",
      "current-reading-library-tabs",
    ],

    preserveNegativeSpace: true,

    heroObject: "current-reading-mounted-book",

    supportingObjects: [
      "current-reading-story-label",
      "current-reading-progress-sheet",
      "current-reading-journal-page",
      "current-reading-library-tabs",
    ],
  },

  rules: {
    coverRemainsHero: true,

    actionsRemainSupporting: true,

    memoriesGrowWithReaderActivity: true,

    decorationsMustBeEarned: true,

    objectsFirstDecorationsSecond: true,
  },
}

export function getCurrentReadingCompositionObject(objectId) {
  return (
    currentReadingObjectComposition.objects.find(
      (objectDefinition) => objectDefinition.id === objectId
    ) || null
  )
}

export function getCurrentReadingCompositionObjects() {
  return [...currentReadingObjectComposition.objects].sort(
    (firstObject, secondObject) =>
      firstObject.order - secondObject.order
  )
}

export function getCurrentReadingCompositionObjectsByRole(role) {
  return getCurrentReadingCompositionObjects().filter(
    (objectDefinition) => objectDefinition.role === role
  )
}