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

```js
// 计算第一个 F 的位置
var fPosition = [radius, 0, 0];

// 计算相机在圆上的位置矩阵
var cameraMatrix = m4.yRotation(cameraAngleRadians);
cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);

// 获得矩阵中相机的位置
var cameraPosition = [cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]];

var up = [0, 1, 0];

// 计算相机的朝向矩阵
var cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);

// 通过相机矩阵获得视图矩阵
var viewMatrix = m4.inverse(cameraMatrix);
```

相机是什么？
是观察场景的特定角度。
在实现上是应用在场景中每个模型的一个变换矩阵;

```js
/* 获取相机矩阵 */
cameraMatrix = lookAt(position, target, up);
/* 获取视图矩阵，是相机矩阵的逆 */
viewMatrix = cameraMatrix.inverse();
/* 投影矩阵 */
projectionMatrix = perspective(fieldOfViewRadians, aspect, zNear, zFar);
/* 视图投影矩阵， 投影 * 视图 */
viewProjectionMatrix = multiply(projectionMatrix, viewMatrix);
/* 物体变换应用于视图投影， 得到最终矩阵 */
// translate, rotate, scale
matrix = translate(viewProjectionMatrix, tx, 0, ty);
```

场景中模型变换的最终矩阵 = multiply(
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
