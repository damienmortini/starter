import THREETrackballController from "../../node_modules/dlib/three/THREETrackballController.js";

export default class Scene extends THREE.Scene {
  constructor({ canvas } = {}) {
    super();

    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);

    this.controls = new THREETrackballController(this.camera, {
      distance: 5,
      domElement: canvas,
    });

    let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());

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
