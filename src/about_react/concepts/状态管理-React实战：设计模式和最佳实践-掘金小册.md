# title

## 组件状态

UI = f(data)

f 的参数 data，除了 props，就是 state。props 是组件外传递进来的数据，state 代表的就是 React 组件的内部状态。

判断一个数据应该放在哪里，用下面的原则：

1. 如果数据由外部传入，放在 props 中；
2. 如果是组件内部状态，是否这个状态更改应该立刻引发一次组件重新渲染？如果是，放在 state 中；不是，放在成员变量中。

如果只是修改 this.state，那改了也就只是改了这个对象，其他的什么都不会发生；
如果使用 setState 函数，那不光修改 state，还能引发组件的重新渲染，在重新渲染中就会使用修改后的 state，这也就是达到根据 state 改变公式左侧 UI 的目的。

因为这个任务队列的存在，React 并不会同步更新 state，所以，在 React 中，setState 也不保证同步更新 state 中的数据。

```js
setTimeout(() => {
  this.setState({ count: 2 }); //这会立刻引发重新渲染
  console.log(this.state.count); //这里读取的count就是2
}, 0);
```

React 选择不同步更新 state，是一种性能优化，如果你用上 setTimeout，就没机会让 React 优化了。

每当你觉得需要同步更新 state 的时候，往往说明你的代码设计存在问题，绝大部分情况下，你所需要的，并不是“state 立刻更新”，而是，“确定 state 更新之后我要做什么”，这就引出了 setState 另一个功能。

setState 的第二个参数可以是一个回调函数，当 state 真的被修改时，这个回调函数会被调用。

如果需要在 state 更新之后做点什么，请利用第二个参数。

函数式 setState
可以保证，都执行到，而不只是批量执行

```js
function increment(state, props) {
  return {
    count: state.count + 1
  };
}

this.setState(increment);
```

函数形式的 setState 才是推荐的形式

## Redux 使用模式

应用的状态往往十分复杂，如果应用状态就是一个普通 JavaScript 对象，而任何能够访问到这个对象的代码都可以修改这个状态，就很容易乱了套。当 bug 发生的时候，我们发现是状态错了，但是也很难理清到底谁把状态改错了，到底是如何走到出 bug 这一步。

Redux 的主要贡献，就是限制了对状态的修改方式，让所有改变都可以被追踪。

在真实应用中，React 组件树会很庞大很复杂，两个没有父子关系的 React 组件之间要共享信息，怎么办呢？

最直观的方法，就是创建一个独立于这两个组件的对象，在这个对象中存放共享的数据，没错，这个对象，相当于一个 Store。

如果只是一个简单对象，那么任何人都可以修改 Store，这不大合适。所以我们做出一些限制，让 Store 只接受某些『事件』，如果要修改 Store 上的数据，就往 Store 上发送这些『事件』，Store 对这些『事件』的响应，就是修改状态。

这里所说的『事件』，就是 action，而对应修改状态的函数，就是 reducer。

### 适合 Redux 的场景

当一个 React 应用采用 Redux 之后，开发者往往就会陷入这样的纠结：对于某个状态，到底是放在 Redux 的 Store 中呢，还是放在 React 组件自身的状态中呢？

如果所有状态全都放在 Redux 的 Store 上，那就要对应增加 reducer 和 action 的代码，虽然拥有了可以跟踪的好处，但是对一些很细小的状态也要增加 reducer 和 action，会感觉很啰嗦（真的，Redux 本身就是一个啰嗦的技术，利用“啰嗦”来实现可维护性），开发者又会觉得得不偿失。

如果状态放在 React 组件中，感觉又白白放弃了 Redux 的优势，回到了 React 原生管理状态的老路上去，令人很不甘心。

第一步，看这个状态是否会被多个 React 组件共享。

第二步，看这个组件被 unmount 之后重新被 mount，之前的状态是否需要保留。

举个简单例子，一个对话框组件。用户在对话框打开的时候输入了一些内容，不做提交直接关闭这个对话框，这时候对话框就被 unmount 了，然后重新打开这个对话框（也就是重新 mount），需求是否要求刚才输入的内容依然显示？如果是，那么应该把状态放在 Store 上，因为 React 组件在 unmount 之后其中的状态也随之消失了，要想在重新 mount 时重获之前的状态，只能把状态放在组件之外，Store 当然是一个好的选择；如果需求不要求重新 mount 时保持 unmount 之前的状态，继续看第三步。

第三步，到这一步，基本上可以确定，这个状态可以放在 React 组件中了。

### 代码组织方式

### react-redux 中的模式

### Redux 和 React 结合的最佳实践

1. Store 上的数据应该范式化；
   所谓的范式化就是尽量减少冗余信息，像设计 MySQL 这样的关系型数据库一样设计数据结构；
