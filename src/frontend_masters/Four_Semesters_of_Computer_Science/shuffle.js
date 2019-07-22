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

export default shuffle
