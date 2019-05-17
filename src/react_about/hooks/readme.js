/* eslint-disable */
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  forwardRef
} from 'react';

// Hook 是一种逻辑复用的方式
// Hook 可以让你在不编写 class 的情况下试用 state 以及其他的 React 特性。

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times.`;
  });

  return (
    <div>
      <p>You clicke {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

// 动机
// Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。
// 无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

// 可以在一个组件中多次试用 State Hook:

function ExampleWithManyStates() {
  // 声明多个 state 变量
  const [age, setAge] = useState(26);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

// 当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。
// 由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。
//默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。

// 副作用函数可以通过返回一个函数来指定如何“清除”副作用。

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    const { friend } = props;
    ChatAPI.subscribeToFriendStatus(friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }

  return isOnline ? 'Online' : 'OffLine';
}

// 跟 useState 一样，你可以在组件中多次使用 useEffect
// 通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。

// Hook 使用规则
// Hook 就是 Javascript 函数， 但是使用它们会有两个额外的规则：
//1. 只能在函数最外层调用 Hook。 不要在循环，条件判断或者子函数中调用。
//2. 只能在 React 的函数组件中调用 Hook。 不要在其他 Javascript 函数中调用。（还有一个地方可以从调用 Hook ————— 就是自定义的 Hook 中）

// 自定义 Hook

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 使用自定义 Hook

function FriendStatus(props) {
  const {
    friend: { id }
  } = props;
  const isOnline = useFriendStatus(id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const {
    friend: { id, name }
  } = props;
  const isOnline = useFriendStatus(id);

  return <li style={{ color: isOnline ? 'green' : 'black' }}>{name}</li>;
}

// Hook 是一种复用状态逻辑的方式，它不复用 state 本身。
//事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

// 自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。
// useSomething 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。

// 使用 State Hook

// Hook 是什么？ Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。
// 例如， useState 是允许你在 React 函数组件中添加 state 的 Hook.

// 什么时候我会用 Hook？
// 如果你在编写函数组件并意思到需要向其他忙完一些 state ，以前的做法是必须将其转换为 class. 现在你可以在现有的函数中间中使用 Hook.

// 使用 Effect Hook

// 它能在函数组件中执行副作用， 它与 class 中的生命周期函数类似。

// 数据获取， 设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

// 可以把 useEffect Hook 看做 componentDidMount, componentDidUpdate 和 componentWillUnmount 三个函数的组合

// 在 React 组件中有两种常见副作用操作： 需要清除的和不需要清除的。

// 有时候， 我们只想在 React 更新DOM 之后运行一些额外的代码。
// 比如发送网络请求，手动变更DOM，记录日志。这些都是常见的无需清除的操作。

// 在 React 的 class 组件中， render 函数是不应该有任何副作用的。
// 一般来说，在这里执行操作太早了， 我们基本上都希望在 React 更新 DOM 之后才执行我们的操作。

// 我们希望在组件加载和更新时执行同样的操作。
// 从概念上说，我们希望它在每次渲染之后执行 —— 但 React 的 class 组件没有提供这样的方法。
// 即使我们提取出一个方法，我们还是要在两个地方调用它。

// useEffect, 通过使用这个 Hook， 你可以告诉 React 组件需要在渲染后执行某些操作。
// React 会保存你传递的函数，并且在执行 DOM 更新之后调用它。
// React 保证了每次运行 effect 的时候， DOM 都已经更新完毕。

// 经验丰富的 JavaScript 开发人员可能会注意到，传递给 useEffect 的函数在每次渲染中都会有所不同，这是刻意为之的。
// 事实上这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因。
// 每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。

// 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，
// 这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），
// 有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。

// 需要清除的 effect

// 如果你的 effect 返回一个函数， React 将会在执行清除操作时调用它。

// 使用 Effect 的提示

// ：使用多个 Effect 实现关注点分离
// 使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。
// Hook 允许我们按照代码的用途分离他们，而不是像生命周期函数那样。

// ：通过跳过 Effect 进行性能优化
// 如果某些特定值在两次从渲染之间没有发生变化，你可以通过 React 通过对 effect 的调用， 只要传递数组作为 useEffect 的第二个可选参数即可

// 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
// 这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。
// 这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

// Hook 规则

// 只在最顶层使用 Hook
// 只在 React 函数中调用 Hook

// 自定义 Hook

// 目前为止，在 React中有两种流行的方式来共享组件之间的状态逻辑： render props 和 高阶组件。
// 现在我们有了，自定义 Hook

// 提取自定义 Hook
// 自定义 Hook 是一个函数，其名称以 "use" 开头， 函数内部可以调用其他的 Hook.

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState;

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });
}

// 与 React 组件不同的是，自定义 Hook 不需要具有特殊的标识。
// 我们可以自由的决定它的参数是什么，以及它应该返回什么（如果需要的话）。
// 换句话说，它就像一个正常的函数。但是它的名字应该始终以 use 开头，这样可以一眼看出其符合 Hook 的规则。

// 自定义 Hook 是一种自然遵循 Hook 设计的约定，而不是React的特性

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  //...
}

// Hook API 索引

// 基础 Hook

// useState

// 函数式更新
// 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。
// 该函数将接收先前的 state， 并返回一个更新后的值。

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>+</button>
    </>
  );
}

// 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。
// 你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

// 惰性初始 state
// initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
// 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

// 如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

// useEffect

useEffect(didUpdate);

// 你可以把 effect 看作是从 React 的纯函数世界通往命令式世界的逃生通道。

// 清除 effect
// 为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。

// effect 的执行时机
// 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。
// 这使得它适用于许多常见的副作用场景，比如如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

// React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。它和 useEffect 的结构相同，区别只是调用时机不同。

// 虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。

// effect 的条件执行
// 可以给 useEffect 传递第二个参数， 它是 effect 所依赖的值数组

// 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。

// 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
// 这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循输入数组的工作方式。

// useContext

const value = useContext(MyContext);

// 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
// 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

// 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。

// useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。
// 你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。

// 额外的 Hook

// useReducer
// useState 的代替方案

const [state, dispatch] = useReducer(reducer, initialArg, init);

// 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。
// 并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

// useCallback

const memoizeCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。
// 当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

useCallback(fn, deps);
// 相当于
useMemo(() => fn, deps);

// 注意
// 依赖项数组不会作为参数传给回调函数。
// 虽然从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。
// 未来编译器会更加智能，届时自动创建数组将成为可能。

// useMemo

const memoizedValue = useMemo(() => computedExpensiveValue(a, b), [a, b]);

// 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

// 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。
// 将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。
// 先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的

// useRef

const refContainer = useRef(initialValue);

// useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。

// 返回的 ref 对象在组件的整个生命周期内保持不变。

// 一个常见的用例便是命令式的访问子组件：
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

// 本质上， useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。

// 你应该熟悉 ref 这一种访问 DOM 的主要方式。如果你将 ref 对象以 <div ref={myRef} /> 形式传入组件，
// 则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

// 然而，useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。
// 这是因为它创建的是一个普通 Javascript 对象。
// 而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

// 请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。
// 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
// 回调 ref:
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measureRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measureRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}

// useImperativeHandle

useImperativeHandle(ref, createHandle, [deps]);

// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
// 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}

FancyInput = forwardRef(FancyInput);

// 在本例中，渲染 <FancyInput ref={fancyInputRef} /> 的父组件可以调用 fancyInputRef.current.focus()。

// useLayoutEffect

// 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。
// 可以使用它来读取 DOM 布局并同步触发重渲染。
// 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

//尽可能使用标准的 useEffect 以避免阻塞视觉更新。

// useDebugValue

useDebugValue(value);

// useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。
// 我们不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。