2. 使用 selector；
   业界应用最广的 selector 就是 reslector 。
   reselector 的好处，是把反范式化分为两个步骤，第一个步骤是简单映射，第二个步骤是真正的重量级运算，如果第一个步骤发现产生的结果和上一次调用一样，那么第二个步骤也不用计算了，可以直接复用缓存的上次计算结果。
   绝大部分实际场景中，总是只有少部分数据会频繁发生变化，所以 reselector 可以避免大量重复计算。
3. 只 connect 关键点的 React 组件
   一个实际的例子就是，一个列表种可能包含几百个项，让每一个项都去 connect 到 Store 上不是一个明智的设计，最好是只让列表去 connect，然后把数据通过 props 传递给各个项。

使用 react-redux 的话，虽然 Provider 可以嵌套，但是，最里层的 Provider 提供的 store 才生效。

在下面的代码示例中，Foo 能够 connect 到的 store 是 s tore1，而 Bar 能够 connect 到的是 store2，因为内层的 Provider 会屏蔽掉外层的 Provider。

```html
 <Provider store={store1}>
    <React.Fragment>
      <Foo />
      <Provider store={store2} >
        <React.Fragment>
          <Bar />
        </React.Fragment>
      </Provider>
   </React.Fragment>
```

所以，建议还是尽量使用一个 Store，如果真的需要多个 Store，除非认定只有很少组件会访问多个 Store。

### 如何实现异步操作

至今为止，还无法推荐一个杀手级的方法，各种方法都在吹嘘自己多厉害，但是任何一种方法都是易用性和复杂性的平衡。

最简单的 redux-thunk，代码量少，只有几行，用起来也很直观，但是开发者要写很多代码；
而比较复杂的 redux-observable 相当强大，可以只用少量代码就实现复杂功能，但是前提是你要学会 RxJS，RxJS 本身学习曲线很陡，内容需要 一本书 的篇幅来介绍，这就是代价。

在这里我不想过多介绍任何一种 Redux 扩展，因为任何一种都比不上 React 将要支持的 Suspense，Suspense 才是 React 中做异步操作的未来，在第 19 小节会详细介绍 Suspense。

## Mobx 使用模式

从技术上说，Mobx 和 Redux 都是中立的状态管理工具，他们能够应用于 React，也可以用于其他需要状态管理的场景。

Mobx 这样的功能，等于实现了设计模式中的“观察者模式”（Observer Pattern），通过建立 observer 和 observable 之间的关联，达到数据联动。不过，传统的“观察者模式”要求我们写代码建立两者的关联，也就是写类似下面的代码：

```js
observable.register(observer);
```

Mobx 最了不起之处，在于不需要开发者写上面的关联代码，Mobx 自己通过解析代码就能够自动发现 observer 和 observable 之间的关系。

我们很自然想到，如果让我们的数据拥有这样的“神力”，那我们就不用在修改完数据之后，再费心去调用某些函数使用这些数据了，数据管理会变得十分轻松。

### decorator

因为 Mobx 的作用就是把简单的对象赋予神力，总要有一种方法能够在不改变对象代码的前提，去改变对象的行为，这就用得上“装饰者模式”（Decorator Pattern）。

单独说“装饰者模式”，这只是面向对象编程思想下的一种模式，不过对 JavaScript 语言而言，就不只是一种模式，而是一种语言特性，它在语法上对这种模式提供了强大的支持，所谓强大，就是指使用起来代码极其简洁。

根据 JavaScript 语法，我们可以这样创造一个 decorator，叫做 log：

```
function log(target, name, descriptor) {
  console.log('#target', target);
  console.log('#name', name);
  console.log('#descriptor', descriptor);
  return descriptor;
}
```

当然，很明显这个 decorator 什么实质的事情都没做，只是用 console.log 输出了三个参数秀了一下存在感，最后返回的 descriptor，就是被这个『装饰者』所『装饰』的对象。

下面是使用这个 decorator 的代码示例：

```js
@log
class Bar {
  @log
  bar() {
    console.log("bar");
  }
}
```

可以看到，@ 符号就是使用 decorator 的标志，将 @log 作用于一个类 Bar，那么最后得到的 Bar 其实是调用 log 函数返回的结果；将 @log 作用于一个类成员 @bar，最后得到的 bar 同样是调用 log 函数之后得到的结果。可见，如果我们巧妙地编写 log 函数，控制返回的结果，就可以操纵被『装饰』的类或者成员。

编写 decorator 是一个复杂的过程，也超出了这本小册的范围，有兴趣的读者可以自行研究。在这里，读者只需要知道，虽然使用 Mobx 并不是必须使用 decorator，但是使用 decorator 会让 Mobx 的应用代码简洁易读很多。

