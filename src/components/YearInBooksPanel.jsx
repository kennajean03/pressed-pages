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

  return (
    <div className={`score-card ${analyticsTab === "yearInBooks" ? "" : "analytics-panel-hidden"}`}>
      <p>🌸 Year In Books</p>
      <h2>{yearInBooksStats.yearKey}</h2>
      <p>Your yearly scrapbook of finished books, reading days, favorite tropes, and top-shelf reads.</p>

      <div className="review-field">
        <label>Choose Year</label>
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
      </div>

      {yearInBooksStats.booksFinished > 0 ? (
        <>
          <div className="year-books-hero">
            <div>
              <strong>{yearInBooksStats.booksFinished}</strong>
              <span>Books Finished</span>
            </div>
            <div>
              <strong>{yearInBooksStats.pagesLogged}</strong>
              <span>Pages Logged</span>
            </div>
            <div>
              <strong>{yearInBooksStats.readingDays}</strong>
              <span>Reading Days</span>
            </div>
          </div>

          <div className="wrapup-graphic-panel">
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
          </div>

          <div className="year-books-grid">
            <div>
              <p>⭐ Average Rating</p>
              <h3>{yearInBooksStats.averageRating}/5</h3>
            </div>
            <div>
              <p>🌶️ Average Spice</p>
              <h3>{yearInBooksStats.averageSpice}/5</h3>
            </div>
            <div>
              <p>💘 Average Obsession</p>
              <h3>{yearInBooksStats.averageObsession}/10</h3>
            </div>
            <div>
              <p>⏱️ Time Logged</p>
              <h3>{yearInBooksStats.hoursLogged} hrs</h3>
            </div>
          </div>

          {yearInBooksStats.topTrope && (
            <p>Favorite Trope: {yearInBooksStats.topTrope[0]} ({yearInBooksStats.topTrope[1]})</p>
          )}

          {yearInBooksStats.topAuthor && (
            <p>Most Read Author: {yearInBooksStats.topAuthor[0]} ({yearInBooksStats.topAuthor[1]})</p>
          )}

          {yearInBooksStats.topFormat && (
            <p>Most Used Format: {yearInBooksStats.topFormat[0]} ({yearInBooksStats.topFormat[1]})</p>
          )}

          {yearInBooksStats.highestRated && (
            <p>
              Highest Rated: {yearInBooksStats.highestRated.bookInfo.title || "Untitled Book"} •{" "}
              {yearInBooksStats.highestRated.bookScore}/5
            </p>
          )}

          {yearInBooksStats.fastestRead && (
            <p>
              Fastest Read: {yearInBooksStats.fastestRead.item.bookInfo.title || "Untitled Book"} •{" "}
              {yearInBooksStats.fastestRead.days} day{yearInBooksStats.fastestRead.days === 1 ? "" : "s"}
            </p>
          )}

          {yearInBooksStats.longestRead && (
            <p>
              Longest Read: {yearInBooksStats.longestRead.item.bookInfo.title || "Untitled Book"} •{" "}
              {yearInBooksStats.longestRead.days} day{yearInBooksStats.longestRead.days === 1 ? "" : "s"}
            </p>
          )}

          <div className="year-books-months">
            <h3>Books by Month</h3>
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

          <div style={{ marginTop: "1rem" }}>
            <h3>Finished Shelf</h3>
            {yearInBooksStats.books.map((item) => (
              <p key={item.id}>
                <strong>{item.bookInfo.title || "Untitled Book"}</strong>
                {item.bookInfo.author ? ` by ${item.bookInfo.author}` : ""} • {item.bookScore}/5
                {item.metrics?.spice ? ` • 🌶️ ${item.metrics.spice}/5` : ""}
              </p>
            ))}
          </div>
        </>
      ) : (
        <p>No books finished in this year yet.</p>
      )}
    </div>
  )
}

export default YearInBooksPanel