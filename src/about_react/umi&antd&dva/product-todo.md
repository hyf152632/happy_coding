# title

1. 调整项目结构：
   参照[umi-dva-user-dashboard](https://github.com/umijs/umi-dva-user-dashboard/blob/master/src/pages/users/models/users.js)

- 按照页面分文件，比如所有的页面级的 Component,放在页面文件夹的 components 文件夹中
- 优化静态资源，静态资源也是放在页面级的文件夹下
-

2. 将约定路由改为显示配置 routes
3. 整合 models:

- 全局 model 和 页面 model;
- 配置 dva - immer , 以简化 reducers 的编写

4. services 文件夹 放接口,也是页面级的
   - 参考 example - antd-admin
5. utils 文件夹 request.js
6. 页面级的 constants 常量文件

主要参考项目：
[umi-dva-user-dashboard](https://github.com/umijs/umi-dva-user-dashboard)

[ant-design-pro](https://github.com/ant-design/ant-design-pro)
:

- document.ejs
  - <noscript>Sorry, we need js to run correctly!</noscript>

[antd-admin](https://github.com/zuiidea/antd-admin)

[umi-examples-with-dva-and-immer](https://github.com/umijs/umi-examples/tree/master/with-dva-and-immer)

[umi-examples-with-nav-and-sidebar](https://github.com/umijs/umi-examples/tree/master/with-nav-and-sidebar)

[umi-antd-mobile](https://github.com/jinjinwa/umi-antd-mobile)
:

- config.js
- router.config.js
- global.js @babel/polyfill
- document.ejs

[ant-motion](https://github.com/ant-design/ant-motion)

