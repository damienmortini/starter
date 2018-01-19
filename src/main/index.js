import Loader from "dlib/utils/Loader.js";

const loadPromise = async function() {
  const template = document.createElement("template");
  template.innerHTML += `<style>@import "src/main/index.css"</style>`;
  template.innerHTML += await Loader.load("src/main/template.html");
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
