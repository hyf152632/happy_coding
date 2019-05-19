# useEffect 完整指南

[原文](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

当我不在透过熟悉的 class 生命周期方法去窥视 useEffect 这个 Hook 的时候，我才得以融会贯通。

想要更有效，你需要“think in effects”，它的心智模型更接近于实现状态同步，而不是响应生命周期事件。

[]表示 effect 没有使用任何 React 数据流里的值，因此该 effect 仅被调用一次是安全的。
[]同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。你需要学习一些策略（主要是 useReducer 和 useCallback）来移除这些 effect 依赖，而不是错误地忽略它们。

Question: 我应该把函数当做 effect 的依赖吗？

一般建议把不依赖 props 和 state 的函数提到你的组件外面，并且把那些仅被 effect 使用的函数放到 effect 里面。
如果这样做了以后，你的 effect 还是需要用到组件内的函数（包括通过 props 传进来的函数），可以在定义它们的地方用 useCallback 包一层。
为什么要这样做呢？因为这些函数可以访问到 props 和 state，因此它们会参与到数据流中。

Question: 为什么有时候会出现无限重复请求的问题？

这个通常发生于你在 effect 里做数据请求并且没有设置 effect 依赖参数的情况。
没有设置依赖，effect 会在每次渲染后执行一次，然后在 effect 中更新了状态引起渲染并再次触发 effect。
无限循环的发生也可能是因为你设置的依赖总是会改变。

为什么有时候在 effect 里拿到的是旧的 state 或 prop 呢？

Effect 拿到的总是定义它的那次渲染中的 props 和 state。这能够避免一些 bugs，但在一些场景中又会有些讨人嫌。
对于这些场景，你可以明确地使用可变的 ref 保存一些值（上面文章的末尾解释了这一点）。
如果你觉得在渲染中拿到了一些旧的 props 和 state，且不是你想要的，你很可能遗漏了一些依赖。可以尝试使用这个 lint 规则来训练你发现这些依赖。
可能没过几天，这种能力会变得像是你的第二天性。

**每一次渲染都有它自己的 Props 和 State**.

当我们更新状态的时候，React 会重新渲染组件。每一次渲染都能拿到独立的 count 状态，这个状态值是函数中的一个常量。

这里关键的点在于任意一次渲染中的 count 常量都不会随着时间改变。渲染输出会变是因为我们的组件被一次次调用，而每一次调用引起的渲染中，它包含的 count 值独立于其他渲染。

**每一次渲染都有他自己的事件处理函数**。

**在任意一次渲染中， props 和 state 是始终保持不变的**。

**每次渲染都有它自己的 Effects**.

effect 是如何读取到最新的 count 状态值的呢？

并不是 count 的值在“不变”的 effect 中发生了改变，而是 effect 函数本身在每一次渲染中都不相同。

每一个 effect 版本“看到”的 count 值都来自于它属于的那次渲染：

React 会记住你提供的 effect 函数，并且会在每次更改作用于 DOM 并让浏览器绘制屏幕后去调用它。

所以虽然我们说的是一个 effect（这里指更新 document 的 title），但其实每次渲染都是一个不同的函数 — 并且每个 effect 函数“看到”的 props 和 state 都来自于它属于的那次特定渲染。

概念上，你**可以想象**effects 是渲染结果的一部分。

严格地说，它们并不是（为了允许 Hook 的组合并且不引入笨拙的语法或者运行时）。但是在我们构建的心智模型上，effect 函数属于某个特定的渲染，就像事件处理函数一样。

**每一次渲染都有它自己的…所有**.
我们现在知道 effects 会在每次渲染后运行，并且概念上它是组件输出的一部分，可以“看到”属于某次特定渲染的 props 和 state。

当封闭的值始终不会变的情况下闭包是非常棒的。
这使它们非常容易思考因为你本质上在引用常量。正如我们所讨论的，props 和 state 在某个特定渲染中是不会改变的。

每一个组件内的函数（包括事件处理函数，effects，定时器或者 API 调用等等）会捕获 **某次渲染中**定义的 props 和 state。

在组件内什么时候去读取 props 或者 state 是无关紧要的。因为它们不会改变。在单次渲染的范围内，props 和 state 始终保持不变。（解构赋值的 props 使得这一点更明显。）

当然，有时候你可能想在 effect 的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用 refs。

下面这个计数器版本 模拟了 class 中的行为：

```js
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);
  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);    }, 3000);
  });
  // ...
```

在 React 中去直接修改值看上去有点怪异。然而，在 class 组件中 React 正是这样去修改 this.state 的。
不像捕获的 props 和 state，你没法保证在任意一个回调函数中读取的 latestCount.current 是不变的。
根据定义，你可以随时修改它。这就是为什么它不是默认行为，而是需要你主动选择这样做。

那 Effect 中的清理又是怎样的呢？

如果依赖这种心智模型，你可能会认为清除过程“看到”的是旧的 props 因为它是在重新渲染之前运行的，新的 effect“看到”的是新的 props 因为它是在重新渲染之后运行的。
这种心智模型直接来源于 class 组件的生命周期。不过它并不精确。

React 只会在浏览器绘制后运行 effects。这使得你的应用更流畅因为大多数 effects 并不会阻塞屏幕的更新。
Effect 的清除同样被延迟了。**上一次的 effect 会在重新渲染后被清除**：

引用上半部分得到的结论:
组件内的每一个函数（包括事件处理函数，effects，定时器或者 API 调用等等）会捕获定义它们的那次渲染中的 props 和 state。

现在答案显而易见。effect 的清除并不会读取“最新”的 props。它只能读取到定义它的那次渲染中的 props 值

这正是为什么 React 能做到在绘制后立即处理 effects — 并且默认情况下使你的应用运行更流畅。如果你的代码需要依然可以访问到老的 props。

**同步，而非生命周期**。

人们总是说：“重要的是旅行过程，而不是目的地”。在 React 世界中，恰好相反。
重要的是目的，而不是过程。这就是 JQuery 代码中 $.addClass 或 $.removeClass 这样的调用（过程）和 React 代码中声明 CSS 类名应该是什么（目的）之间的区别。

React 会根据我们当前的 props 和 state 同步到 DOM。“mount”和“update”之于渲染并没有什么区别。

你应该以相同的方式去思考 effects。**useEffect 使你能够根据 props 和 state 同步 React tree 之外的东西**。

```js
function Greeting({ name }) {
  useEffect(() => {
    document.title = 'Hello, ' + name
  })
  return <h1 className="Greeting">Hello, {name}</h1>
}
```

这就是和大家熟知的 mount/update/unmount 心智模型之间细微的区别。
理解和内化这种区别是非常重要的。如果你试图写一个 effect 会根据是否第一次渲染而表现不一致，你正在逆潮而动。
如果我们的结果依赖于过程而不是目的，我们会在同步中犯错。

先渲染属性 A，B 再渲染 C，和立即渲染 C 并没有什么区别。虽然他们可能短暂地会有点不同（比如请求数据时），但最终的结果是一样的。

不过话说回来，在每一次渲染后都去运行所有的 effects 可能并不高效。（并且在某些场景下，它可能会导致无限循环。）

所以我们该怎么解决这个问题？

告诉 React 去比对你的 Effects

其实我们已经从 React 处理 DOM 的方式中学习到了解决办法。React 只会更新 DOM 真正发生改变的部分，而不是每次渲染都大动干戈。

// React can't peek inside of functions, but it can compare deps.
// Since all deps are the same, it doesn’t need to run the new effect.

关于依赖项不要对 React 撒谎

**两种诚实告知依赖的方法**。
有两种诚实告知依赖的策略。你应该从第一种开始，然后在需要的时候应用第二种。

第一种策略是在依赖中包含所有 effect 中用到的组件内的值。

第二种策略是修改 effect 内部的代码以确保它包含的值只会在需要的时候发生变更。
我们不想告知错误的依赖 - 我们只是修改 effect 使得依赖更少。

让我们来看一些移除依赖的常用技巧。

让 Effects 自给自足
我们想去掉 effect 的 count 依赖。

```js
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1)
  }, 1000)
  return () => clearInterval(id)
}, [count])
```

为了实现这个目的，我们需要问自己一个问题：我们为什么要用 count？
可以看到我们只在 setCount 调用中用到了 count。在这个场景中，我们其实并不需要在 effect 中使用 count。
当我们想要根据前一个状态更新状态的时候，我们可以使用 setState 的函数形式：

```js
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1)
  }, 1000)
  return () => clearInterval(id)
}, [])
```

我喜欢把类似这种情况称为“错误的依赖”。
是的，因为我们在 effect 中写了 setCount(count + 1)所以 count 是一个必需的依赖。
但是，我们真正想要的是把 count 转换为 count+1，然后返回给 React。可是 React 其实已经知道当前的 count。我们需要告知 React 的仅仅是去递增状态 - 不管它现在具体是什么值。
这正是 setCount(c => c + 1)做的事情。你可以认为它是在给 React“发送指令”告知如何更新状态。这种“更新形式”在其他情况下也有帮助，比如你需要批量更新。

注意我们做到了移除依赖，并且没有撒谎。我们的 effect 不再读取渲染中的 count 值。
尽管 effect 只运行了一次，第一次渲染中的定时器回调函数可以完美地在每次触发的时候给 React 发送 c => c + 1 更新指令。
它不再需要知道当前的 count 值。因为 React 已经知道了。

函数式更新 和 Google Docs

还记得我们说过同步才是理解 effects 的心智模型吗？
同步的一个有趣地方在于你通常想要把同步的“信息”和状态解耦。
举个例子，当你在 Google Docs 编辑文档的时候，Google 并不会把整篇文章发送给服务器。
那样做会非常低效。相反的，它只是把你的修改以一种形式发送给服务端。

虽然我们 effect 的情况不尽相同，但可以应用类似的思想。只在 effects 中传递最小的信息会很有帮助。
类似于 setCount(c => c + 1)这样的更新形式比 setCount(count + 1)传递了更少的信息，因为它不再被当前的 count 值“污染”。
它只是表达了一种行为（“递增”）。“Thinking in React”也讨论了[如何找到最小状态](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)。
原则是类似的，只不过现在关注的是如何更新。

表达意图（而不是结果）和 Google Docs 如何处理共同编辑异曲同工。
虽然这个类比略微延伸了一点，函数式更新在 React 中扮演了类似的角色。
它们确保能以批量地和可预测的方式来处理各种源头（事件处理函数，effect 中的订阅，等等）的状态更新。

然而，即使是 setCount(c => c + 1)也并不完美。它看起来有点怪，并且非常受限于它能做的事。
举个例子，如果我们有两个互相依赖的状态，或者我们想基于一个 prop 来计算下一次的 state，它并不能做到。
幸运的是， **setCount(c => c + 1)有一个更强大的姐妹模式，它的名字叫 useReducer**。

**当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用 useReducer 去替换它们**。

当你写类似 setSomething(something => ...)这种代码的时候，也许就是考虑使用 reducer 的契机。
reducer 可以让你把组件内发生了什么(actions)和状态如何响应并更新分开表述。

```js
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);    }, 1000);
    return () => clearInterval(id);
  }, [step]);
  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' });
    // Instead of setCount(c => c + step);  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

你可能会问：“这怎么就更好了？”
答案是 React 会保证 dispatch 在组件的声明周期内保持不变。所以上面例子中不再需要重新订阅定时器。

我们解决了问题!
（你可以从依赖中去除 dispatch, setState, 和 useRef 包裹的值因为 React 会确保它们是静态的。不过你设置了它们作为依赖也没什么问题。）

相比于直接在 effect 里面读取状态，它 dispatch 了一个 action 来描述发生了什么。
这使得我们的 effect 和 step 状态解耦。
我们的 effect 不再关心怎么更新状态，它只负责告诉我们发生了什么。
更新的逻辑全都交由 reducer 去统一处理:

为什么 useReducer 是 Hooks 的作弊模式
我们已经学习到如何移除 effect 的依赖，不管状态更新是依赖上一个状态还是依赖另一个状态。
但假如我们需要依赖 props 去计算下一个状态呢？举个例子，也许我们的 API 是 `<Counter step={1} />`。
确定的是，在这种情况下，我们没法避免依赖 props.step 。是吗？

实际上， 我们可以避免！我们可以把 reducer 函数放到组件内去读取 props：

```js
function Counter({ step }) {
  const [count, dispatch] = useReducer(reducer, 0)

  function reducer(state, action) {
    if (action.type === 'tick') {
      return state + step
    } else {
      throw new Error()
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)
    return () => clearInterval(id)
  }, [dispatch])

  return <h1>{count}</h1>
}
```

这种模式会使一些优化失效，所以你应该避免滥用它，不过如果你需要你完全可以在 reducer 里面访问 props。
即使是在这个例子中，React 也保证 dispatch 在每次渲染中都是一样的。 所以你可以在依赖中去掉它。它不会引起 effect 不必要的重复执行。

你可能会疑惑：这怎么可能？在之前渲染中调用的 reducer 怎么“知道”新的 props？
答案是当你 dispatch 的时候，React 只是记住了 action - 它会在下一次渲染中再次调用 reducer。
在那个时候，新的 props 就可以被访问到，而且 reducer 调用也不是在 effect 里。

这就是为什么我倾向认为 useReducer 是 Hooks 的“作弊模式”。
它可以把更新逻辑和描述发生了什么分开。
结果是，这可以帮助我移除不必需的依赖，避免不必要的 effect 调用。

**把函数移到 Effects 里**.

如果某些函数仅在 effect 中调用，你可以把它们的定义移到 effect 中：

添加这个依赖，我们不仅仅是在“取悦 React”。
在 query 改变后去重新请求数据是合理的。
useEffect 的设计意图就是要强迫你关注数据流的改变，然后决定我们的 effects 该如何和它同步 - 而不是忽视它直到我们的用户遇到了 bug。

第一个， 如果一个函数没有使用组件内的任何值，你应该把它提到组件外面去定义，然后就可以自由地在 effects 中使用

你不再需要把它设为依赖，因为它们不在渲染范围内，因此不会被数据流影响。它不可能突然意外地依赖于 props 或 state。

或者， 你也可以把它包装成 useCallback Hook:

```js
function SearchResults() {
  // ✅ Preserves identity when its own deps are the same
  const getFetchUrl = useCallback(query => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }, [])
  // ✅ Callback deps are OK
  useEffect(() => {
    const url = getFetchUrl('react')
    // ... Fetch data and do something ...
  }, [getFetchUrl]) // ✅ Effect deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux')
    // ... Fetch data and do something ...
  }, [getFetchUrl]) // ✅ Effect deps are OK

  // ...
}
```

useCallback 本质上是添加了一层依赖检查。它以另一种方式解决了问题 - 我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。

如果我把 query 添加到 useCallback 的依赖中，任何调用了 getFetchUrl 的 effect 在 query 改变后都会重新运行：

```js
function SearchResults() {
  const [query, setQuery] = useState('react')

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }, [query])
  // ✅ Callback deps are OK
  useEffect(() => {
    const url = getFetchUrl()
    // ... Fetch data and do something ...
  }, [getFetchUrl])
  // ✅ Effect deps are OK

  // ...
}
```

我们要感谢 useCallback，因为如果 query 保持不变，getFetchUrl 也会保持不变，我们的 effect 也不会重新运行。
但是如果 query 修改了，getFetchUrl 也会随之改变，因此会重新请求数据。
这就像你在 Excel 里修改了一个单元格的值，另一个使用它的单元格会自动重新计算一样。

这正是拥抱数据流和同步思维的结果。对于通过属性从父组件传入的函数这个方法也适用：

```js
function Parent() {
  const [query, setQuery] = useState('react')

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query
    // ... Fetch data and return it ...
  }, [query]) // ✅ Callback deps are OK
  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null)

  useEffect(() => {
    fetchData().then(setData)
  }, [fetchData]) // ✅ Effect deps are OK

  // ...
}
```

因为 fetchData 只有在 Parent 的 query 状态变更时才会改变，所以我们的 Child 只会在需要的时候才去重新请求数据。

函数是数据流的一部分吗？
有趣的是，这种模式在 class 组件中行不通，并且这种行不通恰到好处地揭示了 effect 和生命周期范式之间的区别。
在 class 组件中，函数属性本身并不是数据流的一部分。

组件的方法中包含了可变的 this 变量导致我们不能确定无疑地认为它是不变的。
因此，即使我们只需要一个函数，我们也必须把一堆数据传递下去仅仅是为了做“diff”。
我们无法知道传入的 this.props.fetchData 是否依赖状态，并且不知道它依赖的状态是否改变了。

使用 useCallback，函数完全可以参与到数据流中。
我们可以说如果一个函数的输入改变了，这个函数就改变了。如果没有，函数也不会改变。
感谢周到的 useCallback，属性比如 props.fetchData 的改变也会自动传递下去。

类似的，useMemo 可以让我们对复杂对象做类似的事情。

```js
function ColorPicker() {
  // Doesn't break Child's shallow equality prop check
  // unless the color actually changes.
  const [color, setColor] = useState('pink')
  const style = useMemo(() => ({ color }), [color])
  return <Child style={style} />
}
```

我想强调的是，到处使用 useCallback 是件挺笨拙的事。
当我们需要将函数传递下去并且函数会在子组件的 effect 中被调用的时候，useCallback 是很好的技巧且非常有用。
或者你想试图减少对子组件的记忆负担，也不妨一试。
但总的来说 Hooks 本身能更好地避免传递回调函数。

在上面的例子中，我更倾向于把 fetchData 放在我的 effect 里（它可以抽离成一个自定义 Hook）或者是从顶层引入。
我想让 effects 保持简单，而在里面调用回调会让事情变得复杂。

请求数据发生竞态：

如果你使用的异步方式支持取消，那太棒了。你可以直接在清除函数中取消异步请求。

或者，最简单的权宜之计是用一个布尔值来跟踪它：

```js
function Article({ id }) {
  const [article, setArticle] = useState(null)

  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      const article = await API.fetchArticle(id)
      if (!didCancel) {
        setArticle(article)
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [id])

  // ...
}
```

提高水准
在 class 组件生命周期的思维模型中，副作用的行为和渲染输出是不同的。
UI 渲染是被 props 和 state 驱动的，并且能确保步调一致，但副作用并不是这样。这是一类常见问题的来源。

而在 useEffect 的思维模型中，默认都是同步的。副作用变成了 React 数据流的一部分。
对于每一个 useEffect 调用，一旦你处理正确，你的组件能够更好地处理边缘情况。

然而，用好 useEffect 的前期学习成本更高。这可能让人气恼。用同步的代码去处理边缘情况天然就比触发一次不用和渲染结果步调一致的副作用更难。

这难免让人担忧如果 useEffect 是你现在使用最多的工具。不过，目前大抵还处理低水平使用阶段。
因为 Hooks 太新了所以大家都还在低水平地使用它，尤其是在一些教程示例中。
但在实践中，社区很可能即将开始高水平地使用 Hooks，因为好的 API 会有更好的动量和冲劲。

我看到不同的应用在创造他们自己的 Hooks，比如封装了应用鉴权逻辑的 useFetch 或者使用 theme context 的 useTheme 。
你一旦有了包含这些的工具箱，你就不会那么频繁地直接使用 useEffect。但每一个基于它的 Hook 都能从它的适应能力中得到益处。

目前为止，useEffect 主要用于数据请求。但是数据请求准确说并不是一个同步问题。
因为我们的依赖经常是[]所以这一点尤其明显。那我们究竟在同步什么？

长远来看， Suspense 用于数据请求 会允许第三方库通过第一等的途径告诉 React 暂停渲染直到某些异步事物（任何东西：代码，数据，图片）已经准备就绪。

当 Suspense 逐渐地覆盖到更多的数据请求使用场景，我预料 useEffect 会退居幕后作为一个强大的工具，用于同步 props 和 state 到某些副作用。
不像数据请求，它可以很好地处理这些场景因为它就是为此而设计的。不过在那之前，自定义的 Hooks 比如这儿提到的是复用数据请求逻辑很好的方式。
