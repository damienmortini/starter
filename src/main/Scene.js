import {
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial,
  Scene as THREEScene
} from "three";

import THREETrackballController from "dlib/three/THREETrackballController.js";

export default class Scene extends THREEScene {
  constructor() {
    super();

    this.camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);

    this.controls = new THREETrackballController(this.camera, {distance: 5});

    let cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial());

    this.add(cube);
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
