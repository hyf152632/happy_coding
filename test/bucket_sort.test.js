import bucket_sort from './../src/algorithms/bucket_sort';

describe('bucket_sort func', () => {
  test('should return [1,2,2,4,5], while param is [2, 1, 2, 5, 4]', () => {
    const originArr = [2, 1, 2, 5, 4];
    expect(bucket_sort(originArr, 5)).toEqual([1, 2, 2, 4, 5]);
  });

  test('should return [], while param is null', () => {
    expect(bucket_sort(null)).toEqual([]);
  });
});
