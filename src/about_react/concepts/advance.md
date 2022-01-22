# advance

通过数组的形式返回多个元素：

```js
render() {
  //不需要使用额外的元素包裹数组中的元素
  return [
    <li key='a'>First item</li>,
    <li key='b'>Second item</li>,
    <li key='c'>Third item</li>
  ]
}
```

函数作为子组件：

```js
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

## Refs

Refs 提供了一种方式，用于访问在 render 方法中创建的 DOM 节点或 React 元素。

在典型的 React 数据流中, 属性（props）是父组件与子组件交互的唯一方式。要修改子组件，你需要使用新的 props 重新渲染它。但是，某些情况下你需要在典型数据流外强制修改子组件。要修改的子组件可以是 React 组件的实例，也可以是 DOM 元素。对于这两种情况，React 提供了解决办法。

不要过度使用 Refs
你可能首先会想到在你的应用程序中使用 refs 来更新组件。如果是这种情况，请花一点时间，重新思考一下 state 属性在组件层中位置。通常你会想明白，提升 state 所在的组件层级会是更合适的做法。

React **v16.3** 引入的 React.createRef() API 更新。如果你正在使用 React 更早的发布版，我们推荐使用回调形式的 refs。

ref 的值取决于节点的类型:

- 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref 。
- 当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。
- **你不能在函数式组件上使用 ref 属性，因为它们没有实例**。

但是，你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件：

```js
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
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

      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

