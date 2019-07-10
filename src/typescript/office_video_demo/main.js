function sortByName(a = []) {
  if (!Array.isArray(a)) {
    throw new Error('sortByName func need array type param')
  }
  return [...a].sort((x, y) => x.name.localCompare(y.name))
}
