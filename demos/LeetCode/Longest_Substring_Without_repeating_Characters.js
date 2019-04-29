//Given a string, find the length of the longest substring without repeating characters.
// const lengthOfLongestWithoutRepeatingSubstringOfAString = (str = '') => {
//   if (typeof str !== 'string') throw new Error('param is not string')
//   const isStringWithAllLetter = str => str.split('').every(i => /[a-zA-Z]/.test(i))
//   if (!isStringWithAllLetter(str) && str !== '') throw new Error('param is not a allLetterString')
//   if (str.length === 0) return 0
//   return str
//     .split('')
//     .reduce((acc, curr, ind) => {
//       const genArr = arr => arr.map((l, i) => arr.slice(0, i + 1))
//       const orgArr = str.split('').slice(0, ind + 1)
//       let retArr = []
//       while (orgArr.length) {
//         retArr = [...retArr, ...genArr(orgArr)]
//         orgArr.shift()
//       }
//       return [...acc, ...retArr]
//     }, [])
//     .filter(arr => arr.length === [...new Set(arr)].length)
//     .reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0)
// }

const lengthOfLongestWithoutRepeatingSubstringOfAString = s => {
  if (s === null || s === undefined) return 0
  let start = 0
  let result = 0
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    let ch = s.charAt(i)
    if (map.has(ch) && map.get(ch) >= start) {
      start = map.get(ch) + 1
    } else {
      result = Math.max(result, i - start + 1)
    }
    map.set(ch, i)
  }
  return result
}
// console.log(lengthOfLongestWithoutRepeatingSubstringOfAString('abacdaeac'))

lengthOfLongestWithoutRepeatingSubstringOfAString('abcabcbb')
export default lengthOfLongestWithoutRepeatingSubstringOfAString
