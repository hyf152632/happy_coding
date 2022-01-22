import React, { Component } from "react";

const DataSource = {};

function withSubscription(WrappedComponent, selectData) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      //订阅数据
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      //使用最新的数据渲染组件
      //注意此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

const CommentListWithSubscription = withSubscription(CommentList, DataSource =>
  DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

//不应该修改元组件，高阶组件应该使用组合技术，将input组件包含到容器组件中：

function logProps(WrappedComponent) {
  return class extends Component {
    componentWillReceiveProps(nextProps) {
      console.log("Current props: ", this.props);
      console.log("Next props: ", nextProps);
    }

    render() {
      //用容器组件组件包裹且不修改包裹组件，才是正确的打开方式。
      return <WrappedComponent {...this.props} />;
    }
  };
}

//高阶组件应该传递与它要实现的功能点无关的props属性。大多数高阶组件都包含一个如下的render函数
const withHoc = WrappedComponent => {
  return class extends Component {
    render() {
      //过滤掉与高阶函数功能相关的props属性，使其不再传递
      const { extraProp, ...passThroughProps } = this.props;

      //向包裹组件传递props属性, 一般都是高阶组件的state状态
      const injectedProp = "someStateOrInstanceMethod";

      return (
        <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />
      );
    }
  };
};

//大部分常见高阶组件的函数签名如下所示：

// React Redux's `connect`
const ConnectedComment = connect(
  commentSelector,
  commentActions
)(Comment);
//这是什么？！ 如果你把它剥开，你就很容易看明白到底是怎么回事了。

// connect是一个返回函数的函数（译者注：就是个高阶函数）
const enhance = connect(
  commentListSelector,
  commentListActions
);
// 返回的函数就是一个高阶组件，该高阶组件返回一个与Redux store
// 关联起来的新组件
const ConnectedComment = enhance(CommentList);

//这种形式有点让人迷惑，有点多余，但是它有一个有用的属性。那就是，类似 connect 函数返回的单参数的高阶组件有着这样的签名格式， Component => Component.输入和输出类型相同的函数是很容易组合在一起。

// 不要这样做……
const EnhancedComponent = withRouter(
  connect(commentSelector)(WrappedComponent)
);

// ……你可以使用一个功能组合工具
// compose(f, g, h) 和 (...args) => f(g(h(...args)))是一样的
const enhance = compose(
  // 这些都是单参数的高阶组件
  withRouter,
  connect(commentSelector)
);
const EnhancedComponent = enhance(WrappedComponent);

//约定：包装显示名字以便于调试
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    /* ... */
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

//注意事项：
//- 不要在render函数中使用高阶组件
//    在很少的情况下，你可能需要动态的调用高阶组件。那么你就可以在组件的构造函数或生命周期函数中调用。
//- 必须将静态方法做拷贝
//    这样做，就需要你清楚的知道都有哪些静态方法需要拷贝。你可以使用hoist - non - react - statics来帮你自动处理，它会自动拷贝所有非React的静态方法：
//
//import hoistNonReactStatic from 'hoist-non-react-statics';
//function enhance(WrappedComponent) {
//    class Enhance extends React.Component {/*...*/ }
//    hoistNonReactStatic(Enhance, WrappedComponent);
//    return Enhance;
//}
//- Refs属性不能传递
//现在我们提供一个名为 React.forwardRef 的 API 来解决这一问题（在 React 16.3 版本中）。
