# title

React 中的模式：

## 聪明组件和傻瓜组件

其他名字：

1. 容器组件和展示组件(Container and Presentational Components);
2. 胖组件和瘦组件；
3. 有状态组件和无状态组件；

这种模式的本质就是把一个功能分配到两个组件中，形成父子关系，外层的父组件负责数据状态，内层的子组件只负责展示。

### 为什么要分割组件

软件设计中有一个原则，叫做“责任分离”（Separation of Responsibility），
简单说就是让一个模块的责任尽量少，如果发现一个模块功能过多，就应该拆分为多个模块，
让一个模块都专注于一个功能，这样更利于代码的维护。

使用 React 来做界面，无外乎就是获得驱动界面的数据，然后利用这些数据来渲染界面。

傻瓜组件：

```js
import SmileFace from "./yaoming_smile.png";

const Joke = ({ value }) => {
  return (
    <div>
      <img src={SmileFace} />
      {value || "loading..."}
    </div>
  );
};
```

聪明组件：

```js
export default class RandomJoke extends React.Component {
  state = {
    joke: null
  };

  componentDidMount() {
    fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
      });
  }

  render() {
    const { joke } = this.state;
    return <Joke value={joke} />;
  }
}
```

聪明组件的 render 函数一般都这样简单，因为渲染不是他们操心的业务，他们的主业是获取数据。

### PureComponent

因为傻瓜组件一般没有自己的状态，所以，可以像上面的 Joke 一样实现为函数形式，其实，我们可以进一步改进，利用 PureComponent 来提高傻瓜组件的性能。

函数式组件因为没有`shouldComponentUpdate`钩子， 所以即使是相同的 props 也会再次执行一遍渲染。

改进后的 Joke 组件：

```js
class Joke extends React.PureComponent {
  render() {
    return (
      <div>
        <img src={SmileFace} />
        {this.props.value || "loading..."}
      </div>
    );
  }
}
```

值得一提的是，PureComponent 中 shouldComponentUpdate 对 props 做得只是浅层比较，不是深层比较，如果 props 是一个深层对象，就容易产生问题。

比如，两次渲染传入的某个 props 都是同一个对象，但是对象中某个属性的值不同，这在 PureComponent 眼里，props 没有变化，不会重新渲染，但是这明显不是我们想要的结果。

### React.memo

虽然 PureComponent 可以提高组件渲染性能，但是它也不是没有代价的，它逼迫我们必须把组件实现为 class，不能用纯函数来实现组件。

如果你使用 React v16.6.0 之后的版本，可以使用一个新功能 React.memo 来完美实现 React 组件，上面的 Joke 组件可以这么写：

```js
const Joke = React.memo(() => (
  <div>
    <img src={SmileFace} />
    {this.props.value || "loading..."}
  </div>
));
```

React.memo 即利用了 shouldComponentUpdate, 又不要求我们写一个 class, 这也体现出 React 逐步向完全函数式编程前进。

## 高阶组件


### 高阶组件的基本形式

一个最简单的高阶组件是这样的的形式：

```js
const withDoNothing = wrappedComponent => {
  const NewComponent = props => {
    return <wrappedComponent {...props} />;
  };
  return NewComponent;
};
```

高阶组件的基本代码套路：

1. 高阶组件不能去修改作为参数的组件，高阶组件必须是一个纯函数，不应该有任何副作用；
2. 高阶组件返回的结果必须是一个新的 React 组件， 这个新的组件的 JSX 部分肯定会包含作为参数的组件；
3. 高阶组件一般需要把传给自己的 props 转手传递给作为参数的组件。

### 用高阶组件抽取共同逻辑

假设我们已经有一个函数 `getUserId` 能够从 `cookie` 中读取登录用户的 ID, 如果用户未登录， 这个 `getUserId` 就返回空，那么抽象登录逻辑的高阶组件可以表示为：

```js
const withLogin = (wrappedComponent) => {
  class NewComponent = (props) => {
    if(getUserId()) {
      return <wrappedComponent {...props} />
    } else {
      return null
    }
  }
  return NewComponent
}
```

### 高阶组件的高级用法

完全可以传入多个 React 组件给高阶组件。

```js
const withLoginAndLogout = (ComponentForLogin, ComponentForLogout) => {
  class NewComponent = (props) => {
    if(getUserId()) {
      return <ComponentForLogin {...props} />
    } else {
      return <ComponentForLogout {...props} />
    }
  }
  return NewComponent
}
```

### 链式调用高阶组件

```js
const SuperX = withThree(withTwo(withOne(X)));

const hoc = compose(
  withThree,
  withTwo,
  withOne
);

const SuperX = hoc();
```

### 不要滥用高阶组件

高阶组件不得不处理 displayName, 不然 debug 会很痛苦。

其次，高阶组件支持嵌套调用，这是它的优势。但是如果真的一大长串高阶组件被应用的话，当组件出错，你看到的会是一个超深的 stack trace，十分痛苦。

最后，使用高阶组件，一定要非常小心，要避免重复产生 React 组件给高阶组件。

