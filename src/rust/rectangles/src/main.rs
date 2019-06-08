// fn main() {
//     let width1 = 30;
//     let height1 = 50;

//     println!("The area of the rectangle is {} square pixels", area(width1, height1));
// }

// fn area(width: u32, height: u32) -> u32 {
//     width * height
// }

// 函数 area 本应该计算一个长方形的面积，不过函数却有两个参数。
// 这两个参数是相关联的，不过程序本身却没有表现出这一点。
// 将长度和宽度组合在一起将更易懂也更易处理。第三章的 “元组类型” 部分已经讨论过了一种可行的方法：元组。

// 使用元祖重构

// fn main() {
//     let rect1 = (30, 50);

//     println!("The area of the rectangle is {} square pixels.", area(rect1));
// }

// fn area(demensions: (u32, u32)) -> u32 {
//     demensions.0 * demensions.1
// }

//在某种程度上说，这个程序更好一点了。元组帮助我们增加了一些结构性，并且现在只需传一个参数。
//不过在另一方面，这个版本却有一点不明确了：元组并没有给出元素的名称，所以计算变得更费解了，因为不得不使用索引来获取元组的每一部分：

//使用结构体重构：赋予更多意义

//我们使用结构体为数据命名来为其赋予意义。我们可以将我们正在使用的元组转换成一个有整体名称而且每个部分也有对应名字的数据类型

struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50};

    println!("The area of the rectangle is {} square pixels.", area(&rect1));
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}

// 通过派生 trait 增加实用功能
// 如果能够在调试程序时打印出 Rectangle 实例来查看其所有字段的值就更好了。示例 5-11 像前面章节那样尝试使用 println! 宏。但这并不行。

// will error:
// println!("rect1 is {}", rect1);

//让我们来试试！现在 println! 宏调用看起来像 println!("rect1 is {:?}", rect1); 这样。
//在 {} 中加入 :? 指示符告诉 println! 我们想要使用叫做 Debug 的输出格式。
//Debug 是一个 trait，它允许我们以一种对开发者有帮助的方式打印结构体，以便当我们调试代码时能看到它的值。

// Rust 确实 包含了打印出调试信息的功能，不过我们必须为结构体显式选择这个功能。为此，在结构体定义之前加上 #[derive(Debug)] 注解

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {width: 30, height: 50};

    println!("rect1 is {:?}", rect1);
}

//当我们有一个更大的结构体时，能有更易读一点的输出就好了，为此可以使用 {:#?} 替换 println! 字符串中的 {:?}。

// Rust 为我们提供了很多可以通过 derive 注解来使用的 trait，他们可以为我们的自定义类型增加实用的行为。
// 附录 C 中列出了这些 trait 和行为。第十章会介绍如何通过自定义行为来实现这些 trait，同时还有如何创建你自己的 trait。

// 我们的 area 函数是非常特殊的，它只计算长方形的面积。如果这个行为与 Rectangle 结构体再结合得更紧密一些就更好了，因为它不能用于其他类型。
// 现在让我们看看如何继续重构这些代码，来将 area 函数协调进 Rectangle 类型定义的 area 方法 中。