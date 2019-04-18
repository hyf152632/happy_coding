# 重构名录

## 第一部分：第一组重构

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

   js 中可以把变量和访问函数搬移到单独的一个文件中，并且只导出访问函数，这样就限制了变量的可见性。

7. 变量改名(Rename Variable)

   ```js
   let a = height * width
   //to
   let area = height * width
   ```

   好的命名是整洁编程的核心。
   如果要改名的变量只作用于一个函数（临时变量或者参数），对其改名是最简单的。
   如果变量作用域不止于单个函数，通常运用封装变量。

8. 引入参数对象(Introduce Parameter Object)
   如果一组数据项总是结伴而行，出没于一个又一个函数。这样一组数据就是所谓的数据泥团，代之以一个数据结构。
   这项重构真正的意义在于，它会催生代码中更深层次的改变。一旦识别出新的数据结构，就可以重组程序的行为来使用这些结构。

   声明一个类，而不是基本的 js 对象，因为这个重构通常只是一系列重构的起点，随后会把行为搬移到新建的对象中。

   ```js
   class NumberRange {
     constructor(min, max) {
       this._data = { min, max }
     }
     get min() {
       return this._data.min
     }
     get max() {
       return this._data.max
     }
     contains(arg) {
       return arg >= this.min && arg <= this.max
     }
   }
   function readingsOutsideRange(station, range) {
     return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
   }

   const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling)
   readingsOutsideRange(station, range)
   ```

9. 函数组合成类(Combine Functions into Class)

   ```js
   function base(aReading) {}
   function taxableCharge(aReading) {}
   function calculateBaseCharge(aReading) {}
   //to
   class Reading {
     base() {}
     taxableCharge() {}
     calculateBaseCharge() {}
   }
   ```

   类，在大多数现代编程语言中都是基本构造。它们把数据与函数捆绑到同一个环境中，将一部分数据与函数暴露给其他程序元素以便协作。
   它们是面向对象语言的首要构造，在其他程序设计方法中页同样有用。
   //凡事可以用对象表达的，用函数也可以表达。

   类似这样的一组函数不仅可以组合成一个类，而且可以组合成一个嵌套函数。
   通常我更倾向于类而非嵌套函数，因为后者测试起来会比较困难。

   在有些编程语言中，类不是一等公民，而函数则是。面对这样的语言，可以用"函数作为对象",的形式来实现这个重构手法。

10. 函数组合成变换(Combine Function into Transfrom)

    ```js
    function base(aReading) {}
    function taxableCharge(aReading) {}

    //to
    function enrichReading(argReading) {
      const aReading = _.cloneDeep(argReading)
      aReading.baseCharge = base(aReading)
      aReading.taxableCharge = taxableCharge(aReading)
      return aReading
    }
    ```

    在软件中，经常需要把数据“喂"给一个程序，让它再计算出各种派生信息。
    函数组合成变换的替代方案是函数组合成类。
    根据代码库中已有的编程风格来选择使用哪一个。
    两者的一个重要区别是：如果代码中会对源数据做更新，那么使用类要好得多；如果使用变换，派生数据会被存储在新生成的记录中，一旦源数据被修改，就会遭遇数据不一致。

    [提炼函数]也能避免重复，但孤立存在的函数常常很难找到，只有把函数和它们操作的数据放在一起，用起来才方便。
    引入变换或者类都是为了让相关的逻辑找起来方便。

    这个变换函数返回的本质上仍是原来的对象，只是添加了更多的信息在上面。对于这种函数，更喜欢用"enrich"(增强) 来命名，如果它生成的是跟原来完全不同的对象，就会用"transform"来命名。

11. 拆分阶段(Split Phase)

    ```js
    const orderData = orderString.split(/\s+/)
    const productPrice = priceList[orderData[0.split('-')[1]]]
    const orderPrice = parseInt(orderData[1]) * productPrice

    //to
    const orderRecord = parseOrder(order)
    const orderPrice = price(orderRecord, priceList)

    function parseOrder(aString) {
        const values = aString.split(/\s+/)
        return ({
            productID: values[0].split('-')[1]
            quantity: parseInt(values[1])
        })
    }
    function price(order, priceList) {
        return order.quantity * priceList[order.productID]
    }
    ```

    编译器是最典型的例子。
    每一步都有边界明确的范围，可以聚焦思考其中一步，而不用理解其他步骤的细节。
    如果一块代码中出现了上下几段，各自使用不同的一组数据和函数，这就是最明显的线索。将这些代码片段拆分成各自独立的模块，能更明确地标示出它们之间的差异。
    例如：手上有一段”计算订单价格“的代码，至于订单中的商品是什么，我们从代码中看不出来，也不太关心。

