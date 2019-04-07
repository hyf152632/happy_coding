# 函数注释规范

example1:

```js
/**
 * test the js document.
 * @param {string} name - js name
 * @param {string | number} flag - js flllllll
 * @returns {*} - current jsdoc
 *
 * @example
 * // returns flag
 * testJsDoc('haha', 'e');
 */
function testJsDoc(name, flag) {
  if (flag) {
    return 'flag'
  }
  return name
}

export default testJsDoc
```

example2:

```js
/**
* Book类，代表一个书本.
* @constructor
* @param {string} title - 书本的标题.
* @param {string} author - 书本的作者.
*/
functionBook(title, author){
    this.title=title;
    this.author=author;
}

//* @returns {string|*} 返回当前的书本名称

/*

* @example

* multiply(3, 2);

*/

//其他常用注释
//@overview对当前代码文件的描述。

//@copyright代码的版权信息。

//@author []代码的作者信息。

//@version当前代码的版本。

```
