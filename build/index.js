class Signal extends Set {
  constructor() {
    super();

    this._onceCallbacksMap = new Map();
  }

  add(value, { once = false } = {}) {
    if (once) {
      const onceCallbackWrapper = (...args) => {
        value(...args);
        this.delete(value);
      };
      this._onceCallbacksMap.set(value, onceCallbackWrapper);
      return super.add(onceCallbackWrapper);
    } else {
      return super.add(value);
    }
  }

  delete(value) {
    this._onceCallbacksMap.delete(value);
    return super.delete(this._onceCallbacksMap.get(value) || value);
  }

  dispatch(value) {
    for (const callback of this) {
      callback(value);
    }
  }
}

const DELTA_TIME_BASE = 1 / 60;

class Ticker extends Signal {
  constructor() {
    super();

    this._updateBinded = this._update.bind(this);

    this.time = window.performance.now() * .001;
    this.reset();

    document.addEventListener("visibilitychange", () => {
      this.reset();
    });

    this._update();
  }

  reset() {
    this._previousTime = window.performance.now() * .001;
    this.deltaTime = DELTA_TIME_BASE;
    this.smoothDeltatime = this.deltaTime;
    this.timeScale = 1;
    this.smoothTimeScale = this.timeScale;
  }

  _update() {
    requestAnimationFrame(this._updateBinded);

    this.time = window.performance.now() * 0.001;
    this.deltaTime = this.time - this._previousTime;
    this.smoothDeltatime += (this.deltaTime - this.smoothDeltatime) * .05;
    this.timeScale = this.deltaTime / DELTA_TIME_BASE;
    this.smoothTimeScale = this.smoothDeltatime / DELTA_TIME_BASE;
    this._previousTime = this.time;

    this.dispatch();
  }
}

var Ticker$1 = new Ticker();

class TickerElement extends HTMLElement {
  constructor({ autoplay = false, background = false } = {}) {
    super();

    this._autoplay = autoplay || this.hasAttribute("autoplay");
    this._background = background || this.hasAttribute("background");

    this._paused = true;
    this._pausedByUser = true;
    this._pausedByBlur = false;

    this._updateBinded = this.update.bind(this);
    this._onFocusChangeBinded = this._onFocusChange.bind(this);
  }

  connectedCallback() {
    if (!this._background) {
      window.top.addEventListener("blur", this._onFocusChangeBinded);
      window.top.addEventListener("focus", this._onFocusChangeBinded);
      document.addEventListener("visibilitychange", this._onFocusChangeBinded);
    }
    if (this._autoplay) {
      if (!window.top.document.hasFocus() && !this._background) {
        this._pausedByBlur = true;
        requestAnimationFrame(this._updateBinded);
      }
      this.play();
    }
  }

  disconnectedCallback() {
    this._pausedByBlur = true;
    window.top.removeEventListener("blur", this._onFocusChangeBinded);
    window.top.removeEventListener("focus", this._onFocusChangeBinded);
    document.removeEventListener("visibilitychange", this._onFocusChangeBinded);
  }

  get paused() {
    return this._paused;
  }

  get _pausedByUser() {
    return this.__pausedByUser;
  }

  set _pausedByUser(value) {
    this.__pausedByUser = value;
    this._updatePlaybackState();
  }

  get _pausedByBlur() {
    return this.__pausedByBlur;
  }

  set _pausedByBlur(value) {
    this.__pausedByBlur = value;
    this._updatePlaybackState();
  }

  _onFocusChange(event) {
    switch (event.type) {
      case "visibilitychange":
        if (document.visibilityState !== "visible") {
          this._pausedByBlur = true;
        }
        break;
      case "blur":
        this._pausedByBlur = true;
        break;
      case "focus":
        this._pausedByBlur = false;
        break;
    }
  }

  _updatePlaybackState() {
    const paused = this._pausedByUser || this._pausedByBlur;

    if (paused === this._paused) {
      return;
    }

    this._paused = paused;

    if (this._paused) {
      Ticker$1.delete(this._updateBinded);
      this.dispatchEvent(new Event("pause"));
    } else {
      Ticker$1.add(this._updateBinded);
      this.dispatchEvent(new Event("play"));
    }
  }

  play() {
    this._pausedByUser = false;
  }

  pause() {
    this._pausedByUser = true;
  }

  update() { }
}

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var degree = Math.PI / 180;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
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
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
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
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
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
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
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
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
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
 * @param {mat4} a the matrix to rotate
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
 * @param {mat4} a the matrix to rotate
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
 * @param {mat4} a the matrix to rotate
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
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
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

class Matrix4 extends Float32Array {
  constructor(array = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) {
    super(array);
    return this;
  }

  set x(value) {
    this[12] = value;
  }

  get x() {
    return this[12];
  }

  set y(value) {
    this[13] = value;
  }

  get y() {
    return this[13];
  }

  set z(value) {
    this[14] = value;
  }

  get z() {
    return this[14];
  }

  set w(value) {
    this[15] = value;
  }

  get w() {
    return this[15];
  }

  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    if (m00.length) {
      return this.copy(m00);
    }
    set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return this;
  }

  translate(vector3, matrix4 = this) {
    translate(this, matrix4, vector3);
    return this;
  }

  rotateX(value, matrix4 = this) {
    rotateX(this, matrix4, value);
    return this;
  }

  rotateY(value, matrix4 = this) {
    rotateY(this, matrix4, value);
    return this;
  }

  rotateZ(value, matrix4 = this) {
    rotateZ(this, matrix4, value);
    return this;
  }

  scale(value, matrix4 = this) {
    scale(this, matrix4, typeof value === "number" ? [value, value, value] : value);
    return this;
  }

  multiply(matrix4a, matrix4b) {
    if (matrix4b) {
      multiply(this, matrix4a, matrix4b);
    } else {
      multiply(this, this, matrix4a);
    }
    return this;
  }

  identity() {
    identity(this);
    return this;
  }

  copy(matrix4) {
    copy(this, matrix4);
    return this;
  }

  fromPerspective({ fov, aspectRatio, near, far } = {}) {
    perspective(this, fov, aspectRatio, near, far);
    return this;
  }

  fromQuaternion(quaternion) {
    fromQuat(this, quaternion);
    return this;
  }

  setPosition(vector3) {
    this.x = vector3[0];
    this.y = vector3[1];
    this.z = vector3[2];
    return this;
  }

  invert(matrix4 = this) {
    invert(this, matrix4);
    return this;
  }
}

class Camera {
  constructor({ near = 0.01, far = 1000, aspectRatio = 1, fov = Math.PI / 3 } = {}) {
    this._near = near;
    this._far = far;
    this._aspectRatio = aspectRatio;
    this._fov = fov;

    this.transform = new Matrix4();
    this._inverseTransform = new Matrix4();
    this._projection = new Matrix4();
    this._projectionView = new Matrix4();

    this._updateProjection();
  }

  set near(value) {
    this._near = value;
    this._updateProjection();
  }

  get near() {
    return this._near;
  }

  set far(value) {
    this._far = value;
    this._updateProjection();
  }

  get far() {
    return this._far;
  }

