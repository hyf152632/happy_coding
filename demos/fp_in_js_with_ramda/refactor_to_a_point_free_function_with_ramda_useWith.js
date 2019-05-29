const R = require('ramda')
const { find, propEq, useWith, identity } = R

const countries = [
  { cc: 'GB', flag: 'a' },
  { cc: 'US', flag: 'b' },
  { cc: 'CA', flag: 'd' },
  { cc: 'FR', flag: 'e' }
]

// const getCounty = (cc, list) => find(propEq('cc', cc), list)
const getCounty = useWith(find, [propEq('cc'), identity])

const result = getCounty('US', countries)
console.log(result)
