const R = require('ramda')

const product = {
  name: 'widget',
  price: 10,
  shippingWeight: '2 lbs'
}

// const result = R.pick(['name', 'price'], product)

//pick will ignore unexist prop
// const getProps = R.pick(['name', 'price', 'category'])
// output : {name: 'widget', price: 10}

// const getProps = R.pickAll(['name', 'price', 'category'])
//output: {name: 'widget', price: 10, category: undefined}

// const getProps = R.pickBy(val => Number(val))
//output {price: 10}

// const getProps = R.pickBy((val, key) => R.contains('shipping', key))

const getProps = R.omit(['shippingWeight'])

const result = getProps(product)

console.log(result)
