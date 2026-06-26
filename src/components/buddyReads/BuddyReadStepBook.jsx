import BuddyReadBookCard from "./BuddyReadBookCard"

export default function BuddyReadStepBook({ bookSearch, setBookSearch, filteredBooks, draft, selectBook }) {
  return (
    <div className="buddy-read-journal-page">
      <p className="buddy-reads-kicker">Page 2 of 4</p>
      <h2>Choose Your Book</h2>
      <p>Pick a book from your Pressed Pages library.</p>

      <label className="buddy-read-search-label">
        Search your library
        <input
          value={bookSearch}
          onChange={(event) => setBookSearch(event.target.value)}
          placeholder="Search by title or author..."
        />
      </label>

      <div className="buddy-read-book-list compact-list">
        {filteredBooks.map((book) => (
          <BuddyReadBookCard
            key={book.id}
            book={book}
            selected={draft.selectedBook?.id === book.id}
            onSelect={() => selectBook(book)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="score-card">
          <p>No books match that search yet.</p>
          <p>Add a book to your library first, then come back to start a Buddy Read.</p>
        </div>
      )}
    </div>
  )
}
