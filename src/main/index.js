import "@webcomponents/custom-elements";

import Loader from "dlib/utils/Loader.js";

const loadPromise = async function() {
  const html = await Loader.load("src/main/template.html");
  const template = document.createElement("template");
  template.innerHTML = html;
  return { template };
}();

window.customElements.define("dnit-main", class extends HTMLElement {
  connectedCallback() {
    loadPromise.then(({ template }) => {
      let templateClone = document.importNode(template.content, true);
      this.appendChild(templateClone);
    });
  }
});