比如，下面的代码是有问题的：

```js
const Example = () => {
  const EnhancedFoo = withExample(Foo);
  return <EnhancedFoo />;
};
```

像上面这样写，每一次渲染 Example，都会用高阶组件产生一个新的组件，虽然都叫做 EnhancedFoo，但是对 React 来说是一个全新的东西，在重新渲染的时候不会重用之前的虚拟 DOM，会造成极大的浪费。

正确的写法是下面这样，自始至终只有一个 EnhancedFoo 组件类被创建：

```js
const EnhancedFoo = withExample(Foo);

const Example = () => {
  return <EnhancedFoo />;
};
```

总之，高阶组件是重用代码的一种方式，但并不是唯一方式。

## render props 模式

所谓 render props，指的是让 React 组件的 props 支持函数这种模式。因为作为 props 传入的函数往往被用来渲染一部分界面，所以这种模式被称为 render props。

一个最简单的 render props 组件如下：

```js
const RenderAll = props => {
  return <React.Fragment>{props.children(props)}</React.Fragment>;
};
```

### 传递 props

下面是实现 render props 的 Login 组件，可以看到，render props 和高阶组件的第一个区别，就是 render props 是真正的 React 组件，而不是一个返回 React 组件的函数。

```js
const Login = props => {
  const userName = getUserName();

  if (userName) {
    const allProps = { userName, ...props };
    return <React.Fragment>{props.children(allProps)}</React.Fragment>;
  } else {
    return null;
  }
};
```

render props 完全可以决定哪些 props 可以传递给 props.children，在 Login 中，我们把 userName 作为增加的 props 传递给下去，这样就是 Login 的增强功能。

使用 Login:

```jsx
<Login>{({ userName }) => <h1>Hello {userName}</h1>}</Login>
```

### 不局限于 children

实际上，render props 这个模式不必局限于 children 这一个 props，任何一个 props 都可以作为函数，也可以利用多个 props 来作为函数。

我们来扩展 Login，不光在用户登录时显示一些东西，也可以定制用户没有登录时显示的东西，我们把这个组件叫做 Auth，对应代码如下：

```js
const Auth = (props) => {
  const userName = getUserName()

  if(userName) {
    const allProps = {userName, ...props}
    return(
      <React.Fragment>
        {props.login(allProps)}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {props.nologin(props)}
      </React.Fragment>
    )
  }
}

//使用
<Auth
  login={({userName}) => <h1>Hello {userName}</h1>}
  nologin={() => <h1>Please login</h1>}
/>
```

### 依赖注入

render props 其实就是 React 世界中的“依赖注入”（Dependency Injection)。

所谓依赖注入，指的是解决这样一个问题：逻辑 A 依赖于逻辑 B，如果让 A 直接依赖于 B，当然可行，但是 A 就没法做得通用了。依赖注入就是把 B 的逻辑以函数形式传递给 A，A 和 B 之间只需要对这个函数接口达成一致就行，如此一来，再来一个逻辑 C，也可以用一样的方法重用逻辑 A。

在上面的代码示例中，Login 和 Auth 组件就是上面所说的逻辑 A，而传递给组件的函数类型 props，就是逻辑 B 和 C。

### render props 和高阶组件的比较

首先， render props 模式的应用，就是做一个 React 组件， 而高阶组件， 虽然名为“组件”， 其实只是一个产生 React 组件的函数。

render props 不像上一小节中介绍的高阶组件有那么多毛病，如果说 render props 有什么缺点，那就是 render props 不能像高阶组件那样链式调用，当然，这并不是一个致命缺点。

**所以，当需要重用 React 组件的逻辑时，建议首先看这个功能是否可以抽象为一个简单的组件；如果行不通的话，考虑是否可以应用 render props 模式；再不行的话，才考虑应用高阶组件模式**。

render props 其实就是“依赖注入”

## 提供者模式（Provider Pattern）

对于跨级的信息传递，我们需要一个更好的方法。

在 React 中，解决这个问题应用的就是“提供者模式”。

既然名为“提供者”，它可以提供一些信息，而且这些信息在它之下的所有组件，无论隔了多少层，都可以直接访问到，而不需要通过 props 层层传递。

避免 props 逐级传递，即是提供者的用途。

### 实现提供者模式

在 React v16.3.0 之前，React 虽然提供了 Context 功能，但是官方文档上都建议尽量不要使用，因为对应的 API 他们并不满意，觉得迟早要废弃掉。即使如此，依然有很多库和应用使用 Context 功能，可见对这个需求的呼声有多大。

当 React 发布 v16.3.0 时，终于提供了“正式版本”的 Context 功能 API，和之前的有很大不同，当然，这也带来一些问题，我在后面会介绍。

提供者模式的一个典型用例就是实现“样式主题”（Theme），由顶层的提供者确定一个主题，下面的样式就可以直接使用对应主题里的样式。这样，当需要切换样式时，只需要修改提供者就行，其他组件不用修改。

在 React v16.3.0 之前，要实现提供者，就要实现一个 React 组件，不过这个组件要做两个特殊处理。

