/**
 * 翻转字符串
 * @param {string} str - 要被翻转的字符串
 *
 * @returns {string} str - 翻转之后的字符串
 */
const reverseStr = (str = '') => {
  if (typeof str !== 'string') return ''
  return [...str].reverse().join('')
}

/**
 * 是否是回文
 * @param {string} str
 * @returns {boolean}
 */
const isPlalindrome = str => {
  if (typeof str !== 'string') return false
  if (str.length <= 1) return true
  return str === reverseStr(str)
}

const Fibonacci = (n, a = 0, b = 1) => {
  if (n <= 1) return b
  return Fibonacci(n - 1, b, a + b)
}
export { reverseStr, isPlalindrome, Fibonacci }
