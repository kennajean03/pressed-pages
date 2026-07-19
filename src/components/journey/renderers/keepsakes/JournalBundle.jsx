function JournalBundle({ keepsake }) {
  return (
    <div className="journey-journal-bundle">
      <h4>Journal Bundle</h4>

      <pre>
        {JSON.stringify(
          keepsake,
          null,
          2
        )}
      </pre>
    </div>
  )
}

export default JournalBundle