import compose from '@src/utils/compose';

describe('test compose func', () => {
  test('only one fun', () => {
    const map = a => a;
    expect(compose(map)(1)).toBe(1);
  });
  test('5 and 2 and 3, return 10', () => {
    const add = (a, b) => a + b;
    const add2 = add.bind(null, 2);
    const add3 = add.bind(null, 3);
    expect(
      compose(
        add2,
        add3
      )(5)
    ).toBe(10);
  });
  test('first fun can accept multi params', () => {
    const add = (a, b) => a + b;
    const add2 = add.bind(null, 2);
    const add3 = add.bind(null, 3);
    expect(
      compose(
        add,
        add2,
        add3
      )(2, 3)
    ).toBe(10);
  });
});
