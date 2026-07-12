import PressedFlower from "../../PressedFlower/PressedFlower"

const FLOWER_OPTIONS = [
  {
    id: "blossom",
    label: "Blossom",
  },
  {
    id: "daisy",
    label: "Daisy",
  },
  {
    id: "rose",
    label: "Rose",
  },
  {
    id: "sprig",
    label: "Sprig",
  },
]

function PressedFlowerEditor({
  item,
  readingLogFlowerInputs = {},
  setReadingLogFlowerInputs,
  readingLogFlowerLabelInputs = {},
  setReadingLogFlowerLabelInputs,
  readingLogFlowerDateInputs = {},
  setReadingLogFlowerDateInputs,
}) {
  if (!item) {
    return null
  }

  const selectedFlower =
    readingLogFlowerInputs[item.id] || ""

  const flowerLabel =
    readingLogFlowerLabelInputs[item.id] || ""

  const flowerDate =
    readingLogFlowerDateInputs[item.id] || ""

  const previewFlower =
    selectedFlower || "blossom"

  const previewLabel =
    flowerLabel || "A feeling worth keeping."

  const previewDate =
    flowerDate ||
    new Date().toLocaleDateString()

  return (
    <div className="reading-log-memory-editor">
      <p className="scrapbook-kicker">
        Pressed Flower
      </p>

      <h3>
        Preserve how this chapter felt
      </h3>

      <p>
        Choose a small botanical keepsake for the
        feeling you want to remember from this
        reading session.
      </p>

      <div className="reading-log-form-grid">
        <div className="review-field">
          <label htmlFor={`reading-flower-${item.id}`}>
            Flower
          </label>

          <select
            id={`reading-flower-${item.id}`}
            value={selectedFlower}
            onChange={(event) => {
              setReadingLogFlowerInputs?.({
                ...readingLogFlowerInputs,
                [item.id]: event.target.value,
              })
            }}
          >
            <option value="">
              No flower selected
            </option>

            {FLOWER_OPTIONS.map((flower) => (
              <option
                key={flower.id}
                value={flower.id}
              >
                {flower.label}
              </option>
            ))}
          </select>
        </div>

        <div className="review-field">
          <label htmlFor={`reading-flower-date-${item.id}`}>
            Memory Date
          </label>

          <input
            id={`reading-flower-date-${item.id}`}
            type="date"
            value={flowerDate}
            onChange={(event) => {
              setReadingLogFlowerDateInputs?.({
                ...readingLogFlowerDateInputs,
                [item.id]: event.target.value,
              })
            }}
          />
        </div>
      </div>

      <div className="review-field">
        <label htmlFor={`reading-flower-label-${item.id}`}>
          Memory Note (optional)
        </label>

        <input
          id={`reading-flower-label-${item.id}`}
          type="text"
          value={flowerLabel}
          placeholder="A feeling worth keeping."
          onChange={(event) => {
            setReadingLogFlowerLabelInputs?.({
              ...readingLogFlowerLabelInputs,
              [item.id]: event.target.value,
            })
          }}
        />
      </div>

      <div className="reading-flower-preview">
        <PressedFlower
          variant={previewFlower}
          label={previewLabel}
          date={previewDate}
          attachment="tape"
          rotation={-2}
          size="medium"
        />
      </div>
    </div>
  )
}

export default PressedFlowerEditor