//[我接触过的前端数据结构与算法]https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226680&idx=1&sn=2b6eb47e75b75a70ca13070542d54a33&chksm=bd495bbc8a3ed2aa9281eb720cad55dbfbf2cf0bc34f7f98871ea604f7c23d3f9f6dda9c006d&scene=21#wechat_redirect
//https://zhuanlan.zhihu.com/p/27659059

//1.递归

//假设现在有一堆数据要处理，要实现上一次请求完成了，才能去调下一个请求。一个是可以用Promise，就像《前端与SQL》这篇文章里面提到的。但是有时候并不想引入Promise，能简单处理先简单处理。

var ids = [34112, 98325, 68125]
;(function sendRequest() {
  var id = ids.shift()
  if (id) {
    $.ajax({ url: '/get', data: { id } }).always(function() {
      //do sth.
      console.log('finished')
      sendRequest()
    })
  } else {
    console.log('finished')
  }
})()

//edit:
;(function sendRequest(ids) {
  if (!ids.length) {
    console.log('finished')
  }
  const [id, ...rest] = ids
  $.ajax({ url: '/get', data: { id } }).always(function() {
    //do sth.
    console.log('finished')
    sendRequest(rest)
  })
})(ids)

//用递归实现一个查DOM的功能document.getElementById。
const getElementById = (node, id) => {
  if (!node) return null
  if (node.id === id) return node
  if (!node.childNodes.length) return null
  node.childNodes.forEach(item => {
    const found = getElementById(item, id)
    if (found) return found
  })
  return null
}

//非递归实现

const getByElementId = (node, id) => {
  while (node) {
    if (node.id === id) return node
    node = nextElement(node)
  }
  return null
}

function nextElement(node) {
  if (node.children.length) {
    return node.children[0]
  }
  if (node.nextElementSibling) {
    return node.nextElementSibling
  }
  while (node.parentNode) {
    if (node.parentNode.nextElementSibling) {
      return node.parentNode.nextElementSibling
    }
    node = node.parentNode
  }
  return null
}

const lastHouses = new Set()
function filterHouse(houses) {
  var remainsHouses = [],
    newHouses = []
  houses.map(house =>
    lastHouses.has(house.id) ? remainsHouses.push(house) : newHouses.push(house)
  )
  newHouses.map(house => lastHouses.add(house.id))
  return { remainsHouses, newHouses }
}

var lastHouses = new Map()
function filterHouse(houses) {
  var remainsHouses = [],
    newHouses = []
  houses.map(house =>
    lastHouses.has(house.id) ? remainsHouses.push(house) : newHouses.push(house)
  )
  newHouses.map(house => lastHouses.set(house.id, house))
  return { remainsHouses, newHouses }
}

//算法和数据结构是一个永恒的话题，它的目的是用最小的时间和最小的空间解决问题。
//但是有时候不用太拘泥于一定要最优的答案，能够合适地解决问题就是好方法，而且对于不同的应用场景可能要采取不同的策略。
//反之，如果你的代码里面动不动就是三四重循环，还有嵌套了很多if-else，你可能要考虑下采用合适的数据结构和算法去优化你的代码。
