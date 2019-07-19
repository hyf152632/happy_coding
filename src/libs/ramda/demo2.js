import {
  otherwise,
  then,
  compose,
  pick,
  filter,
  isEmpty,
  where,
  equals,
  or,
  isNil,
  find,
  tryCatch,
  __,
  identity,
  prop,
  propOr,
  defaultTo,
  map,
  always
} from 'ramda'

const fetch = id =>
  Promise.reject({
    id,
    name: 'andy',
    gender: 'man',
    age: 26
  })
const fake_fetch_user = id => fetch(id)

const getUserNameByUserId = compose(
  otherwise({ name: 'huo', age: 32 }),
  then(pick(['name', 'age'])),
  fake_fetch_user
)

// loadsh
// const validUserNameBuzz = users =>
//   _.filter(users, user => user.name === 'Buzz' && _.isEmpty(user.errors))

// ramda
const validUserNameBuzz = filter(
  where({
    name: equals('Buzz'),
    errors: or(isNil, isEmpty)
  })
)

const users = [
  {
    name: 'uu',
    errors: 'error'
  },
  {
    name: 'Buzz',
    errors: null
  },
  {
    name: 'Buzz',
    errors: undefined
  },
  {
    name: 'Buzz',
    errors: ''
  }
]
console.log(validUserNameBuzz(users))

// why curry

// orign data
// {
//     "user": "hughfdjackson",
//     "posts": [
//         { "title": "why curry?", "contents": "..." },
//         { "title": "prototypes: the short(est possible) story", "contents": "..." }
//     ]
// }

// no curry

// fetchFromServer()
//   .then(JSON.parse)
//   .then(function(data) {
//     return data.posts
//   })
//   .then(function(posts) {
//     return posts.map(function(post) {
//       return post.title
//     })
//   })

// curry

// fetchFromServer()
//   .then(JSON.parse)
//   .then(get('posts'))
//   .then(map(get('title')))

const userInfo = {
  user: 'hughfdjackson',
  posts: [
    { title: 'why curry?', contents: '...' },
    { title: 'prototypes: the short(est possible) story', contents: '...' }
  ]
}

const fetchUserInfo = () => Promise.resolve(userInfo)

const parseData = data => {
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
const getPosts = prop('posts')
const getTitle = propOr(defaultTo('title'), 'title')
const getPostTitle = compose(
  then(console.log),
  then(map(getTitle)),
  then(getPosts),
  then(parseData),
  fetchUserInfo
)

console.log(getPostTitle())
