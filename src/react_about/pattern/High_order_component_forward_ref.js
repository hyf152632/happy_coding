function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old prps', prevProps);
      console.log('new props', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      //Assign the custom prop 'forwardedRef' as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  //Note the second param 'ref' proided by React.forwardRef
  //We can pass it along to  LogProps as regular prop. e.g. 'forwardedRef'
  //And it can then be attached to the Component

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  //These next lines are not necessary.
  //But they do give the component a better display bname in DevTools.
  //e.g. 'ForwardRef(logProps(MyComponet))'

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
