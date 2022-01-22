# title

## 1

计算机的不同语言、不同技术和算法就好比一堆便宜或者昂贵的工具(如锥子和刨子)，其
实这些都不重要，因为大家都忽略了，做出漂亮器具的是那个工匠，而不是工具。脑子里的经验积
累、天赋、执着与认真的态度、不停尝试、追求完美的态度，加起来才能创造好的作品与产品。计
算机语言就像赛车场上的跑车，换了车队和跑车，舒马赫还是 F1 车神，观众还是会为其欢呼雀跃，
正因为车神掌握了与跑车和赛道的沟通之道!

代码地址：https://github.com/xuchaobei/react-book

前端 UI 的本质问题是如何将来源于服务器端的动态数据和用户的交互行为高效地反映到复杂
的用户界面上。React 另辟蹊径，通过引入虚拟 DOM、状态、单向数据流等设计理念，形成以组
件为核心，用组件搭建 UI 的开发模式，理顺了 UI 的开发过程，完美地将数据、组件状态和 UI 映
射到一起，极大地提高了开发大型 Web 应用的效率。
React 的特点可以归结为以下 4 点:

1. 声明式的视图层；
2. 简单的更新流程，从状态到 UI 的单向数据流；
3. 灵活的渲染实现， 虚拟 DOM;
4. 高效的操作；

- 解决不了的复杂问题，就在抽象出一层

Node.js 是一个 js 的运行时， 它让 js 在服务器端运行成为现实。
React 应用的执行并不依赖于 Node.js 环境， 但 React 应用开发编译过程中的很多依赖都是需要 Node.js 环境的。

## 基础

JSX: 一种用于描述 UI 的 js 扩展语法， React 使用这种语法描述组件的 UI.

DOM 类型的标签和 React 组件类型的标签

class ---> className
onclick ---> onclick

JSX 只是 React.CreateElement 的语法糖

React 组件正是由 props 和 state 两种类型的数据驱动渲染 组件 UI。 props 是组件对外的接口，
组件通过 props 接收外部传入的数据(包括方法)；sate 是组件对内的接口，组件内部状态的变化
通过 state 来反映。另外， props 是只读的，你不能在组件内都 修改 props；ste 是可变的，组件状
态的变化通过修改 state 来实现。在第 4 章中，我们还会对 props 和 state 进行详细比较

在开发 React 应用时，**一定要先**认真思考哪些组件应该设计成有状态组件，哪些组件应该设计
成无状态组件。并且，应该尽可能多地使用无状态组件，无状态组件不用关心状态的变化，只聚焦
于 UI 的展示，因而更容易被复用。 React 应用组件设计的一般 思路是，通过定义少数的有状态组
件管理整个应用的状态变化，并且将状态通过 props 传递给其余 的无状态组件，由无状态组件完成
页面绝大部分 UI 的渲染工作。总之，有状态组件主要关注处理 状态变化的业务逻辑，无状态组件
主要关注组件 UI 的渲染

```js
//style是一个对象
style: PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
}),
sequence: PropTypes.arrayOf(PropTypes.number)

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    vote: PropTypes.number,
  }).isRequired
}
```

defaultProps

内联样式，样式的属性名必须使用驼峰格式的命名

React 元素和 React 组件

React 元素是一个 js 对象；
React 组件是一个 class 或者函数， 它接收一些属性作为输入，返回一个 React 元素。

render 方法中，根据组件的 props 和 state 返回一个 React 元素，用于描述组件的 UI，
通常 React 元素使用 JSX 语法定义。 render 并不负责组件的实际渲染工作，
它只是返回一个 UI 的描述，真正的渲染工作由 React 自身负责。
**render 是一个纯函数，在这个方法中不能执行任何有副作用的操作**，
**所以**不能在 render 中调用 this.setState， 这会改变组件的状态。

shouldComponentUpdate(nextProps, nextState)
通过比较 nextProps, nextState 和组件当前的 props, state 决定这个方法的返回结果。这个方法
可以用来减少组件不必要的渲染，从而优化组件的性能。

通过表单元素的 name 属性区分。

通过 defaultValue (input, select, textarea) 为非受控表单元素组件指定默认值
defaultChecked (input:type = checkbox, input:type = radio)

## React 16 新特性

1. render 新的返回类型：数组 (由 React 元素组成) 和字符串；
2. 错误处理(ComponentDidCatch(error, info));
3. Portals
4. 自定义 DOM 属性
   ```html
   <div custom-attribute='something' />
   ```
