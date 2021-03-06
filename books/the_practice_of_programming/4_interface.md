# 界面

设计的真谛，就是在一些互相冲突的需求和约束条件之间寻找平衡点。

在进行设计的时候，必须考虑的问题包括：

- 界面：应提供哪些服务和访问？界面在效能上实际成为服务的提供者和使用者之间的一个约定。在这里要做的是提供一种统一而方便地服务，使用方便，有足够丰富的功能，而又不过多过滥以至于无法控制。
- 信息隐藏： 哪些信息应该是可见的，哪些应该是私有的？一个界面必须提供对有关部件的方便访问方式，而同时又隐藏其实现的细节。这样，部件的修改才不会影响到使用者。
- 资源管理：谁负责管理内存或者其他有限的资源？这里的主要问题是存储的分配和释放，以及管理共享信息的拷贝等。
- 错误处理：谁检查错误？谁报告？如何报告？如果检查中发现了错误，那么应该设法做哪些恢复性操作？

我们将针对一个日常任务构造出一个函数库和一些数据结构，通过这个工作展示界面设计中的问题。

通过程序抓取股票信息，代替人工通过浏览器获取的方式。

一个原型库

我们不大可能在第一次设计函数库或者界面时就做得很好。事情往往是这样，只有在你已经构造和使用了程序的一个版本之后，才能对如何把系统设计正确有足够的认识。

基于这种理解，我们构造 CSV 库时准备采用的途径就是：先搞出一个将要丢掉的，搞出一个原型。我们的第一个版本将忽略许多完备的工程库应该牵涉的难点，但却又必须完整和有用，以便能帮助我们熟悉问题。

在原始设计中的一些仓促选择引起的麻烦可能许多年后才浮现出来。这正是许多不良界面的历史画卷。事实确实非常令人沮丧，许多仓促而就的肮脏代码最后变成广泛使用的软件，在那里它们仍然是肮脏的，而且常常也达不到它们应有的速度。

要建立一个其他人能用的界面，我们必须考虑在本章开始处列出的那些问题：界面，信息隐藏，资源管理和错误处理。它们的相互作用对设计有极强的影响。

界面原则

界面定义了某个代码体为其用户提供的各种东西，定义了哪些功能或者数据元素可以为程序的其他部分使用。
一个界面要想成功，它就必须特别适合有关的工作，必须简单，通用，规范，其行为可以预料及坚固等等，它还必须能很好地适应用户或者实现方式的变化。好的界面总是遵循着一组原则，这些原则不是互相独立的，互相之间甚至可能并不很协调，但它们能帮助我们刻画那些位于界限两边的两部分软件之间的问题。
**隐藏实现细节**。 对于程序的其他部分而言，界面后面的实现应该是隐藏的，这样才能使它的修改不影响或破坏别的东西。人们用了许多术语来描述这种组织原则：信息隐藏，封装，抽象和模块化，它们谈论的都是类似的思想。一个界面应该隐藏那些与界面的客户或者用户无关的实现细节。这些看不到的细节可以在不影响客户的情况下做修改。例如对界面进行扩充，提高执行效率，甚至把它的实现完全替换掉。

应该避免全局变量。如果可能，最好是把所有需要引用的数据都通过函数参数传递给函数。

我们强烈反对任何形式的共有可见的数据，因为如果用户同样可以改变这些变量，要维护值得一致性就太困难了。通过函数界面，可以很容易提出要求遵守的访问规则。

C++ 和 Java 的类提供了更好的信息隐藏机制，这也是正确使用这些语言的核心。

选择一小组正交的基本操作。一个界面应该提供外界所需要的全部功能，但是绝不要更多；函数在功能方面不应该有过度的重叠。虽然提供大量函数可能使库变得更容易使用，你需要什么就有什么。但是大的界面既难写又难维护，太大的规模也使它难以学习，难以被用好。许多应用程序界面或称 API 有时是如此的庞大，以至于没人能有指望完全掌握它。

为使用方便，有些界面为做同一件事提供了多种方式，这种冗余其实是应该反对的。

一般来说，窄的界面比宽的界面更受人欢迎，至少是在有了强有力的证据，说明确实需要给界面增加一些新功能之前。我们应该做一件事并把它做好。不要因为一个界面可能做某些事就给它增加这些东西。如果是实现方面出了毛病那么就不要去修改界面。

不要在用户背后做小动作。一个库函数不应该写某个秘密文件，修改某个秘密变量，或者改某些全局性数据，在改变其调用者的数据时也要特别谨慎。

