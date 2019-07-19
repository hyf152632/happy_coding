// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0,
    timer = null
  // 将throttle处理结果当作函数返回

  return function() {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args)
    }
  }
}

// fn是我们需要包装的事件回调, interval是时间间隔的阈值
export function throttle_(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0

  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now
      fn.apply(context, args)
    }
  }
}

const throttle_new = function(fn, delay) {
  let last = 0
  let timer = null

  return function() {
    let context = this
    let args = arguments
    let now = +new Date()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

const map = (fn, arr = []) => {
  let retArr = []
  for (let i = 0; i < arr.length; i++) {
    retArr[i] = fn(arr[i], i, arr)
  }
  return retArr
}

const inc = a => a + 1
console.log(map(inc, [1, 2, 3]))

const filter = (fn, arr = []) => {
  const resArr = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      resArr.push(arr[i])
    }
  }
  return resArr
}

const isOdd = num => num % 2 !== 0

console.log(filter(isOdd, [1, 2, 3, 4]))

const reduce = (fn, initValue, arr = []) => {
  if (!Array.isArray(arr)) {
    return initValue
  }
  let ret = initValue || null
  for (let i = 0; i < arr.length; i++) {
    ret = fn(ret, arr[i], i, arr)
  }
  return ret
}

const sum = (a, b) => a + b

console.log(reduce(sum, undefined, [1, 2, 3, 4, 5]))
