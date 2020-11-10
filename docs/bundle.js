(function () {
  'use strict';

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {ReadonlyVec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/

  function scale(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }

  let VertexShader = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;

    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;

    varying vec4 vColor;

    varying float displacement;

    void main(){
        displacement = cos(aPosition.x) * cos(aPosition.z);
 
        gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);

        float ndcZ = gl_Position.z / gl_Position.w;
        float depthValue = .5 * ndcZ - .5;

        vColor = vec4(depthValue, depthValue, depthValue, 1.0);
        vColor = (vColor + 1.0) / 2.0;
    }
`;

  // vColor = vec4(aNormal.x, aNormal.y, aNormal.z, 1.0);

  let FragmentShader = `
    precision mediump float;
    varying vec4 vColor;

    void main() {
        gl_FragColor = vColor;
    }
`;
  // `
  //     precision mediump float;
  //     varying vec4 vColor;
  //     varying float displacement;

  //     void main() {
  //         vec4 newColor = vColor;
  //         newColor.r -= displacement;
  //         newColor.g = 0.0;
  //         newColor.b += displacement;
  //         gl_FragColor = newColor;
  //     }
  // `

  // BEGIN exercise plane
  let Plane = ( function() {

  	function createVertexData() {
  		let n = 100;
  		let m = 100;

  		// Positions.
  		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
  		let vertices = this.vertices;
  		// Normals.
  		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
  		let normals = this.normals;
  		// Index data.
  		this.indicesLines = new Uint16Array(2 * 2 * n * m);
  		let indicesLines = this.indicesLines;
  		this.indicesTris = new Uint16Array(3 * 2 * n * m);
  		let indicesTris = this.indicesTris;

  		let du = 20 / n;
  		let dv = 20 / m;
  		// Counter for entries in index array.
  		let iLines = 0;
  		let iTris = 0;

  		// Loop u.
  		for(let i = 0, u = -10; i <= n; i++, u += du) {
  			// Loop v.
  			for(let j = 0, v = -10; j <= m; j++, v += dv) {

  				let iVertex = i * (m + 1) + j;

  				let x = u;
  				let y = 0;
  				let z = v;

  				// Set vertex positions.
  				vertices[iVertex * 3] = x;
  				vertices[iVertex * 3 + 1] = y;
  				vertices[iVertex * 3 + 2] = z;

  				// Calc and set normals.
  				normals[iVertex * 3] = 0;
  				normals[iVertex * 3 + 1] = 1;
  				normals[iVertex * 3 + 2] = 0;

  				// Set index.
  				// Line on beam.
  				if(j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - 1;
  					indicesLines[iLines++] = iVertex;
  				}
  				// Line on ring.
  				if(j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - (m + 1);
  					indicesLines[iLines++] = iVertex;
  				}

  				// Set index.
  				// Two Triangles.
  				if(j > 0 && i > 0) {
  					indicesTris[iTris++] = iVertex;
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  					//
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1) - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  				}
  			}
  		}
  		return { vertices: vertices, normals: normals, indicesLines: indicesLines, indicesTris: indicesTris };
  	}

  	return {
  		createVertexData : createVertexData
  	}

  }());
  //END exercise plane

  let Sphere = ( function() {

  	function createVertexData() {
  		let n = 30;
  		let m = 30;

  		// Positions.
  		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
  		let vertices = this.vertices;
  		// Normals.
  		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
  		let normals = this.normals;
  		// Index data.
  		this.indicesLines = new Uint16Array(2 * 2 * n * m);
  		let indicesLines = this.indicesLines;
  		this.indicesTris = new Uint16Array(3 * 2 * n * m);
  		let indicesTris = this.indicesTris;

  		let du = 2 * Math.PI / n;
  		let dv = Math.PI / m;
  		let r = 1;
  		// Counter for entries in index array.
  		let iLines = 0;
  		let iTris = 0;

  		// Loop angle u.
  		for(let i = 0, u = 0; i <= n; i++, u += du) {
  			// Loop angle v.
  			for(let j = 0, v = 0; j <= m; j++, v += dv) {

  				let iVertex = i * (m + 1) + j;

  				let x = r * Math.sin(v) * Math.cos(u);
  				let y = r * Math.sin(v) * Math.sin(u);
  				let z = r * Math.cos(v);

  				// Set vertex positions.
  				vertices[iVertex * 3] = x;
  				vertices[iVertex * 3 + 1] = y;
  				vertices[iVertex * 3 + 2] = z;

  				// Calc and set normals.
  				let vertexLength = Math.sqrt(x * x + y * y + z * z);
  				normals[iVertex * 3] = x / vertexLength;
  				normals[iVertex * 3 + 1] = y / vertexLength;
  				normals[iVertex * 3 + 2] = z / vertexLength;

  				normals[iVertex * 3] = .5;
  				normals[iVertex * 3 + 1] = .5;
  				normals[iVertex * 3 + 2] = .5;

  				// Set index.
  				// Line on beam.
  				if(j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - 1;
  					indicesLines[iLines++] = iVertex;
  				}
  				// Line on ring.
  				if(j > 0 && i > 0) {
  					indicesLines[iLines++] = iVertex - (m + 1);
  					indicesLines[iLines++] = iVertex;
  				}

  				// Set index.
  				// Two Triangles.
  				if(j > 0 && i > 0) {
  					indicesTris[iTris++] = iVertex;
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  					//
  					indicesTris[iTris++] = iVertex - 1;
  					indicesTris[iTris++] = iVertex - (m + 1) - 1;
  					indicesTris[iTris++] = iVertex - (m + 1);
  				}
  			}
  		}
  		return { vertices: vertices, normals: normals, indicesLines: indicesLines, indicesTris: indicesTris };
  	}

  	return {
  		createVertexData : createVertexData
  	}

  }());

  let App = (function () {

  	let gl;

  	// The shader program object is also used to
  	// store attribute and uniform locations.
  	let prog;

  	// Array of model objects.
  	let models = [];

  	let camera = {
  		// Initial position of the camera.
  		eye: [0, 1, 4],
  		// Point to look at.
  		center: [0, 0, 0],
  		// Roll and pitch of the camera.
  		up: [0, 1, 0],
  		// Opening angle given in radian.
  		// radian = degree*2*PI/360.
  		fovy: 60.0 * Math.PI / 180,
  		// Camera near plane dimensions:
  		// value for left right top bottom in projection.
  		lrtb: 2.0,
  		// View matrix.
  		vMatrix: create(),
  		// Projection matrix.
  		pMatrix: create(),
  		// Projection types: ortho, perspective, frustum.
  		projectionType: "perspective",
  		// Angle to Z-Axis for camera when orbiting the center
  		// given in radian.
  		zAngle: 0,
  		yAngle: 0,
  		// Distance in XZ-Plane from center when orbiting.
  		distance: 4,
  	};

  	function start() {
  		init();
  		render();
  	}

  	function init() {
  		initWebGL();
  		initShaderProgram();
  		initUniforms();
  		initModels();
  		initEventHandler();
  		initPipline();
  	}

  	function initWebGL() {
  		// Get canvas and WebGL context.
  		let canvas = document.getElementById('canvas');
  		gl = canvas.getContext('webgl');
  		gl.viewportWidth = canvas.width;
  		gl.viewportHeight = canvas.height;
  	}

  	/**
  	 * Init pipeline parameters that will not change again. 
  	 * If projection or viewport change, their setup must
  	 * be in render function.
  	 */
  	function initPipline() {
  		gl.clearColor(.95, .95, .95, 1);

  		// Backface culling.
  		gl.frontFace(gl.CCW);
  		gl.enable(gl.CULL_FACE);
  		gl.cullFace(gl.BACK);

  		// Depth(Z)-Buffer.
  		gl.enable(gl.DEPTH_TEST);

  		// Polygon offset of rastered Fragments.
  		gl.enable(gl.POLYGON_OFFSET_FILL);
  		gl.polygonOffset(0.5, 0);

  		// Set viewport.
  		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  		// Init camera.
  		// Set projection aspect ratio.
  		camera.aspect = gl.viewportWidth / gl.viewportHeight;
  	}

  	function initShaderProgram() {
  		// Init vertex shader.
  		let vs = initShader(gl.VERTEX_SHADER, VertexShader);
  		// Init fragment shader.
  		let fs = initShader(gl.FRAGMENT_SHADER, FragmentShader);
  		// Link shader into a shader program.
  		prog = gl.createProgram();
  		gl.attachShader(prog, vs);
  		gl.attachShader(prog, fs);
  		gl.bindAttribLocation(prog, 0, "aPosition");
  		gl.linkProgram(prog);
  		gl.useProgram(prog);
  	}

  	/**
  	 * Create and init shader from source.
  	 * 
  	 * @parameter shaderType: openGL shader type.
  	 * @parameter SourceTagId: Id of HTML Tag with shader source.
  	 * @returns shader object.
  	 */
  	function initShader(shaderType, shaderSource) {
  		let shader = gl.createShader(shaderType);
  		// let shaderSource = document.getElementById(SourceTagId).text;
  		gl.shaderSource(shader, shaderSource);
  		gl.compileShader(shader);
  		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  			console.log(SourceTagId + ": " + gl.getShaderInfoLog(shader));
  			return null;
  		}
  		return shader;
  	}

  	function initUniforms() {
  		// Projection Matrix.
  		prog.pMatrixUniform = gl.getUniformLocation(prog, "uPMatrix");

  		// Model-View-Matrix.
  		prog.mvMatrixUniform = gl.getUniformLocation(prog, "uMVMatrix");
  	}

  	function initModels() {
  		createModel(Plane.createVertexData(), "wireframe", [0, -.8, 0], [0, 0, 0],
  			[1, 1, 1]);

  		// fillstyle
  		let fs = "fill";
  		let [x, y, z] = [0, 0, 0];
  		createModel(Sphere.createVertexData(), fs, [x, y, -1.5], [0, 0, 0],
  			[.75, .75, .75]);
  		createModel(Sphere.createVertexData(), fs, [x, y, 0], [0, 0, 0],
  			[.5, .5, .5]);
  		createModel(Sphere.createVertexData(), fs, [x, y, 1.5], [0, 0, 0],
  			[.25, .25, .25]);
  	}

  	/**
  	 * Create model object, fill it and push it in models array.
  	 * 
  	 * @parameter geometryname: string with name of geometry.
  	 * @parameter fillstyle: wireframe, fill, fillwireframe.
  	 */
  	function createModel(geometry, fillstyle, translate, rotate, scale) {
  		let model = {};
  		model.fillstyle = fillstyle;
  		initDataAndBuffers(model, geometry);
  		initTransformations(model, translate, rotate, scale);

  		models.push(model);
  	}

  	/**
  	 * Set scale, rotation and transformation for model.
  	 */
  	function initTransformations(model, translate, rotate, scale) {
  		// Store transformation vectors.
  		model.translate = translate;
  		model.rotate = rotate;
  		model.scale = scale;

  		// Create and initialize Model-Matrix.
  		model.mMatrix = create();

  		// Create and initialize Model-View-Matrix.
  		model.mvMatrix = create();
  	}

  	/**
  	 * Init data and buffers for model object.
  	 * 
  	 * @parameter model: a model object to augment with data.
  	 * @parameter geometryname: string with name of geometry.
  	 */
  	function initDataAndBuffers(model, geometry) {
  		// Provide model object with vertex data arrays.
  		// Fill data arrays for Vertex-Positions, Normals, Index data:
  		// vertices, normals, indicesLines, indicesTris;
  		// Pointer this refers to the window.
  		// this[geometryname]['createVertexData'].apply(model);
  		Object.assign(model, geometry);

  		// Setup position vertex buffer object.
  		model.vboPos = gl.createBuffer();
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
  		gl.bufferData(gl.ARRAY_BUFFER, model.vertices, gl.STATIC_DRAW);
  		// Bind vertex buffer to attribute variable.
  		prog.positionAttrib = gl.getAttribLocation(prog, 'aPosition');
  		gl.enableVertexAttribArray(prog.positionAttrib);

  		// Setup normal vertex buffer object.
  		model.vboNormal = gl.createBuffer();
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
  		gl.bufferData(gl.ARRAY_BUFFER, model.normals, gl.STATIC_DRAW);
  		// Bind buffer to attribute variable.
  		prog.normalAttrib = gl.getAttribLocation(prog, 'aNormal');
  		gl.enableVertexAttribArray(prog.normalAttrib);

  		// Setup lines index buffer object.
  		model.iboLines = gl.createBuffer();
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
  		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesLines,
  			gl.STATIC_DRAW);
  		model.iboLines.numberOfElements = model.indicesLines.length;
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  		// Setup triangle index buffer object.
  		model.iboTris = gl.createBuffer();
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
  		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesTris,
  			gl.STATIC_DRAW);
  		model.iboTris.numberOfElements = model.indicesTris.length;
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  	}

  	function initEventHandler() {

  		var deltaRotate = Math.PI / 36;


  		window.onkeydown = function (evt) {
  			let key = evt.which ? evt.which : evt.keyCode;
  			let c = String.fromCharCode(key);

  			// Change projection of scene.
  			switch (c) {
  				case ('W'):
  					// Orbit camera.
  					camera.yAngle -= deltaRotate;
  					break;
  				case ('A'):
  					// Orbit camera.
  					camera.zAngle += deltaRotate;
  					break;
  				case ('S'):
  					// Orbit camera.
  					camera.yAngle += deltaRotate;
  					break;
  				case ('D'):
  					// Orbit camera.
  					camera.zAngle -= deltaRotate;
  					break;
  			}

  			// Render the scene again on any key pressed.
  			render();
  		};
  	}


  	function initEventHandler() {
  		// Rotation step.
  		let deltaRotate = Math.PI / 60;

  		window.onkeydown = function (evt) {
  			let key = evt.which ? evt.which : evt.keyCode;
  			let c = String.fromCharCode(key);
  			// console.log(evt);
  			// Use shift key to change sign.
  			let sign = evt.shiftKey ? -1 : 1;

  			// Change projection of scene.
  			switch (c) {
  				case ('W'):
  					// Orbit camera.
  					camera.yAngle -= deltaRotate;
  					break;
  				case ('A'):
  					// Orbit camera.
  					camera.zAngle += deltaRotate;
  					break;
  				case ('S'):
  					// Orbit camera.
  					camera.yAngle += deltaRotate;
  					break;
  				case ('D'):
  					// Orbit camera.
  					camera.zAngle -= deltaRotate;
  					break;
  			}

  			// Render the scene again on any key pressed.
  			render();
  		};
  	}

  	/**
  	 * Run the rendering pipeline.
  	 */
  	function render() {
  		// Clear framebuffer and depth-/z-buffer.
  		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  		setProjection();

  		calculateCameraOrbit();

  		// Set view matrix depending on camera.
  		lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);

  		// Loop over models.
  		for (let i = 0; i < models.length; i++) {
  			// Update modelview for model.
  			updateTransformations(models[i]);

  			// Set uniforms for model.
  			gl.uniformMatrix4fv(prog.mvMatrixUniform, false,
  				models[i].mvMatrix);

  			draw(models[i]);
  		}
  	}

  	function calculateCameraOrbit() {
  		// Calculate x,z position/eye of camera orbiting the center.
  		var x = 0, y = 1, z = 2;

  		camera.eye[x] = camera.center[x];
  		camera.eye[y] = camera.center[y];
  		camera.eye[z] = camera.center[z];
  		camera.eye[x] += camera.distance * Math.sin(camera.zAngle);
  		camera.eye[y] += camera.distance * Math.sin(camera.yAngle);
  		camera.eye[z] += camera.distance * Math.cos(camera.zAngle);
  	}

  	function setProjection() {
  		let v;
  		// Set projection Matrix.
  		switch (camera.projectionType) {
  			case ("ortho"):
  				v = camera.lrtb;
  				ortho(camera.pMatrix, -v, v, -v, v, -10, 10);
  				break;
  			case ("frustum"):
  				v = camera.lrtb;
  				frustum(camera.pMatrix, -v / 2, v / 2, -v / 2, v / 2, 1, 10);
  				break;
  			case ("perspective"):
  				perspective(camera.pMatrix, camera.fovy,
  					camera.aspect, 1, 10);
  				break;
  		}
  		// Set projection uniform.
  		gl.uniformMatrix4fv(prog.pMatrixUniform, false, camera.pMatrix);
  	}

  	/**
  	 * Update model-view matrix for model.
  	 */
  	function updateTransformations(model) {

  		// Use shortcut variables.
  		let mMatrix = model.mMatrix;
  		let mvMatrix = model.mvMatrix;

  		// mat4.copy(mvMatrix, camera.vMatrix);

  		// Reset matrices to identity.         
  		identity(mMatrix);
  		identity(mvMatrix);

  		// Translate.
  		translate(mMatrix, mMatrix, model.translate);
  		// Rotate.
  		rotateX(mMatrix, mMatrix, model.rotate[0]);
  		rotateY(mMatrix, mMatrix, model.rotate[1]);
  		rotateZ(mMatrix, mMatrix, model.rotate[2]);
  		// Scale
  		scale(mMatrix, mMatrix, model.scale);

  		// Combine view and model matrix
  		// by matrix multiplication to mvMatrix.        
  		multiply(mvMatrix, camera.vMatrix, mMatrix);
  	}

  	function draw(model) {
  		// Setup position VBO.
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
  		gl.vertexAttribPointer(prog.positionAttrib, 3, gl.FLOAT, false,
  			0, 0);

  		// Setup normal VBO.
  		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
  		gl.vertexAttribPointer(prog.normalAttrib, 3, gl.FLOAT, false, 0, 0);

  		// Setup rendering tris.
  		let fill = (model.fillstyle.search(/fill/) != -1);
  		if (fill) {
  			gl.enableVertexAttribArray(prog.normalAttrib);
  			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
  			gl.drawElements(gl.TRIANGLES, model.iboTris.numberOfElements,
  				gl.UNSIGNED_SHORT, 0);
  		}

  		// Setup rendering lines.
  		let wireframe = (model.fillstyle.search(/wireframe/) != -1);
  		if (wireframe) {
  			gl.disableVertexAttribArray(prog.normalAttrib);
  			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
  			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
  			gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
  				gl.UNSIGNED_SHORT, 0);
  		}
  	}

  	// App interface.
  	return {
  		start: start
  	}

  }());

  document.body.onload = () => {
      App.start();
  };

}());
//# sourceMappingURL=bundle.js.map
