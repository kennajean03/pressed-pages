import { renderAnchors } from "../scrapbook/renderers/renderAnchors"
import { useResolvedComposition } from "../scrapbook/hooks/useResolvedComposition"

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
      data-scrapbook-object={choice.scrapbookObject}
      onClick={onClick}
    >
      <span className="scrapbook-choice-card__anchors" aria-hidden="true">
        {renderAnchors(composition)}
      </span>

      <span className="scrapbook-choice-card__tape" aria-hidden="true" />
      <span className="scrapbook-choice-card__icon" aria-hidden="true">
        {choice.icon}
      </span>
      <strong>{choice.title}</strong>
      <p>{choice.description}</p>
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

  const handleBacklogImport = () => {
    setSaveMessage("")
    setStep("backlogImport")
  }

  const choiceActions = {
    review: startNewReview,
    reading: handleCurrentlyReading,
    finished: startAlreadyReadBook,
    import: handleBacklogImport,
  }

  return (
    <section className="add-book-page scrapbook-page">
      <div className="add-book-page__header scrapbook-page__header">
        <p className="scrapbook-eyebrow">Library Management</p>
        <h1>Add Book</h1>

        <p className="add-book-page__intro scrapbook-page__intro">
          Choose the kind of book entry you want to add. Full reviews are still
          here, but backlog books can be added without filling out every rating.
        </p>
      </div>

      <div className="add-book-choice-grid scrapbook-choice-grid">
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