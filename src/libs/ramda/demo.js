import { curry } from 'ramda'

// Ramda makes it simple for you to build complex logic through functional composition

// `todo list

// filter a TODO list to remove all the completed items

// Plain js
const incompleteTasks = tasks.filter(task => !task.complete)

// Lo-Dash
const incompleteTaks = _.filter(tasks, { complete: false })

// Ramda
const incomplete = R.filter(R.where({ complete: false }))

// the composition is one key techinque of fp

const activeByUser = R.compose(
  groupByUser,
  incomplete
)

const sortUserTasks = R.compose(
  R.map(R.sortBy(R.prop('dueDate'))),
  activeByUser
)

// when you work with fp, all you get is functions forming a pipeline.
// One function feeds data to the next, which feeds it to the next, and so on until the results you need flow out the end.

const incomplete = R.filter(R.where({ complete: false }))
const sortByDate = R.sortBy(R.prop('dueDate'))
const sortByDateDescend = R.compose(
  R.reverse,
  sortByDate
)
const importantFields = R.project(['title', 'dueDate'])
const groupByUser = R.partition(R.prop('username'))
const activeByUser = R.compose(
  groupByUser,
  incomplete
)
const topDataAllUsers = R.compose(
  R.mapObj(
    R.compose(
      importantFields,
      R.take(5),
      sortByDateDescend
    )
  ),
  activeByUser
)

// all the key functions of Ramda are automatically curried.

// The auto-currying of Ramda's functions combine with it's unswerving function-first, data-last API design iswhat makes Ramda so easy to use for this style of functional composition.

// how important is The currying

//before
var getIncompleteTaskSummaries = function(membername) {
  return fetchData()
    .then(function(data) {
      return R.get('tasks', data)
    })
    .then(function(tasks) {
      return R.filter(function(task) {
        return R.propEq('username', membername, task)
      }, tasks)
    })
    .then(function(tasks) {
      return R.reject(function(task) {
        return R.propEq('complete', true, task)
      }, tasks)
    })
    .then(function(tasks) {
      return R.map(function(task) {
        return R.pick(['id', 'dueDate', 'title', 'priority'], task)
      }, tasks)
    })
    .then(function(abbreviatedTasks) {
      return R.sortBy(function(abbrTask) {
        return R.get('dueDate', abbrTask)
      }, abbreviatedTasks)
    })
}

// after
var getIncompleteTaskSummaries = function(membername) {
  return fetchData()
    .then(R.get('tasks'))
    .then(R.filter(R.propEq('username', membername)))
    .then(R.reject(R.propEq('complete', true)))
    .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
    .then(R.sortBy(R.get('dueDate')))
}
