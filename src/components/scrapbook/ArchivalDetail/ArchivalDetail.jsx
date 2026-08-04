function ArchivalDetail({
  folio,
  label,
  note,
  mark = "◇",
  tone = "linen",
  className = "",
}) {
  return (
    <aside
      className={`pp-archival-detail pp-archival-detail--${tone} ${className}`.trim()}
      aria-label={`${label}, folio ${folio}`}
    >
      <span className="pp-archival-detail__mark" aria-hidden="true">{mark}</span>
      <span className="pp-archival-detail__catalog">
        <span className="pp-archival-detail__folio">Folio {folio}</span>
        <span className="pp-archival-detail__label">{label}</span>
      </span>
      {note && <span className="pp-archival-detail__note">{note}</span>}
    </aside>
  )
}

export default ArchivalDetail
