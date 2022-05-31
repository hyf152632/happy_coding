# title

## chp1

安装 Node.js 时，一般会提供两个版本:LTS 版和 Current 版。其 中，LTS 是 `Long Term Support(官方长期支持版)的缩写`，在生产环 境中，请使用 LTS 版。

NPM 安装命令中-g 表示全局安装，安装在系统目 录/usr/local/lib/node_modules/下。

默认情况下，浏览器所创建的 canvas 元素是 300 像素宽，150 像 素高。

`defer` 属性会让脚本的执行延迟到整个文档加载后再运行，这样就 能避免上面遇到的问题。

`tsc--init` 命令

## chp2

实际上，实现的词法解析器不仅仅用于 Doom3 引擎相关资源的解 析，通过些许扩展，还可以支持解析各种不同格式的 ASCII 编码文本文 件，例如 Wavefront 的 obj 模型文件，以及 mtl 材质文件等。

http://esprima.org/demo/parse.html
Token(标记或记号)就是指一组不可分割的字符或字 符串，它能唯一地、没有歧义地标记出一种状态。从本质上来说，就 是特殊的字符或字符串(例如 if 和===等)。而 Esprima 则是 Tokenizer，其作用是将字符串表示的 JS 源码数据读取进来，按照预先 设定的标准进行分类处理，处理的结果就是 Token。

事实上，Esprima 是一个 ECMAScript 解析器，包含**词法解析**和**语法解析**，最终会将 JS 源码解析成抽象语法树(Abstract Syntax Tree， AST)，而在这里由于演示的原因，仅仅使用了 Esprima 的词法解析功 能，并没有使用到语法解析功能。

要实现一个特定文件格式的词法解析器，一定要了解该文件的词法特征， 根据文件的词法特征抽象出分类规则，然后才能编码实现词法解析功能。

关键字，标识符，注释，{}, (), 字符串，数字

一般将空格符(" ")、水平制表符("\t")、垂直制表符("\v")及换行符 ("\n")统称为空白符

有限状态机(Finite State Machine，简称 FSM)。 所谓有限状态机就是指状态是有限的，并且根据当前的状态来执行某 个操作

通过 \_currIdx 记录本次处理的位置，然后每次调用 getNextToken() 方法时，都会更新 \_currIdx 的值，以此来记录下一次处理的位置。

COM(Component Object Modal，组件对象模型)

继承分为接口继承和实现继承(类继承)，Doom3Tokenizer 就是 接口继承了 IDoom3Tokenzier 并实现了该接口的所有方法。对于 TypeScript 来说，可以通过关键字来区分实现继承(extends)还是接 口继承(implements)。

\* 继承是一种拓展；封装是一种组织；多态是一种表现。

XHR 是 XMLHttpRequest 对象的简称。

`XMLHttpRequestResponseType`

可以使用如 arraybuffer 选项来请求二进制资源
二进制文件的特点就是比文本文件小得多，缺点是我们要明确无误地知道数据是如何存储的，每个数据代表什么含义。

## chp3

动画

`requestAnimationFrame`

不间断地，基于时间的更新与重绘

- while(true){}
- requestAnimationFrame(function(){}), setTimeout, setInterval

60 Hz 每秒刷新 60 次

request Animation Frame 是一个与硬件相关 的方法，该方法会保持与监视器刷新频率一致的状态。

两帧之间的时间间隔 (intervalMsec)总是 16.66 毫秒的倍数(当前监视器屏幕刷新频率 60 赫兹，折算成每帧需要 16.66 毫秒刷新一次)。

基于时间差的动画的速率，不会受特定机器的影响。

静态类结构图

如果我们设计的类能够被继 承、被扩展，那么最好将成员变量声明为 protected，这样子类也能访 问这些成员变量。

需要注意的一点是，上述代码并没有真正删除 Timer，而是将要删除的 Timer 的 enabled 标记为 false，这样避免了析构 Timer 的内存，并且不会调整数组的内容，可以称之为逻辑删除。
如果下次又要增加一个新的 Timer，会先查找 enabled 为 false 的 Timer，如果存在，可以重用该 Timer，这样又避免了 new 一个新的 Timer 对象.

只增不减，重复使用，以达到设计目标的第四条要求:尽量让内存 使用与运行效率达到相对平衡。

使用模板方法设计 模式将固定的流程封装起来，将可变的操作以虚函数的形式提供给第三方.

`this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);`

`beginPath, moveTo, lineTo, closePath, fill, stroke, restore`;

