//现在，常见的一个需求是多处代码都要从 API 获取数据，但我们并不想复制代码
//要想从组件中移除数据逻辑并在整个应用中复用，其中一个解决方案就是创建高阶组件。
//在本实例中，高阶组件会代替增强后的组件来加载数据，然后以 prop 的形式向子组件提供数据。
//
//我们已经知道，高阶组件其实就是函数，它接受组件和一些其他参数，然后返回添加了某些特殊行为的新组件。
import React, { Component } from "react";
import PropTypes from "prop-types";

const withData = url => wrapperComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = { data: [] };
    }
    componentDidMount() {
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }
    render() {
      return <wrapperComponent {...this.props} {...this.state} />;
    }
  };
};

export default withData;

const List = ({ data: gists }) => (
  <ul>
    {gists.map(gist => (
      <li key={gist.id}>{gist.description}</li>
    ))}
  </ul>
);

List.propTypes = {
  data: PropTypes.array
};

//得益于偏函数写法，我们可以先定制高阶组件来发起特定请求，然后再多次复用它。
const url = "https://api.github.com/users/gaearon/gists";
const withGists = withData(url);

const ListwithGists = withGists(List);

//
//高阶组件 withData 很棒，但 \*\* 只能加载静态 URL, 而真实的 URL 通常取决于参数或 prop。
//遗憾的是，在使用高阶组件时 prop 是未知的，因此在发起 API 请求前，一旦获取 prop 就需要触发某个钩子函数。
//可以修改高阶组件，让它接收两种类型的 URL 参数：一种是当前的字符串类型，另一种是函数，它接受组件的 prop 并根据传入的参数返回 URL
//实现这一点，只需要修改 componentDidMount 钩子即可：

// componentDidMount() {
//   const endpoint = typeof url === 'function' ? url(this.props) : url
//   fetch(endpoint).then(response => response.json()).then(data => this.setState({data}))
// }

//现在可以按照如下方式使用这个高阶组件
// const withGist = withData(props => `https://api.github.com/users/${props.username}/gists`)

//可以在组件的 prop 中设置 username 参数，用于加载 gist

// <ListwithGists username='gaearon' />
