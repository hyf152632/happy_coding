fn main() {
    println!("Hello, world!");

    another_function();

    another_function_with_param(10);

    function_with_multi_params(12, 19);

    expression_without_end_semicolon();

    println!("function with implicit return: {}", function_with_implicit_return());  

    let x = plus_one(5);

    println!("The value of plus_one function return is: {}", x);
}

fn another_function() {
    println!("Another function.")
}

fn another_function_with_param(x: i32) {
    println!("The value of x is: {}", x)
}

fn function_with_multi_params(x: i32, y: i32) {
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
}

fn expression_without_end_semicolon() {
    let _x = 5;
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {}", y)
}

fn function_with_implicit_return() -> i32 {
    5
    // 没有分号，就是一个表达式，就可以返回值
}

fn plus_one(x: i32) -> i32 {
    x + 1;
}