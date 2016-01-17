import THREE from "THREE";

export default class View {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
  }

  resize(width, height) {
    this.renderer.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio, false);
  }

  render(scene) {
    this.renderer.render(scene, scene.camera);
  }
}
