# title

## 使用结构体组织相关联的数据

struct，或者 structure，是一个自定义数据类型，允许你命名和包装多个相关的值，从而形成一个有意义的组合。如果你熟悉一门面向对象语言，struct 就像对象中的数据属性。在本章中，我们会对比元组与结构体的异同，演示结构体的用法，并讨论如何在结构体上定义方法和关联函数来指定与结构体数据相关的行为。你在程序中基于结构体和枚举（enum）（在第六章介绍）创建新类型，以充分利用 Rust 的编译时类型检查。

### 定义并实例化结构体

结构体和我们在第三章讨论过的元组类似。和元组一样，结构体的每一部分可以是不同类型。但不同于元组，结构体需要命名各部分数据以便能清楚的表明其值的意义。由于有了这些名字，**结构体比元组更灵活：不需要依赖顺序来指定或访问实例中的值**。

定义结构体，需要使用 struct 关键字并为整个结构体提供一个名字。结构体的名字需要描述它所组合的数据的意义。接着，在大括号中，定义每一部分数据的名字和类型，我们称为 字段（field）。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

一旦定义了结构体后，为了使用它，通过为每个字段指定具体值来创建这个结构体的 实例。创建一个实例需要以结构体的名字开头，接着在大括号中使用 key: value 键-值对的形式提供字段，其中 key 是字段的名字，value 是需要存储在字段中的数据值。实例中字段的顺序不需要和它们在结构体中声明的顺序一致。换句话说，结构体的定义就像一个类型的通用模板，而实例则会在这个模板中放入特定数据来创建这个类型的值。

```rust
let user1 = User {
    email: String::from("someone@exmaple.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

为了从结构体中获取某个特定的值，可以使用点号。如果我们只想要用户的邮箱地址，可以用 user1.email。要更改结构体中的值，如果结构体的实例是可变的，我们可以使用点号并为对应的字段赋值。

注意整个实例必须是可变的；Rust 并不允许只将某个字段标记为可变。另外需要注意同其他任何表达式一样，我们可以在函数体的最后一个表达式中构造一个结构体的新实例，来隐式地返回这个实例。

变量与字段同名时的字段初始化简写语法

```rust
# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

使用结构体更新语法从其他实例创建实例

```rust
//.. 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值。

# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
# let user1 = User {
#     email: String::from("someone@example.com"),
#     username: String::from("someusername123"),
#     active: true,
#     sign_in_count: 1,
# };
#
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

使用没有命名字段的元组结构体来创建不同的类型

也可以定义与元组（在第三章讨论过）类似的结构体，称为 元组结构体（tuple structs）。元组结构体有着结构体名称提供的含义，但没有具体的字段名，只有字段的类型。当你想给整个元组取一个名字，并使元组成为与其他元组不同的类型时，元组结构体是很有用的，这时像常规结构体那样为每个字段命名就显得多余和形式化了。
定义元组结构体，以 struct 关键字和结构体名开头并后跟元组中的类型。

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

注意 black 和 origin 值的类型不同，因为它们是不同的元组结构体的实例。你定义的每一个结构体有其自己的类型，即使结构体中的字段有着相同的类型

没有任何字段的类单元结构体
我们也可以定义一个没有任何字段的结构体！它们被称为 类单元结构体（unit-like structs）因为它们类似于 ()，即 unit 类型。类单元结构体常常在你想要在某个类型上实现 trait 但不需要在类型中存储数据的时候发挥作用。

结构体数据的所有权
在示例 5-1 中的 User 结构体的定义中，我们使用了自身拥有所有权的 String 类型而不是 &str 字符串 slice 类型。这是一个有意而为之的选择，因为我们想要这个结构体拥有它所有的数据，为此只要整个结构体是有效的话其数据也是有效的。

可以使结构体存储被其他对象拥有的数据的引用，不过这么做的话需要用上 生命周期（lifetimes），这是一个第十章会讨论的 Rust 功能。生命周期确保结构体引用的数据有效性跟结构体本身保持一致。如果你尝试在结构体中存储一个引用而不指定生命周期将是无效的

总结：
结构体让你可以创建出在你的领域中有意义的自定义类型。通过结构体，我们可以将相关联的数据片段联系起来并命名它们，这样可以使得代码更加清晰。方法允许为结构体实例指定行为，而关联函数将特定功能置于结构体的命名空间中并且无需一个实例。

但结构体并不是创建自定义类型的唯一方法：让我们转向 Rust 的枚举功能，为你的工具箱再添一个工具。

## 枚举和模式匹配

枚举（enumerations），也被称作 enums。枚举允许你通过列举可能的值来定义一个类型。

首先，我们会定义并使用一个枚举来展示它是如何连同数据一起编码信息的。接下来，我们会探索一个特别有用的枚举，叫做 Option，它代表一个值要么是某个值要么什么都不是。然后会讲到在 match 表达式中用模式匹配，针对不同的枚举值编写相应要执行的代码。最后会介绍 if let，另一个简洁方便处理代码中枚举的结构。

枚举是一个很多语言都有的功能，不过不同语言中其功能各不相同。Rust 的枚举与 F#、OCaml 和 Haskell 这样的函数式编程语言中的 代数数据类型（algebraic data types）最为相似。

### 定义枚举

可以通过在代码中定义一个 IpAddrKind 枚举来表现这个概念并列出可能的 IP 地址类型，V4 和 V6。这被称为枚举的 成员（variants）：

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

//注意枚举的成员位于其标识符的命名空间中，并使用两个冒号分开。
//这么设计的益处是现在 IpAddrKind::V4 和 IpAddrKind::V6 都是 IpAddrKind 类型的。

// 定义一个函数来获取任何 IpAddrKind:
fn route(ip_type: IpAddrKind) {}
```

