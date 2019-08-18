# content

随着 WebGL API 在 2011 年由 Khronos Group 推出后，3D 图形技术正式向高级编程语言 JavaScript 敞开大门。

本书将介绍 2018 年推出的 r95 版本 Three.js 库，以及与之相关的物理模拟库 Physijs。

Three.js 库是建立在 WebGL API 基础之上的高级 API，其功能介于底层图形 API 和通用 3D 引擎（例如 Unity 3D 等）之间。它具有通常在 3D 引擎中才能见到的“材质”概念，不但能够直接实现 Phong-Blinn 实时光照、实时阴影、法向贴图、环境贴图等传统技术，还能支持时下流行的“基于物理渲染”（PBR）技术。同时，它还提供了许多现成的着色器程序，可以实现 3D 引擎中常见的高级效果，包括但不限于全屏环境光遮挡（SSAO）、景深（DOF）等。

然而，直接使用 WebGL 编程还是很复杂的。编程者需要知道 WebGL 的底层细节，并且学习复杂的着色语言来获得 WebGL 的大部分功能。Three.js 提供了一个很简单的关于 WebGL 特性的 JavaScript API，所以用户不需要详细地学习 WebGL，就能创作出好看的三维图形。

Three.js 为直接在浏览器中创建三维场景提供了大量的特性和 API。

## 第 1 章 使用 Three.js 创建你的第一个三维场景

Three.js 带来的好处有以下几点：
·创建简单和复杂的三维几何图形。
·创建虚拟现实（VR）和增强现实（AR）场景。
·在三维场景下创建动画和移动物体。
·为物体添加纹理和材质。
·使用各种光源来装饰场景。
·加载三维模型软件所创建的物体。
·为三维场景添加高级的后期处理效果。
·使用自定义的着色器。
·创建点云（即粒子系统）。

GitHub 仓库的访问地址为https://github.com/josdirksen/learning-threejs。

three.min.js：这个版本的 JS 库一般应用于网上部署 Three.js 时。该版本是使用 UglifyJS 压缩过的，它的大小是普通 Three.js 版本的四分之一。

场景（scene）、摄像机（camera）和渲染器（renderer）对象。**场景是一个容器**，主要用于保存、跟踪所要渲染的物体和使用的光源。

摄像机决定了能够在场景看到什么。

WebGLRenderer 将会使用电脑显卡来渲染场景。

除了基于 WebGL 的渲染器外，还有其他的渲染器，比如基于 HTML canvas 的渲染器、基于 CSS 的渲染器，甚至还有基于 SVG 的渲染器。尽管它们也能够渲染简单的场景，但是**不推荐使用**，因为它们已经停止更新、十分耗 CPU 的资源，而且也缺乏对一些功能的支持，比如材质和阴影。

对于光源，通过将 castShadow 属性设置为 true，THREE.js 的阴影功能被启用。

基本材质（THREE.MeshBasicMaterial）不会对光源有任何反应，基本材质只会使用指定的颜色来渲染物体。

设置阴影：
renderer.shadowMap.Enabled = true
通过设置 shadowMapEnabled 属性为“true”来告诉渲染器需要**阴影效果**。

通过将相应的物体的 castShadow 或者平面的 receiveShadow 属性设置为“true”来指定球体和立方体在地面上 **投射阴影**

并不是所有的光源都能够产生阴影，但是通过 THREE.SpotLight 定义的光源是能够产生阴影的。我们只要将属性 castShadow 设置为 true 就可以将阴影渲染出来了.

utils/Stats.js，添加到 head 中，用来辅助显示帧数。

```js
<scrpit src='./utils/Stats.js'></script>

init() {
  stats.update()
  requestAnimationFrame(init)
  renderer.render(scene, camera)
}
```

使用 dat.GUI 简化试验流程

Google 员工创建了名为 dat.GUI 的库（相关文档见http://code.google.com/p/dat-gui/），使用这个库可以很容易地创建出能够改变代码变量的界面组件。

按 S 键可以拉近或拉远摄像机，按 D 键可以平移摄像机。

引用了 TrackballControl.js 文件。该文件用于实现利用鼠标移动摄像机，以便以不同角度观察场景。

让场景对浏览器的大小自适应
监听浏览器的 resize 事件， 然后改变 camera.aspect 和 render.setSize.

## 第二章 构建 Three.js 应用的基本组件

THREE.Scene 对象有时被称为场景图，可以用来保存所有图形场景的必要信息。
有趣的是，场景图，顾名思义，不仅仅是一个对象数组，还包含了场景图树形结构中的所有节点。每个你添加到 Three.js 场景的对象，甚至包括 THREE.Scene 本身，都是继承自一个名为 THREE.Object3D 的对象。

给对象命名在调试的时候是很有用的，而且还可以直接通过名字来获取场景中的对象。如果使用 Three.Scene.getObjectByName(name)方法，可以直接获取场景中名为 name 的对象，然后可以执行一些比如改变位置的操作。

THREE.Scene 对象的 children 属性来获取最后一个添加到场景中的对象，children 属性将场景中的所有对象存储为数组。在移除对象时，我们还需要检查该对象是不是 THREE.Mesh 对象，这样做的原因是避免移除摄像机和光源

THREE.Scene.Add
THREE.Scene.Remove
THREE.Scene.children
THREE.Scene.getObjectByName

THREE.Scene 对象的两个属性：fog（雾化）和 overrideMaterial（材质覆盖）。

使用 fog 属性就可以为整个场景添加雾化效果。雾化效果是：场景中的物体离摄像机越远就会变得越模糊。

```js
scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
// or
scene.fog = new THREE.FogExp(0xffffff, 0.01)
```

当设置了 overrideMaterial 属性后，场景中所有的物体都会使用该属性指向的材质，即使物体本身也设置了材质。当某一个场景中所有物体都共享同一个材质时，使用该属性可以通过减少 Three.js 管理的材质数量来提高运行效率，但是实际应用中，该属性通常并不非常实用。

关于场景我们需要记住的是：它是在渲染时你想使用的所有物体、光源的容器。

