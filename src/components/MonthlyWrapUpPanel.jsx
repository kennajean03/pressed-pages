import BookCard from "./scrapbook/BookCard/BookCard"
import FavoriteQuote from "./scrapbook/FavoriteQuote/FavoriteQuote"
import PaperCard from "./scrapbook/PaperCard/PaperCard"
import SectionDivider from "./scrapbook/SectionDivider/SectionDivider"
import StatCard from "./scrapbook/StatCard/StatCard"
import Sticker from "./scrapbook/Sticker/Sticker"
import ScrapbookPanel from "./scrapbook/ScrapbookPanel"

function MonthlyWrapUpPanel({
  analyticsTab,
  monthlyWrapUpStats,
  wrapUpMonthKey,
  setWrapUpMonthKey,
  wrapUpMonthOptions,
  getMonthlyWrapUpGraphicDataUrl,
  downloadMonthlyWrapUpGraphicPng,
  downloadMonthlyWrapUpGraphicSvg,
}) {
  const stats = monthlyWrapUpStats
  const favoriteBook = stats.favoriteBook || stats.highestRated

  return (
    <ScrapbookPanel
      scrapbookId="analytics-monthly-wrap-up"
      className={`analytics-wrapup-panel ${
        analyticsTab === "wrapUps" ? "" : "analytics-panel-hidden"
      }`}
    >
      <PaperCard
        as="section"
        variant="deckled"
        tape="Monthly Keepsake"
        tapeVariant="rose"
        flower="sprig"
        className="wrapup-keepsake-hero"
      >
        <p className="scrapbook-kicker">🌙 Monthly Wrap-Up</p>
        <h2>{stats.monthLabel}</h2>
        <p>
          A little paper time capsule for the stories, moods, and moments that
          shaped this month of reading.
        </p>
        <div className="wrapup-period-control">
          <label>
            Choose Month
            <select
              value={wrapUpMonthKey}
              onChange={(event) => setWrapUpMonthKey(event.target.value)}
            >
              {wrapUpMonthOptions.map((monthKey) => {
                const [yearPart, monthPart] = monthKey.split("-")
                const monthDate = new Date(Number(yearPart), Number(monthPart) - 1, 1)
                return (
                  <option key={monthKey} value={monthKey}>
                    {monthDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
      </PaperCard>

      {stats.booksFinished > 0 ? (
        <>
          <div className="wrapup-snapshot-grid">
            <StatCard icon="📚" value={stats.booksFinished} label="Books Finished" />
            <StatCard icon="📄" value={stats.pagesLogged} label="Pages Logged" />
            <StatCard icon="🌸" value={stats.readingDays} label="Reading Days" />
            <StatCard icon="☕" value={stats.hoursLogged} label="Hours Logged" />
          </div>

          <SectionDivider label="The Month's Favorite" icon="💗" />

          <div className="wrapup-favorite-layout">
            {favoriteBook && (
              <BookCard
                book={favoriteBook.bookInfo}
                status="Favorite Read"
                rating={favoriteBook.bookScore}
                obsession={favoriteBook.obsessionScore}
                variant="compact"
                className="wrapup-favorite-book"
              />
            )}
            <PaperCard
              variant="notebook"
              tape="Why it stayed"
              tapeVariant="sage"
              className="wrapup-reflection-card"
            >
              <Sticker icon="✍️" tone="rose">Reader Reflection</Sticker>
              <p>
                {stats.reflection ||
                  "This favorite is saved here, ready for a reflection whenever the words arrive."}
              </p>
              <div className="wrapup-mini-facts">
                <span>⭐ {favoriteBook?.bookScore || 0}/5</span>
                <span>❤️ {favoriteBook?.obsessionScore || 0}/10</span>
              </div>
            </PaperCard>
          </div>

          <SectionDivider label="The Month in Clippings" icon="✂️" />

          <PaperCard
            as="section"
            variant="journal"
            tape="Favorite Patterns"
            tapeVariant="gold"
            className="wrapup-highlights-card"
          >
            <div className="wrapup-highlight-grid">
              <div><Sticker icon="📚" tone="linen">Genre</Sticker><strong>{stats.topGenre?.[0] || "Still unfolding"}</strong></div>
              <div><Sticker icon="🌙" tone="sage">Mood</Sticker><strong>{stats.topMood?.[0] || "No mood logged"}</strong></div>
              <div><Sticker icon="💐" tone="rose">Trope</Sticker><strong>{stats.topTrope?.[0] || "No trope yet"}</strong></div>
              <div><Sticker icon="✍️" tone="gold">Author</Sticker><strong>{stats.topAuthor?.[0] || "No repeat author"}</strong></div>
              <div><Sticker icon="🌶️" tone="rose">Average Spice</Sticker><strong>{stats.averageSpice}/5</strong></div>
              <div><Sticker icon="🎀" tone="linen">Keepsakes</Sticker><strong>{stats.keepsakeCount}</strong></div>
            </div>
          </PaperCard>

          <div className="wrapup-memory-layout">
            <div>
              <h3>Quote kept close</h3>
              <FavoriteQuote
                quote={stats.latestQuote?.favoriteQuote}
                source={stats.latestQuote?.quoteSource}
                page={stats.latestQuote?.quotePage}
                rotation={-1}
                size="large"
              />
            </div>
            <PaperCard
              variant="deckled"
              tape="Reading Memory"
              tapeVariant="linen"
              className="wrapup-memory-card"
            >
              <p className="scrapbook-kicker">A moment from the margins</p>
              <blockquote>
                {stats.latestMemory?.memory ||
                  "No written reading memory was tucked into this month yet."}
              </blockquote>
              {stats.latestMemory?.title && <p>— {stats.latestMemory.title}</p>}
            </PaperCard>
          </div>

          <SectionDivider label="Finished Book Strip" icon="📖" />
          <div className="wrapup-book-strip">
            {stats.books.map((item) => (
              <BookCard
                key={item.id}
                book={item.bookInfo}
                status="Finished"
                rating={item.bookScore}
                obsession={item.obsessionScore}
                variant="compact"
              />
            ))}
          </div>

          <SectionDivider label="Share the Page" icon="🎞️" />
          <PaperCard
            as="section"
            variant="journal"
            tape="Save this month"
            tapeVariant="gold"
            className="wrapup-share-card"
          >
            <img
              className="wrapup-graphic-preview"
              src={getMonthlyWrapUpGraphicDataUrl(stats)}
              alt={`${stats.monthLabel} Pressed Pages wrap-up graphic preview`}
            />
            <div className="wrapup-graphic-actions">
              <button onClick={() => downloadMonthlyWrapUpGraphicPng(stats)}>
                🎨 Download Wrap-Up PNG
              </button>
              <button onClick={() => downloadMonthlyWrapUpGraphicSvg(stats)}>
                Save SVG Backup
              </button>
            </div>
          </PaperCard>
        </>
      ) : (
        <PaperCard
          variant="notebook"
          tape="A quiet month"
          tapeVariant="sage"
          className="wrapup-empty-card"
        >
          <Sticker icon="🌱" tone="sage">Open Page</Sticker>
          <h3>This month is waiting for its first finished book.</h3>
          <p>
            Reading days and memories can still collect here. When a book is
            finished, the full monthly keepsake will bloom automatically.
          </p>
        </PaperCard>
      )}
    </ScrapbookPanel>
  )
}

export default MonthlyWrapUpPanel
