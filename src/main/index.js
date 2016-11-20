import "@webcomponents/custom-elements";

import "three";

import LoopElement from "dlib/customelements/LoopElement.js";
import Loader from "dlib/utils/Loader.js";

import Scene from "./Scene.js";
import Renderer from "./Renderer.js";

let template = document.createElement("template");
Loader.load("src/main/template.html").then((value) => {
  template.innerHTML = value;
});

class Main extends LoopElement {
  constructor() {
    super();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);

    this.canvas = this.querySelector("canvas");

    this.renderer = new Renderer(this.canvas);

    this.scene = new Scene();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.resize.bind(this));
  }

  resize() {
    let width = this.canvas.offsetWidth;
    let height = this.canvas.offsetHeight;
    this.scene.resize(width, height);
    this.renderer.resize(width, height);
    this.renderer.render(this.scene);
  }

  update() {
    super.update();
    this.scene.update();
    this.renderer.render(this.scene);
  }
}

Loader.onLoad.then(() => {
  window.customElements.define("dnit-main", Main);
});