Geometry and Mesh
Three.js 提供了很多可以在三维场景中使用的几何体
像其他大多数三维库一样，在 Three.js 中几何体基本上是三维空间中的点集（也被称作顶点）和将这些点连接起来的面

尽管可以使用 Three.js 提供的几何体，但是你仍然可以通过定义顶点和面来自定义创建几何体。

```js
// 创建简单的立方体
var vertices = [
  new THREE.Vector3(1, 3, 1),
  new THREE.Vector3(1, 3, -1),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(-1, 3, -1),
  new THREE.Vector3(-1, 3, 1),
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3(-1, -1, 1)
]

var faces = [
  new THREE.Face3(0, 2, 1),
  new THREE.Face3(2, 3, 1),
  new THREE.Face3(4, 6, 5),
  new THREE.Face3(6, 7, 5),
  new THREE.Face3(4, 5, 1),
  new THREE.Face3(5, 0, 1),
  new THREE.Face3(7, 6, 2),
  new THREE.Face3(6, 3, 2),
  new THREE.Face3(5, 7, 0),
  new THREE.Face3(7, 2, 0),
  new THREE.Face3(1, 3, 4),
  new THREE.Face3(3, 6, 4)
]

var geom = new HTREE.Geometry()
geom.vertices = vertices
geom.face = faces
geom.computeFacNormals()
```

如 new THREE.Face3(0，2，1)就是使用 vertices 数组中的点 0、2 和 1 创建而成的三角形面。需要注意的是创建面的顶点时的创建顺序，因为顶点顺序决定了某个面是面向摄像机还是背向摄像机的。如果你想创建面向摄像机的面，那么顶点的顺序是顺时针的，反之顶点的顺序是逆时针的。
在 Three.js 以前的版本中，可以使用四边形来定义面。到底是使用四边形还是三角形来创建面，在三维建模领域里一直存在比较大的争议。基本上，大家都习惯于用四边形来创建面，因为它比三角形更容易增强和平滑。但是对于渲染器和游戏引擎来说，使用三角形更加容易，因为三角形渲染起来效率更高。

执行 computeFaceNormals()方法，当该方法执行时，Three.js 会决定每个面的法向量，法向量用于决定不同光源下的颜色。

线框对象：
我们使用 THREE.SceneUtils 对象的 createMultiMaterialObject()方法为几何体添加了线框。在 Three.js 中还可以使用 THREE.WireframeGeometry 来添加线框。

先从 position 属性开始。通过这个属性你可以设置对象在 x、y 和 z 轴的坐标。对象的位置是相对于它的父对象来说的，通常父对象就是添加该对象的场景，但有的时候可能是 THREE.Object3D 对象或其他 THREE.Mesh 对象。

三种设置 position 的方式：

```js
cube.position.x = -10
cube.position.y = 3
cube.position.z = 1

cube.positition.set(10, 2, 1)

cube.position = new THREE.Vector3(10, 2, 1)
```

使用 translate()方法你可以改变对象的位置，但是该方法设置的不是物体的绝对位置，而是物体相对于当前位置的平移距离。

Three.js 库提供了两种不同的摄像机：正交投影摄像机和透视投影摄像机。

使用正交投影摄像机的话，所有的立方体被渲染出来的尺寸都是一样的，因为对象相对于摄像机的距离对渲染的结果是没有影响的。这种摄像机通常被用于二维游戏中

在我们的示例中，大部分使用的是透视投影摄像机，因为这种摄像机的效果更贴近真实世界。

## 第三章 学习使用 Three.js 中的光源

没有光源，渲染的场景将不可见（除非你使用基础材质或线框材质）。

WebGL 本身并不支持光源。如果不使用 Three.js，则需要自己写 WebGL 着色程序来模拟光源。

在本章中你将学到以下几个主题：
·Three.js 中可用的光源。
·特定光源使用的时机。
·如何调整和配置所有光源的行为。
·简单地介绍如何创建镜头光晕。

首先，我们先看一下基础光源：THREE.AmbientLight、THREE.PointLight、THREE.SpotLight 和 THREE.DirectionalLight。所有这些光源都是基于 THREE.Light 对象扩展的，这个对象提供公用的功能
在第二部分，我们将会看到一些特殊用途的光源和效果：THREE.HemisphereLight、THREE.AreaLight 和 THREE.LensFlare。只有在十分特殊的情况下才会用到这些光源。

THREE.AmbientLight 时，颜色将会应用到全局。该光源并没有特别的来源方向，并且 THREE.AmbientLight 不会生成阴影。

通常，不能将 THREE.AmbientLight 作为场景中唯一的光源，因为它会将场景中的所有物体渲染为相同的颜色，而不管是什么形状。

在使用其他光源（如 THREE.SpotLight 或 THREE.DirectionalLight）的同时使用它，目的是弱化阴影或给场景添加一些额外的颜色。

使用这种光源时要记住：用色应该尽量保守。如果你指定的颜色过于明亮，那么你很快就会发现画面的颜色过于饱和了。

使用 THREE.Color 对象
·无参数构造：new THREE.Color()这种构造形式会创建一个代表白颜色的对象。
·十六进制数值：new THREE.Color(0xababab)这种构造形式会将十六进制值转换为颜色分量值并基于此构造颜色对象。这是最佳的颜色对象构造形式。
·十六进制字符串：new THREE.Color("#ababab")，此时 Three.js 会将字符串当作 CSS 颜色字符串去解释，并构造颜色对象。
·RGB 字符串：顾名思义，这种构造形式需要为每个 RGB 分量指定亮度值，其具体形式可以是 new THREE.Color("rgb(255，0，0)")或者 new THREE.Color("rgb(100%，0%，0%)")。
·颜色名称：可以使用 Three.js 能够识别的颜色名称字符串，例如 new THREE.Color("skyblue")。
·HSL 字符串：如果相比 RGB，你更熟悉 HSL 色域，也可以使用 HSL 值来构造颜色对象，例如 new THREE.Color("hsl(0%，100%，50%)")。

