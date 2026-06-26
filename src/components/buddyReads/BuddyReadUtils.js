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
