fn main() {
    let my_string = String::from("hello, world");

    // first_world 中传入 `String` 的 slice
    let word = first_word(&my_string[..]);

    let my_string_literal = "hello world";

    //first_world 中传入字符串字面值的 slice
    let word = first_word(&my_string_literal[..]);

    //因为字符串字面值 **就是** 字符串 slice,
    // 这样写也可以，即不使用 slice 语法！
    let word = first_word(my_string_literal);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &[0..i];
        }
    }

    &s[..]
}
