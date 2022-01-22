//一个函数应该只做一件事。
//如果你的函数做了更多的事，
//如果你的类和函数有if语句，就意味着你的函数做了更多的事

//1.使用Array.includes处理多重条件

function test(fruit) {
  //把条件提取到数组中
  const redFruits = ["apple", "strawberry", "cherry"];
  if (redFruits.includes(fruit)) {
    console.log("red");
  }
}

//少写嵌套，尽早返回

//相较于switch, Map / Object 也许是更好的选择

//object
const fruitColor = {
  red: ["apple", "strawberyy"],
  yellow: ["banana", "pineapple"],
  purple: ["grape", "plum"]
};

const test = color => fruitColor[color] || [];

//map
const fruitColor = new Map([
  ["red", ["apple", "strawberry"]],
  ["yellow", ["banana", "pineapple"]],
  ["purple", ["grape", "plum"]]
]);

const test = color => fruitColor.get(color) || [];

//array.filter

const fruits = [
  { name: "apple", color: "red" },
  { name: "strawberry", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "pineapple", color: "yellow" },
  { name: "grape", color: "purple" },
  { name: "plum", color: "purple" }
];

const test = color => fruits.filter(i => i.color === color);

//全局常量和线程安全(在 let 和 const 之间，建议优先使用 const ，尤其是在全局环境)
//JavaScript 编译器会对 const 进行优化，所以多使用 const ，有利于提高程序的运行效率，
//也就是说 let 和 const 的本质区别，其实是编译器内部的处理不同。

//good
const a = 1;
const b = 2;
const c = 3;

//best
const [a, b, c] = [1, 2, 3];

//箭头函数取代 Function.prototype.bind，不应再用 self/_this/that 绑定 this。

const boundMethod = (...params) => method.apply(this, params);

//所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接着重阐述

//bad
const divide = (a, b, option = false) => {};

//good
const divide = (a, b, { option = false } = {}) => {};

//注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
//如果只是需要 key: value 的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。

const map = new Map();

map.keys();
map.values();
map.entries();
