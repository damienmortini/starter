import THREERenderer from "dlib/three/THREERenderer.js";
import THREEShaderMaterial from "dlib/three/THREEShaderMaterial.js";
import AntialiasGLSL from "dlib/shaders/AntialiasGLSL.js";

export default class Renderer extends THREERenderer {
  constructor(options) {
    super(options);

    if(options.antialias !== false && !this.context.getContextAttributes().antialias) {
      this.filters.push(this.fxaaFilter = new THREEShaderMaterial({
        vertexShader: `
          uniform vec2 resolution;
          varying vec2 vUv;
          ${AntialiasGLSL.vertex()}
          void main() {
            computeFXAATextureCoordinates(uv, resolution);
            vUv = uv;
            gl_Position = vec4(position, 1.);
          }
        `,
        fragmentShader: `
          uniform vec2 resolution;
          uniform sampler2D renderTargetTexture;
          varying vec2 vUv;
          ${AntialiasGLSL.fragment()}
          void main() {
            gl_FragColor = fxaa(renderTargetTexture, vUv, resolution);
          }
        `
      }));
    }
  }

  resize(width, height) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
    super.resize(width, height);
    if(this.fxaaFilter) {
      this.fxaaFilter.resolution.set(width, height);
    }
  }
}
