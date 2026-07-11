import { useState } from "react"
import "./MemoryShelf.css"

const DEFAULT_MEMORY_TYPES = [
  {
    id: "photo",
    icon: "📸",
    label: "Reading Photo",
    description: "Preserve a photo from this reading session.",
  },
  {
    id: "favoriteQuote",
    icon: "💬",
    label: "Favorite Quote",
    description: "Save a line that mattered to you.",
  },
  {
    id: "mood",
    icon: "🏷️",
    label: "Reading Mood",
    description: "Remember how this session felt.",
    disabled: true,
  },
  {
    id: "place",
    icon: "📍",
    label: "Reading Place",
    description: "Remember where you spent time with this book.",
    disabled: true,
  },
  {
    id: "music",
    icon: "🎵",
    label: "Reading Music",
    description: "Preserve the soundtrack of this reading moment.",
    disabled: true,
  },
]

function MemoryShelf({
  memoryTypes = DEFAULT_MEMORY_TYPES,
  openMemoryId,
  onMemoryToggle,
  children,
  className = "",
}) {
  const [internalOpenMemoryId, setInternalOpenMemoryId] =
    useState(null)

  const isControlled =
    openMemoryId !== undefined

  const resolvedOpenMemoryId = isControlled
    ? openMemoryId
    : internalOpenMemoryId

  const handleMemoryToggle = (memory) => {
    if (memory.disabled) {
      return
    }

    const nextMemoryId =
      resolvedOpenMemoryId === memory.id
        ? null
        : memory.id

    if (!isControlled) {
      setInternalOpenMemoryId(nextMemoryId)
    }

    onMemoryToggle?.(nextMemoryId, memory)
  }

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
      className={memoryShelfClassName}
      aria-labelledby="memory-shelf-title"
    >
      <div className="pp-memory-shelf__heading">
        <p className="pp-memory-shelf__eyebrow">
          Optional keepsakes
        </p>

        <h3 id="memory-shelf-title">
          What would you like to keep from today?
        </h3>

        <p>
          Add only the moments you want Pressed Pages
          to preserve.
        </p>
      </div>

      <div
        className="pp-memory-shelf__choices"
        aria-label="Memory types"
      >
        {memoryTypes.map((memory) => {
          const isOpen =
            resolvedOpenMemoryId === memory.id

          return (
            <button
              key={memory.id}
              type="button"
              className={[
                "pp-memory-shelf__choice",
                isOpen
                  ? "pp-memory-shelf__choice--active"
                  : "",
                memory.disabled
                  ? "pp-memory-shelf__choice--disabled"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleMemoryToggle(memory)
              }
              disabled={memory.disabled}
              aria-expanded={
                memory.disabled ? undefined : isOpen
              }
            >
              <span
                className="pp-memory-shelf__choice-icon"
                aria-hidden="true"
              >
                {memory.icon}
              </span>

              <span className="pp-memory-shelf__choice-copy">
                <strong>{memory.label}</strong>
                <small>{memory.description}</small>
              </span>

              {memory.disabled ? (
                <span className="pp-memory-shelf__coming-soon">
                  Soon
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
        })}
      </div>

      {resolvedOpenMemoryId && children && (
        <div
          className="pp-memory-shelf__editor"
          data-memory-editor={resolvedOpenMemoryId}
        >
          {typeof children === "function"
            ? children(resolvedOpenMemoryId)
            : children}
        </div>
      )}
    </section>
  )
}

export default MemoryShelf