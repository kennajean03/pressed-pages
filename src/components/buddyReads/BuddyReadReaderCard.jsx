import { getReaderInitial, getReaderName } from "./BuddyReadUtils"

export default function BuddyReadReaderCard({ reader, selected = false, onToggle }) {
  if (!reader) return null

  const readerName = getReaderName(reader)

  return (
    <button
      type="button"
      className={`buddy-read-reader-card ${selected ? "selected" : ""}`}
      onClick={onToggle}
    >
      <span className="buddy-read-reader-avatar">
        {reader.avatarUrl ? <img src={reader.avatarUrl} alt="" /> : <span>{getReaderInitial(reader)}</span>}
      </span>

      <span className="buddy-read-reader-info">
        <strong>{readerName}</strong>
        {reader.username && <small>@{reader.username}</small>}
        <em>Public reader you follow</em>
      </span>

      <span className="buddy-read-reader-action">{selected ? "Invited" : "Invite"}</span>
    </button>
  )
}
