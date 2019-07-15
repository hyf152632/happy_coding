import {
  test,
  complement,
  allPass,
  filter,
  pipe,
  match,
  tail,
  map,
  split,
  slice,
  prepend,
  join,
  lens,
  last,
  flip,
  useWith,
  head,
  lensIndex,
  into,
  take,
  compose,
  add
} from 'ramda'

const data = [
  '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1"',
  '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -'
]

// Say we are interested in preparing a list of pages visited by IP address, filtered from a log file that includes extra cruft that we don't care about.

// We want to skip all requests to static resources and print only the IP address and the URL visited.

// 127.0.0.5 visited https://simplectic.com/blog/
// 127.0.0.1 visited https://simplectic.com/

const isGet = test(/GET \//)
const notStatic = complement(test(/GET \/static/))
const isPage = allPass([isGet, notStatic])

const result = filter(isPage, data)

console.dir(result)

const splitLine = pipe(
  match(/^(\S+).+"([^"]+)"/),
  tail
)

const ret = map(splitLine, result)

console.dir(ret)

const toURL = pipe(
  split(' '),
  slice(1, 2),
  prepend('https://simplectic.com'),
  join('')
)

const urlWithDomain = map(toURL, ['GET /blog/ HTTP/1.1', 'GET / HTTP/1.1'])

console.dir(urlWithDomain)

const valueLens = lensIndex(1)
// const valueLens = lens(last, flip(useWith(Array, head)))

// const valueToUrl = valueLens.map(toURL)

// const ret2 = map(valueToUrl, ['GET /blog/ HTTP/1.1', 'GET / HTTP/1.1'])

const intoArray = into([])
const transducer = compose(
  map(add(1)),
  take(2)
)
const numbers = [1, 2, 3, 4]

console.log(intoArray(transducer, numbers))

// Many functions in Ramda, including filter and map can act as a transducer if executed in the right context, such as R.into. The first argument to into is the output, the second defines a transformation to execute, and the third argument is the input source.
