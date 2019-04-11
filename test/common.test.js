import { reverseStr, isPlalindrome, Fibonacci } from './../src/algorithms/common'

describe('reverseStr func', () => {
  test('should reverse string', () => {
    expect(reverseStr('Hello World!')).toBe('!dlroW olleH')
  })
})

describe('isPlalindrome func', () => {
  test('should return false, if not provide param', () => {
    expect(isPlalindrome()).toBeFalsy()
  })

  test('should return true, if param is a', () => {
    expect(isPlalindrome('a')).toBeTruthy()
  })

  test('should return true, if param is aba', () => {
    expect(isPlalindrome('aba')).toBeTruthy()
  })
})

describe('Fibonacci', () => {
  test('should return 1, if param is 1', () => {
    expect(Fibonacci(1)).toBe(1)
  })

  test('should return 1, if param is 2', () => {
    expect(Fibonacci(2)).toBe(1)
  })

  test('should return 2, if param is 3', () => {
    expect(Fibonacci(3)).toBe(2)
  })

  test('should return 55, if param is 10', () => {
    expect(Fibonacci(10)).toBe(55)
  })

  test('canary test', () => {
    expect(true).toBeTruthy()
  })
})
