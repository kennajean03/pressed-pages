function BuddyReadsPage({ setStep }) {
  return (
    <section>
      <p>Buddy Reads</p>
      <h1>Reading Adventures</h1>
      <p>
        Read together with friends, cheer each other on, and turn shared books into
        little scrapbook memories.
      </p>

      <div className="buddy-reads-hero">
        <div className="buddy-reads-hero-icon" aria-hidden="true">📖</div>
        <p className="buddy-reads-kicker">Buddy Reads</p>
        <h2>Reading is better together.</h2>
        <p>
          Start a shared reading journey with friends and watch everyone&apos;s progress
          in one cozy place.
        </p>
        <div className="buddy-reads-actions">
          <button type="button" onClick={() => setStep("createBuddyRead")}>+ Start a Buddy Read</button>
          <button type="button" disabled title="Coming soon">
            Browse Public Buddy Reads · Coming Soon
          </button>
        </div>
      </div>

      <div className="buddy-reads-grid">
        <div className="buddy-reads-section-card">
          <span aria-hidden="true">📚</span>
          <p className="buddy-reads-kicker">Current Journeys</p>
          <h2>Reading Adventures</h2>
          <p>No active Buddy Reads yet.</p>
          <p>Once you start reading together, your shared books will appear here.</p>
        </div>

        <div className="buddy-reads-section-card">
          <span aria-hidden="true">💌</span>
          <p className="buddy-reads-kicker">Friend Invites</p>
          <h2>Invitations</h2>
          <p>No invitations waiting.</p>
          <p>When friends invite you to read together, they&apos;ll show up here.</p>
        </div>

        <div className="buddy-reads-section-card">
          <span aria-hidden="true">🏆</span>
          <p className="buddy-reads-kicker">Finished Together</p>
          <h2>Completed Adventures</h2>
          <p>Your finished Buddy Reads will become part of your reading scrapbook.</p>
          <p>Celebrate the books you and your friends finished side by side.</p>
        </div>
      </div>

      <div className="score-card buddy-reads-coming-soon-card">
        <p>Coming next in 12B.2</p>
        <h2>Create Buddy Read</h2>
        <p>
          Choose a book, invite readers you follow, set an optional start date,
          and open your first shared reading adventure.
        </p>
      </div>
    </section>
  )
}

export default BuddyReadsPage
