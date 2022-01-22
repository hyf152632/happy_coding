// https://mp.weixin.qq.com/s/JXeoEm5wEe-gUo3zq-xi-w

 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.

/*
 * get the max z-index in document
*/
function getZIndex() {
  return [...document.all].reduce(
    (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
    0,
  );
:}
