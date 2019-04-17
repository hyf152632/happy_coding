import React, { Component } from 'react';

//返回一个组件，继承原组件，在 render 中调用原组件的render。
//由于继承了原组件，能通过this访问到原组件的生命周期，props，state，render等
//相比属性代理它能操作更多的属性
function withInherit(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  };
}
export default withInherit;
