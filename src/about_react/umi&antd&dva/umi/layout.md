# title

通过在 layouts 的 index.js 中判断 props.location.pathname 来选择动态的返回特定的 layout 组件。
同时在内部调用 props.children.

layout 用 withRouter 高阶一下：

```js
import withRouter from "umi/withRouter";

@withRouter
class Layout extends Component {}
```
