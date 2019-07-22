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
