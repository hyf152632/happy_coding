const compose = (...fns) => (...args) =>
  fns.reduce((ret, fn, index) => (index === 0 ? fn(...ret) : fn(ret)), args)

export default compose
