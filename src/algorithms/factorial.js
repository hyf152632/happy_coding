/**
 * factorial
 * @param {number} - num
 * @returns {number}
 *
 * @example
 * factorial(3)
 * //6
 */
const factorial = (num = 1, total = 1) => {
  if (typeof num !== 'number') return 1

  if (num <= 1) return total
  num = Number.isInteger(num) ? num : Math.round(num)

  //尾递归
  return factorial(num - 1, total * num)
}

export default factorial
