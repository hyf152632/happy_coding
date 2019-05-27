const { toPairs, map, join, compose, concat } = require('ramda')

const qsObj = {
  page: '2',
  pageSize: '10',
  total: '203'
}

const createQs = compose(
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs
)

const result = createQs(qsObj)

console.log(result)
