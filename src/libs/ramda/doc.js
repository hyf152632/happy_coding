import {
  defaultTo,
  groupBy,
  T,
  cond,
  lt,
  __,
  always,
  ifElse,
  has,
  over,
  lensProp,
  inc,
  assoc,
  into,
  compose,
  add,
  take,
  map,
  pipe,
  otherwise,
  then,
  pick,
  range,
  when,
  propSatisfies,
  gt,
  append,
  join,
  where,
  equals,
  complement,
  type,
  split,
  reduce,
  values,
  max
} from 'ramda'

const default12 = defaultTo(12)
console.log(default12(null))

const scoreCond = cond([
  [lt(__, 65), always('F')],
  [lt(__, 70), always('D')],
  [lt(__, 80), always('B')],
  [lt(__, 90), always('C')],
  [T, always('A')]
])

const byGrade = groupBy(({ score }) => scoreCond(score))

const students = [
  { name: 'Abby', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Andy', score: 100 },
  { name: 'Jack', score: 69 }
]

console.dir(byGrade(students))

const incCount = ifElse(has('count'), over(lensProp('count'), inc), assoc('count', 1))

console.log(incCount({}))
console.log(incCount({ count: 1 }))

const numbers = [1, 2, 3, 4]
const transducer = compose(
  map(add(2)),
  take(2)
)
console.log(into([], transducer, numbers))

const failedFetch = id => Promise.reject('bad ID')
const useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
const recoverFromFailure = pipe(
  failedFetch,
  otherwise(useDefault),
  then(pick(['firstName', 'lastName', 'gender']))
)
console.log(recoverFromFailure(13432).then(console.dir))

console.log(range(1, 4))

const truncate = when(
  propSatisfies(gt(__, 10), 'length'),
  pipe(
    take(10),
    append('...'),
    join('')
  )
)

console.log(truncate('12345'))
console.log(truncate('233985984539843'))

const pred = where({
  a: equals('foo'),
  b: complement(equals('bar')),
  x: gt(__, 10),
  y: lt(__, 20)
})

pred({ a: 'foo', b: 'xxx', x: 12, y: 14 })

//返回字符串中数量最多的字符的个数

/**
 * get maximum count letter in a string
 * @param {string} str=[''] - the string
 * @returns {number}
 */
const getMaxCountLetterInStr = (str = '') => {
  if (typeof str !== 'string') return 0
  const letterCountMap = str
    .split('')
    .reduce(
      (acc, curr) =>
        acc[curr]
          ? Object.assign({}, acc, { [curr]: ++acc[curr] })
          : Object.assign({}, acc, { [curr]: 1 }),
      Object.create(null)
    )
  return Object.entries(letterCountMap).reduce(
    (acc, curr) => (curr && curr[1] && curr[1] > acc ? curr[1] : acc),
    0
  )
}

console.log(getMaxCountLetterInStr('accddd'))

const strToArr = split('')
const isStr = param => equals(type(param), 'String')
const hasLetter = (acc, curr) => has(curr)(acc)

const getLetterCountMap = reduce(
  ifElse(
    hasLetter,
    (acc, curr) => Object.assign({}, acc, { [curr]: inc(acc[curr]) }),
    (acc, curr) => Object.assign({}, acc, { [curr]: 1 })
  ),
  {}
)
const getMaxNumInArr = (arr = []) => Math.max.apply(null, arr)
console.log(getLetterCountMap(['a', 'b', 'a']))

/**
 * get maximum count letter in a string
 * @param {string} str=[''] - the string
 * @returns {number}
 */
const getMaxCountLetterInStr_ramda = ifElse(
  isStr,
  compose(
    getMaxNumInArr,
    values,
    getLetterCountMap,
    strToArr
  ),
  always(0)
)

console.log(getMaxCountLetterInStr_ramda('adkfjdaase'))
