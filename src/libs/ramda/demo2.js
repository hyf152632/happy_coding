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
  propEq,
  defaultTo,
  map,
  always,
  modulo,
  add,
  T,
  sortBy,
  countBy,
  toPairs,
  nth,
  descend,
  reverse
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

// reuse ramda expression
const amtAdd1Mod7 = compose(
  modulo(__, 7),
  add(1),
  prop('amount')
)

console.log(amtAdd1Mod7({ amount: 68 }))

const amoutObjects = [{ amount: 903 }, { amount: 23535 }, { amount: 6 }]
console.log(map(amtAdd1Mod7, amoutObjects))

const server_data = {
  result: 'SUCCESS',
  interfaceVersion: '1.0.3',
  requested: '10/17/2013 15:31:20',
  lastUpdated: '10/16/2013 10:52:39',
  tasks: [
    {
      id: 104,
      complete: false,
      priority: 'high',
      dueDate: '2013-11-29',
      username: 'Scott',
      title: 'Do something',
      created: '9/22/2013'
    },
    {
      id: 105,
      complete: false,
      priority: 'medium',
      dueDate: '2013-11-22',
      username: 'Lena',
      title: 'Do something else',
      created: '9/22/2013'
    },
    {
      id: 107,
      complete: true,
      priority: 'high',
      dueDate: '2013-11-22',
      username: 'Mike',
      title: 'Fix the foo',
      created: '9/22/2013'
    },
    {
      id: 108,
      complete: false,
      priority: 'low',
      dueDate: '2013-11-15',
      username: 'Punam',
      title: 'Adjust the bar',
      created: '9/25/2013'
    },
    {
      id: 110,
      complete: false,
      priority: 'medium',
      dueDate: '2013-11-15',
      username: 'Scott',
      title: 'Rename everything',
      created: '10/2/2013'
    },
    {
      id: 112,
      complete: true,
      priority: 'high',
      dueDate: '2013-11-27',
      username: 'Lena',
      title: 'Alter all quuxes',
      created: '10/5/2013'
    }
    // , ...
  ]
}

// 我们需要一个函数 getIncompleteTaskSummaries，接受成员名字（memebername）为参数，然后从服务器（或其他地方）获取数据，挑选出该成员未完成的任务，返回它们的 id、优先级、标题和到期日期，并按到期日期排序。实际上，它返回一个用来解析出这个有序列表的 Promise。

// 如果向 getIncompleteTaskSummaries 传入 "Scott"，它可能会返回：

// [
//     {id: 110, title: "Rename everything",
//         dueDate: "2013-11-15", priority: "medium"},
//     {id: 104, title: "Do something",
//         dueDate: "2013-11-29", priority: "high"}
// ]

const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(server_data)
    }, 1000)
  })

const getIncompleteTaskSummaries = membername => {
  return (
    fetchData()
      .then(prop('tasks'))
      .then(
        filter(
          where({
            username: equals(membername),
            complete: T
          })
        )
      )
      .then(map(pick(['id', 'dueDate', 'title', 'priority'])))
      .then(sortBy(prop('dueDate')))
      // .then(console.log)
      .catch(console.log)
  )
}
getIncompleteTaskSummaries('Scott')

const getIncompleteTaskSummariesByRamda = membername =>
  compose(
    otherwise(console.log),
    then(console.log),
    then(sortBy(prop('dueDate'))),
    then(map(pick(['id', 'dueDate', 'title', 'priority']))),
    then(
      filter(
        where({
          username: equals(membername),
          complete: T
        })
      )
    ),
    then(prop('tasks')),
    fetchData
  )()
getIncompleteTaskSummariesByRamda('Scott')

// why curry is useful?
// : code reUse
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
console.log(objects.map(o => o.id))

const getId = prop('id')
const mapObjToId = map(getId)
console.log(mapObjToId(objects))

const otherArrWithObjId = [
  {
    name: 'a',
    id: 4
  },
  {
    name: 'b',
    id: 5
  },
  {
    name: 'c',
    id: 6
  }
]
console.log(mapObjToId(otherArrWithObjId))

const origin_str = 'ksdjfoeqownjsqrehafjkdjskf'
const getLetterCountObj = countBy(identity)
const getStrMaxCountLetter = (str = '') => {
  if (typeof str !== 'string') return 0
  if (!str.length) return 0

  return compose(
    nth(1),
    nth(0),
    reverse,
    sortBy(prop(1)),
    toPairs,
    getLetterCountObj
  )(str)
}

console.log(getStrMaxCountLetter(origin_str))
