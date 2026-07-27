import { renderAnchors } from "../scrapbook/renderers/renderAnchors"
import { useResolvedComposition } from "../scrapbook/hooks/useResolvedComposition"
import "./AddBookPage.css"

const addBookChoices = [
  {
    key: "review",
    icon: "📝",
    title: "Full Review",
    description:
      "Rate the book, track spice, tropes & themes, notes, graphics, and all the scrapbook details.",
    className: "scrapbook-choice-card--review",
    scrapbookObject: "addBook.fullReview",
  },
  {
    key: "reading",
    icon: "📖",
    title: "Currently Reading",
    description:
      "Add a book to your active reading shelf and start tracking page progress.",
    className: "scrapbook-choice-card--reading",
    scrapbookObject: "addBook.currentlyReading",
  },
  {
    key: "tbr",
    icon: "🔖",
    eyebrow: "Save for later",
    title: "Saved to TBR",
    description:
      "File a book on your waiting shelf now, then choose it for Currently Reading—or a future Next 5—when the mood is right.",
    className: "scrapbook-choice-card--tbr",
    scrapbookObject: "addBook.tbr",
    featured: true,
  },
  {
    key: "finished",
    icon: "📚",
    title: "Already Read",
    description: "Quick-add one finished book without writing a full review.",
    className: "scrapbook-choice-card--finished",
    scrapbookObject: "addBook.alreadyRead",
  },
  {
    key: "import",
    icon: "📦",
    title: "Import Multiple",
    description: "Batch-add older reads to fill your finished shelf faster.",
    className: "scrapbook-choice-card--import",
    scrapbookObject: "addBook.import",
  },
]

function AddBookChoiceCard({ choice, onClick }) {
  const { composition } = useResolvedComposition({
    scrapbookId: choice.scrapbookObject,
    objectType: "action",
    variant: choice.key,
    recipeId: choice.scrapbookObject,
  })

  return (
    <button
      type="button"
      className={`add-book-choice-card scrapbook-choice-card ${choice.className}`}
      data-featured={choice.featured ? "true" : undefined}
      data-scrapbook-object={choice.scrapbookObject}
      onClick={onClick}
    >
      <span className="scrapbook-choice-card__anchors" aria-hidden="true">
        {renderAnchors(composition)}
      </span>

      <span className="scrapbook-choice-card__content">
        {choice.eyebrow && (
          <span className="scrapbook-choice-card__eyebrow">
            {choice.eyebrow}
          </span>
        )}

        <span className="scrapbook-choice-card__icon" aria-hidden="true">
          {choice.icon}
        </span>

        <strong>{choice.title}</strong>
        <p>{choice.description}</p>

        <span className="scrapbook-choice-card__action" aria-hidden="true">
          Begin entry <span>→</span>
        </span>
      </span>
    </button>
  )
}

function AddBookPage({
  startNewReview,
  resetForm,
  setBookInfo,
  startAlreadyReadBook,
  setSaveMessage,
  setStep,
}) {
  const handleCurrentlyReading = () => {
    resetForm()

    setBookInfo((currentInfo) => ({
      ...currentInfo,
      status: "Reading",
      dateStarted: currentInfo.dateStarted || new Date().toISOString(),
    }))

    setStep(0)
  }

  const handleTbr = () => {
    resetForm()

    setBookInfo((currentInfo) => ({
      ...currentInfo,
      status: "TBR",
      dateStarted: "",
      dateFinished: "",
      currentPage: "",
    }))

    setSaveMessage("")
    setStep(0)
  }

  const handleBacklogImport = () => {
    setSaveMessage("")
    setStep("backlogImport")
  }

  const choiceActions = {
    review: startNewReview,
    reading: handleCurrentlyReading,
    tbr: handleTbr,
    finished: startAlreadyReadBook,
    import: handleBacklogImport,
  }

  return (
    <section className="add-book-page scrapbook-page">
      <div className="add-book-page__header scrapbook-page__header">
        <p className="scrapbook-eyebrow">Library Management</p>
        <h1>Add Book</h1>

        <p className="add-book-page__intro scrapbook-page__intro">
          Choose how this book belongs in your library today. Start a full
          review, open an active reading file, save it for later, or archive
          books you have already finished.
        </p>
      </div>

      <div
        className="add-book-choice-grid scrapbook-choice-grid"
        aria-label="Book entry types"
      >
        {addBookChoices.map((choice) => (
          <AddBookChoiceCard
            key={choice.key}
            choice={choice}
            onClick={choiceActions[choice.key]}
          />
        ))}
      </div>
    </section>
  )
}

export default AddBookPage