你可以在组件间传递回调形式的 refs，就像你可以传递通过 React.createRef() 创建的对象 refs 一样。

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput inputRef={el => (this.inputElement = el)} />;
  }
}
```

在上面的例子中，Parent 传递给它的 ref 回调函数作为 inputRef 传递给 CustomTextInput，然后 CustomTextInput 通过 ref 属性将其传递给 `<input>`。最终，Parent 中的 this.inputElement 将被设置为与 CustomTextIput 中的 `<input>` 元素相对应的 DOM 节点

旧版 API：String 类型的 Refs
如果你之前使用过 React ，你可能了解过之前的 API 中的 string 类型的 ref 属性，比如 “textInput” ，你可以通过 this.refs.textInput 访问 DOM 节点。我们不建议使用它，因为 String 类型的 refs 存在问题。它已过时并可能会在未来的版本被移除。如果你目前还在使用 this.refs.textInput 这种方式访问 refs ，我们建议用回调函数的方式代替。

## 非受控组件

要编写一个非受控组件，而非为每个状态更新编写事件处理程序，你可以 使用 ref 从 DOM 获取表单值。

使用非受控组件时，通常你希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，你可以指定一个 defaultValue 属性而不是 value。

同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 defaultChecked，`<select>` 和 `<textarea>` 支持 defaultValue.

## 性能优化

- 使用生产版本
  如果你不确定构建过程是否正确，可以安装 React 开发者工具（chrome）。当你访问一个生产模式的 React 页面时，这个工具的图标会有一个黑色的背景：
- 使用 Chrome Performance 归档组件
  React 事件将会被归类在 User Timing 标签下。
- 避免重复渲染
  当一个组件的 props 或者 state 改变时，React 通过比较新返回的元素和之前渲染的元素来决定是否有必要更新实际的 DOM。当他们不相等时，React 会更新 DOM。
  在一些情况下，你的组件可以通过重写这个生命周期函数 shouldComponentUpdate 来提升速度， 它是在重新渲染过程开始前触发的。 这个函数默认返回 true，可使 React 执行更新：
  ```js
  shouldComponentUpdate(nextProps, nextState) {
  return true;
  }
  ```
  大部分情况下，你可以使用 React.PureComponent 而不必写你自己的 shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。
  对于更复杂的数据结构这可能成为一个问题。例如，子组件需要根据父组件的一个为数组 state 属性，来 render。这时如果只是这个数组内部的变化（也就是不返回新数组的变化），就不会引起子组件的 re-render.
- 不会突变的数据的力量（每次返回全新的值，而不是之前的旧对象）
  数组用扩展操作符，对象用 Object.assign/或者 spread 对象(Create React App 默认支持)

## 不使用 ES6

通常我们会用 js 的 class 关键字来创建 React 组件，但是如果你不打算使用 ES6，你也可以使用`create-react-class`模块来创建组件。
不同点：

- 如果使用 class 关键字创建组件，可以直接把自定义属性对象写到类的 defaultProps 属性中；如果使用 createReactClass 方法创建组件，那就需要在参数对象中定义 getDefaultProps 方法，并且在这个方法中返回包含自定义属性的对象：
- 如果使用 class 关键字创建组件，你可以通过在 constructor 中给 this.state 赋值的方式来定义组件的初始状态：如果使用 createReactClass 方法创建组件，你就需要多写一个 getInitialState 方法，并让这个方法返回你要定义的初始属性：
- 如果使用 createReactClass 方法创建组件，组件中的方法会自动绑定至实例，不需要像上面那样加 .bind(this)：

ES6 本身是不包含混入支持的。因此，如果你使用 class 关键字创建组件，那就不能使用混入功能了。

## Reconciliation(协调)

当你使用 React，在单一时间点你可以考虑 render()函数作为创建 React 元素的树。在下一次状态或属性更新，render()函数将返回一个不同的 React 元素的树。React 需要算出如何高效更新 UI 以匹配最新的树。

有一些解决将一棵树转换为另一棵树的最小操作数算法问题的通用方案。然而，树中元素个数为 n，最先进的算法 的时间复杂度为 O(n3) 。

若我们在 React 中使用，展示 1000 个元素则需要进行 10 亿次的比较。这操作太过昂贵，相反，React 基于两点假设，实现了一个启发的 O(n)算法

## Context

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

### when

Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

注意
不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

## Fragments

React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在 DOM 中增加额外节点.

### why

为了渲染有效的 HTML ， `<Columns />` 需要返回多个 `<td>` 元素。如果一个父 div 在 `<Columns />` 的 render() 函数里面使用，那么最终的 HTML 将是无效的。

### how

你可以像使用其它元素那样使用 `<></>`。

清晰的形式
另一种使用片段的方式是使用 React.Fragment 组件，React.Fragment 组件可以在 React 对象上使用。 这可能是必要的，如果你的工具还不支持 JSX 片段。 注意在 React 中， <></> 是 <React.Fragment/> 的语法糖。

带 key 的 Fragments
<></> 语法不能接受键值或属性。

如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment /> 。
key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。

## Portals

Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或碎片。第二个参数（container）则是一个 DOM 元素。

对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上“跳出（break out）”其容器。例如，对话框、hovercards 以及提示框：

注意：
记住这点非常重要，当在使用 portals 时，你需要确保遵循合适的可访问指南。

一个从 portal 内部会触发的事件会一直冒泡至包含 React 树 的祖先。

## Error Boundaries

部分 UI 的异常不应该破坏了整个应用。为了解决 React 用户的这一问题，React 16 引入了一种称为 “错误边界” 的新概念。

错误边界是用于捕获其子组件树 JavaScript 异常，记录错误并展示一个回退的 UI 的 React 组件，而不是整个组件树的异常。错误组件在渲染期间，生命周期方法内，以及整个组件树构造函数内捕获错误。

注意
错误边界无法捕获如下错误:

- 事件处理 （了解更多）
- 异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
- 服务端渲染
- 错误边界自身抛出来的错误 （而不是其子组件）

如果一个类组件定义了一个名为 componentDidCatch(error, info): 的新方法，则其成为一个错误边界：

```js
 componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }
```

componentDidCatch() 方法机制类似于 JavaScript catch {}，但是针对组件。**仅有类组件可以成为错误边界**。实际上，**大多数时间你仅想要定义一个错误边界组件并在你的整个应用中使用**。

注意错误边界仅可以捕获其子组件的错误。

如何放置错误边界
错误边界的粒度完全取决于你的应用。你可以将其包装在最顶层的路由组件并为用户展示一个 “发生异常（Something went wrong）“的错误信息，就像服务端框架通常处理崩溃一样。你也可以将单独的插件包装在错误边界内部以保护应用不受该组件崩溃的影响。

未捕获错误（Uncaught Errors）的新行为
这一改变有非常重要的意义。自 React 16 开始，任何未被错误边界捕获的错误将会卸载整个 React 组件树。

这一改变意味着随着你迁入到 React 16，你将可能会发现一些已存在你应用中但未曾注意到的崩溃。增加错误边界能够让你在发生异常时提供更好的用户体验。

例如，Facebook Messenger 将侧边栏、信息面板，对话框以及信息输入框包装在单独的错误边界中。如果其中的某些 UI 组件崩溃，其余部分仍然能够交互。

我们也鼓励使用 JS 错误报告服务（或自行构建）这样你能够掌握在生产环境中发生的未捕获的异常，并将其修复。

如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript try / catch 语句：

React 15 在一个不同的方法名下：unstable_handleError 包含了一个支持有限的错误边界。这一方法不再能用，同时自 React 16 beta 发布起你需要在代码中将其修改为 componentDidCatch。

## Web Components

## 高阶组件

高阶组件（HOC）是 react 中对组件逻辑进行重用的高级技术。但高阶组件本身并不是 React API。它只是一种模式，这种模式是由 react 自身的组合性质必然产生的。

具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件

**对比组件将 props 属性转变成 UI，高阶组件则是将一个组件转换成另一个新组件**。

高阶组件既不会修改 input 原组件，也不会使用继承复制 input 原组件的行为。相反，高阶组件是通过将原组件 包裹（wrapping） 在容器组件（container component）里面的方式来 组合（composes） 使用原组件。高阶组件就是一个没有副作用的纯函数。

和普通组件一样，withSubscription 和包裹组件之间的关联是完全基于 props 属性的。这就使为组件切换一个 HOC 变得非常轻松，只要保证备选的几种高阶组件向包裹组件提供是相同类型的 props 属性即可。

用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。

```js
 render() {
      // 用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。
      return <WrappedComponent {...this.props} />;
    }
