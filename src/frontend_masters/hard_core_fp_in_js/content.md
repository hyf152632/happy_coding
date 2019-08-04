# title

The Symptoms

- Custom names
- Looping patterns
- Glue code
- Side effects

Omit Needless Names

separate inputs from environment

```js
function daysThisMonth() {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth(),
    start = new Date(y, m, 1),
    end = new Date(y, m + 1, 1)
  return (end - start) / (1000 * 60 * 60 * 24)
}

// always works the same
function daysInMonth(y, m) {
  var start = new Date(y, m - 1, 1),
    end = new Date(y, m, 1)
  return (end - start) / (1000 * 60 * 60 * 24)
}
```

recognize pure functions

Functions that don't chage anything are called 'pure'.

Their purity makes them

- testable
- memoizable
- portable
- parallelizable

Every function is a single-valued collection

Curry

```js
function curry(fn) {
  return function() {
    if (fn.length > arguments.length) {
      let slice = Array.prototype.slice
      let args = slice.apply(arguments)
      return function() {
        return fn.apply(null, arg.concat(slice.apply(arguments)))
      }
    }
    return fn.apply(null, arguments)
  }
}
```

Compose

```js
function compose(g, f) {
  return function(x) {
    return g(f(x))
  }
}
```

recognize most loops are one of: map, filter, reduce

- Make all function inputs explicit as arguments
- These arguments can be provided over time, not just all at once
- Try not to modify outside things
- Compose without 'glue' variables

Category Theory:
add(1, 1) => 2

// associative
add(add(1, 2), 4) == add(1, add(2, 4))

// commutative
add(4, 1) == add(1, 4)

//identity
add(n, 0) == n

//distributive
multiply(2, add(3, 4)) == add(multiply(2, 3), multiply(2, 4))

```js
var _Container = function(val) {
  this.val = val
}

// map
_Container.prototype.map = function(fn) {
  return Container(f(this.val))
}

var Container = function(x) {
  return new _Container(x)
}

Container(3)
// => _Container(val: 3)

capitalize('flamethrower')
// => 'Flamethrower'

capitalize(Container('flamethrower'))
// => [object Object]

Container('flamethroser').map(function(s) {
  return capitalize(s)
})

Container('flamethroser').map(capitalize)

Container(3).map(add(1))
// => _Container(4)

Container([1, 2, 3])
  .map(reverse)
  .map(first)
// => Container(3)

const map = _.curry(function(f, obj) {
  return obj.map(f)
})

Container(3).map(add(1))
// Container(4)

map(add(1), Container(3))
// Container(4)

map(
  compose(
    first,
    reverse
  ),
  Container('dog')
)
// => Container('g')
```

Functor

'An object or data structure you can map over'

functons: map

```js
// Them pesky nulls
const getElement = document.querySelector
const getNameParts = compose(
  split(''),
  get('value'),
  getElement
)

getNameParts('#full_name')
```

Maybe

- Captures a null check
- The value inside may not be there
- Sometimes has two subclasses Just / Nothing
- Sometimes called Option with subclasses Some / None

```js
const _Maybe.prototype.map = function(f) {
  return this.val ? Maybe(f(this.val)) : Maybe(null)
}

map(capitalize, Maybe('flamethrower'))

const firstMatch = compose(first, match(/cat/g))

firstMatch('dogsup')
// => Boom!

const firstMatch = compose(map(first), Maybe, match(/cat/g))

firstMatch('dogsup')
// => Maybe(null)
```

exercises:

```js
const xs = Identity(['do', 'ray', 'me', 'fa', 'so'])

const ex2 = map(_.head)

const result = map(_.head, xs)
// Identity('blah)

const safeGet = _.curry(function(x, o) {
  return Maybe(o[x])
})
const user = { id: 2, name: null }

const ex3 = compose(
  map(_.head),
  safeGet('name')
)

const ex4 = function(n) {
  if (n) {
    return parseInt(n)
  }
}

const ex4 = compose(
  map(parseInt),
  Maybe
)
```

Either

Typically used for pure error handling
Like Maybe, but with an error message embedded
Has two subclasses: Left/Right
Maps the function over a Right, ignores the Left

```js
map(function(x) {
  return x + 1
}, Right(2))
// => Right(3)

map(function(x) {
  return x + 1
}, Left('some message'))
// => Left('some message')

const determineAge = function(user) {
  return user.age ? Right(user.age) : Left(`couldn't get age`)
}

const yearOlder = compose(
  map(add(1)),
  determineAge
)

yearOlder({ age: 22 })
// => Right(23)

yearOlder({ age: null })
// => Left('couldn't get age')
```

IO

a lazy computation 'builder'
Typically used to contain side effects
You must runIO to perform the operation
Map appends the function to a list of things to run with the effectful value.

```js
const emial_io = IO(function() {
  return $('#email').val()
})
const msg_io = map(concat('welcome'))
runIO()

const getBgColor = compose(
  get('background-color'),
  JSON.parse
)
const bgPref = compose(
  map(getBgColor),
  Store.get('preferences')
)

const app = bgPref()
// => IO()

runIO(app)
```

exercise:

```js
const showWelcome = compose(
  _.add('Welcome'),
  _.get('name')
)

const checkActive = function(user) {
  return user.active ? Right(user) : Left('Your account is not active')
}

const ex1 = compose(
  map(showWelcomse),
  checkActive
)

localStorage.user = JSON.stringify({ email: 'george@foreman.net' })

const getCache = function(x) {
  return Maybe(localStorage[x])
}.toIO()
const getStringEmail = compose(
  _.get('email'),
  JSON.parse
)
const ex6 = compose(
  map(map(getStringEmail)),
  getCache
)
```

other functors:

- EventStream
- Future

Functor Laws
// identity
map(id) == id

// composition
compose(map(f), map(g)) == map(compose(f, g))

Monads
of::a -> F a

Container.of(split)
// Container(split)

Maybe.of(reverse)
// Maybe(reverse)

```js
const chain = function(f) {
  return compose(
    mjoin,
    map(f)
  )
}

const mjoin = chain(id)
```

The Demo

libraries are evolving

we'll combine the best ones

- CrosssEye / ramda
- baconjs / bacon.js
- fantasyland / fantasy-io
- DrBoolean / pointfree-fantasy
- folktale / data.either