## 第二部分 封装

分解模块时最重要的标准，也许就是识别出哪些模块应该对外界隐藏的小秘密了。

类和模块已然是实施封装的最大实体了，但小一点的函数对于封装实现细节也有所裨益。

1. 封装记录(Encapsulate Record)
   以数据类取代记录(Replace Record with Data Class)

   ```js
   organization = { name: 'Acme Gooseberries', country: 'GB' }
   //to
   class Organization {
     constructor(data) {
       this._name = data.name
       this._country = data.country
     }
     get name() {
       return this._name
     }
     set name(arg) {
       this._name = arg
     }
     get country() {
       return this._country
     }
     set country(arg) {
       this._country = arg
     }
   }
   ```

2. 封装集合(Encapsulate Collection)

   ```js
   class Person {
     get courses() {
       return this._courses
     }
     set courses(aList) {
       this._courses = aList
     }
   }
   //to
   class Person {
     get courses() {
       return this._courses.slice()
     }
     addCourse(aCourse) {}
     removeCourse(aCourse) {}
   }
   ```

   不要让集合的取值函数返回原始集合，这就避免了客户端的意外修改。
   一种避免直接修改集合的方法是，永远不直接返回集合的值。

   js 中原生的数组排序函数 sort() 会修改原数组。

3. 以对象取代基本类型(Replace Primitive with Object)
   以对象取代数据值(Replace Data Value with Object)
   以类取代类型码(Replace Type Code with Class)

   ```js
   orders.filter(o => 'heigh' === o.priority || 'rush' === o.priority)
   //to
   orders.filter(o => o.priority.higherThan(new Priority('normal')))
   ```

   一旦我发现对某个数据的操作不仅仅局限于打印时，就会为它创建一个新类。一开始这个类也许只是简单包装一下简单类型的数据。
   不过只要类有了，日后添加的业务逻辑就有地可去了。

4. 以查询取代临时变量(Replace Temp with Query)

   ```js
   const basePrice = this._quantity * this._itemPrice
   if(base > 1000) {
       return basePrice * 0.95
   } else {
       return basePrice * 0.98
   }
   //to
   get basePrice() {this._quantity * this._itemPrice}
   //...
   if(this.basePrice > 1000){
       return this.basePrice * 0.95
   } else {
       return this.basePrice * 0.98
   }
   ```

5. 提炼类(Extract Class)

6. 内联类(Inline Class)

7. 隐藏委托关系(Hide Delegate)
   反向重构： 移除中间人

   ```js
   manager = aPerson.department.manager
   //to
   manager = aPerson.manager

   classs Person {
       get manager(){ return this.department.manager }
   }
   ```

8. 移除中间人(Remove Middle Man)

   ```js
   manager = aPerson.manager
   class Person {
     get manager() {
       return this.department.manager
     }
   }
   //to
   manager = aPerson.department.manager
   ```

   何时应该隐藏委托关系，何时应该移除中间人，没有绝对的标准————代码环境自然会给出该使用哪种手法的线索，具备思考能力的程序员应能分辨出何种手法更佳。

9. 替换算法(Substitute Algorithm)

   ```js
   function foundPerson(people) {
     for (let i = 0; i < people.length; i++) {
       if (people[i] === 'Don') {
         return 'Don'
       }
       if (people[i] === 'John') {
         return 'John'
       }
       if (people[i] === 'Kent') {
         return 'Kent'
       }
     }
     return ''
   }

   //to
   function foundPerson(people) {
     const candidates = ['Don', 'John', 'Kent']
     return people.find(p => candidates.includs(p)) || ''
   }
   ```

   "重构" 可以把一些复杂的东西分解为较简单的小块，但有时你就必须壮士断腕，删掉整个算法，代之以较简单的算法。

## 第三部分 搬移特性

