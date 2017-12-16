import "@webcomponents/custom-elements";

import Loader from "dlib/utils/Loader.js";

async function load() {
  const html = await Loader.load("src/main/template.html");
  const template = document.createElement("template");
  template.innerHTML = html;
  return { template };
}

window.customElements.define("dnit-main", class extends HTMLElement {
  connectedCallback() {
    load().then(({ template }) => {
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);
    });
  }
});
