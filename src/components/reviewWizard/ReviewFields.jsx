import { useId } from "react"
import { supabase } from "../../lib/supabase"

export function DateInput({ label, value, onChange }) {
  const inputId = useId()
  const dateValue = value ? value.slice(0, 10) : ""

  return (
    <div className="review-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="date"
        value={dateValue}
        onChange={(event) => {
          const nextValue = event.target.value
            ? new Date(`${event.target.value}T12:00:00`).toISOString()
            : ""

          onChange(nextValue)
        }}
      />
    </div>
  )
}

export function TextInput({ label, value, onChange }) {
  const inputId = useId()

  return (
    <div className="review-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export function ImageUpload({ label, value, onChange, user }) {
  const inputId = useId()

  async function handleImageUpload(event) {
    const file = event.target.files[0]
    if (!file || !user) return

    const fileExtension = file.name.split(".").pop()
    const fileName = `${user.id}/${Date.now()}.${fileExtension}`
    const { error } = await supabase.storage
      .from("book-covers")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      })

    if (error) {
      console.error("Book cover upload error:", error.message)
      return
    }

    const { data } = supabase.storage
      .from("book-covers")
      .getPublicUrl(fileName)

    onChange(data.publicUrl)
  }

  return (
    <div className="review-field">
      <label htmlFor={inputId}>{label}</label>
      {value && (
        <img
          src={value}
          alt={label}
          className="book-cover"
          loading="lazy"
          decoding="async"
        />
      )}
      <input id={inputId} type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  )
}

export function ScoreSlider({ label, question, value, onChange }) {
  return (
    <div className="slider-row">
      <div className="slider-label">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <p className="slider-question">{question}</p>
      <input
        type="range"
        min="0"
        max="5"
        step="0.5"
        value={value}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export function ReviewTextArea({
  label,
  value,
  placeholder,
  onChange,
  spoilerChecked,
  onSpoilerChange,
}) {
  const inputId = useId()

  return (
    <div className="review-field">
      <label htmlFor={inputId}>{label}</label>
      <textarea
        id={inputId}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {onSpoilerChange && (
        <label className="spoiler-checkbox-label">
          <input
            type="checkbox"
            checked={Boolean(spoilerChecked)}
            onChange={(event) => onSpoilerChange(event.target.checked)}
          />
          Contains spoilers
        </label>
      )}
    </div>
  )
}

export function SpoilerReviewSection({
  label,
  value,
  hasSpoiler,
  shouldHide,
  isRevealed,
  onToggleReveal,
}) {
  if (!value) {
    return (
      <p>
        <strong>{label}:</strong>
        <br />
      </p>
    )
  }

  if (shouldHide && !isRevealed) {
    return (
      <div className="spoiler-hidden-card">
        <p><strong>📖 {label}</strong></p>
        <p>This section contains spoilers.</p>
        <button type="button" onClick={onToggleReveal}>Reveal Spoiler</button>
      </div>
    )
  }

  return (
    <p className={hasSpoiler ? "spoiler-revealed-text" : ""}>
      <strong>{label}{hasSpoiler ? " ⚠️" : ""}:</strong>
      <br />
      {value}
      {shouldHide && isRevealed && (
        <>
          <br />
          <button
            type="button"
            className="spoiler-hide-button"
            onClick={onToggleReveal}
          >
            Hide Spoiler
          </button>
        </>
      )}
    </p>
  )
}
