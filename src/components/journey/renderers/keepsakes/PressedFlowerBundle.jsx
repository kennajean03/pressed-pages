import PressedFlower from "../../../scrapbook/PressedFlower/PressedFlower"
import StackedPaperAssembly from "../../../scrapbook/assemblies/StackedPaperAssembly"

const VALID_FLOWER_VARIANTS = [
  "blossom",
  "daisy",
  "rose",
  "sprig",
]

function getFlowerData(
  flower = {}
) {
  return (
    flower.data ||
    flower.payload ||
    flower
  )
}

function getFlowerVariant(
  flower = {}
) {
  const data =
    getFlowerData(flower)

  return (
    data.variant ||
    data.flowerVariant ||
    data.flower_variant ||
    data.flower ||
    ""
  )
}

function getFlowerLabel(
  flower = {}
) {
  const data =
    getFlowerData(flower)

  return (
    data.label ||
    data.flowerLabel ||
    data.flower_label ||
    data.note ||
    data.notes ||
    ""
  )
}

function getFlowerDate(
  flower = {}
) {
  const data =
    getFlowerData(flower)

  return (
    data.date ||
    data.flowerDate ||
    data.flower_date ||
    data.logDate ||
    data.log_date ||
    data.createdAt ||
    data.created_at ||
    ""
  )
}

function hasPreservedFlower(
  flower = {}
) {
  const variant =
    getFlowerVariant(flower)

  return Boolean(
    variant &&
      VALID_FLOWER_VARIANTS.includes(
        variant
      )
  )
}

function PressedFlowerBundle({
  keepsake,
}) {
  const flowers =
    Array.isArray(
      keepsake?.items
    )
      ? keepsake.items
      : []

  const preservedFlowers =
    flowers.filter(
      hasPreservedFlower
    )

  if (!preservedFlowers.length) {
    return null
  }

  return (
    <section className="journey-flower-bundle">
      <header className="journey-flower-bundle__header">
        <p className="scrapbook-kicker">
          Botanical Keepsakes
        </p>

        <h3>
          {keepsake?.title ||
            "Pressed Along the Way"}
        </h3>

        <span className="journey-flower-bundle__count">
          {preservedFlowers.length}{" "}
          preserved{" "}
          {preservedFlowers.length ===
          1
            ? "flower"
            : "flowers"}
        </span>
      </header>

      <div className="journey-flower-bundle__flowers">
        <StackedPaperAssembly recipe="flowerBundle">
          {preservedFlowers.map(
            (
              flower,
              flowerIndex
            ) => (
              <PressedFlower
                key={
                  flower.id ||
                  `keepsake-flower-${flowerIndex}`
                }
                variant={
                  getFlowerVariant(
                    flower
                  )
                }
                label={
                  getFlowerLabel(
                    flower
                  )
                }
                date={
                  getFlowerDate(
                    flower
                  )
                }
                attachment="none"
                rotation={0}
                size="small"
              />
            )
          )}
        </StackedPaperAssembly>
      </div>
    </section>
  )
}

export default PressedFlowerBundle