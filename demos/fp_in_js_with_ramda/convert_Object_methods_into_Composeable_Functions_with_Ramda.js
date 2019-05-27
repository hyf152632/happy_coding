const { invoker, compose, constructN } = require('ramda')

// $('#sample')
//   .animate({ left: '250px' })
//   .animate({ left: '20px' })
//   .slideUp()

const animate = invoker(1, 'animate')
const slide = invoker(0, 'slideUp')
const jq = constructN(1, $)

const animateDiv = compose(
  slide,
  animate({ left: '20px' }),
  animate({ left: '250px' }),
  jq
)

// const div = $('#sample')

// animateDiv(div)

animateDiv('#sample')
