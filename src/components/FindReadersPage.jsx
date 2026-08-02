import ReaderCard from "./ReaderCard"
import CommunityNav from "./CommunityNav"
import BotanicalAccent from "./scrapbook/BotanicalAccent/BotanicalAccent"
import DashboardSection from "./scrapbook/DashboardSection/DashboardSection"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

export default function FindReadersPage({
  user,
  readerSearch,
  setReaderSearch,
  readerSearchResults,
  readerSearchLoading,
  readerSearchMessage,
  searchReaders,
  openReaderProfile,
  setStep,
}) {
  const hasSearch = readerSearch.trim().length > 0
  const hasResults = readerSearchResults.length > 0

  return (
    <section className="reader-discovery-page scrapbook-page scrapbook-section">
      <ScrapbookPanel
  as="header"
  recipe="readerDiscovery.hero"
  className="reader-discovery-hero"
>
        <div>
          <p className="scrapbook-kicker">Reader Discovery</p>
          <h1>Find your next bookish friend.</h1>
          <p>
            Search public reader profiles, discover cozy reading personalities,
            and collect the kind of friends who understand one more chapter.
          </p>
        </div>
        <BotanicalAccent className="reader-discovery-accent" />
      </ScrapbookPanel>

      <CommunityNav active="findReaders" setStep={setStep} />

      {!user && (
        <PaperCard variant="journal" className="reader-discovery-empty paper-card sticky-note">
          <p>Log in to search for readers and build your Pressed Pages community.</p>
        </PaperCard>
      )}

      {user && (
        <>
          <DashboardSection
            as="section"
            title="Search Readers"
            tapeVariant="rose"
            variant="notebook"
            flower="sprig"
            className="reader-discovery-search-card"
          >
            <div className="reader-discovery-search-layout">
              <label>
                <span>Search by reader name or username</span>
                <input
                  type="text"
                  value={readerSearch}
                  onChange={(event) => {
                    setReaderSearch(event.target.value)
                    searchReaders(event.target.value)
                  }}
                  placeholder="Try a display name, @username, or bookish friend..."
                />
              </label>

              <div className="reader-discovery-search-note">
                <Sticker icon="📬" tone="sage">Reader Mail energy</Sticker>
                <Sticker icon="🌸" tone="rose">Public profiles only</Sticker>
                <Sticker icon="📚" tone="gold">Find your people</Sticker>
              </div>
            </div>
          </DashboardSection>

          <div className="reader-discovery-guide" aria-label="Reader discovery guide">
            <PaperCard variant="wide">
              <p className="scrapbook-kicker">A good first clue</p>
              <h2>Look for reading overlap</h2>
              <p>
                Reader postcards surface public genres, reader types, current
                books, yearly totals, streaks, and average ratings when those
                details are available.
              </p>
            </PaperCard>
            <PaperCard variant="wide">
              <p className="scrapbook-kicker">No mystery algorithm</p>
              <h2>You choose your circle</h2>
              <p>
                Pressed Pages does not calculate a private compatibility score
                or match readers automatically. Open a profile and decide what
                feels bookishly promising.
              </p>
            </PaperCard>
          </div>

          {readerSearchLoading && (
            <PaperCard variant="wide" className="reader-discovery-message paper-card sticky-note">
              <p>Searching the shelves for matching readers...</p>
            </PaperCard>
          )}

          {readerSearchMessage && (
            <PaperCard variant="wide" className="reader-discovery-message paper-card sticky-note">
              <p>{readerSearchMessage}</p>
            </PaperCard>
          )}

          <SectionDivider
            label={hasSearch ? "Search Results" : "Reader Postcards"}
            icon={hasSearch ? "🔎" : "📬"}
          />

          {!readerSearchLoading && !hasResults && (
            <PaperCard variant="journal" className="reader-discovery-empty paper-card sticky-note">
              <span aria-hidden="true">🌼</span>
              <h2>No reader postcards yet.</h2>
              <p>
                Try another name or username. Your next favorite reading buddy
                might just be waiting under a different search.
              </p>
            </PaperCard>
          )}

          {hasResults && (
            <div className="reader-discovery-grid reader-card-list">
              {readerSearchResults.map((reader) => (
                <ReaderCard
                  key={reader.userId}
                  reader={reader}
                  stats={reader.statsData}
                  compact
                  discovery
                  actionLabel="View Profile"
                  onAction={() => openReaderProfile(reader.username)}
                />
              ))}
            </div>
          )}

          <div className="reader-discovery-footer-actions">
            <button type="button" className="paper-button paper-button--quiet" onClick={() => setStep("activityFeed")}>
              Back to Activity Feed
            </button>
          </div>
        </>
      )}
    </section>
  )
}
