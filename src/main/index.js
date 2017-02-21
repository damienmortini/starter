import "@webcomponents/custom-elements";

import Loader from "dlib/utils/Loader.js";

let template = document.createElement("template");
Loader.load("src/main/template.html").then((value) => {
  template.innerHTML = value;
});

Loader.onLoad.then(() => {
  window.customElements.define("dnit-main", class extends HTMLElement {
    connectedCallback() {
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);
    }
  });
});
