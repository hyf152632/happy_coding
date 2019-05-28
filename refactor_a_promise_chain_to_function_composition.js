const { prop, filter, map, sortBy, propEq, join, compose, pluck } = require('ramda')

const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,5C,3D'

const getDeckId = prop('deck_id')
const drawCards = id =>
  fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?`).then(res => res.json())
const getCards = prop('cards')
const justClubs = filter(propEq('suit', 'CLUBS'))
const sortByValue = sortBy(prop('value'))
const pluckImg = pluck('image')
const toImgString = compose(
  join(''),
  map(u => `<img width='100' src="${u}" />`)
)
const render = imgString => {
  document.querySelector('#cards').innerHTML = `<div>${imgString}</div>`
}
const transformData = compose(
  toImgString,
  pluckImg,
  sortByValue,
  justClubs,
  getCards
)

fetch(deckUrl)
  .then(res => res.json())
  .then(getDeckId)
  .then(drawCards)
  .then(
    compose(
      render,
      transformData
    )
  )