  set fov(value) {
    this._fov = value;
    this._updateProjection();
  }

  get fov() {
    return this._fov;
  }

  set aspectRatio(value) {
    this._aspectRatio = value;
    this._updateProjection();
  }

  get aspectRatio() {
    return this._aspectRatio;
  }

  get inverseTransform() {
    return this._inverseTransform.invert(this.transform);
  }

  get projection() {
    return this._projection;
  }

  get projectionView() {
    return this._projectionView.copy(this.projection).multiply(this.inverseTransform);
  }

  _updateProjection() {
    this._projection.fromPerspective(this);
  }
}

// Object.defineProperty(Camera.prototype, "near", { enumerable: true });
// Object.defineProperty(Camera.prototype, "far", { enumerable: true });
// Object.defineProperty(Camera.prototype, "fov", { enumerable: true });
// Object.defineProperty(Camera.prototype, "aspectRatio", { enumerable: true });
// Object.defineProperty(Camera.prototype, "inverseTransform", { enumerable: true });
// Object.defineProperty(Camera.prototype, "projection", { enumerable: true });
// Object.defineProperty(Camera.prototype, "projectionView", { enumerable: true });

// From https://github.com/mrdoob/three.js/blob/master/src/geometries/BoxGeometry.js

class BoxMesh {
  constructor({
    width = 1,
    height = 1,
    depth = 1,
    widthSegments = 1,
    heightSegments = 1,
    depthSegments = 1,
    positions = true,
    normals = true,
    uvs = true,
    indices = true,
  }) {
    const indicesArray = [];
    const verticesArray = [];
    const normalsArray = [];
    const uvsArray = [];

    let numberOfVertices = 0;

    buildPlane("z", "y", "x", - 1, - 1, depth, height, width, depthSegments, heightSegments);
    buildPlane("z", "y", "x", 1, - 1, depth, height, - width, depthSegments, heightSegments);
    buildPlane("x", "z", "y", 1, 1, width, depth, height, widthSegments, depthSegments);
    buildPlane("x", "z", "y", 1, - 1, width, depth, - height, widthSegments, depthSegments);
    buildPlane("x", "y", "z", 1, - 1, width, height, depth, widthSegments, heightSegments);
    buildPlane("x", "y", "z", - 1, - 1, width, height, - depth, widthSegments, heightSegments);

    if (positions) {
      this.positions = new Float32Array(verticesArray);
    }

    if (normals) {
      this.normals = new Float32Array(normalsArray);
    }

    if (uvs) {
      this.uvs = new Float32Array(uvsArray);
    }

    if (indices) {
      this.indices = new Uint16Array(indicesArray);
    }

    function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
      const segmentWidth = width / gridX;
      const segmentHeight = height / gridY;

      const widthHalf = width / 2;
      const heightHalf = height / 2;
      const depthHalf = depth / 2;

      const gridX1 = gridX + 1;
      const gridY1 = gridY + 1;

      let vertexCounter = 0;

      let ix; let iy;

      const vector = {
        x: 0,
        y: 0,
        z: 0,
      };

      for (iy = 0; iy < gridY1; iy++) {
        const y = iy * segmentHeight - heightHalf;

        for (ix = 0; ix < gridX1; ix++) {
          const x = ix * segmentWidth - widthHalf;

          vector[u] = x * udir;
          vector[v] = y * vdir;
          vector[w] = depthHalf;

          if (positions) {
            verticesArray.push(vector.x, vector.y, vector.z);
          }

          vector[u] = 0;
          vector[v] = 0;
          vector[w] = depth > 0 ? 1 : - 1;

          if (normals) {
            normalsArray.push(vector.x, vector.y, vector.z);
          }

          if (uvs) {
            uvsArray.push(ix / gridX);
            uvsArray.push(1 - (iy / gridY));
          }

          vertexCounter += 1;
        }
      }

      if (indices) {
        for (iy = 0; iy < gridY; iy++) {
          for (ix = 0; ix < gridX; ix++) {
            const a = numberOfVertices + ix + gridX1 * iy;
            const b = numberOfVertices + ix + gridX1 * (iy + 1);
            const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
            const d = numberOfVertices + (ix + 1) + gridX1 * iy;

            indicesArray.push(a, b, d);
            indicesArray.push(b, c, d);
          }
        }
      }

      numberOfVertices += vertexCounter;
    }
  }
}

class GLBuffer {
  constructor({
    gl,
    data = null,
    target = gl.ARRAY_BUFFER,
    usage = gl.STATIC_DRAW
  } = { gl }) {
    this.gl = gl;
    this.target = target;
    this.usage = usage;

    this._buffer = this.gl.createBuffer();

    if (data) {
      this.data = data;
    }
  }

  set data(value) {
    this._data = value;

    this.bind();
    this.gl.bufferData(this.target, this._data, this.usage);
    this.unbind();
  }

  get data() {
    return this._data;
  }

  bind({
    target = this.target,
    index = undefined,
    offset = 0,
    size = undefined
  } = {}) {
    if (index === undefined) {
      this.gl.bindBuffer(target, this._buffer);
    } else if (size === undefined) {
      this.gl.bindBufferBase(target, index, this._buffer);
    } else {
      this.gl.bindBufferRange(target, index, this._buffer, offset, size);
    }
  }

  unbind({
    target = this.target,
    index = undefined,
    offset = 0,
    size = undefined
  } = {}) {
    if (index === undefined) {
      this.gl.bindBuffer(target, null);
    } else if (size === undefined) {
      this.gl.bindBufferBase(target, index, null);
    } else {
      this.gl.bindBufferRange(target, index, null, offset, size);
    }
  }
}

class GLVertexAttribute {
  constructor({
    gl,
    data = undefined,
    buffer = new GLBuffer({
      gl
    }),
    size = 1,
    type = undefined,
    offset = 0,
    normalized = false,
    stride = 0,
    count = undefined,
    divisor = 0
  } = { gl }) {
    this.gl = gl;
    this.buffer = buffer;
    this.size = size;
    this.type = type;
    this.offset = offset;
    this.normalized = normalized;
    this.stride = stride;
    this.count = count;
    this.divisor = divisor;

    if (data) {
      this.data = data;
    }
  }

  set count(value) {
    this._count = value;
  }

  get count() {
    return this._count === undefined ? this.data.length / this.size : this._count;
  }

  set type(value) {
    this._type = value;
  }

  get type() {
    let type = this._type;
    if (!type) {
      if (this.data instanceof Float32Array || this.data instanceof Float64Array) {
        type = this.gl.FLOAT;
      } else if (this.data instanceof Uint8Array) {
        type = this.gl.UNSIGNED_BYTE;
      } else if (this.data instanceof Uint16Array) {
        type = this.gl.UNSIGNED_SHORT;
      } else if (this.data instanceof Uint32Array) {
        type = this.gl.UNSIGNED_INT;
      }
    }
    return type;
  }

  set data(value) {
    this.buffer.data = value;
  }

  get data() {
    return this.buffer.data;
  }
}

