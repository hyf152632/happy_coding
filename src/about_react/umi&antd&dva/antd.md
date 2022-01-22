# title

```js
renderMenuItem = (menuList = []) => {
  const hasChildren = item => !!item.children;
  const getItem = item => {
    if (!hasChildren(item)) {
      return <Item key={item.value}>{item.label}</Item>;
    }
    return (
      <SubMenu title={item.label} key={item.value}>
        {this.renderMenuItem(item.children)}
      </SubMenu>
    );
  };
  return menuList.map(getItem);
};
```
