# title

config.js

```js
import pageRoutes from "./router.config";

export default {
  routes: pageRoutes
  //...
};
```

router.config.js

```js
export default [
  //user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  }
  //app
];
```
