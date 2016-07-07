import LoopElement from "dlib/dom/LoopElement.js";

import Scene from "./Scene.js";
import Renderer from "./Renderer.js";

import templateHTML from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateHTML;

class Main extends LoopElement {
  createdCallback() {
    super.createdCallback();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);

    this.canvas = this.querySelector("canvas");

    this.renderer = new Renderer(this.canvas);

    this.scene = new Scene();
  }

  attachedCallback() {
    super.attachedCallback();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  detachedCallback() {
    super.detachedCallback();
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

Main.register("dnit-main");
