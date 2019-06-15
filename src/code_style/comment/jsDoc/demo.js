// 定义类型
/**
 * @type {number | string} - a An number or string
 */
let a = 123
a = '123'
a = true
console.log(a)

/**
 * @type {number[]} list of score.
 */
const scores = [93, 62, 75, 'bb']
console.log(scores)

/**
 * @type {{name: string, age: number}}
 */
const person_1 = {
  name: 'andy',
  age: '26'
}
console.log(person_1)

// 自定义类型

/**
 * A person object with a name and age.
 * @typedef {Object<string, any>} Person
 * @property {string} name The name of the person
 * @property {number} age The age of the person.
 * @property {string} [gender] the gender of the person
 * @property {Function} sayName a function that alerts the person's name
 */

/**
 * @type {Person} person
 */
const pseron_2 = {
  name: 'Joe',
  age: 32,
  sayName() {
    alert(this.name)
  },
  gender: 'man'
}
console.log(pseron_2)

// 一个带有函数属性的类构造函数

/**
 * Class to create a person object.
 */
class Person_3 {
  constructor(props) {
    /**
     * @property {string} name The person's name
     */
    this.name = props.name
    /**
     * @property {number} age The person's age
     */
    this.age = props.age
    /**
     * @property {function} sayName A method to annouce the person's name
     * @returns void
     */
    this.sayName = () => alert(this.name)
  }
}

const guy = new Person_3({
  name: 'Sam',
  age: 32
})

guy.sayName()

// 可扩展对象的动态属性
// 可以使用中括号的形式添加对象属性

const btn = document.createElement('button')
btn.nodeValue = 'A Button'

// will generate error that property does not exist on type Node:
btn.isButton = true

// Escape expando property:
btn['isButton'] = true

// 定义简单对象类型的方法

/**
 * Object literal with properties:
 * @type {{name: string, age: number, job: string}} - employee
 */
const person_4 = {
  name: 'andy',
  age: 18,
  job: 'programmer'
}

console.log(person_4)

// 定义对象最灵活的方式

// Define generic object
// This can have any number of properties of type any.
/**
 * @typedef {Object<string,any>} Member
 * @property {string} name The member's name
 * @property {number} [age] The member's age
 * @property {string} [job] The member's job.
 */
/**
 * @type {Member} Jack
 */
const Jack = {
  name: 'Jack',
  age: 28
}

console.log(Jack)

// 定义泛型

// Generic types may also be used
/**
 * @template T
 * @param {T} param - A generic parameter that flows through to the return type
 * @returns {T}
 */
function genericFnc(param) {
  return param
}
console.log(genericFnc(1))

/**
 * Set the title with the provided value
 * @param {string} newTitle
 * @returns {Node} H1 element
 */
function setTitle(newTitle) {
  if (typeof newTitle !== 'string') {
    console.log(`The wrong type was provided: ${typeof newTitle}`)
    return <h1 />
  }
  return <h1>{newTitle}</h1>
}

setTitle('aa')

/** Class representing a point. */
class Point {
  /**
   * Create a point.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * Get the x value.
   * @return {number} The x value
   */
  getX() {
    return this.x
  }
  /**
   * Convert a string containing two comma-separate number into a point.
   * @param {string} str - The string containing two comma-separated numbers.
   * @return {Point} A Point object.
   */
  static fromString(str) {
    const [x, y] = str.split(',').map(Number)
    return new Point(x, y)
  }
}

// Extending classes（扩展类）
// 当您使用 extends关键字来扩展一个现有的类的时候，你还需要告诉JSDoc哪个类是你要扩展的。 为此，您可以使用 @augments (或 @extends) 标签。

// 例如，扩展如上所示Point 类，扩展一个 ES 2015 类：

/**
 * Class representig a dot.
 * @extends Point
 */
class Dot extends Point {
  /**
   * Create a dot.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} width - The width of the dot, in pixels
   */
  constructor(x, y, width) {
    super(x, y)
    this.width = width
  }
  /**
   * Get the dot's width.
   * @return {number} The dot's width, in pixels.
   */
  getWidth() {
    return this.width
  }
}
