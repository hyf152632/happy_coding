/**
 * shuffle function
 * shuffle a array
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // maybe output: [2, 5, 3, 1, 4]
 * @param {array} arr - should be shuffled arr
 * @return {array}
 */
const shuffle = (arr = []) => {
  const randomRangeNum = (start, end) => Math.floor(Math.random() * (end - start + 1))
  const temp_arr = [...arr]
  for (let i = 0; i < temp_arr.length; i++) {
    let r = randomRangeNum(0, i)
    ;[temp_arr[i], temp_arr[r]] = [temp_arr[r], temp_arr[i]]
  }
  return temp_arr
}

/**
 * merge sort funtion
 * @param {number[]} origin_arr - the number array should be sorted
 * @return {number[]}
 */
const merge_sort = (origin_arr = [], isInit = true) => {
  if (!Array.isArray(origin_arr)) {
    return []
  }
  let arr = isInit ? shuffle(origin_arr) : origin_arr

  if (arr && arr.length <= 1) {
    return arr
  }

  const pivot = arr[arr.length - 1]
  arr.pop()

  const smaller = (arr, ele) => arr.filter(i => i <= ele)
  const bigger = (arr, ele) => arr.filter(i => i > ele)
  return [...merge_sort(smaller(arr, pivot)), pivot, ...merge_sort(bigger(arr, pivot))]
}

export default merge_sort
