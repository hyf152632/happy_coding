# title

## 如何使用 JSDoc 保证你的 js 类型安全性

关于本文
译者：@赵丽云
译文：https://mp.weixin.qq.com/s/PcHu-DeZDQCdtWjzb-QkBA
作者：@TruckJS
原文：https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76

There’s a little bit of TypeScript in there and a whole lot of, OMG, JSDoc!
**Microsoft designed TypeScript to take advantage of JSDoc comments to create a richer Intellisense for TypeScript**.
So, you can do the same thing for your own code. You seem to have time to spend trying to get your code types right,
but you don’t have the time to write proper JSDoc comments for your code.

Basically, you just need to create a jsconfig.json file for your project with these settings:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "strictNullChecks": true
  },
  "exclude": ["node_modules", "**/node_modules/*"]
}
```

从技术上讲，当您打开 JavaScript 的 TypeScript 类型检查时，TypeScript 默认使用推理来确定类型。这意味着如果它看到值为对齐：

```js
const name = 'Joe'
```

它将假定名称是类型 string。但是，存在变量可以是各种类型的情况。让 TypeScript 知道这一点的唯一方法是使用正确的 JSDoc 注释：

```js
/ **
  * @type {string | number} age
  * /
let age = 32
//或者：
let age = '32'
```

因为 age 有一个联合类型的字符串或数字，我们可以使用其中任何一个和 TypeScript 将理解。

如果您刚刚开始使用类型，那么您通常希望使用 JSDoc 注释来记录函数使用的参数，然后从那里继续。

对我来说，TypeScript 实际上是一个类型 linter，与 ESLint 没有什么不同。
使用 JSDoc 我定义我的类型然后让 TypeScript 检查我的代码以验证我是否正确定义了我的类型。
我尽可能为 JavaScript 获得类型安全，而无需编写 TypeScript。

我看到有这么多人颂扬使用 TypeScript 为他们带来的体验有多棒，并列出了原因。
我在没有编写单行 TypeScript 的情况下获得相同的好处，而是使用 JSDoc 将其减少到类型 linter 的作业。
使用这种技术，我可以按照我想要的方式编写 JavaScript，并将 TypeScript 作为类型 linter 提供类型安全性。

### 类型检查的优点

1、及早发现类型错误
2、代码更易于分析
3、IDE 支持
4、有助于代码重构
5、提高代码可读性
6、编码时提供有价值的智能感知

这些好处都是 使用 TypeScript、Flow 甚至是 JSDoc 注释获得的。

获得正确的类型不是一件易事

还记得第一次使用 jslint 或 jshint 的时候吗？加上 JSDoc 只会更加严格

使用 JSDoc 注释是为 JavaScript 提供类型信息最简单的方法

JSDoc 是一个根据 js 文件中的注释信息，生成 js 应用程序或库，模块的 API 文档的工具。
JSDoc 在 JavaScript 中提供类型信息作为注释，因此从这一点上讲，相比 Ts， 它更像 Flow.

当你压缩代码时，JSDoc 注释会自动被删除。

设置 Visual Studio Code 编辑器：

`javascript.implicitProjectConfig.checkJs": true`

### 打开和关闭类型检查的替代方法

如果只是要检查单文件，直接在文件顶部添加 `// @ts-check`,则相当于告诉 VS code 检查单个文件。

如果你的编辑器已经默认设计为检查 js，那么可以通过在文件顶部添加 `// @ts-nocheck` 来选择不检查某个文件。

如果是一行代码的类型或者从该行开始的代码块在处理上遇到了麻烦，可以在该行的上方添加 `// @ts-ignore`, 这样便能绕过检查。

如果你的项目有 jsconfig.json 文件，可以在 compilerOptions 下添加 checkJS 以打开 JavaScript 的 TypeScript 检查，如下：

```json
{
  "compilerOptions": {
    "checkJs": true
  },
  "exclude": ["node_modules", "**/node_modules/*"]
}
```

### JSDoc 注释

如果你不熟悉 JSDoc，可以从以下链接中了解更多信息：

