export const scrapbookLayers = {
  background: 0,
  paper: 10,
  photo: 20,
  writing: 30,
  tab: 35,
  tape: 40,
  clip: 50,
  flower: 60,
  sticker: 70,
  hover: 80,
  modal: 100,
}

export function getScrapbookLayer(layer = "paper") {
  return scrapbookLayers[layer] ?? scrapbookLayers.paper
}