到目前为止，介绍的重构手法都是关于如何新建，移除或重命名程序的元素。
此外，还有另一种类型的重构也很重要，那就是在不同的上下文之间搬移元素。

1. 搬移函数(Move Method)

   ```js
   class Account {
     get overdraftChange() {}
   }
   //to
   class AccountType {
     get overdraftChange() {}
   }
   ```

   模块化是优秀软件设计的核心所在，好的模块化能够在修改程序时只需理解程序的一小部分。为了设计出高度模块化的程序，得保证互相关联的软件要素都能集中到一块，并确保块与块之间的联系易于查找，直观易懂。

   对模块设计的理解不是一成不变的，随着对代码的理解加深，会知道哪些软件要素如何组织最为恰当。要将这种理解反映到代码上，就得不断地搬移这些元素。

   搬移函数最直接的一个动因是，它频繁引用其他上下文中的元素，而对自身上下文中的元素却关心甚少。

2. 搬移字段(Move Field)

   ```js
   class Customer {
     get plan() {
       return this._plan
     }
     get discountRate() {
       return this._discountRate
     }
   }
   //to
   class Customer {
     get plan() {
       return this._plan
     }
     get discountRate() {
       return this.plan.discountRate
     }
   }
   ```

   编程活动中你需要编写许多代码，为系统实现特定的行为，但往往数据结构才是一个健壮程序的根基。一个适应于问题域的良好数据结构，可以让行为代码变得简单明了，
   而一个糟糕的数据结构则将招致许多无用代码，这些代码更多是在差劲的数据结构中间纠缠不清，而非为系统实现有用的行为。
   代码凌乱，势必难以理解；不仅如此，坏的数据结构本身也会掩藏程序的真实意图。

3. 搬移语句到函数(Move Statements into Function)
   反向重构： 搬移语句到调用者

   要维护代码库的健康发展，需要遵守几条黄金守则，其中最重要的一条当属“消除重复”。
   如果发现调用某个函数时，总有一些相同的代码也需要每次执行，那么考虑将此段代码合并到函数里头。

4. 搬移语句到调用者(Move Statements to Callers)

5. 以函数调用取代内联代码(Replace Inline Code with Function Call)

   ```js
   let appliesToMass = false
   for (const s of states) {
     if (s === 'MA') {
       appliesToMass = true
     }
   }

   //to
   appliesToMass = states.includes('MA')
   ```

6. 移动语句(Slide Statements)
   合并重复的代码片段(Consilidate Duplicate Conditional Fragments)

   ```js
   const pricingPlan = retrievePricingPlan()
   const order = retrieveOrder()
   let charge
   const chargePerUnit = pricingPlan.unit

   //to
   const pricingPlan = retrievePricingPlan()
   const chargePerUnit = pricingPlan.unit
   const order = retreiveOrder()
   let charge
   ```

   让存在关联的东西一起出现，可以使代码更容易理解。
   如果有几行代码取用了同一个数据结构，那么最好是让它们在一起出现。

7. 拆分循环(Split Loop)

   ```js
   let averageAge = 0
   let totalSalary = 0
   for (const p of people) {
     averageAge += p.age
     totalSalary += p.salary
   }
   averageAge = averageAge / people.length
   //to
   let totalSalary = 0
   for (const p of people) {
     totalSalary += p.salary
   }
   let averageAge = 0
   for (const p of people) {
     averageAge += p.age
   }
   averageAge = averageAge / people.length
   ```

   本手法的意义不仅在于拆分出循环本身，而且在于它为进一步优化提供了良好的起点————下一步我通常会寻求将每个循环提炼到独立的函数中。

   ```js
   function totalSalary() {
     let totalSalary = 0
     for (const p of people) {
       totalSalary += p.salary
     }
     return totalSalary
   }

   function youngestAge() {
     let youngest = people[0] ? people[0].age : Infinity
     for (const p of people) {
       if (p.age < youngest) youngest = p.age
     }
     return youngest
   }
   //totalSalary 使用以管道取代循环 进一步重构：
   function totalSalary() {
     return people.reduce((total, p) => total + p.salary, 0)
   }
   //youngestAge 用 替换算法 替之以更好的算法：
   function youngestAge() {
     return Math.min(...people.map(p => p.age))
   }
   ```

