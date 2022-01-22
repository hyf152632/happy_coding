import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

class ChatApp extends Component {
  //note this
  state = {
    message: [],
    inputMsg: ""
  };

  handleInput = evt => {
    this.setState({
      inputMsg: evt.target.value
    });
  };

  render() {
    return (
      <>
        <input onChange={this.handleInput} />
      </>
    );
  }
}

//static propTypes and static getDerivedStateFromProps
class Comment extends PureComponent {
  //note this
  static propTypes = {
    comment: PropTypes.object.isRequired
  };

  //note this
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("get derived"); //fired on every render
    return { ...prevState, value: nextProps.value || nextProps.initalValue }; //return null express that state needn't update.
  }
  render() {
    const { author, content } = this.props.comment;

    return (
      <div className="comment-item">
        <span className="avatar" />
        <a href="#">{author}</a>
        <p>{content}</p>
      </div>
    );
  }
}

// static getDerivedStateFromProps(nextProps, prevState)
//Note that this method is fired on every render, regardless of the cause.
//组件实例化后和接受新属性时将会调用 getDerivedStateFromProps。
//它应该**返回一个对象**来更新状态，或者**返回 null**来表明新属性不需要更新任何状态。
//注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。
//如果你只想处理变化，你可能想去比较新旧值。
//调用 this.setState() 通常不会触发 getDerivedStateFromProps() 。

const ClassName = ({ value }) => {
  const opt = {
    value: "selected"
  };
  //note className
  return (
    <>
      <div className={`tab-item ${opt.value === value ? "selected" : ""}`} />
    </>
  );
};

//JSX 本身也是表达式
const element = <h1>Hello, React.</h1>;

//JSX 标记可以直接使用属性语法，例如：<Menu.Item />
//这里 Menu 就是一个普通对象，例如:

const Menu = { Item: () => <div /> };

//getSnapshotBeforeUpdate(prevProps, prevState)
//getSnapshotBeforeUpdate()在最新的渲染输出提交给 DOM**前**将会立即调用。
//它让你的组件能在当前的值可能要改变前获得它们。
//这一生命周期返回的任何值将会作为第三个参数被传递给 componentDidUpdate()。

class ScrollingList extends Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    //Are we adding new items to the list ?
    //Capture the current height of the list so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.current.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //If we have a snapshot value, we've just added new items.
    //Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.listRef.current.scrollTop +=
        this.listRef.current.scrollHeight - snapshot;
    }
  }

  render() {
    return <div ref={this.listRef}>contents</div>;
  }
}

//在上面的例子中，为了支持异步渲染，在 getSnapshotBeforeUpdate 中读取 scrollHeight 而不是 componentWillUpdate，这点很重要。
//由于异步渲染，在“渲染”时期（如 componentWillUpdate 和 render）和“提交”时期（如 getSnapshotBeforeUpdate 和 componentDidUpdate）间可能会存在延迟。
//如果一个用户在这期间做了像改变浏览器尺寸的事，从 componentWillUpdate 中读出的 scrollHeight 值将是滞后的。

//render是唯一必须定义的周期或方法

//函数子组件

//定义
const FunctionalChildrenComponent = ({ value, children }) => {
  return <>{value && children(value)}</>;
};

//使用
() => {
  return (
    <FunctionalChildrenComponent value="cat">
      {animal => (
        <img
          width="100px"
          alt="animal img."
          src={require(`./../img/${animal}.png`)}
        />
      )}
    </FunctionalChildrenComponent>
  );
};

() => {
  return (
    <FunctionalChildrenComponent value="red">
      {color => (
        <span
          style={{
            display: "inline-block",
            backgroundColor: color,
            width: "40px",
            height: "40px"
          }}
        />
      )}
    </FunctionalChildrenComponent>
  );
};

//react - redux

//connect 的工作原理： 高阶组件

// Action creator
function plusOne() {
  // action
  return { type: "PLUS_ONE" };
}

function minusOne() {
  return { type: "MINUS_ONE" };
}

//取部分地store，这样就可以只有这部分store更新的时候，渲染组件，而不是任意部分store更新，就渲染组件，可以提高性能
//mapStateToProps

function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ plusOne, minusOne }, dispatch)
}

//redux 异步 action, 中间件
//异步 action 不是特殊 action, 而是多个同步 action 的组合使用
//中间件截获 action, 做一些操作（例如发送一个 ajax, 或者 logger), 然后再返回(发出)一个 action,

// import axios from 'axios'
// import {
//   EXAMPLES_FETCH_REDDIT_LIST_BEGIN,
//   EXAMPLES_FETCH_REDDIT_LIST_SUCCESS,
//   EXAMPLES_FETCH_REDDIT_LIST_FAILURE,
//   EXAMPLES_FETCH_REDDIT_LIST_DISMISS_ERROR
// } from './constants'

export function fetchRedditList(args = {}) {
  return dispatch => {
    dispatch({
      // type: EXAMPLES_FETCH_REDDIT_LIST_BEGIN
    });

    const promise = new Promise((resolve, reject) => {
      // const doRequest = axios.get('http://www.reddit.com/r/reactjs.json')
      // axios.then(
      //   res => {
      //     dispatch({
      //       type: EXAMPLES_FETCH_REDDIT_LIST_SUCCESS,
      //       data: res.data
      //     })
      //     resolve(res)
      //   },
      //   err => {
      //     dispatch({
      //       type: EXAMPLES_FETCH_REDDIT_LIST_FAILURE,
      //       data: { error: err }
      //     })
      //     reject(err)
      //   }
      // )
    });
    return promise;
  };
}

//Jest, Enzyme 等工具的单元测试

//单元测试涉及的工具

//1. Jest: Facebook 开源的 JS 单元测试框架
//2. JS DOM: 浏览器环境的 NodeJS 模拟
//3. Enzyme: React 组件渲染和测试
//4. nock: 模拟 HTT P 请求
//5. sinon: 函数模拟和调用跟踪
//6.istanbul: 单元测试覆盖率
