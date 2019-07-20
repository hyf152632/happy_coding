import React from 'react'

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))

const ref = React.createRef()
<FancyButton ref={ref}>Click me!</FancyButton>


// 高阶组件中转发 refs

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props: ', prevProps)
      console.log('new props: ', this.props)
    }
    render() {
      const {forwardRef, ... rest} = this.props

      return <Component ref={forwardRef} {...rest} />
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })
}