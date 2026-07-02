export const scrapbookLayers = {
  background: 0,

  basePaper: 10,
  backingPaper: 20,
  paper: 30,

  photo: 40,
  polaroid: 45,

  writing: 50,
  tab: 55,

  tape: 60,
  clip: 70,
  flower: 80,
  sticker: 90,

  hover: 100,
  modal: 1000,
}

export function getScrapbookLayer(layer = "paper") {
  return scrapbookLayers[layer] ?? scrapbookLayers.paper
}