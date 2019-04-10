import bucket_sort from './../src/algorithms/bucket_sort';

describe('bucket_sort func', () => {
  test('should return [], ', () => {
    const originArr = [2, 1, 2, 5, 4];
    expect(bucket_sort(originArr, 5)).toEqual([1, 2, 2, 4, 5]);
  });
});
