import THREE from "THREE";
import "THREE.TrackballControls";

export default class Scene extends THREE.Scene {
  constructor() {
    super();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    let light = new THREE.PointLight();
    this.add(light);

    this.camera.position.z = 5;
    this.controls = new THREE.TrackballControls(this.camera);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true
    });
    let cube = new THREE.Mesh(geometry, material);

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
