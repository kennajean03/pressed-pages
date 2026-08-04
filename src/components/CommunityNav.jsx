const COMMUNITY_DESTINATIONS = [
  ["activityFeed", "Activity", "Updates from your circle"],
  ["findReaders", "Find Readers", "Meet bookish people"],
  ["communityChallenges", "Challenges", "Read toward something"],
  ["buddyReads", "Buddy Reads", "Share the journey"],
  ["messages", "Messages", "Private reader notes"],
  ["notifications", "Notes", "Follows and likes"],
]

export default function CommunityNav({ active, setStep }) {
  return (
    <nav className="community-nav-strip" aria-label="Community pages">
      <p>
        <strong>Community</strong>
      </p>
      <div>
        {COMMUNITY_DESTINATIONS.map(([step, label, detail]) => (
          <button
            type="button"
            key={step}
            className={active === step ? "active" : ""}
            aria-current={active === step ? "page" : undefined}
            onClick={() => setStep(step)}
          >
            <strong>{label}</strong>
            <small>{detail}</small>
          </button>
        ))}
      </div>
    </nav>
  )
}
