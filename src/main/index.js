import LoopElement from "../../node_modules/dlib/customelements/LoopElement.js";
import Loader from "../../node_modules/dlib/utils/Loader.js";

import View from "./View.js";

const LOAD_PROMISE = Promise.all([
  Loader.load({ value: "src/main/template.html", type: "template" }),
  Loader.load("src/main/index.css")
]);

window.customElements.define("dnit-main", class extends LoopElement {
  connectedCallback() {
    super.connectedCallback();

    LOAD_PROMISE.then(([template]) => {
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);

      this.canvas = this.querySelector("canvas");
  
      this.view = new View({canvas: this.canvas});
      
      window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));
      this.resize();

      this.play();
    });

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
