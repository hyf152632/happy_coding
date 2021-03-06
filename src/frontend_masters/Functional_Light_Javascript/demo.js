// extracting impurity

// before
function addComment(userID, comment) {
  var record = {
    id: uniqueID(),
    userID,
    text: comment
  }
  var elem = buildCommentElement(record)
  commentsList.appendChild(elem)
}

//after
const commentId = uniqueId()
const genRecord = (userID, comment, commentId) => ({ id: commentId, userID, text: comment })
const addComment = elem => commentsList.appendChild(elem)

addComment(buildCommentElement(genRecord(41, 'This is my first comment!')))

const copyParam = (param = []) => {
  param = param.slice()
  return [...param, 'whatever']
}

const uniary = fn => arg => fn(arg)

const binary = fn => (arg1, arg2) => fn(arg1, arg2)

const flip = fn => (arg1, arg2, ...args) => fn(arg2, arg1, ...args)

const reverseArgs = fn => (...args) => fn(args.reverse())

const spreadArgs = fn => args => fn(...args)

const unspreadArgs = fn => (...args) => fn(args)

getPerson(person => renderPerson(person))
getPerson(renderPerson(person))

function strBuilder(str) {
  return function next(v) {
    if (typeof v === 'string') {
      return strBuilder(str + v)
    }
    return str
  }
}

// lazy
function repeater(count) {
  return function allTehAs() {
    return ''.padStart(count, 'A')
  }
}

function repeater(count) {
  var str
  return function allTehAs() {
    if (str === undefined) {
      str = ''.padStart(count, 'A')
    }
    return str
  }
}

// Changing Function Shape with Curry
function add(x, y) {
  return x + y
}
;[0, 2, 4, 6, 8].map(function addOne(v) {
  return add(1, v)
})

add = curry(add)
;[0, 2, 4, 6, 8].map(add(1))

const compose = (...fns) => fns.reduce((fn2, fn1) => (...args) => fn2(fn1(...args)))

function add(x, y) {
  return x + y
}
function add2(fn1, fn2) {
  return add(fn1(), fn2())
}
function constant(x) {
  return function f() {
    return x
  }
}

var five = constant(5)
var nine = constant(9)

function addn(...fns) {
  while (fns.length > 2) {
    let [fn0, fn1, ...rest] = fns
    fns = [
      function f() {
        return add2(fn0, fn1)
      },
      ...rest
    ]
  }
  return add2(fns[0], fns[1])
}
