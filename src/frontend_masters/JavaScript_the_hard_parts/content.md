# title

Principles of Js:
Global Execution Context
Local Execution Context
Call Stack

FP

Pair programming

```js
const operateArrItem = (callback, arr = []) => {
  return arr.map(callback)
}
const curry = (number, fn, args = []) =>
  args.length === number ? fn.apply(null, args) : arg => curry(number, fn, [...args, arg])
const add3 = x => x + 3
const addArrItemBy3 = curry(2, operateArrItem)(add3)
console.log(addArrItemBy3([1, 2, 3]), '--------')
```

Closure

when our functions get called, we create a live store of data (local memory/varible environment/state)
for that function's execution context.

when the function finished executing, its local memory is deleted(except the returned value)

But what if our functons could hold on to live data/state between executions?

This would let our function definitions have an associated cache/persistent memory

But it starts with returning us returning a function from another function.

with Closure , Our functions get 'memories' - once, memoize

Advanced: We can implemet the module pattern in javascript

```js
const once = fn => {
  let cacheResult = null

  return (...args) => {
    if (!cacheResult) {
      return (cacheResult = fn(...args))
    }
    return cacheResult
  }
}

const getNumOne = () => 1
const getNumOneOnce = once(getNumOne)
console.log(getNumOneOnce())
console.log(getNumOneOnce())
```

Asynchronous JavaScript

```js
const delay = (fn, time = 1000) =>
    return setTimeout(() => resolve(fn()), time)
  })

console.log('begin')
delay(() => console.log('run delay'), 3000)
console.log('end')
```

```js
const delay = (fn, time = 1000) => (...args) =>
  new Promise((resolve, reject) => {
    return setTimeout(() => resolve(fn(...args)), time)
  })

const sayHello = () => 'hello'

const delayedSayHello = delay(sayHello)

delayedSayHello().then(console.log)
```

Object-Oriented JavaScript

an enormously popular paradigm for structuring our complex code

- easy to add features and functionality
- performant(efficient in terms of memory)
- easy for use and other developers to reason about(a clear structure)

Encapsulation - binding together the data and functions that manipulation

```js
const curry = (fn, cachedArgs = []) => (...args) => {
  cachedArgs = [...cachedArgs, ...args]
  if (cachedArgs.length === fn.length) {
    return fn(...cachedArgs)
  }
  return curry(fn, cachedArgs)
}
```