class GLMesh {
  constructor({
    gl,
    positions = undefined,
    normals = undefined,
    uvs = undefined,
    attributes = undefined,
    indices = undefined,
  } = { gl }) {
    this.gl = gl;

    this.gl.getExtension("OES_element_index_uint");

    this._drawElementsInstanced = () => { };
    this._drawArraysInstanced = () => { };
    const instancedArraysExtension = this.gl.getExtension("ANGLE_instanced_arrays");
    if (instancedArraysExtension) {
      this._drawElementsInstanced = instancedArraysExtension.drawElementsInstancedANGLE.bind(instancedArraysExtension);
      this._drawArraysInstanced = instancedArraysExtension.drawArraysInstancedANGLE.bind(instancedArraysExtension);
    } else if (this.gl.drawElementsInstanced) {
      this._drawElementsInstanced = this.gl.drawElementsInstanced.bind(this.gl);
      this._drawArraysInstanced = this.gl.drawArraysInstanced.bind(this.gl);
    }

    this.attributes = new Map(attributes);

    if (positions) {
      this.attributes.set("position", new GLVertexAttribute({
        gl,
        data: positions,
        size: 3,
      }));
    }

    if (normals) {
      this.attributes.set("normal", new GLVertexAttribute({
        gl,
        data: normals,
        size: 3,
      }));
    }

    if (uvs) {
      this.attributes.set("uv", new GLVertexAttribute({
        gl,
        data: uvs,
        size: 2,
      }));
    }

    for (const [key, value] of this.attributes) {
      if (!(value instanceof GLVertexAttribute)) {
        this.attributes.set(key, new GLVertexAttribute(Object.assign({
          gl,
        }, value)));
      }
    }

    if (indices && !(this.indices instanceof GLVertexAttribute)) {
      this.indices = new GLVertexAttribute(Object.assign({
        gl: this.gl,
        buffer: new GLBuffer({
          gl: this.gl,
          target: this.gl.ELEMENT_ARRAY_BUFFER,
        }),
      }, indices.length !== undefined ? { data: indices } : indices));
    }
  }

