import { WebGLRenderer } from "../../node_modules/three/src/renderers/WebGLRenderer.js";

export default class Renderer extends WebGLRenderer {
  constructor(options) {
    super(Object.assign({ antialias: true }, options));

    this._quality = 1;

    // Fix to make WebGLRenderer.render extendable
    this._render = this.render;
    delete this.render;
  }

  get quality() {
    return this._quality;
  }

  set quality(value) {
    if (this._quality === value) {
      return;
    }
    this._quality = value;
    this.resize();
  }

  resize(width = this._width, height = this._height) {
    this._width = width;
    this._height = height;
    this.setSize(this._width * window.devicePixelRatio * this.quality, this._height * window.devicePixelRatio * this.quality, false);
  }

  render({ scene }) {
    this._render(scene, scene.camera);
  }
}
