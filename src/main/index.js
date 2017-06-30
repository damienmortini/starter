import "@webcomponents/custom-elements";

import LoopElement from "dlib/customelements/LoopElement.js";
import Loader from "dlib/utils/Loader.js";

import View from "./View.js";

let template = document.createElement("template");
Loader.load("src/main/template.html").then((value) => {
  template.innerHTML = value;
});

Loader.onLoad.then(() => {
  window.customElements.define("dnit-main", class extends LoopElement {
    connectedCallback() {
      super.connectedCallback();
      
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);

      this.canvas = this.querySelector("canvas");

      this.view = new View({canvas: this.canvas});

      this.resize();
    }

    resize() {
      let width = this.canvas.offsetWidth;
      let height = this.canvas.offsetHeight;

      this.canvas.width = width * window.devicePixelRatio;
      this.canvas.height = height * window.devicePixelRatio;

      this.view.resize(width, height);
    }

    update() {
      this.view.update();
    }
  });
});
