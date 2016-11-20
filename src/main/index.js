import "@webcomponents/custom-elements";

import Loader from "dlib/utils/Loader.js";

let template = document.createElement("template");
Loader.load("src/main/template.html").then((value) => {
  template.innerHTML = value;
});

class Main extends HTMLElement {
  constructor() {
    super();

    let templateClone = document.importNode(template.content, true);
    this.appendChild(templateClone);
  }
}

Loader.onLoad.then(() => {
  window.customElements.define("dnit-main", Main);
});