一个界面在使用时不应该强求另外的东西，如果这样做仅仅是为了设计者或实现者的某些方便。相反，我们应该使界面成为自给自足的。如果确实无法做到这一点，那么也应该把需要哪些外部服务的问题做成明显的。不这样做就会更新用户增加很大的负担。

在各处都用同样方式做同样的事。一致性和规范性是非常重要的。相关的事物应该具有相关的意义。

外部一致性，与其他东西的行为类似也是非常重要的。

当然，不管我们今天在设计界面时做得如何好，事情也总有一个限度。今天最好的界面最终也会变成明天的问题。但是，一个好的界面设计将把这个明天推到更远的将来。

资源管理

在设计库（或者类，包）的界面时，一个最困难的问题就是管理某些资源，这些资源是库所拥有的，而又在库和它的调用程序之间共享。这里最明显的资源是存储，谁负责存储的分配和释放？其他的共享资源包括哪些打开的文件以及共同关心的变量状态等。粗略地说，有关的问题大致涉及初始化，状态维护，共享和复制以及清楚等等。

废料收集有许多不同的技术。有一类模式是维持着对每个对象的使用计数，即它们的引用计数值，一旦某个对象的引用计数值变成 0 时就释放它。这种技术可以显示地应用到 C 或 C++ 里，用来管理共享的对象。另一种算法是周期性地工作，按照某种痕迹跟踪分配池到所有被引用的对象。所有能够以这种方式找到的对象都是正在被使用的，未被引用的对象是无用的，可以回收。
自动废料收集机制的存在并不意味着设计中不再有存储管理问题了。我们仍然需要确定界面是应该返回对共享对象的引用呢，还是返回它们的拷贝，而这个决定将影响到整个程序。此外，废料收集也不是白来的，这里有维护信息和释放无用存储的代价，此外，这种收集动作发生的事件也是无法预期的。

假定我们写的函数不是为了自己用。而是为别人写程序提供一个库。那么，如果库里的一个函数发现了某种不可恢复性的错误，它又该怎么办呢？在本章前面写的函数里，采取的做法是显示一段信息并令程序结束。这种方式对很多程序是可以接受的，特别是对那些小的独立工具或应用程序。而对另一些程序，终止就可能是错误的，因为这将完全排除程序其他部分进行恢复的可能性。例如，一个字处理系统必须由错误中恢复出来，这样它才能不丢掉你键入的文档内容。在某些情况下库函数甚至不应该显示信息，因为本程序段可能运行在某种特定的环境里，在这里显示信息有可能干扰其他显示数据，这种信息也可能被直接丢掉，没留下任何痕迹。在这种环境里，一种常用的方式是输出诊断情况，写入一个显式的记录文件，这个文件可以独立地进行监控和检查。

在低层检查错误，在高层处理它们。作为一条具有普遍意义的规则，错误应该在尽可能低的层次上检测和发现，但应该在某个高一些的层次上处理。一般情况下，应该由调用程序决定对错误的处理方式，而不该由被调用程序决定。库函数应该以某种得体的失败方式在这方面起作用。在前面我们让函数对不存在的域返回 NULL 值，而不是立即退出执行，也就是由于这个原因。

用户界面

至此我们谈论的主要是一个程序里不同部件之间的界面，或者是不同程序之间的界面问题。实际中还有另一类，也是非常重要的界面，那就是程序与作为程序使用者的人之间的界面。

错误信息，提示符或对话框中的文本应该对合法输入给出说明。不要简单地说出一个参数太大，而应说明参数值的合法范围。如果可能的话，给出的这段文本本身最好就是一段合法的输入，比如提供一个带合适参数的完整命令行。

对于大部分人而言，图形用户界面就是他们计算机的用户界面。图形用户界面是一个巨大的题目，对此我们将只想说一点与本书切题的内容。
首先，图形界面很难做正确，因为它们的适用性或者成功非常强烈地依赖于个人的行为和期望。
其次，作为另一种实际情况，如果一个系统有一个用户界面，通常这个程序里处理用户交互的代码将比实现所完成工作的算法的代码更多。

无论如何，我们熟悉的各种原则也适用于用户界面软件的外部设计及其内部实现。从用户的观点看，风格问题，如简单性，清晰性，规范性，统一性，熟悉性和严谨性等，对于保证一个界面容易使用都是非常重要的，不具有这些性质的界面必定是令人讨厌的难对付的界面。