### 在 create-react-app 中增加 decorator 支持

很不幸，create-react-app 产生的应用并不支持 decorator，官方解释 是：decorator 并没有成为稳定的标准，为了防止今天写的代码没多久就不好使，create-react-app 不会支持这样的不稳定的功能。

不过，这并不表示完全没有办法，事情可以解决，只是有些麻烦，我们要做的只是在应用中添加支持 decorator 的 babel plugin。

首先，我们动用 create-react-app 的 eject 功能，这表示我们和 create-react-app 缺省照顾一切的 react-scripts 一刀两断，从此之后，webpack 和 babel 配置就完全由我们自己控制。要注意，eject 是不可逆的，做了就收不回来了，所以，请谨慎使用 eject，不过，为了支持 decorator，我们也别无选择。

### 用 decorator 来使用 Mobx

还是以 Counter 为例，看如何用 decorator 使用 Mobx，我们先看代码：

```js
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class Counter extends React.Component {
  @observable count = 0;

  onIncrement = () => {
    this.count++;
  };

  onDecrement = () => {
    this.count--;
  };

  componentWillUpdate() {
    console.log("#enter componentWillUpdate");
  }

  render() {
    return (
      <CounterView
        caption="With decorator"
        count={this.count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}
```

在上面的代码中，Counter 这个 React 组件自身是一个 observer，而 observable 是 Counter 的一个成员变量 count。

注意 observer 这 个 decorator 来自于 mobx-react，它是 Mobx 世界和 React 的桥梁，被它“装饰”的组件，只要用到某个被 Mobx 的 observable “装饰”过的数据，自然会对这样的数据产生反应。所以，只要 Counter 的 count 成员变量一变化，就会引发 Counter 组件的重新渲染。

可以注意到，Counter 的代码中并没有自己的 state，其实，被 observer 修饰过之后，Counter 被强行"注入”了 state，只不过我们看不见而已。

### 独立的 Store

更多适用于 Mobx 的场合，就和适用于 Redux 的场合一样，是一个状态需要多个组件共享，所以 observable 一般是在 React 组件之外。

我们重写一遍 Counter 组件，代码如下：

```js
const store = observable({
  count: 0
});
store.increment = function() {
  this.count++;
};
store.decrement = function() {
  this.count--;
};

@observer // this decorator is must
class Counter extends React.Component {
  onIncrement = () => {
    store.increment();
  };

  onDecrement = () => {
    store.decrement();
  };

  render() {
    return (
      <CounterView
        caption="With external state"
        count={store.count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}
```

并不需要 eject, 安装这个 @babel/plugin-proposal-decorators，配合 react-app-rewired 就能使用 Mobx

### Mobx 和 Redux 的比较

总结一下 Redux 和 Mobx 的区别，包括这些方面：

- Redux 鼓励一个应用只用一个 Store，Mobx 鼓励使用多个 Store；
- Redux 使用“拉”的方式使用数据，这一点和 React 是一致的，但 Mobx 使用“推”的方式使用数据，和 RxJS 这样的工具走得更近；
- Redux 鼓励数据范式化，减少冗余，Mobx 容许数据冗余，但同样能保持数据一致。

然后，被问起最多的问题就来了：我应该选用 Mobx 还是 Redux 呢？

问：你的应用是小而且简单，还是大而且复杂？

如果是前者，选择 Mobx；如果是后者，选择 Redux。

问：你想要快速开发应用，还是想要长期维护这个应用？

如果是前者，选择 Mobx；如果是后者，选择 Redux。

### 我们真的必须使用 Mobx 和 Redux 吗

首先我们要明白，Redux 和 Mobx 都是一个特定时期的产物，在 React 没有提供更好的状态管理方法之前，Redux 能够帮助使用 React 的开发者一把，Mobx 也能提供一种全新的状态管理理念。

不过，React 是在持续发展的，光是 Context API 的改进，几乎就可以取代 react-redux 和 mobx-react 的作用。实际上，react-redux 和 mobx-react 两者的实现都依赖于 React 的 Context 功能。

以 Redux 为例，它相较于 React Context 还有哪些特点呢？

Redux 有更清晰的数据流转过程，配合 Redux Devtools 的确方便 Debug，代价就是我们必须要写啰嗦的 action 和 reducer。如果我们觉得应用并不需要 Redux 这样的增强功能，那完全就可以直接使用 React 的 Context。

当然，React 的 Context 还是过于简单了一点，我建议开发者不要只关注 Redux，可以尝试一些更加轻量级的第三方管理工具，其中的佼佼者，我认为就是 unstated 。

最后，还是苦口婆心地对开发者们说出这句我曾说过不下一万遍的话：不要因为某个工具或者技术炫酷或者热门而去用它，要根据自己的工作需要去选择工具和技术。