需要实现 getChildContext 方法，用于返回“上下文”的数据；
需要定义 childContextTypes 属性，声明“上下文”的结构。

React v16.3.0 之后的提供者模式

```js
const ThemeContext = React.createContext();

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

// 创造“提供者”极大简化了，都不需要我们创造一个 React 组件类。

// 使用“消费者”也同样简单，而且应用了上一节我们介绍的 render props 模式，比如，Subject 的代码如下:

class Subject extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {theme => (
          <h1 style={{ color: theme.mainColor }}>{this.props.children}</h1>
        )}
      </ThemeConsumer>
    );
  }
}

//上面的 ThemeConsumer 其实就是一个应用了 render props 模式的组件，它要求子组件是一个函数，会把“上下文”的数据作为参数传递给这个函数，而这个函数里就可以通过参数访问“上下文”对象。

//Subject 没有自己的状态，没必要实现为类，我们用纯函数的形式实现 Paragraph，代码如下：
const Paragraph = (props, context) => {
  return (
    <ThemeConsumer>
      {
        (theme) => (
          <p style={{color: theme.textColor}}>
            {props.children}
          </p>
        )
      }
    </ThemeConsumer>
  )
}

//ThemeProvider:
<ThemeProvider value={{mainColor: 'green', textColor: 'red'}}>
  <Page />
</ThemeProvider>

```

### 两种提供者模式实现方式的比较

在老版 Context API 中，“上下文”只是一个概念，并不对应一个代码，两个组件之间达成一个协议，就诞生了“上下文”。

在新版 Context API 中，需要一个“上下文”对象（上面的例子中就是 ThemeContext)，使用“提供者”的代码和“消费者”的代码往往分布在不同的代码文件中，那么，这个 ThemeContext 对象放在哪个代码文件中呢？

最好是放在一个独立的文件中，这么一来，就多出一个代码文件，而且所有和这个“上下文”相关的代码，都要依赖于这个“上下文”代码文件，虽然这没什么大不了的，但是的确多了一层依赖关系。

为了避免依赖关系复杂，每个应用都不要滥用“上下文”，应该限制“上下文”的使用个数。

## 组合组件（Compound Component）

模式(Pattern) = 问题场景(Context) + 解决办法(Solution)

组合组件模式要解决的是这样一类问题：父组件想要传递一些信息给子组件，但是，如果用 props 传递又显得十分麻烦。

一看到这个问题描述，读者应该能立刻想到上一节我们介绍过的 Context API，利用 Context，可以让组件之间不用 props 来传递信息。

不过，使用 Context 也不是完美解法，上一节我们介绍过，使用 React 在 v16.3.0 之后提供的新的 Context API，需要让“提供者”和“消费者”共同依赖于一个 Context 对象，而且消费者也要使用 render props 模式。

### 问题描述

### 实现方式

```js
const TabItem = (props) => {
  const {active, onClick} = props
  const tabStyle = {
    'max-width': '150px',
    color: active ? 'red' : 'green',
    border: active ? '1px solid red' : '0px',
  }
  return (
    <h1 style={tabStyle} onClick={onClick}>
      {props.children}
    </h1>
  )
}

//要实现的效果
    <Tabs>
      <TabItem>One</TabItem>
      <TabItem>Two</TabItem>
      <TabItem>Three</TabItem>
    </Tabs>

//Tabs
class Tabs extends React.Component {
  state = {
    activeIndex: 0
  }

  render() {
    const newChildren = React.Children.map(this.props.children, (child, index) => {
      if(child.type) {
        return React.cloneElement(child, {
          active: this.state.activeIndex === index,
          onClick: () => this.setState({activeIndex: index})
        })
      } else {
        return child
      }
    })

    return (
      <Fragment>
        {newChildren}
      </Fragment>
    )
  }
}
```

在 render 函数中，我们用了 React 中不常用的两个 API：

React.Children.map
React.cloneElement
使用 React.Children.map，可以遍历 children 中所有的元素，因为 children 可能是一个数组嘛。

使用 React.cloneElement 可以复制某个元素。这个函数第一个参数就是被复制的元素，第二个参数可以增加新产生元素的 props，我们就是利用这个机会，把 active 和 onClick 添加了进去。

这两个 API 双剑合璧，就能 **实现不通过表面的 props 传递，完成两个组件的“组合”**。

### 实际应用

从上面的代码可以看出来，对于组合组件这种实现方式，TabItem 非常简化；Tabs 稍微麻烦了一点，但是好处就是把复杂度都封装起来了，从使用者角度，连 props 都看不见。

所以，应用组合组件的往往是共享组件库，把一些常用的功能封装在组件里，让应用层直接用就行。在 antd 和 bootstrap 这样的共享库中，都使用了组合组件这种模式。

如果你的某两个组件并不需要重用，那么就要谨慎使用组合组件模式，毕竟这让代码复杂了一些。

这一小节介绍了组合组件（Compound Comonent）这种模式，这是一种比较高级的模式，如果要开发需要关联的成对组件，可以采用这个方案。

