import {
  useState,
} from "react"

import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import {
  getMemoryEditor,
} from "./memoryEditorRegistry"

import "./MemoryShelf.css"

const memoryShelfTape =
  resolveScrapbookMaterialRole(
    "tape",
    "subtle",
    "tape-masking-cream-01"
  )

const DEFAULT_MEMORY_TYPES = [
  {
    id: "photo",
    icon: "📸",
    label: "Reading Photo",
    description:
      "Preserve a photo from this reading session.",
  },
  {
    id: "favoriteQuote",
    icon: "💬",
    label: "Favorite Quote",
    description:
      "Save a line that mattered to you.",
  },
  {
    id: "flower",
    icon: "🌸",
    label: "Pressed Flower",
    description:
      "Preserve how this reading moment felt.",
  },
  {
    id: "mood",
    icon: "🏷️",
    label: "Reading Mood",
    description:
      "Remember how this session felt.",
    disabled: true,
  },
  {
    id: "place",
    icon: "📍",
    label: "Reading Place",
    description:
      "Remember where you spent time with this book.",
    disabled: true,
  },
  {
    id: "music",
    icon: "🎵",
    label: "Reading Music",
    description:
      "Preserve the soundtrack of this reading moment.",
    disabled: true,
  },
]

function MemoryShelf({
  memoryTypes = DEFAULT_MEMORY_TYPES,
  openMemoryId,
  onMemoryToggle,
  editorProps = {},
  memoryStatus = {},
  children,
  className = "",
}) {
  const [
    internalOpenMemoryId,
    setInternalOpenMemoryId,
  ] = useState(null)

  const isControlled =
    openMemoryId !== undefined

  const resolvedOpenMemoryId =
    isControlled
      ? openMemoryId
      : internalOpenMemoryId

  const ActiveEditor =
    resolvedOpenMemoryId
      ? getMemoryEditor(
          resolvedOpenMemoryId
        )
      : null

  const availableMemories =
  memoryTypes.filter(
    (memory) => !memory.disabled
  )

const preservedCount =
  availableMemories.filter(
    (memory) =>
      Boolean(
        memoryStatus[memory.id]
      )
  ).length

  const handleMemoryToggle = (
    memory
  ) => {
    if (memory.disabled) {
      return
    }

    const nextMemoryId =
      resolvedOpenMemoryId ===
      memory.id
        ? null
        : memory.id

    if (!isControlled) {
      setInternalOpenMemoryId(
        nextMemoryId
      )
    }

    onMemoryToggle?.(
      nextMemoryId,
      memory
    )
  }

  const renderEditor = () => {
    if (
      typeof children ===
      "function"
    ) {
      return children(
        resolvedOpenMemoryId
      )
    }

    if (children) {
      return children
    }

    if (ActiveEditor) {
      return (
        <ActiveEditor
          {...editorProps}
        />
      )
    }

    return null
  }

  const editorContent =
    resolvedOpenMemoryId
      ? renderEditor()
      : null

  const memoryShelfClassName = [
    "pp-memory-shelf",
    resolvedOpenMemoryId
      ? "pp-memory-shelf--open"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
  className={
    memoryShelfClassName
  }
  aria-labelledby="memory-shelf-title"
>
  <ScrapbookAsset
    asset={memoryShelfTape}
    className="pp-memory-shelf__tape"
    placement={{
      width:
        "clamp(104px, 15vw, 126px)",
      rotation: "-2deg",
      opacity: 0.9,
      shadow:
        "0 4px 8px rgba(60, 45, 38, 0.1)",
    }}
  />

  <div className="pp-memory-shelf__heading">
        <p className="pp-memory-shelf__eyebrow">
  Today's Keepsakes
</p>

<h3 id="memory-shelf-title">
  Preserve today's reading memories
</h3>

<p>
  Collect only the moments that made
  today's reading session worth
  remembering.
</p>

        <div
  className="pp-memory-shelf__progress"
  aria-live="polite"
>
  <strong>
    {preservedCount}{" "}
    {preservedCount === 1
      ? "keepsake"
      : "keepsakes"}{" "}
    preserved
  </strong>

  <span>
    {availableMemories.length} available
    this session
  </span>
</div>
      </div>

      

      <div
        className="pp-memory-shelf__choices"
        aria-label="Memory types"
      >
        {memoryTypes.map(
          (memory) => {
            const isOpen =
              resolvedOpenMemoryId ===
              memory.id
              const isPreserved =
  Boolean(
    memoryStatus[memory.id]
  )

            return (
              <button
                key={memory.id}
                type="button"
                className={[
                  "pp-memory-shelf__choice",

                  isOpen
                    ? "pp-memory-shelf__choice--active"
                    : "",

                  isPreserved
                    ? "pp-memory-shelf__choice--completed"
                    : "",

                  memory.disabled
                    ? "pp-memory-shelf__choice--disabled"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  handleMemoryToggle(
                    memory
                  )
                }
                disabled={
                  memory.disabled
                }
                aria-expanded={
                  memory.disabled
                    ? undefined
                    : isOpen
                }
              >
                <span
                  className="pp-memory-shelf__choice-icon"
                  aria-hidden="true"
                >
                  {memory.icon}
                </span>

                <span className="pp-memory-shelf__choice-copy">
                  <strong>
                    {memory.label}
                  </strong>

                  <small>
                    {
                      memory.description
                    }
                  </small>
                </span>

                {memory.disabled ? (
  <span className="pp-memory-shelf__coming-soon">
    Future Keepsake
  </span>
) : isPreserved ? (
  <span className="pp-memory-shelf__choice-status">
    <span aria-hidden="true">
      ✓
    </span>

    Preserved
  </span>
) : (
  <span
    className="pp-memory-shelf__choice-mark"
    aria-hidden="true"
  >
    {isOpen ? "−" : "+"}
  </span>
)}
              </button>
            )
          }
        )}
      </div>

      {resolvedOpenMemoryId &&
        editorContent && (
          <div
            className="pp-memory-shelf__editor"
            data-memory-editor={
              resolvedOpenMemoryId
            }
          >
            {editorContent}
          </div>
        )}
        <p className="pp-memory-shelf__footer">
  Everything you preserve here becomes part of
  your Book Journey.
</p>
    </section>
  )
}

export default MemoryShelf