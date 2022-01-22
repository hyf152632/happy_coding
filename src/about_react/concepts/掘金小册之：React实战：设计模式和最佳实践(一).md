# title

## React 的设计思想：

React 的基础原则：

1. React 界面完全由数据驱动；
2. React 中一切都是组件；
3. props 是 React 组件之间通讯的基本方式；

UI = f(data)

组件实现对网页访问的跟踪：

```js
class Beacon extends React.Component {
  componentDidMount() {
    //创造了一个 Image 对象，访问了一个特定的图片资源，
    //这样就可以对应服务器上留下日志记录，用于记录这一次网页访问。
    const beacon = new Image();
    beacon.src = "https://domain.nam/beacon.gif";
  }

  render() {
    return null;
  }
}

<div>
  <Beacon />
</div>;
```

## 如何定义清晰可维护的接口

设计 React 组件时，要注意的原则：

1. 保持接口小， props 数量要少；
2. 根据数据边界来划分组件， 充分利用组合(composition);
3. 把 state 往上层组件提取， 让下层组件只需要实现为纯函数；

### 组件的划分

任何一个复杂组件都是从简单组件开始的，一开始我们在 render 函数里写的代码不多，但是随着逻辑的复杂，JSX 代码越来越多，于是，就需要拆分函数中的内容。

在 React 中，有一个误区，就是把 render 中的代码分拆到多个 renderXXXX 函数中去，比如下面这样：

```js
class StopWatch extends React.Component {
  render() {
    const majorClock = this.renderMajorClock();
    const controlButtons = this.renderControlButtons();
    const splitTimes = this.renderSplitTimes();

    return (
      <div>
        {majorClock}
        {controlButtons}
        {splitTimes}
      </div>
    );
  }

  renderMajorClock() {
    //TODO: 返回数字时钟的JSX
  }

  renderControlButtons() {
    //TODO: 返回两个按钮的JSX
  }

  renderSplitTimes() {
    //TODO: 返回所有计次时间的JSX
  }
}
```

用上面的方法组织代码，当然比写一个巨大的 render 函数要强，但是，实现这么多 renderXXXX 函数并不是一个明智之举，因为这些 renderXXXX 函数访问的是同样的 props 和 state，这样代码依然耦合在了一起。更好的方法，是把这些 renderXXXX 重构成各自独立的 React 组件，像下面这样：

```js
class StopWatch extends React.Component {
  render() {
    return (
       <div>
          <MajorClock>
          <ControlButtons>
          <SplitTimes>
       </div>
    );
  }
}

const MajorClock = (props) => {
  //TODO: 返回数字时钟的JSX
};

const ControlButtons = (props) => {
  //TODO: 返回两个按钮的JSX
};

const SplitTimes = (props) => {
  //TODO: 返回所有计次时间的JSX
}
```

我们创造了 MajorClock、ControlButtons 和 SplitTimes 这三个组件，目前，我们并不知道它们是否应该有自己的 state，但是从简单开始，首先假设它们没有自己的 state，定义为函数形式的无状态组件。

### state 的位置

最佳实践：

1. 避免 renderXXXX 的函数；
2. 给回调函数类型的 props 加统一前缀(on-, 或者 handle-);
3. 使用 propTypes 来定义组件的 props;

## 组件的内部实现

我们不大可能一次就写出完美的代码，软件开发本来就是一个逐渐精进的过程，但是我们应该努力让代码达到这样的要求：

- 功能正常；
- 代码整洁；
- 高性能。

所以，从达到“代码整洁”的目的来说，应该每个组件都有一个独立的文件，然后这个文件用 export default 的方式导出单个组件。

函数组件导入 `React` 的原因是因为 函数组件会 `return` JSX , JSX 会用到 `React`。

如果定义构造函数 constructor，一定要记得通过 super 调用父类 React.Component 的构造函数。开发者容易犯一个常见错误，就是这样调用 super 函数：

```js
  constructor(props) {
    super(props); //这是错误的！！！
  }
```

其实，React.Component 的参数有两个，第一个是 props，第二个是 context，如果忽略掉 context 参数，那么这个组件的 context 功能就不能正常工作。目前，React.Component 的构造函数只有两个参数，没准未来还会增加新的参数呢，所以，最以不变应万变的方法，就是使用扩展操作符（spread operator）来展开 arguments，这样不管 React 将来怎么变，这样的代码都正确。

```js
  constructor() {
    super(...arguments); //永远正确！
  }
```

扩展操作符的作用，在 React 开发中会经常用到，在 JSX 中展开 props 的时候会用到。

### 属性初始化方法

我们也可以完全避免编写 constructor 函数， 而直接使用属性初始化(Property Initializer), 也就是在 class 定义中直接初始化类的成员变量。

不用 constructor, 可以这样初始化 state, 效果是完全一样的：

```js
class StopWatch extends React.Component {
  state = {
    isStarted: false,
    startTime: null,
    currentTime: null,
    splits: []
  };
}
```

尽量不要在 JSX 中写内联函数（inline function）:

```html
<ControlButtons activated={this.state.isStarted} onStart={() => { /* TODO */}}
onPause={() => { /* TODO */}} onReset={() => { /* TODO */}} onSplit={() => { /*
TODO */}} />
```

会带来性能的代价。
首先，每一次渲染这段 JSX，都会产生全新的函数对象，这是一种浪费；
其次，因为每一次传给 ControlButtons 的都是新的 props，这样 ControlButtons 也无法通过 shouldComponentUpdate 对 props 的检查来避免重复渲染。

通常的处理方法，就是在构造函数中对函数进行绑定，然后把新产生的函数覆盖原有的函数，就像这样：

```js
constructor() {
  super(...arguments)

  this.onSplit = this.onSplit.bind(this)
}

//如果可以使用 bind operator, 也可以这样写：
this.onSplit = ::this.onSplit

//可惜 bind operator 并不是稳定的标准语法，而 create-react-app 又不想依赖不稳定的语法，所以在我们的应用中还不能这么写。

```

本章技巧:

1. 尽量每个组件都有自己专属的源代码文件；
2. 用解构赋值(destructuring assignment) 的方法获取参数 props 的每个属性值；
3. 利用属性初始化 (property Initializer) 来定义 state （直接写成类的属性）和成员函数（箭头函数的形式）；

## 组件化样式

style 属性；

如果 style 对象每次都是一样的，最好把它提取到组件之外，这样就可以重用一个对象，像下面这样：

```js
const clockStyle = {
  'font-family': 'monospace'
}

const MajorClick = ({milliseconds = 0}) => {
  return <h1 style={clockStyle}?{ms2Time(milliseconds)}</h1>
}
```

导入 CSS 文件；

styled jsx 用法；

1. React 将内容，样式和动态功能聚集在一个模块中，是高聚合的表现；
2. React 原生 style 属性的用法；
3. 组件化样式 styled jsx 的用法

是使用 react-app-rewired，不需要 eject，轻轻松松就能够修改 create-react-app 产生应用的配置方法。
