import BookCard from "./scrapbook/BookCard/BookCard"
import FavoriteQuote from "./scrapbook/FavoriteQuote/FavoriteQuote"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function YearInBooksPanel({
  analyticsTab,
  yearInBooksStats,
  yearInBooksKey,
  setYearInBooksKey,
  yearInBooksOptions,
  getYearInBooksGraphicDataUrl,
  downloadYearInBooksGraphicPng,
  downloadYearInBooksGraphicSvg,
}) {
  const maxMonthCount = Math.max(
    ...yearInBooksStats.monthLabels.map((item) => item.count),
    1
  )

  const topTrope = yearInBooksStats.topTrope
  const topAuthor = yearInBooksStats.topAuthor
  const topFormat = yearInBooksStats.topFormat
  const highestRated = yearInBooksStats.highestRated
  const fastestRead = yearInBooksStats.fastestRead
  const longestRead = yearInBooksStats.longestRead
  const favoriteBook = yearInBooksStats.favoriteBook || highestRated

  return (
<ScrapbookPanel
  scrapbookId="analytics-year-in-books"
  className={`analytics-almanac-panel ${
    analyticsTab === "yearInBooks" ? "" : "analytics-panel-hidden"
  }`}
>
        <PaperCard
        as="section"
        variant="deckled"
        tape="Annual Keepsake"
        tapeVariant="rose"
        flower="sprig"
        className="year-books-keepsake-hero"
      >
        <p className="scrapbook-kicker">Year in Books</p>
        <h2>{yearInBooksStats.yearKey}</h2>
        <p>
          Your yearly scrapbook of finished books, reading days, favorite tropes,
          top-shelf reads, and all the tiny reading memories worth keeping.
        </p>

        <div className="year-books-control-row">
          <label>
            Choose Year
            <select
              value={yearInBooksKey}
              onChange={(e) => setYearInBooksKey(e.target.value)}
            >
              {yearInBooksOptions.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </label>
        </div>
      </PaperCard>

      {yearInBooksStats.booksFinished > 0 ? (
        <>
          <div className="year-books-snapshot-grid">
            <StatCard icon="▥" value={yearInBooksStats.booksFinished} label="Books Finished" />
            <StatCard icon="▤" value={yearInBooksStats.pagesLogged} label="Pages Logged" />
            <StatCard icon="✿" value={yearInBooksStats.readingDays} label="Reading Days" />
            <StatCard icon="◷" value={`${yearInBooksStats.hoursLogged}`} label="Hours Logged" />
          </div>

          <SectionDivider label="The Book of the Year" icon="♡" />

          <div className="year-books-favorite-layout">
            {favoriteBook && (
              <BookCard
                book={favoriteBook.bookInfo}
                status="Favorite of the Year"
                rating={favoriteBook.bookScore}
                obsession={favoriteBook.obsessionScore}
                variant="compact"
                className="year-books-favorite-book"
              />
            )}
            <PaperCard
              variant="notebook"
              tape="The lasting impression"
              tapeVariant="rose"
              className="year-books-reflection-card"
            >
              <Sticker icon="✎" tone="rose">Yearly Reflection</Sticker>
              <blockquote>
                {yearInBooksStats.reflection ||
                  "Your favorite read is pinned here, waiting for the words that sum up the year."}
              </blockquote>
            </PaperCard>
          </div>

          <SectionDivider label="The Keepsake Graphic" icon="□" />

          <PaperCard
            as="section"
            variant="journal"
            tape="Save the Year"
            tapeVariant="gold"
            className="year-books-graphic-card"
          >
            <img
              className="year-books-graphic-preview"
              src={getYearInBooksGraphicDataUrl(yearInBooksStats)}
              alt={`${yearInBooksStats.yearKey} Pressed Pages Year In Books graphic preview`}
            />
            <div className="wrapup-graphic-actions">
              <button onClick={() => downloadYearInBooksGraphicPng(yearInBooksStats)}>
                🎨 Download Year PNG
              </button>
              <button onClick={() => downloadYearInBooksGraphicSvg(yearInBooksStats)}>
                Save SVG Backup
              </button>
            </div>
          </PaperCard>

          <SectionDivider label="The Story in Numbers" icon="▥" />

          <div className="year-books-metrics-grid">
            <PaperCard variant="journal" tape="Average Rating" tapeVariant="gold" className="year-books-metric-card">
              <strong>⭐ {yearInBooksStats.averageRating}/5</strong>
              <p>Your average on-paper score across the year.</p>
            </PaperCard>
            <PaperCard variant="journal" tape="Average Spice" tapeVariant="rose" className="year-books-metric-card">
              <strong>🌶️ {yearInBooksStats.averageSpice}/5</strong>
              <p>The heat level your shelves leaned toward.</p>
            </PaperCard>
            <PaperCard variant="journal" tape="Obsession" tapeVariant="sage" className="year-books-metric-card">
              <strong>❤️ {yearInBooksStats.averageObsession}/10</strong>
              <p>Your average heart-clutching, brain-chemistry score.</p>
            </PaperCard>
            <PaperCard variant="journal" tape="Reading Time" tapeVariant="linen" className="year-books-metric-card">
              <strong>⏱️ {yearInBooksStats.hoursLogged} hrs</strong>
              <p>Logged reading time preserved in your journal.</p>
            </PaperCard>
          </div>

          <SectionDivider label="Yearly Highlights" icon="✦" />

          <PaperCard
            as="section"
            variant="notebook"
            tape="Favorite Patterns"
            tapeVariant="sage"
            flower="sprig"
            className="year-books-highlight-card"
          >
            <div className="year-books-highlight-grid">
              {topTrope && (
                <div>
                  <Sticker icon="💐" tone="rose">Favorite Trope</Sticker>
                  <strong>{topTrope[0]}</strong>
                  <p>{topTrope[1]} book{topTrope[1] === 1 ? "" : "s"}</p>
                </div>
              )}

              {topAuthor && (
                <div>
                  <Sticker icon="✍️" tone="gold">Most Read Author</Sticker>
                  <strong>{topAuthor[0]}</strong>
                  <p>{topAuthor[1]} book{topAuthor[1] === 1 ? "" : "s"}</p>
                </div>
              )}

              {topFormat && (
                <div>
                  <Sticker icon="📦" tone="linen">Favorite Format</Sticker>
                  <strong>{topFormat[0]}</strong>
                  <p>{topFormat[1]} book{topFormat[1] === 1 ? "" : "s"}</p>
                </div>
              )}

              {yearInBooksStats.topGenre && (
                <div>
                  <Sticker icon="📚" tone="linen">Top Genre</Sticker>
                  <strong>{yearInBooksStats.topGenre[0]}</strong>
                  <p>{yearInBooksStats.topGenre[1]} book{yearInBooksStats.topGenre[1] === 1 ? "" : "s"}</p>
                </div>
              )}

              {yearInBooksStats.topMood && (
                <div>
                  <Sticker icon="🌙" tone="sage">Reading Mood</Sticker>
                  <strong>{yearInBooksStats.topMood[0]}</strong>
                  <p>The mood most often saved in your logs.</p>
                </div>
              )}

              <div>
                <Sticker icon="🎀" tone="rose">Keepsakes</Sticker>
                <strong>{yearInBooksStats.keepsakeCount}</strong>
                <p>Quotes, photos, and pressed flowers saved.</p>
              </div>

              {highestRated && (
                <div>
                  <Sticker icon="⭐" tone="gold">Highest Rated</Sticker>
                  <strong>{highestRated.bookInfo.title || "Untitled Book"}</strong>
                  <p>{highestRated.bookScore}/5</p>
                </div>
              )}

              {fastestRead && (
                <div>
                  <Sticker icon="⚡" tone="sage">Fastest Read</Sticker>
                  <strong>{fastestRead.item.bookInfo.title || "Untitled Book"}</strong>
                  <p>{fastestRead.days} day{fastestRead.days === 1 ? "" : "s"}</p>
                </div>
              )}

              {longestRead && (
                <div>
                  <Sticker icon="🕯️" tone="cream">Longest Read</Sticker>
                  <strong>{longestRead.item.bookInfo.title || "Untitled Book"}</strong>
                  <p>{longestRead.days} day{longestRead.days === 1 ? "" : "s"}</p>
                </div>
              )}
            </div>
          </PaperCard>

          <SectionDivider label="Words Worth Keeping" icon="✎" />

          <div className="year-books-memory-layout">
            <div>
              <h3>Quote of the year</h3>
              <FavoriteQuote
                quote={yearInBooksStats.latestQuote?.favoriteQuote}
                source={yearInBooksStats.latestQuote?.quoteSource}
                page={yearInBooksStats.latestQuote?.quotePage}
                rotation={-1}
                size="large"
              />
            </div>
            <PaperCard
              variant="deckled"
              tape="A reading memory"
              tapeVariant="linen"
              className="year-books-memory-card"
            >
              <p className="scrapbook-kicker">From the year's margins</p>
              <blockquote>
                {yearInBooksStats.latestMemory?.memory ||
                  "No written reading memory was tucked into this year yet."}
              </blockquote>
              {yearInBooksStats.latestMemory?.title && (
                <p>— {yearInBooksStats.latestMemory.title}</p>
              )}
            </PaperCard>
          </div>

          <SectionDivider label="Books by Month" icon="☾" />

          <PaperCard
            as="section"
            variant="ledger"
            tape="Monthly Shelf"
            tapeVariant="linen"
            className="year-books-months-card"
          >
            <div className="year-books-months">
              {yearInBooksStats.monthLabels.map((month) => (
                <div key={month.key}>
                  <span>{month.shortLabel}</span>
                  <div className="year-books-month-bar">
                    <span
                      style={{
                        width: `${Math.max(4, Math.min(100, (month.count / maxMonthCount) * 100))}%`,
                      }}
                    />
                  </div>
                  <strong>{month.count}</strong>
                </div>
              ))}
            </div>
          </PaperCard>

          <SectionDivider label="Finished Shelf" icon="▥" />

          <div className="year-books-finished-grid">
            {yearInBooksStats.books.map((item) => (
              <BookCard
                key={item.id}
                book={item.bookInfo}
                status="Finished"
                rating={item.bookScore}
                obsession={item.obsessionScore}
                variant="compact"
                className="year-books-finished-book"
              />
            ))}
          </div>
        </>
      ) : (
        <PaperCard
          variant="notebook"
          tape="A fresh volume"
          tapeVariant="sage"
          className="analytics-message-card year-books-empty-card"
        >
          <Sticker icon="◇" tone="sage">Open Year</Sticker>
          <h3>{yearInBooksStats.yearKey} is ready for its first finished book.</h3>
          <p>
            Choose another year above, or let this blank annual scrapbook wait
            for the next reading memory.
          </p>
        </PaperCard>
      )}
    </ScrapbookPanel>  )
}

export default YearInBooksPanel