8. 以管道取代循环(Replace Loop with Pipeline)

   ```js
   const names = []
   for (const i of input) {
     if (i.job === 'programmer') {
       names.push(i.name)
     }
   }
   //to
   const names = input.filter(i => i.job === 'programmer').map(i => i.name)
   ```

9. 移除死代码(Remove Dead Code)

   ```js
   if (false) {
     doSomethingThatUsedToMatter()
   }
   ```

## 第四部分 重新组织数据

1. 拆分变量(Split Variable)
   移除对参数的赋值(Remove Assignments to Parameters)
   分解临时变量

   ```js
   let temp = 2 * (height + width)
   console.log(temp)
   temp = height * width
   console.log(temp)
   //to
   const perimeter = 2 * (height + width)
   console.log(perimeter)
   const area = height * width
   console.log(area)
   ```

2. 字段改名(Rename Field)

   ```js
   class Organization {
     get name() {}
   }
   //to
   class Organization {
     get title() {}
   }
   ```

3. 以查询取代派生变量(Replace Derived Variable with Query)

   ```js
   get discountedTotal() {return this._discountedTotal}
   set discount(aNumber) {
       const old = this._discount
       this._discount = aNumber
       this._discountTotal += old - aNumber
   }

   //to
   get discountedTotal() {return this._baseTotal - this._discount}
   set discount(aNumber){this._discount = aNumber}
   ```

   可变数据是软件中最大的错误源头之一。

4. 将引用对象改为值对象(Change Reference to Value)
   反向重构：将值对象改为引用对象

   ```js
   class Product {
     applyDiscount(arg) {
       this._price.amount -= arg
     }
   }
   //to
   class Product {
     applyDiscount(arg) {
       this._price = new Money(this._price.amount - arg, this._price.currency)
     }
   }
   ```

5. 将值对象改为引用对象(Change Value to Reference)

   ```js
   let customer = new Customer(customerData)
   //to
   let customer = customerRepository.get(customerData.id)
   ```

## 第五部分 简化条件逻辑

1. 分解条件表达式(Decompose Conditional)

   ```js
   if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
     charge = quantity * plan.summerRate
   } else {
     charge = quantity * plan.regularRate + plan.regularServiceCharge
   }
   //to
   if (summer()) {
     charge = summerCharge()
   } else {
     charge = regularCharge()
   }

   charge = summer() ? summerCharge() : regularCharge()
   ```

2. 合并条件表达式(Consolidate Conditional Expression)

   ```js
   if (anEmployee.seniority < 2) return 0
   if (anEmployee.monthsDisabled > 12) return 0
   if (anEmployee.isPartTime) return 0

   //to
   if (isNotEligibleForDisability()) return 0
   function isNotEligibleForDisability() {
     return anEmployee.seniority < 2 || anEmployee.monthsDisbled > 12 || anEmployee.isPartTime
   }
   ```

   如果有这样一串条件检查： 检查条件各不相同，最终行为却一致。如果发现这种情况，就应该使用"逻辑或" 和 "逻辑与" 将它们合并为一个条件表达式。

3. 以卫句取代嵌套条件表达式(Replace Nested Conditional with Guard Clauses)

   ```js
   function getPayAmount() {
     let result
     if (isDead) {
       result = deadAmount()
     } else {
       if (isSeparated) {
         result = separatedAmount()
       } else {
         if (isRetired) {
           result = retiredAmount()
         } else {
           result = normalPayAmount()
         }
       }
     }
     return result
   }

   function getPayAmount() {
     if (isDead) return deadAmount()
     if (isSeparated) return separatedAmount()
     if (isRetired) return retiredAmount()
     return normalPayAmount()
   }
   ```

4. 以多态取代条件表达式(Replace Conditional with Polymorphism)

   switch...case 语句 用 类 的 多态 替代。

5. 引入特例(Introduce Special Case)

   ```js
   if (aCustomer === 'unknown') customerName = 'occupant'

   //to
   class UnknownCustomer {
     get name() {
       return 'occupant'
     }
   }
   ```

6. 引入断言(Introduce Assertion)

   ```js
   if (this.discountRate) {
     base = base - this.discountRate * base
   }
   //to
   assert(this.discountRate >= 0)
   if (this.discountRate) {
     base = base - this.discountRate * base
   }
   ```

