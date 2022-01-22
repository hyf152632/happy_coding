# title

基本上修饰器的行为就是：

```js
@decorator
class A {}

//equal

class A {}
A = decorator(A) || A;
```

也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

```js
function testable(target) {
  // ...
}
```

上面代码中，testable 函数的参数 target，就是会被修饰的类。

如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。

```js
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  };
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable; // true

@testable(false)
class MyClass {}
MyClass.isTestable; // false
```

修饰器不仅可以修饰类，还可以修饰类的属性。

修饰器只能用于类和类的方法，**不能用于函数**，因为存在函数提升。

