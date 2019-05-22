# 为什么

学习一种全新的编程范式，困难并不在于掌握新的语言。语法不过是些小细节罢了。真正考验人的，是怎么学会用另一种方式去思考。

几乎所有的语言都日渐向函数式靠拢。

范式转变

命令式编程风格常常迫使我们出于性能考虑，把不同的任务交织起来，以便能够用一次循环来完成多个任务。而函数式编程用 map(), filter()这些高阶函数把我们解放出来，
让我们站在更高地抽象层次去考虑问题，把问题看得更清楚。

最好把时间花在更高层次地抽象上，多考虑怎样解决复杂的业务场景，少去费心复杂的底层运作。

将琐碎地细节交托给运行时，令繁冗地实现化作轻巧。

函数式抽象和面向对象抽象的关键区别：
面向对象编程通过封装不确定因素来使代码能被人理解；函数式编程通过尽量减少不确定因素来使代码能被人理解。

封装，作用域，可见性等面向对象编程的构造，这些机制的存在意义，都是为了精细地控制谁能够感知状态和改变状态。
而当涉及多线程的时候，对状态的控制就更加复杂了。这些机制就属性所谓的”不确定因素“。大多数函数式语言在这个问题上采取了另一种做法，
它们认为，与其建立种种机制来控制可变的状态，不如尽可能消灭可变的状态这个不确定因素。其立论的根据是这样的：
假如语言不对外暴露那么多有出错可能的特性，那么开发者就不那么容易犯错。

OOP 的世界提倡开发者针对具体问题建立专门的数据结构，相关的专门操作以”方法“的形式附加在数据结构上。
函数式编程语言实现重用的思路很不一样。函数式语言提倡在有限的几种关键数据结构（如 list， set， map)上运用针对这些数据结构高度优化过的操作，
以此构成基本的运转机构。开发者再根据具体用途，插入自己的数据结构和高阶函数去调整机构的运转方式。

比起一味创建新的类结构体系，把封装的单元降低到函数级别，更有利于达到细粒度的，基础层面的重用。

函数式程序员喜欢用少数几个核心数据结构，围绕它们去建立一套充分优化的运转机构。
面向对象程序员喜欢不断地创建新的数据结构和附属的操作，因为压倒一切的面向对象编程范式就是建立新的类和类间的消息。把所有的数据结构都封装成类，一方面压制了方法层面的重用，另一方面鼓励了大粒度的框架式的重用。
函数式编程的程序构造更方便我们在比较细小的层面上重用代码。