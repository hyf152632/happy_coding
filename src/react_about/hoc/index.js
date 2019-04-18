//HOC 可以实现的功能：

//组合渲染
//可以使用任何其他组件和原组件进行组合渲染，达到样式，布局复用等效果：
function stylHOC(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <div>
          <div className="title">{this.props.title}</div>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
//通过反向继承
function styleHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      return (
        <div>
          <div className="title">{this.props.title}</div>
          {super.render()}
        </div>
      )
    }
  }
}

//条件渲染
//根据特定的属性决定原组件是否渲染
//通过属性代理实现
function visibleHOC(WrappedComponent) {
  return class extends Component {
    render() {
      if (this.props.visible === false) return null
      return <WrappedComponent {...props} />
    }
  }
}
//通过反向继承实现
function visibleHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      if (this.props.visible === false) return null
      return super.render()
    }
  }
}

//操作 props
//可以对传入组件的 props 进行增加，修改，删除或者根据特定的 props 进行特殊的操作
//通过属性代理实现
function proxyHOC(WrappedComponent) {
  return class extends Component {
    render() {
      const newProps = {
        ...this.props,
        user: 'ConardLi'
      }
      return <WrappedComponent {...newProps} />
    }
  }
}

//获取 refs
//高阶组件中可获取原组件的ref，通过ref获取组件实力，如下面的代码，当程序初始化完成后调用原组件的log方法。(不知道refs怎么用，请👇Refs & DOM)
//通过属性代理实现
function refHOC(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      this.wapperRef.log()
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          ref={ref => {
            this.wapperRef = ref
          }}
        />
      )
    }
  }
}
//这里注意：调用高阶组件的时候并不能获取到原组件的真实ref，需要手动进行传递，具体请看传递refs
