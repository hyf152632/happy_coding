const R = require('ramda')

const { unfold, curry } = R

// const toTwenty = n => n > 20 ? false : [n, n + 1]
const throughNByOne = curry((limit, n) => (n > limit ? false : [n, n + 1]))

// const result = unfold(toTwenty, 1)
const result = unfold(throughNByOne(15), 1)
console.log(result)
