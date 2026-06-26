import BuddyReadBookCard from "./BuddyReadBookCard"
import { getReaderInitial, getReaderName } from "./BuddyReadUtils"

export default function BuddyReadStepReview({ draft, profile, user }) {
  const creatorName = profile?.displayName || user?.email?.split("@")[0] || "You"
  const crew = [{ userId: "creator", displayName: creatorName, isCreator: true }, ...draft.invitedReaders]

  return (
    <div className="buddy-read-journal-page buddy-read-review-page">
      <p className="buddy-reads-kicker">Page 4 of 4</p>
      <h2>Your Adventure</h2>
      <p>Check the details, then begin your Buddy Read.</p>

      <div className="buddy-read-review-card">
        <div className="buddy-read-review-header">
          <p className="buddy-reads-kicker">Adventure title</p>
          <h3>{draft.name || "Untitled Buddy Read"}</h3>
        </div>

        {draft.selectedBook && (
          <div className="buddy-read-review-section">
            <strong>Book</strong>
            <BuddyReadBookCard book={draft.selectedBook} selected compact />
          </div>
        )}

        <div className="buddy-read-review-section">
          <strong>Reading Crew</strong>
          <div className="buddy-read-review-crew-list">
            {crew.map((reader) => {
              const name = reader.isCreator ? creatorName : getReaderName(reader)
              const avatarUrl = reader.avatarUrl

              return (
                <div className="buddy-read-crew-pill" key={reader.userId}>
                  <span className="buddy-read-reader-avatar small">
                    {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>{reader.isCreator ? "Y" : getReaderInitial(reader)}</span>}
                  </span>
                  <span>
                    <strong>{name}</strong>
                    {reader.isCreator && <small>You</small>}
                    {!reader.isCreator && reader.username && <small>@{reader.username}</small>}
                  </span>
                </div>
              )
            })}
          </div>

          {!draft.invitedReaders.length && (
            <p className="buddy-read-muted-note">Solo for now — invite readers later.</p>
          )}
        </div>
      </div>
    </div>
  )
}
