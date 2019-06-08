#

## point

- 当看到符号 ! 的时候，就意味着调用的是宏而不是普通函数。

- 编译和运行是彼此独立的步骤：
  `rustc main.rs`

- 如果你更熟悉动态语言，如 Ruby、Python 或 JavaScript，则可能不习惯将编译和运行分为两个单独的步骤。Rust 是一种 预编译静态类型（ahead-of-time compiled）语言，这意味着你可以编译程序，并将可执行文件送给其他人，他们甚至不需要安装 Rust 就可以运行。如果你给他人一个 .rb、.py 或 .js 文件，他们需要先分别安装 Ruby，Python，JavaScript 实现（运行时环境，VM）。不过在这些语言中，只需要一句命令就可以编译和运行程序。这一切都是语言设计上的权衡取舍。

- Cargo 是 Rust 的构建系统和包管理器
  使用 Cargo 创建项目：
  `cargo new hello_cargo`
  `cd hello_cargo`
  构建并运行 Cargo 项目：
  `cargo build`
  `./target/debug/hello_cargo`
  同时编译并运行：
  `cargo run`
  快速检查代码确保其可以编译，但并不产生可执行文件：
  `cargo check`
  通常 cargo check 要比 cargo build 快得多，因为它省略了生成可执行文件的步骤。如果你在编写代码时持续的进行检查，cargo check 会加速开发！为此很多 Rustaceans 编写代码时定期运行 cargo check 确保它们可以编译。当准备好使用可执行文件时才运行 cargo build。
  可以使用 cargo build 或 cargo check 构建项目。
  可以使用 cargo run 一步构建并运行项目。
  有别于将构建结果放在与源码相同的目录，Cargo 会将其放到 target/debug 目录。
  发布(release)构建：
  `cargo build --release`
  这会在 target/release 而不是 target/debug 下生成可执行文件。这些优化可以让 Rust 代码运行的更快，不过启用这些优化也需要消耗更长的编译时间。这也就是为什么会有两种不同的配置：一种是为了开发，你需要经常快速重新构建；另一种是为用户构建最终程序，它们不会经常重新构建，并且希望程序运行得越快越好。如果你在测试代码的运行时间，请确保运行
  修改 Cargo.toml, 引入依赖, 然后不修改任何代码，运行`cargo build` cargo 就会自己下载依赖
  更新 crate 到一个新版本：
  `cargo update`
  当更新了 `Cargo.toml`中的依赖时，然后运行 `cargo build` 时， Cargo 会从 registry 更新可用的 crate，并根据你指定的新版本重新计算。
