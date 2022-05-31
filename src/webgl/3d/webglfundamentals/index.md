# sources

-[计算机科学概论](https://www.epubit.com/bookDetails?id=N35620&typeName=%E6%90%9C%E7%B4%A2)

- [基础概念](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-fundamentals.html&group=J2DqPeaM);
- [工作原理](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-how-it-works.html&group=J2DqPeaM);
- [着色器和 GLSL](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-shaders-and-glsl.html&group=J2DqPeaM);
- [图像处理](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-image-processing.html&group=J2DqPeaM);
- [进一步处理图像](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-image-processing-continued.html&group=J2DqPeaM);
- [二维矩阵](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-2d-matrices.html&group=J2DqPeaM);
- [三维正射投影](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-orthographic.html&group=J2DqPeaM);
- [三维透视投影](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-perspective.html&group=J2DqPeaM);
- [三维相机](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-camera.html&group=J2DqPeaM);
- [动画](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-animation.html&group=J2DqPeaM);
- [三维纹理](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-textures.html&group=J2DqPeaM);
- [数据纹理](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-data-textures.html&group=J2DqPeaM);
- [渲染到纹理](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-render-to-texture.html&group=J2DqPeaM);
- [三维方向光源](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-lighting-directional.html&group=J2DqPeaM);
- [三维点光源](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-lighting-point.html&group=J2DqPeaM);
- [三维聚光灯](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-3d-lighting-spot.html&group=J2DqPeaM);
- [绘制多个物体](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-drawing-multiple-things.html&group=J2DqPeaM);
- [场景图](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-scene-graph.html&group=J2DqPeaM);
- [加载 .obj 文件](https://hyp.is/go?url=https%3A%2F%2Fwebglfundamentals.org%2Fwebgl%2Flessons%2Fzh_cn%2Fwebgl-load-obj.html&group=J2DqPeaM);

```js
// 计算第一个 F 的位置
var fPosition = [radius, 0, 0]

// 计算相机在圆上的位置矩阵
var cameraMatrix = m4.yRotation(cameraAngleRadians)
cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5)

// 获得矩阵中相机的位置
var cameraPosition = [cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]]

var up = [0, 1, 0]

// 计算相机的朝向矩阵
var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up)

// 通过相机矩阵获得视图矩阵
var viewMatrix = m4.inverse(cameraMatrix)
```

相机是什么？
是观察场景的特定角度。
在实现上是应用在场景中每个模型的一个变换矩阵;

```js
/* 获取相机矩阵 */
cameraMatrix = lookAt(position, target, up)
/* 获取视图矩阵，是相机矩阵的逆 */
viewMatrix = cameraMatrix.inverse()
/* 投影矩阵 */
projectionMatrix = perspective(fieldOfViewRadians, aspect, zNear, zFar)
/* 视图投影矩阵， 投影 * 视图 */
viewProjectionMatrix = multiply(projectionMatrix, viewMatrix)
/* 物体变换应用于视图投影， 得到最终矩阵 */
// translate, rotate, scale
matrix = translate(viewProjectionMatrix, tx, 0, ty)
```

场景中模型的视图投影变换矩阵 = multiply(
视图投影矩阵,
模型变换矩阵，
)

模型变换矩阵 = multiply(
平移矩阵，
旋转矩阵，
缩放矩阵
)

视图投影矩阵 = multiply(
投影矩阵，
视图矩阵，
)

视图矩阵 = inverse(相机矩阵)

纹理：

1. 设置纹理坐标：

```js
// 找到顶点坐标中的属性
var positionLocation = gl.getAttribLocation(program, "a_position");
var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

...

// 为纹理坐标创建一个缓冲
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(texcoordLocation);

// 以浮点型格式传递纹理坐标
gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

// 设置纹理坐标
setTexcoords(gl);

// 为 F 设置纹理坐标缓冲
function setTexcoords(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // 正面左竖
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0,

        // 正面上横
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1,
        1, 0,
 // ...
       ]),
       gl.STATIC_DRAW);

```

2. 创建纹理：

以图像作为纹理时，因为图像是异步加载的，所以有两种处理方法：

- 等纹理下载完成后再开始绘制；（延迟绘制）
- 在图像加载前使用生成的纹理， 这种方式可以立即启动渲染，一旦图像下载完成就拷贝到纹理。我们将使用下方的方法。（纹理数据替换）

```js
// 创建一个纹理
var texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)

// 用 1x1 个蓝色像素填充纹理
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  1,
  1,
  0,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  new Uint8Array([0, 0, 255, 255])
)

// 异步加载图像
var image = new Image()
image.src = 'resources/f-texture.png'
image.addEventListener('load', function () {
  // 现在图像加载完成，拷贝到纹理中
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  // generates a set of mipmaps for a WebGLTexture object.
  gl.generateMipmap(gl.TEXTURE_2D)
})
```

纹理坐标：0 - 1

将像素坐标转换到纹理坐标:

texcoordX = pixelCoordX_image / (width_image - 1)
texcoordY = pixelCoordY_image / (height_image - 1)

所以纹理坐标和要应用的具体纹理是分开的。纹理坐标跟着模型走，它是说：如果给我一个纹理，我会使用纹理的哪个部分；

事实上 GPU 使用的是一个纹理贴图（mipmap），纹理贴图是一个逐渐缩小的图像集合， 每一个是前一个的四分之一大小
通常每个子图都是前一级的双线性插值，这就是 gl.generateMipmap 做的事情， 它根据原始图像创建所有的缩小级别，你也可以自己提供缩小级别的图像。

现在如果你想将 16x16 像素的纹理绘制到屏幕的 2×2 个像素上， WebGL 会从创建的贴图中找到从之前级别贴图插值出的 2×2 贴图来使用。

你可以为纹理选择不同的贴图筛选条件来控制 WebGL 的插值， 一共有这 6 种模式

1. NEAREST = 从最大的贴图中选择 1 个像素
2. LINEAR = 从最大的贴图中选择 4 个像素然后混合
3. NEAREST_MIPMAP_NEAREST = 选择最合适的贴图，然后从上面找到一个像素
4. LINEAR_MIPMAP_NEAREST = 选择最合适的贴图，然后取出 4 个像素进行混合
5. NEAREST_MIPMAP_LINEAR = 选择最合适的两个贴图，从每个上面选择 1 个像素然后混合
6. LINEAR_MIPMAP_LINEAR = 选择最合适的两个贴图，从每个上选择 4 个像素然后混合

```js
// 判断一个数是不是 2 的幂

function isPowerOf2(value) {
  return (value & (value - 1)) === 0
}
```

// 解决 webgl 加载纹理失败（图片宽和高必须是 2 的整数次幂才行）问题

```js
// 异步加载图像
var image = new Image();
image.src = "resources/keyboard.jpg";
image.addEventListener('load', function() {
  // 现在有了图像，拷贝到纹理
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

  // 检查每个维度是否是 2 的幂
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     // 是 2 的幂，一般用贴图
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // 不是 2 的幂，关闭贴图并设置包裹模式为到边缘
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
}
```

如何为立方体的每个面设置不同的图像？纹理图集（类似于前端精灵图）
：将图像放在一个纹理中，然后利用纹理坐标映射不同的图像到每个面。

直接用 js 创建纹理：

```js
// 创建一个纹理
var texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)

// 用 3x2 的像素填充纹理
const level = 0
const internalFormat = gl.LUMINANCE
const width = 3
const height = 2
const border = 0
const format = gl.LUMINANCE
const type = gl.UNSIGNED_BYTE
const data = new Uint8Array([128, 64, 128, 0, 192, 0])
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data)

// 设置筛选器，我们不需要使用贴图所以就不用筛选器了
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
```

解决 WebGL 默认使用 4 字节长度导致的错误。
我们需要告诉 WebGL 一次处理 1 个字节

```js
const alignment = 1
gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment)
// 有效参数为 1，2，4 和 8.
```

解析 .obj 数据
`f 1/1/1 5/2/1 7/3/1 3/4/1`
上面的面,包含两个三角形,每个三角形的顶点索引分别是(1, 5, 7) 和 (5, 7, 3)
文档表明 f 代表“面”或多边形，每部分数据代表了顶点、纹理座标以及法线。
如果一个索引是正数，表示从序列 1 开始的偏移。 如果索引是负数，表示从序列结尾开始的偏移。 索引的顺序是：顶点/纹理座标/法线，只有顶点是必要的。

// 通过调用 gl.createBuffer, gl.bindBuffer, gl.bufferData 为每个数组创建缓冲
const bufferInfo = webglUtils.createBufferInfoFromArrays(gl, data);
