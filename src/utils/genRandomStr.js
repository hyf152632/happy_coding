const genRandomStr = (len = 5) =>
  Math.random()
    .toString(36)
    .substring(0, len)

export default genRandomStr
