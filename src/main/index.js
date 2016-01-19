import LoopElement from "dlib/dom/LoopElement.js";

import Scene from "./Scene.js";
import View from "./View.js";

import templateContent from "./template.html!text";
let template = document.createElement("template");
template.innerHTML = templateContent;

class Main extends LoopElement {
  createdCallback() {
    super.createdCallback();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);

    this.canvas = this.querySelector("canvas");

    this.view = new View(this.canvas);

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
    this.view.resize(width, height);
    this.update();
  }

  update() {
    super.update();
    this.scene.update();
    this.view.render(this.scene);
  }
}

Main.register("dnit-main");
