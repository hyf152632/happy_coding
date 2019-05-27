const { filter, propSatisfies, lte, propEq, allPass } = require('ramda')

const cars = [
  {
    name: 'suv',
    doors: 4,
    mpg: 19
  },
  {
    name: 'sedon',
    doors: 4,
    mpg: 30
  }
]

const goodMilage = propSatisfies(lte(30), 'mpg')
const fourDoors = propEq('doors', 4)

const perfectCars = allPass([goodMilage, fourDoors])
const result = filter(perfectCars, cars)
console.log(result)