可以将任意类型的数据放入枚举成员中：例如字符串、数字类型或者结构体。甚至可以包含另一个枚举！

```rust
enum Message {
    Quit,
    Move {x: i32, y: i32},
    Write(String),
    ChangeColor(i32, i32, i32),
}

struct QuitMessage; // 类单元结构体
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // 元组结构体
struct ChangeColorMessage(i32, i32, i32); // 元组结构体
```

结构体和枚举还有另一个相似点：就像可以使用 impl 来为结构体定义方法那样，也可以在枚举上定义方法。

```rust
# enum Message {
#     Quit,
#     Move { x: i32, y: i32 },
#     Write(String),
#     ChangeColor(i32, i32, i32),
# }
#
impl Message {
    fn call(&self) {
        // 在这里定义方法体
    }
}

let m = Message::Write(String::from("hello"));
m.call();

//方法体使用了 self 来获取调用方法的值。
// 这个例子中，创建了一个值为 Message::Write(String::from("hello")) 的变量 m，而且这就是当 m.call() 运行时 call 方法中的 self 的值。
```

### Option 枚举和其相对于空值的优势

Option 是标准库定义的另一个枚举。Option 类型应用广泛因为它编码了一个非常普遍的场景，即一个值要么有值要么没值。
从类型系统的角度来表达这个概念就意味着编译器需要检查是否处理了所有应该处理的情况，这样就可以避免在其他编程语言中非常常见的 bug。

编程语言的设计经常要考虑包含哪些功能，但考虑排除哪些功能也很重要。
Rust 并没有很多其他语言中有的空值功能。空值（Null ）是一个值，它代表没有值。
在有空值的语言中，变量总是这两种状态之一：空值和非空值。

空值的问题在于当你尝试像一个非空值那样使用一个空值，会出现某种形式的错误。因为空和非空的属性无处不在，非常容易出现这类错误。

然而，空值尝试表达的概念仍然是有意义的：空值是一个因为某种原因目前无效或缺失的值。

问题不在于概念而在于具体的实现。为此，Rust 并没有空值，不过它确实拥有一个可以编码存在或不存在概念的枚举。

```rust
enum Option<T> {
    Some(T),
    None,
}
```

`Option<T>` 枚举是如此有用以至于它甚至被包含在了 prelude 之中，你不需要将其显式引入作用域。
另外，它的成员也是如此，可以不需要 `Option::` 前缀来直接使用 Some 和 None。即便如此 `Option<T>` 也仍是常规的枚举，`Some(T)` 和 `None` 仍是 `Option<T>` 的成员。

`<T>` 语法是一个我们还未讲到的 Rust 功能。它是一个泛型类型参数，第十章会更详细的讲解泛型。
目前，所有你需要知道的就是 `<T>` 意味着 Option 枚举的 Some 成员可以包含任意类型的数据。

```rust
let some_number = Some(5);
let some_string = Some("a string");

let absent_number: Option<i32> = None;
//如果使用 None 而不是 Some，需要告诉 Rust Option<T> 是什么类型的，因为编译器只通过 None 值无法推断出 Some 成员保存的值的类型。
```

当有一个 Some 值时，我们就知道存在一个值，而这个值保存在 Some 中。当有个 None 值时，在某种意义上，它跟空值具有相同的意义：并没有一个有效的值。那么，`Option<T>` 为什么就比空值要好呢？

简而言之，因为 `Option<T>` 和 T（这里 T 可以是任何类型）是不同的类型，编译器不允许像一个肯定有效的值那样使用 `Option<T>`。例如，这段代码不能编译，因为它尝试将 `Option<i8>` 与 i8 相加：

```rust
let x: i8 = 5;
let y: Option<i8> = Some(5);
// 事实上，错误信息意味着 Rust 不知道该如何将 Option<i8> 与 i8 相加，因为它们的类型不同。
let sum = x + y;
```

