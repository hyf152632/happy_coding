const R = require('ramda')

// const add = a => b =>  a + b
// const add = R.curry((a, b) => a + b)
const add = R.curryN(2, (a, b) => a + b)

// const mult = a => b => a * b
// const multiply = R.uncurryN(2, mult)
// const inc = add(1)

const result = add(1)(3)
console.log(result)
