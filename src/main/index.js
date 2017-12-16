import "@webcomponents/custom-elements";

import LoopElement from "dlib/customelements/LoopElement.js";
import Loader from "dlib/utils/Loader.js";

import View from "./View.js";

window.customElements.define("dnit-main", class extends LoopElement {
  connectedCallback() {
    super.connectedCallback();

    this.canvas = document.createElement("canvas");
    this.appendChild(this.canvas);

    this.view = new View({canvas: this.canvas});
    
    window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("resize", this._resizeBinded);
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
