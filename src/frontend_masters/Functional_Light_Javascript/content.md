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
