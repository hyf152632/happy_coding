// @example
// 提供一个如何使用描述项的例子
// 一个 doclet 中可以同时使用多个 @example标签
// @example标签后面可以添加  标签作为示例的标题

/**
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * getDevided(5, 10)
 * @example
 * // returns 3
 * getDevided(5, 15)
 * @param {number} a - the number devided
 * @param {number} b - the number devide
 * @return {number} - the result
 */
function getDevided(a, b) {
  return b / a
}
getDevided(2, 20)

// @global
//@global标签指定一个在文档的标识是为全局性的标识。JSDoc忽略这个标识在源文件中的实际作用范围。这个标记是在本地所定义标识时特别有用。

function foo() {
  /** @global */
  const foo = 'hello foo'
  this.foo = foo
}

// @param
// 记录传递给一个函数的参数。
// @param aparam
// @param {string} astrparam
// @param {string} aparam spec about the param
//在变量说明前面加个连字符，使之更加容易阅读
// @param {string} aparm - a string param

/**
 * Assign the project to an employee
 * @param {Object} employee - The employee who s responsible for the project.
 * @param {string} employee.name - The name of the employee
 * @param {string} employee.department - The employee's department.
 *
 */
function assign({ name, department }) {
  if (name === 'andy') {
    console.log('andy')
  }
  return department
}

/**
 * another way to a object param
 * @param {{name: string, department: string}} employee - the employee
 */
function anotherAssign({ name, department }) {
  if (name === 'andy') {
    console.log('andy')
  }
  return department
}
anotherAssign({ name: 'andy', department: 'it' })

// 可选参数
// @param {string} [somebody] - Somebody's name

// 一个可选参数和默认类型
// @param {string} [somebody=Andy] - Somebody's name

// 多种类型
// @param {string | string[]} [somebody=andy] - Somebody's name, or an array of names

// 允许任何类型
// @param {*} somebody - Whatever you want

//回调函数
// 如果参数接受一个回调函数， 可以使用 @callback 标签来定义一个回调类型，然后回调类型包含到@param标签中

/**
 * This callback type is called 'cb' and is displayed as a global symbol
 *
 * @callback cb - a callback cb
 * @param {number} cbNum - the cb number
 * @param {string} cbMsg - the cb message
 *
 */
/**
 * Does something and executes the cb on completion.
 * @param {cb} cb - the callback that handles the response
 */
function doSomeThingWithCb(cb) {
  return cb(12, 'ok')
}
doSomeThingWithCb(() => {})

// @property
// 记录一个对象的属性

// @returns
// 记录一个函数的返回值

// @this
// this 关键字的指向

// @todo
// 记录一个将要完成的任务

// @tutorial <tutorialID>
// 插入一个链接到包含教程文件

// @type
// 记录一个对象的类型
// {boolean}
// {myNamespace.MyClass}
// {string[]}
// {{a: number, b: string}}
// 一个数字或 null
// {?number}
// 一个数字，但是绝对不会是 null
// {!number}
// 接受可变数量的参数
// {...number}
// 可选参数
// {number} [foo]
//{number=} foo
// {number} [foo=1]

// callback

// Type definitions
// @typedef

// {Array.<string>}
// {Array.<any>}
// {Object.<any>}

// @typedef
// 记录一个自定义类型
// 在描述自定义类型时是很有用的，特别是如果你要反复引用它们的时候。这些类型可以在其他标签内使用，
// 如 @type 和 @param

/**
 * A number, or a string containing a number.
 * @typedef {number|string} NumberLike
 */

/**
 * Set the magic number
 * @param {NumberLike} x - The magic number
 */
function setMagicNumber(x) {
  return x
}
setMagicNumber(1)

/**
 * The complete Trforce, or one more components of the Triforce.
 * @typedef {Object} WishGranter~Triforce
 * @property {boolean} hasCourage - Indicates whether the Courage component is present.
 * @property {boolean} hasPower - INdicates whether the Power componetn is present.
 * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present
 */
/**
 * A class for granting wishes, powered by the Triforce.
 * @class
 * @param {...WishGranter~Triforce} triforce - Oneto thre {@link WishGranter~Triforce} objects
 */

//  @author
// @author <name> [<emailAddress>]

// @callback
// 描述一个回调函数

/**
 * This callback is displayed as a global member.
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
/**
 * @class
 */
function Requester() {}
/**
 * send a request.
 * @param {requestCallback} cb - The callback that handles the response.
 */
Requester.prototype.send = function(cb) {
  return cb(200, 'ok')
}

// @class
// 此函数旨在需要使用 “new”关键字调用，即构造函数。

/**
 * Creates a new Person
 * @class
 */
function Person() {}
const person_some = new Person()

// @classdesc
// 使用后面的文字来描述整个类
// @classdesc <some description>

// @copyright
// @copyright <some copyright text>
// 描述一些版权信息
// 一般和 @file 标签结合使用

// @description
// 别名： @desc
// 可以将描述放置在JSDoc 注释的任何地方

// @link

// @tutorial

/** @typedef {(data: string, index?: number) => boolean} Predicate */

/**
 * usePredicate callback
 * @param {Predicate} pred - the param
 * @returns {string}
 */
const usePredicate = pred => (pred('ok', 1), 'ok')
const msg = 'ok'
const count = 123
usePredicate((msg, count) => {
  console.log(msg, count)
  return true
})
