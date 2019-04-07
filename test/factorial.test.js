import factorial from './../src/algorithms/factorial'

describe('factorial func', () => {
  test('should return 1, if not provide param', () => {
    expect(factorial()).toBe(1)
  })

  test('should return 1, if param is not number', () => {
    expect(factorial(null)).toBe(1)
  })

  test('should return 1, if param is number, but less than 1', () => {
    expect(factorial(-4)).toBe(1)
  })

  test('should return 6, if param is not integer', () => {
    expect(factorial(2.8)).toBe(6)
    expect(factorial(3.4)).toBe(6)
  })

  test('should 24, if param is 4', () => {
    expect(factorial(4)).toBe(24)
  })
})
