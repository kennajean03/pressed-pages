import { useMemo, useState } from "react"
import LibraryBookCard from "./LibraryBookCard"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import StatCard from "./scrapbook/StatCard/StatCard"
import NotebookTab from "./scrapbook/NotebookTab/NotebookTab"
import { useResolvedComposition } from "../scrapbook/hooks"
import {
  getMaybeNextReviews,
  getNextFiveReviews,
} from "../domain/reviews/nextFive"


function LibraryPage({
  libraryFilter,
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
  startReading,
  updateNextFive,
  moveNextFive,
  moveNextFiveToPosition,
  finishBook,
  getDaysToRead,
  editReview,
  deleteReview,
  setStep,
}) {
  const PAGE_SIZE = 12
  const [tbrShelfView, setTbrShelfView] = useState("all")
  const [tbrSort, setTbrSort] = useState("priority")
  const [paginationState, setPaginationState] = useState({
    key: "",
    page: 1,
  })
  const [draggedNextFiveId, setDraggedNextFiveId] = useState("")
  const [nextFiveMessage, setNextFiveMessage] = useState("")
  const libraryReviews = Array.isArray(savedReviews) ? savedReviews : []
  const visibleReviews = useMemo(
    () => Array.isArray(filteredReviews) ? filteredReviews : [],
    [filteredReviews]
  )
  const finishedYearOptions = Array.isArray(libraryFinishedYears) ? libraryFinishedYears : []
  const tropeOptions = Array.isArray(libraryTropeOptions) ? libraryTropeOptions : []

  const readingCount = libraryReviews.filter((item) => {
    return item?.bookInfo?.status === "Reading"
  }).length

  const tbrCount = libraryReviews.filter(
    (item) => item?.bookInfo?.status === "TBR"
  ).length

  const finishedCount = libraryReviews.filter(
    (item) => item?.bookInfo?.status === "Finished"
  ).length

  const favoriteCount = libraryReviews.filter((item) => item?.isFavorite).length
  const shelfTotal = {
    all: libraryReviews.length,
    reading: readingCount,
    tbr: tbrCount,
    finished: finishedCount,
    dnf: libraryReviews.filter((item) => item?.bookInfo?.status === "DNF").length,
    favorites: favoriteCount,
  }[libraryFilter] ?? libraryReviews.length

  const nextFiveReviews = getNextFiveReviews(libraryReviews)

  const nextFiveIds = new Set(
    nextFiveReviews.map((item) => item.id)
  )
  const maybeNextReviews = getMaybeNextReviews(libraryReviews)

  async function dropNextFiveBook(targetPosition) {
    if (!draggedNextFiveId) return

    const draggedReview = nextFiveReviews.find(
      (item) => item.id === draggedNextFiveId
    )

    setDraggedNextFiveId("")

    if (!draggedReview) return

    await moveNextFiveToPosition(
      draggedReview,
      targetPosition
    )
    setNextFiveMessage(
      `${draggedReview.bookInfo?.title || "Book"} moved to position ${targetPosition}.`
    )
  }

  async function addMaybeNext(reviewItem) {
    await updateNextFive(reviewItem, true)
    setNextFiveMessage(
      `${reviewItem.bookInfo?.title || "Book"} added to Your Next 5.`
    )
  }

  const displayedReviews = useMemo(() => {
    if (libraryFilter !== "tbr") {
      return visibleReviews
    }

    const tbrReviews = visibleReviews.filter((item) => {
      const isShortlisted =
        Number(item?.bookInfo?.nextFiveRank) > 0

      if (tbrShelfView === "next-five") return isShortlisted
      if (tbrShelfView === "waiting") return !isShortlisted
      return true
    })

    return [...tbrReviews].sort((first, second) => {
      const firstBook = first?.bookInfo || {}
      const secondBook = second?.bookInfo || {}
      const firstRank = Number(firstBook.nextFiveRank) || Infinity
      const secondRank = Number(secondBook.nextFiveRank) || Infinity

      if (tbrSort === "priority") {
        if (firstRank !== secondRank) {
          return firstRank - secondRank
        }
      }

      if (tbrSort === "title") {
        return String(firstBook.title || "").localeCompare(
          String(secondBook.title || "")
        )
      }

      if (tbrSort === "author") {
        return String(firstBook.author || "").localeCompare(
          String(secondBook.author || "")
        )
      }

      if (tbrSort === "shortest") {
        const firstPages = Number(firstBook.totalPages) || Infinity
        const secondPages = Number(secondBook.totalPages) || Infinity

        if (firstPages !== secondPages) {
          return firstPages - secondPages
        }
      }

      const firstSavedAt = new Date(
        first.createdAt || first.updatedAt || 0
      ).getTime()
      const secondSavedAt = new Date(
        second.createdAt || second.updatedAt || 0
      ).getTime()

      return secondSavedAt - firstSavedAt
    })
  }, [
    libraryFilter,
    tbrShelfView,
    tbrSort,
    visibleReviews,
  ])
  const paginationKey = [
    libraryFilter,
    librarySearch,
    libraryRatingFilter,
    librarySpiceFilter,
    libraryFinishedYearFilter,
    libraryFinishedMonthFilter,
    libraryTropeFilter,
    tbrShelfView,
    tbrSort,
  ].join("|")
  const pageCount = Math.max(1, Math.ceil(displayedReviews.length / PAGE_SIZE))
  const libraryPage =
    paginationState.key === paginationKey
      ? Math.min(paginationState.page, pageCount)
      : 1
  const paginatedReviews = displayedReviews.slice(
    (libraryPage - 1) * PAGE_SIZE,
    libraryPage * PAGE_SIZE
  )
  const pageStart =
    displayedReviews.length === 0 ? 0 : (libraryPage - 1) * PAGE_SIZE + 1
  const pageEnd = Math.min(libraryPage * PAGE_SIZE, displayedReviews.length)

  const supportsReviewFilters = [
    "all",
    "finished",
    "favorites",
  ].includes(libraryFilter)

  const shelfToolCopy = {
    reading: "Search the books currently in progress.",
    tbr: "Search the books waiting on your TBR shelf.",
    dnf: "Search the books you chose to set down.",
  }[libraryFilter]

  const hasActiveShelfFilters =
    Boolean(librarySearch.trim()) ||
    (libraryFilter === "tbr" && tbrShelfView !== "all") ||
    (
      supportsReviewFilters &&
      (
        libraryRatingFilter !== "all" ||
        librarySpiceFilter !== "all" ||
        libraryFinishedYearFilter !== "all" ||
        libraryFinishedMonthFilter !== "all" ||
        libraryTropeFilter !== "all"
      )
    )

  const emptyShelfStates = {
    all: {
      icon: "▥",
      kicker: "Your archive is ready",
      title: "No books saved yet.",
      copy: "Add your first book and begin building a library that remembers every reading season.",
      actionLabel: "Add Your First Book",
      action: () => setStep("addBook"),
    },
    reading: {
      icon: "◫",
      kicker: "Your active shelf is quiet",
      title: "Nothing is currently in progress.",
      copy: "Choose a new story when you are ready to begin another reading journey.",
      actionLabel: "Add a Current Read",
      action: () => setStep("addBook"),
    },
    tbr: {
      icon: "🔖",
      kicker: "Your waiting shelf is ready",
      title: "No books saved to TBR yet.",
      copy: "Add a book for later and it will wait here until you are ready to move it into Currently Reading.",
      actionLabel: "Add a TBR Book",
      action: () => setStep("addBook"),
    },
    finished: {
      icon: "✓",
      kicker: "A shelf for completed stories",
      title: "No finished books recorded yet.",
      copy: "Add an already-read book or complete a current read to begin filling this shelf.",
      actionLabel: "Add a Finished Book",
      action: () => setStep("addBook"),
    },
    dnf: {
      icon: "🚫",
      kicker: "No abandoned chapters here",
      title: "No DNF books recorded.",
      copy: "Books you choose to set down will be preserved here without judgment.",
      actionLabel: "Add a Book",
      action: () => setStep("addBook"),
    },
    favorites: {
      icon: "◇",
      kicker: "The unforgettable shelf",
      title: "No Brain Chemistry books yet.",
      copy: "Mark a saved review as a Brain Chemistry Book when a story permanently changes the wiring.",
      actionLabel: "Browse All Books",
      action: () => setLibraryFilter("all"),
    },
  }

  const emptyShelfState =
    emptyShelfStates[libraryFilter] ||
    emptyShelfStates.all

  function clearShelfFilters() {
    setLibrarySearch("")
    setLibraryRatingFilter("all")
    setLibrarySpiceFilter("all")
    setLibraryFinishedYearFilter("all")
    setLibraryFinishedMonthFilter("all")
    setLibraryTropeFilter("all")
    setTbrShelfView("all")
    setTbrSort("priority")
  }

  function resetAllShelfFilters() {
    clearShelfFilters()
    resetLibraryFilters()
  }

  const shelfTabs = [
    { label: "All Books", icon: "▥", value: "all" },
    { label: "Reading", icon: "◫", value: "reading" },
    { label: "TBR", icon: "▱", value: "tbr" },
    { label: "Finished", icon: "✓", value: "finished" },
    { label: "DNF", icon: "⊘", value: "dnf" },
    { label: "Brain Chemistry", icon: "◇", value: "favorites" },
  ]

  const libraryPageComposition = useResolvedComposition({
  scrapbookId: "library-page",
  objectType: "page",
  occasion: "library",
})

const libraryShelfComposition = useResolvedComposition({
  scrapbookId: "library-shelf",
  objectType: "section",
  occasion: "library",
})

const libraryFiltersComposition = useResolvedComposition({
  scrapbookId: "library-filters",
  objectType: "section",
})

  return (
    <section
      className={[
        "library-scrapbook-page",
        "scrapbook-page",
        "scrapbook-section",
        `library-scrapbook-page--${libraryFilter}`,
      ].join(" ")}
    >
      <PaperCard
        as="header"
        variant="deckled"
        tape="Your Library"
        flower="sprig"
        scrapbookComposition={libraryPageComposition}
        className="library-hero paper-card paper-card--deckled"
      >
        <p className="scrapbook-kicker">
          {libraryFilter === "tbr" ? "The Waiting Shelf" : "The Bookshelf"}
        </p>
        <h1>{libraryFilter === "tbr" ? "To Be Read" : "Your Library"}</h1>
        <p>
          {libraryFilter === "tbr"
            ? "A field guide to the stories waiting for their season — with five held closest for whatever comes next."
            : "Every story you have collected, pressed between the pages and sorted into your own cozy reading archive."}
        </p>
      </PaperCard>

      <div className="library-scrapbook-grid">
        <PaperCard
          as="aside"
          variant="notebook"
          tape="Shelf Tools"
          scrapbookComposition={libraryFiltersComposition}
          className="library-filter-journal paper-card paper-card--notebook"
        >
          <div className="library-shelf-tabs library-notebook-tabs">
  {shelfTabs.map((tab) => (
    <NotebookTab
      key={tab.value}
      icon={tab.icon}
      active={libraryFilter === tab.value}
tone={
        tab.value === "finished"
          ? "gold"
          : tab.value === "dnf"
            ? "rose"
            : tab.value === "reading" || tab.value === "tbr"
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
            {shelfToolCopy && (
              <p className="library-filter-fields__note">
                {shelfToolCopy}
              </p>
            )}

            <label>
              Search Title or Author
              <input
                type="text"
                value={librarySearch}
                onChange={(event) => setLibrarySearch(event.target.value)}
                placeholder="Search your shelves..."
              />
            </label>

            {supportsReviewFilters && (
              <>
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
                    {finishedYearOptions.map((year) => (
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
                    {tropeOptions.map((trope) => (
                      <option key={trope} value={trope}>
                        {trope}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
          </div>

          <p className="library-filter-count">
            Showing <strong>{displayedReviews.length}</strong> of{" "}
            <strong>{shelfTotal}</strong> books on this shelf
          </p>

          <button type="button" className="paper-button" onClick={resetAllShelfFilters}>
            Reset Filters
          </button>
        </PaperCard>

        <div className="library-main-stack">
          <div className="library-stat-strip">
            <StatCard icon="▥" value={libraryReviews.length} label="Total books" />
            <StatCard icon="◫" value={readingCount} label="Reading now" />
            <StatCard icon="▱" value={tbrCount} label="TBR" />
            <StatCard icon="✓" value={finishedCount} label="Finished" />
            <StatCard icon="◇" value={favoriteCount} label="Brain Chemistry" />
          </div>

          {libraryFilter === "tbr" && tbrCount > 0 && (
            <section className="library-next-five" aria-labelledby="library-next-five-title">
              <header className="library-next-five__heading">
                <div>
                  <p className="library-empty-card__kicker">Curated TBR</p>
                  <h2 id="library-next-five-title">Your Next 5</h2>
                </div>

                <span>{nextFiveReviews.length} / 5 chosen</span>
              </header>

              <p className="library-next-five__intro">
                Choose the five books closest to becoming your next read.
                Drag filled slots to reorder them, or use the position controls.
              </p>

              <p
                className="library-next-five__status"
                role="status"
                aria-live="polite"
              >
                {nextFiveMessage}
              </p>

              <ol className="library-next-five__slots">
                {Array.from({ length: 5 }, (_, index) => {
                  const selectedBook = nextFiveReviews[index]

                  return (
                    <li
                      key={selectedBook?.id || `next-five-slot-${index + 1}`}
                      className={[
                        selectedBook
                          ? "library-next-five__slot--filled"
                          : "",
                        selectedBook && index === 0
                          ? "library-next-five__slot--up-next"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      draggable={Boolean(selectedBook)}
                      onDragStart={() => {
                        if (selectedBook) {
                          setDraggedNextFiveId(selectedBook.id)
                          setNextFiveMessage(
                            `Moving ${selectedBook.bookInfo?.title || "book"}.`
                          )
                        }
                      }}
                      onDragEnd={() => setDraggedNextFiveId("")}
                      onDragOver={(event) => {
                        if (selectedBook && draggedNextFiveId) {
                          event.preventDefault()
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault()
                        dropNextFiveBook(index + 1)
                      }}
                      data-dragging={
                        selectedBook?.id === draggedNextFiveId
                          ? "true"
                          : undefined
                      }
                    >
                      <span className="library-next-five__number">{index + 1}</span>

                      {selectedBook ? (
                        <>
                          {index === 0 && (
                            <span className="library-next-five__up-next">
                              Up Next
                            </span>
                          )}

                          <button
                            type="button"
                            className="library-next-five__book-button"
                            onClick={() => openSavedReview(selectedBook)}
                          >
                            {selectedBook.bookInfo?.coverUrl ? (
                              <img
                                src={selectedBook.bookInfo.coverUrl}
                                alt=""
                                className="library-next-five__cover"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <span
                                className="library-next-five__cover-placeholder"
                                aria-hidden="true"
                              >
                                {index + 1}
                              </span>
                            )}
                            <strong>
                              {selectedBook.bookInfo?.title || "Untitled Book"}
                            </strong>
                            <small>
                              {selectedBook.bookInfo?.author || "Unknown Author"}
                            </small>
                          </button>

                          <div className="library-next-five__slot-actions">
                            <button
                              type="button"
                              disabled={index === 0}
                              aria-label={`Move ${
                                selectedBook.bookInfo?.title || "book"
                              } up`}
                              title="Move up"
                              onClick={() =>
                                moveNextFive(selectedBook, "up")
                              }
                            >
                              ↑
                            </button>

                            <button
                              type="button"
                              disabled={index === nextFiveReviews.length - 1}
                              aria-label={`Move ${
                                selectedBook.bookInfo?.title || "book"
                              } down`}
                              title="Move down"
                              onClick={() =>
                                moveNextFive(selectedBook, "down")
                              }
                            >
                              ↓
                            </button>

                            <label className="library-next-five__position">
                              <span>Position</span>
                              <select
                                value={index + 1}
                                aria-label={`Position for ${
                                  selectedBook.bookInfo?.title || "book"
                                }`}
                                onChange={(event) =>
                                  moveNextFiveToPosition(
                                    selectedBook,
                                    Number(event.target.value)
                                  )
                                }
                              >
                                {nextFiveReviews.map((_, positionIndex) => (
                                  <option
                                    key={positionIndex + 1}
                                    value={positionIndex + 1}
                                  >
                                    {positionIndex + 1}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <button
                              type="button"
                              className="library-next-five__start-button"
                              aria-label={`Start reading ${
                                selectedBook.bookInfo?.title || "book"
                              }`}
                              onClick={() => startReading(selectedBook)}
                            >
                              Start
                            </button>
                          </div>
                        </>
                      ) : (
                        <span className="library-next-five__open-slot">
                          Open slot
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>

              {maybeNextReviews.length > 0 &&
                nextFiveReviews.length < 5 && (
                  <aside
                    className="library-next-five__suggestions"
                    aria-labelledby="library-next-five-suggestions-title"
                  >
                    <div>
                      <p className="library-empty-card__kicker">
                        Maybe Next
                      </p>
                      <h3 id="library-next-five-suggestions-title">
                        Recently saved possibilities
                      </h3>
                    </div>

                    <ul>
                      {maybeNextReviews.map((reviewItem) => (
                        <li key={reviewItem.id}>
                          <span>
                            <strong>
                              {reviewItem.bookInfo?.title ||
                                "Untitled Book"}
                            </strong>
                            <small>
                              {reviewItem.bookInfo?.author ||
                                "Unknown Author"}
                            </small>
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              addMaybeNext(reviewItem)
                            }
                          >
                            Add
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
            </section>
          )}

          {libraryFilter === "tbr" && tbrCount > 0 && (
            <section
              className="library-tbr-tools"
              aria-labelledby="library-tbr-shelf-title"
            >
              <div className="library-tbr-tools__heading">
                <div>
                  <p className="library-empty-card__kicker">
                    The waiting shelf
                  </p>
                  <h2 id="library-tbr-shelf-title">Browse Your TBR</h2>
                </div>

                <p>
                  <strong>{displayedReviews.length}</strong>{" "}
                  {displayedReviews.length === 1 ? "book" : "books"}
                </p>
              </div>

              <div
                className="library-tbr-view-tabs"
                aria-label="TBR shelf view"
              >
                <button
                  type="button"
                  className={tbrShelfView === "all" ? "is-active" : ""}
                  aria-pressed={tbrShelfView === "all"}
                  onClick={() => setTbrShelfView("all")}
                >
                  All TBR
                  <span>{tbrCount}</span>
                </button>

                <button
                  type="button"
                  className={tbrShelfView === "next-five" ? "is-active" : ""}
                  aria-pressed={tbrShelfView === "next-five"}
                  onClick={() => setTbrShelfView("next-five")}
                >
                  Next 5
                  <span>{nextFiveReviews.length}</span>
                </button>

                <button
                  type="button"
                  className={tbrShelfView === "waiting" ? "is-active" : ""}
                  aria-pressed={tbrShelfView === "waiting"}
                  onClick={() => setTbrShelfView("waiting")}
                >
                  Maybe Next
                  <span>{Math.max(0, tbrCount - nextFiveReviews.length)}</span>
                </button>
              </div>

              <label className="library-tbr-sort">
                Sort this shelf
                <select
                  value={tbrSort}
                  onChange={(event) => setTbrSort(event.target.value)}
                >
                  <option value="priority">Next 5 priority</option>
                  <option value="recent">Recently saved</option>
                  <option value="title">Title A–Z</option>
                  <option value="author">Author A–Z</option>
                  <option value="shortest">Shortest first</option>
                </select>
              </label>
            </section>
          )}

          {isLibraryLoading && libraryReviews.length === 0 && (
            <PaperCard 
            scrapbookComposition={libraryShelfComposition}
            className="library-empty-card paper-card sticky-note">
              <p>Loading your library...</p>
            </PaperCard>
          )}

          {!isLibraryLoading && displayedReviews.length === 0 && (
            <PaperCard 
            scrapbookComposition={libraryShelfComposition}
            className="library-empty-card paper-card sticky-note">
              {hasActiveShelfFilters ? (
                <>
                  <div className="library-empty-card__icon" aria-hidden="true">
                    🔎
                  </div>
                  <p className="library-empty-card__kicker">No shelf matches</p>
                  <h2>No books match these filters.</h2>
                  <p>
                    Clear the current search and filters to see everything
                    preserved on this shelf.
                  </p>
                  <button type="button" className="paper-button" onClick={clearShelfFilters}>
                    Clear Search &amp; Filters
                  </button>
                </>
              ) : (
                <>
                  <div className="library-empty-card__icon" aria-hidden="true">
                    {emptyShelfState.icon}
                  </div>
                  <p className="library-empty-card__kicker">
                    {emptyShelfState.kicker}
                  </p>
                  <h2>{emptyShelfState.title}</h2>
                  <p>{emptyShelfState.copy}</p>
                  <button type="button" className="paper-button" onClick={emptyShelfState.action}>
                    {emptyShelfState.actionLabel}
                  </button>
                </>
              )}
            </PaperCard>
          )}

          <div className="library-results-grid library-bookshelf-grid">
            {paginatedReviews.map((item) => (
              <LibraryBookCard
                key={item.id}
                item={item}
                openSavedReview={openSavedReview}
                editReview={editReview}
                deleteReview={deleteReview}
                finishBook={finishBook}
                formatDate={formatDate}
                getProgressPercent={getProgressPercent}
                startReading={startReading}
                toggleNextFive={updateNextFive}
                isNextFive={nextFiveIds.has(item.id)}
                nextFiveFull={nextFiveReviews.length >= 5}
                getDaysToRead={getDaysToRead}
              />
            ))}
          </div>

          {displayedReviews.length > PAGE_SIZE && (
            <nav className="library-pagination" aria-label="Library pages">
              <p>
                Showing <strong>{pageStart}–{pageEnd}</strong> of{" "}
                <strong>{displayedReviews.length}</strong>
              </p>
              <div>
                <button
                  type="button"
                  disabled={libraryPage === 1}
                  onClick={() =>
                    setPaginationState({
                      key: paginationKey,
                      page: Math.max(1, libraryPage - 1),
                    })
                  }
                >
                  Previous
                </button>
                <span>
                  Page {libraryPage} of {pageCount}
                </span>
                <button
                  type="button"
                  disabled={libraryPage === pageCount}
                  onClick={() =>
                    setPaginationState({
                      key: paginationKey,
                      page: Math.min(pageCount, libraryPage + 1),
                    })
                  }
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}

export default LibraryPage
