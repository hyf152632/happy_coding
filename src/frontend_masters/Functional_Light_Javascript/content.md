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