THREE.PointLight、THREE.SpotLight 和 THREE.DirectionalLight 的讨论之前，我们先看一下它们之间最主要的区别，那就是它们发射光线的方式。

·THREE.PointLight 从特定的一点向所有方向发射光线。
·THREE.SpotLight 从特定的一点以锥形发射光线。
·THREE.DirectionalLight 不是从单个点发射光线，而是从二维平面发射光线，光线彼此平行。

SpotLight
THREE.SpotLight（聚光灯光源）是最常使用的光源之一（特别是如果你想要使用阴影的话）。THREE.SpotLight 是一种具有锥形效果的光源。你可以把它与手电筒或灯塔产生的光进行对比。该光源产生的光具有方向和角度

我们创建了 THREE.SpotLight 对象实例，并且将 castShadow 属性设置为 true，因为我们想要阴影

此外，由于需要让这个光源照向指定的方向，因此我们通过设置 target 属性来实现。在本例中，我们将其指向名为 plane 的对象

THREE.SpotLight 对象独有的属性。其中之一就是 target 属性。如果我们对蓝色球体（sphere 对象）设置此属性，那么这个光源会一直瞄准球体的中心，即使它在绕场景移动。

但是如果你不想把光源瞄准一个特定的对象，而是空间中的任意一点呢？可以通过创建一个 THREE.Object3D()对象来实现，

```js
var targe = new THREE.Object3D()
target.position = new THREE.Vector3(5, 0, 0)

spotlight.target = target
```

将 THREE.SpotLight 对象的 castShadow 属性设置为 true 可以生成阴影

当然，在场景中渲染 THREE.Mesh 对象时，要确保为要投射阴影的对象设置 castShadow 属性，为要显示阴影的对象设置 receiveShadow 属性。）

添加 THREE.CameraHelper 来调试阴影。

与调试阴影类似，如果你需要调试聚光灯光源本身存在的问题，可以使用 Three，js 提供的 THREE.SpotLightHelper

记住，不仅要告诉光源生成阴影，而且还必须通过配置每个几何体的 castShadow 和 receiveShadow 属性来告诉几何体对象是否接收或投射阴影。

PointLight
Three.js 库中的 THREE.PointLight（点光源）是一种单点发光、照射所有方向的光源。夜空中的照明弹就是一个很好的点光源的例子。
在新版 Three.js 中，点光源也可以像聚光灯（THREE.SpotLight）和平行光（THREE.DirectionalLight）一样产生阴影了。

THREE.DirectionalLight 和我们之前看过的 THREE.SpotLight 之间的主要区别是：平行光不像聚光灯（可以通过 distance 和 exponent 属性来微调）那样离目标越远越暗淡。被平行光照亮的整个区域接收到的光强是一样的。

THREE.HemisphereLight（半球光光源），这种光源可以为户外场景创建更加自然的光照效果。然后我们会看一看 THREE.AreaLight（区域光光源），它可以从一个很大的区域发射光线，而不是从单个点

如果不使用这个灯光，要模拟户外光照，可以创建一个 THREE.DirectionalLight 来模拟太阳光，并且可能再添加一个 THREE.AmbientLight 来为场景提供基础色。但是，这样的光照效果看起来并不怎么自然

你只需要给它指定接收来自天空的颜色，接收来自地面的颜色，以及这些光线的光照强度。之后如果想修改这些属性值，可以使用表 3.6 所列出的属性。

使用 THREE.AreaLight，可以定义一个长方形的发光区域。

当你直接朝着太阳或另一个非常明亮的光源拍照时就会出现镜头光晕效果。

可以通过实例化 THREE.LensFlare 对象来创建镜头光晕。首先要做的是创建这个对象。

使用了刚创建的 THREE.LensFlare 对象的 add 方法。在这个方法中，只需指定纹理（texture）、尺寸（size）、距离（distance）和混合（blending）模式。

我们学习了配置光源、颜色和阴影，并且知道了它们不是严谨的科学。要获得正确的结果，需要不断试验，使用 dat.GUI 控件可以微调配置。

THREE.AmbientLight 光源的颜色可以附加到场景中的每一种颜色上，通常用来柔化生硬的颜色和阴影。

THREE.PointLight 光源会朝所有方向发射光线，不能被用来创建阴影。THREE.SpotLight 光源类似于手电筒。它有一个锥形的光束，可以配置它随着距离的增大而逐渐变弱，并且可以生成阴影。我们还学习了 THREE.DirectionalLight 光源。这个光源相当于远光的效果，比如太阳光。它的光线彼此平行，其光强并不会随着与目标对象距离的增大而减弱。除了这些标准光源之外，我们还学习了几个更加特殊的光源。如果想要一个更加自然的户外效果，可以使用 THREE.HemisphereLight 光源，它考虑了天空和地面的反射。THREE.AreaLight 不从单个点发射光线，而是从一个很大的区域发射光线。我们还展示了如何通过 THREE.LensFlare 对象添加图像化的镜头光晕。

## 第 4 章 使用 Three.js 的材质

一个材质结合 THREE.Geometry 对象，可以构成 THREE.Mesh 对象。

材质就像物体的皮肤，决定了几何体的外表。例如，皮肤定义了一个几何体看起来是否像金属、透明与否，或者显示为线框。

你可以快速看一下哪些属性是所有材质共有的。Three.js 提供了一个材质基类 THREE.Material，它列出了所有的共有属性

·基础属性：这些属性是最常用的。通过这些属性，可以控制物体的不透明度、是否可见以及如何被引用
·融合属性：每个物体都有一系列的融合属性。这些属性决定了物体如何与背景融合。
·高级属性：有一些高级属性可以控制底层 WebGL 上下文对象渲染物体的方式。大多数情况下是不需要使用这些属性的。

大多数材质允许使用图片作为纹理（如木质或类岩石材质）。

有些材质也有与动画相关的特殊属性（skinning、morphNormals 和 morphTargets），这些属性也可以略过，在第 9 章会讨论它们。而 clipIntersection、clippingPlanes 和 clipShadow 3 个属性则会在第 6 章讨论。

几种简单的材质：MeshBasicMaterial、MeshDepthMaterial 和 MeshNormal-Material。

