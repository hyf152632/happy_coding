# title

## official

React.memo

```js
const MyComponent = React.memo(function MyComponent(props) {
  /_ render using props _/;
});
```

React.memo is a higher order component. It’s similar to React.PureComponent
but for function components instead of classes.

If your function component renders the same result given the same props,
you can wrap it in a call to React.memo for a performance boost
in some cases by memoizing the result.
This means that React will skip rendering the component,
and reuse the last rendered result.

By default it will only shallowly compare complex objects in the props
object. If you want control over the comparison,
you can also provide a custom comparison function as the second argument.

```js
function MyComponent(props) {
  /*render using props */
}
function areEqual(prevProps, nextProps) {
  /*
return true if passing nextProps to render would return
the same result as passing prevProps to render,
otherwise return false
*/
}
export default React.memo(MyComponent, areEqual);
```


This method only exists as a performance optimization.
Do not rely on it to “prevent” a render, as this can lead to bugs.

Note
Unlike the shouldComponentUpdate() method on class components,
the areEqual function returns true if the props are equal and false if the props are not equal.
This is the inverse from shouldComponentUpdate.
This method only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.

Note
Unlike the shouldComponentUpdate() method on class components, the areEqual function returns true if the props are equal and false if the props are not equal. This is the inverse from shouldComponentUpdate.

