import { Scene as THREEScene } from "../../node_modules/three/src/scenes/Scene.js";
import { PerspectiveCamera } from "../../node_modules/three/src/cameras/PerspectiveCamera.js";
import { Mesh } from "../../node_modules/three/src/objects/Mesh.js";
import { BoxGeometry } from "../../node_modules/three/src/geometries/BoxGeometry.js";
import { MeshNormalMaterial } from "../../node_modules/three/src/materials/MeshNormalMaterial.js";

import THREETrackballController from "../../node_modules/dlib-three/controller/THREETrackballController.js";

export default class Scene extends THREEScene {
  constructor({ canvas } = {}) {
    super();

    this.camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);

    this.controls = new THREETrackballController(this.camera, {
      distance: 5,
      domElement: canvas,
    });

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
