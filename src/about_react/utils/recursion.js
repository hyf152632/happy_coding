//递归本质上是一种循环操作，所有的循环都可以用递归实现
//ES6 支持尾递归优化，
//尾递归可以将函数的调用栈减少到只有一个，防止栈溢出
//尾递归调用只在严格模式下生效

const factorial = n => {
  if (n === 1) return 1;
  return n * factorial(n - 1);
};

console.log(factorial(10));

const factorialWithTailOptimize = (n, ret = 1) => {
  if (n === 1) return ret;
  return factorialWithTailOptimize(n - 1, n * ret);
};

console.log(factorialWithTailOptimize(10));

const Fibonacci = n => {
  if (n <= 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
};

console.log(Fibonacci(20));

const FibonacciWithTailOptimize = (n, ac1 = 1, ac2 = 1) => {
  if (n <= 1) return ac2;
  return FibonacciWithTailOptimize(n - 1, ac2, ac1 + ac2);
};
console.log(FibonacciWithTailOptimize(100));

const accumulation = (starNum = 1, endNum = 100) => {
  const sum = (a, b) => a + b;
  const equalOrBiggerThanLatter = (a, b) => a >= b;
  const accumulationTwo = (a, b) => {
    if (equalOrBiggerThanLatter(a, b)) return b;
    return sum(a, accumulationTwo(a + 1, b));
  };
  return accumulationTwo(starNum, endNum);
};
console.log(accumulation(1, 100));

const oddNumAccumulation = (n = 0) => {
  if (n === 0) return 1;
  return oddNumAccumulation(n - 1) + 2;
};
