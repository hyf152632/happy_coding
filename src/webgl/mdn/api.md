WebGLRenderingContext(gl);
.canvas;
.drawingBufferWidth;(= canvas width);
.drawingBufferHeight;(= canvas height);

.activeTexture;
.attachShader;

.bindAttribLocation;
.bindBuffer(target, buffer);
target: ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER;
.bindFramebuffer(target, framebuffer);
target: FRAMEBUFFER;
.bindRenderbuffer(target, renderbuffer);
target: RENDERBUFFER;
.bindTexture(target, texture);
target: TEXTURE_2D, TEXTURE_CUBE_MAP;
.blendColor(r, g, b, a);
.blendEquation(mode);
.blendEquationSeparate(modeRGB, modeAlpha);
.blendFunc(sfactor, dfactor);
.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
.bufferData(target, size, usage);
.bufferSubData(target, offset, ?data);
updates a subset of a buffer object's data store

.checkFramebufferStatus(target);
target: FRAMEBUFFER;
.clear(mask);
mask: COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT, STENCIL_BUFFER_BIT;
.clearColor(red, green, blue, alpha);
.clearDepth(0 - 1, default 1);
.clearStencil(default 0);
.colorMask(red, green, blue, alpha);
boolean;
.compileShader(shader);
compiles into binary data
.compressedTexImage2D(target, level, internalformat, width, height, depth, border, imageSize, offset, pixels);
.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, offset, pixels);
.copyTexImage2D(target, level, internalformat, x, y, width, height, border);
.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
.createBuffer();
.createFramebuffer();
.createProgram();
.createRenderbuffer();
.createShader(type);
.createTexture();
.cullFace(mode);
mode: FRONT, BACK, FRONT_AND_BACK;
culled 剔除

.deleteBuffer(buffer);
.deleteFramebuffer(framebuffer);
.deleteProgram(program);
.deleteRenderbuffer(buffer);
.deleteShader(shader);
.deleteTexture(texture);
.depthFunc(func);
specifies a function that compares incoming pixel depth to the current depth buffer value
.depthMask(boolean);
sets whether **writing to the depth buffer** is enabled or disabled.
.depthRange(zNear, zFar);
.detachShader(program, shader);
.disable(capability);
eg: gl.DITHER; gl.SCISSOR_TEST; gl.STENCIL_TEST; gl.DEPTH_TEST;
.isEnabled(capability);
.disableVertexAttribArray(index);
index: specifying the index of the vertex attribute to disable;
.drawArrays(mode, first, count);
renders primitives from array data;
.drawElements(mode, count, type, offset);
renders primitives from array data;
enable(capability);
.enableVertexAttribArray(index);  
turns on the generic vertex attribute array at the specified index into the list of attribute arrays;
you can get the index by calling `getAttribLocation`;
.finish();
.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
attaches a renderbuffer as a logical buffer to the currently bound framebuffer object
.framebufferTexture2D(target, attachment, textarget, texture, level);
attaches a texture to a framebuffer
.frontFace(mode);
mipmaps **are used** to create distance with objects. a higher-resolution mipmap is used for objects that are closer, and a lower-resolution mipmap is used for objects that are farther away. it **starts with** the resolution of the texture image and **halves** the resolution **until** a 1x1 demension texture image is created.
.generateMipmap(target);
.getActiveAttrib(program, index);
.getActiveUniform(program, index);
.getAttachedShaders(program);
.getAttribLocation(program, name);
.getBufferParameter(target, pname);
.getContextAttributes();
`gl.getContextAttributes()`;
.getError();
.getExtension(name);
.getFramebufferAttachmentParameter(target, attachment, pname);
.getParameter();
many parameters
.getProgramInfoLog(program);
.getProgramParameter(program, pname);
.getRenderbufferParameter(target, pname);
.getShaderInfoLog(shader);
.getShaderParameter(shader, pname);
.getShaderPrecisionFormat(shadertype, precisiontype);
.getShaderSource(shader);
a string containing the source code of the shader
.getSupportedExtensions();
.getTexParameter(target, pname);
.getUniform(program, location);
.getUniformLocation(program, name);
.getVertexAttrib(index, name);
.getVertexAttribOffset(index, pname);
.hint(target, mode);
.isBuffer(buffer);
.isContextLost();
.isEnabled(capability);
.isFramebuffer(framebuffer);
.isProgram(program);
.isRenderbuffer(renderbuffer);
.isShader(shader);
.isTexture(texture);
.lineWidth();
.linkProgram(program);
.makeXRCompatible();
.pixelStorei(pname, param);
.polygonOffset(factor, units);
.readPixels(x, y, width, height, format, type, pixels);
.renderbufferStorage(target, internalformat, width, height);
.sampleCoverage(value, invert);
.scissor(x, y, width, height);
.shaderSource(shader, string);
.stencilFunc(func, ref, mask);
Stenciling enables and disables drawing on a per-pixel basis. It is typically used in multipass rendering to achieve special effects.
.stencilFuncSeparate(face, func, ref, mask);
.stencilMask(mask);
.stencilMaskSeparate(face, mask);
.stencilOp(fail, zfail, zpass);
.stencilOpSeparate(face, fail, zfail, zpass);
.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
.texParameterf()
.texParameteri()
.texSubImage2D()
.uniform[1234][fi][v](location, value);
.uniformMatrix[234]fv(location, transpose, value);
.useProgram(program);
.validateProgram(program);
.vertexAttrib[1234]f[v](index, value...);
.vertexAttribPointer(index, size, type, normalized, stride, offset);
binds the buffer **currently** bound to `gl.ARRAY_BUFFER` to a generic vertex attribute of the current vertex buffer object and specifies its layout.

Vertex Buffer Object (VBO)

.viewport(x, y, width, height);
