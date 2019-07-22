// Dart 是一个面向对象编程语言，同时支持基于 mixin 的继承机制。
// 每个对象都是一个类的实例，所有的类都继承于 Object
// 基于 Mixin 的继承意味着每个类 （Object 除外）都只有一个超类，一个类的带按摩可以在其他多个类继承中重复使用

// var p = new Point(2, 2);

// var p = const ImmutablePoint(2, 2);

// 使用 Object 的 runtimeType 属性来判断实例的类型，该属性返回一个 Type 对象

// print('The type of p is ${p.runtimeType}');

import 'dart:math';

class Point {
  // 定义一个和类名字一样的方法就定义了一个构造函数 还可以带有其他可选的标识符
  Point(num x, num y) {
    this.x = x;
    this.y = y;
  }
  // 由于把构造函数参数赋值给实例变量的场景太常见了， Dart 提供了一个语法糖来简化这个操作
  // Point(this.x, this.y);

  // 命名构造函数
  // 使用命名构造函数可以为一个类实现多个构造函数，或者使用命名构造函数来更清晰地表明你的意图
  // Point.fromJson(Map json) {
  //   x = json['x'];
  //   y = json['y'];
  // }

  // 初始化列表
  Point.fromJson(Map jsonMap)
      : x = jsonMap['x'],
        y = jsonMap['y'] {
    print('In Point.fromJson(): ($x, $y)');
  }

  // 重定向构造函数
  // 有时候一个构造函数会调动类中的其他构造函数。一个重定向构造函数是没有代码的，在构造函数声明后，使用冒号调用其他构造函数
  Point.alongXAxis(num x) : this(x, 0);
  num x;
  num y;
  num z = 0;

  //实例函数
  // 对象的实例函数可以访问 this
  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = x - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}

class Person {
  String firstName;
  Person.fromJson(Map data) {
    print('in Person');
  }
  void sayHello() {
    print('hello, ${this.firstName}');
  }
}

class Employee extends Person {
  // Person does not have a default constructor.
  // you must call super.fromJson(data)
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

// Factory constructors (工厂方法构造函数)
class Logger {
  String name;
  bool mute = false;

  static final Map<String, Logger> _cache = <String, Logger>{};

  // 工厂构造函数无法访问 this.
  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }
  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) {
      print(msg);
    }
  }
}

// getters and setters
class Rectangle {
  num left;
  num top;
  num width;
  num height;

  Rectangle(this.left, this.top, this.width, this.height);

  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

// Abstract methods(抽象函数)
// 实例函数， getter, 和 setter 函数可以为抽象函数，抽象函数是只定义函数接口但是没有实现的函数，由子类来实现该函数。
// 如果用分号来替代函数体则这个函数就是抽象函数
abstract class Doer {
  // ... Define instance variables and methods...
  void doSomething(); // define an abstract method
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // ... Provide an implementation, so the method is not abstract here...
  }
}

main() {
  var point = new Point(5, 6);
  point.x = 4;
  point?.y = 5;
  print('the point x is ${point.x}');
  print('the point z is ${point.z}');

  var emp = new Employee.fromJson({});
  print('emp: ${emp}');
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
}
