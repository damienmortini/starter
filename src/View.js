import THREE from "THREE";

import Scene from "./Scene.js";

export default class View {
  constructor(canvas) {
    this.scene = new Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
  }

  resize(width, height) {
    this.scene.resize(width, height);
    this.renderer.setSize(width, height, false);
  }

  update() {
    this.scene.update();
    this.renderer.render(this.scene, this.scene.camera);
  }
}
