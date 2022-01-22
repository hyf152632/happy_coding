# title

## React Router

React Router 4 是对 React Router 的一次彻底重构，采用动态路由，遵循 React 中一切
皆组件的实现，每一个 Router 都是一个普通的 React 组件。V4 版本并不兼容之前的 React Router
版本。

Route 渲染组件的方式：

1. component
2. render
   一个函数，返回一个 React 元素。这种方式可以方便地为待渲染的组件传递额外的属性：

```js
<Route path='/foo' render={(props) => (
  <Foo {...props} data={extraProps} />
)}
```

3. children
   无论是否匹配成功，children 返回的组件都会被渲染。但是，当匹配不成功时，match 属性为 null:

```js
<Route path='/foo' children={(props) => (
  <div className={props.match ? 'active' : ''}>
  <Foo />
  </div>
)}
```

Switch 和 exact

嵌套路由：
嵌套路由是指在 Route 渲染的组件内部定义新的 Route,
match.url = 父层的 url

Link
history.push 和 history.replace

APICloud

## Redux

唯一数据源；
保持应用状态只读；
应用状态的改变通过纯函数完成；

action 是 Redux 中的信息载体，是 store 唯一的信息来源。把 action 发送给 store 必须通过 store 的 dispatch 方法。

```js
function mapStateToProps(state, ownProps) {
  //...
}
```

Provider 组件

redux-thunk
使得 dispatch 可是接收一个函数，而不是只能接收 action 对象
异步 action 会先经过 redux-thunk 处理，然后再次发送一个 action，这次的 action 就是一个普通的 JS 对象了。

```js
//异步 action
function getData(url) {
  return dispatch => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    return fetch(url)
      .then(
        response => response.json(),
        error => {
          dispatch({ type: "FETCH_DATA_FAILURE", error });
        }
      )
      .then(json => dispatch({ type: "FETCH_DATA_SUCCESS", data: json }));
  };
}
```

除了 redux-thunk, 常用于处理异步操作的中间件还有 redux-promise,redux-saga, redux-observable

设计 state

错误：以 API 作为设计 state 的依据

可能存在重复数据，数组类型的结构不方便查找，需要遍历数组

错误： 以页面 UI 为设计 state 的依据

数据重复，修改数据可能需要修改多个地方。

合理设计 state:像设计数据库一样设计 state.
state 中的每一部分状态看做数据库中的一张表，状态中的每一个字段对应表的一个字段。
设计数据库应该遵循以下三个原则：

1. 数据按照领域(Domain)分类存储在不同的表中，不同的表中存储的列数据不能重复。
2. 表中每一列的数据都依赖于这张表的主键
3. 表中除了主键以外，其他列互相之间不能有直接依赖关系

根据这三个原则，可以得出设计 state 的原则：

1. 把整个应用的状态按照领域分成若干子状态，子状态之间不能保存重复的数据
2. state 以键值对的结构存储数据，以记录的 key 或 ID 作为记录的索引，记录中的其他字段都依赖于索引
3. state 中不能保存可以通过 state 中已有的字段计算而来的数据，即 state 中的字段不互相依赖。

比如一个文章列表的存储，之前是存在数组中，变成以 id 为 key 的对象存储,把可以提取出来的子数据，保存成指向其的 id，
扁平化数据。
解决数据有序性的问题，定义一个数组类型的属性 allIds 存储其 id，同时将之前的对象中的属性，存储在 byId 属性下，
也就是：

```js
//由:
articles: []
//变成：
articles:{
  byId:{},
  allIds:[]
}
```

这样一来，allIds 负责维护数据的有序性，byId 负责根据 id 快速查询对应的数据。这种设计 state 的方式是很常用的一种方式。
此时 articles 不再保存完整的作者信息，那么作者信息的查询就有赖于领域 Users 对应的子 state。应用中不关心作者的顺序，
因此我们只需要使用以作者 id 为 key 的键值对存储数据即可。

评论数据是通过单独的 API 获取的，但评论数据是从属于某个帖子的，这个关系应该如何在

state 中体现呢?有两种方法:第一种是在 posts 对应的 state 中增加一个 comments 属性，存储该帖
子对应的评论数据的 id；第二种是在 comments 对应的 state 中增加一个 byPost 属性，存储以帖子
id 作为 key，以这个帖子下的所有评论 id 作为值的对象。使用第二种方法， 当调用 API 请来评论
数据时，只需要修改 comments 对应的 state 即可，使用第一种方法还需要修改 posts 对应的 state
因此这里使用第二种方法:

byPost 保存帖子 id 到评论 id 的映射关系，byId 保存评论 id 的评论数据的映射关系。
由 posts,comments 和 users 三个领域组成的 state 结构如下：

```js
{
  posts:{
    byId: {
      ...
    },
    allIds: [...]
  },
  comments: {
    byPost: {[postId]:[...commentid]},
    byId: {

    }
  },
  users: {
    ...
  }
}
```

以上是领域数据，实际上 state 还包含应用状态数据和 UI 状态数据。应用状态数据指反映应用行为的数据，
例如，当前的登录状态，是否有 API 请求在进行等。UI 状态数据是代表 UI 当前如何显示的数据，例如对话框当前是否处于打开状态等。

有些开发者习惯把 UI 状态数据仍然保存在组件的 state 中，由组件自己管理，而不是交给 Redux 管理。这也是一种可选的做法，但将 UI 状态数据也交给 Redux 统一管理有利于应用 UI 状态的追溯。

记录登录状态：state-auth
其余应用状态： state-app
当需要管理的应用状态数据增多时，可以进一步拆分 app,state-app-ui

设计模块

一个功能相关的 reducer, action types, action creators 将定义到一个文件中，作为一个 rudux 模块，
根据 state 的结构，我们可以拆分出 app, auth, posts, comments, users, ui 和 index 七个模块。

app 模块：
这里需要注意，app 模块中的 action creators 会被其他模块调用。你如，其他模块用于请求 API
的异步 action 中，需要在发送请求的开始和结束时分别调用 startrequest 和 finishrequest:在 AP
返回错误信息时，需要调用 seterror 设置错误信息。这也说明，我们定义的模块并非只能被 U 组
件使用，各个模块之间也是可以互相调用的。

可以使用 normalizr(https://github.com/paularmstrong/normalizr)这个库将嵌套的数据结构转换成扁平结构。

Immutable.js
以更加高效的方式创建不可变对象，主要优点有 3 个：保证数据的不可变，丰富的 API 和优异的性能。

Reselect

Reselect 可以创建有记忆功能的 selectors，当 selectors 计算使用的参数未发生变化时，不会再次计算，而是直接使用上次缓存的计算结果。

MobX: 简单可扩展的状态管理解决方案

MobX 是 Redux 之后的一个状态管理库，基于响应式管理状态，整体是一一个观察者模式的架

构，存储 state 的 store 是被观察者，使用 store 的组件是观察者。MobX 可以有多个 store 对象，Sore
使用的 state 也是可变对象，这些都是和 Redux 的不同点，相较于 Redux，MobX 更轻量，也受到
了很多开发者的青睐。

另外，很多编辑器遇到装饰器语法会提示错误，需要进行额外设置以支持装饰器语法。例如，
本书使用的 VsCode 需要在项目的根路径下创建个文件 jsconfig.json，文件的内容为:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
