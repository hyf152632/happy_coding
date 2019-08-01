# title

Async Patterns

- Parallel vs Async
- Callbacks
- thunks
- Promises
- Generators/Coroutines
- Event Reactive(observables)
- CSP(channel-oriented concurrency)

## Callbacks

Callback Hell

```js
setTimeout(function() {
  console.log('one')
  setTimeout(function() {
    console.log('two')
    setTimeout(function() {
      console.log('three')
    }, 1000)
  }, 1000)
}, 1000)

function one(cb) {
  console.log('one')
  setTimeout(cb, 1000)
}
function two(cb) {
  console.log('two')
  setTimeout(cb, 1000)
}
function three() {
  console.log('three')
}
one(function() {
  two(three)
})
```

✏️：

1. This exercise calls for you to write some async flow-control code.
   To start off with, you'll use call backs only.
2. Expected behavior:

- Reques all 3 files at the same time(in 'parallel')
- Render them ASAP(don't justblindly wait for all to finish loading)
- But, render them in proper (obvious) order: 'file1', 'file2', 'file3'
- After all 3 are done, output 'Complete!'

```js
// my solve
const fs = require('fs')

const readFileConcurrentWithCallback = (fileNames, cb) => {
  const result = []
  const isComplete = result.length === fileNames.length
  const completeText = 'Complete!'
  const checkIsComplete = () => {
    if (isComplete) {
      console.log(completeText)
      return cb(result)
    }
    return
  }

  const readFile = (fileName, ind) => {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        result[ind] = -1
        return checkIsComplete()
      }
      result[ind] = data
      return checkIsComplete()
    })
  }
  fileNames.map((fileName, ind) => readFile(fileName, ind))
}

readFileConcurrentWithCallback(['file1', 'file2', 'file3'], console.log)
```

Callback Problems:

- Inversion of Control
  when i given that callback to somebody else, That's what inverts the control and
  it puts them in control of when and in what manner to execute the second half of my program.

  ```js
  // control
  setTimeout(function() {
    // inverson of Control
    // inverson of Control
  })
  // control
  ```

  example:

  ```js
  // trackCheckout 如果是第三方提供的 api
  // 第三方就可以控制我们传入的回调函数的执行位置和执行方式
  // 也就是控制反转
  trackCheckout(purchaseInfo, function finish() {
    chargeCreditCard(purchaseInfo)
    showThankYouPage()
  })

  // 保证回调只会执行一次
  let hasBeenCalled = false
  trackCheckout(purchaseInfo, function finish() {
    if (!hasBeenCalled) {
      hasBeenCalled = true
      chargeCreditCard(purchaseInfo)
      showThankYouPage()
    }
  })
  ```

- Not Reason-able

## Thunks

a thunk is a function with some closure state keeping track of some value, that has everything already that it needs to do
to give you some value back.

```js
// sync thunk
function add(x,y) {
  return x + y
}

var thunk = funtion() {
  return add(10, 15)
}

thunk()

// async thunk
// the thunk need you privide a callback that you can get the value out.
function addAsync(x, y, cb) {
  setTimeout(function() {
    cb(x + y)
  }, 1000)
}
const thunk = function(cb) {
  addAsync(10, 15, cb)
}
thunk(function(sum) {
  sum;
})

function makeThunk(fn) {
  const args = [].slice.call(arguments, 1)
  return function(cb) {
    args.push(cb)
    fn.apply(null, args)
  }
}

function addAsync(x, y, cb) {
  setTimeout(function() {
    cb(x + y)
  }, 1000)
}
const thunk = makeThunk(addAsync, 10, 15)
thunk(function(sum) {
  console.log(sum)
})
```

✏️：
chunk version getFile:

```js
function getFile(file) {
  let text, fn
  fakeAjax(file, function(response) {
    if (fn) fn(response)
    else text = response
  })
  return function(cb) {
    if (text) cb(text)
    else fn = cb
  }
}

var th1 = getFile('file1')
var th2 = getFile('file2')
var th3 = getFile('file3')
th1(function(text1) {
  output(text)
  th2(function(text2) {
    output(text2)
    th3(function(text3) {
      output(text3)
      output('Complete!')
    })
  })
})
```

## Promises

```js
function finish() {
  chargeCreditCard(purchaseInfo)
  showThankYouPage()
}
function error(err) {
  logStatsError(err)
  finish()
}
const listener = trackCheckout(purchaseInfo)

listener.on('completion', finish)
listener.on('error', error)

function trackCheckout(info) {
  return new Promise(
    funtion(resolve, reject) {
      // attempt to track the checkout

      // if successful, call resolve()
      // if error, call reject()
    }
  )
}

const promise = trackCheckout(purchaseInfo)
promise.then(
  finish,
  error
)
```

Promise Trust:

- only resolved once
- either success OR error
- messages passed/kept
- exceptions become errors
- immutable once resolved

```js
function getData(d) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {resolve(d)}, 1000)
  })
}
let x
getData(10).then(function(num1) {
  x = 1 + num1
  return getData(30)
}).then(function(num2) {
  let y = 1 + num2
  return getData('Meaning of life: " + (x + y))
}).then(function(answer) {
  console.log(answer)
})
```

```js
// promise getFile
function getFile(file) {
  return new Promise((resolve, reject) => {
    fakeAjax(file, (error, data) => {
      if (error) {
        return reject(error)
      }
      return resolve(data)
    })
  })
}

const p1 = getFile('file1')
const p2 = getFile('file2')
const p3 = getFile('file3')

p1.then(output)
  .then(() => p2)
  .then(output)
  .then(() => p3)
  .then(output)
  .then(() => output('Complete!'))

['file1', 'file2', 'file3']
.map(getFile)
.reduce((chain, curr) => {
  return chain.then(() => curr)
              .then(output)
}, Promise.resolve())
.then(() => output('Complete!'))

Promise.all([p1, p2, p3]).then(rets => (rets.map(output), output('Complete!'))
```

```js
const p = trySomeAsyncThing()

Promise.race([
  p,
  new Promise(functon(_, reject) {
    setTimeout(function() {
      reject('Timeout')
    }, 3000)
  })
]).then(success, error)
```

Sequence = automatically chained promises

```js
function getData(d) {
  return ASQ(function(done) {
    setTimeout(function() {
      done(d)
    }, 1000)
  })
}

ASQ()
  .waterfull(
    function(done) {
      getData(10).pipe(done)
    },
    function(done) {
      getData(30).pipe(done)
    }
  )
  .seq(function(num1, num2) {
    var x = 1 + num1
    var y = 1 + num2
    return getData('Meaning of life: ' + (x + y))
  })
  .val(function(answer) {
    console.log(answer)
  })
```

## Generators

```js
const lazy = function*() {
  let iter = 0
  while (true) {
    yield ++iter
  }
}

const lazyIter = lazy()
for (let i = 0; i < 10; i++) {
  console.log(lazyIter.next())
}

const msgTransFn = function*() {
  console.log('begin')
  const msg1 = yield 'before msg1'
  console.log(msg1, 'msg1')
  const msg2 = yield 'before msg2'
  console.log(msg2, 'msg2')
  yield
  console.log('end')
}
let acMsgTransFn = msgTransFn()
acMsgTransFn.next('dkfjf')
acMsgTransFn.next('for msg1')
acMsgTransFn.next('for msg2')
acMsgTransFn.next()

var run = coroutine(function*() {
  var x = 1 + (yield)
  var y = 1 + (yield)
  yield x + y
})

run()
run(10)
console.log('Meaning of life:' + run(30).value)

function getData(d) {
  setTimeout(function() {
    run(d)
  }, 1000)
}
var run = coroutine(function*() {
  var x = 1 + (yield getData(10))
  var y = 1 + (yield getData(30))
  var answer = yield getData('Meaning of life: ' + (x + y))
  console.log(answer)
})
run()
```

```js
ASQ().runner(function* main() {
  var p1 = getFile('file1')
  var p2 = getFile('file2')
  var p3 = getFile('file3')

  output(yield p1)
  output(yield p2)
  output(yield p3)
  output('Complete!')
})
```

What is 'callback hell'? Why do callbacks suffer from 'inversion of control' and 'unreasonablitiy'

## Observables

Observable is kind of like a chain of calculated fields in a spreadsheet
data flow

## CSP

Concurrency(+ Channels)

Communicating Sequential Processes

```js
const ch = chan()

function* process1() {
  yield put(ch, 'hello')
  const msg = yield take(ch)
  console.log(msg)
}

function* process2() {
  const greeting = yield take(ch)
  yield put(ch, greegting + ' World')
  console.log('done!')
}

csp.go(function*() {
  var table = csp.chan()

  csp.go(player, ['ping', table])
  csp.go(player, ['pong', table])

  yield csp.put(table, { hits: 0 })
  yield csp.timeout(1000)
  table.close()
})

function* player(name, table) {
  while (true) {
    var ball = yield csp.take(table)
    if (ball === csp.CLOSED) {
      console.log(name + ": table's gone")
      return
    }
    ball.hits += 1
    console.log(name + ' ' + ball.hits)
    yield csp.timeout(100)
    yield csp.put(table, ball)
  }
}
```
