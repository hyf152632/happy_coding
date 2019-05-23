import R from 'ramda'

const log = msg => console.log(msg)

// Function

//__
//柯里化函数的参数占位符
const greetWithPlaceholder = R.replace('{name}', R.__, 'Hello, {name}!')
log(greetWithPlaceholder('Huo'))

const greetWithPlaceholder2 = R.replace('{name}', R.__)

log(greetWithPlaceholder2('yong')('Ok, {name}'))

//add
