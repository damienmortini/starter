import THREE from "three";
import "three/examples/js/postprocessing/EffectComposer.js";
import "three/examples/js/postprocessing/ShaderPass.js";
import "three/examples/js/postprocessing/MaskPass.js";
import "three/examples/js/postprocessing/RenderPass.js";
import "three/examples/js/shaders/CopyShader.js";
import "three/examples/js/shaders/FXAAShader.js";

export default class Renderer {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    this.effectComposer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass();
    this.effectComposer.addPass(this.renderPass);
    this.fxaaShaderPass = new THREE.ShaderPass(THREE.FXAAShader);
    this.effectComposer.addPass(this.fxaaShaderPass);
    this.copyShaderPass = new THREE.ShaderPass(THREE.CopyShader);
    this.effectComposer.addPass(this.copyShaderPass);

    this.effectComposer.passes[this.effectComposer.passes.length - 1].renderToScreen = true;
  }

  resize(width, height) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
    this.renderer.setSize(width, height, false);
    this.fxaaShaderPass.uniforms.resolution.value.set(1 / width, 1 / height);
    this.effectComposer.setSize(width, height);
  }

  render(scene) {
    this.renderPass.scene = scene;
    this.renderPass.camera = scene.camera;

    this.effectComposer.render();
  }
}
