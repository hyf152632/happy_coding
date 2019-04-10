/**
 * //桶排序
 * //复杂度 O(M + N)
 * //缺点空间复杂度高：例如最大值可能是10000000,需要创建一个有10000000个元素的"桶"
 * //将数组索引映射为元素
 * @param {array}arr 需要被排序的整数数组
 * @param {num}maxEle 被排序的整数，可能的最大的值
 * @returns {array} - 排序好的数组
 * @example
 * bucket_sort([2, 1, 2, 5, 4])
 * //[1, 2, 2, 4, 5]
 * */
const bucket_sort = (arr = [], maxEle = 0) => {
  if (!Array.isArray(arr)) return [];
  const isAllOfArrEleIsNum = arr => arr.every(item => typeof item === 'number');
  if (!isAllOfArrEleIsNum(arr)) return [];
  const isAllOfArrEleValid = arr => arr.every(item => item <= maxEle);
  if (!isAllOfArrEleValid(arr)) return [];
  //创建一个可以以索引作为“桶”的数组
  const bucketArr = Array.from({ length: maxEle + 1 }, () => 0);

  //将需要被排序的数组的每一个元素，映射到已经创建的桶元素上
  arr.forEach(item => (bucketArr[item] = bucketArr[item] + 1));

  return bucketArr.reduce(
    (acc, curr, index) =>
      curr === 0
        ? acc
        : [...acc, ...Array.from({ length: curr }, (item, ind) => index)],
    []
  );
};

export default bucket_sort;
