import LibraryBookCard from "./LibraryBookCard"
import PaperCard from "./Scrapbook/PaperCard/PaperCard"
import StatCard from "./Scrapbook/StatCard/StatCard"
import NotebookTab from "./Scrapbook/NotebookTab/NotebookTab"
import SectionDivider from "./Scrapbook/SectionDivider/SectionDivider"


function LibraryPage({
  setLibraryFilter,
  librarySearch,
  setLibrarySearch,
  libraryRatingFilter,
  setLibraryRatingFilter,
  librarySpiceFilter,
  setLibrarySpiceFilter,
  libraryFinishedYearFilter,
  setLibraryFinishedYearFilter,
  libraryFinishedYears,
  libraryFinishedMonthFilter,
  setLibraryFinishedMonthFilter,
  libraryTropeFilter,
  setLibraryTropeFilter,
  libraryTropeOptions,
  filteredReviews,
  savedReviews,
  resetLibraryFilters,
  isLibraryLoading,
  openSavedReview,
  formatDate,
  getProgressPercent,
  finishBook,
  getDaysToRead,
  editReview,
  deleteReview,
  setStep,
}) {
  const readingCount = savedReviews.filter((item) => {
    const status = item?.bookInfo?.status
    return status === "Reading" || status === "TBR"
  }).length

  const finishedCount = savedReviews.filter(
    (item) => item?.bookInfo?.status === "Finished"
  ).length

  const favoriteCount = savedReviews.filter((item) => item?.isFavorite).length

  const shelfTabs = [
    { label: "All Books", icon: "📚", value: "all" },
    { label: "Reading", icon: "📖", value: "reading" },
    { label: "Finished", icon: "✅", value: "finished" },
    { label: "DNF", icon: "🚫", value: "dnf" },
    { label: "Brain Chemistry", icon: "🧠", value: "favorites" },
  ]

  return (
    <section className="library-scrapbook-page scrapbook-page scrapbook-section">
      <PaperCard
        as="header"
        variant="deckled"
        tape="Your Library"
        flower="sprig"
        className="library-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">The Bookshelf</p>
        <h1>Your Personal Library</h1>
        <p>
          Every story you have collected, pressed between the pages and sorted
          into your own cozy reading archive.
        </p>
      </PaperCard>

      <div className="library-scrapbook-grid">
        <PaperCard
          as="aside"
          variant="notebook"
          tape="Shelf Tools"
          className="library-filter-journal paper-card paper-card--notebook"
        >
          <div className="library-shelf-tabs library-notebook-tabs">
  {shelfTabs.map((tab) => (
    <NotebookTab
      key={tab.value}
      icon={tab.icon}
tone={
        tab.value === "finished"
          ? "gold"
          : tab.value === "dnf"
            ? "rose"
            : tab.value === "reading"
              ? "sage"
              : "linen"
      }
      onClick={() => setLibraryFilter(tab.value)}
    >
      {tab.label}
    </NotebookTab>
  ))}
</div>

          <div className="library-filter-fields">
            <label>
              Search Title or Author
              <input
                type="text"
                value={librarySearch}
                onChange={(event) => setLibrarySearch(event.target.value)}
                placeholder="Search your shelves..."
              />
            </label>

            <label>
              Rating
              <select
                value={libraryRatingFilter}
                onChange={(event) => setLibraryRatingFilter(event.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </label>

            <label>
              Spice
              <select
                value={librarySpiceFilter}
                onChange={(event) => setLibrarySpiceFilter(event.target.value)}
              >
                <option value="all">All Spice Levels</option>
                <option value="5">🌶️ 5</option>
                <option value="4">🌶️ 4+</option>
                <option value="3">🌶️ 3+</option>
                <option value="2">🌶️ 2+</option>
                <option value="1">🌶️ 1+</option>
              </select>
            </label>

            <label>
              Finished Year
              <select
                value={libraryFinishedYearFilter}
                onChange={(event) => setLibraryFinishedYearFilter(event.target.value)}
              >
                <option value="all">All Years</option>
                {libraryFinishedYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Finished Month
              <select
                value={libraryFinishedMonthFilter}
                onChange={(event) => setLibraryFinishedMonthFilter(event.target.value)}
              >
                <option value="all">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </label>

            <label>
              Trope
              <select
                value={libraryTropeFilter}
                onChange={(event) => setLibraryTropeFilter(event.target.value)}
              >
                <option value="all">All Tropes</option>
                {libraryTropeOptions.map((trope) => (
                  <option key={trope} value={trope}>
                    {trope}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="library-filter-count">
            Showing <strong>{filteredReviews.length}</strong> of{" "}
            <strong>{savedReviews.length}</strong> books
          </p>

          <button type="button" className="paper-button" onClick={resetLibraryFilters}>
            Reset Filters
          </button>
        </PaperCard>

        <div className="library-main-stack">
          <div className="library-stat-strip">
            <StatCard icon="📚" value={savedReviews.length} label="Total books" />
            <StatCard icon="📖" value={readingCount} label="Reading now" />
            <StatCard icon="✅" value={finishedCount} label="Finished" />
            <StatCard icon="🧠" value={favoriteCount} label="Brain Chemistry" />
          </div>

          {isLibraryLoading && savedReviews.length === 0 && (
            <PaperCard className="library-empty-card paper-card sticky-note">
              <p>Loading your library...</p>
            </PaperCard>
          )}

          {!isLibraryLoading && filteredReviews.length === 0 && (
            <PaperCard className="library-empty-card paper-card sticky-note">
              <p>No books found for these filters.</p>
              <button type="button" className="paper-button" onClick={resetLibraryFilters}>
                Reset Filters
              </button>
            </PaperCard>
          )}

          <SectionDivider label="Your Shelves" icon="📚" />

          <div className="library-results-grid library-bookshelf-grid">
            {filteredReviews.map((item) => (
              <LibraryBookCard
                key={item.id}
                item={item}
                openSavedReview={openSavedReview}
                editReview={editReview}
                deleteReview={deleteReview}
                finishBook={finishBook}
                formatDate={formatDate}
                getProgressPercent={getProgressPercent}
                getDaysToRead={getDaysToRead}
              />
            ))}
          </div>
        </div>
      </div>

      <button type="button" onClick={() => setStep("home")}>Back Home</button>
    </section>
  )
}

export default LibraryPage