一般来说，如果知道所有属性的值，最好的方式是在创建材质对象时使用构造方法传入参数。这两种方式中参数使用相同的格式。唯一例外的是 color 属性。在第一种方式中，可以只传入十六进制值，Three.js 会自己创建一个 THREE.Color 对象。而在第二种方式中，必须创建一个 THREE.Color 对象。

MeshBasicMaterial
MeshBasicMaterial 是一种非常简单的材质，这种材质不考虑场景中光照的影响。使用这种材质的网格会被渲染成简单的平面多边形，而且也可以显示几何体的线框。

在这个例子中有一个可以设置的属性为 side。通过这个属性，可以指定在 THREE.Geometry 对象的哪一面应用材质。

下一个材质是 THREE.MeshDepthMaterial。使用这种材质的物体，其外观不是由光照或某个材质属性决定的，而是由物体到摄像机的距离决定的。

可以将这种材质与其他材质结合使用，从而很容易地创建出逐渐消失的效果。这种材质只有两个控制线框显示的属性

将多个材质联合在一起使用的方法

```js
var cubeMaterial = new THREE.MeshDepthMaterial()
var colorMaterial = new THREE.MeshBaiscMaterial({
  color: 0x00ff00,
  //如果将transparent属性设置为true，Three.js就会检查blending属性，以查看这个绿色的THREE.MeshBasicMaterial材质如何与背景相互作用。
  trnasparent: true,
  blending: THREE.MultiplyBlending
})
var cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [
  colorMaterial,
  cubeMaterial
])
cube.children[1].scale.set(0.99, 0.99, 0.99)
//这些方块从THREE.MeshDepthMaterial对象获得亮度，并从THREE.MeshBasicMaterial获得颜色
```

THREE.MeshNormalMaterial
需要将 flatshading 属性设置为 true
法向量所指的方向决定了在使用 THREE.MeshNormalMaterial 材质时，每个面获取的颜色。由于球体各面的法向量都不相同，所以在这个例子里我们看到的是一个色彩斑斓的球体.
要添加这些法向量，可以使用 THREE.ArrowHelper 对象

```js
for (var f = 0, fl = sphere.geometry.faces.length; f < fl; f++) {
  var face = sphere.geometry.faces[f]
  var centroid = new THREE.Vector3(0, 0, 0)
  centroid.add(sphere.geometry.vertices[face.a])
  centroid.add(sphere.geometry.vertices[face.b])
  centroid.add(sphere.geometry.vertices[face.c])
  centroid.divideScalar(3)

  var arrow = new THREE.ArrowHelper(face.normal, centroid, 2, 0x3333ff, 0.5, 0.5)
  sphere.add(arrow)
}
```

在这段代码中，我们遍历 THREE.SphereGeometry 的所有面。对于每个 THREE.Face3 对象来说，我们通过把构成该面的顶点相加再除以 3 来计算中心（质心）。使用这个质心连同该面的法向量来绘制箭头。

通过 shading 属性，我们可以告诉 Three.js 如何渲染物体。如果使用 THREE.FlatShading，那么每个面是什么颜色就渲染成什么颜色（正如你在前面的那些截图中看到的那样），或者也可以使用 THREE.SmoothShading，这样就可以使物体的表面变得更光滑。

在单几何体上使用多种材质
为几何体的每个面指定不同的材质是可能的。
在 Three.js 中，几何体的每一个面都具有一个 materialIndex 属性。该属性指定了该面将使用哪一个具体的材质。

高级材质。首先我们看一下 THREE.MeshPhongMaterial 和 THREE.MeshLambertMaterial。这两种材质会对光源做出反应，并且可以分别用来创建光亮的材质和暗淡的材质。

本节还会介绍一种最通用但也最难用的材质：THREE.ShaderMaterial。通过 THREE.ShaderMaterial，可以创建自己的着色程序，定义材质和物体如何显示。

THREE.MeshLambertMaterial
这种材质可以用来创建暗淡的并不光亮的表面。
THREE.LambertMaterial 材质的另一个有趣的功能是可以支持线框绘制属性，因此利用它可以绘制具有光照效果的线框物体
通过 THREE.MeshPhongMaterial 可以创建一种光亮的材质。

在旧版 Three.js 中，这是唯一一种既可以在物体表面实现高光效果的材质。它既可以模拟塑料质感，也可以在一定程度上模拟金属质感。新版 Three.js 提供了 THREE.MeshStandardMaterial 和 THREE.MeshPhysicalMaterial 两个新型材质。
Three，js 还提供了一个 THREE.MeshPhongMaterial 材质的扩展材质：THREE.MeshToonMaterial。它的属性与 THREE.MeshPhongMaterial 完全相同，但是会以不同的方式渲染物体

新版 Three.js 提供了两个新型材质：THREE.MeshStandardMaterial（标准材质）和 THREE.MeshPhysicalMaterial（物理材质）

MeshStandardMaterial
THREE.MeshStandardMaterial 这种材质使用更加正确的物理计算来决定物体表面如何与场景中的光源互动。这种材质不但能够更好地表现塑料质感和金属质感的表面，而且像开发者提供了表 4.10 中所列的两个新属性。

- metalness(金属感程度)。 该属性控制物体表面的金属感程度。0 代表完全塑料质感；1 代表完全金属质感。默认 0.5
- roughness（粗糙程度） 该属性控制物体表面的粗糙程度。在视觉上，它决定表面对入射光的漫反射程度。默认值 0.5.当值为 0 时会产生类似镜面的反射，为 1 时会产生完全的漫反射效果。

THREE.MeshPhysicalMaterial
该材质与 THREE.MeshStandardMaterial 非常相似，但提供了对反光度的更多控制

与其他材质类似，这两种新材质在不动手实验的情况下，也难以确定什么样的参数值才能最符合某种特定需求。因此最佳的实践方法就是给程序增加一个简单的 UI（就像我们在前面示例中所做的那样），并通过一边调节参数一边观察的方法来寻找最满意的参数组合。

