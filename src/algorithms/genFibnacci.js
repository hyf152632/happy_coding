const genFibnacci = function*() {
  let a = 0;
  let b = 0;
  while (true) {
    [a, b] = [b, a + b];
    yield a;
  }
};

export default genFibnacci;
