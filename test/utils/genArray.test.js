import genArray from '@src/utils/genArray';

describe('genArray func test', () => {
  test('gen a array with 5 ele [1, 2, 3, 4, 5]', () => {
    const options = {
      howMany: 5,
      elementStyle: 'number'
    };
    const ret = genArray(options);
    expect(ret).toEqual([1, 2, 3, 4, 5]);
  });

  test('gen random string array', () => {
    const options = {
      howMany: 12
    };
    const ret = genArray(options);
    const eachEleInArrayHaveLen5 = ret.every(
      i => typeof i === 'string' && i.length === 5
    );
    expect(ret).toHaveLength(12);
    expect(eachEleInArrayHaveLen5).toBeTruthy();
  });
});
