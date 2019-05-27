const R = require('ramda')
const { zip, fromPairs, compose, zipObj } = R
const getName = () => Promise.resolve('Andrew')

const getHobbies = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(['kayaking', 'woodworking', 'screencasting']), 500)
  })

Promise.all([getName(), getHobbies()])
  .then(([name, hobbies]) => ({ name, hobbies }))
  .then(console.log)

Promise.all([getName(), getHobbies()])
  .then(
    compose(
      fromPairs,
      zip(['name', 'hobbies'])
    )
  )
  .then(console.log)

Promise.all([getName(), getHobbies()])
  .then(zipObj(['name', 'hobbies']))
  .then(console.log)
