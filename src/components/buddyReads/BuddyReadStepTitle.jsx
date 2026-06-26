export default function BuddyReadStepTitle({ draft, updateDraft }) {
  return (
    <div className="buddy-read-journal-page">
      <p className="buddy-reads-kicker">Page 1 of 4</p>
      <h2>Title Your Adventure</h2>
      <p>Give your Buddy Read a name. Cozy, dramatic, chaotic — whatever fits the book.</p>

      <label>
        Buddy Read Name
        <input
          value={draft.name}
          onChange={(event) => updateDraft("name", event.target.value)}
          placeholder="Fourth Wing Summer Read"
        />
      </label>
    </div>
  )
}
