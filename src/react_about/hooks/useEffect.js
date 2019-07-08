import React, { Component, useEffect, useState } from 'react'

// before
class SearchResults extends Component {
  state = {
    data: null,
    currentPage: 0
  }
  componentDidMount() {
    this.fetchResults()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage || prevProps.query !== this.props.query) {
      this.fetchResults()
    }
  }
  fetchResults() {
    const url = this.getFetchUrl()
    // 获取数据
  }
  getFetchUrl() {
    return 'http://myapi/results?query' + this.props.query + '&page=' + this.state.currentPage
  }
  render() {
    // ...
  }
}

// now
function SearchResults({ query }) {
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    function fetchResults() {
      const url = getFetchUrl()
      //获取数据。。。
    }

    function getFetchUrl() {
      return 'http://myapi/results?query' + query + '&page=' + currentPage
    }
    fetchResults()
  }, [currentPage, query])

  return //...
}

// 注意，无论是将组件编写为类还是函数，都必须为 effect 响应所有 props 和 state 的更新。

// 使用 class API，你必须自己考虑一致性，并验证对每个相关 prop 或 state 的更改是否该由 componentDidUpdate 处理。否则，组件对 prop 和 state 的更改不具有弹性。
// 这甚至不是专属于 React 的问题。它适用于任何允许你单独处理 “创建” 和 “更新” 事件的 UI 库

// 不要阻断数据流！

// 无论何时使用 props 和 state，请考虑如果它们发生变化会发生什么。在大多数情况下，组件不应以不同方式处理初始渲染和更新流程。这使它能够适应逻辑上的变化。

// 对于类，在生命周期方法中使用 props 和 state 时很容易忘记更新。Hooks 推动你做正确的事情——但是如果你不习惯于这样做，它会需要一些心理调整。
