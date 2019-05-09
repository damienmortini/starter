import TickerElement from "../../node_modules/@damienmortini/elements/src/util/TickerElement.js";

import Scene from "./Scene.js";
import Renderer from "./Renderer.js";

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
    this.renderer = new Renderer({ canvas: this.canvas });
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
    this.renderer.resize(width, height);
    this.renderer.render({ scene: this.scene });
  }

  update() {
    this.scene.update();
    this.renderer.render({ scene: this.scene });
  }
}

window.customElements.define("starter-main", Main);
