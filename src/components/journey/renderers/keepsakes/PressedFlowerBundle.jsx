function PressedFlowerBundle({ keepsake }) {
  return (
    <div className="journey-flower-bundle">
      <h4>Pressed Flower Bundle</h4>

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

export default PressedFlowerBundle