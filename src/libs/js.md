# title

dsBridge 是一个支持同步调用的跨平台的 JsBridge，此示例中只使用其同步调用功能.

在 JavaScript 中调用原生 API:

```js
var dsBridge = require('dsbridge')
//直接调用原生API `getPhoneModel`
var model = dsBridge.call('getPhoneModel')
//打印机型
console.log(model)
```
