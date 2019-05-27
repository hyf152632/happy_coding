const R = require('ramda')

const person = {
  name: 'Sally Jones'
}
// const getName = R.prop('name')

// const getName = R.tryCatch(R.prop('name'), R.always('Default'))
const getName = R.propOr('Default', 'name')

const getUpperName = R.pipe(
  getName,
  R.toUpper
)

const result = getUpperName(person)

console.log(result)
