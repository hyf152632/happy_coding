# webgl content on mdn

uniform 保存在一帧渲染中保持不变的值

变换矩阵
4x4 方阵
16 个值的数组
表示空间中对象的变换

单位矩阵

为了使三维空间中的点和一个 4x4 矩阵匹配，加上了额外的第四维 W.

变换矩阵 \* 点的位置 = 变换之后的位置；
(确定旋转矩阵的公式: 已知点的位置，变换之后的位置，求变换矩阵)

给特定的形式赋予特定的意义。解读。解码。

矩阵 \* 点
矩阵 \* 矩阵

平移矩阵

`DOMElement.style.transform = matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 100, 0, 1);`

缩放矩阵

旋转矩阵
三角函数

矩阵组合
连乘
可逆

```js
// 可逆的
var transformMatrix = MDN.multiplyArrayOfMatrices([
  scale(1.25, 1.25, 1.25), // 第 6 步：放大
  translate(0, -200, 0), // 第 5 步：上移
  rotateAroundZAxis(-Math.PI * 0.5), // 第 4 步：倒转
  rotateAroundZAxis(Math.PI * 0.5), // 第 3 步：旋转 90 度
  translate(0, 200, 0), // 第 2 步：下移 100 像素
  scale(0.8, 0.8, 0.8), // 第 1 步：缩小
])
```

不可交换

矩阵相乘需要和变换发生的顺序相反

为什么矩阵这么重要？
矩阵之所以**重要**，是因为它可以用少量的数字描述大量的**空间中的变换**，并且能轻易地在程序间共享。矩阵可以不同的坐标空间，甚至一些矩阵乘法可以将一组数据从一个坐标空间映射到另一个坐标空间。矩阵能够高效率地保存生成它们的每一步变换。

对于在 WebGL 中使用，显卡尤其擅长大量的点乘矩阵运算。各种各样的运算，如点定位、光线运算、动态角色，都依赖这个基础工具。

status1 --> map --> status2

模型，视图，投影矩阵

WebGL 空间中的点和多边形的个体转化由基本的转换矩阵（例如平移，缩放和旋转）处理。可以将这些矩阵组合在一起并以特殊方式分组，以使其用于渲染复杂的 3D 场景。这些组合成的矩阵最终将原始数据类型移动到一个称为**裁剪空间**的特殊坐标空间中。这是一个中心点位于 (0, 0, 0)，角落范围在 (-1, -1, -1) 到 (1, 1, 1) 之间，2 个单位宽的立方体。该剪裁空间被压缩到一个二维空间并栅格化为图像。

模型矩阵，定义了如何获取**原始模型数据**并将其在 3D **世界空间**中移动。
投影矩阵，用于将世界空间坐标转换为裁剪空间坐标。常用的投影矩阵（透视矩阵）用于模拟充当 3d 虚拟世界中观看者的替身的典型相机的效果。
视图矩阵负责**移动**场景中的对象以**模拟**相机位置的**变化**，改变观察者当前能够看到的内容。

裁剪空间 立方体

齐次坐标 <--> 三维点
三维点分别除以第四个 w 分量，得到的结果是一个齐次坐标。

如果 w 分量是零，则代表一个**无穷远的点**，也就是**射线**。还可以将其视为**方向矢量**的表示。

将模型数据和其他坐标转换到裁剪空间中。

视图矩阵，平移，旋转和缩放场景中的物体，以使根据观察者的位置和方向将它们放置到正确的位置。

使用视图矩阵来模拟物理相机的位置和旋转。

与直接转换模型顶点的模型矩阵不同，视图矩阵会移动一个抽象的相机。实际上，顶点着色器仍然移动的是模型，而“相机”保持在原位。为了使此计算正确，必须使用变换矩阵的逆。逆矩阵实质上是逆转了变换，因此，如果我们向前移动相机，则逆矩阵会导致场景中的物体向后移动。

相关坐标系的转换

在模型空间中定义了立方体的顶点。在场景中移动模型。这些顶点需要通过应用模型矩阵转换到世界空间。

`模型空间 --> 模型矩阵 --> 世界空间`

世界空间中的模型，需要移动到视图空间（使用视图矩阵）以表示**相机的位置**。

`世界空间 --> 视图矩阵 --> 视图空间`

添加投影，以便将世界坐标映射到裁剪空间。

`视图空间 --> 投影矩阵 --> 裁剪空间`

用单色绘制图像是两个步骤：首先，通过使用 `clearColor()` 设置清除色为绿色。这只会改变 Webgl 内部的一个状态，但并不会绘制任何东西。接下来，我们就真的开始绘制了，使用 `clear()` 方法，这是一个典型的用 webgl 绘制的方法，webgl 实际上只有少数的几个绘制方法 (clear() 就是其中之一)。其他方法大多都是类似设置或改变 WebGl 状态和变量的（例如设置 clearcolor）。

`scissor()` defines a mask that **only** allows pixels inside the specified rectangular area **to be updated**.

**The scissoring stage** of the pipeline is **disabled by default**. We enable it here using the `enable()` method (you will also use `enable()` to activate many other features of WebGL;
