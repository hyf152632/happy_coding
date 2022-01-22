# title

## 快速开始

我们用 React 开发应用时一般只会定义一个根节点。但如果你是在一个已有的项目当中引入 React 的话，你可能会需要在不同的部分单独定义 React 根节点。

**React 元素都是 immutable 不可变的**。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。

根据我们现阶段了解的有关 React 知识，**更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法**：

React 只会更新必要的部分
**React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分**。

根据我们以往的经验，将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画），将会有利于我们理清开发思路，减少各种 bug。

纯函数不会改变自己的输入值(参数)，总是返回相同的结果

状态与属性十分相似，但是状态是私有的，完全受控于当前组件。

将函数转换为类：
使用类就允许我们使用其它特性，例如局部状态、生命周期钩子

你可以通过 5 个步骤将函数组件 Clock 转换为类

1. 创建一个名称扩展为 React.Component 的 ES6 类

2. 创建一个叫做 render()的空方法

3. 将函数体移动到 render() 方法中

4. 在 render() 方法中，使用 this.props 替换 props

5. 删除剩余的空函数声明

类组件应始终使用 props 调用基础构造函数。

虽然 this.props 由 React 本身设置以及 this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
如果你不在 render() 中使用某些东西，它就不应该在状态中。

构造函数是唯一能够初始化 this.state 的地方。

状态更新可能是异步的
React 可以将多个 setState() 调用合并成一个调用来提高性能。

因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
例如，此代码可能无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
});
```

要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

数据自顶向下流动
父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问.

在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。
可以在有状态组件中使用无状态组件，反之亦然。

你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。
如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

事件绑定：
如果使用 bind 让你很烦，这里有两种方式可以解决。

- 如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：也就是直接在类中用箭头函数定义方法；
  这个语法在 Create React App 中默认开启。
- 如果你没有使用属性初始化器语法，你可以在回调函数中使用 箭头函数.使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题

传递参数：

```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过 **箭头函数的方式，事件对象必须显式的进行传递**，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面

```js
class Popper extends React.Component {
  constructor() {
    super();
    this.state = { name: "Hello world!" };
  }

  preventPop(name, e) {
    //事件对象e要放在最后
    e.preventDefault();
    alert(name);
  }

  render() {
    return (
      <div>
        <p>hello</p>
        {/* Pass params via bind() method. */}
        <a
          href="https://reactjs.org"
          onClick={this.preventPop.bind(this, this.state.name)}
        >
          Click
        </a>
      </div>
    );
  }
}
```

阻止组件渲染
在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。
让 render 方法返回 null 而不是它的渲染结果即可实现。
组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。
例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。

JSX 允许在大括号中嵌入任何表达式，所以我们可以在 map()中这样使用：

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map(number => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```

这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，**何时需要为了可读性提取出一个变量，这完全取决于你**。但请记住，如果一个 map()嵌套了太多层级，那可能就是你提取出组件的一个好时机。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}
```

表单元素的受控组件中，我们如果想限制输入全部是大写字母，我们可以将 handleChange 写为如下：

```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

多个输入的解决方法
当你有处理多个受控的 input 元素时，你可以通过给每个元素添加一个 name 属性，来让处理函数根据 event.target.name 的值来选择做什么。

```js
 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
```

状态提升  
使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。我们来看一下具体如何操作吧。
在 React 中，状态分享是通过将 state 数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。
状态提升的同时，需要让子组件“受控”，也就是父组件通过 props 提供一个回调函数，当需要传递给子组件的值发生改变时，子组件通过这个回调函数通知父组件。

经验教训
在 React 应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。

状态提升比双向绑定方式要写更多的“模版代码”，但带来的好处是，你也可以更快地寻找和定位 bug 的工作。因为哪个组件保有状态数据，也只有它自己能够操作这些数据，发生 bug 的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。

如果某些数据可以由 props 或者 state 提供，那么它很有可能不应该在 state 中出现。

虽然不太常见，但**有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children**

```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

特殊实例
有时我们认为组件是其他组件的特殊实例。例如，我们会说 WelcomeDialog 是 Dialog 的特殊实例。

在 React 中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。

React 理念：

1. 把 UI 划分出组件层级；
2. 用 React 创建一个静态版本；
   要构建一个用于呈现数据模型的静态版本的应用程序，你需要创建能够复用其他组件的组件，并通过 props 来传递数据。props 是一种从父级向子级传递数据的方法。如果你熟悉 state 的概念， **在创建静态版本的时候不要使用 state**。State 只在交互的时候使用，即随时间变化的数据。由于这是静态版本的应用，你不需要使用它。
   你可以自顶向下或者自底向上构建应用。也就是，你可以从层级最高的组件开始构建(即 FilterableProductTable 开始)或层级最低的组件开始构建(ProductRow)。在较为简单的例子中，通常自顶向下更容易，而在较大的项目中，自底向上会更容易并且在你构建的时候有利于编写测试。
   在这步的最后，你会拥有一个用于呈现数据模型的可重用组件库。这些组件只会有 render() 方法，因为这只是你的应用的静态版本。层级最高的组件(FilterableProductTable)会把数据模型作为 prop 传入。
3. 定义 UI 状态的最小（但完整）表示
   想想我们的实例应用中所有数据。
   让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：
   - 它是通过 props 从父级传来的吗？如果是，他可能不是 state。
   - 它随着时间推移不变吗？如果是，它可能不是 state。
   - 你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。
4. 确定你的 State 应该位于哪里
   对你应用的每一个 state：
   - 确定每一个需要这个 state 来渲染的组件。
   - 找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
   - 这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
   - 如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。
5. 添加反向数据流
   层级结构中最底层的表单组件需要去更新在 它父组件 中的 state。通过父组件向子组件传入一个回调函数来实现。
