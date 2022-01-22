# title

## 深入理解组件

- 组件的 state
  必须能代表一个组件 UI 呈现的完整状态集，即组件的任何 UI 改变都可以从 state 的变化中反映出来，同时，state 还必须代表一个组件 UI 呈现的最小状态集，
  即 state 中的所有状态都用于反映组件 UI 的变化，没有任何多余的状态，也不应该存在通过其他状态计算而来的中间状态。

  state 所代表的一个组件 UI 呈现的完整状态集又可以分成两类数据：用作渲染组件时使用到的数据来源以及用作组件 UI 展现形式的判断依据。

  区分 state，props 以及组件的普通属性（比如定时器：this.timer）

  判断一个变量是不是应该作为 state 的 4 条依据：

  1. 这个变量是否通过 props 从父组件中获取？如果是，那么它不是一个状态
  2. 这个变量是否在组件中的整个生命周期中都保持不变？如果是，那么它不是一个状态
  3. 这个变量是否可以通过其他状态或者属性（props）计算得到？如果是，那么不是一个状态
  4. 这个变量是否在组件的 render 方法中使用？如果不是，那么它不是一个状态，这种情况下，这个变量更适合定义为组件的一个普通属性

  正确修改 state

  1. 不能直接改
     正确的方法：
     ```js
     this.setState({ title: "React" });
     ```
  2. state 的更新是异步的

  ```js
  this.setState((prevState, props) => ({
    counter: prevState.quantity + 1
  }));
  ```

  3. state 的更新是一个合并的过程
     当调用 setState 修改组件状态时，只需要传入发生改变的 state，而不是组件完整的 state，因为组件 state 的更新是一个合并的过程。

  state 与不可变对象
  React 官方建议把 state 当作不可变对象
  三种创建新的状态的情况：

  1. 状态的类型是不可变类型（数字，字符串，布尔值，null, undefined）
     直接赋新值
  2. 状态的类型是数组
     concat, spread syntax, slice, filter
  3. 状态的类型是普通对象：
     Object.assign, object spread properties
     也可以使用一些 Immutable 的 JS 类库(如 Immutable.js)

- 组件与服务器通信

  1. 挂载阶段的通信

     ComponentDidMount
     还可能用 ComponentWillMount,构造函数
     ComponentWillMount 的缺点：

     - 此时不能直接操作 ComponentDidMount
     - 对于服务端渲染，会执行两次

     构造函数中最好不要执行有副作用的工作

  2. 更新阶段的通信
     例如， 组件需要以 props 中的某个属性作为与服务器通信时的请求参数，当这个属性值发生更新的时候，组件需要重新与服务器通信
     componentWillReceiveProps

     ```js
     //...
     componentWillRecieveProps(nextProps) {
       if(nextProps.category !== this.props.category) {
         fetch().then()
       }
     }
     ```

- 组件通信

  - 父子组件通信

    父组件向子组件通信是通过父组件向子组件的 props 传递数据完成的
    子组件向父组件通信，父组件可以通过子组件的 props 传递给子组件一个回调函数，子组件在需要改变父组件数据时，调用这个回调函数即可

  - 兄弟组件通信
    兄弟组件并不一定在同一层级，只要有相同的父组件
    需要通过状态提升的方式实现兄弟组件的通信

  - Context

  - 其他方式
    消息队列，即观察者模式，可以通过引入 EventEmitter 或 Postal.js 等消息队列库来完成，更加复杂的时候，还可以引入专门的状态管理库实现组建通信和组件状态的管理，例如 Redux 和 MobX

- 组件的 ref 属性
  绝大多数场景下，应该避免使用 ref， 因为它破坏了 React 中以 props 为数据传递介质的典型数据流

  - DOM 元素上使用 ref, auto focus
  - 组件上使用 ref ， 此时 ref 的回调函数接收的参数是当前组件的实例，这提供了一种在组件外部操作组件的方式
    不能为函数组件定义 ref 属性，但是可以在函数组件内部使用 ref 来引用其他 DOM 元素或组件

  ```js
  function MyFunctionalComponent() {
    let textInput = null;
    function handleClick() {
      textInput.focus();
    }
    return (
      <div>
        <input
          type="text"
          ref={input => {
            textInput = input;
          }}
        />
        <button onClick={handleClick}>获取焦点</button>
      </div>
    );
  }
  ```

  - 父组件访问子组件的 DOM 节点
    直接使用 ref 是无法实现的，因为 ref 只能获取子组件的实例对象，而不能获取子组件中的某个 DOM 元素。
    一种间接的方式是：在子组件的 DOM 元素上定义 ref， ref 的值是父组件传递给子组件的一个回调函数，回调函数可以通过一个自定义的属性传递，这样父组件的回调函数中就能获取到这个 DOM 元素。

    ```js
    function Children(props) {
      //子组件使用父组件传递的inputRef, 为input 的 ref 赋值
      return (
        <div>
          <input ref={props.inputRef}>
        </div>
      )
    }
    class Parent extends React.Component {
      render() {
        return (
          <Children
            inputRef = {el => this.inputRef = el}
          >
        )
      }
    }
    ```

    React.forwardRef
    React.forwardRef accepts a render function that receives props and ref parameters and returns a React node.
    Ref forwarding is a technique for passing a ref through a component to one of its descendants.
    This technique can be particularly useful with higher-order components:

