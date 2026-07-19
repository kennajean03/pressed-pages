import FavoriteQuote from "../../scrapbook/FavoriteQuote/FavoriteQuote"

function getQuoteData(quote = {}) {
  return quote.data || quote
}

function getQuoteText(quote = {}) {
  const data =
    getQuoteData(quote)

  return (
    data.quote ||
    data.text ||
    data.value ||
    ""
  )
}

function getQuoteSource(quote = {}) {
  const data =
    getQuoteData(quote)

  return (
    data.source ||
    data.chapter ||
    ""
  )
}

function getQuotePage(quote = {}) {
  const data =
    getQuoteData(quote)

  return (
    data.page ||
    data.pageNumber ||
    ""
  )
}

function FavoriteQuotesRenderer({
  layoutObject,
}) {
  const quotes =
    Array.isArray(
      layoutObject?.quotes
    )
      ? layoutObject.quotes
      : []

  const preservedQuotes =
    quotes.filter(
      (quote) =>
        Boolean(
          getQuoteText(quote)
        )
    )

  if (!preservedQuotes.length) {
    return null
  }

  const title =
    layoutObject?.title ||
    "Words Worth Remembering"

  const subtitle =
    layoutObject?.subtitle ||
    "The lines from this story you chose to keep."

  return (
    <section className="book-journey-composition__favorite-quotes">
      <header className="book-journey-composition__chapter-heading">
        <p className="scrapbook-kicker">
          Preserved Words
        </p>

        <h2>{title}</h2>

        {subtitle && (
          <p>{subtitle}</p>
        )}

        <span className="book-journey-composition__chapter-count">
          {preservedQuotes.length}{" "}
          preserved{" "}
          {preservedQuotes.length === 1
            ? "quote"
            : "quotes"}
        </span>
      </header>

      <div className="book-journey-composition__favorite-quote-pages">
        {preservedQuotes.map(
          (
            quote,
            quoteIndex
          ) => (
            <FavoriteQuote
              key={
                quote.id ||
                `journey-quote-${quoteIndex}`
              }
              quote={
                getQuoteText(quote)
              }
              source={
                getQuoteSource(quote)
              }
              page={
                getQuotePage(quote)
              }
              rotation={
                quoteIndex % 2 === 0
                  ? -1
                  : 1
              }
              size="medium"
            />
          )
        )}
      </div>
    </section>
  )
}

export default FavoriteQuotesRenderer