THREE.ShaderMaterial 是 Three.js 库中最通用、最复杂的材质之一。通过它，可以使用自己定制的着色器，直接在 WebGL 环境中运行。

最后几种材质只能用于一个特别的几何体：THREE.Line（线段）。顾名思义，这只是一条线，线段由顶点组成，不包含任何面。Three.js 库提供了两种可用于线段的不同材质，如下所示：
·THREE.LineBasicMaterial：用于线段的基础材质，可以设置 colors、
linewidth、linecap 和 linejoin 属性。
·THREE.LineDashedMaterial：它的属性与 THREE.LineBasicMaterial 的属性一样，但是可以通过指定虚线和空白间隙的长度来创建出虚线效果。

通过顶点集合创建一个 THREE.Line 网格，并与 LineMaterial 材质组合以创建网格，

```js
var points = gosper()
var lines = new THREE.Geometry()
var colors = []
var i = 0
points.forEach(function(e) {
  lines.vertices.push(new THREE.Vector3(e.x, e.z, e.y))
  colors[i] = new THREE.Color(0xffffff)
  colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8)
  i++
})
lines.colors = colors

var material = new THREE.LineBasicMaterial({
  opacity: 1.0,
  linewidth: 1,
  vertexColors: THREE.VertexColors
})
var line = new THREE.Line(lines, material)
```

这段代码的第一行“var points=gosper(4，60)；”作为获取一些 x、y 坐标的示例。这个函数返回一个 gosper 曲线（更多信息可以参考http://en.wikipedia.org/wiki/Gosper_curve），这是一种填充二维空间的简单算法。

通过 THREE.LineDashedMaterial，不但可以给线段上色，还可以添加一种虚线效果。

唯一的区别是必须调用 computeLineDistance()（用来计算线段顶点之间的距离）。如果不这么做，间隔就不会正确地显示

不是所有的材质都对场景中的光源做出反应。如果希望一个材质计算光照的影响，如果希望一个材质计算光照的影响，应该尽量使用标准材质 THREE.MeshStandardMaterial。而当你需要更多控制时，可以考虑使用 THREE.MeshPhysicalMaterial、THREE.MeshPhongMaterial 或 THREE.MeshLambertMaterial。仅仅从代码确定某种材质属性的效果是非常困难的。通常，使用 dat.GUI 控制面板来试验这些属性是一个不错的方法。

同样该记住的是，材质的大部分属性都可以在运行时修改。但是有一些属性（例如 side）不能在运行时修改。如果你要修改这些属性的值，需要将 needsUpdate 属性设置为 true。

## 学习使用几何体

Three.js 中用于代表几何体的两个可用基类：THREE.Geometry 和 THREE.BufferGeometry。

前者是旧版本中所有几何体的基类，而后者则由新版本提供给开发者。新几何体基类 THREE.BufferGeometry 的内部数据组织形式与 GPU 所期待的数据结构保持一致，从而进一步提高了运行效率。但是作为代价，新几何体基类的易用性稍差一些。

旧几何体基类 THREE.Geometry 使用 vertices(顶点)和 faces(面)属性来定义物体形状。

你可以直接向几何体对象添加新顶点并定义新的面，或者通过修改现有顶点来修改现有的面。

新的 THREE.BufferGeometry 并没有 vertices 和 faces 属性，而只有 attribute 属性以及可选的 index 属性。（译注：attribute 虽然也常常被译作“属性”，但这里应该当作“分量”来理解，因为一个顶点的数据往往由多个 attribute 分量组成，包括但不限于空间坐标、颜色、法向量、纹理坐标等。）

有时我们需要在基于 THREE.Geometry 的几何体和基于 THREE.BufferGeometry 的几何体之间转换。例如有的模型加载器只能创建基于 THREE.BufferGeometry 的模型对象。但是如果需要在加载模型之后修改模型，则适宜将它转换成为基于 THREE.Geometry 的对象，从而使我们能够直接修改顶点和面，避免去操作庞大的 attribute 数组。幸运的是，THREE.Geometry 提供了 fromBufferGeometry 方法，可以接收基于 THREE.BufferGeometry 的对象，并将其数据导入到 THREE.Geometry 对象中。

对应地，THREE.BufferGeometry 也提供了 fromGeometry 方法，用于实现反向转换。

```js
var normalGeometry = new THREE.Geometry()
normalGeometry.fromBufferGeometry(bufferGeometry)

var bufferGeometry = new THREE.BufferGeometry()
bufferGeometry.fromGeometry(normalGeometry)
```

二维几何体
THREE.PlaneGeometry
PlaneGeometry 对象可以用来创建一个非常简单的二维矩形。

如果要在几何体创建后访问其属性，则不能仅仅使用 plane.width。要访问几何体的属性，必须使用对象的 parameters 属性。因此，要获取我们在本节中创建的平面对象的 width 属性，必须使用 plane.parameters.width。

THREE.CircleGeometry 可以创建什么了。通过这个几何体，你可以创建一个非常简单的二维圆（或部分圆）。

半圆:

```js
new THREE.CircleGeometry(3, 12, 0, Math.PI)
```

Three.js 创建的这些对象都是“直立”的，所以它们只位于 x-y 平面。这很符合逻辑，因为它们是二维图形。但是一般来讲，特别是 THREE.PlaneGeometry，你会希望这个网格“躺”下来，以便构建一种地面（x-z 平面），好把其他对象放在上面。创面一个水平放置而不是竖直的二维对象，最简单的方法是将网格沿 x 轴向后旋转四分之一圈（-PI/2）

THREE.RingGeometry 可以创建一个如图 5.4 所示的二维对象，这个对象不仅非常类似于 THREE.CircleGeometry，而且可以在中心定义一个孔

如果你想创建一个自定义的二维图形，可以使用 THREE.ShapeGeometry。通过 THREE.ShapeGeometry，你可以调用几个函数来创建自己的图形。

三维几何体
BoxGeometry
THREE.BoxGeometry 是一种非常简单的三维几何体，只需要指定宽度、高度和深度就可以创建一个长方体