## 第六部分 重构 API

模块和函数是软件的骨肉，而 API 则是将骨肉连接起来的关节。

好的 API 会把更新数据的函数与只是读取数据的函数清晰分开。

1. 将查询函数与修改函数分离(Separate Query from Modifier)

   ```js
   function getTotalOutstandingAndSendBill() {
     const result = customer.invoices.reduce((total, each) => each.amount + total, 0)
     sendBill()
     return result
   }
   //to
   function totalOutstanding() {
     return customer.invoices.reduce((total, each) => each.amount + total, 0)
   }
   function sendBill() {
     emailGateway.send(formatBill(customer))
   }
   ```

   任何有返回值的函数，都不应该有看得到的副作用————命令与查询分离(Command-Query Separation)
   如果遇到既有返回值又有副作用的函数，就试着将查询动作从修改动作中分离出来。

2. 函数参数化(Parameterize Function)
   令函数携带参数(Parameterize Method)

```js
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1)
}
function fivePercentRaise(aPerson) {
  aPserson.salary = aPerson.salary.multiply(1.05)
}

//to
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor)
}
```

如果发现两个函数逻辑非常相似，只是一些字面量值不同，可以将其合并成一个函数，以参数的形式传入不同的值，从而消除重复。
这个重构可以使函数更有用，因为重构后的函数还可以用于处理其他的值。

3.  移除标记参数(Remove Flag Argument)
    以明确函数取代参数(Replace Parameter with Explicit Methods)

    ```js
    function setDimension(name, value) {
      if (name === 'height') {
        this._height = value
        return
      }
      if (name === 'width') {
        this._width = value
        return
      }
    }
    //to
    function setHeight(value) {
      this._height = value
    }
    function setWidth(value) {
      this._width = value
    }
    ```

"标记参数"是这样的一种参数：调用者用它来指示被调函数应该执行哪一部分逻辑
如果一个函数有多个标记参数，可能就不得不将其保留，否则就得针对各个参数的各种取值的所有组合情况提供明确函数。这也是一个星号，说明这个函数可能做得太多，应该考虑是否能用更简单的函数来组合出完整的逻辑。

4. 保持对象完整(Preserve Whole Object)

   ```js
   const low = aRoom.daysTempRange.low
   const high = aRoom.daysTempRange.high
   if(aPlan.withinRange(low, high))
   //to
   if(aPlan.withinRange(aRoom.daysTempRange))
   ```

5. 以查询取代参数(Replace Parameter with Query)
   以函数取代参数(Replace Parameter with Method)
   反向重构：以参数取代查询

   ```js
   availableVacation(anEmployee, anEmployee.grade)
   function availableVacation(anEmployee, grade) {
     //calculate vacation...
   }
   //to
   availableVacation(anEmployee)

   function availableVacation(anEmployee) {
     const grade = anEmployee.grade
     //calculate vacation...
   }
   ```

6. 以参数取代查询(Replace Query with Parameter)
   反向重构: 以查询取代参数

   ```js
   targetTemperature(aPlan)
   function targetTemperature(aPlan) {
     current = thermostat.currentTemperature
     //...
   }
   //to
   targetTemperature(aPlan, thermostat.currentTemperature)
   function targetTemperature(aPlan, currentTemperature) {
     //...
   }
   ```

   如果一个函数用同样的参数调用总是给出同样的结果，我们就说这个函数具有“引用透明性(referential transparency)”
   有一个常见的模式：在负责逻辑处理的模块中只有纯函数，其外再包裹处理 I/O 和其他可变元素的逻辑代码。

7. 移除设值函数(Remove Setting Method)

   ```js
   class Person {
     get name() {}
     set name(aString) {}
   }
   //to
   class Person {
     get name() {}
   }
   ```

   如果为某个字段提供了设值函数，这就暗示这个字段可以被改变。如果不希望在对象创建之后此字段还有机会被改变，那就不要为它提供设置函数(同时该字段声明为不可变)

