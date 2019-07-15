# think in ramda

## basic ideas about fp

### functions as first-class constructs

- refer to them from constants and variables
- pass them as parameters to other functions
- return them as results from other functions

### pure functions

pure functions are functions that have no side-effects.

### immutability

means unchangeable.

once initialize a value or an object, never change it again.

## combining functions

### simple combinations

#### complement

a higher-order function, takes another function and returns a new function that returns `true` when the original function return a falsy value, and `false` when the original function returns a truthy value.

#### both/either

```js
const isCitizen = either(wasBornInCountry, wasNaturalized)
const isEligibleToVotes = both(isOver18, isCitizen)
```

#### allPass/anyPass

take an array of any number of functions.
`allPass`works like `both`, and `anyPass` works like `either`

### pipe

```js
const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x

const operate = pipe(
  multiply,
  addOne,
  square
)
```

### compose

```js
const operate = (x, y) => square(addOne(multiply(x, y)))

// rewritten using `compose` function
const operate = compose(
  square,
  addOne,
  multiply
)
```

`compose` works exactly the same way as `pipe`, except that it applies the functions in right-to-left order instead of left-to-right.

in fact, Ramda's `compose` function is written in terms of `pipe`

think of `compose` this way: `compose(f, g)(value)` is equivalent to `f(g(value))`

By combining several functions in specific ways, we can start to write more powerful functions.

## partial application

### partial / partialRight

these two functions let us call any function with fewer arguments than it needs.
They both return a new function that takes the missing arguments and then calls the original function once all of the arguments have been supplied.

### curry

### placeholder

R.\_\_

```js
const publishedInYear = curry((year, book) => book.year === year)

const titlesForYear = curry((year, books) =>
  pipe(
    filter(publishedInYear(year)),
    map(book => book.title)
  )(books)
)
```

## declearative programming

As we start writing small functional building blocks and combining them, we find that we have to write a lot of functions that wrap js's operators such as arithmetic, comparison, logic, and control flow. This can feel tedious, but Ramda has our back.

### IMPERATIVE VS DECLEARATIVE

Imperative programming gives rise to a lot of the constructs we use every day:
control flow (if-then-else statements and loops),
arithmetic operators (+, -, \*, /),
comparison operators (===, >, <, etc.),
and logical operators (&&, ||, !).

Functional programming is considered a subset of declarative propramming.

#### arithmetic

`add`
`subtract`
`multiply`
`divide`
`inc`
`dec`
`negate`

#### comparison

`equals`
`gte`
`gt`
`lt`
`lte`
`identical`
`isEmpty`
`isNil`

#### logic

`both`
`either`
`complement`
`and`
`or`
`not`
`defaultTo`

`defaultTo` checks if the second argument `isNil`.
if it isn't, it returns that as the value, otherwise it returns the first value.

#### conditionals

`ifElse`

```js
const forever21 = age => (age >= 21 ? 21 : age + 1)

const forever21 = age => ifElse(gte(__, 21), () => 21, inc)(age)

// or
const forever21 = age => ifElse(lte(21), () => 21, inc)(age)

// always

const forever21 = age => ifElse(get(__, 21), always(21), inc)(age)
```

`always`
T === always(true)
F === always(false)

`identity`

```js
const alwaysDrivingAge = age => ifElse(lt(__, 16), always(16), a => a)(age)

// identity
const alwaysDrivingAge = age => ifElse(lt(__, 16), always(16), identity)(age)
```

`when`
`unless`

```js
// can use when instead of ifElse
const alwaysDrivingAge = age => when(lt(__, 16), always(16))(age)

const alwaysDrivingAge = age => unless(gte(__, 16), always(16))(age)
```

`cond`

```js
const water = temperature =>
  cond([
    [equals(0), always('water freezes at 0 ℃')],
    [equals(100), always('water boils at 100 ℃')],
    [T, temp => `nothing special happens at ${temp}℃`]
  ])(temperature)
```

## POINTFREE STYLE

There are two main guiding principles of Ramda that we talked about:

1. Put the data last
2. Curry all the things

These two principles lead to a style that functional programmers call 'pointfree'.
I like to think of poinfree code as "Data? What data? There's no data here."

```js
// not pointfree
const forever21 = age => ifElse(gte(__, 21), always(21), inc)(age)

// pointfree
const forever21 = ifElse(gte(__, 21), always(21), inc)
const alwaysDrivingAge = when(lt(__, 16), always(16))
const water = cond([
  [equals(0), always('water freezes at 0 c')],
  [equals(100), always('water boils at 100 c')],
  [T, temp => `nothing special happens at ${temp} c`]
])

// multi-arguments functions

// not pointfree
const titlesForYear = curry((year, books) =>
  pipe(
    filter(publishedInYear(year)),
    map(book => book.title)
  )(books)
)

//pointfree
const titlesForYear = year => pipe(filter(publishedInYear(year), map(book => book.title)))
```

