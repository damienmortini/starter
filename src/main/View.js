import THREE from "THREE";
import "THREE.EffectComposer";
import "THREE.ShaderPass";
import "THREE.MaskPass";
import "THREE.RenderPass";
import "THREE.CopyShader";
import "THREE.FXAAShader";

export default class View {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    this.effectComposer = new THREE.EffectComposer(this.renderer);
    this.renderPass = new THREE.RenderPass();
    this.effectComposer.addPass(this.renderPass);
    this.fxaaShader = new THREE.ShaderPass(THREE.FXAAShader);
    this.effectComposer.addPass(this.fxaaShader);
    this.copyShader = new THREE.ShaderPass(THREE.CopyShader);
    this.effectComposer.addPass(this.copyShader);

    this.effectComposer.passes[this.effectComposer.passes.length - 1].renderToScreen = true;
  }

  resize(width, height) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
    this.renderer.setSize(width, height, false);
    this.fxaaShader.uniforms.resolution.value.set(1 / width, 1 / height);
    this.effectComposer.setSize(width, height);
  }

  render(scene) {
    this.renderPass.scene = scene;
    this.renderPass.camera = scene.camera;

    this.effectComposer.render();
  }
}
