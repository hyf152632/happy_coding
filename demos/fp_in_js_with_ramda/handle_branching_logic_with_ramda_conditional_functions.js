const R = require('ramda')

const products = [
  { name: 'Jeans', price: 80, category: 'clothes' },
  { name: 'Cards', price: 5, category: 'games' },
  { name: 'iPhone', price: 645, category: 'electronics' },
  { name: 'Freakonomics', price: 30, category: 'books' }
]

const pLens = R.lensProp('price')

const applyDiscount = R.curry((perc, amt) => amt - amt * (perc / 100))

// const adjustPrice = R.over(pLens, applyDiscount(50))
// const adjustPrice = R.ifElse(
//   R.propEq('category', 'clothes'),
//   R.over(pLens, applyDiscount(50)),
//   R.over(pLens, applyDiscount(30))
// )
// const adjustPrice = R.ifElse(
//   R.propEq('category', 'clothes'),
//   R.over(pLens, applyDiscount(50)),
//   R.identity
// )
// =
// const adjustPrice = R.when(R.propEq('category', 'clothes'), R.over(pLens, applyDiscount(50)))
// const adjustPrice = R.unless(R.propEq('category', 'clothes'), R.over(pLens, applyDiscount(50)))
// const adjustPrice = R.cond([
//   [R.propEq('category', 'clothes'), R.over(pLens, applyDiscount(50))],
//   [R.propEq('category', 'electronics'), R.over(pLens, applyDiscount(10))]
// ])
const adjustPrice = R.cond([
  [R.propEq('category', 'clothes'), R.over(pLens, applyDiscount(50))],
  [R.propEq('category', 'electronics'), R.over(pLens, applyDiscount(10))],
  [R.T, R.identity]
])
const result = R.map(adjustPrice, products)

console.log(result)
