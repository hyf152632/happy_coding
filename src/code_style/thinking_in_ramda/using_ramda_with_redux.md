# Using Ramda With Redux

[addr](http://randycoulman.com/blog/2016/02/16/using-ramda-with-redux/)

Ramda bills itself as “a practical functional library for JavaScript programmers.” It provides many of the capabilities that functional programmers are used to. Unlike something like Immutable, it works with plain JavaScript objects.

Let’s look at some ways we can use Ramda when writing Redux code.

- Writing Reducers
  here are a few ways to write this Ramda. Here’s a pretty direct port:
  `js assoc('completed', !state.completed, state)`
  If the property to adjust is deeper in the object structure, you can use assocPath instead.

      Another way to write this is to use evolve:
      ```js
      evolve({
        completed: not
        }, state)
      ```

  For a transformation this simple, I’d likely stick with the ES7 object spread syntax. But as your reducers get a bit more complicated, using Ramda can greatly simplify the code, as we’ll see in a moment.

  ```js
  {
  ...state,
  board: update(index, state.nextToken, state.board),
  nextToken: nextToken(state.nextToken)
  }
  function nextToken(token) {
  return token === 'X' ? 'O' : 'X'
  }
  ```

- Mapping State to Props

```js
function mapStateToProps(state) {
  return pick(['board', 'nextToken'], state)
}
// Notice that we’re passing state into our function, and then passing it along to pick.
// When we see this pattern, it’s a clue that we can take advantage of currying. Let’s do that here:
const mapStateToProps = pick(['board', 'nextToken'])
```

- creating reducers

```js
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

// Using Ramda’s propOr and identity functions, we can simplify the body of the reducer function quite a bit:
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    propOr(identity, action.type, handlers)(state, action)
  }
}

// We can an ES6 arrow function to simplify this further:
function createReducer(initialState, handlers) {
  return (state = initialState, action) => propOr(identity, action.type, handlers)(state, action)
}
```