the advantage of pointfree:

- It makes programs simpler and more concise. This isn't always a good thing, but it can be.
- It makes algorithms clearer. By focusing only the functions being combined, we get a better sense of what's going on without the data arguments getting in the way.
- It forces us to think more about the transformation being done than about the data being transfromed.
- It helps us think about our functions as generic building blocks that can work with different kinds of data, rather than thinking about them as operations on a paricular
  kind of data. By giving the data a name, we're anchoring our thoughts about where we can use our functions. By leaving the data argument out, it allow us to be more creative.

## Immutability and Object

`prop`
`pick`
`pick(['name', 'age'], person)`
`has`
`hasIn`
`path`
`path` is more forgiving than `prop`.`path` will return `undefined` if anything along the path (including the original argument) is `null` or `undefined` whereas `prop` will raise an error.
`propOr`
`pathOr`
`propOr` and `pathOr` are similar to `prop` and `path` combined with `defaultTo`.
`keys`
`values`

`assoc`
`assoc('name', 'New name', person)`
`assoc` return a new object with the added or updated property value, leaving the original object unchanged.
`assocPath`
`assocPath(['address', 'zipCode'], '233545', person)`

`dissoc`
`dissocPath`
`omit`
`omit` can remove several properties at once.

pick and update:

```js
const nextAge = compose(
  inc,
  prop('age')
)
const celebrateBirthday = person => assoc('age', nextAge(person), person)
```

this is a pretty common pattern. Ramda to the rescue once more with its `evolve` function
`evolve`
`evolve` takes an object that specifies a transformation function for each property to be transformed.

```js
const celebrateBirthDay = evolve({ age: inc })
```

evolve can transform multiple properties at once and at multiple levels of nesting.
The transformation object can have the same shape as the object being evolved and evolve will recursively traverse both structures,
applying transformation functions as it goes.

Note that evolve will not add new properties; if you specify a transformation for a property that doesn’t appear in the target object, evolve will just ignore it.

`merge`
`mergeAll`

This has given us a nice set of tools for working with objects in a declarative and immutable way.
We can now read, add, update, delete, and transform properties in objects without changing the original objects.

## Immutability and Arrays

`nth` --- `prop`
`slice` --- `pick`
`contains` --- `has`
`head` === `nth(0)`
`tail` === `nth(-1)`
`take`
`take(3, numbers)`
`takeLast(3, numbers)`
`insert`
`update`
`append`
`prepend`
`concat`
`remove`
`without`
`drop`
`dropLast`
`adjust`

## Lenses

Ramda provides a more general tool for performing these operations, the lens.

A lens combines a 'getter' function and a 'setter' function into a single unit.
Ramda provides a set of functions for working with lenses.
We can think of a lens as something that focuses on a specific part of a larget data structure.

```js
const person = {
    name: 'Randy',
    socialMedia: {
        github: 'randycoulman',
        twitter: '@randycoulman'
    }
}

// create a lens with the lens function
// lens takes a getter function and s setter function and returns the new lens
const nameLens = lens(prop('name'), assoc('name'))
const twitterLens = lens(path(['socialMedia', 'twitter'])),
assocPath(['socialMedia', 'twitter']))

// Ramda provides nice shortcuts for the most common uses of lenses:
// lensProp, lensPath, lensIndex
const nameLens = lensProps('name')
const twitterLens = lensPath(['socialMedia', 'twitter'])
```

Ramda provides three functions for working with lenses.

- `view` reads the value of the lens
- `set` updates the value of the lens
- `over` applies a transformation function to the lens

```js
view(nameLens, person) // => 'Randy'

set(twitterLens, '@randy', person)
// return the entire object with the lens's focused property modified as specified
// => {
//   name: 'Randy',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randy'
//   }
// }

over(nameLens, toUpper, person)
// return the entire object with the lens's focused property modified as specified
// => {
//   name: 'RANDY',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randycoulman'
//   }
// }****
```

Lenses can be handy if we have a somewhat complex data structure that we want to abstract away from calling code.
Rather than exposing the structure or providing a getter, setter, and transformer for every accessible property, we can instead expose lenses.

Client code can then work with our data structure using view, set, and over without being coupled to the exact shape of the structure.

## Wrap-up
