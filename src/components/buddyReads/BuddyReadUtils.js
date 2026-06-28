export function getBookStatusLabel(status) {
  if (status === "Reading") return "Currently Reading"
  if (status === "TBR") return "Want To Read"
  if (status === "Finished") return "Finished"
  if (status === "DNF") return "DNF Shelf"
  return "Library Book"
}

export function getBookStatusIcon(status) {
  if (status === "Reading") return "📖"
  if (status === "TBR") return "📚"
  if (status === "Finished") return "✓"
  if (status === "DNF") return "🌧️"
  return "📕"
}

export function getReaderName(reader) {
  return (
    reader?.profileData?.displayName ||
    reader?.displayName ||
    reader?.display_name ||
    reader?.username ||
    "Pressed Pages Reader"
  )
}

export function getReaderInitial(reader) {
  const name = getReaderName(reader)
  return name.trim().charAt(0).toUpperCase() || "R"
}

export function getBuddyReadMilestoneSticker(type) {
  if (type === "started") return "🌱"
  if (type === "quarter") return "📖"
  if (type === "halfway") return "🎉"
  if (type === "almostDone") return "✨"
  if (type === "finished") return "⭐"
  if (type === "complete") return "🏆"
  return "🌸"
}

export function getBuddyReadMilestoneLabel(type) {
  if (type === "started") return "Started Reading"
  if (type === "quarter") return "25% Milestone"
  if (type === "halfway") return "Halfway There"
  if (type === "almostDone") return "Almost Finished"
  if (type === "finished") return "Reader Finished"
  if (type === "complete") return "Buddy Read Complete"
  return "Milestone"
}