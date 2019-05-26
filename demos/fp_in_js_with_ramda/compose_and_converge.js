import R from 'ramda'

const person = {
  id: 1,
  name: 'Joe'
}

const generateUrl = id => `https://img.socialnetwork.com/avatar/${id}.png`

const getUrlFromPerson = R.compose(
  generateUrl,
  R.propOr('default', 'id')
)

// const getUpdatePerson = person => R.assoc('avatar', getUrlFromPerson(person), person)

const getUpdatePerson = R.converge(R.assoc('avatar'), [getUrlFromPerson, R.identity])

const result = getUpdatePerson(person)

console.log(result)