1、JSDoc：主站点 (http://usejsdoc.org/)
JSDoc 中文文档参考地址： (https://www.html.cn/doc/jsdoc/index.html)
2、JSDoc：入门 (http://usejsdoc.org/about-getting-started.html)
3、JSDoc：ES6 Classes (http://usejsdoc.org/howto-es2015-classes.html)
4、Visual Studio Code：JSDoc 语法支持 (https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio#JSX)
5、Visual Studio Code：基于 JSDoc 的智能感知 (https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio#JsDoc)
6、Visual Studio Code：JSDoc 支持的功能（荐）(https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript)
7、JavaScript 智能感知 (https://docs.microsoft.com/zh-cn/visualstudio/ide/javascript-intellisense?view=vs-2019)

可扩展对象的动态属性 (Expando properties)
地址：https://developer.mozilla.org/zh-CN/docs/Glossary/Expando

### 使用 JSDoc 定义类型

以下简要介绍 JSDoc 提供的类型功能

- 指明类型：
  使用 `@type` 指明一个类型：

  ```js
  /**
   *  @type {string} name A name to use.
   */
  const name = 'Andy'
  ```

  类型的可选值有 number, string, undefined, Array, Object.
  就数组而言，你还可以通过 array 后附加 [] 指示包含在数组中的类型，比如 `string []`表示字符串数组，还可以选择: `any[]`, `number[]`, 或 `Object[]`

  还可以定义联合类型和交集类型：

  ```js
  // Union type:
  /**
   * @type {number | string} value The value of the product.
   */
  const price = 12 // or '12'

  // Intersection type:
  /**
   * @type {{name: string}, {age: number}}
   */
  const person = {
    name: 'andy',
    age: 26
  }
  ```

  - 默认类型
    JSDoc 提供了以下类型：

    1、null
    2、undefined
    3、boolean
    4、number
    5、string
    6、Array 或 []
    7、Object 或 {}

    你可以设置一个类型化的数组： any[]， number[]， string[]，还可以设置一组对象类型： Employee[]。

  - 自定义类型
    使用 @typedef 定义自定义类型。这类似于 TypeScript 的 interface。定义自定义类型后，你可以为其定义属性。 @typedef 标签在描述自定义类型时是很有用的，特别是如果你要反复引用它们的时候。这些类型可以在其它标签内使用，如 @type 和 @param。
    属性
    使用 `@property` 定义对象的成员
    ```js
    /**
     * A person object with a name and age.
     * @typedef {Object<string, any>} Person
     * @property {string} name The name of the person.
     * @property {number} age The age of the person.
     */
    /**
     * @type {Person} person
     */
    const person = {
      name: 'Joe',
      age: 32
    }
    ```

恰当的 JSDoc 类型注释可以向 TypeScript 引擎提供有关代码的精确信息，从而产生高级智能感知，它不仅仅是类型的提示，它是描述对象及其属性的信息。

### 函数

JSDoc 中，使用 `@function` 或 `@method` 定义函数或 class 方法，不过通常用不到这两个类型。对于函数的话，指明它的参数和返回类型就够了。在 VS Code 里面，JavaScript 已经能够判断代码块是函数或是 class 方法。但是，如果对象的一个成员是函数，或者类构造函数里面有函数，那么可以将这些成员的类型定义为函数类型.

- 可选参数
  **使用 [] 表示可选**。尽管 JSDocs 有多种表示 可选性 的方法，但 [] 是唯一能够在 VS Code 和 TypeScript 中表示可选的方法。可以看到，下面代码中的 age 属性被标记为可选，说明我们实际创建的对象可以没有这个属性。

```js
/**
 * @typedef {Object} Options The Options to use in the function createUser.
 * @property {string} firstName The user's first name.
 * @property {string} lastName The user's last name.
 * @property {number} [age] The user's age.
 */
/**
 * @type {Options} opts
 */
const opts = { firstName: 'Joe', lastName: 'Bodoni', age: 32 }
```

### 可扩展对象的动态属性 (Expando properties)

地址：https://developer.mozilla.org/zh-CN/docs/Glossary/Expando

对于向对象中动态添加属性这种情况来说，类型检查存在一个问题，如下：

> 由于这种新的语言类型判断服务是由静态分析而非执行引擎提供的支持（可阅读此问题(https://github.com/Microsoft/TypeScript/issues/4789) 以获取差异信息），因此有一些 JavaScript 模式无法再被检测到。最常见的就是 “expando”。目前，无法为对象声明后再添加的属性提供智能感知。

如果要处理可扩展对象的动态属性，唯一的方法是**使用中括号和引号**：

```js
// Add custom property to node of type Element:
const btn = document.createElement('button')
btn.nodeValue = 'A Button'
// Will generate error that property does not exist on type Node:
btn.isButton = true
// Escape expando property:
btn['isButton'] = true
```

### 定义对象类型

在 JSDoc 的类型中， Object 和 object 被视为 any 。我知道，这可能听起来不合逻辑。在广泛查看了 JSDoc 的使用场景之后，TypeScript 团队得出了 这个结论(https://github.com/Microsoft/TypeScript/issues/18396)。当你想要创建一个 Object 类型，有两种办法：使用对象字面量或者使用带有类型的 Object：

```js
// This gets resolved to type `any`.
/**
 * As Object.
 * @type {Object} obj1
 */

// This designates a empty object literal.
// Adding properties will generate a type error.
/**
 * As object literal:
 * @type {{}} obj2
 */

// Define properties in object literal
/**
 * Object literal with properties:
 * @type {{name: string, age: number, job: string}} employee
 */

// Define generic object.
// This can have any number of properties of type any.
/**
 * @type {Object<string, any>} person
 */
```

在定义对象的四种方法中，**前两种方法最不实用**。它们将具有我们之前讨论过的与对象可扩展属性相同的问题。**第三种方法适用于简单的对象**。但**第四种方法最灵活**，允许给对象赋值多种不同类型的属性，并且属性定义注释地越详细，显示的智能感知也越丰富：

```js
// Define generic object.
// This can have any number of properties of type any.
/**
 * @type {Object<string, any>} Member
 * @property {string} name The members's name.
 * @property {number} [age] The members's age.
 * @property {string} [job] The member's job.
 */
/**
 * @type {Member} Jack
 */
const Jack = {
  age: 28
}
```

- 注释的复杂与简单

如何定义类型？当然是越详细越好，如前面有关对象类型的示例所示，详细的类型定义能显示更多的智能感知。但是如果代码永远不会被其他人使用，那么简单的注释也就足够了。不过有一点请记住，如果使用了更简单的注释，然后在几个月后再想要整理代码，操作起来会很难。

### 泛型

使用 `@template` 标记定义泛型

```js
// Generic types may also be used
/**
 * @template T
 * @param {T} param - A generic parameter that flows through to the return type
 * @return {T}
 */
function genericFnc(param) {
  return param
}
```

类型转换（Type Casting）
有时，为了解决静态类型检查器无法识别的类型，需要进行类型转换。在 {} 中包含要转换的类型。格式为：

```js
/** @type{some type here} * /
(要转换的元素)
```

通常，在处理 DOM 节点时必须进行类型转换。

下面是一个类型转换的示例：

```js
// 创建一个 button 元素.

// 类型是一个 Node 节点.

const btn = document
  .createElement('button')(
    // 由于 btn 的类型是 Node，所以我们无法调用 setAttribute.

    // 将 btn 的类型从 Node 转换为 Element 可破.

    /** @type {Element} */

    (btn)
  )
  .setAttribut('disabled', true)
```

- 引入类型

通过从类型最初定义的位置引入自定义类型，可以实现在文件中重复使用自定义类型。假设我们有一个文件，其中有一个创建虚拟节点的函数。在该文件中，我们使用 JSDoc 注释定义的虚拟节点类型，然后在其他文件中引入该函数以创建虚拟节点。如下：

```js
/**
 * Props define attributes on a virtual node.
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props.children
 */
/**
 * The vnode children of a virtual node.
 * @typedef {VNode[]} Children
 */
/**
 * Define a custom type for virtual nodes:
 * @typedef {string | number | Function} Type
 * @typedef {Object.<string, any>} VNode
 * @property {Type} VNode.type
 * @property {Props} VNode.props
 * @property {Children} VNode.children
 * @property {Key} [VNode.key]
 */
```

假设我们在另一个文件中引入了 createVirtualNode 函数，为了显示类型信息，可以从另一个文件（自定义类型定义的位置）引入类型，如下所示：

```js
import { createVNode } from '../vnode'
/**
 * @typedef {import('./vnode').VNode} VNode
 */

// Some code that create options for createVNode to use.
const options = ...
/**
 * @param {Object<string, any>} options
 * @return {VNode} VNode
 */
const vnode = createVNode(options)
```

注意上面是如何从 vnode.js 引入自定义类型的，我们也可以使用相同的方式来定义函数的返回值。

- 尽量避免定义 any 类型

虽然定义 any 类型能够摆脱代码被红色波浪线缠身的问题，但使用联合类型或交集类型会更好：

如果已经确定肯定会有类型转换等情况，那么再使用 any 类型定义。也可以使用 \*, 二者含义相同。

- 在构建期间检查类型

使用 JSDoc 注释写好类型信息后，也可以使用 NPM 脚本实现在代码构建时进行类型检查

```json
"script": {
  "checkjs": "tsc --allowJs --checkJs --noEmit --target ES5 src/*.js"
}
```

除类型外，JSDoc 注释还提供了更多信息
TypeScript 用户经常抱怨 JSDoc 注释比 TypeScript 类型更冗长。确实如此，但 JSDoc 注释提供了更多信息，不仅仅只有类型，例如类型的描述、函数的作用等，同时提供了更加丰富的智能感知。

坦率地说，TypeScript 和 Flow 的类型系统比 JSDoc 所包含的要复杂得多。但是，JavaScript 本身就是一种松散类型的语言，没有必要试图强制让 JavaScript 遵循 TypeScript 和 Flow 语义的严格性。

在运行时的类型安全性
TypeScript，Flow 和 JSDoc 都不能确保在运行时不会出现类型错误。

类型检查仅在代码编写或构建时起作用。运行期间发生的事情是另外一回事。浏览器可能会存在影响代码的错误，你正在使用的库和框架也可能有未知的错误。

只要编写了一个有参数类型定义的函数，就需要在使用之前进行类型检查。

类型保护是确保 JavaScript 中类型安全的唯一方法。使用类型保护还可以输出包含信息的日志和错误消息，从而帮助确定问题所在。

小结：

1、通过在开启了 JavaScript 类型检查的 VS Code 编辑器中使用 JSDoc 注释代码，能够获得静态类型检查提供的良好开发体验，没有单独的构建步骤，但却提供了静态类型的大多数功能。在 VS Code 中，JSDoc 注释将帮助显示符号定义，跨文件的符号重命名，拼写错误，未使用的变量和不正确的类型等。

2、无论是使用 TypeScript 还是 JSDoc 来处理类型，处理 DOM 时都会麻烦一点。比如对于可扩展属性需要使用中括号和引号： [‘属性名’]。

3、如果你是一个编写 JavaScript 的大型团队成员，通过在 VS Code 中开启类型检查和 JSDoc 注释，可以确保生成的代码具有正确的类型，并能提供强大的智能感知体验，有助于理解，可以帮助新的开发人员更快地加入进来。

4、真正的类型安全意味着在运行时要检查类型。在适当的地方使用类型保护。

5、需要提前考虑如何处理错误类型发生的情况。可以选择记录打印错误，也可以提醒用户，或者使用判断逻辑分情况处理，亦或者忽略等。

6、JSDoc 注释为你的代码提供有价值的类型信息。它们只是标准的 JavaScript 注释。这意味着你的代码是可以运行的有效 JavaScript。在压缩代码时，无需执行任何特殊操作，代码中的 JSDoc 注释将会自动被删除。

7、如果你有过使用 Java 或 C＃ 的背景，没错，TypeScript 可能是更好的选择，因为它更接近于你的习惯。

8、TypeScript，Flow 或 JSDoc 所标记的类型问题在浏览器中运行时不一定会产生错误。比如：虽然 string 和 number 之间的差异对类型检查很重要，但浏览器可以根据需要很容易地强制执行类型转换。但是，这也可能会产生错误，最好是显示地将值转换成你需要的类型。

9、TypeScript 有一些 JavaScript 中没有的语法功能，如：， interface， public， private implements。这让 JavaScript 感觉更像 Java 或 C＃。TypeScript 或 Flow 都不能直接在浏览器中使用，但带有 JSDoc 注释的 JavaScript 可以在浏览器中运行。JSDoc 实际上是用于注释 JavaScript 的标准方法。
