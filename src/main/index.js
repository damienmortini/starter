import LoopElement from "../../node_modules/dlib/customelements/LoopElement.js";

import Scene from "./Scene.js";
import Renderer from "./Renderer.js";

window.customElements.define("dnit-main", class extends LoopElement {
  connectedCallback() {
    super.connectedCallback();

    this.innerHTML = `
      <style>
        @import "src/main/index.css";
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.querySelector("canvas");

    this.renderer = new Renderer({ canvas: this.canvas });

    this.scene = new Scene({ canvas: this.canvas });

    this.querySelector("style").addEventListener("load", () => {
      this.dispatchEvent(new Event("load"));
      this.resize();
      this.play();
    });

    window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._resizeBinded);
  }

  resize() {
    let width = this.canvas.offsetWidth;
    let height = this.canvas.offsetHeight;
    this.scene.resize(width, height);
    this.renderer.resize(width, height);
    this.renderer.render({ scene: this.scene });
  }

  update() {
    this.scene.update();
    this.renderer.render({ scene: this.scene });
  }
});