换句话说，在对 `Option<T>` 进行 T 的运算之前必须将其转换为 T。通常这能帮助我们捕获到空值最常见的问题之一：假设某值不为空但实际上为空的情况。

总的来说，为了使用 `Option<T>` 值，需要编写处理每个成员的代码。你想要一些代码只当拥有 `Some(T)` 值时运行，允许这些代码使用其中的 T。也希望一些代码在值为 None 时运行，这些代码并没有一个可用的 T 值。match 表达式就是这么一个处理枚举的控制流结构：它会根据枚举的成员运行不同的代码，这些代码可以使用匹配到的值中的数据。

### match 控制流运算符

Rust 有一个叫做 match 的极为强大的控制流运算符，它允许我们将一个值与一系列的模式相比较并根据相匹配的模式执行相应代码。模式可由字面值、变量、通配符和许多其他内容构成；

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u32 {

    // 拆开 value_in_cents 函数中的 match 来看。首先，我们列出 match 关键字后跟一个表达式，在这个例子中是 coin 的值。这看起来非常像 if 使用的表达式，不过这里有一个非常大的区别：对于 if，表达式必须返回一个布尔值，而这里它可以是任何类型的。
    match coin {
        // 一个分支有两个部分：一个模式和一些代码。第一个分支的模式是值 Coin::Penny 而之后的 => 运算符将模式和将要运行的代码分开
        Coin::Penny => {
            println!("Lucky penny!");
            1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        // Coin::Quarter => 25,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}
```

匹配 `Option<T>`

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

将 match 与枚举相结合在很多场景中都是有用的。
你会在 Rust 代码中看到很多这样的模式：match 一个枚举，绑定其中的值到一个变量，接着根据其值执行代码。
这在一开始有点复杂，不过一旦习惯了，你会希望所有语言都拥有它！这一直是用户的最爱。

_通配符
Rust 也提供了一个模式用于不想列举出所有可能值的场景。例如，u8 可以拥有 0 到 255 的有效的值，如果我们只关心 1、3、5 和 7 这几个值，就并不想必须列出 0、2、4、6、8、9 一直到 255 的值。所幸我们不必这么做：可以使用特殊的模式 _ 替代：

```rust
let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    5 => println!("five"),
    7 => println!("seven"),
    _ => (),
}
```

`_ 模式`会匹配所有的值。通过将其放置于其他分支之后，_ 将会匹配所有之前没有指定的可能的值。
() 就是 unit 值，所以 _ 的情况什么也不会发生。因此，可以说我们想要对 \_ 通配符之前没有列出的所有可能的值不做任何处理。

然而，match 在只关心 一个 情况的场景中可能就有点啰嗦了。为此 Rust 提供了 if let

### if let 简单控制流

```rust
let some_u8_value = Some(0u8);
// 为了满足 match 表达式（穷尽性）的要求，必须在处理完这唯一的成员后加上 _ => ()，这样也要增加很多样板代码。
match some_u8_value {
    Some(3) => println!("three"),
    _ => (),
}
// 我们可以使用 if let 这种更短的方式编写
// if let 获取通过等号分隔的一个模式和一个表达式。
if let Some(3) = some_u8_value {
    println!("Three");
}
```

使用 if let 意味着编写更少代码，更少的缩进和更少的样板代码。然而，这样会失去 match 强制要求的穷尽性检查。match 和 if let 之间的选择依赖特定的环境以及增加简洁度和失去穷尽性检查的权衡取舍。

换句话说，可以认为 if let 是 match 的一个语法糖，它当值匹配某一模式时执行代码而忽略所有其他值。

可以在 if let 中包含一个 else。else 块中的代码与 match 表达式中的 \_ 分支块中的代码相同，这样的 match 表达式就等同于 if let 和 else。

```rust
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("state quarter from {:?}!", state);
} else {
    count += 1;
}
```

现在我们涉及到了如何使用枚举来创建有一系列可列举值的自定义类型。我们也展示了标准库的 Option<T> 类型是如何帮助你利用类型系统来避免出错的。当枚举值包含数据时，你可以根据需要处理多少情况来选择使用 match 或 if let 来获取并使用这些值。

## 包， Crates 与模块

编写程序时一个核心的问题是 作用域（scope）：在代码的某处编译器知道哪些变量名？允许调用哪些函数？这些变量引用的又是什么？

Rust 有一系列与作用域相关的功能。这有时被称为 “模块系统”（“the module system”），不过又不仅仅是模块：

包（Packages）是 Cargo 的一个功能，它允许你构建、测试和分享 crate。
Crates 是一个模块的树形结构，它形成了库或二进制项目。
模块（Modules）和 use 关键字允许你控制作用域和路径的私有性。
路径（path）是一个命名例如结构体、函数或模块等项的方式
