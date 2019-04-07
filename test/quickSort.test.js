import quickSort from './../src/algorithms/quickSort'
describe('quickSort func', () => {
  //undefined ---> []
  //[] -------> []
  //1 --------> []
  //[1,2,null,4] -------> []
  //[2,1,3] -------> [1,2,3]
  //[3,1,0,2, -4] -------> [-4, 0, 1, 2, 3]
  test('should return [], if not provide param', () => {
    expect(quickSort()).toEqual([])
  })
  test('should return [], if param is []', () => {
    expect(quickSort([])).toEqual([])
  })

  test('should return [], if param is not number array', () => {
    expect(quickSort(1)).toEqual([])
  })

  test('should return [], if not all param array is number', () => {
    expect(quickSort([1, 2, null, 4])).toEqual([])
  })

  test('should return [1,2,3], if param is [2,1,3]', () => {
    expect(quickSort([2, 1, 3])).toEqual([1, 2, 3])
  })

  test('should return [-4, 0, 1, 2, 3], if param is [3, 1, 0, 2, -4]', () => {
    expect(quickSort([3, 1, 0, 2, -4])).toEqual([-4, 0, 1, 2, 3])
  })
})
