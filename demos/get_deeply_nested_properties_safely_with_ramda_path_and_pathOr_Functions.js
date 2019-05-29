const { path, pathOr } = require('ramda')
const acctDept = {
  name: 'Accounts Payable',
  location: '14th floor',
  personnel: {
    manager: {
      fName: 'Bill',
      lName: 'Bumberg',
      title: 'director of stuff and things',
      salary: 6434534
    }
  }
}

const itDept = {
  name: 'IT',
  locaton: 'remote',
  personnel: {}
}

// const getMarLast = path(['personnel', 'manager', 'lName'])

const getMarLast = pathOr('nobody', ['personnel', 'manager', 'lName'])

const result = itDept.personnel & itDept.presonnel.manager && itDept.personnel.manager.lName

console.log(result)
