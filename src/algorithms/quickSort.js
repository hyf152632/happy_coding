/**
 * 快速排序
 * @param {array} arr 数字数组 [1,2,3]
 * @returns {array} sorted number array
 *
 * @example
 * //return [1,2,3]
 * quickSort([2,1,3])
 */
const quickSort = (arr = []) => {
  if (!Array.isArray(arr)) return []
  if (!arr.length) return []
  const isAllArrEleIsNum = arr =>
    arr.every(item => item !== null && (item === 0 || Number(item) !== NaN))
  //Number(null) === 0 true
  if (!isAllArrEleIsNum(arr)) return []

  //选取一个基数
  const criterion = Math.floor(arr.length / 2)
  const criterionEle = arr[criterion]

  //找出数组中其他小于等于基准数的
  const lesserNumArr = arr.filter((item, index) => item <= criterionEle && index !== criterion)

  //找出数组中其他大于基准数的
  const biggerNumArr = arr.filter((item, index) => item > criterionEle && index !== criterion)

  return [...quickSort(lesserNumArr), criterionEle, ...quickSort(biggerNumArr)]
}

export default quickSort
