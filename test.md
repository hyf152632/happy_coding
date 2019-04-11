# test

## use [jest](https://jestjs.io/docs/zh-Hans/getting-started)

```js
expect({a:1}).toBe({a:1})//判断两个对象是否相等
expect(1).not.toBe(2)//判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one','two']).toContain('one'); //不解释

function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
}）

const expected = ['Alice', 'Bob'];
expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));

expect(arr).toHaveLength(number)  //数组长度

```

## 处理依赖

————《javascript 测试驱动开发》

如果依赖是内部的，那么就要使用一些测试替身替代它们，这些替身包括 fake, stub, mock 和 spy.

可能一个问题本身并不难，但是要考虑清楚如何对他进行自动化测试可能并不是那么容易。专注于编写测试可能会碰到很多令人困惑的问题，比如从哪里着手，要测试什么，我们实际要编写什么...如果理不清头绪，可以借助 spike 解决方案。

我们建立一个快速原型，以找出一种可行的解决方案。一旦编写的代码运行起来，并且更深入地了解了如何为这个问题编写代码，我们就能重新开始，用测试驱动开发。

代码是否具有可测试性是个设计问题，设计糟糕的代码是难以测试的。
如果可以的话，解决依赖问题的第一步应该是尽可能去除依赖。如果函数中的依赖是内部的，那么就要通过依赖注入构建松耦合的代码。你可以使用测试替身来取代真实的对象或函数。

让每个函数具有单一的职责和最少的依赖。

处理依赖的第一步就是尽可能去除被测代码中的依赖。抽取函数，并将最少量的数据作为参数传给它。

测试替身是代替真正依赖的对象，从而让自动化测试可以进行。

测试替身有不同的类型：fake, stub, mock, spy.

测试替身都是用来代替依赖， 在测试期间，被测代码会与其中一种替身进行交互，而不是与真实的依赖进行交互。

每种测试替身的用途：

- fake: 适用于测试但不能用于生产环境的实现。例如，在测试时，要与真实的信用卡服务进行交互是不切司机的，因为没有人愿意在每次运行测试时都被扣费。在测试中以一个假的服务来替代，你就能快速得知代码与该服务交互的结果，确定是否正确处理了成功和失败的情况。信用卡处理服务提供了两个服务，真的用于生产环境，假的用于测试；

- stub: 它并不是真正的实现，但被调用时可以快速返回预设数据。它能用来验证依赖(stub)返回(预设的)结果后代码的行为。另外，它也能用于验证被测试代码是否正确更新了依赖对象的状态。为一个依赖创建一个大规模的 stub 并不是一个好的选择。在需要的地方定制一个 stub 以便让测试通过，不要在每个测试中都创建一个小的 stub

- mock: 与 stub 类似， mock 也可以返回预设数据。但它对 **交互** 进行跟踪，如调用次数，调用的顺序。mock 可以测试交互，帮助验证被测代码和依赖之间的交互。

- spy: 与其他 3 种不同，spy 可以代理真实的依赖。在硬编码或者选中部分进行模拟的同时，spy 还可以与真实的服务进行交互。当在测试期间与真实的服务交互，而我们又想对交互进行验证或者对选择的部分进行模拟时，spy 是很有用的。

stub 可用于验证状态， mock 可用于验证行为。换句话说，如果你想要被测试代码是否为它的依赖对象设置了正确的状态，那么就可以使用 stub. 如果你想要验证被测代码是否以正确的顺序对它的依赖对象调用了正确的方法，那么就可以使用 mock.

依赖注入是用测试替身代替依赖的一种流行，通用的技术。
就是依赖在调用时作为参数传递。

### 经验测试(expirical test)

调用同步函数或异步函数， 然后验证它是否返回预期值。

stub:

```js
//例如，我们现在有一个 setLocation 函数，
//用来设置 window 对象的 location 属性值
// 如果为 window 对象注入(即传递)一个 stub, 那么原本很复杂的测试就会变得比较简单了。
describe('setLocation test', () => {
  it('should set the URL into location fo window', () => {
    const windowStub = {};
    const url = 'http://example.com';
    setLocation(windowStub, url);

    expect(windowStub.location).to.be.eql(url);
  });
});

//依赖注入对象的 windowStub 是一个 stub, 而不是 mock, 这是因为测试想要知道调用被测函数后这个依赖对象的状态。
```

这个实例很好的向我们展示了 **将依赖外部化** 所带来的好处。在生产环境中，可以向目标函数传递真正的函数或对象以供它使用；在测试环境中，可以提供测试替身，这就是依赖注入实战。

深层依赖很难因为测试的目的而被替代。考虑将需要的函数或对象作为参数传递，而不是直接创建一个依赖对象或从全局引用获取。

### 交互测试

当涉及依赖，并且很难预测结果。

函数的测试关注的是函数的行为，而不是该函数的依赖对象是否正确。
就验证被测函数的行为来说，检查代码能够以正确的方式与依赖对象进行交互就足够了。

如果结果是确定的，可预测的，而且很容易断定，那么就使用经验测试。
如果代码有很复杂的依赖关系，而且依赖让代码不确定，难以预测，脆弱或耗时，那么就使用交互测试。

