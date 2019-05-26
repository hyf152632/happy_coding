const R = require('ramda')

const teams = [
  { name: 'Lions', score: 5 },
  { name: 'Tigers', score: 4 },
  { name: 'Bears', score: 6 },
  { name: 'Monkeys', score: 2 }
]

const sortByScoreDesc = R.sort((a, b) => b.score - a.score)
const getName = R.prop('name')

const getTopName = R.pipe(
  sortByScoreDesc,
  R.head,
  getName
)

// const getTopName = function(teams) {
//   //   const sorted = R.sort((a, b) => b.score - a.score, teams)
//   const sorted = sortByScoreDesc(teams)
//   const topTeam = R.head(sorted)
//   //   const topName = R.prop('name', topTeam)
//   const topName = getTopName(topTeam)
//   return topName
// }

const result = getTopName(teams)
console.log(result)
