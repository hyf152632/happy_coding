# Functional-Light Javscript

## Why FP ?

> > 代码的三个原则：沟通，简单，灵活

IMPERATIVE vs DECLARATIVE

how vs what

## Function Purity

A function is a relationship between the input and the output.

Avoid side effects where possible, make them obvious otherwise.

extracting impurity

## Argument Adapters

## Point Free

```js
const isOdd = v => v % 2 == 1
const not => fn => (...args) => !fn(...args)

const isEven = not(isOdd)
```

## Closure

Generalized to Specialized

```js
function ajax(url, data, cb) {}
ajax(CUSTOMER_API, { id: 42 }, renderCustomer)

function getCustomer(data, cb) {
  return ajax(CUSTOMER_API, data, cb)
}
getCustomer({ id: 42 }, renderCustomer)

function getCurrentUser(cb) {
  return getCustomer({ id: 42 }, cb)
}
getCurrentUser(renderCustomer)
```

Function Parameter Order:
General --> Specific

for example: Ramda' s data last style 👍

Partial Application vs Currying:
Both are specialization techniques

## Composition

对（数据）做什么（怎么做）

Application = Logic + Control + Data Structures

Application = Composition

why Composition
candy factor example

Associativity:

```js
var f = composeTwo(composeTwo(minus2, triple), increment)
var p = composeTwo(minus2, composeTwo(triple, increment))
f(4) == p(4)
```

Composition with Currying:

```js
const sum = (x, y) => x + y
const triple = x => x ** 3
const divBy = (y, x) => x / y

divBy(2, triple(sum(3, 5)))

sum = curry(2, sum)
divBy = curry(2, divBy)

composeThree(divBy(2), triple, sum(3))(5)
```

## Immutability

assignment immutability

value immutability

Object.freeze

Don't Mutate, Copy

Read-Only Data Structures: Data structures that never need to be mutated

Immutable Data Structures

## Recursion

```js
//version 1
function countVowels(str) {
  if (!str.length) return 0
  var first = isVowel(str[0])
  return first + countVowels(str.slice(1))
}

//version 2
function countVowels(str) {
  var first = isVowel(str[0]) ? 1 : 0
  if (str.length <= 1) return first
  return first + countVowels(str.slice(1))
}

//version 3
// tail calls
function countVowels(str, count = 0) {
  if (!str.length) return count
  var first = isVowel(str[0]) ? 1 : 0
  return countVowels(str.slice(1), count + first)
}

// version 4
// tail calls with curry
var countVowels = curry(2, function countVowels(count, str) {
  count += isVowels(str[0]) ? 1 : 0
  if (str.length <= 1) return count
  return countVowels(count, str.slice(1))
})(0)

//version 5
// CPS
// Continuation-Passing Style
// 了解即可
;('use strict')
function conutVowels(str, cont = v => v) {
  var first = isVowel(str[0]) ? 1 : 0
  if (str.length <= 1) return cont(first)
  return countVowels(str.slice(1), function f(v) {
    return cont(first + v)
  })
}

// version 6
// Tramplines
function trampoline(fn) {
  return function trampolined(...args) {
    var result = fn(...args)

    while (typeof result == 'function') {
      result = result()
    }
    return result
  }
}
var countVowels = trampoline(function countVowels(count, str) {
  count += isVowels(str[0]) ? 1 : 0
  if (str.length <= 1) return count
  return function f() {
    return countVowels(count, str.slice(1))
  }
})
countVowels = curry(2, countVowels)(0)
```

exercise:

```js
// isPalidrome
// isPalidrome('') ----> true
// isPalidrome('abba') -----> true
// isPalidrome('abc') ------> false
function isPalidrome(str) {
  if (str.length <= 1) return true
  const first = str[0]
  const last = str[str.length - 1]
  if (first !== last) return false
  return isPalidrome(str.slice(1, -1))
}
```

tail calls is not go faster than not tail calls.
it's a optimie in bigger sence.

TCO : Tail Call Operation
PTC : Proper Tail Calls

open PTC:

1. must in strict mode
2. recursion must return a function

most recursion that we do, can be rewrite in tail call form.

CPS

Trampolines

```js
function trampolines(fn) {
  return function trampolined(...args) {
    var result = fn(...args)

    while (typeof result == 'function') {
      result = result()
    }
    return result
  }
}
const trampolines = fn => (...args) => {
  var result = fn(...args)
  while (typeof result == 'function') {
    result = result()
  }
  return result
}
```

## List Operations

functor

map

filter

reduce

```js
// compose
function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(function invoke(fn, val) {
      return fn(val)
    }, v)
  }
}
var f = compose(
  div3,
  mul2,
  add1
)
```