## 虚拟 DOM 和性能优化

在软件开发中，有这么一句话：软件开发中遇到的所有问题都可以通过增加一层抽象而得到解决。

虚拟 DOM 是用来描述真实 DOM 的 JS 对象

Diff 算法中，比较的两方是新的虚拟 DOM 和旧的虚拟 DOM，而不是虚拟 DOM 和真实 DOM，只不过 Diff 算法的结果会更新到真实 DOM 上。

性能优化：
React 通过虚拟 DOM, 高效的 Diff 算法等技术极大地提高了操作 DOM 的效率。
React 中常用的性能优化方式：

- 使用生产环境版本的库
  对于 create-react-app 脚手架创建的项目，只需要执行 npm run build 就会构建生产环境版本的 react 库。其原理是，
  一般第三方库都会根据 process.env.NODE_ENV 这个环境变量决定在开发环境和生产环境下执行的代码有哪些不同，
  当执行 npm run build 时， 构建脚本会把 NODE_ENV 的值设置为 production 也就是会以生产环境模式编译代码。
  自己构建的项目，通过 webpack 的插件配置：
  ```js
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  });
  ```
- 避免不必要的组件渲染
  父组件的每一次 render 都会触发子组件的 componentwillReceiveProps 的调用，进而子组件的 render 方法也会被调用，但是这时候
  子组件的 props 可能并没有没发生改变，改变的只是父组件的 props 或 state，所以这一次子组件的 render 是没有必要的，
  不仅多了一次 render 方法的执行时间，还多了一次虚拟 DOM 比较的时间。
  React 的 shouldComponentUpdate
  React 提供的 PureComponent 组件，会使用浅比较来比较新旧 props 和 state，因此可以通过让组件继承
  PureComponent 组件来代替手写 shouldComponentUpdate 的逻辑，但是，使用浅比较很容易因为直接修改数据而产生错误。
  比如，我们直接修改 state 中的一个数组类型的数据，而不是对其赋一个新值。此时由于数组的指针没有发生改变，
  shouldComponentUpdate 会返回 false，也就会跳过 re-render。
- 使用 key

## 高阶组件

高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好的被复用。高阶组件的这种实现方式本质上是装饰者设计模式。

4 种使用场景：

1. 操纵 props
2. 通过 ref 访问组件实例
   高阶组件通过 ref 获取被包装的组件实例的引用， 然后高阶组件就具备了直接操作被包装组件的属性或方法的能力
3. 组件状态提升
4. 用其他元素包装组件
   通常用于为被包装的组件增加布局或修改样式

参数传递
高阶组件的参数并非只能是一个组件，它还可以接收其他参数。
在实际情况中，我们会采用更加灵活，更具有通用性的函数形式：
HOC(...params)(WrappedComponent)

比如 react-redux 的 connect 函数：
connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
这个函数会将一个 React 组件连接到 Redux 的 store 上，在连 接的过程中， connect 通过函数
参数 mapstatetoprops 从全局 store 中取出当前组件需要的 state，并把 state 转化成当前组件的 props;
同时通过函数参数 mapdispatchtoprops 把当前组件用到的 Redux 的 action creators 以 props 的方式
传递给当前组件。 connect 并不会修改传递进去的组件的定义，而是 会返回一个新的组件。

compose 辅助函数

继承方式实现高阶组件：

通过继承被包装对象组件实现逻辑复用。继承方式实现的高阶组件常用于渲染劫持。
例如，当用户处于登录状态时，允许组件渲染；否则渲染一个空组件：

```js
function withAuth(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render();
      } else {
        return null;
      }
    }
  };
}
```
