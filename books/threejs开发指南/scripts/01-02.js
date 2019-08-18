// import { Mesh } from 'three'

function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene()

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.setSize(window.innerWidth, window.innerHeight)

  // show axes in the screen
  var axes = new THREE.AxesHelper(20)
  scene.add(axes)

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20)
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa
  })
  var plane = new THREE.Mesh(planeGeometry, planeMaterial)

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(15, 0, 0)

  // add the plane to the scene
  scene.add(plane)

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
    // wireframe: true
  })
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

  // position the cube
  cube.position.set(-4, 3, 0)

  // add the cube to the scene
  scene.add(cube)

  // create a sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: true
  })
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

  // position the sphere
  sphere.position.set(20, 4, 2)

  // add the sphere to the scene
  scene.add(sphere)

  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position)

  var geometry = new THREE.SphereBufferGeometry(10, 10, 10)

  var wireframe = new THREE.WireframeGeometry(geometry)

  var line = new THREE.LineSegments(wireframe)
  line.material.depthTest = false
  line.material.opacity = 0.25
  line.material.transparent = true
  line.material.linewidth = 2

  scene.add(line)

  // add the output of the renderer to the html element
  document.getElementById('webgl-output').appendChild(renderer.domElement)

  let step = 0
  function render() {
    step += 0.04
    sphere.position.x = 20 + 10 * Math.cos(step)
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
    requestAnimationFrame(render)
    // render the scene
    renderer.render(scene, camera)
  }
  requestAnimationFrame(render)
}

function customCube() {
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

  var geom = new THREE.Geometry()
  geom.vertices = vertices
  geom.faces = faces
  geom.computeFaceNormals()

  return geom
}
