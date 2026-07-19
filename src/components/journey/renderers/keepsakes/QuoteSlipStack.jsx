import FavoriteQuote from "../../../scrapbook/FavoriteQuote/FavoriteQuote"
import StackedPaperAssembly from "../../../scrapbook/assemblies/StackedPaperAssembly"

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

function QuoteSlip({ keepsake }) {
  const quotes =
    Array.isArray(
      keepsake?.items
    )
      ? keepsake.items
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

  return (
    <section className="journey-quote-slip">
      <header className="journey-quote-slip__header">
        <p className="scrapbook-kicker">
          Quote Slips
        </p>

        <h3>
          {keepsake?.title ||
            "Words Worth Remembering"}
        </h3>

        <span className="journey-quote-slip__count">
          {preservedQuotes.length}{" "}
          preserved{" "}
          {preservedQuotes.length === 1
            ? "quote"
            : "quotes"}
        </span>
      </header>

     <StackedPaperAssembly>
  {preservedQuotes.map(
    (
      quote,
      quoteIndex
    ) => (
      <FavoriteQuote
        key={
          quote.id ||
          `keepsake-quote-${quoteIndex}`
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
        rotation={0}
        size="medium"
      />
    )
  )}
</StackedPaperAssembly>
    </section>
  )
}

export default QuoteSlip