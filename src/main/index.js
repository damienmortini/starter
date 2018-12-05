import LoopElement from "../../node_modules/dlib/customelements/LoopElement.js";
import Loader from "../../node_modules/dlib/utils/Loader.js";

import View from "./View.js";

window.customElements.define("dnit-main", class extends LoopElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        @import "src/main/index.css";
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.querySelector("canvas");

    this.view = new View({ canvas: this.canvas });

    this.querySelector("style").addEventListener("load", () => {
      this.dispatchEvent(new Event("load"));
      this.resize();
    });

    window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));

    this.play();
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
