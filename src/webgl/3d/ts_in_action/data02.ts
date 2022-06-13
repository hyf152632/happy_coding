// js 数组 任意类型，动态长度 --》 效率低，占用内存大
// 类型数组

// ArrayBuffer对象用来表示通用的、固定长度的原始二进制数据缓冲区。

// 知道有一个设计，并且知道为什么，然后具体细节可以之后用到时候再去研究。

// ArrayBuffer不能直接被操作，而是要通过JS / TS 中的DataView对象或类型数组对象(TypedArray)来操作，它们会将缓冲区中的数据(相当于 CArrayBuffer中的pData指针指向的内存区块)**表示为特定格式**，并通过这些格式来读写缓冲区的内容。

let buffer = new ArrayBuffer(16);

let view0 = new DataView(buffer);

view0.setFloat32(8, 99.80);
view0.setUint16(8 + 4, 2048);

view0.getFloat32(8);
view0.getUint16(8 + 4);

let view1 = new DataView(buffer, 8, 8);

view1.getFloat32(0);
view1.getUint16(4);

// 在某些情况下，可能只需要读写一种类型的数 据，例如在WebGL中，我们仅需要浮点数表示的顶点坐 标信息，如果用DataView操作略显麻烦。此时不如提 供专用的二进制浮点数操作视图，这样更加方便。这 就是JS/TS中Float32Array的用途所在。

// 类型数组， 数字类型，定长， DataView 对象特殊情况