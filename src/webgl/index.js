function evenCirclePoints(pointsNum = 0, radius = 1) {
  const points = [];
  if (pointsNum === 0) {
    return points;
  }
  for (let i = 0; i < pointsNum; i++) {
    const angle = (i * Math.PI * 2) / pointsNum;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    points.push([x, y]);
  }

  return points;
}

const ret = evenCirclePoints(12);

console.log(ret);

function cross(a, b) {
  const [a_x, a_y, a_z] = a;
  const [b_x, b_y, b_z] = b;
  return [a_y * b_z - a_z * b_y, a_z * b_x - a_x * b_z, a_x * b_y - a_y * b_x];
}

function subtractVectors(a, b) {
  const [a_x, a_y, a_z] = a;
  const [b_x, b_y, b_z] = b;
  return [a_x - b_x, a_y - b_y, a_z - b_z];
}

function normalize(v) {
  const [x, y, z] = v;
  const length = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  if (length > 0.00001) {
    return [x / length, y / length, z / length];
  } else {
    return [0, 0, 0];
  }
}

/** camera lookAt */
function lookAt(position, target, up) {
  const zAxis = normalize(subtractVectors(position, target));
  const xAxis = normalize(cross(up, zAxis));
  const yAxis = normalize(cross(zAxis, xAxis));

  return [
    xAxis[0],
    xAxis[1],
    xAxis[2],
    0,
    yAxis[0],
    yAxis[1],
    yAxis[2],
    0,
    zAxis[0],
    zAxis[1],
    zAxis[2],
    0,
    position[0],
    position[1],
    position[2],
    1,
  ];
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

console.log(`is 2 is power of 2 ? ${isPowerOf2(2)}`);
console.log(`is 4 is power of 2 ? ${isPowerOf2(4)}`);
console.log(`is 5 is power of 2 ? ${isPowerOf2(5)}`);
console.log(`is 8 is power of 2 ? ${isPowerOf2(8)}`);
console.log(`is 512 is power of 2 ? ${isPowerOf2(512)}`);
