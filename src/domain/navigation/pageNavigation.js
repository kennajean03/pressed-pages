export const PAGE_TITLES = {
  home: "Home",
  0: "Book Information",
  1: "Book Score",
  2: "Romance Metrics",
  3: "Scrapbook Notes",
  4: "Obsession & Recommendation",
  5: "Review Summary",
  activityFeed: "Activity Feed",
  communityChallenges: "Challenge Hub",
  buddyReads: "Buddy Reads",
  createBuddyRead: "Create Buddy Read",
  addBook: "Add Book",
  alreadyRead: "Already Read",
  backlogImport: "Backlog Import",
  analytics: "Reading Almanac",
  currentlyReading: "Currently Reading",
  dnf: "DNF Notes",
  dnfSummary: "DNF Summary",
  editProfile: "Edit Profile",
  library: "Library",
  profile: "Reader Profile",
  publicProfilePreview: "Public Profile Preview",
  publicProfileView: "Public Profile",
  readingLog: "Reading Log",
  readingSummary: "Reading Summary",
  reviewGraphic: "Review Graphic",
  viewReview: "Book Review",
  findReaders: "Find Readers",
  notifications: "Notifications",
  settings: "Settings & Privacy",
  followers: "Followers",
  following: "Following",
}

export const REVIEW_EDITOR_BACK_STEPS = {
  0: "home",
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  readingSummary: 0,
  dnf: 0,
  dnfSummary: "dnf",
}

export const PAGE_BACK_STEPS = {
  activityFeed: "home",
  communityChallenges: "home",
  buddyReads: "communityChallenges",
  createBuddyRead: "buddyReads",
  addBook: "home",
  alreadyRead: "addBook",
  backlogImport: "addBook",
  analytics: "home",
  currentlyReading: "home",
  editProfile: "profile",
  library: "home",
  profile: "home",
  settings: "profile",
  publicProfilePreview: "profile",
  publicProfileView: "home",
  readingLog: "currentlyReading",
  reviewGraphic: "viewReview",
  viewReview: "library",
  findReaders: "home",
  notifications: "home",
}

export function getPageTitle(
  step,
  bookStatus,
  {
    libraryFilter,
    analyticsTab,
  } = {}
) {
  if (step === "readingSummary" && bookStatus === "TBR") {
    return "TBR Summary"
  }

  if (step === "library" && libraryFilter === "tbr") {
    return "TBR"
  }

  if (step === "analytics" && analyticsTab === "wrapUps") {
    return "Wrap-Ups"
  }

  return PAGE_TITLES[step] || "Pressed Pages"
}