通过增加多个分段（segment）属性，你可以将长方体的 6 个大面分成很多小面。这在你用 THREE.MeshFaceMaterial 为长方体的不同部分设置特定属性时比较有用。

通过 SphereGeometry，你可以创建一个三维球体。

这个几何体非常灵活，可以用来创建所有跟球体相关的几何体。

CylinderGeometry
通过这个几何体，我们可以创建圆柱和类似圆柱的物体。

但是有趣的是，你可以在顶部（或底部）使用值为负数的半径。如果这么设置，你就可以使用这个几何体创建出一个类似沙漏的图形

圆柱的上半部分内外翻转了。如果你用的材质不是设置成 THREE.DoubleSide，你就看不到上半部分。

ConeGeometry（圆锥体）。它与 THREE.CylinderGeometry 的非常相似，唯一区别就是其顶部半径默认为 0。

TorusGeometry
Torus（圆环）是一种看起来像甜甜圈的简单图形
其中的 arc 属性是一个非常有趣的属性。通过这个属性，你可以指定是绘制一个完整的圆环还是部分圆环。

通过 THREE.TorusKnotGeometry，你可以创建一个环状扭结。

p 属性定义扭结绕其轴线旋转的频率，q 属性定义扭结绕其内部缠绕多少次。

PolyhedronGeometry
使用这个几何体，可以很容易地创建多面体。多面体是只有平面和直边的几何体。但是多数情况下，你不会直接使用这种几何体。

IcosahedronGeometry
THREE.IcosahedronGeometry 可以创建出一个有 20 个相同三角形面的多面体，这些三角形面是从 12 个顶点创建出来的。创建这个多面体时，你要做的只是指定 radius 和 detail 的值

TetrahedronGeometry
Tetrahedron（正四面体）是最简单的多面体。这个多面体只包含由 4 个顶点创建的 4 个三角形面。创

OctahedronGeometry
Three.js 库还提供了实现八面体的方法。顾名思义，这个多面体有 8 个面。

DodecahedronGeometry
Three.js 库提供的最后一个多面体是 THREE.DodecahedronGeometry。这个多面体有 12 个面

学习如何使用这些几何体的最好方式就是去试验它们。

一种好的方法是：开始创建几何体时，可以选择一种简单的材质，不要直接使用那些复杂的材质，可以从简单的 THREE.MeshBasicMaterial 材质开始，并将 wireframe 属性设为 true，或者使用 THREE.MeshNormal-Material 材质也可以。这样，你就可以对几何体的真实形状有一个更好的了解。对于二维图形，重要的是要记住它们是放置在 x-y 平面上的。如果你想拥有一个水平的二维图形，那么你必须将这个网格绕 x 轴旋转-0.5\*PI。最后，如果你要旋转一个二维图形，或者一个开放的三维图形（例如圆柱或管），记住要将材质设置成 THREE.DoubleSide。如果你不这么做，那么该几何体的内侧或背面将会不可见。

## 第 6 章 高级几何体和二元操作

如何使用高级几何体，例如 THREE.ConvexGeometry、THREE.LatheGeometry 和 THREE.TubeGeometry。
·如何使用 THREE.ExtrudeGeometry 从二维图形创建三维图形。我们会使用 Three.js 提供的函数来画这个二维图形，并且我们还会展示如何从一个外部加载的 SVG 图片创建出一个三维图形。
你可以通过轻松地修改前面章节中讨论过的图形来创建自定义图形。不过 Three.js 库也提供了一个 THREE.ParamtericGeometry 对象。使用这个对象，可以基于一组方程来创建几何体。
·最后，介绍如何使用 THREE.TextGeometry 来创建三维文字效果。

通过 THREE.ConvexGeometry，我们可以围绕一组点创建一个凸包。所谓凸包就是包围这组点的最小图形。
请确保启用材质的半透明属性，并且将不透明度设置为一个小于 1 的值，这样就可以看到用于生成这个凸包的所有点。为了能够观察到这些点，我们用 THREE.SphereGeometry 在每个点的位置上生成了一个小球体。

THREE.LatheGeometry，它用于创建类似花瓶的图形。
允许你从一条光滑曲线创建图形。此曲线是由多个点（也称为节点）定义的，通常称作样条曲线。这条样条曲线绕物体的中心 z 轴旋转，得到类似花瓶或铃铛的图形。

Three.js 提供了几种方法，让我们可以从一个二维图形拉伸出三维图形。拉伸指的是沿着 z 轴拉伸二维图形，将它转换成三维图形
最通用的拉伸图形的方法是使用 THREE.ExtrudeGeometry 对象。

TubeGeometry
THREE.TubeGeometry 沿着一条三维的样条曲线拉伸出一根管。你可以通过指定一些顶点来定义路径，然后用 THREE.TubeGeometry 创建这根管。

使用 THREE.ExtrudeGeometry 从已有的 SVG 路径中创建拉伸图形。
本节我们将看看如何使用来自https://github.com/asutherland/d3-threeD的小型库SVG路径转换成Three.js图形。（第8章还将介绍一个Three.js自带的用于读取SVG图形的加载器THREE.SVGLoader。）

SVG 的含义是可缩放矢量图（Scalable Vector Graphics）。它基于 XML 的标准，用来在网页上创建二维矢量图。该标准是一个所有现代浏览器都支持的开放标准。但是，直接使用 SVG，通过 JavaScript 来操作它并不直观。幸运的是，有几个开源 JavaScript 库使得使用 SVG 更简单。Paper.js、Snap.js、D3.js 和 Raphael.js 是其中最好的几个。

通过 THREE.ParametricGeometry，你可以创建基于等式的几何体。

最基础的例子是创建平面的函数，代码如下所示

```js
plane: function(width, height) {
  return function (u, v, optionalTarget) {
    var result = optionalTarget || new THREE.Vector3()
    var x = u * width
    var y = 0
    var z = v * height
    return return.set(x, y, z)
  }
}
```

一个类似波浪的图形
可以参考 Three.js 发布包里的 examples/js/ParametricGeometries.js 文件查看更多例子。这个文件包含的函数可以创建以下几何体：
·克莱因瓶
·平面
·二维莫比乌斯带
·三维莫比乌斯带
·管
·环状扭结
·球体

