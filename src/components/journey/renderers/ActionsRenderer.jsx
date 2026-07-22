import LibraryTabs from "../../scrapbook/LibraryTabs/LibraryTabs"

function ActionsRenderer({
  review,
  isOwner = false,
  setStep,
  supportingActions = [],
}) {
  if (!review) {
    return null
  }

  const bookInfo =
    review.bookInfo || {}

  const title =
    bookInfo.title ||
    "Untitled Book"

  return (
    <footer className="book-journey-composition__actions">
      <LibraryTabs
        primaryLabel={
          isOwner
            ? "Generate Review Graphic"
            : "Back to Library"
        }
        primaryIcon={
          isOwner
            ? "🎨"
            : "←"
        }
        onPrimary={() =>
          isOwner
            ? setStep(
                "reviewGraphic"
              )
            : setStep(
                "library"
              )
        }
        supportingActions={
          supportingActions
        }
        state="remembered"
        align="left"
        ariaLabel={`Actions for ${title}`}
      />
    </footer>
  )
}

export default ActionsRenderer