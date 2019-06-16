/**
 * @tutorial <https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript>
 */

// More examples

var someObj = {
  /**
   * @param {string} param1 - Docs on property assignments work
   */
  x: function(param1) {
    return param1
  }
}

/**
 * As do docs on varible assignments
 * @returns {Window}
 */
let someFunc = function() {
  return this
}

/**
 * And class methods
 * @param {string} greeting - The greeting to use
 * @returns {void}
 */
Foo.prototype.sayHi = greeting => console.log(greeting)

/**
 * And arrow functions expressions
 * @param {number} x - A multiplier
 */
let myArrow = x => x * x

/**
 * Which means it works for stateless function components in JSX too
 * @param {{a: string, b: number}} test - Some param
 */
const sfc = test => <div>{test.a.charAt(0)}</div>

/**
 * A parameter can be a class constructor, using Closure syntax.
 * @param {{new(...args: any[]): object}} C - The class to register
 */
function registerClass(C) {
  new C()
  return {}
}

/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn10(p1) {}

/**
 * @param {...string} p1 - A 'rest' arg (array) of string. (treated as 'any')
 */
function fn9(p1) {
  return p1.join()
}

/**
 * @type {{ a: string, b: number= }}
 */
var wrong
/**
 * Use postfix question on the property name instead:
 * @type {{ a: string, b?: number }}
 */
var right