```js
//getCurrentPosition
describe('locate test', () => {
  it('should register handlers with getCurrentPosition', done => {
    const original = navigator.geolocation.getCurrentPosition;

    navigator.geolocation.getCurrentPosition = function(success, error) {
      expect(success).to.be.eql(onSuccess);
      expect(error).to.be.eql(onError);
      done();
    };

    locate();

    navigator.geolocation.getCurrentPosition = original;
  });
});

//我们在测试 setLocation 函数时注入了依赖。这里也可以这么做，但是没这个必要。 locate 函数从 window对象的navigator对象的geolocation属性得到getCurrentPosition函数。与window对象的location属性不同，navigator的属性更容易模拟。
//我们在这个测试中就是这么做的，我们复制了原始的getCurrentPosition函数，然后用模拟的函数代替了它。最后，我们又用原本的函数替换了geolocation中的函数

// 我们看到了如何测试 locate 与其依赖之间的交互， 而不是让 locate 函数调用真正的 getCurrentPosition 函数并检查返回的结果。这种方法的好处就是让测试变得快速，而且可预测。此外，我们不用处理是否允许浏览器获取用户位置的问题
```

这里有一个问题是，开始测试时使用了一个模拟函数代替真正的函数，但最后又替换回来。这么做不但冗余，而且容易出错。接下来我们就要看看非常流行的 mock 框架 Sinon 是如何完美地解决这个问题的。

第一步：创建 sandbox

```js
let sandbox;

beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  sandbox.restore();
});

//use:
const aSpy = sandbox.spy(existingFunction);

expect(aSpy.called).to.be.true;

expect(aSpy).called;

expect(aSpy).to.have.been.calledWith('magic');

const aStub = sandbox
  .stub(util, 'alias')
  .withArgs('Robert')
  .returns('Bob');

const aMock = sandbox
  .mock(util)
  .expects('alias')
  .withArgs('Robert');
```

beforeEach 和 afterEach 这样的“三明治”方法，可能有多个测试套件会用到这两个函数，所以我们不要将它们放在某个特定的测试套件中，而是在一个独立于所有测试套件的外部文件中编写。

mock:

```js
describe('locate test', () => {
  it('should register handlers  with getCurrentPosition', () => {
    const getCurrentPositionMock = sandbox
      .mock(navigator.geolocation)
      .expects('getCurrentPosition')
      .withArgs(onSuccess, onError);
    locate();

    getCurrentPositionMock.verify();
  });
});
```

stub 用来测试状态， mock 更适合用来测试交互或行为。

stub:

```js
const onError = error =>
  (document.getElementById('error').innerHTML = error.message);

describe('onError test', () => {
  it('should set the error DOM element', () => {
    const domElement = { innerHTML: '' };
    sandbox
      .stub(document, 'getElementById')
      .withArgs('error')
      .returns(domElement);

    const message = "you're kidding";
    const positionError = { message };

    onError(positionError);

    expect(domElement.innerHTML).to.be.eql(message);
  });
});
```

spy:

```js
const onSuccess = position => {
  const { latitude, longitude } = position.coords;

  const url = createURL(latitude, longitude);
  setLocation(window, url);
};

describe('onSuccess test', () => {
  it('should call createURL with latitude and longitude', () => {
    const createURLSpy = sandbox.spy(window, 'createURL');
    const position = { coords: { latitude: 40.41, longitude: -105.55 } };

    onSuccess(position);

    expect(createURLSpy).to.have.been.calledWith(40.41, -105.55);
  });
});

//在这个测试中， 我们首先为 createURL 函数创建一个 spy.
//这个 spy 只拦截和记录传给真正函数的参数。它不会阻塞或者绕过该调用。真正的函数仍然会执行。
```

```js
it('should call setLocation with URL, returned by createURL', () => {
  const url = 'http://www.example.com';

  sandbox.stub(window, 'createURL').returns(url);

  const setLocationSpy = sandbox.spy(window, 'setLocation');

  const position = { coords: { latitude: 40.41, longitude: -105.55 } };
  onSuccess(position);

  expect(setLocationSpy).to.have.been.calledWith(window, url);
});
```

自动化测试有助于创造良好的设计， 良好的设计让代码更易于测试。

自动化而是带来了模块化，高内聚，松耦合和更清晰的设计。

快速反馈等于巨大的信心和灵活性。

## 良好的设计有利于自动化测试

不好的设计:

- 长函数
- 一段代码做很多事
- 代码依赖过多
- 代码直接依赖第三方代码
- 代码重复
- 代码具有不必要的复杂性

良好的设计带来的好处:

- 代码很灵活. 通过高内聚和模块化的函数，我们能够轻松的构建其他函数
- 每个函数都很简短(只做一件事)
- 代码松耦合
- 高测试覆盖率

虽然有很多方法可以改善设计，但良好的自动化测试必然能促进良好的设计。

自动化测试时达到目的的一种手段。真正的目标是开发高度可维护的，有价值的软件，从而能够放心，快速地对其进行修改。

架构和决策设计几个关键准则：可伸缩性，可靠性，可扩展性，安全性，性能等。

## test react

[react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet)