```

**你可能发现了高阶组件和 容器组件的相似之处**。  
容器组件是专注于在高层次和低层次关注点之间进行责任划分的策略的一部分。  
容器组件会处理诸如数据订阅和状态管理等事情，并传递 props 属性给展示组件。  
而展示组件则负责处理渲染 UI 等事情。  
**高阶组件使用容器组件作为实现的一部分。你也可以认为高阶组件就是参数化的容器组件定义**。

react-redux 的 connect 是一个返回高阶组件的高阶函数

```js
// 不要这样做……
const EnhancedComponent = withRouter(
  connect(commentSelector)(WrappedComponent)
);

// ……你可以使用一个功能组合工具
// compose(f, g, h) 和 (...args) => f(g(h(...args)))是一样的
const enhance = compose(
  // 这些都是单参数的高阶组件
  withRouter,
  connect(commentSelector)
);
const EnhancedComponent = enhance(WrappedComponent);
```

注意事项：

- 不要在 render 函数中使用高阶组件
  这里产生的问题不仅仅是性能问题 —— 还有，重新加载一个组件会引起原有组件的所有状态和子组件丢失。
  相反，在组件定义外使用高阶组件，可以使新组件只出现一次定义。在渲染的整个过程中，保证都是同一个组件。无论在任何情况下，这都是最好的使用方式。
  在很少的情况下，你可能需要动态的调用高阶组件。那么你就可以在组件的构造函数或生命周期函数中调用。
- 必须将静态方法做拷贝
  这样做，就需要你清楚的知道都有哪些静态方法需要拷贝。你可以使用 hoist-non-react-statics 来帮你自动处理，它会自动拷贝所有非 React 的静态方法：
  ```js
  import hoistNonReactStatic from 'hoist-non-react-statics';
  function enhance(WrappedComponent) {
  class Enhance extends React.Component {/_..._/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
  }
  ```
- Refs 属性不能传递
  现在我们提供一个名为 React.forwardRef 的 API 来解决这一问题（在 React 16.3 版本中）

## 传递 Refs

If you add a ref to a HOC, the ref will refer to the outermost container component, not the wrapped component.

## Render Props

术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术.

使用 render props 的库包括 React Router 和 Downshift。

这也是 render prop 的来历：我们可以提供一个带有函数 prop 的 <Mouse> 组件，它能够动态决定什么需要渲染的，而不是将 <Cat> 硬编码到 <Mouse> 组件里，并有效地改变它的渲染结果。

使用 Props 而非 render
记住仅仅是因为这一模式被称为 “render props” 而你不必为使用该模式而用一个名为 render 的 prop。实际上，组件能够知道什么需要渲染的任何函数 prop 在技术上都是 “render prop” 。

## 与第三方库协同

我们可以在任何网页应用中使用 React。不仅可以把 React 添加到其他应用里，而且只要稍作改动，我们也可以把其他应用添加到 React 项目里。本文将着重介绍如何将 React 与 jQuery 以及 Backbone 结合使用。当然，类似的思路同样可以应用与其他场景。

## 可访问性(Accessibility)

Web 可访问性（也被称为 a11y）是让网站对所有人群可用的的设计和发明。通过辅助技术来与页面交互对于可访问性支持是必要的。

React 完全支持构建可访问性的页面， 通常通过使用标准的 HTML 技术。
