# title

## Use umi with dva

- 按目录约定注册 model，无需手动 app.model
- 文件名即 namespace，可以省去 model 导出的 namespace key
- 无需手写 router.js，交给 umi 处理，支持 model 和 component 的按需加载

model 注册
model 分两类，一是全局 model，二是页面 model。
全局 model 存于 /src/models/ 目录，所有页面都可引用；页面 model 不能被其他页面所引用。

page model 会向上查找，比如 page js 为 pages/a/b.js，他的 page model 为 pages/a/b/models/**/\*.js + pages/a/models/**/\*.js，依次类推

约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/\*_/_.js

配置及插件

src/app.js:

```js
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e.message);
    }
  },
  plugins: [require("dva-logger")()]
};
```

问题：
url 变化了，但页面组件不刷新，是什么原因？
layouts/index.js 里如果用了 connect 传数据，需要用 umi/withRouter 高阶一下。

```js
import withRouter from "umi/withRouter";

export default withRouter(connect(mapStateToProps)(LayoutComponent));
```

如何访问到 store 或 dispatch 方法？

```js
window.g_app._store;
window.g_app._store.dispatch;
```

如何禁用包括 component 和 models 的按需加载？
在 .umirc.js 里配置：

```js
export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: {
          dynamicImport: undefined // 配置在dva里
        },
        dynamicImport: undefined // 或者直接写在react插件的根配置，写在这里也会被继承到上面的dva配置里
      }
    ]
  ]
};
```

全局 layout 使用 connect 后路由切换后没有刷新？
需用 withRouter 包一下导出的 react 组件，注意顺序。

```js
import withRouter from "umi/withRouter";
export default withRouter(connect()(Layout));
```

如何查看 react、react-dom、react-router 等版本号？
\$ umi -v --verbose

## use model:

src/pages/users/models/users.js:

```js
import * as usersService from "../services/users";

export default {
  namespace: "users",
  state: {
    list: [],
    total: null
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total }
      }
    ) {
      return { ...state, list, total };
    }
  },
  effects: {
    *fetch(
      {
        payload: { page }
      },
      { call, put }
    ) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: "save",
        payload: { data, total: headers["x-total-count"] }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/users") {
          dispatch({ type: "fetch", payload: query });
        }
      });
    }
  }
};
```

src/pages/users/services/users.js

```js
import request from "../../../utils/request";

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}
```

我们把组件存在 src/pages/users/components 里，所以在这里新建 Users.js 和 Users.css

## 处理 loading 状态

dva 有一个管理 effects 执行的 hook，并基于此封装了 dva-loading 插件。通过这个插件，我们可以不必一遍遍地写 showLoading 和 hideLoading，当发起请求时，插件会自动设置数据里的 loading 状态为 true 或 false 。然后我们在渲染 components 时绑定并根据这个数据进行渲染。

umi-plugin-dva 默认内置了 dva-loading 插件。

然后在 src/components/Users/Users.js 里绑定 loading 数据：

- loading: state.loading.models.users,

laoding 的状态是在触发异步的时候改变；sorrycc 大神都说了，
是利用 dva-loading 这个插件处理 loading 的，
dva-loading 是对 reducers 新增 state 数据（也就是 loading 对象），
loading 对象中有三个属性，分别为 effects、global、models，
effects 的 key 为 dispatch type 的值，global 为全局变量，只要触发异步，
这个值就会从 false 变为 true，models 的 key 为 namespace；具体用 redux 工具看一下就知道了。

example:

```js
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],  //loading对象的effects值
}))

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))

```

## 处理分页有两个思路：

发 action，请求新的分页数据，保存到 model，然后自动更新页面
切换路由 (由于之前监听了路由变化，所以后续的事情会自动处理)
我们用的是思路 2 的方式，好处是用户可以直接访问到 page 2 或其他页面。

```js
import { routerRedux } from "dva/router";

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
  }
  function pageChangeHandler(page) {
    dispatch(
      //之前在 model 中监听了路由
      routerRedux.push({
        pathname: "/users",
        query: { page }
      })
    );
  }
}

const handleRefresh = newQuery => {
  dispatch(
    routerRedux.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery
        },
        { arrayFormat: "repeat" }
      )
    })
  );
};

const listProps = {
  pagination,
  dataSource: list,
  loading: loading.effects["post/query"],
  onChange(page) {
    dispatch(
      routerRedux.push({
        pathname,
        search: stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize
        })
      })
    );
  }
};
```

后面的功能调整基本都可以按照以下三步进行：

service
model
component

我们现在开始增加用户删除功能。

```js
//service, 修改 src/pages/users/services/users.js：
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

//model, 修改 src/pages/users/models/users.js：
*remove({ payload: id }, { call, put, select }) {
  yield call(usersService.remove, id);
  const page = yield select(state => state.users.page);
  yield put({ type: 'fetch', payload: { page } });
},

//component, 修改 src/pages/users/components/Users.js，替换 deleteHandler 内容：
dispatch({
  type: 'users/remove',
  payload: id,
});
```

```js
componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }
```

```js
 effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
```
