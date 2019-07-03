// get modal number
const getModalNumber = (arr = []) =>
  Object.entries(
    arr.reduce(
      (acc, curr) =>
        acc[curr]
          ? Object.assign({}, acc, { [curr]: acc[curr] + 1 })
          : Object.assign({}, acc, { [curr]: 1 }),
      {}
    )
  ).filter(([key, val], ind, arr) => Math.max(...arr.map(([_, v]) => v)) === val)[0][0]

console.log(getModalNumber([1, 2, 3, 3, 4]))
