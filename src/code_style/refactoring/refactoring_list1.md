# 重构名录

1. 提炼函数(Extrac Function)
   反向重构: 内联函数

   ```js
   function printOwing(invoice) {
     printBanner()
     let outstanding = calculateOutstanding()

     //-   //print details
     //-   console.log(`name: ${invoice.customer}`)
     //-   console.log(`amount: ${outstanding}`)
     function printDetails(outstanding) {
       console.log(`name: ${invoice.customer}`)
       console.log(`amount: ${outstanding}`)
     }
   }
   ```

   > 将意图与实现分开
   > 如果你需要花时间浏览一段代码才能弄清它到底在干什么，那么就应该将其提炼到一个函数中，并根据它所做的事为其命名。

2. 内联函数(Inline Function)
   一些函数，其内部代码和函数名称同样清晰易读。
   如果现有的一群组织不甚合理的函数。可以将它们都内联到一个大型函数中，再重新提炼出小函数。

3. 提炼变量(Extract Variable)
   引入解释性变量(Introduce Explaining Variable)
   反向重构:内联变量
   表达式有可能非常复杂而难以阅读。这种情况下，局部变量可以帮助我们将表达式分解为比较容易管理的形式。
   如果是在一个类里，可以提炼成方法，而不是变量。
   这是对象带来的一大好处：它们提供了合式的上下文，方便分享相关的逻辑和数据

4. 内联变量(Inline Variable)
   如果一个变量并不比表达式本身根据表现力;
   还有些时候，变量可能会妨碍重构附近的代码。

5. 改变函数声明(Change Function Declearation)
   函数改名(Rename Function)
   函数是将程序拆分成小块的主要方式。对于函数而言，最重要的元素当属函数的名字。
   一个改进函数名字的好办法：先写一句注释描述这个函数的用途，再把这句注释变成函数的名字。
   对于函数的参数，道理也是一样。
   修改参数列表不仅能增加函数的应用范围，还能改变连接一个模块所需的条件，从而去除不必要地耦合

   迁移式做法：

   ```js
   function circum(radius) {
     return circumference(radius)
   }
   function circumference(radius) {
     return 2 * Math.PI * redius
   }
   ```

   添加参数;
   使参数更一般化，提高函数的通用性;

6. 封装变量(Encapsulate Variable)
   自封装字段(Self-Encapsulate Field)
   封装字段(Encapsulate Field)

   ```js
   let defaultOwner = { firstName: 'Martin', lastName: 'Fowler' }
   //to
   let defaultOwnerData = { firstName: 'Martin', lastName: 'Flowler' }
   export function defualtOwner() {
     return defaultOwnerData
   }
   export function setDefaultOwner(arg) {
     defaultOwnerData = arg
   }
   ```

   对于所有可变的数据，只要它的作用域超出单个函数，就将其封装起来，只允许通过函数访问。数据的作用域越大，封装就越重要。
   封装数据很重要，不过，不可变数据更重要。如果数据不能修改，就根本不需要数据更新前的验证或者其它逻辑钩子。
   不可变是强大的代码防腐剂。
