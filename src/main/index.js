import TickerElement from "../../node_modules/@damienmortini/elements/src/util/TickerElement.js";

import { WebGLRenderer } from "../../node_modules/three/src/renderers/WebGLRenderer.js";
import Scene from "./Scene.js";

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-main></starter-main>
 */
class Main extends TickerElement {
  constructor() {
    super({ autoplay: true });

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector("canvas");
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.scene = new Scene({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._resizeBinded);
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    this.scene.resize(width, height);
    this.renderer.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio, false);
    this.renderer.render(this.scene, this.scene.camera);
  }

  update() {
    this.scene.update();
    this.renderer.render(this.scene, this.scene.camera);
  }
}

window.customElements.define("starter-main", Main);