8. 以工厂函数取代构造函数(Replace Constructor with Factory Function)
   以工厂函数取代构造函数(Replace Constructor with Factory Method)

   ```js
   leadEngineer = new Employee(document.leadEngineer, 'E')
   //to
   leadEngineer = createEngineer(document.leadEngineer)
   function createEngineer(engineer) {
     return new Employee(engineer, 'E')
   }
   ```

   与一般的函数相比，构造函数常有一些丑陋的局限性。
   工厂函数就不受这些限制。工厂函数的实现内部可以调用构造函数，但也可以换成别的实现方式。

9. 以命令取代函数(Replace Function with Command)
   以函数对象取代函数(Replace Method with Method Object)

```js
function score(candidate, medicalExam, scoringGuide) {
  let result = 0
  let healthLevel = 0
  //long body code
}
//to
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate
    this._medicalExam = medicalExam
    this._scoringGuide = scoringGuide
  }
  execute() {
    this._result = 0
    this._healthLevel = 0
    //long body code
  }
}
```

将函数封装成自己的对象，这样的对象，称为”命令对象“
只有当特别需要命令对象提供的某种能力而普通的函数无法提供这种能力的时候，才考虑选择使用命令对象。
除了函数调用本身，命令对象还可以支持附加的操作，例如撤销操作。
可以通过对象提供的方法来设置命令的参数值，从而支持更丰富的生命周期管理能力。
借助继承和钩子对函数行为加以定制。
如果编程语言支持对象但不支持函数作为一等公民，通过命令对象就可以给函数提供大部分相当于一等公民的能力。
在这里，命令指一个对象，其中封装了一个函数调用请求。

一个典型的应用场景就是拆解复杂的函数，以便于理解和修改：

```js
function score(candidate, medicalExam, scoringGuide) {
  let result = 0
  let healthLevel = 0
  let heighMedicalRiskFlag = false

  if (medicalExam.isSmoker) {
    healthLevel += 10
    highMedicalRiskFlag = true
  }
  let certificationGrade = 'regular'
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = 'low'
    result -= 5
  }
  //lots more code like this
  result -= Math.max(healthLevel - 5, 0)
  return result
}
//to
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate
    this._medicalExam = medicalExam
    this._scoringGuide = scoringGuide
  }
  execute() {
    this._result = 0
    this._healthLevel = 0
    this._highMedicalRiskFlag = false

    this.scoreSmoking()
    this._certificationGrade = 'regular'
    if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = 'low'
      this._result -= 5
    }
    //lots more code like this
    this._result -= Math.max(this._healthLevel - 5, 0)
    return this._result
  }
  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10
      this._highMedicalRiskFlag = true
    }
  }
}
```

这样就可以像处理嵌套函数一样处理命令对象。实际上，在 JavaScript 中运用此重构手法，的确可以考虑用嵌套函数来代替命令对象。

10. 以函数取代命令(Replace Command with Function)

```js
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer
    this._usage = usage
  }
  execute() {
    return this._customer.rate * this._usage
  }
}
//to
function charge(customer, usage) {
  return customer.rate * usage
}
```

如果函数不是太复杂，那么命令对象可能显得过于臃肿，就应该考虑将其变回普通的函数。

## 第七部分 处理继承关系

与任何强有力的特性一样，继承机制十分实时，却也经常被误用，而且经常等你用上一段时间，遇见了痛点，才能察觉误用所在。

1. 函数上移(Pull Up Method)
   反向重构：函数下移

```js
class Employee {}
class Saleman extends Employee {
  get name() {}
}
class Engineer extends Employee {
  get name() {}
}
//to
class Employee {
  get name() {}
}
class Saleman extends Employee {}
class Engineer extends Employee {}
```

2. 字段上移(Pull Up Field)

```java
class Employee {}
class Salesman extends Employee {
    private String name;
}
class Engineer extends Employee {
    private String name;
}
//to
class Employee {
    protected String name;
}
class Salesman extends Employee{}
class Engineer extends Employee{}
```

3. 构造函数本体上移(Pull Up Constructor Body)

```js
class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super()
    this._id = id
    this._name = name
    this._monthlyCost = mouthlyCost
  }
}
//to
class Party {
  construtor(name) {
    this._name = name
  }
}
class Employee extends Party {
  construtor(name, id, monthlyCost) {
    super(name)
    this._id = id
    this._monthlyCost = monthlyCost
  }
}
```
