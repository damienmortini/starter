import { ShaderMaterial, WebGLRenderer, WebGLRenderTarget, RGBAFormat, LinearFilter, UnsignedShortType, DepthTexture, OrthographicCamera, Scene, Mesh, PlaneBufferGeometry } from "three";
import { Vector2 } from "three/src/math/Vector2.js";

import THREEShader from "dlib/three/THREEShader.js";
import AntialiasGLSL from "dlib/webgl/shaders/AntialiasGLSL.js";

export default class Renderer {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas
    });

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();

    this.antialias = new ShaderMaterial(new THREEShader({
      vertexShader: `
        uniform vec2 resolution;

        varying vec2 vUv;

        ${AntialiasGLSL.vertex()}

        void main() {
          computeFXAATextureCoordinates(uv, resolution);
          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec2 resolution;
        uniform sampler2D texture;

        varying vec2 vUv;

        ${AntialiasGLSL.fragment()}

        void main() {
          gl_FragColor = fxaa(texture, vUv, resolution);
        }
      `
    }));

    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
    this.scene.add(this.quad);
  }

  applyFilter(filter) {
    this.quad.material = filter;
    filter.uniforms.texture.value = this._renderTarget1.texture;
    if (filter.uniforms.depthTexture) {
      filter.uniforms.depthTexture.value = this._renderTarget1.depthTexture;
    }
    this.renderer.render(this.scene, this.camera, this._renderTarget2);
    [this._renderTarget1, this._renderTarget2] = [this._renderTarget2, this._renderTarget1];
  }

  resize(width, height) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;

    this.renderer.setSize(width, height, false);
    this.antialias.uniforms.resolution.value.set(width, height);
    this._renderTarget1.setSize(width, height);
    this._renderTarget2.setSize(width, height);
  }

  render(scene) {
    this.renderer.render(scene, scene.camera, this._renderTarget1);

    this.applyFilter(this.antialias);

    [this._renderTarget1, this._renderTarget2] = [this._renderTarget2, this._renderTarget1];

    this.renderer.render(this.scene, this.camera);
    // this.renderer.render(scene, scene.camera);
  }
}
