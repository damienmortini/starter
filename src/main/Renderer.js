import { WebGLRenderer } from "three";

import "three/examples/js/postprocessing/EffectComposer.js";
import "three/examples/js/postprocessing/ShaderPass.js";
import "three/examples/js/postprocessing/MaskPass.js";
import "three/examples/js/postprocessing/RenderPass.js";
import "three/examples/js/shaders/CopyShader.js";

import THREEShader from "dlib/three/THREEShader.js";
import AntialiasGLSL from "dlib/webgl/shaders/AntialiasGLSL.js";

export default class Renderer {
  constructor(canvas) {
    this.renderer = new WebGLRenderer({
      canvas: canvas
    });

    this.effectComposer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass();
    this.effectComposer.addPass(this.renderPass);
    this.fxaaShaderPass = new THREE.ShaderPass(new THREEShader({
      vertexShader: `
        uniform vec2 resolution;
        varying vec2 vUv;
        ${AntialiasGLSL.vertex()}
        void main() {
          computeFXAATextureCoordinates(uv, resolution);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 resolution;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        ${AntialiasGLSL.fragment()}
        void main() {
          gl_FragColor = fxaa(tDiffuse, vUv, resolution);
        }
      `
    }));
    this.effectComposer.addPass(this.fxaaShaderPass);
    this.copyShaderPass = new THREE.ShaderPass(THREE.CopyShader);
    this.effectComposer.addPass(this.copyShaderPass);

    this.effectComposer.passes[this.effectComposer.passes.length - 1].renderToScreen = true;
  }

  resize(width, height) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
    this.renderer.setSize(width, height, false);
    this.fxaaShaderPass.uniforms.resolution.value.set(width, height);
    this.effectComposer.setSize(width, height);
  }

  render(scene) {
    this.renderPass.scene = scene;
    this.renderPass.camera = scene.camera;

    this.effectComposer.render();
  }
}
