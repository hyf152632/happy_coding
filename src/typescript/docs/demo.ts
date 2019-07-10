function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}

function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject
}

type C = { a: string; b?: number }

function f2({ a, b }: C): void {
  //...
}

function f3({ a, b = 0 } = { a: '' }): void {
  //...
}

// 对象展开还有一些意想不到的限制。首先，它仅包含对象 自身的可枚举属性。大体上是说当你展开一个对象实例时，你会丢失其方法：
class C2 {
  p = 12
  m() {}
}
let c = new C2()
let clone = { ...c }
clone.p
clone.m() // error

function printLabel(labelledObjet: { label: string }) {
  console.log(labelledObjet.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

//接口
interface labelledValue {
  label: string
}

function printLabel2(labelledObj: labelledValue) {
  console.log(labelledObj.label)
}

let myObj2 = { size: 10, label: 'Size 10 Object' }
printLabel2(myObj2)

// 可选属性
// 接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。
interface SquareConfig {
  color?: string
  width?: number
}

// 只读属性
// 只能在对象刚刚创建的时候修改其值
interface Point_new {
  readonly x: number
  readonly y: number
}

let p1: Point_new = { x: 10, y: 20 }

//p1.x = 20  // error

// 泛型
function identity<T>(arg: T): T {
  return arg
}
