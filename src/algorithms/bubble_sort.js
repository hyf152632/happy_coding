/**
 * 如果有 n 个数进行排序，只需将 n1 个数归位，也就是说要进行 n-1 趟操作。而“每一趟”都需要从第 1 位开始进行相邻两个数的比较，将较小的一个数放 在后面，比较完毕后向后挪一位继续比较下面两个相邻数的大小，重复此步骤，直到后一
 *个尚未归位的数，已经归位的数则无需再进行比较
 *冒泡排序的基本思想是：每次比较两个相邻的元素，如果它们的顺序错误就把它们交换 过来。
 * 冒泡排序
 * bubble_sort
 * @param {array} numArr - 需要被排序的数组
 * @param {string} order - 排序方式： asc (ascending order) 升序 | desc (descending order) 降序
 *
 * @example
 * bubble_sort([2,1,3,4])
 * //[1,2,3,4]
 */
const bubble_sort = (numArr, order = 'asc') => {
  if (!Array.isArray(numArr)) return [];
  const isAllNum = arr => arr.every(item => typeof item === 'number');
  if (!isAllNum(numArr)) return [];

  const isASC = order === 'asc';
  const isBigger = (num1, num2) => num1 > num2;
  const exchange = (arr, i, j) => {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  };

  for (let i = 0; i <= numArr.length - 1; i++) {
    for (let j = 1; j < numArr.length - i; j++) {
      if (isASC) {
        isBigger(numArr[j], numArr[j + 1]) ? exchange(numArr, j, j + 1) : null;
      } else {
        isBigger(numArr[j + 1], numArr[j]) ? exchange(numArr, j, j + 1) : null;
      }
    }
  }

  return numArr;
};

export default bubble_sort;
