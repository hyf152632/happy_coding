# title

umi 首先会加载用户的配置和插件，然后基于配置或者目录，生成一份路由配置，
再基于此路由配置，把 JS/CSS 源码和 HTML 完整地串联起来。用户配置的参数和插件会影响流程里的每个环节。

umi 里约定默认情况下 pages 下所有的 js 文件即路由。

## 约定式路由

```js
import Link from "umi/link";
import router from "umi/router";

<button
  onClick={() => {
    router.goBack();
  }}
>
  go back
</button>;
```

插件 umi-plugin-react dll: 通过 webpack 的 dll 插件预打包一份 dll 文件来达到二次启动提速的目的。

hardSource,通过 hard-source-webpack-plugin 开启 webpack 缓存，二次启动时间减少 80%。推荐非 windows 电脑使用，windows 下由于大文件 IO 比较慢，可自行决定是否启用
