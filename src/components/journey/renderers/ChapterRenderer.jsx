function ChapterRenderer({
  layoutObject,
  childLayoutObjects = [],
  renderJournalPage,
  ...sharedProps
}) {
  if (!layoutObject) {
    return null
  }

  const chapterId =
    layoutObject.chapterId ||
    layoutObject.id ||
    "chapter"

  const sessionCount =
    layoutObject.sessionCount ||
    childLayoutObjects.length ||
    0

  return (
    <section
      className={[
        "book-journey-composition__chapter",
        `book-journey-composition__chapter--${chapterId}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="book-journey-composition__chapter-heading">
        <p className="scrapbook-kicker">
          {layoutObject.eyebrow}
        </p>

        <h2>
          {layoutObject.title}
        </h2>

        <p>
          {layoutObject.copy}
        </p>

        <span className="book-journey-composition__chapter-count">
          {sessionCount}{" "}
          reading{" "}
          {sessionCount === 1
            ? "memory"
            : "memories"}
        </span>
      </header>

      {childLayoutObjects.length > 0 &&
        typeof renderJournalPage ===
          "function" && (
          <div className="book-journey-composition__journal-pages">
            {childLayoutObjects.map(
              (
                journalPageObject,
                journalPageIndex
              ) => (
                <div
                  key={
                    journalPageObject.id ||
                    `journal-page-${journalPageIndex}`
                  }
                  className="journey-renderer__chapter-object"
                >
                  {renderJournalPage({
                    layoutObject:
                      journalPageObject,
                    ...sharedProps,
                  })}
                </div>
              )
            )}
          </div>
        )}
    </section>
  )
}

export default ChapterRenderer