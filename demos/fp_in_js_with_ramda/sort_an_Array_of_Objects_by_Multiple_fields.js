const { prop, sort, sortWith, ascend, descend } = require('ramda')

const sample = [
  { name: 'Sally', age: 28, height: 48 },
  { name: 'Zac', age: 30, height: 89 },
  { name: 'John', age: 23, height: 83 },
  { name: 'Lisa', age: 24, height: 56 }
]
// const result = sort(ascend(prop('age')), sample)

const result = sortWith(
  [ascend(prop('age')), descend(prop('height')), ascend(prop('name'))],
  sample
)
console.log(result)
