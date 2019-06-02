# Thinking In Ramda

[系列文章地址](http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/)

## Functions as "first-class"

## Pure Functions

When writing functional programs, it eventually becomes important to work mostly with so-called “pure” functions.

The basic idea is that, if you call a function with the same inputs over and over again, you always get the same result.

## Immutability

“Immutable” means “unchangeable”.

Immutability goes hand-in-hand with pure functions. Since pure functions aren’t allowed to have side-effects, they aren’t allowed to change outside data structures. They are forced to work with data in an immutable way.

`R.filter`
`R.reject`

By starting with these collection-iteration functions, you can get used to the idea of passing functions to other functions. You might have used these in other languages without realizing you were doing some functional programming.

## Combining Functions

### simple combinations

#### R.complement

Note that complement implements the same idea for functions as the ! (`R.not`) operator does for values.

#### R.both / R.either

Note that both implements the same idea for functions as the && (and) operator does for values, and either implements that same idea for functions as the || (or) operator does for values.

Ramda also provides allPass and anyPass that take an array of any number of functions. As their names suggest, allPass works like both, and anyPass works like either.

### Pipelines

`R.pipe`

### Compose

`R.compose`

I think that pipe is probably the easiest to understand when coming from a more imperative background since you read the functions left-to-right. But compose is a bit easier to translate to nested-function form as I showed above.

I haven’t yet developed a good rule for when I prefer compose and when I prefer pipe. Since they are essentially equivalent in Ramda, it probably doesn’t matter which one you choose. Just go with whichever one reads the best in your situation.

## Partial application

### Higher-order Functions

### Partially-Applying Functions

Ramda provides two functions to help us out: `R.partial`, and `R.partialRight`.

### Curry

Currying is another core concept in functional programming. Technically, a curried function is **always a series of single-argument functions**, which is what I was just complaining about.

`R.curry`

### Argument order

where is the data ?
the last argument.

`R.flip`
`((a, b, c, …) → z) → (b → a → c → … → z)`
交换函数前两个参数的位置。

### placeholder

The more general option is the “placeholder” argument (`R.__`).

## Declarative programming

### Imperative vs Declarative

Without going too deep into this, imperative programming is a style of programming where the programmers tell the computer what to do by telling it how to do it. Imperative programming gives rise to a lot of the constructs we use every day: control flow (if-then-else statements and loops), arithmetic operators (+, -, \*, /), comparison operators (===, >, <, etc.), and logical operators (&&, ||, !).

Declarative programming is a style of programming where the programmers tell the computer what to do by telling it what they want. The computer then has to figure out how to produce the result.

### Declarative Replacements

#### Arithmetic

Ramda provides `add`, `subtract`, `multiply`, and `divide` functions to use in place of the standard arithmetic operators.

`R.negate`

#### Comparison

`R.equals` in place of === and `R.gte` in place of >=

Ramda also provides `R.gt` for >, `R.lt` for <, and `R.lte` for <=.

There are a couple of common uses of ===: checking if a string or array is empty (str === '' or arr.length === 0), and checking if a variable is null or undefined. Ramda provides handy functions for both cases: `R.isEmpty` and `R.isNil`.

#### Logic

`R.both` and `R.either` functions in place of && and || operations. We also talked about `R.complement` in place of !.

But sometimes we need to apply &&, ||, and ! to disparate values. For those cases, Ramda gives us and, or, and not functions. I think of it this way: and, or, and not work with values, while both, either, and complement work with functions.

We could use the isNil function we just learned about above, but again Ramda has a nicer option for us: `R.defaultTo`.

`R.defaultTo` checks if the second argument `R.isNil`. If it isn’t, it returns that as the value, otherwise it returns the first value.

#### Conditionals

`R.ifElse`

`R.always`

`R.T`
`R.F`

`R.identity`

if, as in our case, the second branch is identity, we can use when instead of ifElse:

```js
const alwaysDrivingAge = age => when(lt(__, 16), always(16))(age)
```

If the first branch of the conditional is identity, we can use `R.unless`. If we reversed our condition to use gte(\_\_, 16) instead, we could use unless.

`R.cond`

Ramda also provides the cond function which can replace a switch statement or a chain of if...then...else statements.

## PointFree Style

### PointFree style

There are two main guiding principles of Ramda that we talked about in Part 3:

- Put the data last
- Curry all the things

### the advantage of pointfree style

- It makes programs simpler and more concise. This isn’t always a good thing, but it can be.

- It makes algorithms clearer. By focusing only on the functions being combined, we get a better sense of what’s going on without the data arguments getting in the way.

- It forces us to think more about the transformation being done than about the data being transformed.

- It helps us think about our functions as generic building blocks that can work with different kinds of data, rather than thinking about them as operations on a particular kind of data. By giving the data a name, we’re anchoring our thoughts about where we can use our functions. By leaving the data argument out, it allows us to be more creative.

Pointfree style, also known as tacit programming, can make our code clearer and easier to reason about.

## Immutability and Objects

### Reading Object properties

`R.prop`
`R.pick`