创建三维文本效果
在 Three.js 中渲染文本非常简单。你所要做的只是指定想要用的字体，以及我们在讨论 THREE.ExtrudeGeometry 时见过的基本拉伸属性

如果你想渲染二维文字并用作材质的纹理，那么你就不应该使用 THREE.TextGeometry。THREE.TextGeometry 在内部使用 THREE.ExtrudeGeometry 构建三维文本，并且 JavaScript 字体引入了大量开销。渲染一个简单的二维字体，使用 HTML5 画布会更好。通过 context.font，可以设置要使用的字体，通过 context.fillText，可以将文本输出到画布。然后，你可以使用此画布作为纹理的输入。

添加自定义字体
Three.js 提供了几种可以在场景中使用的字体。这些字体基于由 TypeFace.js 库提供的字体。TypeFace.js 库可以将 TrueType 和 OpenType 字体转换为 JavaScript 文件或者 JSON 文件，以便在网页中的 JavaScript 程序中直接使用。
在旧版本的 Three.js 使用字体时，需要用转换得到的 JavaScript 文件，而新版 Three.js 改为使用 JSON 文件了。
可以访问网站http://gero3.github.io/facetype.js在线转换所需的TrueType和OpenType字体。

使用二元操作组合网格
本节我们将看到另一种特别的创建几何体的方法。

将各种标准几何体组合在一起创建出新的几何体——一种被称为构造实体几何体（Constructive Solid Geometry，CSG）的技术，为此，我们引入了 Three.js 的扩展库 ThreeBSP。你可以在网上找到这个库，网址是https://github.com/skalnik/ThreeBSP

## 第 7 章 粒子和精灵 🧚‍♂️

使用 THREE.Points（有时也叫作精灵（sprite）），可以非常容易地创建很多细小的物体，用来模拟雨滴、雪花、烟和其他有趣的效果。

使用 THREE.SpriteMaterial 创建和样式化粒子。
·使用 THREE.Points 创建一个粒子集合。
·使用现有的几何体创建一个 THREE.Points 对象。
·让 THREE.Points 对象动起来。
·使用纹理对每一个粒子进行样式化。
·使用画布通过 THREE.SpriteMaterial 对粒子进行样式化。

让我们先来探索什么是粒子，以及如何创建粒子。但是，在我们开始之前，对本章要用到的一些名称做一个快速的说明。Three.js 的最新版本更新了与粒子相关的对象的名称。THREE.Points 以前称为 THREE.PointCloud，在更早以前曾被称为 THREE.ParticleSystem。
THREE.Sprite 以前称为 THREE.Particle，而且还更改了一些材质的名称

如果我们基于 THREE.BoxGeometry 对象创建 THREE.Points 对象，我们将会得到 8 个粒子，方块上的每个角一个。但是一般来讲，我们不会使用标准的 Three.js 几何体来创建 THREE.Points，而是从零开始手工将顶点添加到几何体上（或使用一个外部加载的模型），就像我们在上一节末尾所做的一样。

本章讨论了如何通过 THREE.CanvasRenderer 和 THREE.WebGLRenderer 直接使用 THREE.Sprite 对象。但是，如果你想创建大量的粒子，应该使用 THREE.Points，这样所有的粒子将共享同一个材质，并且单个粒子唯一可以改变的属性是颜色，这通过将材质的 vertexColors 属性设置为 THREE.VertexColors 并为创建 THREE.Points 的 THREE.Geometry 的 colors 数组提供一个颜色值来实现。我们还展示了通过改变粒子的位置让粒子很容易地动起来。单个的 THREE.Sprite 实例和用于创建 THREE.Points 的几何体的顶点都可以如此使用。

## 第 8 章 创建，加载高级网格和几何体

THREE.Group（组）类的对象。该类与 THREE.Mesh 和 THREE.Scene 类共同的基类 THREE.Object3D 非常接近，唯一的不同是它本身并不含有任何可渲染的数据。

被添加到组对象中的三维物体，其本身仍然可以被单独移动、缩放和旋转。此外还可以对整个组对象进行相同的操作。

这里要注意的一点是，当三维物体被添加到组对象中后，它们自身的位置、缩放和旋转参数便都是相对于组对象的对应参数的

缩放和移动都很直观。但是要记住的是：当你旋转一个组时，并不是分别旋转组中的每一个对象，而是绕其中心旋转整个组

多数情况下使用组可以很容易地操纵和管理大量网格。但是当对象的数量非常多时，性能就会成为一个瓶颈。使用组，每个对象还是独立的，仍然需要对它们分别进行处理和渲染。通过 THREE.Geometry.merge()函数，你可以将多个几何体合并起来创建一个联合体。

通过组合和合并，你可以使用 Three.js 提供的基本几何体来创建大型的、复杂的几何体。如果你想创建更加高级的几何体，那么使用 Three.js 所提供的编程方式就不是最好、最简单的方法。幸运的是，Three.js 提供了其他创建几何体的方法。下一节，我们将会学习如何从外部资源中创建、加载几何体和网格。

你可以在两种情形下使用 Three.js 的 JSON 文件格式：用它来保存和加载单个 THREE.Mesh，或者用它来保存和加载整个场景。
在保存前，我们先要用 JSON.stringify 函数将 toJSON 函数解析的结果从一个 JavaScript 对象转换成一个字符串。

正如你在这里所看到的，我们只保存了 THREE.Mesh，其他信息都丢失了。如果你想要保存整个场景，包括光源和摄像机，可以使用 THREE.SceneExporter。

有很多三维软件可以用来创建复杂的网格。其中有一个流行的开源软件叫作 Blender（www.blender.org）。Three.js 库有一个 Blender（以及 Maya 和 3D Studio Max）导出器，可以直接将文件导出为 Three.js 的 JSON 格式。

使用 Blender
在开始配置之前，先来看一下我们想要达到的效果。在图 8.7 里你会看到一个简单的 Blender 模型，我们用一个 Three.js 插件将它导出，并在 Three.js 中用 THREE.JSONLoader 将它导入。

