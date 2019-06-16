# JSDoc support in Javascript

[addr](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript)

Note any tags which are not explicitly listed below (such as @async) are not yet supported.

- @type
- @param (or @arg or @argument)
- @returns (or @return)
- @typedef
- @callback
- @template
- @class (or @constructor)
- @this
- @extends (or @augments)
- @enum
  The meaning is usually the same, or a superset, of the meaning of the tag given at usejsdoc.org. The code below describes the differences and gives some example usage of each tag.

## @type:

```js
/**
 * @type {string}
 */
var s

/** @type {Window} */
var win

/** @type {PromiseLike<string>} */
var promisedString

// You can specify an HTML Element with DOM properties
/** @type {HTMLElement} */
var myElement = document.querySelector(selector)
element.dataset.myData = ''

/** @type {number[]} */
var ns
/** @type {Array.<number>} */
var nds
/** @type {Array<number>} */
var nas

/** @type {{ a: string, b: number }} */
var var9

/**
 * A map-like object that maps arbitrary `string` properties to `number`s.
 *
 * @type {Object.<string, number>}
 */
var stringToNumber

/** @type {Object.<number, object>} */
var arrayLike

/** @type {function(string, boolean): number} Closure syntax */
var sbn
/** @type {(s: string, b: boolean) => number} Typescript syntax */
var sbn2

/** @type {Function} */
var fn7
/** @type {function} */
var fn6

/**
 * @type {*} - can be 'any' type
 */
var star
/**
 * @type {?} - unknown type (same as 'any')
 */
var question
```

## @param and @returns

@param uses the same type syntax as @type, but adds a parameter name.

```js
// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}

/**
 * @return {PromiseLike<string>}
 */
function ps() {}

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
function ab() {}
```

## @typedef, @callback, @param

@typedef may be used to define complex types. Similar syntax works with @param.

```js
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */
/** @type {SpecialType} */
var specialTypeObject;

// You can use either object or Object on the first line.

/**
 * @typedef {object} SpecialType1 - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 */
/** @type {SpecialType1} */
var specialTypeObject1;

// @param allows a similar syntax for one-off type specifications. Note that the nested property names must be prefixed with the name of the parameter:

/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}

// @callback is similar to @typedef, but it specifies a function type instead of an object type:
/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predicate} */
const ok = s => !(s.length % 2);

Of course, any of these types can be declared using Typescript syntax in a single-line @typedef

/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */
```

## @template

You can declare generic types with the @template tag:

```js
/**
 * @template T
 * @param {T} p1 - A generic parameter that flows through to the return type
 * @return {T}
 */
function id(x){ return x }
Use comma or multiple tags to declare multiple type parameters:

/**
 * @template T,U,V
 * @template W,X
 */
```

You can also specify a type constraint before the type parameter name. Only the first type parameter in a list is constrained:

```js
/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious(): string }} Seriousalizable - must have a serious method
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}
```

## @constructor

The compiler infers constructor functions based on this-property assignments, but you can make checking stricter and suggestions better if you add a @constructor tag:

```js
/**
 * @constructor
 * @param {number} data
 */
function C(data) {
  this.size = 0
  this.initialize(data) // Should error, initializer expects a string
}
/**
 * @param {string} s
 */
C.prototype.initialize = function(s) {
  this.size = s.length
}

var c = new C(0)
var result = C(1) // C should only be called with new
```

With @constructor, this is checked inside the constructor function C, so you will get suggestions for the initialize method and an error if you pass it a number. You will also get an error if you call C instead of constructing it.

Unfortunately, this means that constructor functions that are also callable cannot use @constructor.

## @this

The compiler can usually figure out the type of this when it has some context to work with. When it doesn't, you can explicitly specify the type of this with @this:

```js
/**
 * @this {HTMLElement}
 * @param {*} e
 *
 */
function callbackForLater(e) {
  this.clientHeight = parseInt(e) // should be fine
}
```

## @extends

When Javascript classes extend a generic base class, there is nowhere to specify what the type parameter should be. The @extends tag provides a place for that type parameter:

```js
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

Note that @extends only works with classes. Currently, there is no way for a constructor function extend a class.

## @enum

The @enum tag allows you to create an object literal whose members are all of a specified type.
Unlike most object literals in javascript, it does not allow other members.

```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2
}
```

Note that @enum is quite different from, and much simpler than, Typescript's enum.
However, unlike Typescript's enums, @enum can have any type:

```js
/** @enum {function(number): number} */
const Math = {
  add1: n => n + 1,
  id: n => -n,
  sub1: n => n - 1
}
```
