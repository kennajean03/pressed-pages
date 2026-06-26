import BuddyReadReaderCard from "./BuddyReadReaderCard"

export default function BuddyReadStepReaders({
  crewSearch,
  setCrewSearch,
  followingLoading,
  followingReaders,
  filteredReaders,
  draft,
  toggleReader,
}) {
  return (
    <div className="buddy-read-journal-page">
      <p className="buddy-reads-kicker">Page 3 of 4</p>
      <h2>Choose Your Reading Crew</h2>
      <p>Invite public readers you follow. We&apos;ll wire real invitations in the next backend phase.</p>

      <label className="buddy-read-search-label">
        Search readers you follow
        <input
          value={crewSearch}
          onChange={(event) => setCrewSearch(event.target.value)}
          placeholder="Search by name or username..."
        />
      </label>

      {followingLoading && <p>Loading your reading crew...</p>}

      {!followingLoading && followingReaders.length === 0 && (
        <div className="score-card">
          <p>No public followed readers yet.</p>
          <p>Follow readers from Find Readers, then come back to invite them.</p>
        </div>
      )}

      {!followingLoading && followingReaders.length > 0 && filteredReaders.length === 0 && (
        <div className="score-card">
          <p>No readers match that search.</p>
        </div>
      )}

      <div className="buddy-read-reader-list compact-list">
        {filteredReaders.map((reader) => {
          const isSelected = draft.invitedReaders.some((item) => item.userId === reader.userId)

          return (
            <BuddyReadReaderCard
              key={reader.userId}
              reader={reader}
              selected={isSelected}
              onToggle={() => toggleReader(reader)}
            />
          )
        })}
      </div>

      {draft.invitedReaders.length > 0 && (
        <p className="buddy-read-selected-count">
          Selected: {draft.invitedReaders.length} reader{draft.invitedReaders.length === 1 ? "" : "s"}
        </p>
      )}
    </div>
  )
}