要想从 Blender 中导出 Three.js 模型，首先要将 Three.js 导出器添加到 Blender 中。

OBJ 和 MTL 格式
OBJ 和 MTL 是相互配合的两种格式，经常一起使用。OBJ 文件定义几何体，而 MTL 文件定义所用的材质。OBJ 和 MTL 都是基于文本的格式。

在 Three.js 里提供两种不同的加载器。如果你只想加载几何体，可以使用 OBJLoader。示

在本例中，我们还调用了 computeFaceNormals()和 computeVertexNormals，这是确保正确渲染使用的材质（THREE.MeshLambertMaterial）所必需的。

在使用外部模型或者对模型进行组合和合并时，最好记住以下几点。首先，在组合对象的时候，每个对象依然可以单独进行操作。对父对象进行变换也会影响子对象但是你仍然可以单独对每个子对象进行变换。除了组合之外，还可以将几何体合并在一起。这样的话，你就失去了对单个几何体的控制，你所得到的是一个新几何体。当你要渲染成千上万的几何体，而性能成为瓶颈的时候，这么做特别有用。

Three.js 支持大量的外部格式。使用这些格式加载器时，最好看看源码，并在回调函数中输出其接收到的信息。这将帮你理解正确获取模型网格所需的步骤，并设置正确的位置和缩放比例。

如果模型不能正确显示，一般是材质设置导致的。可能是用了不兼容的纹理格式，透明度不正确，或者是该格式文件中指向纹理的连接有误。通常可以通过测试材质来检测这种错误，也可以在 JavaScript 控制台中输出材质信息，看看有没有比较意外的值。要想导出网格和场景，只需要调用 scene 对象的 asJson 函数即可；反过来，使用 JSONLoader 可以将导出的内容重新加载到场景中。

## 第 9 章 创建动画和移动摄像机

通过 requestAnimationFrame()方法，我们不需要通知浏览器什么时候需要刷新屏幕，而是请求浏览器在合适的时候执行我们提供的方法，通常情况下是 60fps（帧频）。使用 requestAnimationFrame()方法实现的动画运行得更加平滑，对于 CPU 和 GPU 更加友好，而且也不必担心渲染时机方面的问题。

简单动画
我们可以通过改变物体的旋转、缩放、位置、材质、顶点、面以及其他你所能想到的属性来实现动画。

那就是如何通过鼠标选中场景中的对象。

选择对象
在这段代码中，我们使用 THREE.Projector 和 THREE.Raycaster 来检测是否使用鼠标点击了某个对象。当我们在屏幕上点击鼠标时，会发生如下的事情：
（1）首先，基于屏幕上的点击位置会创建一个 THREE.Vecor3 向量。
（2）接着，使用 vector.unproject 方法将屏幕上的点击位置转换成 Three.js 场景中的坐标。换句话说，就是将屏幕坐标转换成三维场景中的坐标。
（3）然后，创建 THREE.Raycaster。使用 THREE.Raycaster 可以向场景中发射光线。在该示例中，从摄像机的位置（camera.position）向场景中鼠标的点击位置发射光线。
（4）最后，我们使用 raycaster.intersectObjects 方法来判断指定的对象中哪些被该光线照射到了。
我们所点击的网格是对象，face 和 faceIndex 指的是该网格中被选中的面。distance 属性是从摄像机到被点击对象的距离，point 属性则表明网格上哪个点被点击了

使用 Tween.js 实现动画
Tween.js 是一个轻量级的 JavaScript 库，可以从https://github.com/sole/tween.js/下载。通过这个库可以很容易地实现某个属性在两个值之间进行过渡，而且起始值和结束值之间的所有中间值都会自动计算出来，这个过程叫作tweening（补间）

使用摄像机
Three.js 提供了一些摄像机控件，使用这些控件，你可以控制场景中的摄像机。这些控件在 Three.js 发布包中，你可以在 examples/js/controls 目录中找到它们。

仔细观察示例代码可以发现我们使用了 DragControls 控件类。它虽然也叫作控件但却与其他摄像机控件不同。当用鼠标在场景中拖动时，这个控件会移动场景中的物体而不是摄像机。

如果你对旧版 Three.js 比较熟悉，可能会怀念名为 THREE.PathControls 的摄像机控件，该控制器可以用于定义一个路径（如使用 THREE.Spline）并让摄像机沿着这个路径进行移动。但是由于代码较复杂，所以在新版本中移除了这个控制器。Three.js 的开发团队正着手提供该控制器的替代功能，可惜暂时还没有实现。

## 第 10 章 加载和使用纹理

关于纹理的内容到此就结束了。正如你所看到的，在 Three.js 中有各种各样的纹理，每种都有其独特的用途。你可以使用任何一张 PNG、JPG、GIF、TGA、DDS、PVR、KTX、EXR 或者 RGBE 格式的图片作为纹理。需要注意的是图片的加载是异步的，所以在加载图片时要么使用渲染，要么在加载纹理时提供一个回调方法。
使用纹理，你可以在低阶模型上创建出效果非常好的物体，甚至使用凹凸贴图和法向贴图为物体添加丰富的虚假细节。使用 Three.js 可以很容易地使用 HTML5 的画布或者视频元素创建动态纹理。你只需要将这些元素作为纹理的输入，并在纹理更新时将 needsUpdate 属性设置为 true。
到本章为止，我们差不多已经涵盖了 Three.js 中所有重要的概念。但是我们还没有涉及的内容是后期处理。通过后期处理，你可以在场景渲染完毕后添加一些效果。例如，你可以让那个场景变得模糊，或者变得色彩艳丽，或者使用扫描线添加一些类似电视的效果。下一章就会介绍后期处理，以及如何将它应用于场景中。

## 第 11 章 自定义着色器和后期处理

我们在第 1 章中创建了一个 render 循环，并在本书中一直使用该 render 循环来渲染场景和制作动画。对于后期处理，我们需要对这个渲染循环进行修改，使得 Three.js 库能够对最终的渲染结果进行后期处理。
