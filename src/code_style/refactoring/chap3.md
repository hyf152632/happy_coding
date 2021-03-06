# 代码中的坏味道

1. 神秘命名(Mysterious Name)
   改名可能是最常用的重构手法。
   如果你想不出一个好名字，说明背后很可能潜藏着更深的设计问题。

2. 重复代码(Duplicate Code)

3. 过长函数(Long Function)

4. 过长参数列表(Long Parameter List)

5. 全局数据(Global Data)

6. 可变数据(Mutable Data)

7. 发散式变化(Divergent Change)
   一旦需要修改，我们希望能够跳到系统的某个点，只在该处做修改。
   每次只关注一个上下文

8. 散弹式修改(Shotgun Surgery)
   类似于发散式变化，但又恰恰相反。
   如果每遇到某种变化，你都必须在许多不同的类内做出许多小修改，你所面临的坏味道就是散弹式修改。

9. 依恋情节(Feature Envy)
   所谓模块化，就是力求将代码分出区域，最大化区域内部的交互，最小化跨区域的交互。但有时你会发现，一个函数跟另一个模块中的函数或者数据交流格外频繁，远胜于在自己所处模块内部的交流，这就是依恋情节的典型情况。

   将总是一起变化的东西放在一块。

10. 数据泥团(Data Clumps)

11. 基本类型偏执(Primitive Obsession)
    只使用基本类型解决自己的问题，而不是为问题域创建一个特有的基本类型(对象)

12. 重复的 switch (Repeated Switches)
    重复的 switch 的问题在于： 每当你想增加一个选择分支时，必须找到所有的 switch,并逐一更新。多态给了我们对抗这种黑暗力量的武器，使我们得到更优化的代码库。

13. 循环语句(Loops)
    使用管道取代循环，管道操作(filter, map...)可以帮助我们更快地看清被处理的元素以及处理它们的动作。

14. 冗赘的元素(Lazy Element)
    程序元素(如类和函数)能给代码增加结构，从而支持变化，促进复用或者哪怕只是提供更好的名字也好，但有时我们真的不需要这层额外的结构。

15. 夸夸其谈通用性(Speculative Generality)
    当有人说：噢，我想我们总有一天需要做这事，并因而企图以各种各样的钩子和特殊情况来处理一些非必要的事情，这种坏味道就出现了。

16. 临时字段(Temporary Field)

17. 过长的消息链(Message Chains)

18. 中间人(Middle Man)
    过度运用委托

19. 内幕交易(Insider Trading)

20. 过大的类(Large Class)

21. 异曲同工的类(Alternative Classes with Different Interfaces)

22. 纯数据类(Data Class)
    所谓纯数据类是指：它们拥有一些字段，以及用于访问(读写)这些字段的函数，除此之外一无长物。

23. 被拒绝的遗赠(Refused bequest)

24. 注释(Comments)
    指的是因为代码太糟，所以存在的长长的注释
