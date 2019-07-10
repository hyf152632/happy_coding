interface Person {
  name: string
  age: number
}

function sortByName(a: Person[]) {
  var result = a.slice(0)
  result.sort((x, y) => x.name.localeCompare(y.name))
}
sortByName([])