## Transduction

Transduction, transducing is composition of reducers

```js
function add1(v) {
  return v + 1
}
function isOdd(v) {
  return v % 2 === 1
}
function sum(total, v) {
  return total + v
}

var list = [1, 2, 3, 4, 6, 8, 10, 15, 18, 21]

//1
list
  .map(add1)
  .filter(isOdd)
  .reduce(sum)

//2
list.reduce(function allAtOnce(total, v) {
  //map
  v = add1(v)
  //filter
  if (isOdd(v)) {
    total = sum(total, v)
  }
  return total
}, 0)

// processure 1
function mapReducer(mappingFn) {
  return function reducer(list, v) {
    list.push(mappingFn(v))
    return list
  }
}

function filterReducer(predicateFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) list.push(v)
    return list
  }
}

list
  .reduce(mapReducer(add1), [])
  .reduce(filterReducer(isOdd), [])
  .reduce(sum)

// processure 2
function listCombination(list, v) {
  list.push(v)
  return list
}

var mapReducer = curry(2, function mapReducer(mappingFn, combineFn) {
  return function reducer(list, v) {
    return combineFn(list, mappingFn(v))
  }
})

var filterReducer = curry(2, function filterReducer(predicateFn, combineFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) return combineFn(list, v)
    return list
  }
})

var transducer = compose(
  mapReducer(add1),
  filterReducer(isOdd)
)

list.reduce(transducer(listCombination), []).reduce(sum)

list.reduce(transducer(sum), 0)

//3
var transducer = compose(
  mapReducer(add1),
  filterReducer(isOdd)
)
//transducer: come a reducer , return a reducer,
transduce(transducer, sum, 0, list)

// apply a general reducer,
// there is sum
into(transducer, 0, list)
```

## Data Structure Operations

map on object

```js
function reduceObj(reducerFn, initialValue, o) {
  let ret = initialValue || null
  const keys = Object.key(o)
  for (let key of keys) {
    ret = reducerFn(ret, o[key])
  }
  return ret
}
```

Monad Data Structure

a Monad is a wrapper, around the value with a set of behaviors in it that is going to make that value.

a monad has a map method on it, then it's a functor.

Monad: amonoid in the category of endofunctors

Monad: a pattern for pairing data with a set of predictable behaviors that let it interact with other data+behavior pairings(monads)

```js
function Just(val) {
  return { map, chain, ap }
  function map(fn) {
    return Just(fn(val))
  }
  // aka: bind, flatMap
  // aka(also known as)
  function chain(fn) {
    return fn(val)
  }
  function ap(anotherMonad) {
    return anotherMonad.map(val)
  }
}

var fortyOne = Just(41)
var fortyTwo = fortyOne.map(function inc(v) {
  return v + 1
})

function identity(v) {
  return v
}
//debug inspection:
fortyTwo.chan(identity)

var user1 = Just('Kyle')
var user2 = Just('Susan')

var tuple = curry(2, function tuple(x, y) {
  return [x, y]
})

var users = user1.map(tuple).ap(user2)

// debug inspection:
users.chain(identity)
```

Maybe Monad

```js
var someObj = { something: { else: { entirely: 42 } } }
// someObj.something.else.entirely

function Nothing() {
  return {
    map: Nothing,
    chain: Nothing,
    ap: Nothing
  }
}

var Maybe = { Just, Nothing, of: Just }

function fromNullable(val) {
  if (val == null) return Maybe.Nothing()
  else return Maybe.of(val)
}

var prop = curry(2, function prop(prop, obj) {
  return fromNullable(obj[prop])
})

Maybe.of(someObj)
  .chain(prop('something'))
  .chain(prop('else'))
  .chain(prop('entirely'))
  .chain(identity)
```

There are many kinds of monads:
Just, Nothing, Maybe, Either, IO, etc

## Async

Rxjs

Rx.Subject()

## Functional JS Utils

### Lodash/FP

```js
const fp = require('lodash/fp')
fp.reduce((acc, v) => acc + v, 0, [3, 7, 9])

const f = fp.curryN(3, function f(x, y, z) {
  return x + y * z
})

const g = fp.compose([fp.add(1), f(1, 4)])
```

### Ramda

recommend

### fpo

Named arguments

```js
FPO.std.reduce((acc, v) => acc + v, undefined, [2, 3, 9])

// named-argument method style
FPO.reduce({
  arr: [2, 3, 9],
  fn: ({ acc, v }) => acc + v
})
```

## Wrapping up

- Functions(point-free)
- Closure
- Composition
- Immutability
- Recursion
- Lists & Data Structures
- Async(observables)
