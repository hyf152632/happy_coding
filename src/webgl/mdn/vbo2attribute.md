# VBO to attribute

reference:

- [mdn api vertexAttribPointer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer);

process: buffer data (3d model geometry) --> attribute(position, normal, texture coordinate);

1. bind buffer to gl.ARRAY_BUFFER;
2. use `gl.vertexAttribPointer` to spec how to cache data on a vertex index;

```js
const vbo = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW)

const locPosition = gl.getAttribLocation(shaderProgram, 'position')
gl.vertexAttribPointer(locPosition, 3, gl.FLOAT, false, 20, 0)
gl.enableVertexAttribArray(locPosition)

const locNormal = gl.getAttribLocation(shaderProgram, 'normal')
gl.vertexAttribPointer(locNormal, 4, gl.BYTE, true, 20, 12)
gl.enableVertexAttribArray(locNormal)

const locTexUV = gl.getAttribLocation(shaderProgram, 'texUV')
gl.vertexAttribPointer(locTexUV, 2, gl.UNSIGNED_SHORT, true, 20, 16)
gl.enableVertexAttribArray(locTexUV)
```
