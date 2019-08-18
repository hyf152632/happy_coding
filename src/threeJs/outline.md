# title

设置 renderer 的背景颜色
renderer.setClearColor(new THREE.Color(0x000000))

一个平面
var planeGeometry = new THREE.PlaneGeometry(60, 20)

材料显示为线性
var sphereMaterial = new THREE.MeshBasicMaterial({
color: 0x7777ff,
wireframe: true
})

// 小球弹跳效果
// 小球速度
let step = 0
function render() {
step += 0.04
sphere.position.x = 20 + 10 _ Math.cos(step)
sphere.position.y = 2 + 10 _ Math.abs(Math.sin(step))
requestAnimationFrame(render)
// render the scene
renderer.render(scene, camera)
}

线框对象：
我们使用 THREE.SceneUtils 对象的 createMultiMaterialObject()方法为几何体添加了线框。在 Three.js 中还可以使用 THREE.WireframeGeometry 来添加线框。

```js
var geometry = new THREE.SphereBufferGeometry(10, 10, 10)

var wireframe = new THREE.WireframeGeometry(geometry)

var line = new THREE.LineSegments(wireframe)
line.material.depthTest = false
line.material.opacity = 0.25
line.material.transparent = true
line.material.linewidth = 2

scene.add(line)
```

对象的 visible 属性
📒： 通过改变辅助对象的 visible 而不是移除和重建辅助对象来提高性能。

Camera 的 zoom 参数，可以用来放大和缩小场景，默认为 1， 如果小于 1 则场景被缩小，如果大于 1 则场景被放大。如果为负，则场景上下颠倒。

Camera.lookAt

切换不同种类的摄像机 📹

THREE.TubeGeometry 沿着一条三维的样条曲线拉伸出一根管。你可以通过指定一些顶点来定义路径，然后用 THREE.TubeGeometry 创建这根管。

在本例中，我们还调用了 computeFaceNormals()和 computeVertexNormals，这是确保正确渲染使用的材质（THREE.MeshLambertMaterial）所必需的。
