import { Map, List, Set, Seq } from 'immutable';

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);

//immutable.js 没有依赖关系

//使应用程序开发变得困难的很多原因是跟踪编译和维持状态。
//使用不可变数据进行开发可以鼓励你对数据如何在应用程序中流动进行不同的思考。

//由于不可变数据永远不会改变，因此在整个模型中订阅更改是一个死胡同，新数据只能从上面传递。

//不可变集合应该被视为值而不是对象。虽然对象表示可能随时间变化的某些事物，但值表示特点时刻的事物的状态。
//这个原则对于理解不可变数据的适当使用是最重要的。

//为了将 immutable.js 集合视为值，使用 Immutable.is()函数或方法确定值相等性
//而不是确定对象引用标识的运算符非常重要
const map3 = Map({ a: 1, b: 2, c: 3 });
const map4 = Map({ a: 1, b: 2, c: 3 });
map3.equals(map4); //true
map3 === map4; //false

const list1 = List([1, 2]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);

const myObject = { a: 1, b: 2, c: 3 };
Seq(myObject)
  .map(x => x * x)
  .toObject();
