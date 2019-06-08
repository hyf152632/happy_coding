fn main() {
    let number = 3;

    if number > 7 {
        println!("condition was true.");
    } else {
        println!("condition was false");
    }

    if number < 5 {
        println!("condition was true.")
    }

    if number != 0 {
        println!("condition was true.")
    }

    //代码块的值是其最后一个表达式的值，而数字本身就是一个表达式。
    //在这个例子中，整个 if 表达式的值取决于哪个代码块被执行。
    //这意味着 if 的每个分支的可能的返回值都必须是相同类型；
    //在示例 中，if 分支和 else 分支的结果都是 i32 整型。如果它们的类型不匹配,则会出现一个错误：
    let condition = true;
    let number = if condition {
        5
    } else {
        6
    };
    

    println!("The value of number is: {}.", number);
}

