import ReaderCard from "./ReaderCard"
import CommunityNav from "./CommunityNav"
import BotanicalAccent from "./scrapbook/BotanicalAccent/BotanicalAccent"
import DashboardSection from "./scrapbook/DashboardSection/DashboardSection"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"
import {
  EMPTY_READER_DISCOVERY_FILTERS,
  READER_DISCOVERY_OPTIONS,
  READER_DISCOVERY_PAGE_SIZE,
  getDiscoveryPageCount,
} from "../domain/community/readerDiscovery"

export default function FindReadersPage({
  user,
  readerSearch,
  setReaderSearch,
  readerSearchResults,
  readerSearchLoading,
  readerSearchMessage,
  readerDiscoveryFilters,
  setReaderDiscoveryFilters,
  readerDiscoveryPage,
  readerDiscoveryTotal,
  readerDiscoveryStatus,
  searchReaders,
  openReaderProfile,
  setStep,
}) {
  const hasSearch = readerSearch.trim().length > 0 || Object.values(readerDiscoveryFilters).some(Boolean)
  const hasResults = readerSearchResults.length > 0
  const pageCount = getDiscoveryPageCount(readerDiscoveryTotal)

  function updateFilter(key, value) {
    setReaderDiscoveryFilters((current) => ({ ...current, [key]: value }))
  }

  function submitSearch(event) {
    event.preventDefault()
    searchReaders({ searchTerm: readerSearch, filters: readerDiscoveryFilters, page: 1 })
  }

  function clearSearch() {
    setReaderSearch("")
    setReaderDiscoveryFilters(EMPTY_READER_DISCOVERY_FILTERS)
    searchReaders({ searchTerm: "", filters: EMPTY_READER_DISCOVERY_FILTERS, page: 1 })
  }

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
            <form className="reader-discovery-search-layout" onSubmit={submitSearch}>
              <label>
                <span>Search by reader name or username</span>
                <input
                  type="text"
                  value={readerSearch}
                  onChange={(event) => setReaderSearch(event.target.value)}
                  placeholder="Try a display name, @username, or bookish friend..."
                />
              </label>

              <div className="reader-discovery-filters" aria-label="Reader taste filters">
                {[
                  ["genre", "Genre", READER_DISCOVERY_OPTIONS.genres],
                  ["format", "Format", READER_DISCOVERY_OPTIONS.formats],
                  ["vibe", "Vibe", READER_DISCOVERY_OPTIONS.vibes],
                  ["readingStyle", "Reading style", READER_DISCOVERY_OPTIONS.readingStyles],
                ].map(([key, label, options]) => (
                  <label key={key}>
                    <span>{label}</span>
                    <select value={readerDiscoveryFilters[key]} onChange={(event) => updateFilter(key, event.target.value)}>
                      <option value="">All {label.toLowerCase()}s</option>
                      {options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </label>
                ))}
              </div>

              <div className="reader-discovery-search-actions">
                <button type="submit" className="paper-button" disabled={readerSearchLoading}>Find readers</button>
                <button type="button" className="paper-button paper-button--quiet" onClick={clearSearch}>Clear clues</button>
              </div>

              <div className="reader-discovery-search-note">
                <Sticker icon="▧" tone="sage">Reader postcards</Sticker>
                <Sticker icon="❀" tone="rose">Public profiles only</Sticker>
                <Sticker icon="◇" tone="gold">Find your people</Sticker>
              </div>
            </form>
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
            <PaperCard variant="wide" className="reader-discovery-message paper-card sticky-note" role="status" aria-live="polite">
              <p>Searching the public reader cards…</p>
            </PaperCard>
          )}

          {readerSearchMessage && (
            <PaperCard variant="wide" className="reader-discovery-message paper-card sticky-note">
              <p>{readerSearchMessage}</p>
            </PaperCard>
          )}

          {readerDiscoveryStatus === "ready" && hasResults && (
            <p className="reader-discovery-result-count" role="status">
              Showing {(readerDiscoveryPage - 1) * READER_DISCOVERY_PAGE_SIZE + 1}–{Math.min(readerDiscoveryPage * READER_DISCOVERY_PAGE_SIZE, readerDiscoveryTotal)} of {readerDiscoveryTotal} opted-in reader postcards.
            </p>
          )}

          <SectionDivider
            label={hasSearch ? "Search Results" : "Reader Postcards"}
            icon={hasSearch ? "⌕" : "▧"}
          />

          {!readerSearchLoading && !hasResults && (
            <PaperCard variant="journal" className="reader-discovery-empty paper-card sticky-note">
              <span aria-hidden="true">◇</span>
              <h2>No reader postcards yet.</h2>
              <p>
                Search by name, browse all opted-in postcards, or loosen one of
                the public taste filters to meet a wider reading circle.
              </p>
            </PaperCard>
          )}

          {hasResults && (
            <>
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
              {pageCount > 1 && (
                <nav className="reader-discovery-pagination" aria-label="Reader result pages">
                  <button type="button" disabled={readerDiscoveryPage <= 1 || readerSearchLoading} onClick={() => searchReaders({ page: readerDiscoveryPage - 1 })}>Previous</button>
                  <span>Page {readerDiscoveryPage} of {pageCount}</span>
                  <button type="button" disabled={readerDiscoveryPage >= pageCount || readerSearchLoading} onClick={() => searchReaders({ page: readerDiscoveryPage + 1 })}>Next</button>
                </nav>
              )}
            </>
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
