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
