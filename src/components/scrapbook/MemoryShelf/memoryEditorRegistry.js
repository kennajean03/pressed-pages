import FavoriteQuoteEditor from "./editors/FavoriteQuoteEditor"
import PressedFlowerEditor from "./editors/PressedFlowerEditor"
import ReadingPhotoEditor from "./editors/ReadingPhotoEditor"

const memoryEditorRegistry = {
  photo: {
    id: "photo",
    component: ReadingPhotoEditor,
  },

  favoriteQuote: {
    id: "favoriteQuote",
    component: FavoriteQuoteEditor,
  },

  flower: {
    id: "flower",
    component: PressedFlowerEditor,
  },
}

function getMemoryEditorDefinition(
  memoryId
) {
  return (
    memoryEditorRegistry[
      memoryId
    ] || null
  )
}

function getMemoryEditor(
  memoryId
) {
  return (
    getMemoryEditorDefinition(
      memoryId
    )?.component ||
    null
  )
}

function memoryEditorExists(
  memoryId
) {
  return Boolean(
    getMemoryEditorDefinition(
      memoryId
    )
  )
}

export {
  getMemoryEditor,
  getMemoryEditorDefinition,
  memoryEditorExists,
  memoryEditorRegistry,
}