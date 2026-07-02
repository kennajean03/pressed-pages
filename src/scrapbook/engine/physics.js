export const scrapbookPhysics = {
  tilt: {
    none: "rotate(0deg)",
    tinyLeft: "rotate(-0.4deg)",
    tinyRight: "rotate(0.4deg)",
    smallLeft: "rotate(-0.9deg)",
    smallRight: "rotate(0.9deg)",
    mediumLeft: "rotate(-1.6deg)",
    mediumRight: "rotate(1.6deg)",
  },

  lift: {
    flat: "0 8px 18px rgba(79, 59, 51, 0.08)",
    soft: "0 14px 30px rgba(79, 59, 51, 0.12)",
    medium: "0 20px 42px rgba(79, 59, 51, 0.15)",
    high: "0 28px 58px rgba(79, 59, 51, 0.18)",
  },

  opacity: {
    faint: 0.16,
    soft: 0.32,
    medium: 0.58,
    strong: 0.82,
  },
}

export function getScrapbookTilt(tilt = "none") {
  return scrapbookPhysics.tilt[tilt] || scrapbookPhysics.tilt.none
}

export function getScrapbookLift(lift = "soft") {
  return scrapbookPhysics.lift[lift] || scrapbookPhysics.lift.soft
}