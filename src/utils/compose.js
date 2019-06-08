// const compose = (...fns) => (...args) =>
//   fns.reduce((ret, fn, index) => (index === 0 ? fn(...ret) : fn(ret)), args)
const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
const composeRight = (...fns) => compose(...fns.reverse())

export { compose, composeRight }
