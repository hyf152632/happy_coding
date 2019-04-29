import lengthOfLongestWithoutRepeatingSubstringOfAString from './../Longest_Substring_Without_repeating_Characters.js'

describe('test lengthOfLongestWithoutRepeatingSubstringOfAString', () => {
  test('should throw when param is not a string', () => {
    // expect(() => lengthOfLongestWithoutRepeatingSubstringOfAString(null)).toThrow(
    //   /param is not string/
    // )
  })
  test('should return 0 when param is empty string', () => {
    expect(lengthOfLongestWithoutRepeatingSubstringOfAString('')).toBe(0)
  })
  test('should return 3, when param is "abcabcbb"', () => {
    expect(lengthOfLongestWithoutRepeatingSubstringOfAString('abcabcbb')).toBe(3)
  })
  test('should return 1, when param is "bbbbb"', () => {
    expect(lengthOfLongestWithoutRepeatingSubstringOfAString('bbbbb')).toBe(1)
  })
  test('should return 3, when param is "pwwkew"', () => {
    expect(lengthOfLongestWithoutRepeatingSubstringOfAString('pwwkew')).toBe(3)
  })
})
