const fabnacci = n => {
  if (n < 2) {
    return n
  }
  return fabnacci(n - 1) + fabnacci(n - 2)
}
console.log(fabnacci(10))

const fabnacciIterater = (n, a = 0, b = 1) => {
  if (n < 2) {
    return b
  }
  return fabnacciIterater(n - 1, b, a + b)
}
console.log(fabnacciIterater(100))

const fabnacciCool = n => {
  const iter = (n, a = 0, b = 1) => {
    if (n < 2) {
      return b
    }
    return iter(n - 1, b, a + b)
  }
  return iter(n, 0, 1)
}

console.log(fabnacciCool(400))