Where prop reads a single property from an object and returns the value, pick reads multiple properties from an object and returns a new object with just those properties.

`pick(['name', 'age'], person)`

`R.has`

`R.path`

`path(['address', 'zipCode'], person)`

Note that path is more forgiving than prop. path will return undefined if anything along the path (including the original argument) is null or undefined whereas prop will raise an error.

`R.propOr`
`R.pathOr`

propOr and pathOr are similar to prop and path combined with defaultTo. They let you provide a default value to use if the property or path cannot be found in the target object.

For example, we can provide a placeholder when we don’t know a person’s name: `propOr('<Unnamed>', 'name', person)`. Note that unlike prop, propOr will not raise an error if person is null or undefined; it will instead return the default value.

`R.keys`
`R.values`
`R.toPairs`
`R.toPairsIn`

### Adding, Updating, and Removing properties

`R.assoc`
`R.assocPath`

`R.dissoc`
`R.dissocPath`
`R.omit`

There is also omit, which can remove several properties at once. `const updatedPerson = omit(['age', 'birthCountry'], person)`.

Note that `R.pick` and `R.omit` are quite similar and complement each other nicely. They’re very handy for white-listing (keep only this set of properties using pick) or black-listing (get rid of this set of properties using omit).

### Transforming properties

`R.evolve`

`evolve` takes an object that specifies a transformation function for each property to be transformed. Let’s refactor celebrateBirthday to use `evolve`:

`const celebrateBirthday = evolve({ age: inc })`

evolve **can transform multiple properties at once and at multiple levels of nesting**. The transformation object can have the same shape as the object being evolved and evolve will recursively traverse both structures, applying transformation functions as it goes.

Note that evolve will not add new properties; if you specify a transformation for a property that doesn’t appear in the target object, evolve will just ignore it.

**I’ve found that evolve has quickly become a workhorse in my applications**.

### Merging Objects

`R.merge`

Note that `merge` only takes two arguments. If you want to merge multiple objects into one, there is `mergeAll` that takes an array of the objects to be merged.

## Immutability and Arrays

The array equivalent of `prop` is `nth`;  
the equivalent of `pick` is `slice`,  
and the equivalent of `has` is `contains`.

`R.head`
`R.tail`
`R.init`
`R.last`

### Adding, Updating, and Removing Array elements

For objects, we learned about `assoc`, `dissoc`, and `omit` for adding, updating, and removing properties.

Because arrays are an ordered data structure, there are several methods that do the same job as assoc.
The most general are `insert` and `update`, but Ramda also provides `append` and `prepend` for the common case of adding elements at the beginning or end of the array.
insert, append, and prepend add new elements to the array; update “replaces” an element with a new value.

**As you might expect from a functional library, all of these functions return a new array with the desired changes; the original array is never changed**.

For combining two objects into one, we learned about `merge`. Ramda provides `concat` for doing the same with arrays.

Ramda also provides several options for removing elements. `remove` removes elements by index, while `without` removes them by value. There’s also `drop` and `dropLast` for the common case of removing elements from the beginning or end of the array.

ote that `remove` takes an index and a count whereas `slice` takes two indexes. This inconsistency can be confusing if you’re not aware of it.

### Transfroming elements

As with objects, we may want to `update` an array element by applying a function to the original value.

To simplify this common use case, Ramda provides `adjust` that works much like evolve does for objects.
Unlike evolve, adjust only works for a single array element.

We now have tools for working with arrays and objects in a declarative and immutable way.  
This allows us to build programs out of small, functional building blocks, combining functions to do what we need to do, all without mutating our data structures.

## Lenses

### What is a Lens

A lens combines a “getter” function and a “setter” function into a single unit. Ramda provides a set of functions for working with lenses.

We can think of a lens as something that focuses on a specific part of a larger data structure.

`R.lens`

```js
const person = {
  name: 'Randy',
  socialMedia: {
    github: 'randycoulman',
    twitter: '@randycoulman'
  }
}

const nameLens = lens(prop('name'), assoc('name'))
const twitterLens = lens(path(['socialMedia', 'twitter']), assocPath(['socialMedia', 'twitter']))
```

`R.lensProp`
`R.lensPath`
`R.lensIndex`

### What can i do with it

Ramda provides three functions for working with lenses.

- `view` reads the value of the lens.

- `set` updates the value of the lens.

- `over` applies a transformation function to the lens.

```js
view(nameLens, person) // => 'Randy'

set(twitterLens, '@randy', person)
// => {
//   name: 'Randy',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randy'
//   }
// }

over(nameLens, toUpper, person)
// => {
//   name: 'RANDY',
//   socialMedia: {
//     github: 'randycoulman',
//     twitter: '@randycoulman'
//   }
// }
```

Notice that `set` and `over` **return the entire object** with the lens’ focused property modified as specified.

Lenses can be handy if we have a somewhat complex data structure that we want to abstract away from calling code.  
Rather than exposing the structure or providing a getter, setter, and transformer for every accessible property, we can instead expose lenses.

Client code can then work with our data structure using view, set, and over without being coupled to the exact shape of the structure.
