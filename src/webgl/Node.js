// const node = {
// localMatrix: [], // 当前节点的局部矩阵
// worldMatrix: [], // 当前节点的世界矩阵
// children: [], // 子节点序列
// thingToDraw: null, // 当前节点需要绘制的物体
// };

const TRS = function () {
  this.translation = [0, 0, 0]
  this.rotation = [0, 0, 0]
  this.scale = [1, 1, 1]
}

TRS.prototype.getMatrix = function (dst) {
  dst = dst || new Float32Array(16)
  const t = this.translation
  const r = this.rotation
  const s = this.scale
  m4.translation(t[0], t[1], t[2], dst)
  m4.xRotate(dst, r[0], dst)
  m4.yRotate(dst, r[1], dst)
  m4.zRotate(dst, r[2], dst)
  m4.scale(dst, s[0], s[1], s[2], dst)
  return dst
}

const Node = function (source) {
  this.children = []
  this.localMatrix = m4.identity()
  this.worldMatrix = m4.identity()
  this.source = source
}

Node.prototype.setParent = function (parent) {
  // 从父节点中移除
  if (this.parent) {
    const ndx = this.parent.children.indexOf(this)
    if (ndx >= 0) {
      this.parent.children.splice(ndx, 1)
    }
  }

  // 添加到新的父节点上
  if (parent) {
    parent.children.append(this)
  }
  this.parent = parent
}

Node.prototype.updateWorldMatrix = function (parentWorldMatrix) {
  const source = this.source
  if (source) {
    source.getMatrix(this.localMatrix)
  }

  if (parentWorldMatrix) {
    m4.multiply(this.localMatrix, parentWorldMatrix, this.worldMatrix)
  } else {
    // 没有矩阵传入，直接将局部矩阵拷贝到世界矩阵
    m4.copy(this.localMatrix, this.worldMatrix)
  }

  const worldMatrix = this.worldMatrix
  this.children.forEach(function (child) {
    child.updateWorldMatrix(worldMatrix)
  })
}

// 定义所以的节点
const sunNode = new Node()
sunNode.localMatrix = m4.translation(0, 0, 0)
sunNode.drawInfo = {
  uniforms: {
    u_colorOffset: [0.6, 0.6, 0, 1],
    u_colorMult: [0.4, 0.4, 0, 1],
  },
  programInfo: programInfo,
  bufferInfo: sphereBufferInfo,
}

const earthNode = new Node()
earthNode.localMatrix = m4.translation(100, 0, 0) // 地球距离太阳 100 个单位距离
earthNode.drawInfo = {
  uniforms: {
    u_colorOffset: [0.2, 0.5, 0.8, 1], // 蓝绿色
    u_colorMult: [0.8, 0.5, 0.2, 1],
  },
  programInfo: programInfo,
  bufferInfo: sphereBufferInfo,
}

const moonNode = new Node()
moonNode.localMatrix = m4.translation(20, 0, 0) // 月球离地球 20 个单位距离
moonNode.drawInfo = {
  uniforms: {
    u_colorOffset: [0.6, 0.6, 0.6, 1], // 灰色
    u_colorMult: [0.1, 0.1, 0.1, 1],
  },
  programInfo: programInfo,
  bufferInfo: sphereBufferInfo,
}

// 关联物体

moonNode.setParent(earthNode)
earthNode.setParent(sunNode)
