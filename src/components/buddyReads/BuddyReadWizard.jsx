import { useEffect, useMemo, useState } from "react"
import { supabase } from "../../lib/supabase"
import "./BuddyReads.css"
import BuddyReadStepTitle from "./BuddyReadStepTitle"
import BuddyReadStepBook from "./BuddyReadStepBook"
import BuddyReadStepReaders from "./BuddyReadStepReaders"
import BuddyReadStepReview from "./BuddyReadStepReview"

export default function BuddyReadWizard({
  user,
  profile,
  savedReviews = [],
  setStep,
  onBeginBuddyRead,
}) {
  const [page, setPage] = useState(1)
  const [bookSearch, setBookSearch] = useState("")
  const [crewSearch, setCrewSearch] = useState("")
  const [followingReaders, setFollowingReaders] = useState([])
  const [followingLoading, setFollowingLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isBeginning, setIsBeginning] = useState(false)
  const [draft, setDraft] = useState({
    name: "",
    selectedBook: null,
    invitedReaders: [],
  })

  const libraryBooks = useMemo(() => {
    const booksByKey = new Map()

    ;(savedReviews || []).forEach((item) => {
      const bookInfo = item?.bookInfo || {}
      const title = bookInfo.title || "Untitled Book"
      const author = bookInfo.author || "Unknown Author"
      const key = `${title.toLowerCase()}-${author.toLowerCase()}`

      if (!booksByKey.has(key)) {
        booksByKey.set(key, {
          id: item.id || key,
          title,
          author,
          coverUrl: bookInfo.coverUrl || "",
          status: bookInfo.status || "",
          pages: bookInfo.pages || bookInfo.pageCount || "",
          review: item,
        })
      }
    })

    return [...booksByKey.values()].sort((a, b) => a.title.localeCompare(b.title))
  }, [savedReviews])

  const filteredBooks = useMemo(() => {
    const search = bookSearch.trim().toLowerCase()
    if (!search) return libraryBooks

    return libraryBooks.filter((book) =>
      `${book.title} ${book.author}`.toLowerCase().includes(search)
    )
  }, [bookSearch, libraryBooks])

  const filteredReaders = useMemo(() => {
    const search = crewSearch.trim().toLowerCase()
    if (!search) return followingReaders

    return followingReaders.filter((reader) =>
      `${reader.displayName || ""} ${reader.profileData?.displayName || ""} ${reader.username || ""}`
        .toLowerCase()
        .includes(search)
    )
  }, [crewSearch, followingReaders])

  useEffect(() => {
    async function loadFollowingReaders() {
      if (!user?.id) {
        setFollowingReaders([])
        return
      }

      setFollowingLoading(true)
      setMessage("")

      const { data: followRows, error: followError } = await supabase
        .from("follows")
        .select("following_id, created_at")
        .eq("follower_id", user.id)
        .order("created_at", { ascending: false })

      if (followError) {
        setMessage(followError.message)
        setFollowingReaders([])
        setFollowingLoading(false)
        return
      }

      const readerIds = [...new Set((followRows || []).map((row) => row.following_id).filter(Boolean))]

      if (!readerIds.length) {
        setFollowingReaders([])
        setFollowingLoading(false)
        return
      }

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, username, display_name, avatar_url, profile_data, stats_data, is_public")
        .in("user_id", readerIds)
        .eq("is_public", true)

      if (profilesError) {
        setMessage(profilesError.message)
        setFollowingReaders([])
        setFollowingLoading(false)
        return
      }

      const profilesByUserId = new Map(
        (profilesData || []).map((reader) => [
          reader.user_id,
          {
            userId: reader.user_id,
            username: reader.username,
            displayName: reader.display_name,
            avatarUrl: reader.avatar_url || reader.profile_data?.avatarUrl || "",
            profileData: reader.profile_data || {},
            statsData: reader.stats_data || {},
          },
        ])
      )

      const orderedReaders = readerIds.map((readerId) => profilesByUserId.get(readerId)).filter(Boolean)
      setFollowingReaders(orderedReaders)
      setFollowingLoading(false)
    }

    loadFollowingReaders()
  }, [user])

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function selectBook(book) {
    const fallbackName = book?.title ? `${book.title} Buddy Read` : ""

    setDraft((current) => ({
      ...current,
      selectedBook: book,
      name: current.name || fallbackName,
    }))
  }

  function toggleReader(reader) {
    setDraft((current) => {
      const isSelected = current.invitedReaders.some((item) => item.userId === reader.userId)

      return {
        ...current,
        invitedReaders: isSelected
          ? current.invitedReaders.filter((item) => item.userId !== reader.userId)
          : [...current.invitedReaders, reader],
      }
    })
  }

  function goNext() {
    if (page === 1 && !draft.name.trim()) {
      setMessage("Give your reading adventure a name before turning the page.")
      return
    }

    if (page === 2 && !draft.selectedBook) {
      setMessage("Choose a book before inviting your reading crew.")
      return
    }

    setMessage("")
    setPage((current) => Math.min(4, current + 1))
  }

  function goBack() {
    setMessage("")
    if (page === 1) {
      setStep("buddyReads")
      return
    }

    setPage((current) => Math.max(1, current - 1))
  }

  async function beginBuddyRead() {
    if (!draft.name.trim() || !draft.selectedBook) {
      setMessage("Add a title and choose a book before beginning.")
      return
    }

    setIsBeginning(true)
    setMessage("")

    const result = await onBeginBuddyRead?.(draft)

    if (result?.ok === false) {
      setMessage(result.error || "Could not begin this Buddy Read yet.")
      setIsBeginning(false)
    }
  }

  return (
    <section>
      <p>Buddy Reads</p>
      <h1>Create a Buddy Read</h1>
      <p>Turn the pages of this little notebook to begin a shared reading adventure.</p>

      <div className="buddy-read-wizard-progress" aria-label="Buddy Read creation progress">
        {[1, 2, 3, 4].map((pageNumber) => (
          <span
            key={pageNumber}
            className={pageNumber === page ? "active" : pageNumber < page ? "complete" : ""}
          >
            {pageNumber}
          </span>
        ))}
      </div>

      {message && <p className="buddy-read-wizard-message">{message}</p>}

      {page === 1 && <BuddyReadStepTitle draft={draft} updateDraft={updateDraft} />}

      {page === 2 && (
        <BuddyReadStepBook
          bookSearch={bookSearch}
          setBookSearch={setBookSearch}
          filteredBooks={filteredBooks}
          draft={draft}
          selectBook={selectBook}
        />
      )}

      {page === 3 && (
        <BuddyReadStepReaders
          crewSearch={crewSearch}
          setCrewSearch={setCrewSearch}
          followingLoading={followingLoading}
          followingReaders={followingReaders}
          filteredReaders={filteredReaders}
          draft={draft}
          toggleReader={toggleReader}
        />
      )}

      {page === 4 && <BuddyReadStepReview draft={draft} profile={profile} user={user} />}

      <div className="buddy-read-wizard-actions">
        <button type="button" onClick={goBack}>{page === 1 ? "Back to Buddy Reads" : "← Back"}</button>
        {page < 4 ? (
          <button type="button" onClick={goNext}>Turn the Page →</button>
        ) : (
          <button type="button" onClick={beginBuddyRead} disabled={isBeginning}>{isBeginning ? "Beginning..." : "Begin Buddy Read"}</button>
        )}
      </div>
    </section>
  )
}
