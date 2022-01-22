import React, { Component } from "react";
class Search extends Component {
  render() {
    const { value, onChange, onSubmit, children } = this.props;

    return (
      //form submit事件可以接管tab提交
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={node => {
            //ES6类组件的this对象可以帮助我们通过ref属性引用DOM节点
            //然后就可以通过使用this对象，适当的生命周期方法和DOM API在组件挂载的时候来聚焦input字段
            this.input = node;
          }}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
}

export default Search;