  draw({
    mode = this.gl.TRIANGLES,
    elements = !!this.indices,
    count = elements ? this.indices.count : this.attributes.get("position").count,
    offset = this.indices ? this.indices.offset : 0,
    type = elements ? this.indices.type : null,
    first = 0,
    instanceCount = undefined,
  } = {}) {
    if (elements) {
      if (instanceCount !== undefined) {
        this._drawElementsInstanced(mode, count, type, offset, instanceCount);
      } else {
        this.gl.drawElements(mode, count, type, offset);
      }
    } else {
      if (instanceCount !== undefined) {
        this._drawArraysInstanced(mode, first, count, instanceCount);
      } else {
        this.gl.drawArrays(mode, first, count);
      }
    }
  }
}

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy$1(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set$1(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

class Vector2 extends Float32Array {
  static distance(vector2a, vector2b) {
    return distance(vector2a, vector2b);
  }

  constructor(array = [0, 0]) {
    super(array);
    return this;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = value;
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = value;
  }

  set(x, y) {
    set$1(this, x, y);
    return this;
  }

  copy(vector2) {
    copy$1(this, vector2);
    return this;
  }

  add(vector2) {
    add(this, this, vector2);
    return this;
  }

  get size() {
    return length(this);
  }

  get squaredSize() {
    return squaredLength(this);
  }

  subtract(vector2) {
    subtract(this, this, vector2);
    return this;
  }

  negate(vector2 = this) {
    negate(this, vector2);
    return this;
  }

  cross(vector2a, vector2b) {
    cross(this, vector2a, vector2b);
    return this;
  }

  scale(value) {
    scale$1(this, this, value);
    return this;
  }

  normalize() {
    normalize(this, this);
  }

  dot(vector2) {
    return dot(this, vector2);
  }

  distance(vector2) {
    return Vector2.distance(this, vector2);
  }

  equals(vector2) {
    return exactEquals(this, vector2);
  }

  applyMatrix3(matrix3) {
    transformMat3(this, this, matrix3);
    return this;
  }

  applyMatrix4(matrix4) {
    transformMat4(this, this, matrix4);
    return this;
  }

  lerp(vector2, value) {
    lerp(this, this, vector2, value);
  }

  clone() {
    return new Vector2(this);
  }
}

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$1() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$1(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */

function copy$2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set$2(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function add$1(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function subtract$1(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale$2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance$1(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength$1(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */

function negate$1(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize$1(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function cross$1(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4$1(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);
  normalize$1(tempA, tempA);
  normalize$1(tempB, tempB);
  var cosine = dot$1(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length$1;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$1 = function () {
  var vec = create$1();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

class Vector3 extends Float32Array {
  constructor(array = [0, 0, 0]) {
    super(array);
    return this;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = value;
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = value;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = value;
  }

  set(x, y, z) {
    set$2(this, x, y, z);
    return this;
  }

  copy(vector3) {
    copy$2(this, vector3);
    return this;
  }

  add(vector3) {
    add$1(this, this, vector3);
    return this;
  }

  get size() {
    return length$1(this);
  }

  get squaredSize() {
    return squaredLength$1(this);
  }

  distance(vector3) {
    return distance$1(this, vector3);
  }

  subtract(vector3) {
    subtract$1(this, this, vector3);
    return this;
  }

  negate(vector3 = this) {
    negate$1(this, vector3);
    return this;
  }

  cross(vector3a, vector3b) {
    cross$1(this, vector3a, vector3b);
    return this;
  }

  scale(value) {
    scale$2(this, this, value);
    return this;
  }

  normalize() {
    normalize$1(this, this);
    return this;
  }

  dot(vector3) {
    return dot$1(this, vector3);
  }

  equals(vector3) {
    return exactEquals$1(this, vector3);
  }

  applyMatrix4(matrix4) {
    transformMat4$1(this, this, matrix4);
    return this;
  }

  angle(vector3) {
    return angle(this, vector3);
  }

  clone() {
    return new Vector3(this);
  }
}

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$2() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy$3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set$3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$2 = function () {
  var vec = create$2();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

class Vector4 extends Float32Array {
  constructor(array = [0, 0, 0, 0]) {
    super(array);
    return this;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = value;
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = value;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = value;
  }

  get w() {
    return this[3];
  }

  set w(value) {
    this[3] = value;
  }

  set(x, y, z, w) {
    set$3(this, x, y, z, w);
    return this;
  }
}

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create$3() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function copy$4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set$4(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity$1(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function invert$1(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function multiply$1(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */

function translate$1(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale$3(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/

function fromQuat$1(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}

class Matrix3 extends Float32Array {
  constructor(array = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
    super(array);
    return this;
  }

  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    set$4(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }

  translate(vector2, matrix3 = this) {
    translate$1(this, matrix3, vector2);
    return this;
  }

  rotate(value, matrix3 = this) {
    rotate(this, matrix3, value);
    return this;
  }

  scale(vector2, matrix3 = this) {
    scale$3(this, matrix3, vector2);
    return this;
  }

  multiply(matrix3a, matrix3b) {
    if (matrix3b) {
      multiply$1(this, matrix3a, matrix3b);
    } else {
      multiply$1(this, this, matrix3a);
    }
    return this;
  }

  identity() {
    identity$1(this);
    return this;
  }

  copy(matrix3) {
    copy$4(this, matrix3);
    return this;
  }

  fromMatrix4(matrix4) {
    fromMat4(this, matrix4);
    return this;
  }

  fromQuaternion(quaternion) {
    fromQuat$1(this, quaternion);
    return this;
  }

  fromBasis(vector3a, vector3b, vector3c) {
    this.set(
      vector3a[0],
      vector3a[1],
      vector3a[2],
      vector3b[0],
      vector3b[1],
      vector3b[2],
      vector3c[0],
      vector3c[1],
      vector3c[2]
    );
    return this;
  }

  invert(matrix3 = this) {
    invert$1(this, matrix3);
    return this;
  }
}

class Shader {
  static add(string = "void main() {}", chunks) {

    
    for (let [key, chunk] of chunks) {
      switch (key) {
        case "start":
          string = string.replace(/^(#version .*?\n(\s*precision highp float;\s)?)?([\s\S]*)/, `$1\n${chunk}\n$3`);
          break;
        case "end":
          string = string.replace(/(}\s*$)/, `\n${chunk}\n$1`);
          break;
        case "main":
          string = string.replace(/(\bvoid\b +\bmain\b[\s\S]*?{\s*)/, `$1\n${chunk}\n`);
          break;
        default:
          string = string.replace(key, chunk);
      }
    }

    return string;
  }

  constructor({ vertexShader = `#version 300 es
      void main() {
        gl_Position = vec4(0., 0., 0., 1.);
      }
    `, fragmentShader = `#version 300 es
      precision highp float;

      out vec4 fragColor;

      void main() {
        fragColor = vec4(1.);
      }
    `,
    dataTypeConctructors = {
      Vector2: class Vector2 extends Float32Array { constructor() { super(2); } },
      Vector3: class Vector3 extends Float32Array { constructor() { super(3); } },
      Vector4: class Vector4 extends Float32Array { constructor() { super(4); } },
      Matrix3: class Matrix3 extends Float32Array { constructor() { super([1, 0, 0, 0, 1, 0, 0, 0, 1]); } },
      Matrix4: class Matrix4 extends Float32Array { constructor() { super([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); } },
      Texture: class Texture { },
      TextureCube: class TextureCube { }
    },
    uniforms = [],
    vertexShaderChunks = [],
    fragmentShaderChunks = [],
    shaders = []
  } = {}) {
    this.uniforms = new Map();
    this.uniformTypes = new Map();

    this._dataTypeConctructors = dataTypeConctructors;

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this._vertexShaderChunks = [];
    this._fragmentShaderChunks = [];

    this.add({ vertexShaderChunks, fragmentShaderChunks, uniforms });

    for (let shader of shaders) {
      this.add(shader);
    }
  }

  add({ vertexShaderChunks = [], fragmentShaderChunks = [], uniforms = [] } = {}) {
    this.vertexShader = Shader.add(this.vertexShader, vertexShaderChunks);
    this._vertexShaderChunks.push(...vertexShaderChunks);
    this.fragmentShader = Shader.add(this.fragmentShader, fragmentShaderChunks);
    this._fragmentShaderChunks.push(...fragmentShaderChunks);
    for (let [key, value] of uniforms) {
      this.uniforms.set(key, value);
    }
  }

  set vertexShader(value) {
    this._vertexShader = value;
    this._parseUniforms(this._vertexShader);
  }

  get vertexShader() {
    return this._vertexShader;
  }

  set fragmentShader(value) {
    this._fragmentShader = value;
    this._parseUniforms(this._fragmentShader);
  }

  get fragmentShader() {
    return this._fragmentShader;
  }

  get vertexShaderChunks() {
    return this._vertexShaderChunks;
  }

  get fragmentShaderChunks() {
    return this._fragmentShaderChunks;
  }

  _addUniform(name, type, arrayLength) {

    if (this.uniforms.has(name)) {
      return;
    }

    let value;
    let typeMatch;

    this.uniformTypes.set(name, type);

    if (/float|double/.test(type)) {
      if (isNaN(arrayLength)) {
        value = 0;
      } else {
        value = new Array(arrayLength).fill(0);
      }
    } else if (/int|uint/.test(type)) {
      if (isNaN(arrayLength)) {
        value = 0;
      } else {
        value = new Array(arrayLength).fill(0);
      }
    } else if (/sampler2D/.test(type)) {
      if (isNaN(arrayLength)) {
        value = new this._dataTypeConctructors["Texture"]();
      } else {
        value = new Array(arrayLength).fill().map(value => new this._dataTypeConctructors["Texture"]());
      }
    } else if (/samplerCube/.test(type)) {
      if (isNaN(arrayLength)) {
        value = new this._dataTypeConctructors["TextureCube"]();
      } else {
        value = new Array(arrayLength).fill().map(value => new this._dataTypeConctructors["TextureCube"]());
      }
    } else if ((typeMatch = /(.?)vec(\d)/.exec(type))) {
      let vectorLength = typeMatch[2];
      if (isNaN(arrayLength)) {
        value = new this._dataTypeConctructors[`Vector${vectorLength}`]();
      } else {
        value = new Array(arrayLength).fill().map(value => new this._dataTypeConctructors[`Vector${vectorLength}`]());
      }
    } else if ((typeMatch = /mat(\d)/.exec(type))) {
      let matrixLength = typeMatch[1];
      if (isNaN(arrayLength)) {
        value = new this._dataTypeConctructors[`Matrix${matrixLength}`]();
      } else {
        value = new Array(arrayLength).fill().map(value => new this._dataTypeConctructors[`Matrix${matrixLength}`]());
      }
    } else {
      value = undefined;
    }

    this.uniforms.set(name, value);
  }

  /**
   * Parse shader strings to extract uniforms
   */
  _parseUniforms(string) {
    const structures = new Map();

    const structRegExp = /struct\s*(.*)\s*{\s*([\s\S]*?)}/g;
    const structMemberRegExp = /^\s*(.[^ ]+) (.[^ ;\[\]]+)\[? *(\d+)? *\]?/gm;
    let structMatch;
    while ((structMatch = structRegExp.exec(string))) {
      const structName = structMatch[1];
      const structString = structMatch[2];

      const structure = {};
      let structMemberMatch;
      while ((structMemberMatch = structMemberRegExp.exec(structString))) {
        const [, type, name, arrayLengthStr] = structMemberMatch;
        const arrayLength = parseInt(arrayLengthStr);
        structure[name] = {
          type,
          arrayLength
        };
      }

      structures.set(structName, structure);
    }

    const uniformsRegExp = /^\s*uniform (.[^ ]+) (.[^ ;\[\]]+)\[? *(\d+)? *\]?/gm;
    let uniformMatch;
    while ((uniformMatch = uniformsRegExp.exec(string))) {
      const [, type, name, arrayLengthStr] = uniformMatch;
      const arrayLength = parseInt(arrayLengthStr);

      const structure = structures.get(type);
      if (structure) {
        for (const key in structure) {
          this._addUniform(`${name}.${key}`, structure[key].type, structure[key].arrayLength);
        }
      } else {
        this._addUniform(name, type, arrayLength);
      }
    }
  }
}

class GLTexture {
  constructor({
    gl, 
    data = undefined, 
    width = undefined,
    height = undefined,
    target = (data && data.length) ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D,
    level = 0,
    internalFormat = gl.RGBA8 || gl.RGBA,
    format = gl.RGBA,
    type = gl.UNSIGNED_BYTE,
    minFilter = gl.NEAREST_MIPMAP_LINEAR, 
    magFilter = gl.LINEAR, 
    wrapS = gl.REPEAT, 
    wrapT = gl.REPEAT
  } = {gl}) {
    this.gl = gl;
    this._texture = this.gl.createTexture();
    this._width = width;
    this._height = height;
    this._dataWidth = undefined;
    this._dataHeight = undefined;
    this._target = target;
    this._unit = 0;
    
    this.level = level;
    this.internalFormat = internalFormat;
    this.format = format;
    this.type = type;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.data = data;
  }

  generateMipmap() {
    this.bind();
    this.gl.generateMipmap(this._target);
    this.unbind();
  }

  set data(value) {
    this._data = value;

    if(!this._data && !(this._width && this._height)) {
      return;
    }

    const data = (this._data && this._data.length) ? this._data : [this._data];

    if(data[0]) {
      this._dataWidth = data[0].width || data[0].videoWidth;
      this._dataHeight = data[0].height || data[0].videoHeight;
    }

    const count = this._target === this.gl.TEXTURE_CUBE_MAP ? 6 : 1;
    const target = this._target === this.gl.TEXTURE_CUBE_MAP ? this.gl.TEXTURE_CUBE_MAP_POSITIVE_X : this._target;

    this.bind();
    for (let i = 0; i < data.length; i++) {
      if(this.gl.getParameter(this.gl.VERSION).startsWith("WebGL 1.0") && this._dataWidth) {
        this.gl.texImage2D(target + i, this.level, this.internalFormat, this.format, this.type, data[i]);
      } else {
        this.gl.texImage2D(target + i, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, data[i]);
      }
    }
    this.unbind();
  }

  get data() {
    return this._data;
  }

  set width(value) {
    this._width = value;
    this.data = this.data;
  }

  get width() {
    return this._width || this._dataWidth;
  }

  set height(value) {
    this._height = value;
    this.data = this.data;
  }

  get height() {
    return this._height || this._dataHeight;
  }

  set minFilter(value) {
    if(this._minFilter === value) {
      return;
    }
    this._minFilter = value;
    this.bind();
    this.gl.texParameteri(this._target, this.gl.TEXTURE_MIN_FILTER, this._minFilter);
    this.unbind();
  }

  get minFilter() {
    return this._minFilter;
  }

  set magFilter(value) {
    if(this._magFilter === value) {
      return;
    }
    this._magFilter = value;
    this.bind();
    this.gl.texParameteri(this._target, this.gl.TEXTURE_MAG_FILTER, this._magFilter);
    this.unbind();
  }

  get magFilter() {
    return this._magFilter;
  }

  set wrapS(value) {
    if(this._wrapS === value) {
      return;
    }
    this._wrapS = value;
    this.bind();
    this.gl.texParameteri(this._target, this.gl.TEXTURE_WRAP_S, this._wrapS);
    this.unbind();
  }

  get wrapS() {
    return this._wrapS;
  }

  set wrapT(value) {
    if(this._wrapT === value) {
      return;
    }
    this._wrapT = value;
    this.bind();
    this.gl.texParameteri(this._target, this.gl.TEXTURE_WRAP_T, this._wrapT);
    this.unbind();
  }

  get wrapT() {
    return this._wrapT;
  }

  bind({unit = 0} = {}) {
    this._unit = unit;
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this._target, this._texture);
  }

  unbind({unit = this._unit} = {}) {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this._target, null);
  }

  clone() {
    return new GLTexture(this);
  }
}

class GLProgram extends Shader {
  constructor({
    gl,
    vertexShader = undefined,
    fragmentShader = undefined,
    uniforms = undefined,
    attributes = undefined,
    transformFeedbackVaryings = undefined,
    vertexShaderChunks = undefined,
    fragmentShaderChunks = undefined,
    shaders = undefined
  } = { gl }) {
    super({
      vertexShader,
      fragmentShader,
      uniforms,
      vertexShaderChunks,
      fragmentShaderChunks,
      shaders,
      dataTypeConctructors: {
        Vector2,
        Vector3,
        Vector4,
        Matrix3,
        Matrix4,
        Texture: class extends GLTexture {
          constructor() {
            super({ gl });
          }
        },
        TextureCube: class TextureCube { }
      }
    });

    this.gl = gl;
    this._program = gl.createProgram();
    this._attachedShaders = new Map();

    const self = this;

    this._vertexAttribDivisor = function () { };
    const instancedArraysExtension = this.gl.getExtension("ANGLE_instanced_arrays");
    if (instancedArraysExtension) {
      this._vertexAttribDivisor = instancedArraysExtension.vertexAttribDivisorANGLE.bind(instancedArraysExtension);
    } else if (this.gl.vertexAttribDivisor) {
      this._vertexAttribDivisor = this.gl.vertexAttribDivisor.bind(this.gl);
    }

    class Attributes extends Map {
      set(name, { buffer, location = self._attributesLocations.get(name), size, type = gl.FLOAT, normalized = false, stride = 0, offset = 0, divisor = 0 } = {}) {
        if (name instanceof Map) {
          for (let [key, value] of name) {
            this.set(key, value);
          }
          return;
        }
        buffer.bind();
        if (location === undefined) {
          location = gl.getAttribLocation(self._program, name);
          if (location === -1) {
            console.warn(`Attribute "${name}" is missing or never used`);
          }
          self._attributesLocations.set(name, location);
        }
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        buffer.unbind();
        self._vertexAttribDivisor(location, divisor);
        super.set(name, { buffer, size, type, normalized, stride, offset });
      }
    }

    class Uniforms extends Map {
      set(name, ...values) {
        let value = values[0];
        if (value === undefined) {
          return;
        }

        let location = self._uniformLocations.get(name);
        if (location === undefined) {
          location = gl.getUniformLocation(self._program, name);
          self._uniformLocations.set(name, location);
        }

        let texture;

        if (value.length === undefined) {
          if (value instanceof GLTexture) {
            let unit = 0;
            for (const [uniformName, type] of self.uniformTypes) {
              if (type.startsWith("sampler")) {
                if (uniformName === name) {
                  texture = value;
                  values = [unit];
                  break;
                }
                unit++;
              }
            }
          } else if (value instanceof Object) {
            for (let key in value) {
              self.uniforms.set(`${name}.${key}`, value[key]);
            }
            return;
          }
          if (values.length > 1) {
            value = self.uniforms.get(name);
            value.set(...values);
          } else {
            value = values;
          }
        } else if (value[0] instanceof Object) {
          for (let i = 0; i < value.length; i++) {
            if (value[0].length) {
              self.uniforms.set(`${name}[${i}]`, value[i]);
            } else {
              for (let key in value[i]) {
                self.uniforms.set(`${name}[${i}].${key}`, value[i][key]);
              }
            }
          }
          return;
        }

        if (location === null) {
          return;
        }

        const type = self.uniformTypes.get(name);

        if (type === "float" || type === "bool") {
          gl.uniform1fv(location, value);
        } else if (type === "vec2") {
          gl.uniform2fv(location, value);
        } else if (type === "vec3") {
          gl.uniform3fv(location, value);
        } else if (type === "vec4") {
          gl.uniform4fv(location, value);
        } else if (type === "int" || type.startsWith("sampler")) {
          gl.uniform1iv(location, value);
        } else if (type === "ivec2") {
          gl.uniform2iv(location, value);
        } else if (type === "ivec3") {
          gl.uniform3iv(location, value);
        } else if (type === "ivec4") {
          gl.uniform4iv(location, value);
        } else if (type === "mat3") {
          gl.uniformMatrix3fv(location, false, value);
        } else if (type === "mat4") {
          gl.uniformMatrix4fv(location, false, value);
        }

        super.set(name, texture || value);
      }
    }

    if (transformFeedbackVaryings) {
      this.gl.transformFeedbackVaryings(this._program, transformFeedbackVaryings, gl.INTERLEAVED_ATTRIBS);
    }

    this.vertexShader = this.vertexShader;
    this.fragmentShader = this.fragmentShader;

    this.use();

    this.attributes = new Attributes();

    const rawUniforms = this.uniforms;
    this.uniforms = new Uniforms();
    for (const [key, value] of rawUniforms) {
      this.uniforms.set(key, value);
    }
  }

  set vertexShader(value) {
    super.vertexShader = value;
    if (this.gl) {
      this._updateShader(this.gl.VERTEX_SHADER, this.vertexShader);
    }
  }

  get vertexShader() {
    return super.vertexShader;
  }

  set fragmentShader(value) {
    super.fragmentShader = value;
    if (this.gl) {
      this._updateShader(this.gl.FRAGMENT_SHADER, this.fragmentShader);
    }
  }

  get fragmentShader() {
    return super.fragmentShader;
  }

  use() {
    this.gl.useProgram(this._program);
  }

  _updateShader(type, source) {
    if (!source) {
      return;
    }

    if (this.gl.getParameter(this.gl.VERSION).startsWith("WebGL 1.0")) {
      source = source.replace(/#version.*?\n/g, "");
      source = source.replace(/\btexture\b/g, "texture2D");
      if (type === this.gl.VERTEX_SHADER) {
        source = source.replace(/\bin\b/g, "attribute");
        source = source.replace(/\bout\b/g, "varying");
      } else {
        source = source.replace(/\bin\b/g, "varying");
        const results = /out vec4 (.*?);/.exec(source);
        if (results) {
          const fragColorName = results[1];
          source = source.replace(/out.*?;/, "");
          source = source.replace(new RegExp(`\\b${fragColorName}\\b`, "g"), "gl_FragColor");
        }
      }
    }

    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    const shaderInfoLog = this.gl.getShaderInfoLog(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const lineNumberResults = /ERROR: 0:(\d+):/.exec(shaderInfoLog);
      if (lineNumberResults) {
        const lineNumber = parseFloat(lineNumberResults[1]);
        const shaderLines = source.split("\n");
        throw new Error(`${shaderInfoLog}\nat: ${shaderLines[lineNumber - 1].replace(/^\s*/, "")}`);
      } else {
        throw new Error(shaderInfoLog);
      }
      this.gl.deleteShader(shader);
      return;
    } else if (shaderInfoLog) {
      console.warn(shaderInfoLog);
    }

    const attachedShader = this._attachedShaders.get(type);
    if (attachedShader) {
      this.gl.detachShader(this._program, attachedShader);
      this.gl.deleteShader(attachedShader);
    }

    this.gl.attachShader(this._program, shader);
    this.gl.deleteShader(shader);
    this._attachedShaders.set(type, shader);

    if (this._attachedShaders.size === 2) {
      this.gl.linkProgram(this._program);
      const programInfoLog = this.gl.getProgramInfoLog(this._program);
      if (!this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS)) {
        throw new Error(programInfoLog);
      } else if (programInfoLog) {
        console.warn(programInfoLog);
      }

      // TODO: Check when issue is resolved on Safari and comment out

      // for (let [type, attachedShader] of this._attachedShaders) {
      //   this.gl.detachShader(this._program, attachedShader);
      //   this.gl.deleteShader(attachedShader);
      //   this._attachedShaders.delete(type);
      // }

      this._attributesLocations = new Map();
      this._uniformLocations = new Map();
    }
  }
}

class GLVertexArray {
  constructor({
    gl,
    mesh = undefined,
    program = undefined
  } = { gl }) {
    this.gl = gl;

    const extension = gl.getExtension("OES_vertex_array_object");
    if (extension) {
      this.gl.createVertexArray = extension.createVertexArrayOES.bind(extension);
      this.gl.bindVertexArray = extension.bindVertexArrayOES.bind(extension);
    }

    this._vertexArray = this.gl.createVertexArray();

    if (mesh || program) {
      this.add({
        mesh,
        program
      });
    }
  }

  add({
    mesh = undefined,
    program = undefined
  } = {}) {
    this.bind();
    program.attributes.set(mesh.attributes);
    if (mesh.indices) {
      mesh.indices.buffer.bind();
    }
    this.unbind();
  }

  bind() {
    this.gl.bindVertexArray(this._vertexArray);
  }

  unbind() {
    this.gl.bindVertexArray(null);
  }
}

class GLObject {
  constructor({
    gl,
    mesh = new GLMesh(),
    program = new GLProgram(),
    vertexArray = new GLVertexArray({
      gl,
      mesh,
      program,
    }),
  } = { gl }) {
    this.gl = gl;
    this.mesh = mesh;
    this.program = program;
    this.vertexArray = vertexArray;

    this._boundTextures = new Set();
  }

  bind() {
    this.program.use();
    this.vertexArray.bind();
    let unit = 0;
    for (const [name, type] of this.program.uniformTypes) {
      if (type.startsWith("sampler")) {
        const value = this.program.uniforms.get(name);
        if (value instanceof GLTexture) {
          value.bind({
            unit,
          });
          this._boundTextures.add(value);
        }
        unit++;
      }
    }
  }

  draw({ bind = true, uniforms = {}, ...options } = {}) {
    if (bind) {
      this.bind();
    }
    for (const uniform in uniforms) {
      this.program.uniforms.set(uniform, uniforms[uniform]);
    }
    this.mesh.draw(options);
  }

  unbind() {
    this.vertexArray.unbind();
    for (const texture of this._boundTextures) {
      texture.unbind();
    }
  }
}

class BasicShader {
  constructor({
    positions = true,
    normals = true,
    uvs = true,
  } = {}) {
    this._positions = !!positions;
    this._normals = !!normals;
    this._uvs = !!uvs;
  }

  get vertexShaderChunks() {
    return [
      ["start", `
        uniform mat4 projectionView;
        uniform mat4 transform;

        ${this._positions ? "in vec3 position;" : ""}
        ${this._normals ? "in vec3 normal;" : ""}
        ${this._uvs ? "in vec2 uv;" : ""}

        ${this._positions ? "out vec3 vPosition;" : ""}
        ${this._normals ? "out vec3 vNormal;" : ""}
        ${this._uvs ? "out vec2 vUv;" : ""}
      `,
      ],
      ["main", `
        ${this._positions ? "vPosition = position;" : ""}
        ${this._normals ? "vNormal = normal;" : ""}
        ${this._uvs ? "vUv = uv;" : ""}
      `,
      ],
      ["end", `
        gl_Position = projectionView * transform * vec4(position, 1.);
      `,
      ],
    ];
  }

  get fragmentShaderChunks() {
    return [
      ["start", `
        ${this._positions ? "in vec3 vPosition;" : ""}
        ${this._normals ? "in vec3 vNormal;" : ""}
        ${this._uvs ? "in vec2 vUv;" : ""}
      `,
      ],
    ];
  }
}

class GLBoxObject extends GLObject {
  constructor({
    gl,
    width = undefined,
    height = undefined,
    depth = undefined,
    widthSegments = undefined,
    heightSegments = undefined,
    depthSegments = undefined,
    normals = true,
    uvs = true,
    shaders = [],
  } = { gl }) {
    super({
      gl,
      mesh: new GLMesh({
        gl,
        ...new BoxMesh({
          width,
          height,
          depth,
          widthSegments,
          heightSegments,
          depthSegments,
          normals,
          uvs,
        })
      }),
      program: new GLProgram({
        gl,
        shaders: [
          new BasicShader({
            normals: normals,
            uvs: uvs,
          }),
          ...shaders,
        ],
      }),
    });

    this.transform = this.program.uniforms.get("transform");
  }
}

let pointers = new Map();

class Pointer extends Vector2 {
  static get TOUCH_TYPE() {
    return "touchtype";
  }

  static get MOUSE_TYPE() {
    return "mousetype";
  }

  static get(domElement = window) {
    let pointer = pointers.get(domElement);
    if (!pointer) {
      pointer = new Pointer(domElement);
    }
    return pointer;
  }

  get downed() {
    return this._downed;
  }

  constructor(domElement) {
    super();

    this._domElement = domElement || window;

    this.type = Pointer.TOUCH_TYPE;

    this.velocity = new Vector2();
    this.dragOffset = new Vector2();

    this.centered = new Vector2();
    this.centeredFlippedY = new Vector2();
    this.normalized = new Vector2();
    this.normalizedFlippedY = new Vector2();
    this.normalizedCentered = new Vector2();
    this.normalizedCenteredFlippedY = new Vector2();

    this._downed = false;

    pointers.set(this._domElement, this);

    this.onDown = new Signal();
    this.onMove = new Signal();
    this.onUp = new Signal();
    this.onClick = new Signal();
    this.onTypeChange = new Signal();

    this._preventMouseTypeChange = false;

    this._onPointerMoveBinded = this._onPointerMove.bind(this);
    this._onPointerDownBinded = this._onPointerDown.bind(this);
    this._onPointerUpBinded = this._onPointerUp.bind(this);

    this._updateBinded = this._update.bind(this);
    this._resizeBinded = this.resize.bind(this);

    this._position = new Vector2();

    this.enable();
  }

  resize() {
    this._domElementBoundingRect = this._domElement === window ? {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    } : this._domElement.getBoundingClientRect();
  }

  _onPointerDown(e) {
    this.resize();
    if (e.type === "touchstart") {
      this._preventMouseTypeChange = true;
      this._changeType(Pointer.TOUCH_TYPE);
    }
    this._downed = true;
    this.dragOffset.set(0, 0);
    this.copy(this._position);
    this._onPointerEvent(e);
    this._updatePositions();
    this.onDown.dispatch(e);
  }

  _onPointerMove(e) {
    if (e.type === "mousemove") {
      if (this._preventMouseTypeChange) {
        return;
      } else {
        this._changeType(Pointer.MOUSE_TYPE);
      }
    }
    this._onPointerEvent(e);
    this.onMove.dispatch(e);
  }

  _onPointerUp(e) {
    if (!this._downed) {
      return;
    }
    this._downed = false;
    this._onPointerEvent(e);
    this._updatePositions();
    this.onUp.dispatch(e);
    if (this.dragOffset.length < 4) {
      this.onClick.dispatch(e);
    }
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._preventMouseTypeChange = false;
    }, 2000);
  }

  _onPointerEvent(e) {
    if (!!window.TouchEvent && e instanceof window.TouchEvent) {
      if (e.type === "touchend") {
        e = e.changedTouches[0];
      } else {
        e = e.touches[0];
      }
    }
    this._position.x = e.clientX - this._domElementBoundingRect.left;
    this._position.y = e.clientY - this._domElementBoundingRect.top;
  }

  _changeType(type) {
    if (this.type === type) {
      return;
    }
    this.type = type;
    this.disable();
    this.enable();
    this.onTypeChange.dispatch(this.type);
  }

  _update() {
    if (this.x || this.y) {
      this.velocity.x = this._position.x - this.x;
      this.velocity.y = this._position.y - this.y;
      if (this.downed) {
        this.dragOffset.add(this.velocity);
      }
    }

    this._updatePositions();
  }

  _updatePositions() {
    this.x = this._position.x;
    this.y = this._position.y;

    if (!this.x && !this.y) {
      return;
    }

    this.centered.x = this.centeredFlippedY.x = this.x - this._domElementBoundingRect.width * .5;
    this.centered.y = this.centeredFlippedY.y = this.y - this._domElementBoundingRect.height * .5;
    this.centeredFlippedY.y *= -1;

    this.normalized.x = this.normalizedFlippedY.x = this.x / this._domElementBoundingRect.width;
    this.normalized.y = this.normalizedFlippedY.y = this.y / this._domElementBoundingRect.height;
    this.normalizedFlippedY.y = 1 - this.normalizedFlippedY.y;

    this.normalizedCentered.x = this.normalizedCenteredFlippedY.x = this.normalized.x * 2 - 1;
    this.normalizedCentered.y = this.normalizedCenteredFlippedY.y = this.normalized.y * 2 - 1;
    this.normalizedCenteredFlippedY.y *= -1;
  }

  enable() {
    this.disable();
    this.resize();
    if (this.type === Pointer.TOUCH_TYPE) {
      this._domElement.addEventListener("touchmove", this._onPointerMoveBinded);
      window.addEventListener("touchend", this._onPointerUpBinded);
    } else {
      this._domElement.addEventListener("mousedown", this._onPointerDownBinded);
      window.addEventListener("mouseup", this._onPointerUpBinded);
    }
    this._domElement.addEventListener("touchstart", this._onPointerDownBinded);
    this._domElement.addEventListener("mousemove", this._onPointerMoveBinded);
    window.addEventListener("resize", this._resizeBinded);
    Ticker$1.add(this._updateBinded = this._updateBinded || this._update.bind(this));
  }

  disable() {
    Ticker$1.delete(this._updateBinded);
    this._domElement.removeEventListener("touchstart", this._onPointerDownBinded);
    this._domElement.removeEventListener("mousedown", this._onPointerDownBinded);
    this._domElement.removeEventListener("touchmove", this._onPointerMoveBinded);
    this._domElement.removeEventListener("mousemove", this._onPointerMoveBinded);
    window.removeEventListener("touchend", this._onPointerUpBinded);
    window.removeEventListener("mouseup", this._onPointerUpBinded);
    window.removeEventListener("resize", this._resizeBinded);
  }
}

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create$4() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity$2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */

function multiply$2(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ$1(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert$2(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy$5 = copy$3;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set$5 = set$3;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize$3 = normalize$2;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = create$1();
  var xUnitVec3 = fromValues(1, 0, 0);
  var yUnitVec3 = fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot = dot$1(a, b);

    if (dot < -0.999999) {
      cross$1(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross$1(tmpvec3, yUnitVec3, a);
      normalize$1(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross$1(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize$3(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create$4();
  var temp2 = create$4();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = create$3();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize$3(out, fromMat3(out, matr));
  };
}();

class Quaternion extends Float32Array {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(4);
    this.set(x, y, z, w);
    return this;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = value;
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = value;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = value;
  }

  get w() {
    return this[3];
  }

  set w(value) {
    this[3] = value;
  }

  identity() {
    identity$2(this);
    return this;
  }

  set(x, y, z, w) {
    set$5(this, x, y, z, w);
    return this;
  }

  rotateX(angle) {
    rotateX$1(this, this, angle);
    return this;
  }

  rotateY(angle) {
    rotateY$1(this, this, angle);
    return this;
  }

  rotateZ(angle) {
    rotateZ$1(this, this, angle);
    return this;
  }

  invert(quaternion = this) {
    invert$2(this, quaternion);
    return this;
  }

  copy(quaternion) {
    copy$5(this, quaternion);
    return this;
  }

  normalize(quaternion = this) {
    normalize$3(this, this);
    return this;
  }

  multiply(quaternionA, quaternionB) {
    if (quaternionB) {
      multiply$2(this, quaternionA, quaternionB);
    } else {
      multiply$2(this, this, quaternionA);
    }
    return this;
  }

  fromMatrix3(matrix3) {
    fromMat3(this, matrix3);
    return this;
  }
}

class TrackballController {
  constructor({
    matrix = new Matrix4(), 
    domElement = document.body,
    distance = 0,
    invertRotation = true,
    rotationEaseRatio = .04,
    zoomSpeed = .1,
    zoomEaseRatio = .1,
    minDistance = 0,
    maxDistance = Infinity,
    enabled = true
  } = {}) {
    this.matrix = matrix;

    this._distance = distance;
    this.invertRotation = invertRotation;
    this.rotationEaseRatio = rotationEaseRatio;
    this.maxDistance = maxDistance;
    this.minDistance = minDistance;
    this.zoomSpeed = zoomSpeed;
    this.zoomEaseRatio = zoomEaseRatio;
    
    this._pointer = Pointer.get(domElement);
    this._nextDistance = this._distance;
    
    this._cachedQuaternion = new Quaternion();
    this._cachedMatrix = new Matrix4();
    this._cachedVector3 = new Vector3();
    
    this._velocity = new Vector2();
    this._velocityOrigin = new Vector2();
    
    this._position = new Vector3([this.matrix.x, this.matrix.y, this.matrix.z]);
    this._positionPrevious = this._position.clone();
    this._positionOffset = new Vector3();
    
    domElement.addEventListener("wheel", this.onWheel.bind(this));
    
    this.enabled = true;
    this.update();
    this.enabled = enabled;
  }

  set distance(value) {
    this._distance = this._nextDistance = value;
  }

  get distance() {
    return this._distance;
  }

  onWheel(e) {
    if(!this.enabled) {
      return;
    }
    const scrollOffsetRatio = 1 + Math.abs(e.deltaY * this.zoomSpeed * .01);
    this._nextDistance = this._nextDistance || 1;
    this._nextDistance = e.deltaY > 0 ? this._nextDistance * scrollOffsetRatio : this._nextDistance / scrollOffsetRatio;
    this._nextDistance = Math.max(Math.min(this._nextDistance, this.maxDistance), this.minDistance);
  }

  update() {
    if(!this.enabled) {
      return;
    }

    this._cachedMatrix.identity();
    this._cachedQuaternion.identity();

    this._distance += (this._nextDistance - this._distance) * this.zoomEaseRatio;

    this._position.set(this.matrix.x, this.matrix.y, this.matrix.z).subtract(this._positionOffset);

    this.matrix.x = 0;
    this.matrix.y = 0;
    this.matrix.z = 0;

    if(this._pointer.downed) {
      this._velocity.copy(this._pointer.velocity).scale(.003);
    }

    this._velocity.lerp(this._velocityOrigin, this.rotationEaseRatio);

    this._cachedQuaternion.rotateY(this.invertRotation ? -this._velocity.x : this._velocity.x);
    this._cachedQuaternion.rotateX(this.invertRotation ? -this._velocity.y : this._velocity.y);

    this._cachedMatrix.fromQuaternion(this._cachedQuaternion);

    this.matrix.multiply(this._cachedMatrix);

    this._positionOffset.set(0, 0, 1);
    this._positionOffset.applyMatrix4(this.matrix);
    this._positionOffset.scale(this._distance);

    this._cachedVector3.copy(this._position).add(this._positionOffset);

    this.matrix.x = this._cachedVector3.x;
    this.matrix.y = this._cachedVector3.y;
    this.matrix.z = this._cachedVector3.z;
  }
}

class View {
  constructor({
    canvas = undefined,
  } = {}) {
    this.canvas = canvas;

    const webGLOptions = {
      depth: true,
      alpha: false,
      antialias: true,
    };

    if (!/\bforcewebgl1\b/.test(window.location.search)) {
      this.gl = this.canvas.getContext("webgl2", webGLOptions);
    }
    if (!this.gl) {
      this.gl = this.canvas.getContext("webgl", webGLOptions) || this.canvas.getContext("experimental-webgl", webGLOptions);
    }

    this.camera = new Camera();

    this.cameraController = new TrackballController({
      matrix: this.camera.transform,
      distance: 5,
    });

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.object = new GLBoxObject({
      gl: this.gl,
      width: 1,
      height: 1,
      shaders: [{
        fragmentShaderChunks: [
          ["end", `
            fragColor = vec4(vNormal * .5 + .5, 1.);
          `],
        ],
      }],
    });
  }

  resize(width, height) {
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.camera.aspectRatio = width / height;
    this.update();
  }

  update() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.cameraController.update();

    this.object.draw({
      uniforms: {
        projectionView: this.camera.projectionView,
      },
    });
  }
}

window.customElements.define("dnit-main", class extends TickerElement {
  constructor() {
    super({ autoplay: true });

    this._resizeBinded = this.resize.bind(this);

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector("canvas");

    this.view = new View({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this._resizeBinded);
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._resizeBinded);
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    this.canvas.width = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;

    this.view.resize(width, height);
  }

  update() {
    this.view.update();
  }
});
//# sourceMappingURL=index.js.map
